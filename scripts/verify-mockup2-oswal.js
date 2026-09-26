const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\rebuild-verification';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function getWsUrl(port = 9232) {
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
      '--remote-debugging-port=9232',
      '--window-size=1440,1080',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    const wsUrl = await getWsUrl(9232);
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

    // 1. Direct navigation to product-showcase
    console.log('Navigating to http://localhost:3000/product-showcase ...');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/product-showcase' });
    await new Promise((r) => setTimeout(r, 2500));

    // Click 3. Tasks List (Oswal)
    console.log('Clicking 3. Tasks List tab...');
    await sessionSend('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.querySelector('[data-exp-btn="tasks"]');
          if (btn) btn.click();
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 1200));

    // Capture Step 0 (Initial Baseline)
    console.log('Capturing Mockup 2: Step 0 (Baseline)...');
    await capture('mockup2-oswal-step0-baseline.png');

    // Wait for Step 1 (Highlight Task + Open Status Dropdown)
    console.log('Waiting for Step 1 (Highlight Task + Open Status Dropdown)...');
    await new Promise((r) => setTimeout(r, 2600));
    await capture('mockup2-oswal-step1-dropdown-open.png');

    // Wait for Step 2 (Change In Progress -> Internal Review)
    console.log('Waiting for Step 2 (Change In Progress -> Internal Review)...');
    await new Promise((r) => setTimeout(r, 2400));
    await capture('mockup2-oswal-step2-internal-review.png');

    // Wait for Step 3 (Another Task Priority High -> Urgent)
    console.log('Waiting for Step 3 (Another Task Priority High -> Urgent)...');
    await new Promise((r) => setTimeout(r, 2200));
    await capture('mockup2-oswal-step3-priority-urgent.png');

    // Wait for Step 4 (Progress Changes: Effort Increases)
    console.log('Waiting for Step 4 (Progress Changes: Effort Increases)...');
    await new Promise((r) => setTimeout(r, 2200));
    await capture('mockup2-oswal-step4-progress-effort.png');

    // Wait for Step 5 (Task Completes: Filed / Completed)
    console.log('Waiting for Step 5 (Task Completes: Filed / Completed)...');
    await new Promise((r) => setTimeout(r, 2800));
    await capture('mockup2-oswal-step5-task-completed.png');

    console.log('All Mockup #2 Oswal Exports task table verification captures completed!');
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
