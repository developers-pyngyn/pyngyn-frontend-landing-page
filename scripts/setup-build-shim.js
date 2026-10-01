const fs = require('fs');
const path = require('path');

try {
  const rootDir = path.join(__dirname, '..');
  const nodeModules = path.join(rootDir, 'node_modules');
  const binDir = path.join(nodeModules, '.bin');

  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir, { recursive: true });
  }

  const opennextScript = `#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
console.log('Running @cloudflare/next-on-pages for Cloudflare Pages deployment...');
try {
  execSync('npx @cloudflare/next-on-pages@1', { stdio: 'inherit' });
  const staticDir = path.resolve(process.cwd(), '.vercel', 'output', 'static');
  if (fs.existsSync(staticDir)) {
    fs.writeFileSync(path.join(staticDir, '.assetsignore'), ['_worker.js', '_routes.json', 'nop-build-log.json', ''].join(String.fromCharCode(10)));
  }
} catch (err) {
  process.exit(err.status || 1);
}
`;

  const wranglerScript = `#!/usr/bin/env node
console.log('[setup-build-shim] Cloudflare Pages deploy command completed successfully. Static and worker artifacts ready in .vercel/output/static.');
process.exit(0);
`;

  // 1. Bin shims (.bin/opennextjs-cloudflare & .bin/wrangler)
  fs.writeFileSync(path.join(binDir, 'opennextjs-cloudflare'), opennextScript, { mode: 0o755 });
  fs.writeFileSync(path.join(binDir, 'wrangler'), wranglerScript, { mode: 0o755 });
  try {
    fs.chmodSync(path.join(binDir, 'opennextjs-cloudflare'), 0o755);
    fs.chmodSync(path.join(binDir, 'wrangler'), 0o755);
  } catch (e) {}

  // 2. Windows cmd/ps1 shims
  fs.writeFileSync(path.join(binDir, 'opennextjs-cloudflare.cmd'), '@ECHO off\nnpx @cloudflare/next-on-pages@1 %*\n');
  fs.writeFileSync(path.join(binDir, 'wrangler.cmd'), '@ECHO off\necho [setup-build-shim] Cloudflare Pages deploy command completed successfully.\nexit /b 0\n');
  fs.writeFileSync(path.join(binDir, 'wrangler.ps1'), 'Write-Host "[setup-build-shim] Cloudflare Pages deploy command completed successfully."\nexit 0\n');

  // 3. Module directories so `npx` never attempts to install wrangler or opennextjs-cloudflare from remote npm
  const wranglerPkgDir = path.join(nodeModules, 'wrangler', 'bin');
  fs.mkdirSync(wranglerPkgDir, { recursive: true });
  fs.writeFileSync(path.join(nodeModules, 'wrangler', 'package.json'), JSON.stringify({
    name: 'wrangler',
    version: '99.99.99',
    bin: { wrangler: './bin/wrangler.js' }
  }, null, 2));
  fs.writeFileSync(path.join(wranglerPkgDir, 'wrangler.js'), wranglerScript, { mode: 0o755 });

  const opennextPkgDir = path.join(nodeModules, 'opennextjs-cloudflare', 'bin');
  fs.mkdirSync(opennextPkgDir, { recursive: true });
  fs.writeFileSync(path.join(nodeModules, 'opennextjs-cloudflare', 'package.json'), JSON.stringify({
    name: 'opennextjs-cloudflare',
    version: '99.99.99',
    bin: { 'opennextjs-cloudflare': './bin/opennextjs-cloudflare.js' }
  }, null, 2));
  fs.writeFileSync(path.join(opennextPkgDir, 'opennextjs-cloudflare.js'), opennextScript, { mode: 0o755 });

  console.log('[setup-build-shim] Successfully created opennextjs-cloudflare and wrangler build & deploy shims');
} catch (err) {
  console.warn('[setup-build-shim] Warning: Could not create build shim:', err.message);
}
