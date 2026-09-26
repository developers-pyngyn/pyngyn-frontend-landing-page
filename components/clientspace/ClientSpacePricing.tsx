"use client";

import { useState } from "react";
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
} from "@/components/clientspace-pricing-data";

export function ClientSpacePricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* Billing Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 sm:mb-14">
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

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 max-w-7xl mx-auto items-stretch">
        {CLIENTSPACE_PLANS.map((plan) => {
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
              className={`relative flex flex-col rounded-2xl transition-all duration-300 ${
                isBusiness
                  ? "bg-white border-2 border-[#14223d] shadow-xl shadow-[#14223d]/10 lg:-translate-y-2 ring-1 ring-[#14223d]"
                  : "bg-white border border-slate-200 hover:border-slate-300 shadow-card hover:shadow-md"
              }`}
            >
              {/* Most popular badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm ${
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

              <div className="p-7 sm:p-8 flex-1 flex flex-col">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-950 font-display tracking-tight">
                      {plan.name}
                    </h3>
                    {isBusiness && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#f0f4fa] text-[#14223d] border border-[#14223d]/20">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed min-h-[36px]">
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
                      <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500">
                        <span>
                          {billingCycle === "annual"
                            ? `Billed annually (₹${(displayPrice || 0) * 12}/yr)`
                            : "Billed monthly"}
                        </span>
                        {billingCycle === "annual" && (
                          <span className="text-emerald-700 font-bold">
                            Save ₹{((plan.monthlyPrice || 0) - (plan.annualPrice || 0)) * 12}/yr
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
                <div className="mb-7">
                  <Link
                    href={plan.ctaHref}
                    className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold tracking-wide transition-all ${
                      plan.ctaStyle === "accent"
                        ? "bg-[#14223d] hover:bg-[#0a1220] text-white shadow-md shadow-[#14223d]/25 hover:shadow-lg"
                        : plan.ctaStyle === "primary"
                        ? "bg-slate-900 hover:bg-slate-800 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Limits summary */}
                <div className="mb-6 space-y-2 bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Plan Capacity
                  </div>
                  {plan.summaryLimits.map((limit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#14223d]" />
                      <span>{limit}</span>
                    </div>
                  ))}
                </div>

                {/* Feature highlights */}
                <div className="flex-1 space-y-3">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Key Features Included
                  </div>
                  {plan.keyHighlights.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <Check className="w-4 h-4 text-[#14223d] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom footer bar on cards */}
              <div className="px-7 py-3 bg-slate-50/80 rounded-b-2xl border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-medium">{plan.name} Tier</span>
                <span>Cancel anytime</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Table Section */}
      <section className="mt-24 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#14223d] tracking-wider uppercase bg-[#f0f4fa] px-3 py-1 rounded-full border border-[#14223d]/20">
            Side-by-Side Breakdown
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 mt-3 font-display">
            Compare all ClientSpace features
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            Transparent capabilities designed specifically for CA firms, tax practitioners, and audit teams.
          </p>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse min-w-[720px]">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 sticky top-0 z-10">
                <th className="py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider w-[40%]">
                  Feature / Capability
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-900 text-center w-[20%]">
                  Pro (₹499)
                </th>
                <th className="py-4 px-6 text-xs font-bold text-[#14223d] text-center w-[20%] bg-[#f0f4fa]/60">
                  Business (₹799)
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-900 text-center w-[20%]">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {FEATURE_CATEGORIES.map((category, catIdx) => (
                <div key={catIdx} className="contents">
                  {/* Category Header Row */}
                  <tr className="bg-slate-100/70 border-t border-b border-slate-200">
                    <td
                      colSpan={4}
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
                      <td className="py-3.5 px-6 text-center text-xs">
                        {renderFeatureValue(row.enterprise)}
                      </td>
                    </tr>
                  ))}
                </div>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CA Firm Value Pillars */}
      <section className="mt-20 max-w-6xl mx-auto">
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
      <section className="mt-20 max-w-4xl mx-auto">
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
