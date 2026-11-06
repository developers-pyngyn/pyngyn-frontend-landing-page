"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  HelpCircle,
  ChevronDown,
  Building2,
  Users,
  Mail,
  Phone,
} from "lucide-react";
import {
  PRICING_TIERS,
  COMMON_FEATURES,
  PRICING_FAQS,
  ANNUAL_DISCOUNT_PCT,
  ENTERPRISE_FROM_USERS,
  formatUsd,
} from "@/components/clientspace-pricing-data";
import { SIGNUP_URL, DEMO_URL, SOCIAL_LINKEDIN } from "@/components/config";

// lucide-react no longer ships brand icons; same mark as the footer.
function LinkedinIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2 2 0 11-.02 4 2 2 0 01.02-4zM3 8.98h4V21H3zM10 8.98h3.8v1.64h.05c.53-1 1.83-2.06 3.76-2.06 4.02 0 4.76 2.65 4.76 6.1V21h-4v-5.36c0-1.28-.02-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.83V21h-4z" />
    </svg>
  );
}

const CONTACTS = [
  { label: "Email sales@pyngyn.com", href: "mailto:sales@pyngyn.com", Icon: Mail, external: false },
  { label: "PYNGYN on LinkedIn", href: SOCIAL_LINKEDIN, Icon: LinkedinIcon, external: true },
  { label: "Call +91 91200 05593", href: "tel:+919120005593", Icon: Phone, external: false },
];

function CheckBox() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0 text-accent" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="17" height="17" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5.5 10.2l3 3 6-6.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 9.8 -> "9.80", 10 -> "10" */
const perUser = (price: number, users: number) => {
  const v = price / users;
  return v % 1 ? v.toFixed(2) : String(v);
};

/** `headingLevel="h1"` when this section is the top of the page (/pricing). */
export function ClientSpacePricing({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState(String(PRICING_TIERS.find((t) => t.popular)?.users ?? PRICING_TIERS[0].users));
  const annual = billingCycle === "annual";
  const tier = PRICING_TIERS.find((t) => String(t.users) === selected);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-5">
          {/* Intro */}
          <div className="flex flex-col py-2 lg:pr-6">
            <span className="inline-flex w-fit items-center rounded-full border border-accent px-4 py-1 text-[13px] font-semibold text-accent">
              Pricing
            </span>
            <Heading className="mt-5 font-display text-[clamp(32px,4vw,46px)] font-bold leading-[1.08] tracking-[-0.025em] text-ink">
              Simple plans for every firm
            </Heading>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
              One plan with every feature, priced by the size of your team. Start your 7-day free trial now, no
              credit card required.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {CONTACTS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  aria-label={c.label}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="grid h-14 w-14 place-items-center rounded-full border border-slate-300 text-slate-500 transition-colors hover:border-accent hover:text-accent"
                >
                  <c.Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <a
              href={SIGNUP_URL}
              className="mt-8 hidden w-full items-center justify-center rounded-lg border border-accent/70 bg-white px-6 py-3.5 text-[15px] font-bold text-accent transition-colors hover:bg-accent hover:text-white lg:mt-auto lg:inline-flex"
            >
              Start free trial →
            </a>
          </div>

          {/* Common features (after the price card on mobile) */}
          <div className="order-3 rounded-2xl bg-white p-8 shadow-card lg:order-none">
            <h3 className="font-display text-[22px] font-bold text-ink">Common features</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Included on every plan, starting from {formatUsd(PRICING_TIERS[0].monthly)} / month.
            </p>
            <ul className="mt-7 space-y-3.5">
              {COMMON_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] text-ink">
                  <CheckBox />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Plan picker */}
          <div className="order-2 flex flex-col rounded-2xl bg-white p-8 shadow-card lg:order-none">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-[22px] font-bold text-ink">ClientSpace</h3>
              <div className="inline-flex rounded-full bg-slate-100 p-0.5 text-[12px] font-semibold">
                {(["monthly", "annual"] as const).map((cycle) => (
                  <button
                    key={cycle}
                    type="button"
                    onClick={() => setBillingCycle(cycle)}
                    aria-pressed={billingCycle === cycle}
                    className={`whitespace-nowrap rounded-full px-2.5 py-1 transition-colors ${
                      billingCycle === cycle ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"
                    }`}
                  >
                    {cycle === "monthly" ? "Monthly" : `Annual −${ANNUAL_DISCOUNT_PCT}%`}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Clients, statutory deadlines, documents and reviews for your whole team.
            </p>

            <div className="mt-6 flex min-h-[64px] items-baseline gap-2">
              {tier ? (
                <>
                  <span className="text-[26px] font-semibold text-ink">$</span>
                  <span className="font-display text-[56px] font-bold leading-none tracking-[-0.02em] text-ink">
                    {(annual ? tier.annual : tier.monthly).toLocaleString("en-US")}
                  </span>
                  <span className="text-[17px] text-ink">/ month</span>
                </>
              ) : (
                <span className="font-display text-[44px] font-bold leading-none text-ink">Custom</span>
              )}
            </div>
            <div className="mt-1 min-h-[20px] text-[13px] text-muted">
              {tier
                ? annual
                  ? `Billed yearly (${formatUsd(tier.annual * 12)}/yr), save ${formatUsd((tier.monthly - tier.annual) * 12)}`
                  : "Billed monthly"
                : "Tailored for large partnerships and multi-branch firms"}
            </div>

            <label className="sr-only" htmlFor="team-size">
              Team size
            </label>
            <div className="relative mt-5">
              <select
                id="team-size"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="w-full appearance-none rounded-md border border-slate-300 bg-white px-4 py-3.5 pr-10 text-[15px] text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              >
                {PRICING_TIERS.map((t) => (
                  <option key={t.users} value={String(t.users)}>
                    Up to {t.users} users{t.popular ? " (most popular)" : ""}
                  </option>
                ))}
                <option value="enterprise">More than {ENTERPRISE_FROM_USERS} users</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
            </div>

            {tier ? (
              <a
                href={SIGNUP_URL}
                className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-accent px-6 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-accent-dk"
              >
                Start 7-day free trial →
              </a>
            ) : (
              <Link
                href={DEMO_URL}
                className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-accent px-6 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-accent-dk"
              >
                Talk to us →
              </Link>
            )}

            <ul className="mt-7 space-y-3.5">
              {(tier
                ? [
                    "All common features",
                    `Up to ${tier.users} team members`,
                    `≈ $${perUser(annual ? tier.annual : tier.monthly, tier.users)} per user / month`,
                    "Unlimited client portal guests",
                    "Cancel anytime, no lock-in",
                  ]
                : [
                    "All common features",
                    "Custom number of team members",
                    "Multi-branch practice set-up",
                    "Guided data migration",
                    "Dedicated account partner",
                  ]
              ).map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] text-ink">
                  <CheckBox />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

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
