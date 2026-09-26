const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\native-hero-verification';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function getWsUrl(port = 9260) {
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
      '--remote-debugging-port=9260',
      '--window-size=1440,1050',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    const wsUrl = await getWsUrl(9260);
    const ws = new WebSocket(wsUrl);

    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map((a) => a.value || a.description).join(' ');
        console.log('[BrowserConsole]', text);
      }
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
    await new Promise((r) => setTimeout(r, 1200));

    const waitForStage = async (stageName, timeoutMs = 30000) => {
      const start = Date.now();
      while (Date.now() - start < timeoutMs) {
        const res = await sessionSend('Runtime.evaluate', {
          expression: `!!document.querySelector('[data-workflow-stage="${stageName}"]')`,
          returnByValue: true,
        });
        if (res.result && res.result.value === true) {
          return true;
        }
        await new Promise((r) => setTimeout(r, 60));
      }
      throw new Error(`Timeout waiting for stage: ${stageName}`);
    };

    // 1. Initial State: baseline tasks
    await waitForStage('init');
    await new Promise((r) => setTimeout(r, 800));
    const evalData = await sessionSend('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('[data-workflow-stage="init"]');
        const wrap = el ? el.firstElementChild : null;
        const canvas = wrap ? wrap.firstElementChild : null;
        return JSON.stringify({
          containerWidth: el ? el.clientWidth : 0,
          wrapWidth: wrap ? wrap.clientWidth : 0,
          canvasRect: canvas ? canvas.getBoundingClientRect() : null,
          wrapStyle: wrap ? wrap.getAttribute('style') : null,
          canvasStyle: canvas ? canvas.getAttribute('style') : null
        });
      })()`,
      returnByValue: true
    });
    console.log('DOM Evaluation:', evalData.result.value);
    console.log('Capturing stage-01-initial-state.png...');
    const shot1 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'stage-01-initial-state.png'), Buffer.from(shot1.data, 'base64'));

    // 2. Tasks dynamically appearing in table
    await waitForStage('tasks_creating');
    await new Promise((r) => setTimeout(r, 400));
    console.log('Capturing stage-02-tasks-created.png...');
    const shot2 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'stage-02-tasks-created.png'), Buffer.from(shot2.data, 'base64'));

    // 3. Pointer actively targeting and clicking GSTR-3B
    await waitForStage('pointer_targeting');
    await new Promise((r) => setTimeout(r, 300));
    console.log('Capturing stage-03-pointer-active.png...');
    const shot3 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'stage-03-pointer-active.png'), Buffer.from(shot3.data, 'base64'));

    // 4. Document processing / progress fill
    await waitForStage('doc_processing');
    await new Promise((r) => setTimeout(r, 400));
    console.log('Capturing stage-04-doc-processing.png...');
    const shot4 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'stage-04-doc-processing.png'), Buffer.from(shot4.data, 'base64'));

    // 5. Document received, status Filed / Completed, row checked, overlay appears
    await waitForStage('doc_received');
    await new Promise((r) => setTimeout(r, 500));
    console.log('Capturing stage-05-filed-overlay.png...');
    const shot5 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'stage-05-filed-overlay.png'), Buffer.from(shot5.data, 'base64'));

    // 6. Automation nodes triggered (Node 1 -> 4)
    await waitForStage('auto_triggered');
    await new Promise((r) => setTimeout(r, 600));
    console.log('Capturing stage-06-automation-nodes.png...');
    const shot6 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'stage-06-automation-nodes.png'), Buffer.from(shot6.data, 'base64'));

    // 7. Workload perspective
    await waitForStage('workload');
    await new Promise((r) => setTimeout(r, 600));
    console.log('Capturing stage-07-workload-recalculated.png...');
    const shot7 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'stage-07-workload-recalculated.png'), Buffer.from(shot7.data, 'base64'));

    // 8. Compliance Dashboard perspective
    await waitForStage('dashboard');
    await new Promise((r) => setTimeout(r, 600));
    console.log('Capturing stage-08-compliance-dashboard.png...');
    const shot8 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'stage-08-compliance-dashboard.png'), Buffer.from(shot8.data, 'base64'));

    // 9. Client Portal sync perspective (Oswal Exports)
    await waitForStage('client_portal_sync');
    await new Promise((r) => setTimeout(r, 800));
    console.log('Capturing stage-09-client-portal-sync.png...');
    const shot9 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'stage-09-client-portal-sync.png'), Buffer.from(shot9.data, 'base64'));

    // =========================================================================
    // RESPONSIVE VIEWPORT TESTING
    // =========================================================================
    console.log('Testing responsive viewports...');
    const viewports = [
      { name: 'hero-1280px.png', width: 1280, height: 900 },
      { name: 'hero-1024px.png', width: 1024, height: 800 },
      { name: 'hero-768px.png', width: 768, height: 1024 },
      { name: 'hero-390px.png', width: 390, height: 844 },
      { name: 'hero-375px.png', width: 375, height: 667 },
    ];

    for (const vp of viewports) {
      await sessionSend('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 768,
      });
      await new Promise((r) => setTimeout(r, 500));
      const shot = await sessionSend('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(outDir, vp.name), Buffer.from(shot.data, 'base64'));
      console.log(`Captured ${vp.name}`);

      if (vp.name === 'hero-390px.png') {
        await sessionSend('Runtime.evaluate', {
          expression: 'window.scrollTo(0, 520)',
        });
        await new Promise((r) => setTimeout(r, 400));
        const scrolledShot = await sessionSend('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(outDir, 'hero-390px-scrolled.png'), Buffer.from(scrolledShot.data, 'base64'));
        console.log('Captured hero-390px-scrolled.png');
        await sessionSend('Runtime.evaluate', {
          expression: 'window.scrollTo(0, 0)',
        });
      }
    }

    console.log('All native hero verification captures completed successfully in ' + outDir);
    ws.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    chrome.kill();
  }
}

run();
