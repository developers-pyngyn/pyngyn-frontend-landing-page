const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\This PC\\.gemini\\antigravity\\brain\\c40b2bf7-a700-40e9-9ced-40f1935cf233\\screenshots';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function capture(url, filename, width = 1280, height = 1000) {
  const outFile = path.join(outDir, filename);
  const cmd = `"${chrome}" --headless=new --disable-gpu --window-size=${width},${height} --screenshot="${outFile}" "${url}"`;
  execSync(cmd, { stdio: 'inherit' });
  console.log(`Captured: ${filename}`);
}

capture('http://localhost:3005', 'hero-authentic-mockup.png', 1280, 1050);
capture('http://localhost:3005#tour', 'tour-tasks-authentic-mockup.png', 1280, 1100);
capture('http://localhost:3005#client-management', 'client-management-authentic-mockup.png', 1280, 1100);
capture('http://localhost:3005#workload', 'workload-authentic-mockup.png', 1280, 1100);
capture('http://localhost:3005#dashboard', 'dashboard-authentic-mockup.png', 1280, 1100);
