"use client";

/*
 * Pricing tables, rendered entirely from lib/pricing/config.ts for the market
 * the server detected. There are no figures, currency symbols or discount
 * percentages in this file: every number goes through formatPrice(), and the
 * saving is derived with getSavings() rather than typed in. Flipping
 * ACTIVE_STAGE in the config updates this whole component with no edit here.
 *
 * Prices are localised, not converted — the old regionPricing.ts FX multipliers
 * are gone, so what a visitor reads is a real local price point.
 */

import { useState } from "react";
import { SIGNUP_URL, DEMO_URL } from "./config";
import {
  ACTIVE_STAGE,
  PRICING,
  formatPrice,
  getAnnualTotal,
  getPricing,
  getSavings,
  type MarketCode,
  type ProductKey,
} from "@/lib/pricing/config";

type Group = { heading?: string; items: string[]; /** hidden until Stage 1 */ aiStage?: boolean };

type Tier = {
  name: string;
  /** null = Enterprise: never renders a list price, in any currency */
  product: ProductKey | null;
  users: string;
  blurb: string;
  unit: string;
  cta: { label: string; href: string; style: "primary" | "ghost" | "accent" };
  badge?: string;
  featured?: boolean;
  groups: Group[];
};

const TIERS: Tier[] = [
  {
    name: "Clientspace",
    product: "clientspace",
    users: "Per seat · unlimited free client access",
    blurb:
      "A branded portal for every client — status, documents, and approvals in one place. Clients and guests join free. No Workspace required.",
    unit: "seat",
    featured: true,
    badge: "Most popular",
    cta: { label: "Start free trial", href: SIGNUP_URL, style: "accent" },
    groups: [
      {
        heading: "Client portal",
        items: [
          "Branded, white-labeled client portal",
          "One isolated space per client engagement",
          "Unlimited free client and guest seats",
          "Shareable, one-click client invite links",
        ],
      },
      {
        heading: "Client-facing work",
        items: [
          "Client-visible tasks, deliverables, and status",
          "Approvals and sign-off",
          "Secure document sharing",
          "Role-based access for the client role",
        ],
      },
    ],
  },
  {
    name: "Workspace",
    product: "workspace",
    users: "Add-on · per internal seat",
    blurb:
      "The low-cost add-on for your firm: run projects, finances, and billable time in one place.",
    unit: "seat",
    cta: { label: "Start free trial", href: SIGNUP_URL, style: "primary" },
    groups: [
      {
        heading: "Run the firm",
        items: ["Projects, tasks, and calendar", "Goals and OKRs", "Request forms and documents"],
      },
      {
        heading: "Money and time",
        items: [
          "Finance dashboard: revenue, MRR, profit",
          "Billable vs non-billable timesheets",
          "Export to CSV for invoicing",
        ],
      },
      {
        heading: "Team",
        items: [
          "Skills, benchmarks, and skill-gap insights",
          "240+ workflow templates",
          "Roles: directors, managers, and ICs",
        ],
      },
    ],
  },
  {
    name: "Full Bundle",
    product: "bundle",
    users: "Clientspace + Workspace",
    blurb:
      "Run your firm and your client portals on one bill, at a bundled rate lower than buying both separately.",
    unit: "seat",
    badge: "Best value",
    cta: { label: "Start free trial", href: SIGNUP_URL, style: "primary" },
    groups: [
      {
        heading: "Everything, together",
        items: [
          "All of Clientspace",
          "All of Workspace",
          "Cheaper than buying the two separately",
          "One bill, one login for your firm",
        ],
      },
    ],
  },
  {
    name: "Enterprise",
    product: null,
    users: "75+ seats or custom needs",
    blurb: "For larger firms that need scale, security, and customization.",
    unit: "",
    cta: { label: "Contact Sales", href: DEMO_URL, style: "ghost" },
    groups: [
      {
        heading: "Everything in the Full Bundle, plus",
        items: [
          "SSO / SAML and role-based access control",
          "Audit log and data residency options",
          "Custom fields, API, and webhooks",
          "Dedicated onboarding and support",
        ],
      },
    ],
  },
];

