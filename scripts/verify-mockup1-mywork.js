const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\rebuild-verification';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function getWsUrl(port = 9230) {
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
      '--remote-debugging-port=9230',
      '--window-size=1440,1080',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    const wsUrl = await getWsUrl(9230);
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

    // 1. Direct navigation to /product-showcase?exp=mywork
    console.log('Navigating to http://localhost:3000/product-showcase?exp=mywork ...');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/product-showcase?exp=mywork' });
    await new Promise((r) => setTimeout(r, 3000));

    // Capture initial state (Step 0)
    console.log('Capturing Mockup 1: My Work - Initial State (Step 0)...');
    await capture('mockup1-mywork-step0-initial.png');

    // Wait for Step 1 transition (approx 2.8s)
    console.log('Waiting for Step 1 transition (Internal Review)...');
    await new Promise((r) => setTimeout(r, 2900));
    await capture('mockup1-mywork-step1-internal-review.png');

    // Wait for Step 2 transition (approx 3.0s)
    console.log('Waiting for Step 2 transition (Filed / Completed)...');
    await new Promise((r) => setTimeout(r, 3100));
    await capture('mockup1-mywork-step2-filed-completed.png');

    // 2. Direct navigation to Main Site with ?persona=staff
    console.log('Navigating to http://localhost:3000/?persona=staff ...');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/?persona=staff' });
    await new Promise((r) => setTimeout(r, 3000));

    // Suppress popups and scroll into persona section
    await sessionSend('Runtime.evaluate', {
      expression: `
        (() => {
          sessionStorage.setItem('pyngyn-promo-dismissed', 'true');
          document.querySelectorAll('[role="dialog"], .fixed.inset-0.z-50').forEach(p => p.remove());
          const roles = document.getElementById('roles');
          if (roles) roles.scrollIntoView({ behavior: 'instant' });
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 2000));
    await capture('mockup1-home-persona-staff.png');

    console.log('All Mockup #1 My Work verification captures completed!');
  } finally {
    try {
      chrome.kill();
    } catch (e) {}
  }
}

run().catch((err) => {
  console.error('Error running verification:', err);
  process.exit(1);
});
