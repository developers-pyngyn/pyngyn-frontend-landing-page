// Region/currency resolution for IP-based pricing display on /pricing.
//
// HOW THE COUNTRY IS DETECTED: Cloudflare adds a `CF-IPCountry` header
// (ISO 3166-1 alpha-2, or "XX"/"T1" if unknown) to every request that hits
// its edge — no third-party geo-IP service needed. app/pricing/page.tsx
// reads it via next/headers and resolves it to a RegionCode below.
//
// IMPORTANT — READ BEFORE CHANGING PRICES FOR REAL:
// The `rate` values below are rough, illustrative USD conversion multipliers,
// not a live FX feed, and they will drift out of date. The `round` functions
// then nudge that converted number to a "clean" price ending in a locally
// familiar pattern (.99, or a round number minus 1 for INR) — this is
// **display-only "local pricing" styling**, not a real regional discount
// strategy. Before this reflects real charges:
//   1. Confirm your payment processor (Stripe/Paddle/etc.) is actually set
//      up to charge in these currencies. If it isn't, a customer sees
//      "€17.99" here but their card gets charged $19 (or vice versa) at
//      checkout — a real, visible mismatch, not a cosmetic bug.
//   2. Replace `rate` with real numbers from that processor or a live FX
//      API, ideally refreshed on a schedule rather than hardcoded.
//   3. Decide with finance/legal whether any region gets an intentional
//      discount (PPP-style) vs. pure conversion, and disclose it as such.

export type RegionCode = "US" | "GB" | "EU" | "IN" | "CA" | "AU";

type RegionConfig = {
  currency: string;
  symbol: string;
  /** Illustrative USD -> currency multiplier. See file header before relying on this for real billing. */
  rate: number;
  /** Nudges a raw converted number to a currency-appropriate "clean" price. */
  round: (n: number) => number;
};

const REGIONS: Record<RegionCode, RegionConfig> = {
  US: { currency: "USD", symbol: "$", rate: 1, round: (n) => Math.round(n * 100) / 100 },
  GB: { currency: "GBP", symbol: "£", rate: 0.79, round: (n) => Math.max(1, Math.round(n)) - 0.01 },
  EU: { currency: "EUR", symbol: "€", rate: 0.93, round: (n) => Math.max(1, Math.round(n)) - 0.01 },
  CA: { currency: "CAD", symbol: "$", rate: 1.38, round: (n) => Math.max(1, Math.round(n)) - 0.01 },
  AU: { currency: "AUD", symbol: "$", rate: 1.53, round: (n) => Math.max(1, Math.round(n)) - 0.01 },
  IN: { currency: "INR", symbol: "₹", rate: 87, round: (n) => Math.round(n / 10) * 10 - 1 },
};

const EU_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE",
]);

/** Unresolvable, missing, or unmapped country -> USD (the requested default). */
export function resolveRegion(cfIpCountry: string | null | undefined): RegionCode {
  const cc = cfIpCountry?.toUpperCase();
  if (!cc || cc === "XX" || cc === "T1") return "US";
  if (cc === "GB") return "GB";
  if (cc === "IN") return "IN";
  if (cc === "CA") return "CA";
  if (cc === "AU") return "AU";
  if (EU_COUNTRIES.has(cc)) return "EU";
  return "US";
}

export function regionConfig(region: RegionCode): RegionConfig {
  return REGIONS[region];
}

/** Formats a USD base price as a converted, cleanly-rounded string in the target region's currency. */
export function formatRegionPrice(usd: number, region: RegionCode): string {
  const cfg = REGIONS[region];
  const converted = cfg.round(usd * cfg.rate);
  const display = Number.isInteger(converted) ? String(converted) : converted.toFixed(2);
  return `${cfg.symbol}${display}`;
}
