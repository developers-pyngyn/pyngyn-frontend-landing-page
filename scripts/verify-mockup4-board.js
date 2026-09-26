const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\rebuild-verification';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function getWsUrl(port = 9235) {
  for (let i = 0; i < 25; i++) {
    try {
      const data = await new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:${port}/json/version`, (res) => {
          let buf = '';
          res.on('data', (c) => (buf += c));
          res.on('end', () => resolve(buf));
        }).on('error', reject);
      });
      const json = JSON.parse(data);
      if (json.webSocketDebuggerUrl) return json.webSocketDebuggerUrl;
    } catch (e) {
      await new Promise((r) => setTimeout(r, 200));
    }
  }
  throw new Error('Could not get debugger URL on port ' + port);
}

async function run() {
  const chrome = spawn(
    chromePath,
    [
      '--headless=new',
      '--disable-gpu',
      '--remote-debugging-port=9235',
      '--window-size=1440,1080',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    const wsUrl = await getWsUrl(9235);
    const ws = new WebSocket(wsUrl);

    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        const cb = callbacks.get(msg.id);
        callbacks.delete(msg.id);
        if (msg.error) cb.reject(msg.error);
        else cb.resolve(msg.result);
      }
    };

    const send = (method, params = {}) => {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        callbacks.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    };

    await new Promise((r) => (ws.onopen = r));
    await send('Target.setDiscoverTargets', { discover: true });

    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

    const sessionSend = (method, params = {}) => {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        callbacks.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, sessionId, method, params }));
      });
    };

    await sessionSend('Page.enable');
    await sessionSend('DOM.enable');
    await sessionSend('Runtime.enable');
    await sessionSend('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 980,
      deviceScaleFactor: 1,
      mobile: false,
    });

    async function capture(filename) {
      const { data } = await sessionSend('Page.captureScreenshot', { format: 'png' });
      const filePath = path.join(outDir, filename);
      fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
      console.log(`Saved screenshot: ${filename}`);
    }

    console.log('Navigating to http://localhost:3000/product-showcase?exp=board ...');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/product-showcase?exp=board' });
    await new Promise((r) => setTimeout(r, 2500));

    // Step 0: Baseline state in Overdue
    console.log('Capturing Step 0: Baseline Task Board (matching media_1790240353597.png)...');
    await capture('mockup4-board-step0-baseline.png');

    // Step 1: Card highlight (~2000ms)
    await new Promise((r) => setTimeout(r, 2200));
    console.log('Capturing Step 1: Card highlight/elevation...');
    await capture('mockup4-board-step1-card-highlight.png');

    // Step 2: Card moves to Due This Week (7 Days) (~3000ms)
    await new Promise((r) => setTimeout(r, 3000));
    console.log('Capturing Step 2: Card moved to Due This Week...');
    await capture('mockup4-board-step2-moved-this-week.png');

    // Step 3: Card moves to Later & Filed (~3200ms)
    await new Promise((r) => setTimeout(r, 3400));
    console.log('Capturing Step 3: Card moved to Later & Filed (✓ Filed)...');
    await capture('mockup4-board-step3-moved-later-filed.png');

    // Check Homepage Hero with Kanban Board tab toggled
    console.log('Navigating to homepage Hero...');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000' });
    await new Promise((r) => setTimeout(r, 2500));

    // Click Kanban Board toggle button in Hero
    console.log('Clicking Kanban Board toggle button in Hero...');
    await sessionSend('Runtime.evaluate', {
      expression: `
        (() => {
          const btns = Array.from(document.querySelectorAll('button'));
          const btn = btns.find(b => b.textContent && b.textContent.includes('Kanban Board'));
          if (btn) { btn.click(); return true; }
          return false;
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 1500));
    console.log('Capturing Homepage Hero with live Task Board...');
    await capture('mockup4-homepage-hero-board.png');

    console.log('Verification finished successfully!');
    ws.close();
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    chrome.kill();
  }
}

run();
