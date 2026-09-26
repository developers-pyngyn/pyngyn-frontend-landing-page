const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\rebuild-verification';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function getWsUrl(port = 9225) {
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
      '--remote-debugging-port=9225',
      '--window-size=1440,960',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    const wsUrl = await getWsUrl(9225);
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

    await new Promise((resolve) => (ws.onopen = resolve));

    const send = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const msgId = id++;
        callbacks.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });

    // 1. Capture Product Showcase experiences
    const target1 = await send('Target.createTarget', { url: 'http://localhost:3000/product-showcase/' });
    const session1 = await send('Target.attachToTarget', { targetId: target1.targetId, flatten: true });
    const sId = session1.sessionId;

    const sendSession = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const msgId = id++;
        callbacks.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, sessionId: sId, method, params }));
      });

    await sendSession('Page.enable');
    await sendSession('DOM.enable');
    await new Promise((r) => setTimeout(r, 4000));

    async function takeScreenshot(filename) {
      const res = await sendSession('Page.captureScreenshot', { format: 'png' });
      const buf = Buffer.from(res.data, 'base64');
      const dest = path.join(outDir, filename);
      fs.writeFileSync(dest, buf);
      console.log(`Saved: ${filename} (${buf.length} bytes)`);
    }

    // Capture Experience 1 (Hero Shell with Oswal Tasks)
    await takeScreenshot('exp1-hero-tasks-shell.png');

    // Select Experience 2: ClientSpace
    await sendSession('Runtime.evaluate', {
      expression: `
        (() => {
          const btns = Array.from(document.querySelectorAll('button'));
          const b = btns.find(el => el.textContent.includes('ClientSpace Portal'));
          if (b) b.click();
        })();
      `
    });
    await new Promise((r) => setTimeout(r, 1000));
    await takeScreenshot('exp2-clientspace-portal.png');

    // Select Experience 3: Tasks List
    await sendSession('Runtime.evaluate', {
      expression: `
        (() => {
          const btns = Array.from(document.querySelectorAll('button'));
          const b = btns.find(el => el.textContent.includes('Tasks List'));
          if (b) b.click();
        })();
      `
    });
    await new Promise((r) => setTimeout(r, 1000));
    await takeScreenshot('exp3-tasks-table.png');

    // Select Experience 4: Kanban Board
    await sendSession('Runtime.evaluate', {
      expression: `
        (() => {
          const btns = Array.from(document.querySelectorAll('button'));
          const b = btns.find(el => el.textContent.includes('Kanban Board'));
          if (b) b.click();
        })();
      `
    });
    await new Promise((r) => setTimeout(r, 1000));
    await takeScreenshot('exp4-kanban-board.png');

    // Select Experience 5: My Work Workbench
    await sendSession('Runtime.evaluate', {
      expression: `
        (() => {
          const btns = Array.from(document.querySelectorAll('button'));
          const b = btns.find(el => el.textContent.includes('My Work Workbench'));
          if (b) b.click();
        })();
      `
    });
    await new Promise((r) => setTimeout(r, 1000));
    await takeScreenshot('exp5-my-work.png');

    // 2. Capture Home page hero and persona section
    await sendSession('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise((r) => setTimeout(r, 2500));

    // Scroll to hero
    await sendSession('Runtime.evaluate', {
      expression: `window.scrollTo(0, 100);`
    });
    await new Promise((r) => setTimeout(r, 800));
    await takeScreenshot('home-hero-real-component.png');

    // Scroll to persona section mockup
    await sendSession('Runtime.evaluate', {
      expression: `
        const el = document.querySelector('#roles [data-hero-mockup-frame], #roles .max-w-\\\\[1140px\\\\]');
        if (el) {
          window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 100);
        } else {
          window.scrollTo(0, 1600);
        }
      `
    });
    await new Promise((r) => setTimeout(r, 1200));
    await takeScreenshot('home-persona-mockup-frame.png');

    ws.close();
  } finally {
    chrome.kill();
  }
}

run().catch((err) => {
  console.error('Capture script error:', err);
  process.exit(1);
});
