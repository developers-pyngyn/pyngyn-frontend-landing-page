const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\mockup10-verification';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function getWsUrl(port = 9251) {
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
      '--remote-debugging-port=9251',
      '--window-size=1440,1100',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    const wsUrl = await getWsUrl(9251);
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
      height: 1100,
      deviceScaleFactor: 1,
      mobile: false,
    });

    async function capture(filename) {
      const { data } = await sessionSend('Page.captureScreenshot', { format: 'png' });
      const filePath = path.join(outDir, filename);
      fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
      console.log(`Saved screenshot: ${filename}`);
    }

    console.log('--- Step 0: Baseline ClientSpace View ---');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/product-showcase?exp=clientspace&step=0' });
    await new Promise((r) => setTimeout(r, 2200));

    await sessionSend('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.querySelector('[data-product-camera-container]');
          if (el) {
            el.scrollIntoView({ block: 'center' });
            return true;
          }
          return false;
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 500));
    await capture('mockup10-clientspace-step0-baseline.png');

    console.log('--- Step 1: Upcoming Deadline Highlighted ---');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/product-showcase?exp=clientspace&step=1' });
    await new Promise((r) => setTimeout(r, 1600));
    await capture('mockup10-clientspace-step1-deadline-highlighted.png');

    console.log('--- Step 2: Document Received & 80% Progress ---');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/product-showcase?exp=clientspace&step=2' });
    await new Promise((r) => setTimeout(r, 1600));
    await capture('mockup10-clientspace-step2-doc-received.png');

    console.log('--- Step 3: 82% Gauge & 92% Service Progress ---');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/product-showcase?exp=clientspace&step=3' });
    await new Promise((r) => setTimeout(r, 1600));
    await capture('mockup10-clientspace-step3-gauge-elevated.png');

    console.log('--- Homepage Client Portal Section Verification ---');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/#client-portal' });
    await new Promise((r) => setTimeout(r, 2500));

    await sessionSend('Runtime.evaluate', {
      expression: `
        (() => {
          const sec = document.querySelector('#client-portal');
          if (sec) {
            sec.scrollIntoView({ block: 'center' });
            return true;
          }
          return false;
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 600));
    await capture('mockup10-homepage-client-portal-section.png');

    console.log('All Mockup #10 visual QA checks completed successfully!');
    ws.close();
  } catch (err) {
    console.error('Error during Mockup #10 verification:', err);
  } finally {
    chrome.kill();
  }
}

run();
