"use client";

import { useState } from "react";
import { SIGNUP_URL, DEMO_URL } from "./config";
import { formatRegionPrice, regionConfig, type RegionCode } from "./regionPricing";

type Group = { heading?: string; items: string[] };
type Tier = {
  name: string;
  users: string;
  blurb: string;
  /** Monthly unit price. `null` means "Custom" (Enterprise), unaffected by the billing toggle. */
  monthlyPrice: number | null;
  /** Unit label shown after the price, e.g. "client", "seat", "seat + client". */
  unit: string;
  cta: { label: string; href: string; style: "primary" | "ghost" | "accent" };
  badge?: string;
  featured?: boolean;
  groups: Group[];
};

// Annual billing = 10x the monthly price, i.e. 2 months free (~17% off),
// the standard self-serve SaaS discount for committing to a year up front.
const ANNUAL_MONTHS_CHARGED = 10;

// Standalone products: Client Space (client portal) is the flagship, sold on
// its own. Workspace (internal ops) is the additional product — also sold on
// its own, but positioned second. The Combined Bundle is a discounted rate
// for firms that want both.
const TIERS: Tier[] = [
  {
    name: "Client Space",
    users: "Per client · standalone",
    blurb: "A branded portal for every client, status, documents, and approvals in one place. No Workspace required.",
    monthlyPrice: 19,
    unit: "client",
    featured: true,
    badge: "Most popular",
    cta: { label: "Start free trial", href: SIGNUP_URL, style: "accent" },
    groups: [
      { heading: "Client portal", items: ["Branded, white-labeled client portal", "One isolated space per client engagement", "Shareable, one-click client invite links", "Clients see only their own engagement"] },
      { heading: "Client-facing work", items: ["Client-visible tasks, deliverables, and status", "Approvals and sign-off", "Secure document sharing", "Role-based access for the client role"] },
    ],
  },
  {
    name: "Workspace",
    users: "Additional product · per internal seat",
    blurb: "The additional product for your firm: run projects, finances, and billable time in one place.",
    monthlyPrice: 9,
    unit: "seat",
    cta: { label: "Start free trial", href: SIGNUP_URL, style: "primary" },
    groups: [
      { heading: "Run the firm", items: ["Projects, tasks, and calendar", "Goals and OKRs", "Request forms and documents"] },
      { heading: "Money and time", items: ["Finance dashboard: revenue, MRR, profit", "Billable vs non-billable timesheets", "Export to CSV for invoicing"] },
      { heading: "AI built in", items: ["Business Brain: context-aware AI on your firm's knowledge", "Smart Inbox and AI meeting agendas", "Plain-English automation builder"] },
      { heading: "Team", items: ["Skills, benchmarks, and skill-gap insights", "240+ workflow templates", "Roles: directors, managers, and ICs"] },
    ],
  },
  {
    name: "Combined Bundle",
    users: "Workspace + Client Space",
    blurb: "Run your firm and your client portals on one bill, at a bundled rate lower than buying separately.",
    monthlyPrice: 24.99,
    unit: "seat + client",
    badge: "Best value",
    cta: { label: "Start free trial", href: SIGNUP_URL, style: "primary" },
    groups: [
      { heading: "Everything, together", items: ["All of Workspace", "All of Client Space", "Save $3+ per month vs. buying separately", "One bill, one login for your firm"] },
    ],
  },
  {
    name: "Enterprise",
    users: "Unlimited seats",
    blurb: "For larger firms that need scale, security, and customization.",
    monthlyPrice: null,
    unit: "",
    cta: { label: "Contact sales", href: DEMO_URL, style: "ghost" },
    groups: [
      { heading: "Everything in Workspace + Client Space, plus", items: ["SSO / SAML and role-based access control", "Audit log and data residency options", "Custom fields, API, and webhooks", "Dedicated onboarding and support"] },
    ],
  },
];

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-1 flex-none text-positive">
      <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PricingTiers({
  className = "",
  region = "US",
}: {
  className?: string;
  region?: RegionCode;
}) {
  const [annual, setAnnual] = useState(false);
  const currency = regionConfig(region);

  return (
    <div className={className}>
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3">
        <div className="inline-flex items-center rounded-full border border-line bg-white p-1 shadow-card">
          {(["Monthly", "Annual"] as const).map((label) => {
            const isAnnual = label === "Annual";
            const active = annual === isAnnual;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setAnnual(isAnnual)}
                aria-pressed={active}
                className={`relative rounded-full px-5 py-2 text-[13.5px] font-semibold transition-colors ${
                  active ? "bg-ink text-white" : "text-muted hover:text-ink"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[12px] font-bold transition-opacity ${
            annual ? "bg-positive/10 text-positive" : "bg-positive/10 text-positive opacity-60"
          }`}
        >
          2 months free
        </span>
      </div>

      {currency.currency !== "USD" && (
        <p className="mt-3 text-center text-[12px] text-muted">
          Prices shown in {currency.currency}, converted from USD at an approximate rate. You&apos;ll
          be charged in USD at checkout.
        </p>
      )}

      {/* Tiers */}
      <div className="mt-8 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((t) => {
          const isCustom = t.monthlyPrice === null;
          const displayPrice = isCustom
            ? "Custom"
            : formatRegionPrice(annual ? t.monthlyPrice! * ANNUAL_MONTHS_CHARGED : t.monthlyPrice!, region);
          const cadence = isCustom
            ? "Tailored to your firm"
            : annual
            ? `/${t.unit} · per year`
            : `/${t.unit} · per month`;
          const monthlyEquivalent =
            !isCustom && annual
              ? `${formatRegionPrice(t.monthlyPrice!, region)}/mo equivalent, billed yearly`
              : null;

          return (
            <div
              key={t.name}
              className={`flex h-full flex-col rounded-[22px] border bg-white p-6 ${
                t.featured ? "border-accent shadow-soft ring-1 ring-accent" : "border-line shadow-card"
              }`}
            >
              {/* Header */}
              <div>
                <div className="flex min-h-[52px] flex-wrap items-start gap-2">
                  <h3 className="text-[19px] font-bold leading-tight">{t.name}</h3>
                  {t.badge && (
                    <span
                      className={`mt-0.5 flex-none rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        t.featured ? "bg-accent text-white" : "bg-ink/5 text-ink"
                      }`}
                    >
                      {t.badge}
                    </span>
                  )}
                </div>
                <div className="mt-0.5 min-h-[34px] text-[13px] text-muted">{t.users}</div>
              </div>

              <p className="mt-4 min-h-[92px] text-[14px] leading-relaxed text-muted">{t.blurb}</p>

              {/* Price */}
              <div className="mt-5 min-h-[58px]">
                <span className="font-display text-[38px] font-semibold leading-none">{displayPrice}</span>
                <div className="mt-1.5 text-[13px] text-muted">{cadence}</div>
                {monthlyEquivalent && (
                  <div className="mt-1 text-[12px] font-medium text-positive">{monthlyEquivalent}</div>
                )}
              </div>

              {/* CTA */}
              <a
                href={t.cta.href}
                className={`btn mt-6 justify-center ${
                  t.cta.style === "accent" ? "btn-accent" : t.cta.style === "primary" ? "btn-primary" : "btn-ghost"
                }`}
              >
                {t.cta.label}
              </a>

              {/* Feature groups */}
              {t.groups.length > 0 && (
              <div className="mt-7 flex flex-col gap-5 border-t border-line pt-6">
                {t.groups.map((g) => (
                  <div key={g.heading}>
                    {g.heading && (
                      <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-muted">
                        {g.heading}
                      </div>
                    )}
                    <ul className="flex flex-col gap-2">
                      {g.items.map((it) => (
                        <li key={it} className="flex gap-2.5 text-[13.5px] leading-snug text-ink">
                          <Check />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reassurance row */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[14px] text-muted">
        {["7-day trial on paid plans", "Cancel anytime", "Client Space works with or without Workspace"].map((r) => (
          <span key={r} className="flex items-center gap-2">
            <Check />
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}
