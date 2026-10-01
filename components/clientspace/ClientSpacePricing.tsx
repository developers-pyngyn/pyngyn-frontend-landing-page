"use client";

import { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import {
  Check,
  Minus,
  Sparkles,
  Shield,
  HelpCircle,
  ArrowRight,
  ChevronDown,
  Building2,
  Users,
  CheckCircle2,
} from "lucide-react";
import {
  CLIENTSPACE_PLANS,
  FEATURE_CATEGORIES,
  PRICING_FAQS,
  getPlansForMarket,
  MARKET_PRICING_MAP,
} from "@/components/clientspace-pricing-data";
import { type MarketCode } from "@/lib/pricing/config";

export function ClientSpacePricing() {
  const [market, setMarket] = useState<MarketCode>(() => {
    if (typeof window !== "undefined") {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
        if (tz.includes("Calcutta") || tz.includes("Kolkata") || tz.includes("Asia/Kolkata")) return "IN";
        if (tz.includes("London") || tz.includes("Europe/London")) return "GB";
        if (tz.includes("Toronto") || tz.includes("Vancouver") || tz.includes("Montreal") || tz.includes("Edmonton")) return "CA";
        if (tz.includes("Sydney") || tz.includes("Melbourne") || tz.includes("Brisbane")) return "AU";
        if (tz.includes("Dubai")) return "AE";
        if (tz.includes("America") || tz.includes("US")) return "US";
      } catch {
        return "IN";
      }
    }
    return "IN";
  });
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    // 1. Expire any stale pyngyn_market cookie from previous manual selectors
    if (typeof document !== "undefined" && document.cookie.includes("pyngyn_market")) {
      document.cookie = "pyngyn_market=; Path=/; Max-Age=0; SameSite=Lax";
    }

    // 2. Auto-detect visitor / VPN country from edge headers
    fetch("/api/geo/")
      .then((res) => {
        if (!res.ok) throw new Error("geo fetch failed");
        return res.json();
      })
      .then((data) => {
        if (data?.market && MARKET_PRICING_MAP[data.market as MarketCode]) {
          setMarket(data.market as MarketCode);
        }
      })
      .catch(() => {
        // 3. Fallback: check browser timezone
        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
          if (tz.includes("Calcutta") || tz.includes("Kolkata") || tz.includes("Asia/Kolkata")) {
            setMarket("IN");
          } else if (tz.includes("London") || tz.includes("Europe/London")) {
            setMarket("GB");
          } else if (tz.includes("Toronto") || tz.includes("Vancouver") || tz.includes("Montreal") || tz.includes("Edmonton")) {
            setMarket("CA");
          } else if (tz.includes("Sydney") || tz.includes("Melbourne") || tz.includes("Brisbane")) {
            setMarket("AU");
          } else if (tz.includes("Dubai")) {
            setMarket("AE");
          } else {
            setMarket("US");
          }
        } catch {
          setMarket("US");
        }
      });
  }, []);

  const plans = getPlansForMarket(market);
  const marketConfig = MARKET_PRICING_MAP[market] || MARKET_PRICING_MAP.DEFAULT;

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* Billing Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14">
        <div className="inline-flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 shadow-inner">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              billingCycle === "monthly"
                ? "bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("annual")}
            className={`relative px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-2 ${
              billingCycle === "annual"
                ? "bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Annual Billing
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 rounded-full">
              Save 20%
            </span>
          </button>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#14223d]" />
          <span>7-day free trial on all plans &bull; No credit card required</span>
        </div>
      </div>

      {/* Pricing Cards Grid — 2 Prominent Cards for Professional & Business (100px left & right breathing space) */}
      <div className="w-full px-4 sm:px-8 md:px-[60px] lg:px-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full items-stretch">
        {plans.map((plan) => {
          const isBusiness = plan.id === "business";
          const displayPrice =
            plan.monthlyPrice !== null
              ? billingCycle === "monthly"
                ? plan.monthlyPrice
                : plan.annualPrice
              : null;

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-3xl transition-all duration-300 ${
                isBusiness
                  ? "bg-white border-2 border-[#14223d] shadow-2xl shadow-[#14223d]/15 md:-translate-y-2 ring-1 ring-[#14223d]"
                  : "bg-white border-2 border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl"
              }`}
            >
              {/* Most popular badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm ${
                      isBusiness
                        ? "bg-[#14223d] text-white shadow-[#14223d]/20"
                        : "bg-slate-800 text-white"
                    }`}
                  >
                    {isBusiness && <Sparkles className="w-3 h-3 text-amber-300" />}
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-8 sm:p-10 flex-1 flex flex-col">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-slate-950 font-display tracking-tight">
                      {plan.name}
                    </h3>
                    {isBusiness && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#f0f4fa] text-[#14223d] border border-[#14223d]/20">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[40px]">
                    {plan.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-slate-100">
                  {displayPrice !== null ? (
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-600">
                          {plan.currencySymbol}
                        </span>
                        <span className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-display">
                          {displayPrice}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 ml-1">
                          / {plan.unit}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                        <span>
                          {billingCycle === "annual"
                            ? `Billed annually (${plan.currencySymbol}${(displayPrice || 0) * 12}/yr)`
                            : "Billed monthly"}
                        </span>
                        {billingCycle === "annual" && (
                          <span className="text-emerald-700 font-bold">
                            Save {plan.currencySymbol}{((plan.monthlyPrice || 0) - (plan.annualPrice || 0)) * 12}/yr
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-3xl font-extrabold text-slate-950 tracking-tight font-display">
                        Custom
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Tailored for large firms &amp; multi-branch practices
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <div className="mb-8">
                  <Link
                    href={plan.ctaHref}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold tracking-wide transition-all ${
                      plan.ctaStyle === "accent"
                        ? "bg-[#14223d] hover:bg-[#0a1220] text-white shadow-md shadow-[#14223d]/25 hover:shadow-lg"
                        : plan.ctaStyle === "primary"
                        ? "bg-slate-900 hover:bg-slate-800 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Limits summary */}
                <div className="mb-7 space-y-2 bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Plan Capacity &amp; Scope
                  </div>
                  {plan.summaryLimits.map((limit, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#14223d] shrink-0" />
                      <span>{limit}</span>
                    </div>
                  ))}
                </div>

                {/* Feature highlights */}
                <div className="flex-1 space-y-3.5">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Key Features Included
                  </div>
                  {plan.keyHighlights.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                      <Check className="w-4 h-4 text-[#14223d] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom footer bar on cards */}
              <div className="px-8 py-3.5 bg-slate-50/80 rounded-b-3xl border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold">{plan.name}</span>
                <span>Cancel anytime &bull; No lock-in</span>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Feature Comparison Table Section */}
      <section className="mt-24 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#14223d] tracking-wider uppercase bg-[#f0f4fa] px-3 py-1 rounded-full border border-[#14223d]/20">
            Side-by-Side Breakdown
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 mt-3 font-display">
            Compare Pyngyn Professional vs Business
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            Transparent functional capabilities designed specifically for modern professional practices and CA firms.
          </p>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse min-w-[680px]">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 sticky top-0 z-10">
                <th className="py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider w-[50%]">
                  Feature / Capability
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-900 text-center w-[25%]">
                  Professional ({marketConfig.currencySymbol}{marketConfig.proMonthly}/mo)
                </th>
                <th className="py-4 px-6 text-xs font-bold text-[#14223d] text-center w-[25%] bg-[#f0f4fa]/70">
                  Business ({marketConfig.currencySymbol}{marketConfig.bizMonthly}/mo)
                </th>
              </tr>
            </thead>
            <tbody>
              {FEATURE_CATEGORIES.map((category, catIdx) => (
                <Fragment key={catIdx}>
                  {/* Category Header Row */}
                  <tr className="bg-slate-100/70 border-t border-b border-slate-200">
                    <td
                      colSpan={3}
                      className="py-3 px-6 text-xs font-bold text-slate-900 tracking-wide uppercase"
                    >
                      {category.title}
                    </td>
                  </tr>

                  {/* Feature Rows */}
                  {category.features.map((row, rowIdx) => (
                    <tr
                      key={rowIdx}
                      className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-3.5 px-6">
                        <div className="text-xs font-semibold text-slate-900">{row.name}</div>
                        {row.detail && (
                          <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                            {row.detail}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-6 text-center text-xs">
                        {renderFeatureValue(row.pro)}
                      </td>
                      <td className="py-3.5 px-6 text-center text-xs bg-[#f0f4fa]/30">
                        {renderFeatureValue(row.business, true)}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CA Firm Value Pillars */}
      <section className="mt-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#f0f4fa] border border-[#14223d]/20 flex items-center justify-center text-[#14223d] mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-950 mb-1.5">No Client Surcharges</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlike generic tools that charge per client invitation, ClientSpace provides unlimited client guest portal access. Your clients never pay.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#f0f4fa] border border-[#14223d]/20 flex items-center justify-center text-[#14223d] mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-950 mb-1.5">Built for CA Hierarchy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Native support for Partner &bull; Manager &bull; Senior Associate &bull; Article Assistant roles with strict 4-eye sign-off validation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#f0f4fa] border border-[#14223d]/20 flex items-center justify-center text-[#14223d] mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-950 mb-1.5">Zero Data Lock-in</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Export complete task logs, audit working papers, time entries, and compliance registers into formatted Excel and ZIP archives at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="mt-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#14223d] tracking-wider uppercase bg-[#f0f4fa] px-3 py-1 rounded-full border border-[#14223d]/20">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl font-bold text-slate-950 mt-3 font-display">
            Questions about ClientSpace plans?
          </h2>
        </div>

        <div className="space-y-3">
          {PRICING_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-slate-900 hover:text-[#14223d]"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#14223d] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#14223d]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a.includes("Refund & Subscription Cancellation Policy") ? (
                      <>
                        {faq.a.split("Refund & Subscription Cancellation Policy")[0]}
                        <Link
                          href="/refund"
                          className="font-semibold text-[#14223d] underline underline-offset-2 hover:text-slate-900"
                        >
                          Refund &amp; Subscription Cancellation Policy
                        </Link>
                        {faq.a.split("Refund & Subscription Cancellation Policy")[1] || "."}
                      </>
                    ) : (
                      faq.a
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Billing Policy Note */}
        <div className="mt-8 text-center text-xs text-slate-500">
          Have specific questions regarding cancellations, prorated seat billing, or tax invoices? Review our{" "}
          <Link
            href="/refund"
            className="font-semibold text-[#14223d] underline underline-offset-2 hover:text-slate-900"
          >
            Refund &amp; Subscription Cancellation Policy
          </Link>
          {" "}or email our accounts desk at{" "}
          <a
            href="mailto:vivek.pandey@pyngyn.com"
            className="font-semibold text-[#14223d] underline underline-offset-2 hover:text-slate-900"
          >
            vivek.pandey@pyngyn.com
          </a>
          .
        </div>
      </section>
    </div>
  );
}

function renderFeatureValue(val: boolean | string, isHighlighted = false) {
  if (val === true) {
    return (
      <div className="flex justify-center">
        <Check
          className={`w-4 h-4 ${isHighlighted ? "text-[#14223d] stroke-[2.5]" : "text-emerald-600 stroke-[2]"}`}
        />
      </div>
    );
  }
  if (val === false) {
    return (
      <div className="flex justify-center">
        <Minus className="w-3.5 h-3.5 text-slate-300" />
      </div>
    );
  }
  return (
    <span
      className={`font-semibold ${
        isHighlighted ? "text-[#14223d] font-bold" : "text-slate-700"
      }`}
    >
      {val}
    </span>
  );
}
