"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { DEMO_URL, SIGNUP_URL } from "./config";

// ---------------------------------------------------------------------------
// Currency handling (consistent with the other PYNGYN calculators)
// ---------------------------------------------------------------------------

type Currency = "INR" | "USD";

const SYMBOL: Record<Currency, string> = { INR: "₹", USD: "$" };
const LOCALE: Record<Currency, string> = { INR: "en-IN", USD: "en-US" };

function formatMoney(value: number, cur: Currency): string {
  const sym = SYMBOL[cur];
  const v = Math.round(value);
  const sign = v < 0 ? "-" : "";
  return `${sign}${sym}${Math.abs(v).toLocaleString(LOCALE[cur])}`;
}

// Short human form: ₹3.9 L / ₹1.2 Cr  |  $38k / $1.2M
function formatShort(value: number, cur: Currency): string {
  const sym = SYMBOL[cur];
  const sign = value < 0 ? "-" : "";
  const v = Math.abs(value);
  if (cur === "INR") {
    if (v >= 1e7) return `${sign}${sym}${(v / 1e7).toFixed(v / 1e7 >= 10 ? 0 : 1)} Cr`;
    if (v >= 1e5) return `${sign}${sym}${(v / 1e5).toFixed(v / 1e5 >= 10 ? 0 : 1)} L`;
    return `${sign}${sym}${Math.round(v).toLocaleString("en-IN")}`;
  }
  if (v >= 1e6) return `${sign}${sym}${(v / 1e6).toFixed(v / 1e6 >= 10 ? 0 : 1)}M`;
  if (v >= 1e3) return `${sign}${sym}${Math.round(v / 1e3)}k`;
  return `${sign}${sym}${Math.round(v).toLocaleString("en-US")}`;
}

// ---------------------------------------------------------------------------
// Animated count-up for the headline figure
// ---------------------------------------------------------------------------

