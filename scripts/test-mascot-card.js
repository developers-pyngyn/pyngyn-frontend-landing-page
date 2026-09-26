const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

async function test() {
  const c = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9225',
    '--window-size=1280,1050',
    'about:blank',
  ]);
  await new Promise((r) => setTimeout(r, 1000));
  const json = await new Promise((res) =>
    http.get('http://127.0.0.1:9225/json/version', (r) => {
      let b = '';
      r.on('data', (c) => (b += c));
      r.on('end', () => res(JSON.parse(b)));
    })
  );
  const ws = new WebSocket(json.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 1;
  const send = (m, p = {}) =>
    new Promise((res) => {
      const mid = id++;
      const h = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === mid) {
          ws.removeEventListener('message', h);
          res(msg.result);
        }
      };
      ws.addEventListener('message', h);
      ws.send(JSON.stringify({ id: mid, method: m, params: p }));
    });
  const t = await send('Target.createTarget', { url: 'http://localhost:3005' });
  const s = await send('Target.attachToTarget', {
    targetId: t.targetId,
    flatten: true,
  });
  const sid = s.sessionId;
  const sendS = (m, p = {}) =>
    new Promise((res) => {
      const mid = id++;
      const h = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === mid) {
          ws.removeEventListener('message', h);
          res(msg.result);
        }
      };
      ws.addEventListener('message', h);
      ws.send(JSON.stringify({ id: mid, sessionId: sid, method: m, params: p }));
    });
  await new Promise((r) => setTimeout(r, 2000));
  await sendS('Runtime.evaluate', {
    expression: `
      (() => {
        const pyng = document.querySelector('[title="Click to interact with Pyng"]');
        if (pyng) pyng.click();
      })();
    `,
  });
  await new Promise((r) => setTimeout(r, 1000));
  const shot = await sendS('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(
    'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\screenshots\\pyng-interactive-card.png',
    Buffer.from(shot.data, 'base64')
  );
  console.log('Pyng card captured');
  ws.close();
  c.kill();
}
test();
