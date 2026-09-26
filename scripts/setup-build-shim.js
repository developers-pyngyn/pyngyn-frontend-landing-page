const fs = require('fs');
const path = require('path');

try {
  const binDir = path.join(__dirname, '..', 'node_modules', '.bin');
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir, { recursive: true });
  }

  // 1. Linux/Unix executable for Cloudflare CI environment
  const unixShim = path.join(binDir, 'opennextjs-cloudflare');
  const unixContent = `#!/usr/bin/env node
const { execSync } = require('child_process');
console.log('Running @cloudflare/next-on-pages for Cloudflare Pages deployment...');
try {
  execSync('npx @cloudflare/next-on-pages@1', { stdio: 'inherit' });
} catch (err) {
  process.exit(err.status || 1);
}
`;
  fs.writeFileSync(unixShim, unixContent, { mode: 0o755 });
  try {
    fs.chmodSync(unixShim, 0o755);
  } catch (e) {}

  // 2. Windows cmd wrapper for local development
  const winShim = path.join(binDir, 'opennextjs-cloudflare.cmd');
  const winContent = `@ECHO off
npx @cloudflare/next-on-pages@1 %*
`;
  fs.writeFileSync(winShim, winContent);

  console.log('[setup-build-shim] Created opennextjs-cloudflare build shim in node_modules/.bin');
} catch (err) {
  // Non-fatal if node_modules is not writable
  console.warn('[setup-build-shim] Warning: Could not create build shim:', err.message);
}
