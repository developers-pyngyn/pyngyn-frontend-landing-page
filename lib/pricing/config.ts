/*
 * Stage 0 and 1 are PROPOSED/PLANNING. Do not ship AI-related pricing copy
 * until Stage 1 features are live.
 *
 * Single source of truth for Pyngyn pricing. Data and types only: no UI, no
 * country detection, no network calls.
 *
 * Prices are *localised, not converted*. Every figure below is typed in by
 * hand per market and is a per-seat, per-month amount. Never run these through
 * an FX rate — a live rate would overwrite deliberate local price points.
 */

/* ────────────────────────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────────────────────────── */

export type ProductKey = "clientspace" | "workspace" | "bundle";

export type StageKey = "core" | "aiLaunch" | "target";

export type MarketCode = "US" | "GB" | "CA" | "AU" | "AE" | "IN" | "DEFAULT";

/** Display-only USD approximations for the AED table's "(~$14/$12)" note. */
export type UsdApprox = { monthly: string; annualPerMonth: string };

export type ProductPrice = {
  /** per seat, per month, billed monthly */
  monthly: number;
  /** per seat, per month, when billed annually */
  annualPerMonth: number;
  /** never used in a calculation — parenthetical copy only */
  usdApprox?: UsdApprox;
};

export type StagePricing = {
  clientspace: ProductPrice;
  workspace: ProductPrice;
  bundle: ProductPrice;
  annualDiscountPct: number;
  taxNote: string;
};

export type Market = {
  code: MarketCode;
  /** ISO 4217 */
  currency: string;
  symbol: string;
  /** every market currently prefixes its symbol */
  symbolPosition: "prefix";
  /** AED needs a space between symbol and amount */
  symbolSpace: boolean;
  locale: string;
  stages: Record<StageKey, StagePricing>;
};

export type PricingConfig = Record<MarketCode, Market>;

/* ────────────────────────────────────────────────────────────────────
   Active stage
   ──────────────────────────────────────────────────────────────────── */

/**
 * The stage the product is actually selling today. It advances only when the
 * features for the next stage ship — never on a date. Nothing else in the
 * codebase should name a stage; read it from here.
 */
export const ACTIVE_STAGE: StageKey = "core";

/* ────────────────────────────────────────────────────────────────────
   Tables
   ──────────────────────────────────────────────────────────────────── */

const TAX_NOTE: Record<Exclude<MarketCode, "DEFAULT">, string> = {
  US: "Sales tax (state)",
  GB: "VAT 20% (incl.)",
  CA: "GST/HST/PST (varies)",
  AU: "GST 10% (incl.)",
  AE: "VAT 5% (itemized)",
  IN: "GST 18% (itemized)",
};

const US_STAGES: Record<StageKey, StagePricing> = {
  core: {
    clientspace: { monthly: 14, annualPerMonth: 12 },
    workspace: { monthly: 10, annualPerMonth: 8 },
    bundle: { monthly: 24, annualPerMonth: 20 },
    annualDiscountPct: 17,
    taxNote: TAX_NOTE.US,
  },
  aiLaunch: {
    clientspace: { monthly: 19, annualPerMonth: 16 },
    workspace: { monthly: 10, annualPerMonth: 8 },
    bundle: { monthly: 29, annualPerMonth: 24 },
    annualDiscountPct: 17,
    taxNote: TAX_NOTE.US,
  },
  target: {
    clientspace: { monthly: 29, annualPerMonth: 25 },
    workspace: { monthly: 10, annualPerMonth: 8 },
    bundle: { monthly: 39, annualPerMonth: 33 },
    annualDiscountPct: 17,
    taxNote: TAX_NOTE.US,
  },
};

const GB_STAGES: Record<StageKey, StagePricing> = {
  core: {
    clientspace: { monthly: 12, annualPerMonth: 11 },
    workspace: { monthly: 8, annualPerMonth: 6.5 },
    bundle: { monthly: 20, annualPerMonth: 17.5 },
    annualDiscountPct: 17,
    taxNote: TAX_NOTE.GB,
  },
  aiLaunch: {
    clientspace: { monthly: 16, annualPerMonth: 14 },
    workspace: { monthly: 8, annualPerMonth: 6.5 },
    bundle: { monthly: 24, annualPerMonth: 21 },
    annualDiscountPct: 17,
    taxNote: TAX_NOTE.GB,
  },
  target: {
    clientspace: { monthly: 25, annualPerMonth: 22 },
    workspace: { monthly: 8, annualPerMonth: 6.5 },
    bundle: { monthly: 33, annualPerMonth: 28.5 },
    annualDiscountPct: 17,
    taxNote: TAX_NOTE.GB,
  },
};

