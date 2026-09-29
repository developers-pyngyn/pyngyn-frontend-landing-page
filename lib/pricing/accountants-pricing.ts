import type { MarketCode } from "./config";

export type AccountantsTierPricing = {
  currency: string;
  symbol: string;
  clientspace: string;
  workspace: string;
  bundle: string;
  periodText: string;
  taxNote: string;
  fullPricingNote: string;
};

export const ACCOUNTANTS_REGIONAL_PRICING: Record<MarketCode, AccountantsTierPricing> = {
  IN: {
    currency: "INR",
    symbol: "₹",
    clientspace: "₹499",
    workspace: "₹299",
    bundle: "₹799",
    periodText: "/mo",
    taxNote: "GST 18% (itemized) · Billed in INR (₹)",
    fullPricingNote: "Dedicated CA practice tiers with statutory calendars, DSC registers & PBC audit checklists available on full pricing.",
  },
  US: {
    currency: "USD",
    symbol: "$",
    clientspace: "$19",
    workspace: "$9",
    bundle: "$24.99",
    periodText: "/mo",
    taxNote: "Sales tax (state) · Billed in USD ($)",
    fullPricingNote: "Enterprise security & multi-branch firm plans available on full pricing.",
  },
  GB: {
    currency: "GBP",
    symbol: "£",
    clientspace: "£15",
    workspace: "£7",
    bundle: "£19.99",
    periodText: "/mo",
    taxNote: "VAT 20% (incl.) · Billed in GBP (£)",
    fullPricingNote: "Enterprise security & multi-branch firm plans available on full pricing.",
  },
  CA: {
    currency: "CAD",
    symbol: "C$",
    clientspace: "C$26",
    workspace: "C$12",
    bundle: "C$33.99",
    periodText: "/mo",
    taxNote: "GST/HST/PST (varies) · Billed in CAD (C$)",
    fullPricingNote: "Enterprise security & multi-branch firm plans available on full pricing.",
  },
  AU: {
    currency: "AUD",
    symbol: "A$",
    clientspace: "A$29",
    workspace: "A$14",
    bundle: "A$37.99",
    periodText: "/mo",
    taxNote: "GST 10% (incl.) · Billed in AUD (A$)",
    fullPricingNote: "Enterprise security & multi-branch firm plans available on full pricing.",
  },
  AE: {
    currency: "AED",
    symbol: "AED",
    clientspace: "AED 70",
    workspace: "AED 35",
    bundle: "AED 95",
    periodText: "/mo",
    taxNote: "VAT 5% (itemized) · Billed in AED",
    fullPricingNote: "Enterprise security & multi-branch firm plans available on full pricing.",
  },
  DEFAULT: {
    currency: "USD",
    symbol: "$",
    clientspace: "$19",
    workspace: "$9",
    bundle: "$24.99",
    periodText: "/mo",
    taxNote: "Billed in USD ($)",
    fullPricingNote: "Enterprise security & multi-branch firm plans available on full pricing.",
  },
};

export function getAccountantsPricing(market: MarketCode): AccountantsTierPricing {
  return ACCOUNTANTS_REGIONAL_PRICING[market] || ACCOUNTANTS_REGIONAL_PRICING.DEFAULT;
}

export function detectClientMarket(): MarketCode {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/pyngyn_market=([^;]+)/);
    if (match && match[1]) {
      const code = match[1].trim().toUpperCase();
      if (code in ACCOUNTANTS_REGIONAL_PRICING) return code as MarketCode;
    }
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (tz.includes("Calcutta") || tz.includes("Kolkata") || tz.includes("Asia/Kolkata")) return "IN";
      if (tz.includes("London") || tz.includes("Europe/London")) return "GB";
      if (tz.includes("Toronto") || tz.includes("Vancouver") || tz.includes("Edmonton")) return "CA";
      if (tz.includes("Sydney") || tz.includes("Melbourne") || tz.includes("Brisbane")) return "AU";
      if (tz.includes("Dubai")) return "AE";
    } catch {
      // Fallback
    }
  }
  return "DEFAULT";
}
