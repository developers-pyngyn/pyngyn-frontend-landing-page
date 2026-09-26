const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\rebuild-verification';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function getWsUrl(port = 9226) {
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
      '--remote-debugging-port=9226',
      '--window-size=1440,960',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    const wsUrl = await getWsUrl(9226);
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
    await sessionSend('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 960,
      deviceScaleFactor: 1,
      mobile: false,
    });

    console.log('Navigating to http://localhost:3000/product-showcase/ ...');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/product-showcase/' });

    // Wait for page initial compilation
    await new Promise((r) => setTimeout(r, 6000));

    // Helper to click tab by matching label text and take screenshot
    async function screenshotTab(buttonText, outputFileName, waitTime = 2000) {
      console.log(`Selecting experience: "${buttonText}" -> ${outputFileName}`);
      await sessionSend('Runtime.evaluate', {
        expression: `
          (() => {
            // Safely hide cookie banner without deleting React DOM nodes
            const banner = document.querySelector('#cookie-banner');
            if (banner) banner.style.display = 'none';

            const buttons = Array.from(document.querySelectorAll('button'));
            const closeBtn = buttons.find(b => b.textContent && (b.textContent.includes('No thanks') || b.textContent.includes('Reject all')));
            if (closeBtn) closeBtn.click();

            const btn = buttons.find(b => b.textContent && b.textContent.includes('${buttonText}'));
            if (btn) {
              btn.click();
              return true;
            }
            return false;
          })()
        `,
      });

      await new Promise((r) => setTimeout(r, waitTime));

      const screenshot = await sessionSend('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(outDir, outputFileName), Buffer.from(screenshot.data, 'base64'));
      console.log(`Saved screenshot: ${outputFileName}`);
    }

    // 1. Workload (Reference 6)
    await screenshotTab('6. Workload Overview', 'part2-exp6-workload.png', 2500);

    // 2. Calendar (Reference 7)
    await screenshotTab('7. Statutory Calendar', 'part2-exp7-calendar.png', 2500);

    // 3. Compliance (Reference 8)
    await screenshotTab('8. Compliance Hub', 'part2-exp8-compliance.png', 2500);

    // 4. Client Workspace (Reference 9)
    await screenshotTab('9. Client Workspace', 'part2-exp9-clientspace.png', 2500);

    // 5. Automated Workload Animation
    await screenshotTab('★ Auto-Animated Workload', 'part2-animated-workload.png', 2500);

    // 6. Automated Calendar Animation
    await screenshotTab('★ Auto-Animated Calendar', 'part2-animated-calendar.png', 2500);

    // 7. Automated Portal Animation
    await screenshotTab('★ Auto-Animated Client Portal', 'part2-animated-portal.png', 2500);

    // 8. Regression Verification of Part 1 (Hero shell, Tasks, Board, My Work)
    await screenshotTab('1. Hero Shell', 'part2-regression-exp1-hero.png', 2000);
    await screenshotTab('3. Tasks List', 'part2-regression-exp3-tasks.png', 2000);
    await screenshotTab('4. Kanban Board', 'part2-regression-exp4-board.png', 2000);
    await screenshotTab('5. My Work', 'part2-regression-exp5-mywork.png', 2000);

    console.log('All Part 2 and regression screenshots captured successfully!');
  } finally {
    chrome.kill();
  }
}

run().catch((err) => {
  console.error('Verification error:', err);
  process.exit(1);
});
