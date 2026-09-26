const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\hero-redesign-verification';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function getWsUrl(port = 9253) {
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
      '--remote-debugging-port=9253',
      '--window-size=1440,1100',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    const wsUrl = await getWsUrl(9253);
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
        const curId = id++;
        callbacks.set(curId, { resolve, reject });
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    };

    await new Promise((r) => (ws.onopen = r));
    await send('Target.setDiscoverTargets', { discover: true });

    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

    const sessionSend = (method, params = {}) => {
      return new Promise((resolve, reject) => {
        const curId = id++;
        callbacks.set(curId, { resolve, reject });
        ws.send(JSON.stringify({ id: curId, sessionId, method, params }));
      });
    };

    await sessionSend('Page.enable');
    await sessionSend('DOM.enable');
    await sessionSend('Runtime.enable');
    await sessionSend('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 960,
      deviceScaleFactor: 1,
      mobile: false,
    });

    console.log('Navigating to http://localhost:3000?no_popup=1...');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000?no_popup=1' });
    await new Promise((r) => setTimeout(r, 600));

    // 1. Initial State (2 tasks visible)
    console.log('Capturing step0-baseline-2tasks.png...');
    const shotBase = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'step0-baseline-2tasks.png'), Buffer.from(shotBase.data, 'base64'));

    // 2. All 6 tasks populated (at ~4.2s)
    await new Promise((r) => setTimeout(r, 3800));
    console.log('Capturing step1-all-6tasks.png...');
    const shot6 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'step1-all-6tasks.png'), Buffer.from(shot6.data, 'base64'));

    // 3. Zoomed in + Status dropdown open (at ~6.8s)
    await new Promise((r) => setTimeout(r, 2600));
    console.log('Capturing step2-zoomed-dropdown-open.png...');
    const shotDropdown = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'step2-zoomed-dropdown-open.png'), Buffer.from(shotDropdown.data, 'base64'));

    // 4. Status updated to In Progress + effort updated to 5/8h (at ~9.2s)
    await new Promise((r) => setTimeout(r, 2400));
    console.log('Capturing step3-status-updated-inprogress.png...');
    const shotUpdated = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'step3-status-updated-inprogress.png'), Buffer.from(shotUpdated.data, 'base64'));

    // 5. Workload section
    console.log('Capturing workload-section.png...');
    await sessionSend('Runtime.evaluate', {
      expression: `document.getElementById('workload')?.scrollIntoView({ behavior: 'instant' });`,
    });
    await new Promise((r) => setTimeout(r, 1500));
    const shotWorkload = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'workload-section.png'), Buffer.from(shotWorkload.data, 'base64'));

    // 6. Responsive viewports
    const viewports = [
      { name: '1280px', width: 1280, height: 800 },
      { name: '1024px', width: 1024, height: 768 },
      { name: '768px', width: 768, height: 1024 },
      { name: '390px', width: 390, height: 844 },
      { name: '375px', width: 375, height: 812 },
    ];

    for (const vp of viewports) {
      console.log(`Capturing hero at ${vp.name}...`);
      await sessionSend('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 768,
      });
      await sessionSend('Runtime.evaluate', {
        expression: `window.scrollTo(0, 0);`,
      });
      await new Promise((r) => setTimeout(r, 1200));
      const shotVp = await sessionSend('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(outDir, `hero-${vp.name}.png`), Buffer.from(shotVp.data, 'base64'));
    }

    console.log('All verification captures saved successfully in ' + outDir);
    ws.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    chrome.kill();
  }
}

run();