const CA_STAGES: Record<StageKey, StagePricing> = {
  core: {
    clientspace: { monthly: 16, annualPerMonth: 14 },
    workspace: { monthly: 12, annualPerMonth: 10 },
    bundle: { monthly: 28, annualPerMonth: 24 },
    annualDiscountPct: 17,
    taxNote: TAX_NOTE.CA,
  },
  aiLaunch: {
    clientspace: { monthly: 22, annualPerMonth: 19 },
    workspace: { monthly: 12, annualPerMonth: 10 },
    bundle: { monthly: 34, annualPerMonth: 29 },
    annualDiscountPct: 17,
    taxNote: TAX_NOTE.CA,
  },
  target: {
    clientspace: { monthly: 34, annualPerMonth: 30 },
    workspace: { monthly: 12, annualPerMonth: 10 },
    bundle: { monthly: 46, annualPerMonth: 40 },
    annualDiscountPct: 17,
    taxNote: TAX_NOTE.CA,
  },
};

const AU_STAGES: Record<StageKey, StagePricing> = {
  core: {
    clientspace: { monthly: 18, annualPerMonth: 16 },
    workspace: { monthly: 13, annualPerMonth: 11 },
    bundle: { monthly: 31, annualPerMonth: 27 },
    annualDiscountPct: 17,
    taxNote: TAX_NOTE.AU,
  },
  aiLaunch: {
    clientspace: { monthly: 25, annualPerMonth: 21 },
    workspace: { monthly: 13, annualPerMonth: 11 },
    bundle: { monthly: 38, annualPerMonth: 32 },
    annualDiscountPct: 17,
    taxNote: TAX_NOTE.AU,
  },
  target: {
    clientspace: { monthly: 38, annualPerMonth: 33 },
    workspace: { monthly: 13, annualPerMonth: 11 },
    bundle: { monthly: 51, annualPerMonth: 44 },
    annualDiscountPct: 17,
    taxNote: TAX_NOTE.AU,
  },
};

/* The `usdApprox` strings mirror the US table for the same tier. They exist so
   the AED page can print "(~$14/$12)" — display only. */
const AE_STAGES: Record<StageKey, StagePricing> = {
  core: {
    clientspace: {
      monthly: 52,
      annualPerMonth: 44,
      usdApprox: { monthly: "~$14", annualPerMonth: "~$12" },
    },
    workspace: {
      monthly: 37,
      annualPerMonth: 30,
      usdApprox: { monthly: "~$10", annualPerMonth: "~$8" },
    },
    bundle: {
      monthly: 89,
      annualPerMonth: 74,
      usdApprox: { monthly: "~$24", annualPerMonth: "~$20" },
    },
    annualDiscountPct: 17,
    taxNote: TAX_NOTE.AE,
  },
  aiLaunch: {
    clientspace: {
      monthly: 70,
      annualPerMonth: 59,
      usdApprox: { monthly: "~$19", annualPerMonth: "~$16" },
    },
    workspace: {
      monthly: 37,
      annualPerMonth: 30,
      usdApprox: { monthly: "~$10", annualPerMonth: "~$8" },
    },
    bundle: {
      monthly: 107,
      annualPerMonth: 89,
      usdApprox: { monthly: "~$29", annualPerMonth: "~$24" },
    },
    annualDiscountPct: 17,
    taxNote: TAX_NOTE.AE,
  },
  target: {
    clientspace: {
      monthly: 107,
      annualPerMonth: 92,
      usdApprox: { monthly: "~$29", annualPerMonth: "~$25" },
    },
    workspace: {
      monthly: 37,
      annualPerMonth: 30,
      usdApprox: { monthly: "~$10", annualPerMonth: "~$8" },
    },
    bundle: {
      monthly: 144,
      annualPerMonth: 122,
      usdApprox: { monthly: "~$39", annualPerMonth: "~$33" },
    },
    annualDiscountPct: 17,
    taxNote: TAX_NOTE.AE,
  },
};

