const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\live-hero-workflow-verification';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function getWsUrl(port = 9257) {
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
      '--remote-debugging-port=9257',
      '--window-size=1440,1050',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    const wsUrl = await getWsUrl(9257);
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

    // 1. Initial State: baseline tasks, full My Work view
    await waitForStage('init');
    await new Promise((r) => setTimeout(r, 400));
    console.log('Capturing workflow-01-initial-state.png...');
    const shot0 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'workflow-01-initial-state.png'), Buffer.from(shot0.data, 'base64'));

    // 2. Tasks dynamically appearing: GSTR-2B added + Task Created overlay
    await waitForStage('tasks_appearing');
    await new Promise((r) => setTimeout(r, 800));
    console.log('Capturing workflow-02-task-created-overlay.png...');
    const shot1 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'workflow-02-task-created-overlay.png'), Buffer.from(shot1.data, 'base64'));

    // 3. Camera zooms to Status + Dropdown opens
    await waitForStage('status_dropdown');
    await new Promise((r) => setTimeout(r, 600));
    console.log('Capturing workflow-03-status-dropdown-open.png...');
    const shot2 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'workflow-03-status-dropdown-open.png'), Buffer.from(shot2.data, 'base64'));

    // 4. Status updated to Filed / Completed
    await waitForStage('status_completed');
    await new Promise((r) => setTimeout(r, 600));
    console.log('Capturing workflow-04-status-completed-overlay.png...');
    const shot3 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'workflow-04-status-completed-overlay.png'), Buffer.from(shot3.data, 'base64'));

    // 5. Camera shifts to Priority + Priority dropdown opens
    await waitForStage('priority_focus');
    await new Promise((r) => setTimeout(r, 600));
    console.log('Capturing workflow-05-priority-dropdown.png...');
    const shot4 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'workflow-05-priority-dropdown.png'), Buffer.from(shot4.data, 'base64'));

    // 6. Camera shifts to Effort + Progress updated
    await waitForStage('effort_updated');
    await new Promise((r) => setTimeout(r, 600));
    console.log('Capturing workflow-06-effort-progress-updated.png...');
    const shot5 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'workflow-06-effort-progress-updated.png'), Buffer.from(shot5.data, 'base64'));

    // 7. Full view + Grand Summary overlay
    await waitForStage('summary_zoomout');
    await new Promise((r) => setTimeout(r, 600));
    console.log('Capturing workflow-07-summary-zoomout.png...');
    const shot6 = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'workflow-07-summary-zoomout.png'), Buffer.from(shot6.data, 'base64'));

    console.log('All workflow verification captures saved successfully in ' + outDir);
    ws.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    chrome.kill();
  }
}

run();
