"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { SIGNUP_URL, DEMO_URL } from "@/components/config";
import {
  type AccountantsTierPricing,
  getAccountantsPricing,
  detectClientMarket,
  ACCOUNTANTS_REGIONAL_PRICING,
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
  const [market, setMarket] = useState<MarketCode>(() => {
    if (typeof window !== "undefined") {
      const client = detectClientMarket();
      if (client && client !== "DEFAULT") return client;
    }
    return initialMarket;
  });

  // Auto-detect visitor / VPN country via /api/geo/
  useEffect(() => {
    if (typeof document !== "undefined" && document.cookie.includes("pyngyn_market")) {
      document.cookie = "pyngyn_market=; Path=/; Max-Age=0; SameSite=Lax";
    }

    fetch("/api/geo/")
      .then((res) => {
        if (!res.ok) throw new Error("geo fetch failed");
        return res.json();
      })
      .then((data) => {
        if (data?.market && data.market in ACCOUNTANTS_REGIONAL_PRICING) {
          setMarket(data.market as MarketCode);
        }
      })
      .catch(() => {
        const detected = detectClientMarket();
        if (detected && detected !== market) {
          setMarket(detected);
        }
      });
  }, []);

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
  type = "pro",
  suffix = "",
  className = "",
}: {
  type?: "pro" | "business" | "clientspace" | "workspace" | "bundle";
  suffix?: string;
  className?: string;
}) {
  const { pricing } = useAccountantsPricing();
  const priceKey = (type === "workspace" || type === "bundle") ? "business" : (type === "clientspace" ? "pro" : type);
  const price = pricing[priceKey] || pricing.pro;

  return (
    <span className={className}>
      {price} {suffix}
    </span>
  );
}

export function AccountantsPricingSection() {
  const { pricing } = useAccountantsPricing();

  return (
    <section className="section" id="pricing">
      <div className="wrap text-center">
        <span className="eyebrow">Pricing</span>

        <h2 className="mt-2 font-display text-[clamp(26px,3.4vw,38px)] font-semibold tracking-[-0.02em] text-ink">
          Transparent practice pricing.
        </h2>
        <p className="lead mx-auto mt-3 max-w-[580px]">
          Predictable per-user pricing tailored for CA partnerships, audit firms, and tax practitioners.
        </p>

        {/* 2 Tier Cards — Professional & Business */}
        <div className="mt-8 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto text-left">
          {/* Pro Card */}
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-ink">Pyngyn Professional</h3>
              </div>
              <p className="text-xs text-muted mt-1">Tasks, projects, client spaces, collaboration, knowledge & workflows.</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-[32px] sm:text-[36px] font-bold text-ink">{pricing.pro}</span>
                <span className="text-xs text-muted">/ user / month</span>
              </div>
              <ul className="mt-6 space-y-3 text-[13.5px] text-slate-600">
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>Tasks, Kanban boards & project timelines</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>Branded client spaces with magic links</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>Team collaboration, discussions & activity feeds</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>Firm knowledge base & practice SOPs</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>Practice workflows & statutory due dates</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>Client communication &amp; portal messaging</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>25 GB secure encrypted document vault</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-line">
              <a href={SIGNUP_URL} className="btn btn-ghost w-full justify-center">
                Start 7-day free trial
              </a>
            </div>
          </div>

          {/* Business Card (Featured) */}
          <div className="rounded-2xl border-2 border-accent bg-accent/5 p-6 sm:p-8 shadow-soft flex flex-col justify-between relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
              Most Popular for Growing Firms
            </span>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-accent">Pyngyn Business</h3>
              </div>
              <p className="text-xs text-muted mt-1">Everything + analytics, permissions &amp; AI.</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-[32px] sm:text-[36px] font-bold text-accent">{pricing.business}</span>
                <span className="text-xs text-muted">/ user / month</span>
              </div>
              <ul className="mt-6 space-y-3 text-[13.5px] text-slate-700">
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span className="font-semibold">Everything in Professional, plus:</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>Live effort tracking timers &amp; capacity meters</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>Practice Workload Cockpit & capacity meters</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>1-click team workload auto-rebalance</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>4-eye partner review gates & granular roles</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>AI project plans & living status reports</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>Practice-level reporting & compliance radar</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>100 GB secure encrypted document vault</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-accent/20">
              <a href={SIGNUP_URL} className="btn btn-accent w-full justify-center">
                Start 7-day free trial
              </a>
            </div>
          </div>
        </div>

        {/* Tax & Currency Notice */}
        <p className="mt-5 text-[12px] text-muted font-medium">
          {pricing.taxNote}
        </p>

        {/* Practice Plan Callout */}
        <div className="mt-4 text-[13px] text-muted max-w-[620px] mx-auto">
          <p>
            Looking for detailed feature breakdowns?{" "}
            <Link href="/pricing" className="font-semibold text-accent hover:underline">
              View full practice pricing &amp; feature comparison →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
