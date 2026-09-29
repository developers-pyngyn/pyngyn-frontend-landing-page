"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { MarketSelector } from "@/components/pricing/MarketSelector";
import { SIGNUP_URL, DEMO_URL } from "@/components/config";
import {
  type AccountantsTierPricing,
  getAccountantsPricing,
  detectClientMarket,
} from "@/lib/pricing/accountants-pricing";
import type { MarketCode } from "@/lib/pricing/config";

interface AccountantsPricingContextType {
  market: MarketCode;
  setMarket: (m: MarketCode) => void;
  pricing: AccountantsTierPricing;
}

const AccountantsPricingContext = createContext<AccountantsPricingContextType | null>(null);

export function AccountantsPricingProvider({
  initialMarket = "DEFAULT",
  children,
}: {
  initialMarket?: MarketCode;
  children: React.ReactNode;
}) {
  const [market, setMarket] = useState<MarketCode>(initialMarket);

  // Client-side detection if initial was default and user has cookie or local timezone
  useEffect(() => {
    const detected = detectClientMarket();
    if (detected !== initialMarket && initialMarket === "DEFAULT") {
      setMarket(detected);
    }
  }, [initialMarket]);

  const pricing = useMemo(() => getAccountantsPricing(market), [market]);

  return (
    <AccountantsPricingContext.Provider value={{ market, setMarket, pricing }}>
      {children}
    </AccountantsPricingContext.Provider>
  );
}

export function useAccountantsPricing() {
  const ctx = useContext(AccountantsPricingContext);
  if (!ctx) {
    return {
      market: "DEFAULT" as MarketCode,
      setMarket: () => {},
      pricing: getAccountantsPricing("DEFAULT"),
    };
  }
  return ctx;
}

export function AccountantsPriceTag({
  type,
  suffix,
  className = "",
}: {
  type: "clientspace" | "workspace" | "bundle";
  suffix?: string;
  className?: string;
}) {
  const { pricing } = useAccountantsPricing();
  const price = pricing[type];

  return (
    <span className={className}>
      {price} {suffix}
    </span>
  );
}

export function AccountantsPricingSection() {
  const { market, setMarket, pricing } = useAccountantsPricing();

  const isIndia = market === "IN";

  return (
    <section className="section" id="pricing">
      <div className="wrap text-center">
        {/* Market Selector Header Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
          <span className="eyebrow">Pricing</span>
          <div className="inline-flex items-center">
            <MarketSelector market={market} onChange={setMarket} />
          </div>
        </div>

        <h2 className="mt-2 font-display text-[clamp(26px,3.4vw,38px)] font-semibold tracking-[-0.02em] text-ink">
          Simple and predictable.
        </h2>
        <p className="lead mx-auto mt-3 max-w-[540px]">
          Choose Client Space, Workspace, or bundle both for {pricing.bundle}/mo.
        </p>

        {/* 3 Tier Cards */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[15px]">
          {/* Client Space Card */}
          <div className="min-w-[240px] rounded-2xl border border-accent bg-accent/5 px-6 py-5 text-center shadow-soft">
            <div className="font-display text-[32px] font-semibold text-accent">
              {pricing.clientspace}
            </div>
            <div className="mt-1 text-xs sm:text-[13px] text-muted">
              per client / month · Client Space
            </div>
          </div>

          {/* Workspace Card */}
          <div className="min-w-[240px] rounded-2xl border border-line bg-white px-6 py-5 text-center shadow-card">
            <div className="font-display text-[32px] font-semibold text-ink">
              {pricing.workspace}
            </div>
            <div className="mt-1 text-xs sm:text-[13px] text-muted">
              per seat / month · Workspace
            </div>
          </div>

          <span className="text-[20px] font-medium text-muted">or bundle for</span>

          {/* Bundle Card */}
          <div className="min-w-[240px] rounded-2xl border border-line bg-white px-6 py-5 text-center shadow-card ring-1 ring-accent/30">
            <div className="font-display text-[32px] font-semibold text-ink">
              {pricing.bundle}
            </div>
            <div className="mt-1 text-xs sm:text-[13px] text-muted">
              {pricing.periodText} · both together
            </div>
          </div>
        </div>

        {/* Tax & Currency Notice */}
        <p className="mt-4 text-[12px] text-muted font-medium">
          {pricing.taxNote}
        </p>

        {/* CTA Buttons */}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={SIGNUP_URL} className="btn btn-accent">
            Start free trial
          </a>
          <a href={DEMO_URL} className="btn btn-primary">
            Book a demo
          </a>
        </div>

        {/* Practice Plan Callout */}
        <div className="mt-5 text-[13px] text-muted max-w-[620px] mx-auto">
          {isIndia ? (
            <p>
              Looking for our practice-wide CA operating system?{" "}
              <Link href="/pricing" className="font-semibold text-accent hover:underline">
                Pro practice plan starts at ₹499/user/month
              </Link>{" "}
              with statutory due dates, DSC register, and PBC checklists.{" "}
              <Link href="/pricing" className="underline underline-offset-2 hover:text-ink">
                Full practice pricing →
              </Link>
            </p>
          ) : (
            <p>
              Enterprise pricing available for larger firms ·{" "}
              <Link href="/pricing" className="underline underline-offset-2 hover:text-ink">
                Full pricing →
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
