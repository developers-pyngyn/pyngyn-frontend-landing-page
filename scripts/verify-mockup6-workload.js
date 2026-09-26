const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\rebuild-verification';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function getWsUrl(port = 9240) {
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
      '--remote-debugging-port=9240',
      '--window-size=1440,1150',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    const wsUrl = await getWsUrl(9240);
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
      height: 1240,
      deviceScaleFactor: 1,
      mobile: false,
    });

    async function capture(filename) {
      const { data } = await sessionSend('Page.captureScreenshot', { format: 'png' });
      const filePath = path.join(outDir, filename);
      fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
      console.log(`Saved screenshot: ${filename}`);
    }

    console.log('Navigating to http://localhost:3000/product-showcase?exp=workload ...');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/product-showcase?exp=workload' });
    await new Promise((r) => setTimeout(r, 2200));

    // Step 0: Baseline state (matching media_1790240380892.png)
    console.log('Capturing Step 0: Baseline Workload Overview...');
    await capture('mockup6-workload-step0-baseline.png');

    // Step 1: Active Tasks (22 -> 23) and Capacity (47% -> 51%) update
    await new Promise((r) => setTimeout(r, 3400));
    console.log('Capturing Step 1: Active Tasks (23) and Capacity Utilization (51%)...');
    await capture('mockup6-workload-step1-tasks-capacity.png');

    // Step 2: One team member workload change: Nikhil Jain reallocated to 35/35h teal, Vikram 15h
    await new Promise((r) => setTimeout(r, 3400));
    console.log('Capturing Step 2: Team Member Workload Reallocated (Nikhil Jain 35h optimal)...');
    await capture('mockup6-workload-step2-team-reallocated.png');

    // Step 3: At Risk count changes subtly (3 -> 2)
    await new Promise((r) => setTimeout(r, 3200));
    console.log('Capturing Step 3: At Risk deliverables reduced (3 -> 2)...');
    await capture('mockup6-workload-step3-atrisk-reduced.png');

    console.log('Verification finished successfully!');
    ws.close();
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    chrome.kill();
  }
}

run();
