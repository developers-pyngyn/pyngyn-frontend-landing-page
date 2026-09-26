const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\rebuild-verification';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function getWsUrl(port = 9245) {
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
      '--remote-debugging-port=9245',
      '--window-size=1440,1100',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    const wsUrl = await getWsUrl(9245);
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
      height: 1200,
      deviceScaleFactor: 1,
      mobile: false,
    });

    async function capture(filename) {
      const { data } = await sessionSend('Page.captureScreenshot', { format: 'png' });
      const filePath = path.join(outDir, filename);
      fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
      console.log(`Saved screenshot: ${filename}`);
    }

    console.log('Navigating to http://localhost:3000/product-showcase?exp=calendar ...');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/product-showcase?exp=calendar' });
    await new Promise((r) => setTimeout(r, 2200));

    // Scroll calendar into view so all 5 rows and bottom timer are centered
    await sessionSend('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.querySelector('[data-product-camera-container]') || document.querySelector('[data-product-target="calendar-screen"]');
          if (el) {
            el.scrollIntoView({ block: 'center' });
            return true;
          }
          return false;
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 600));

    // Step 0: Baseline state (matching media_1790240393994.png)
    console.log('Capturing Step 0: Baseline Calendar...');
    await capture('mockup7-calendar-step0-baseline.png');

    // Step 1: Day 20 GSTR-3B Active Deadline emphasis
    await new Promise((r) => setTimeout(r, 3400));
    console.log('Capturing Step 1: Day 20 Active Deadline Emphasis...');
    await capture('mockup7-calendar-step1-deadline-active.png');

    // Step 2: Task status updates to Filed / Completed
    await new Promise((r) => setTimeout(r, 3400));
    console.log('Capturing Step 2: GSTR-3B Task Status Updates to Filed & Synced...');
    await capture('mockup7-calendar-step2-status-filed.png');

    // Step 3: Calendar event highlight moves naturally to Day 23 TODAY
    await new Promise((r) => setTimeout(r, 3200));
    console.log('Capturing Step 3: Highlight Moves Naturally to Day 23 TODAY...');
    await capture('mockup7-calendar-step3-highlight-moved.png');

    console.log('Verification finished successfully!');
    ws.close();
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    chrome.kill();
  }
}

run();
