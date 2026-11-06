"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
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
  PRICING_TIERS,
  INCLUDED_FEATURES,
  PRICING_FAQS,
  ANNUAL_DISCOUNT_PCT,
  ENTERPRISE_FROM_USERS,
  formatUsd,
} from "@/components/clientspace-pricing-data";
import { SIGNUP_URL, DEMO_URL } from "@/components/config";

export function ClientSpacePricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const annual = billingCycle === "annual";

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
            aria-pressed={!annual}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              !annual
                ? "bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("annual")}
            aria-pressed={annual}
            className={`relative px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-2 ${
              annual
                ? "bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Annual Billing
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 rounded-full">
              Save {ANNUAL_DISCOUNT_PCT}%
            </span>
          </button>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#14223d]" />
          <span>Every feature on every plan &bull; 7-day free trial &bull; No credit card required</span>
        </div>
      </div>

      {/* Team-size plans */}
      <div className="wrap max-w-[1080px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {PRICING_TIERS.map((tier) => {
            const price = annual ? tier.annual : tier.monthly;
            const perUser = price / tier.users;
            return (
              <div
                key={tier.users}
                className={`relative flex flex-col rounded-3xl bg-white p-7 transition-all duration-300 ${
                  tier.popular
                    ? "border-2 border-[#14223d] shadow-2xl shadow-[#14223d]/15 ring-1 ring-[#14223d]"
                    : "border-2 border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm bg-[#14223d] text-white">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      Most popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-slate-700">
                  <Users className="w-4 h-4 text-[#14223d]" />
                  <h3 className="text-base font-bold text-slate-950 font-display">Up to {tier.users} users</h3>
                </div>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-display">
                    {formatUsd(price)}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 ml-1">/ month</span>
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  {annual ? `Billed yearly (${formatUsd(price * 12)}/yr)` : "Billed monthly"}
                </div>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="text-slate-500">≈ ${perUser.toFixed(perUser % 1 ? 2 : 0)} per user</span>
                  {annual && (
                    <span className="text-emerald-700 font-bold">
                      Save {formatUsd((tier.monthly - tier.annual) * 12)}/yr
                    </span>
                  )}
                </div>

                <a
                  href={SIGNUP_URL}
                  className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
                    tier.popular
                      ? "bg-[#14223d] hover:bg-[#0a1220] text-white shadow-md shadow-[#14223d]/25 hover:shadow-lg"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  <span>Start 7-Day Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Larger firms */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#14223d] shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-950">More than {ENTERPRISE_FROM_USERS} users?</div>
              <div className="text-xs text-slate-600">
                Custom plans for large partnerships and multi-branch firms, with migration help.
              </div>
            </div>
          </div>
          <Link
            href={DEMO_URL}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-900 hover:border-slate-400"
          >
            Talk to us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Everything included */}
      <section className="mt-24 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#14223d] tracking-wider uppercase bg-[#f0f4fa] px-3 py-1 rounded-full border border-[#14223d]/20">
            One plan, every feature
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 mt-3 font-display">
            Everything is included in every plan
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            No feature tiers and no add-ons. Pick the team size that fits your firm.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {INCLUDED_FEATURES.map((group) => (
            <div key={group.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-600">
                    <Check className="w-4 h-4 text-[#14223d] shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
                  aria-expanded={isOpen}
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
          Have specific questions regarding cancellations, prorated billing, or tax invoices? Review our{" "}
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
