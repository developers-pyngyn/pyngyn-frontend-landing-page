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
  const [market, setMarket] = useState<MarketCode>(initialMarket);

  // Auto-detect visitor / VPN country via /api/geo/
  useEffect(() => {
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

        {/* 3 Tier Cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-[960px] mx-auto text-left">
          {/* Pro Card */}
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-ink">ClientSpace Pro</h3>
              </div>
              <p className="text-xs text-muted mt-1">Essential statutory task tracking & client portal.</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-[32px] font-bold text-ink">{pricing.pro}</span>
                <span className="text-xs text-muted">/ user / month</span>
              </div>
              <ul className="mt-5 space-y-2.5 text-[13.5px] text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>Statutory due date tracker</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>White-labeled client portal</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>PBC document request checklists</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>DSC expiry register</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-line">
              <a href={SIGNUP_URL} className="btn btn-ghost w-full justify-center">
                Start 7-day free trial
              </a>
            </div>
          </div>

          {/* Business Card (Featured) */}
          <div className="rounded-2xl border-2 border-accent bg-accent/5 p-6 shadow-soft flex flex-col justify-between relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
              Most Popular for CAs
            </span>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-accent">ClientSpace Business</h3>
              </div>
              <p className="text-xs text-muted mt-1">Full practice operating system & review workflows.</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-[32px] font-bold text-accent">{pricing.business}</span>
                <span className="text-xs text-muted">/ user / month</span>
              </div>
              <ul className="mt-5 space-y-2.5 text-[13.5px] text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="font-semibold">Everything in Pro, plus:</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>Practice Workload Cockpit</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>4-eye partner review gates</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>WhatsApp automated document chase</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>Tally & accounting software sync</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-accent/20">
              <a href={SIGNUP_URL} className="btn btn-accent w-full justify-center">
                Start 7-day free trial
              </a>
            </div>
          </div>

          {/* Enterprise Card */}
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-ink">Enterprise</h3>
              </div>
              <p className="text-xs text-muted mt-1">Multi-branch CA partnerships & large firms.</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-[32px] font-bold text-ink">Custom</span>
                <span className="text-xs text-muted">annual agreement</span>
              </div>
              <ul className="mt-5 space-y-2.5 text-[13.5px] text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>Multi-branch practice partitions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>Dedicated practice data migration</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>Enterprise SSO & SAML</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>99.9% uptime SLA & account partner</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-line">
              <a href={DEMO_URL} className="btn btn-primary w-full justify-center">
                Book a demo
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