function Check() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="mt-1 flex-none text-positive"
    >
      <path
        d="M5 12l5 5L20 6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PricingTiers({
  className = "",
  market = "DEFAULT",
}: {
  className?: string;
  market?: MarketCode;
}) {
  const [annual, setAnnual] = useState(false);
  const marketConfig = PRICING[market];
  const stage = getPricing(market, ACTIVE_STAGE);

  /* Derived, never typed: the headline saving comes from the config's own
     annual figures, so it can't drift away from the prices beside it. */
  const bundleSavings = getSavings("bundle", marketConfig, ACTIVE_STAGE);
  const bundlePrice = stage.bundle;
  const savingPct = Math.round((bundleSavings.perMonth / bundlePrice.monthly) * 100);

  return (
    <div className={className}>
      {/* Billing toggle — the saving rides inside the Annual button */}
      <div className="flex flex-wrap items-center justify-center gap-3">
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
                className={`relative flex items-center gap-1.5 rounded-full px-5 py-2 text-[13.5px] font-semibold transition-colors ${
                  active ? "bg-ink text-white" : "text-muted hover:text-ink"
                }`}
              >
                {label}
                {isAnnual && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold ${
                      active ? "bg-white/15 text-white" : "bg-positive/10 text-positive"
                    }`}
                  >
                    −{savingPct}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tiers */}
      <div className="mt-8 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((tier) => {
          const price = tier.product ? stage[tier.product] : null;
          const perMonth = price ? (annual ? price.annualPerMonth : price.monthly) : null;
          const approx = price?.usdApprox
            ? annual
              ? price.usdApprox.annualPerMonth
              : price.usdApprox.monthly
            : null;
          const annualTotal =
            tier.product && annual
              ? getAnnualTotal(tier.product, marketConfig, ACTIVE_STAGE)
              : null;
          const savings = tier.product
            ? getSavings(tier.product, marketConfig, ACTIVE_STAGE)
            : null;

          return (
            <div
              key={tier.name}
              className={`flex h-full flex-col rounded-[22px] border bg-white p-6 ${
                tier.featured
                  ? "border-accent shadow-soft ring-1 ring-accent"
                  : "border-line shadow-card"
              }`}
            >
              {/* Fixed heights on every block above the CTA, so the buttons
                  land on one shared line across all four cards. */}
              <div className="h-[88px]">
                <div className="flex min-h-[52px] flex-wrap items-start gap-2">
                  <h3 className="text-[19px] font-bold leading-tight">{tier.name}</h3>
                  {tier.badge && (
                    <span
                      className={`mt-0.5 flex-none rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        tier.featured ? "bg-accent text-white" : "bg-ink/5 text-ink"
                      }`}
                    >
                      {tier.badge}
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-[13px] text-muted">{tier.users}</div>
              </div>

              <p className="mt-4 h-[112px] overflow-hidden text-[14px] leading-relaxed text-muted">
                {tier.blurb}
              </p>

              {/* Price — Enterprise never shows one */}
              <div className="mt-4 h-[96px]">
                {perMonth === null ? (
                  <>
                    <span className="font-display text-[30px] font-semibold leading-none">
                      Let&apos;s talk
                    </span>
                    <div className="mt-1.5 text-[13px] text-muted">Tailored to your firm</div>
                  </>
                ) : (
                  <>
                    <span className="font-display text-[38px] font-semibold leading-none">
                      {formatPrice(perMonth, marketConfig)}
                    </span>
                    {approx && (
                      <span className="ml-1.5 align-middle text-[12px] text-muted">({approx})</span>
                    )}
                    <div className="mt-1.5 text-[13px] text-muted">
                      /{tier.unit} · per month
                    </div>
                    {annual && annualTotal !== null ? (
                      <div className="mt-1 text-[12px] text-muted">
                        billed annually — {formatPrice(annualTotal, marketConfig)}/year
                      </div>
                    ) : null}
                    {annual && savings && savings.perYear > 0 ? (
                      <div className="mt-0.5 text-[12px] font-medium text-positive">
                        Save {formatPrice(savings.perYear, marketConfig)} per seat, per year
                      </div>
                    ) : null}
                  </>
                )}
              </div>

              <a
                href={tier.cta.href}
                className={`btn mt-6 justify-center ${
                  tier.cta.style === "accent"
                    ? "btn-accent"
                    : tier.cta.style === "primary"
                      ? "btn-primary"
                      : "btn-ghost"
                }`}
              >
                {tier.cta.label}
              </a>

              {tier.groups.length > 0 && (
                <div className="mt-7 flex flex-col gap-5 border-t border-line pt-6">
                  {tier.groups
                    /* Stage 0 ships no claims about unshipped functionality. */
                    .filter((group) => !group.aiStage || ACTIVE_STAGE !== "core")
                    .map((group) => (
                      <div key={group.heading}>
                        {group.heading && (
                          <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-muted">
                            {group.heading}
                          </div>
                        )}
                        <ul className="flex flex-col gap-2">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2.5 text-[13.5px] leading-snug text-ink"
                            >
                              <Check />
                              {item}
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
        {[
          "7-day trial on paid plans",
          "Cancel anytime",
          "Clientspace works with or without Workspace",
        ].map((line) => (
          <span key={line} className="flex items-center gap-2">
            <Check />
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
