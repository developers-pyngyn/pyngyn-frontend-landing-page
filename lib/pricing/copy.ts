/*
 * Formatted price strings for marketing copy, derived from
 * lib/pricing/config.ts. Pages call this instead of typing figures into prose,
 * so a config change propagates to every sentence that quotes a price.
 *
 * `priceCopy(market)` — for on-page copy, in the visitor's own currency.
 * `canonicalPriceCopy()` — USD, for metadata and structured data, which are
 * indexed once and must not vary by visitor.
 */

import {
  ACTIVE_STAGE,
  PRICING,
  formatPrice,
  getAnnualTotal,
  getPricing,
  getSavings,
  type MarketCode,
  type StageKey,
} from "./config";

export type PriceCopy = {
  currency: string;
  /** monthly, per seat */
  clientspace: string;
  workspace: string;
  bundle: string;
  /** annual billing, expressed per month */
  clientspaceAnnual: string;
  workspaceAnnual: string;
  bundleAnnual: string;
  /** what a year of the bundle costs, per seat */
  bundleAnnualTotal: string;
  /** rounded, derived from the figures themselves — never typed in */
  annualSavingPct: number;
  /** e.g. "Sales tax (state)" */
  taxNote: string;
};

export function priceCopy(
  market: MarketCode = "DEFAULT",
  stage: StageKey = ACTIVE_STAGE,
): PriceCopy {
  const config = PRICING[market];
  const prices = getPricing(market, stage);
  const bundleSaving = getSavings("bundle", config, stage);

  return {
    currency: config.currency,
    clientspace: formatPrice(prices.clientspace.monthly, config),
    workspace: formatPrice(prices.workspace.monthly, config),
    bundle: formatPrice(prices.bundle.monthly, config),
    clientspaceAnnual: formatPrice(prices.clientspace.annualPerMonth, config),
    workspaceAnnual: formatPrice(prices.workspace.annualPerMonth, config),
    bundleAnnual: formatPrice(prices.bundle.annualPerMonth, config),
    bundleAnnualTotal: formatPrice(getAnnualTotal("bundle", config, stage), config),
    annualSavingPct: Math.round((bundleSaving.perMonth / prices.bundle.monthly) * 100),
    taxNote: prices.taxNote,
  };
}

/** USD figures for metadata / JSON-LD, which must not vary per visitor. */
export function canonicalPriceCopy(stage: StageKey = ACTIVE_STAGE): PriceCopy {
  return priceCopy("US", stage);
}
