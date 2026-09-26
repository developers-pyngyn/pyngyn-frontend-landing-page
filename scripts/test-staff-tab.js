const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\rebuild-verification';

async function getWsUrl(port = 9229) {
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
      '--remote-debugging-port=9229',
      '--window-size=1440,1080',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    const wsUrl = await getWsUrl(9229);
    const ws = new WebSocket(wsUrl);

    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('[BROWSER CONSOLE]', msg.params.type, msg.params.args.map(a => a.value || a.description).join(' '));
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        console.error('[BROWSER EXCEPTION]', JSON.stringify(msg.params.exceptionDetails));
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

    // 1. First test directly on /product-showcase with standalone MyWork view
    console.log('Navigating to http://localhost:3000/product-showcase ...');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/product-showcase' });
    await new Promise((r) => setTimeout(r, 3500));

    // Evaluate click on 5. My Work Workbench
    const clickResult = await sessionSend('Runtime.evaluate', {
      expression: `
        (() => {
          const btns = Array.from(document.querySelectorAll('button'));
          const myWorkBtn = btns.find(b => b.innerText.includes('5. My Work'));
          if (myWorkBtn) {
            myWorkBtn.click();
            return { found: true, text: myWorkBtn.innerText };
          }
          return { found: false, count: btns.length };
        })()
      `,
      returnByValue: true,
    });
    console.log('Product showcase click result:', clickResult.result.value);

    await new Promise((r) => setTimeout(r, 2000));

    const { data: showcaseData } = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'verified-showcase-mywork.png'), Buffer.from(showcaseData, 'base64'));
    console.log('Saved: verified-showcase-mywork.png');

    // 2. Now Navigate to Main Site and click Staff
    console.log('Navigating to http://localhost:3000/ ...');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise((r) => setTimeout(r, 3500));

    // Check personas buttons
    const personaResult = await sessionSend('Runtime.evaluate', {
      expression: `
        (() => {
          const staffBtn = document.querySelector('[data-product-target="persona-card-staff"]');
          if (staffBtn) {
            staffBtn.scrollIntoView({ behavior: 'instant', block: 'center' });
            staffBtn.click();
            return { clicked: true, text: staffBtn.innerText };
          }
          return { clicked: false };
        })()
      `,
      returnByValue: true,
    });
    console.log('Staff button click result:', personaResult.result.value);

    await new Promise((r) => setTimeout(r, 2500));

    const { data: homeStaffData } = await sessionSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'verified-home-staff-persona.png'), Buffer.from(homeStaffData, 'base64'));
    console.log('Saved: verified-home-staff-persona.png');

  } finally {
    try {
      chrome.kill();
    } catch (e) {}
  }
}

run().catch((err) => {
  console.error('Error running test:', err);
  process.exit(1);
});