function useCountUp(target: number, duration = 700) {
  const [display, setDisplay] = useState(target);
  const displayRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    displayRef.current = display;
  }, [display]);

  useEffect(() => {
    const from = displayRef.current;
    const start = performance.now();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = from + (target - from) * eased;
      displayRef.current = next;
      setDisplay(next);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return display;
}

// ---------------------------------------------------------------------------
// State + defaults
// ---------------------------------------------------------------------------

type Role = { id: string; name: string; hours: number; cost: number; bill: number };

type Defaults = {
  fee: number;
  otherCosts: number;
  roles: { name: string; hours: number; cost: number; bill: number }[];
};

const DEFAULTS: Record<Currency, Defaults> = {
  INR: {
    fee: 1000000,
    otherCosts: 50000,
    roles: [
      { name: "Partner", hours: 20, cost: 4000, bill: 8000 },
      { name: "Manager", hours: 80, cost: 2000, bill: 5000 },
      { name: "Consultant", hours: 200, cost: 1200, bill: 3000 },
      { name: "Analyst", hours: 120, cost: 700, bill: 1800 },
    ],
  },
  USD: {
    fee: 55000,
    otherCosts: 2500,
    roles: [
      { name: "Partner", hours: 20, cost: 200, bill: 400 },
      { name: "Manager", hours: 80, cost: 110, bill: 260 },
      { name: "Consultant", hours: 200, cost: 70, bill: 160 },
      { name: "Analyst", hours: 120, cost: 45, bill: 95 },
    ],
  },
};

type State = {
  currency: Currency;
  fee: number;
  otherCosts: number;
  overheadPct: number; // 0..1, optional uplift on labor cost
  roles: Role[];
};

let ID = 0;
const nextId = () => `r${++ID}`;

function buildDefault(cur: Currency): State {
  const d = DEFAULTS[cur];
  return {
    currency: cur,
    fee: d.fee,
    otherCosts: d.otherCosts,
    overheadPct: 0,
    roles: d.roles.map((r) => ({ id: nextId(), ...r })),
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function CostMarginEstimator() {
  const [s, setS] = useState<State>(() => buildDefault("USD"));
  const [overrun, setOverrun] = useState(0); // 0..0.5 effort overrun for sensitivity
  const [copied, setCopied] = useState(false);

  function set<K extends keyof State>(key: K, value: State[K]) {
    setS((prev) => ({ ...prev, [key]: value }));
  }

  function updateRole(id: string, patch: Partial<Role>) {
    setS((prev) => ({
      ...prev,
      roles: prev.roles.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    }));
  }

  function addRole() {
    const d = DEFAULTS[s.currency].roles;
    const seed = d[Math.min(s.roles.length, d.length - 1)];
    setS((prev) => ({
      ...prev,
      roles: [...prev.roles, { id: nextId(), name: "New role", hours: 0, cost: seed.cost, bill: seed.bill }],
    }));
  }

  function removeRole(id: string) {
    setS((prev) =>
      prev.roles.length <= 1 ? prev : { ...prev, roles: prev.roles.filter((r) => r.id !== id) }
    );
  }

  // Currency switch keeps role names + hours + overhead, reseeds money fields.
  function switchCurrency(cur: Currency) {
    setS((prev) => {
      if (cur === prev.currency) return prev;
      const d = DEFAULTS[cur];
      return {
        ...prev,
        currency: cur,
        fee: d.fee,
        otherCosts: d.otherCosts,
        roles: prev.roles.map((r, i) => {
          const seed = d.roles[Math.min(i, d.roles.length - 1)];
          return { ...r, cost: seed.cost, bill: seed.bill };
        }),
      };
    });
  }

  // --- The math (first principles, fully transparent) ---
  const m = useMemo(() => {
    const per = s.roles.map((r) => ({
      ...r,
      laborCost: r.hours * r.cost,
      standardValue: r.hours * r.bill, // value at time-and-materials bill rates
    }));
    const totalHours = per.reduce((a, r) => a + r.hours, 0);
    const laborCost = per.reduce((a, r) => a + r.laborCost, 0);
    const standardValue = per.reduce((a, r) => a + r.standardValue, 0);
    const overheadCost = laborCost * s.overheadPct;
    const loadedLabor = laborCost + overheadCost;
    const totalCost = loadedLabor + s.otherCosts;

    const fee = s.fee;
    const grossMargin = fee - totalCost;
    const marginPct = fee > 0 ? grossMargin / fee : 0;
    const blendedBillRate = totalHours > 0 ? fee / totalHours : 0;
    const blendedCostRate = totalHours > 0 ? loadedLabor / totalHours : 0;
    const marginPerHour = totalHours > 0 ? grossMargin / totalHours : 0;
    const discountVsStandard = standardValue > 0 ? (standardValue - fee) / standardValue : 0;
    const breakevenFee = totalCost;

    // Sensitivity: effort runs over by `overrun`, labor + overhead scale, pass-through fixed.
    const overCost = loadedLabor * (1 + overrun) + s.otherCosts;
    const overMargin = fee - overCost;
    const overMarginPct = fee > 0 ? overMargin / fee : 0;

    return {
      per,
      totalHours,
      laborCost,
      overheadCost,
      loadedLabor,
      standardValue,
      otherCosts: s.otherCosts,
      totalCost,
      fee,
      grossMargin,
      marginPct,
      blendedBillRate,
      blendedCostRate,
      marginPerHour,
      discountVsStandard,
      breakevenFee,
      overMargin,
      overMarginPct,
    };
  }, [s, overrun]);

  const cur = s.currency;
  const marginPctDisplay = useCountUp(m.marginPct * 100);
  const profitable = m.grossMargin >= 0;

  // Fee split bar (cost vs margin). When at a loss, cost exceeds the fee.
  const costShareOfFee = m.fee > 0 ? Math.min(100, (m.totalCost / m.fee) * 100) : 100;
  const marginShareOfFee = Math.max(0, 100 - costShareOfFee);

  async function copySummary() {
    const lines = [
      `PYNGYN project cost and margin estimate`,
      `Quoted fee: ${formatMoney(m.fee, cur)}  |  Total effort: ${m.totalHours.toLocaleString(
        LOCALE[cur]
      )} hrs`,
      ``,
      ...m.per.map(
        (r) =>
          `  ${r.name}: ${r.hours} hrs × ${formatMoney(r.cost, cur)}/hr = ${formatMoney(
            r.laborCost,
            cur
          )}`
      ),
      ``,
      `Labor cost: ${formatMoney(m.laborCost, cur)}`,
      s.overheadPct > 0 ? `Overhead (${Math.round(s.overheadPct * 100)}%): ${formatMoney(m.overheadCost, cur)}` : ``,
      `Other costs: ${formatMoney(m.otherCosts, cur)}`,
      `Cost to deliver: ${formatMoney(m.totalCost, cur)}`,
      ``,
      `Gross margin: ${formatMoney(m.grossMargin, cur)} (${(m.marginPct * 100).toFixed(1)}%)`,
      `Blended bill rate: ${formatMoney(m.blendedBillRate, cur)}/hr  |  Breakeven fee: ${formatMoney(
        m.breakevenFee,
        cur
      )}`,
      `Fixed fee is ${(m.discountVsStandard * 100).toFixed(0)}% off the same work at your T&M rates.`,
      ``,
      `Estimate from PYNGYN's free tool. Numbers are illustrative; your inputs drive the result.`,
    ];
    try {
      await navigator.clipboard.writeText(lines.filter((l) => l !== "").join("\n") + "\n");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable, ignore */
    }
  }

  return (
    <div className="wrap pb-[80px]">
      <div className="grid gap-7 lg:grid-cols-[440px_1fr]">
        {/* ---------------- Inputs ---------------- */}
        <aside className="lg:sticky lg:top-[88px] lg:self-start">
          <div className="rounded-[20px] border border-line bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                The engagement
              </div>
              <div className="inline-flex rounded-full border border-line p-0.5">
                {(["INR", "USD"] as Currency[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => switchCurrency(c)}
                    className={`rounded-full px-3 py-1 text-[12px] font-semibold transition-colors ${
                      cur === c ? "bg-ink text-white" : "text-muted hover:text-ink"
                    }`}
                  >
                    {SYMBOL[c]} {c}
                  </button>
                ))}
              </div>
            </div>

            <h2 className="mt-3 font-display text-[24px] font-semibold tracking-[-0.02em]">
              Will this fee make money?
            </h2>

            {/* Quoted fee */}
            <div className="mt-5">
              <NumberField
                label="Your quoted fixed fee"
                hint="The price on the proposal"
                value={s.fee}
                min={0}
                max={cur === "INR" ? 1e9 : 1e7}
                step={cur === "INR" ? 5000 : 100}
                prefix={SYMBOL[cur]}
                onChange={(v) => set("fee", v)}
              />
            </div>

            {/* Role roster */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-ink">Team on the engagement</span>
                <span className="text-[11px] text-muted">Hours and rates per role</span>
              </div>
              <div className="space-y-2.5">
                {s.roles.map((r) => (
                  <div key={r.id} className="rounded-xl border border-line bg-canvas/50 p-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={r.name}
                        onChange={(e) => updateRole(r.id, { name: e.target.value })}
                        className="w-full rounded-lg border border-line bg-white px-2.5 py-1.5 text-[13px] font-semibold text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                        aria-label="Role name"
                      />
                      {s.roles.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRole(r.id)}
                          aria-label={`Remove ${r.name}`}
                          className="grid h-7 w-7 flex-none place-items-center rounded-lg border border-line text-muted transition-colors hover:border-red-300 hover:text-red-500"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <MiniField
                        label="Hours"
                        value={r.hours}
                        min={0}
                        max={100000}
                        onChange={(v) => updateRole(r.id, { hours: v })}
                      />
                      <MiniField
                        label={`Cost ${SYMBOL[cur]}/hr`}
                        value={r.cost}
                        min={0}
                        max={cur === "INR" ? 200000 : 5000}
                        step={cur === "INR" ? 100 : 5}
                        onChange={(v) => updateRole(r.id, { cost: v })}
                      />
                      <MiniField
                        label={`Bill ${SYMBOL[cur]}/hr`}
                        value={r.bill}
                        min={0}
                        max={cur === "INR" ? 200000 : 5000}
                        step={cur === "INR" ? 100 : 5}
                        onChange={(v) => updateRole(r.id, { bill: v })}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addRole}
                className="mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent transition-colors hover:text-accent-dk"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Add role
              </button>
            </div>

            {/* Other costs + overhead */}
            <div className="mt-6 space-y-5">
              <NumberField
                label="Other costs"
                hint="Travel, software, subcontractors"
                value={s.otherCosts}
                min={0}
                max={cur === "INR" ? 1e9 : 1e7}
                step={cur === "INR" ? 1000 : 50}
                prefix={SYMBOL[cur]}
                onChange={(v) => set("otherCosts", v)}
              />
              <SliderField
                label="Overhead on labor"
                value={s.overheadPct}
                min={0}
                max={0.6}
                step={0.05}
                display={`${Math.round(s.overheadPct * 100)}%`}
                caption="Optional uplift if your cost rates are not already fully loaded."
                onChange={(v) => set("overheadPct", v)}
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setS(buildDefault(cur));
                setOverrun(0);
              }}
              className="mt-6 w-full rounded-full border border-line bg-white py-2.5 text-[13px] font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
            >
              Reset to defaults
            </button>
          </div>
        </aside>

        {/* ---------------- Results ---------------- */}
        <section className="space-y-4">
          {/* Headline: gross margin */}
          <div className="relative overflow-hidden rounded-[22px] border border-line bg-ink p-7 text-white shadow-card lg:p-9">
            <div
              className="glow-radial pointer-events-none absolute inset-0 opacity-[0.6]"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
                Gross margin on this engagement
              </div>
              <div className="mt-3 flex items-end gap-3">
                <span
                  className={`font-display text-[clamp(40px,7vw,68px)] font-semibold leading-none tracking-[-0.03em] ${
                    profitable ? "" : "text-red-300"
                  }`}
                >
                  {marginPctDisplay.toFixed(1)}%
                </span>
                <span
                  className={`mb-2 rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                    profitable ? "bg-emerald-400/15 text-emerald-300" : "bg-red-400/15 text-red-300"
                  }`}
                >
                  {profitable ? "Profitable" : "Loses money"}
                </span>
              </div>
              <div className="mt-2 text-[15px] text-white/65">
                <span className="font-semibold text-white">{formatShort(m.grossMargin, cur)}</span>{" "}
                margin on a {formatShort(m.fee, cur)} fee. Costs{" "}
                <span className="font-semibold text-white">{formatShort(m.totalCost, cur)}</span> to
                deliver across {m.totalHours.toLocaleString(LOCALE[cur])} hours.
              </div>

              {/* Cost vs margin within the fee */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-[12px] text-white/55">
                  <span>How the fee splits</span>
                  <span>{formatShort(m.fee, cur)} fee</span>
                </div>
                <div className="mt-2 flex h-3.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full bg-white/85"
                    animate={{ width: `${costShareOfFee}%` }}
                    transition={{ duration: 0.5, ease: [0.21, 0.6, 0.35, 1] }}
                  />
                  <motion.div
                    className={`h-full ${profitable ? "bg-emerald-400" : "bg-red-400"}`}
                    animate={{ width: `${marginShareOfFee}%` }}
                    transition={{ duration: 0.5, ease: [0.21, 0.6, 0.35, 1] }}
                  />
                </div>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px]">
                  <span className="inline-flex items-center gap-1.5 text-white/70">
                    <span className="h-2 w-2 rounded-full bg-white/85" /> Cost to deliver
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-white/70">
                    <span className={`h-2 w-2 rounded-full ${profitable ? "bg-emerald-400" : "bg-red-400"}`} />{" "}
                    {profitable ? "Margin" : "Shortfall"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Blended rates + discount */}
          <div className="rounded-[22px] border border-accent/20 bg-accent-lt p-7 shadow-card">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              What the fee implies
            </div>
            <div className="mt-3 grid gap-5 sm:grid-cols-2">
              <div>
                <div className="font-display text-[clamp(28px,4vw,38px)] font-semibold leading-none tracking-[-0.02em] text-ink">
                  {formatMoney(m.blendedBillRate, cur)}<span className="text-[18px] text-muted">/hr</span>
                </div>
                <div className="mt-1.5 text-[14px] text-muted">
                  blended bill rate, vs {formatMoney(m.blendedCostRate, cur)}/hr loaded cost
                </div>
              </div>
              <div className="sm:border-l sm:border-accent/20 sm:pl-5">
                <div className="font-display text-[clamp(28px,4vw,38px)] font-semibold leading-none tracking-[-0.02em] text-ink">
                  {(m.discountVsStandard * 100).toFixed(0)}%
                </div>
                <div className="mt-1.5 text-[14px] text-muted">
                  {m.discountVsStandard >= 0 ? "below" : "above"} the same work at your T&amp;M rates
                </div>
              </div>
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard
              label="Cost to deliver"
              value={formatShort(m.totalCost, cur)}
              sub={`${m.totalHours.toLocaleString(LOCALE[cur])} hrs of effort`}
              tone="ink"
            />
            <MetricCard
              label="Gross margin"
              value={formatShort(m.grossMargin, cur)}
              sub={`${formatMoney(m.marginPerHour, cur)}/hr`}
              tone={profitable ? "positive" : "warn"}
            />
            <MetricCard
              label="Breakeven fee"
              value={formatShort(m.breakevenFee, cur)}
              sub="do not quote below this"
              tone="accent"
            />
          </div>

          {/* Sensitivity to effort overrun */}
          <div className="rounded-[22px] border border-line bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                If effort runs over
              </div>
              <span className="rounded-md bg-accent-lt px-2 py-0.5 font-mono text-[12px] font-semibold text-accent">
                +{Math.round(overrun * 100)}%
              </span>
            </div>
            <input
              type="range"
              value={overrun}
              min={0}
              max={0.5}
              step={0.05}
              onChange={(e) => setOverrun(Number(e.target.value))}
              className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-accent"
              aria-label="Effort overrun"
            />
            <p className="mt-3 text-[14px] text-muted">
              If the team spends {Math.round(overrun * 100)}% more hours than planned, margin becomes{" "}
              <span className={`font-semibold ${m.overMargin >= 0 ? "text-positive" : "text-amber-600"}`}>
                {formatMoney(m.overMargin, cur)} ({(m.overMarginPct * 100).toFixed(1)}%)
              </span>
              . Scope creep is where fixed-fee margin quietly disappears.
            </p>
          </div>

          {/* Breakdown */}
          <div className="rounded-[22px] border border-line bg-white p-6 shadow-card">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              How the numbers add up
            </div>
            <dl className="mt-4 divide-y divide-line text-[14px]">
              {m.per.map((r) => (
                <Row
                  key={r.id}
                  k={r.name || "Role"}
                  v={formatMoney(r.laborCost, cur)}
                  note={`${r.hours.toLocaleString(LOCALE[cur])} hrs × ${formatMoney(r.cost, cur)}/hr`}
                />
              ))}
              <Row k="Labor cost" v={formatMoney(m.laborCost, cur)} strong />
              {s.overheadPct > 0 && (
                <Row
                  k="Overhead on labor"
                  v={formatMoney(m.overheadCost, cur)}
                  note={`× ${Math.round(s.overheadPct * 100)}%`}
                />
              )}
              <Row k="Other costs" v={formatMoney(m.otherCosts, cur)} note="Travel, software, subcontractors" />
              <Row k="Cost to deliver" v={formatMoney(m.totalCost, cur)} strong />
              <Row k="Quoted fee" v={formatMoney(m.fee, cur)} />
              <Row k="Gross margin" v={`${formatMoney(m.grossMargin, cur)} (${(m.marginPct * 100).toFixed(1)}%)`} strong />
            </dl>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={copySummary}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-all ${
                  copied
                    ? "border-positive bg-positive/10 text-positive"
                    : "border-line bg-white text-ink hover:border-accent hover:text-accent"
                }`}
              >
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="8" y="3" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" />
                      <path d="M3 21V8a2 2 0 012-2h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                    Copy summary
                  </>
                )}
              </button>
              <span className="text-[12px] text-muted">Estimates only. Every figure is yours to adjust.</span>
            </div>
          </div>

          {/* CTA */}
          <div className="overflow-hidden rounded-[22px] border border-line bg-gradient-to-br from-accent-lt via-white to-canvas p-7 lg:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  Protect margin after you win the work
                </div>
                <h3 className="mt-2 font-display text-[26px] font-semibold tracking-[-0.02em] lg:text-[30px]">
                  Price it once, then watch it hold.
                </h3>
                <p className="mt-2 max-w-[540px] text-[15px] text-muted">
                  In a 30-minute demo we run PYNGYN on an engagement like this one and show how live
                  effort tracking flags the overruns that erode fixed-fee margin before they land.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={DEMO_URL} className="btn btn-primary">
                  Book a demo
                </a>
                <a href={SIGNUP_URL} className="btn btn-ghost">
                  Start free
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function NumberField({
  label,
  hint,
  value,
  min,
  max,
  step = 1,
  prefix,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-[13px] font-semibold text-ink">{label}</span>
        {hint && <span className="text-[11px] text-muted">{hint}</span>}
      </div>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-muted">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={Number.isFinite(value) ? value : 0}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (!Number.isFinite(n)) return onChange(0);
            onChange(Math.max(min, Math.min(max, n)));
          }}
          className={`input ${prefix ? "pl-7" : ""}`}
        />
      </div>
    </label>
  );
}

function MiniField({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!Number.isFinite(n)) return onChange(0);
          onChange(Math.max(min, Math.min(max, n)));
        }}
        className="w-full rounded-lg border border-line bg-white px-2 py-1.5 text-[13px] tabular-nums text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  display,
  caption,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  caption?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-[13px] font-semibold text-ink">{label}</span>
        <span className="rounded-md bg-accent-lt px-2 py-0.5 font-mono text-[12px] font-semibold text-accent">
          {display}
        </span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-accent"
        aria-label={label}
      />
      {caption && <p className="mt-1.5 text-[11.5px] leading-snug text-muted">{caption}</p>}
    </div>
  );
}

function MetricCard({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  tone: "accent" | "positive" | "warn" | "ink";
}) {
  const valueColor =
    tone === "positive"
      ? "text-positive"
      : tone === "warn"
      ? "text-amber-600"
      : tone === "accent"
      ? "text-accent"
      : "text-ink";
  return (
    <div className="rounded-[18px] border border-line bg-white p-5 shadow-card">
      <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">{label}</div>
      <div className={`mt-2 font-display text-[30px] font-semibold leading-none tracking-[-0.02em] ${valueColor}`}>
        {value}
      </div>
      <div className="mt-1.5 text-[12.5px] text-muted">{sub}</div>
    </div>
  );
}

function Row({
  k,
  v,
  note,
  strong,
}: {
  k: string;
  v: string;
  note?: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div className="min-w-0">
        <div className={`${strong ? "font-semibold text-ink" : "text-ink"}`}>{k}</div>
        {note && <div className="text-[12px] text-muted">{note}</div>}
      </div>
      <div className={`flex-none tabular-nums ${strong ? "font-display text-[17px] font-semibold" : "font-semibold"}`}>
        {v}
      </div>
    </div>
  );
}
