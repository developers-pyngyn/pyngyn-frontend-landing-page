import type { MarketCode } from "./config";

export type AccountantsTierPricing = {
  currency: string;
  symbol: string;
  pro: string;
  business: string;
  enterprise: string;
  clientspace: string; // compatibility alias -> pro
  workspace: string;   // compatibility alias -> business
  bundle: string;      // compatibility alias -> business
  periodText: string;
  taxNote: string;
  fullPricingNote: string;
};

export const ACCOUNTANTS_REGIONAL_PRICING: Record<MarketCode, AccountantsTierPricing> = {
  IN: {
    currency: "INR",
    symbol: "₹",
    pro: "₹499",
    business: "₹799",
    enterprise: "Custom",
    clientspace: "₹499",
    workspace: "₹799",
    bundle: "₹799",
    periodText: "/user/month",
    taxNote: "GST 18% (itemized) · Billed in INR (₹)",
    fullPricingNote: "Dedicated CA practice tiers with statutory calendars, DSC registers & PBC audit checklists available on full pricing.",
  },
  US: {
    currency: "USD",
    symbol: "$",
    pro: "$29",
    business: "$49",
    enterprise: "Custom",
    clientspace: "$29",
    workspace: "$49",
    bundle: "$49",
    periodText: "/user/month",
    taxNote: "Sales tax (state) · Billed in USD ($)",
    fullPricingNote: "Enterprise security & multi-branch firm plans available on full pricing.",
  },
  GB: {
    currency: "GBP",
    symbol: "£",
    pro: "£24",
    business: "£39",
    enterprise: "Custom",
    clientspace: "£24",
    workspace: "£39",
    bundle: "£39",
    periodText: "/user/month",
    taxNote: "VAT 20% (incl.) · Billed in GBP (£)",
    fullPricingNote: "Enterprise security & multi-branch firm plans available on full pricing.",
  },
  CA: {
    currency: "CAD",
    symbol: "C$",
    pro: "C$39",
    business: "C$65",
    enterprise: "Custom",
    clientspace: "C$39",
    workspace: "C$65",
    bundle: "C$65",
    periodText: "/user/month",
    taxNote: "GST/HST/PST (varies) · Billed in CAD (C$)",
    fullPricingNote: "Enterprise security & multi-branch firm plans available on full pricing.",
  },
  AU: {
    currency: "AUD",
    symbol: "A$",
    pro: "A$44",
    business: "A$75",
    enterprise: "Custom",
    clientspace: "A$44",
    workspace: "A$75",
    bundle: "A$75",
    periodText: "/user/month",
    taxNote: "GST 10% (incl.) · Billed in AUD (A$)",
    fullPricingNote: "Enterprise security & multi-branch firm plans available on full pricing.",
  },
  AE: {
    currency: "AED",
    symbol: "AED",
    pro: "AED 110",
    business: "AED 180",
    enterprise: "Custom",
    clientspace: "AED 110",
    workspace: "AED 180",
    bundle: "AED 180",
    periodText: "/user/month",
    taxNote: "VAT 5% (itemized) · Billed in AED",
    fullPricingNote: "Enterprise security & multi-branch firm plans available on full pricing.",
  },
  DEFAULT: {
    currency: "USD",
    symbol: "$",
    pro: "$29",
    business: "$49",
    enterprise: "Custom",
    clientspace: "$29",
    workspace: "$49",
    bundle: "$49",
    periodText: "/user/month",
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
