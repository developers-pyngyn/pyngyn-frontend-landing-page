const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\final-visual-qa';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function getWsUrl(port = 9250) {
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

const SCREENS = [
  { id: 'hero', name: 'Mockup 1: Hero Shell' },
  { id: 'oswal-client', name: 'Mockup 2: Oswal Exports Client View' },
  { id: 'tasks', name: 'Mockup 3: Task List' },
  { id: 'board', name: 'Mockup 4: Task Board' },
  { id: 'mywork', name: 'Mockup 5: My Work Detailed' },
  { id: 'workload', name: 'Mockup 6: Workload Overview' },
  { id: 'calendar', name: 'Mockup 7: Statutory Calendar' },
  { id: 'compliance', name: 'Mockup 8: Compliance Hub' },
  { id: 'clientspace', name: 'Mockup 9: Client Portal' },
  { id: 'executive-command', name: 'Mockup 10: Executive Command Dashboard' },
];

const VIEWPORTS = [
  { width: 1440, height: 1000, label: '1440px' },
  { width: 1280, height: 900, label: '1280px' },
  { width: 1024, height: 800, label: '1024px' },
  { width: 768, height: 900, label: '768px' },
  { width: 390, height: 844, label: '390px' },
  { width: 375, height: 812, label: '375px' },
];

async function run() {
  const chrome = spawn(
    chromePath,
    [
      '--headless=new',
      '--disable-gpu',
      '--remote-debugging-port=9250',
      '--window-size=1440,1100',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    const wsUrl = await getWsUrl(9250);
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

    async function setViewport(w, h) {
      await sessionSend('Emulation.setDeviceMetricsOverride', {
        width: w,
        height: h,
        deviceScaleFactor: 1,
        mobile: w < 768,
      });
    }

    async function capture(filename) {
      const { data } = await sessionSend('Page.captureScreenshot', { format: 'png' });
      const filePath = path.join(outDir, filename);
      fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
      console.log(`Saved screenshot: ${filename}`);
    }

    console.log('=== STARTING FINAL VISUAL QA AUDIT ===');

    // 1. Audit each screen at desktop 1440px
    await setViewport(1440, 1100);
    for (const screen of SCREENS) {
      console.log(`Testing [${screen.name}] at 1440px...`);
      await sessionSend('Page.navigate', { url: `http://localhost:3000/product-showcase?exp=${screen.id}` });
      await new Promise((r) => setTimeout(r, 2000));

      // Scroll camera into view
      await sessionSend('Runtime.evaluate', {
        expression: `
          (() => {
            const el = document.querySelector('[data-product-camera-container]');
            if (el) {
              el.scrollIntoView({ block: 'center' });
              return true;
            }
            return false;
          })()
        `,
      });
      await new Promise((r) => setTimeout(r, 500));

      // Verify overflow and nested scrollbars
      const auditResult = await sessionSend('Runtime.evaluate', {
        expression: `
          (() => {
            const camera = document.querySelector('[data-product-camera-container]');
            if (!camera) return { found: false };
            const rect = camera.getBoundingClientRect();
            const elementsWithScroll = Array.from(camera.querySelectorAll('*')).filter(el => {
              const s = window.getComputedStyle(el);
              return (s.overflowY === 'scroll' || (s.overflowY === 'auto' && el.scrollHeight > el.clientHeight && el.clientHeight > 100));
            }).map(el => ({
              tag: el.tagName,
              cls: el.className,
              scrollHeight: el.scrollHeight,
              clientHeight: el.clientHeight
            }));

            return {
              found: true,
              width: rect.width,
              height: rect.height,
              elementsWithScroll: elementsWithScroll.length,
              scrollDetails: elementsWithScroll
            };
          })()
        `,
        returnByValue: true,
      });

      console.log(`Audit result for ${screen.id}:`, auditResult.result.value);
      await capture(`qa-1440px-${screen.id}.png`);
    }

    // 2. Audit responsive viewports across key screens (Hero, Oswal Tasks, Calendar, Client Portal)
    const responsiveTestScreens = ['hero', 'tasks', 'calendar', 'clientspace'];
    for (const vp of VIEWPORTS.slice(1)) { // 1280, 1024, 768, 390, 375
      console.log(`\nTesting responsive viewport: ${vp.label} (${vp.width}x${vp.height})...`);
      await setViewport(vp.width, vp.height);

      for (const screenId of responsiveTestScreens) {
        await sessionSend('Page.navigate', { url: `http://localhost:3000/product-showcase?exp=${screenId}` });
        await new Promise((r) => setTimeout(r, 1800));

        await sessionSend('Runtime.evaluate', {
          expression: `
            (() => {
              const el = document.querySelector('[data-product-camera-container]');
              if (el) {
                el.scrollIntoView({ block: 'center' });
                return true;
              }
              return false;
            })()
          `,
        });
        await new Promise((r) => setTimeout(r, 400));
        await capture(`qa-${vp.label}-${screenId}.png`);
      }
    }

    console.log('\n=== FINAL VISUAL QA AUDIT COMPLETED SUCCESSFULLY! ===');
    ws.close();
  } catch (err) {
    console.error('Error during QA audit:', err);
  } finally {
    chrome.kill();
  }
}

run();