const IN_STAGES: Record<StageKey, StagePricing> = {
  core: {
    clientspace: { monthly: 599, annualPerMonth: 499 },
    workspace: { monthly: 349, annualPerMonth: 299 },
    bundle: { monthly: 949, annualPerMonth: 799 },
    annualDiscountPct: 20,
    taxNote: TAX_NOTE.IN,
  },
  aiLaunch: {
    clientspace: { monthly: 799, annualPerMonth: 699 },
    workspace: { monthly: 349, annualPerMonth: 299 },
    bundle: { monthly: 1149, annualPerMonth: 999 },
    annualDiscountPct: 20,
    taxNote: TAX_NOTE.IN,
  },
  target: {
    clientspace: { monthly: 1199, annualPerMonth: 1099 },
    workspace: { monthly: 349, annualPerMonth: 299 },
    bundle: { monthly: 1549, annualPerMonth: 1399 },
    annualDiscountPct: 20,
    taxNote: TAX_NOTE.IN,
  },
};

export const PRICING: PricingConfig = {
  US: {
    code: "US",
    currency: "USD",
    symbol: "$",
    symbolPosition: "prefix",
    symbolSpace: false,
    locale: "en-US",
    stages: US_STAGES,
  },
  GB: {
    code: "GB",
    currency: "GBP",
    symbol: "£",
    symbolPosition: "prefix",
    symbolSpace: false,
    locale: "en-GB",
    stages: GB_STAGES,
  },
  CA: {
    code: "CA",
    currency: "CAD",
    symbol: "C$",
    symbolPosition: "prefix",
    symbolSpace: false,
    locale: "en-CA",
    stages: CA_STAGES,
  },
  AU: {
    code: "AU",
    currency: "AUD",
    symbol: "A$",
    symbolPosition: "prefix",
    symbolSpace: false,
    locale: "en-AU",
    stages: AU_STAGES,
  },
  AE: {
    code: "AE",
    currency: "AED",
    symbol: "AED",
    symbolPosition: "prefix",
    symbolSpace: true,
    locale: "en-AE",
    stages: AE_STAGES,
  },
  IN: {
    code: "IN",
    currency: "INR",
    symbol: "₹",
    symbolPosition: "prefix",
    symbolSpace: false,
    locale: "en-IN",
    stages: IN_STAGES,
  },
  /* Anything unlisted bills in USD off the US table. */
  DEFAULT: {
    code: "DEFAULT",
    currency: "USD",
    symbol: "$",
    symbolPosition: "prefix",
    symbolSpace: false,
    locale: "en-US",
    stages: US_STAGES,
  },
};

/* ────────────────────────────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────────────────────────────── */

function isMarketCode(code: string): code is MarketCode {
  return Object.prototype.hasOwnProperty.call(PRICING, code);
}

/** Resolve a country code to its market, falling back to DEFAULT (US/USD). */
export function getMarket(countryCode: string | null | undefined): Market {
  const code = (countryCode ?? "").trim().toUpperCase();
  return isMarketCode(code) ? PRICING[code] : PRICING.DEFAULT;
}

/** The stage block for a country. Unlisted countries get the US table. */
export function getPricing(
  countryCode: string | null | undefined,
  stage: StageKey = ACTIVE_STAGE,
): StagePricing {
  return getMarket(countryCode).stages[stage];
}

/**
 * Localised price string.
 *
 * Formats the number with the market's locale (so India gets `1,199`) and
 * prefixes the market's own symbol rather than letting Intl pick one: with
 * `style: "currency"`, en-CA renders CAD as plain `$`, which loses the `C$`
 * disambiguation this table depends on. Decimals appear only when the figure
 * has them — `£12` stays `£12`, `£6.5` becomes `£6.50`.
 */
export function formatPrice(amount: number, market: Market): string {
  const hasDecimals = !Number.isInteger(amount);
  const digits = hasDecimals ? 2 : 0;
  const number = new Intl.NumberFormat(market.locale, {
    style: "decimal",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
  return `${market.symbol}${market.symbolSpace ? " " : ""}${number}`;
}

/** Annual bill for one seat — for "billed as £132/year" copy. */
export function getAnnualTotal(
  product: ProductKey,
  market: Market,
  stage: StageKey = ACTIVE_STAGE,
): number {
  return market.stages[stage][product].annualPerMonth * 12;
}

/**
 * What annual billing saves, derived rather than typed by hand:
 * `perMonth` is the per-seat monthly difference, `perYear` is 12× that.
 */
export function getSavings(
  product: ProductKey,
  market: Market,
  stage: StageKey = ACTIVE_STAGE,
): { perMonth: number; perYear: number } {
  const price = market.stages[stage][product];
  const perMonth = Number((price.monthly - price.annualPerMonth).toFixed(2));
  return { perMonth, perYear: Number((perMonth * 12).toFixed(2)) };
}
