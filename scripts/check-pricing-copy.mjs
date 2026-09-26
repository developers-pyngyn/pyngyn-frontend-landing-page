/*
 * Build-time guardrail for pricing copy.
 *
 * While ACTIVE_STAGE is 'core', the pricing surfaces must not promise
 * functionality that has not shipped. Naming AI/automation features before they
 * exist is a trust risk, so this fails the build instead of relying on review
 * memory. It relaxes automatically at Stage 1: once ACTIVE_STAGE is no longer
 * 'core', the check exits successfully without inspecting anything.
 *
 * Also blocks competitor framing that depends on AI depth (Karbon, Accelo,
 * TaxDome) at Stage 0 — Teamwork.com is the benchmark that holds today.
 *
 * Run: node scripts/check-pricing-copy.mjs   (wired to `prebuild`)
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Pricing surfaces this rule owns. */
const FILES = [
  "components/PricingTiers.tsx",
  "components/pricing/MarketSelector.tsx",
  "app/pricing/page.tsx",
];

const STAGE_RE = /export const ACTIVE_STAGE\s*:\s*StageKey\s*=\s*"([^"]+)"/;

const BANNED = [
  { label: "AI-powered", re: /\bAI[-\s]powered\b/gi },
  { label: "AI", re: /\bAI\b/g },
  { label: "automations", re: /\bautomations?\b/gi },
  { label: "intelligent", re: /\bintelligent\b/gi },
  { label: "smart", re: /\bsmart\b/gi },
  { label: "Karbon", re: /\bKarbon\b/gi },
  { label: "Accelo", re: /\bAccelo\b/gi },
  { label: "TaxDome", re: /\bTaxDome\b/gi },
];

const config = readFileSync(join(root, "lib/pricing/config.ts"), "utf8");
const stage = config.match(STAGE_RE)?.[1];

if (!stage) {
  console.error("[pricing-copy] could not read ACTIVE_STAGE from lib/pricing/config.ts");
  process.exit(1);
}

if (stage !== "core") {
  console.log(`[pricing-copy] ACTIVE_STAGE is "${stage}" — Stage 0 copy guardrail relaxed.`);
  process.exit(0);
}

const failures = [];

for (const file of FILES) {
  const path = join(root, file);
  let source;
  try {
    source = readFileSync(path, "utf8");
  } catch {
    continue; // file not present in this checkout
  }

  const lines = source.split(/\r?\n/);
  lines.forEach((line, index) => {
    // Comments explain the rule itself; only shipped copy is in scope.
    const trimmed = line.trim();
    if (trimmed.startsWith("*") || trimmed.startsWith("//") || trimmed.startsWith("/*")) return;

    for (const { label, re } of BANNED) {
      re.lastIndex = 0;
      if (re.test(line)) {
        failures.push(`${relative(root, path)}:${index + 1}  "${label}"  ${trimmed.slice(0, 90)}`);
      }
    }
  });
}

if (failures.length > 0) {
  console.error(
    `\n[pricing-copy] ACTIVE_STAGE is "core", so pricing copy must not reference unshipped\n` +
      `functionality or AI-depth competitor framing. Found ${failures.length} occurrence(s):\n`,
  );
  failures.forEach((line) => console.error(`  ${line}`));
  console.error("\nRemove the wording, or advance ACTIVE_STAGE once the features are live.\n");
  process.exit(1);
}

console.log(`[pricing-copy] OK — ${FILES.length} pricing surface(s) clean at Stage 0.`);
