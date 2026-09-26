const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\rebuild-verification';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function getWsUrl(port = 9237) {
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
      '--remote-debugging-port=9237',
      '--window-size=1440,1080',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    const wsUrl = await getWsUrl(9237);
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

    console.log('Navigating to http://localhost:3000/product-showcase?exp=mywork ...');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/product-showcase?exp=mywork' });
    await new Promise((r) => setTimeout(r, 2500));

    // Step 0: Baseline state
    console.log('Capturing Step 0: Baseline My Work (matching media_1790240364646.png)...');
    await capture('mockup5-mywork-step0-baseline.png');

    // Step 1: Task selection & timer start (~2400ms)
    await new Promise((r) => setTimeout(r, 2500));
    console.log('Capturing Step 1: Task selection & active timer...');
    await capture('mockup5-mywork-step1-selected-timer.png');

    // Step 2: Status transition to Internal Review (~2400ms)
    await new Promise((r) => setTimeout(r, 2500));
    console.log('Capturing Step 2: Status transition (Internal Review)...');
    await capture('mockup5-mywork-step2-internal-review.png');

    // Step 3: Effort update (~2400ms)
    await new Promise((r) => setTimeout(r, 2500));
    console.log('Capturing Step 3: Effort meter update (6.5/8h)...');
    await capture('mockup5-mywork-step3-effort-update.png');

    // Step 4: Priority change (~2200ms)
    await new Promise((r) => setTimeout(r, 2300));
    console.log('Capturing Step 4: Priority escalation (Urgent)...');
    await capture('mockup5-mywork-step4-priority-urgent.png');

    // Step 5: Completion (~3000ms)
    await new Promise((r) => setTimeout(r, 2800));
    console.log('Capturing Step 5: Task completion (Filed/Completed, strikethrough)...');
    await capture('mockup5-mywork-step5-completed.png');

    // Check Homepage Persona Switcher with Staff persona
    console.log('Navigating to homepage Persona Switcher with ?persona=staff...');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/?persona=staff' });
    await new Promise((r) => setTimeout(r, 2500));

    // Scroll down to persona section
    await sessionSend('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('persona-showcase-section') || document.querySelector('[data-product-target="persona-card-staff"]');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 1200));
    console.log('Capturing Homepage Persona Switcher (Staff / Article Trainee)...');
    await capture('mockup5-persona-staff.png');

    console.log('Verification finished successfully!');
    ws.close();
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    chrome.kill();
  }
}

run();
