const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\rebuilt-mockup-verification';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function getWsUrl(port = 9268) {
  for (let i = 0; i < 30; i++) {
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
      '--remote-debugging-port=9268',
      '--window-size=1440,1100',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    const wsUrl = await getWsUrl(9268);
    const ws = new WebSocket(wsUrl);

    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        const cb = callbacks.get(msg.id);
        callbacks.delete(msg.id);
        if (msg.error) cb.reject(new Error(msg.error.message || JSON.stringify(msg.error)));
        else cb.resolve(msg.result);
      }
    };

    const send = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const curId = id++;
        callbacks.set(curId, { resolve, reject });
        ws.send(JSON.stringify({ id: curId, method, params }));
      });

    await new Promise((r) => (ws.onopen = r));
    await send('Target.setDiscoverTargets', { discover: true });

    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

    const sessionSend = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const curId = id++;
        callbacks.set(curId, { resolve, reject });
        ws.send(JSON.stringify({ id: curId, sessionId, method, params }));
      });

    await sessionSend('Page.enable');
    await sessionSend('DOM.enable');
    await sessionSend('Runtime.enable');
    await sessionSend('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1100,
      deviceScaleFactor: 1,
      mobile: false,
    });

    console.log('Navigating to http://localhost:3000?no_popup=1 ...');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000?no_popup=1' });
    await new Promise((r) => setTimeout(r, 2500));

    // Helper to capture screenshot of hero element
    async function captureHero(filename, customDelay = 0) {
      if (customDelay > 0) {
        await new Promise((r) => setTimeout(r, customDelay));
      }

      const evalRes = await sessionSend('Runtime.evaluate', {
        expression: `(() => {
          const el = document.getElementById('hero');
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
        })()`,
        returnByValue: true,
      });

      const clip = evalRes.result.value || { x: 0, y: 0, width: 1440, height: 850 };
      const screenshot = await sessionSend('Page.captureScreenshot', {
        format: 'png',
        clip: {
          x: Math.max(0, clip.x),
          y: Math.max(0, clip.y),
          width: Math.min(1440, clip.width),
          height: Math.min(1100, clip.height),
          scale: 1,
        },
      });

      const filePath = path.join(outDir, filename);
      fs.writeFileSync(filePath, Buffer.from(screenshot.data, 'base64'));
      console.log(`Saved screenshot: ${filename}`);
    }

    // 1. Initial State (Desktop 1440px)
    console.log('Capturing initial state at t=600ms...');
    await captureHero('01-hero-desktop-rebuilt-shell.png', 600);

    // 2. Status dropdown opening at t=2500ms
    console.log('Capturing status dropdown open at t=2500ms...');
    await captureHero('02-status-dropdown-opened.png', 1900);

    // 3. Filed / Completed at t=3800ms
    console.log('Capturing status filed completed at t=3800ms...');
    await captureHero('03-status-filed-completed.png', 1300);

    // 4. Workload Perspective at t=6000ms
    console.log('Capturing workload perspective at t=6000ms...');
    await captureHero('04-workload-perspective.png', 2200);

    // 5. Responsive verification
    const viewports = [
      { name: '1280px', width: 1280, height: 950 },
      { name: '1024px', width: 1024, height: 900 },
      { name: '768px', width: 768, height: 900 },
      { name: '390px', width: 390, height: 850 },
    ];

    for (const vp of viewports) {
      console.log(`Testing viewport ${vp.name}...`);
      await sessionSend('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 768,
      });
      await new Promise((r) => setTimeout(r, 600));

      const screenshot = await sessionSend('Page.captureScreenshot', { format: 'png' });
      const filePath = path.join(outDir, `hero-responsive-${vp.name}.png`);
      fs.writeFileSync(filePath, Buffer.from(screenshot.data, 'base64'));
      console.log(`Saved responsive screenshot: hero-responsive-${vp.name}.png`);
    }

    ws.close();
    console.log('Verification finished successfully!');
  } finally {
    chrome.kill();
  }
}

run().catch((err) => {
  console.error('Error running verification:', err);
  process.exit(1);
});
