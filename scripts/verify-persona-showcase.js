const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\persona-showcase-verification';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function getWsUrl(port = 9262) {
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
      '--remote-debugging-port=9262',
      '--window-size=1440,1100',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    const wsUrl = await getWsUrl(9262);
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
      height: 1050,
      deviceScaleFactor: 1,
      mobile: false,
    });

    console.log('Navigating to http://localhost:3000?no_popup=1...');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000?no_popup=1' });
    await new Promise((r) => setTimeout(r, 1500));

    // Scroll down to the Persona section
    await sessionSend('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('roles');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`,
    });
    await new Promise((r) => setTimeout(r, 800));

    // 1. Capture Staff (Article Assistant: My Work)
    console.log('Capturing persona-01-staff-mywork.png...');
    const shot1 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'persona-01-staff-mywork.png'), Buffer.from(shot1.data, 'base64'));

    // Wait for live workflow progress (GSTR-3B completed state)
    await new Promise((r) => setTimeout(r, 3800));
    console.log('Capturing persona-01b-staff-task-completed.png...');
    const shot1b = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'persona-01b-staff-task-completed.png'), Buffer.from(shot1b.data, 'base64'));

    // 2. Switch to Senior (Compliance / Audit Senior: Workload)
    await sessionSend('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('[data-product-target="persona-card-senior"]');
        if (btn) btn.click();
      })()`,
    });
    await new Promise((r) => setTimeout(r, 600));
    console.log('Capturing persona-02-senior-workload.png...');
    const shot2 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'persona-02-senior-workload.png'), Buffer.from(shot2.data, 'base64'));

    // 3. Switch to Partner (Managing Partner: Statutory Command Dashboard)
    await sessionSend('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('[data-product-target="persona-card-partner"]');
        if (btn) btn.click();
      })()`,
    });
    await new Promise((r) => setTimeout(r, 600));
    console.log('Capturing persona-03-partner-dashboard.png...');
    const shot3 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'persona-03-partner-dashboard.png'), Buffer.from(shot3.data, 'base64'));

    // 4. Switch to Client (Oswal Exports ClientSpace Portal)
    await sessionSend('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('[data-product-target="persona-card-client"]');
        if (btn) btn.click();
      })()`,
    });
    await new Promise((r) => setTimeout(r, 600));
    console.log('Capturing persona-04-client-portal.png...');
    const shot4 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'persona-04-client-portal.png'), Buffer.from(shot4.data, 'base64'));

    // =========================================================================
    // RESPONSIVE VIEWPORT TESTING
    // =========================================================================
    console.log('Testing responsive viewports for Persona section...');
    // Switch back to staff for full shell responsiveness
    await sessionSend('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('[data-product-target="persona-card-staff"]');
        if (btn) btn.click();
      })()`,
    });
    await new Promise((r) => setTimeout(r, 400));

    const viewports = [
      { name: 'persona-1280px.png', width: 1280, height: 950 },
      { name: 'persona-1024px.png', width: 1024, height: 850 },
      { name: 'persona-768px.png', width: 768, height: 1024 },
      { name: 'persona-390px.png', width: 390, height: 844 },
    ];

    for (const vp of viewports) {
      await sessionSend('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 768,
      });
      await sessionSend('Runtime.evaluate', {
        expression: `(() => {
          const el = document.getElementById('roles');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        })()`,
      });
      await new Promise((r) => setTimeout(r, 600));
      const shot = await sessionSend('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(outDir, vp.name), Buffer.from(shot.data, 'base64'));
      console.log(`Captured ${vp.name}`);

      if (vp.name === 'persona-390px.png') {
        await sessionSend('Runtime.evaluate', {
          expression: 'window.scrollBy(0, 380)',
        });
        await new Promise((r) => setTimeout(r, 400));
        const scrolledShot = await sessionSend('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(outDir, 'persona-390px-scrolled.png'), Buffer.from(scrolledShot.data, 'base64'));
        console.log('Captured persona-390px-scrolled.png');
      }
    }

    console.log('All Persona section verification captures completed successfully in ' + outDir);
    ws.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    chrome.kill();
  }
}

run();
