const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\screenshots';

async function getWsUrl(port = 9222) {
  for (let i = 0; i < 20; i++) {
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
  throw new Error('Could not get debugger URL');
}

async function run() {
  const chrome = spawn(
    chromePath,
    [
      '--headless=new',
      '--disable-gpu',
      '--remote-debugging-port=9222',
      '--window-size=1280,1050',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    const wsUrl = await getWsUrl(9222);
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

    const target = await send('Target.createTarget', { url: 'http://localhost:3005' });
    const session = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
    const sessionId = session.sessionId;

    const sendSession = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const msgId = id++;
        callbacks.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, sessionId, method, params }));
      });

    await sendSession('Page.enable');
    await sendSession('DOM.enable');

    await new Promise((r) => setTimeout(r, 3000));

    // Disable exit intent / lead capture dialogs
    await sendSession('Runtime.evaluate', {
      expression: `
        window.addEventListener('beforeunload', (e) => e.stopImmediatePropagation(), true);
        const style = document.createElement('style');
        style.textContent = '[role="dialog"], [aria-modal="true"], .fixed.inset-0 { display: none !important; }';
        document.head.appendChild(style);
      `,
    });

    const targets = [
      { id: '#dashboard', name: 'verified-calendar-clean.png', clickBtn: 'Statutory Filing Calendar' },
    ];

    for (const t of targets) {
      const evalRes = await sendSession('Runtime.evaluate', {
        expression: `
          (() => {
            const el = document.querySelector('${t.id}');
            if (el) {
              const rect = el.getBoundingClientRect();
              const top = rect.top + window.scrollY - 30;
              window.scrollTo(0, top);
              if ('${t.clickBtn || ''}') {
                const btn = Array.from(el.querySelectorAll('button')).find(b => b.textContent.includes('${t.clickBtn || ''}'));
                if (btn) btn.click();
              }
              return { found: true, top, rectHeight: rect.height };
            }
            return { found: false };
          })();
        `,
        returnByValue: true,
      });
      console.log(t.id, evalRes.result.value);
      await new Promise((r) => setTimeout(r, 1200));

      const res = await sendSession('Page.captureScreenshot', { format: 'png' });
      const buf = Buffer.from(res.data, 'base64');
      fs.writeFileSync(path.join(outDir, t.name), buf);
      console.log(`Saved: ${t.name} (${buf.length} bytes)`);
    }

    ws.close();
  } finally {
    chrome.kill();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
