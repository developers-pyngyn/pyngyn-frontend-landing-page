import React from "react";
import Link from "next/link";
import { SIGNUP_URL } from "@/components/config";
import {
  PRICING_TIERS,
  ENTERPRISE_FROM_USERS,
  formatUsd,
} from "@/components/clientspace-pricing-data";

// Prices are the same USD tiers for every visitor (see clientspace-pricing-data),
// so this no longer needs geo detection. The provider is kept so the page markup
// doesn't have to change.
export function AccountantsPricingProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

/** Entry price, e.g. "$49". */
export function AccountantsPriceTag({ className = "" }: { className?: string }) {
  return <span className={className}>{formatUsd(PRICING_TIERS[0].monthly)}</span>;
}

export function AccountantsPricingSection() {
  return (
    <section className="section" id="pricing">
      <div className="wrap text-center">
        <span className="eyebrow">Pricing</span>

        <h2 className="mt-2 font-display text-[clamp(26px,3.4vw,38px)] font-semibold tracking-[-0.02em] text-ink">
          Transparent practice pricing.
        </h2>
        <p className="lead mx-auto mt-3 max-w-[580px]">
          One plan with every feature, priced by the size of your team. Unlimited client portal guests on every plan.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.users}
              className={`rounded-2xl bg-white p-5 shadow-card ${
                tier.popular ? "border-2 border-accent" : "border border-line"
              }`}
            >
              <div className="text-[13px] font-semibold text-muted">Up to {tier.users} users</div>
              <div className="mt-1 font-display text-[28px] font-bold text-ink">
                {formatUsd(tier.monthly)}
                <span className="text-xs font-medium text-muted"> / month</span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-[12px] text-muted font-medium">
          Prices in USD. Save 20% with annual billing. More than {ENTERPRISE_FROM_USERS} users? Talk to us for a custom plan.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href={SIGNUP_URL} className="btn btn-accent">
            Start 7-day free trial
          </a>
          <Link href="/pricing" className="btn btn-ghost">
            See everything included →
          </Link>
        </div>
      </div>
    </section>
  );
}
