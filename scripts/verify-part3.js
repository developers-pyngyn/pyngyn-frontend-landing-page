const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\rebuild-verification';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function getWsUrl(port = 9227) {
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
      '--remote-debugging-port=9227',
      '--window-size=1440,1080',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    const wsUrl = await getWsUrl(9227);
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

    console.log('Navigating to http://localhost:3000/product-showcase ...');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/product-showcase' });
    await new Promise((r) => setTimeout(r, 3500));

    async function capture(filename) {
      const { data } = await sessionSend('Page.captureScreenshot', { format: 'png' });
      const filePath = path.join(outDir, filename);
      fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
      console.log(`Saved screenshot: ${filename}`);
    }

    async function clickTabByText(text) {
      await sessionSend('Runtime.evaluate', {
        expression: `
          (() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const btn = buttons.find(b => b.innerText && b.innerText.includes('${text}'));
            if (btn) {
              btn.click();
              return true;
            }
            return false;
          })()
        `,
      });
      await new Promise((r) => setTimeout(r, 2200));
    }

    // Capture all 8 automated workflows + mascot AI
    const workflows = [
      { text: 'WF1: Task Status', file: 'part3-wf1-task-status.png' },
      { text: 'WF2: GST Filing', file: 'part3-wf2-gst-filing.png' },
      { text: 'WF3: ClientSpace Synchronization', file: 'part3-wf3-sync.png' },
      { text: 'WF4: Kanban Board', file: 'part3-wf4-board.png' },
      { text: 'WF5: Workload Recalculation', file: 'part3-wf5-workload.png' },
      { text: 'WF6: Calendar Deadlines', file: 'part3-wf6-calendar.png' },
      { text: 'WF7: Compliance Hub', file: 'part3-wf7-compliance.png' },
      { text: 'WF8: Client Documents', file: 'part3-wf8-documents.png' },
      { text: 'Pyngyn AI Mascot Scanner', file: 'part3-wf-ai-scanner.png' },
      { text: '2. Executive Command Dashboard', file: 'part3-exp2-executive-command.png' },
    ];

    for (const wf of workflows) {
      console.log(`Capturing ${wf.text}...`);
      await clickTabByText(wf.text);
      await capture(wf.file);
    }

    // Now test Main Landing Page (http://localhost:3000)
    console.log('Navigating to http://localhost:3000/ ...');
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise((r) => setTimeout(r, 3500));

    // Suppress PromoPopup and Cookie Banner for clean screenshot capture
    await sessionSend('Runtime.evaluate', {
      expression: `
        (() => {
          sessionStorage.setItem('pyngyn-promo-dismissed', 'true');
          const popups = document.querySelectorAll('[role="dialog"], .fixed.inset-0.z-50');
          popups.forEach(p => p.remove());
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 1000));

    // Capture Hero
    await capture('part3-home-hero.png');

    // Scroll to Persona Switcher
    await sessionSend('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('roles');
          if (el) el.scrollIntoView({ behavior: 'instant' });
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 2000));
    await capture('part3-home-persona-section.png');

    // Click "Managing Partner" role to test Statutory Audit & Tax Command
    await sessionSend('Runtime.evaluate', {
      expression: `
        (() => {
          const btns = Array.from(document.querySelectorAll('button'));
          const partnerBtn = btns.find(b => b.innerText && b.innerText.includes('Managing Partner'));
          if (partnerBtn) partnerBtn.click();
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 1500));
    await capture('part3-home-persona-partner.png');

    // Scroll to Workflow Showcase
    await sessionSend('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('see-it-in-action');
          if (el) el.scrollIntoView({ behavior: 'instant' });
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 2500));
    await capture('part3-home-workflow-showcase.png');

    // Scroll to Feature Grid
    await sessionSend('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('features-grid');
          if (el) el.scrollIntoView({ behavior: 'instant' });
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 2000));
    await capture('part3-home-feature-grid.png');

    // Test Responsive Mobile (390px)
    console.log('Testing Responsive Mobile (390x844)...');
    await sessionSend('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sessionSend('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise((r) => setTimeout(r, 2500));
    await sessionSend('Runtime.evaluate', { expression: `(() => { sessionStorage.setItem('pyngyn-promo-dismissed', 'true'); document.querySelectorAll('[role="dialog"], .fixed.inset-0.z-50').forEach(p => p.remove()); })()` });
    await capture('part3-home-mobile-390.png');

    // Test Responsive Tablet (768px)
    console.log('Testing Responsive Tablet (768x1024)...');
    await sessionSend('Emulation.setDeviceMetricsOverride', {
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      mobile: false,
    });
    await new Promise((r) => setTimeout(r, 2000));
    await sessionSend('Runtime.evaluate', { expression: `(() => { sessionStorage.setItem('pyngyn-promo-dismissed', 'true'); document.querySelectorAll('[role="dialog"], .fixed.inset-0.z-50').forEach(p => p.remove()); })()` });
    await capture('part3-home-tablet-768.png');

    console.log('All Part 3 visual verifications completed successfully!');
    ws.close();
  } catch (err) {
    console.error('Verification error:', err);
  } finally {
    chrome.kill();
  }
}

run();
