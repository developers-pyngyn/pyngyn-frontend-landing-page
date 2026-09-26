const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\rebuild-verification';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function getWsUrl(port = 9234) {
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
      '--remote-debugging-port=9234',
      '--window-size=1440,1080',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    const wsUrl = await getWsUrl(9234);
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

    console.log('Navigating to http://localhost:3000/product-showcase ...');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/product-showcase' });
    await new Promise((r) => setTimeout(r, 2500));

    // Click 3. Tasks List (Oswal)
    console.log('Selecting Tasks List tab...');
    await sessionSend('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.querySelector('[data-exp-btn="tasks"]');
          if (btn) { btn.click(); return true; }
          const btns = Array.from(document.querySelectorAll('button'));
          const target = btns.find(b => b.textContent && b.textContent.includes('Tasks List'));
          if (target) { target.click(); return true; }
          return false;
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 1200));

    // Step 0: Baseline state
    console.log('Capturing Step 0: Baseline Task List...');
    await capture('mockup3-tasklist-step0-baseline.png');

    // Step 1: Task row highlights (~2000ms after baseline)
    await new Promise((r) => setTimeout(r, 2100));
    console.log('Capturing Step 1: Task row highlight...');
    await capture('mockup3-tasklist-step1-highlight.png');

    // Step 2: Status dropdown opens (~2200ms)
    await new Promise((r) => setTimeout(r, 2200));
    console.log('Capturing Step 2: Status dropdown open...');
    await capture('mockup3-tasklist-step2-dropdown-open.png');

    // Step 3: Status changes to Internal Review (~2200ms)
    await new Promise((r) => setTimeout(r, 2200));
    console.log('Capturing Step 3: Status changed to Internal Review...');
    await capture('mockup3-tasklist-step3-internal-review.png');

    // Step 4: Progress updates (2/4h -> 3/4h) (~2200ms)
    await new Promise((r) => setTimeout(r, 2200));
    console.log('Capturing Step 4: Progress effort updated to 3/4h...');
    await capture('mockup3-tasklist-step4-progress-effort.png');

    // Step 5: Priority changes (High -> Urgent) (~2200ms)
    await new Promise((r) => setTimeout(r, 2200));
    console.log('Capturing Step 5: Priority changed to Urgent...');
    await capture('mockup3-tasklist-step5-priority-urgent.png');

    // Step 6: Due-date emphasis (02 Sep statutory pulse) (~2400ms)
    await new Promise((r) => setTimeout(r, 2400));
    console.log('Capturing Step 6: Due date statutory emphasis...');
    await capture('mockup3-tasklist-step6-due-date-emphasis.png');

    // Step 7: Task completion (Checked, strikethrough, 4/4h 100%) (~3000ms)
    await new Promise((r) => setTimeout(r, 2800));
    console.log('Capturing Step 7: Task completion (Filed/Completed)...');
    await capture('mockup3-tasklist-step7-task-completed.png');

    // Also check Homepage Hero with Tasks List active
    console.log('Navigating to homepage Hero...');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000' });
    await new Promise((r) => setTimeout(r, 3000));
    console.log('Capturing Homepage Hero with live Task List...');
    await capture('mockup3-homepage-hero-tasks.png');

    console.log('Verification finished successfully!');
    ws.close();
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    chrome.kill();
  }
}

run();
