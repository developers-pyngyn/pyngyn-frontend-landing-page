"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { DEMO_URL, SIGNUP_URL } from "./config";

// ---------------------------------------------------------------------------
// Currency handling
// ---------------------------------------------------------------------------

type Currency = "INR" | "USD";

const CURRENCY: Record<
  Currency,
  { symbol: string; locale: string; defaultDayRate: number; defaultSeat: number }
> = {
  INR: { symbol: "₹", locale: "en-IN", defaultDayRate: 25000, defaultSeat: 1600 },
  USD: { symbol: "$", locale: "en-US", defaultDayRate: 1200, defaultSeat: 19 },
};

// Full grouped number, e.g. ₹1,70,00,000 or $1,400,000
function formatMoney(value: number, cur: Currency): string {
  const { symbol, locale } = CURRENCY[cur];
  const rounded = Math.max(0, Math.round(value));
  return `${symbol}${rounded.toLocaleString(locale)}`;
}

// Short human form: ₹1.7 Cr / ₹8.5 L  |  $1.4M / $140k
function formatShort(value: number, cur: Currency): string {
  const { symbol } = CURRENCY[cur];
  const v = Math.max(0, value);
  if (cur === "INR") {
    if (v >= 1e7) return `${symbol}${(v / 1e7).toFixed(v / 1e7 >= 10 ? 0 : 1)} Cr`;
    if (v >= 1e5) return `${symbol}${(v / 1e5).toFixed(v / 1e5 >= 10 ? 0 : 1)} L`;
    return `${symbol}${Math.round(v).toLocaleString("en-IN")}`;
  }
  if (v >= 1e6) return `${symbol}${(v / 1e6).toFixed(v / 1e6 >= 10 ? 0 : 1)}M`;
  if (v >= 1e3) return `${symbol}${Math.round(v / 1e3)}k`;
  return `${symbol}${Math.round(v).toLocaleString("en-US")}`;
}

// ---------------------------------------------------------------------------
// Animated count-up for the headline figure
// ---------------------------------------------------------------------------

function useCountUp(target: number, duration = 700) {
  const [display, setDisplay] = useState(target);
  const displayRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  // Keep a live ref of what's on screen so a new animation starts from there.
  useEffect(() => {
    displayRef.current = display;
  }, [display]);

  useEffect(() => {
    const from = displayRef.current;
    const start = performance.now();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
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
// Component
// ---------------------------------------------------------------------------

type State = {
  currency: Currency;
  people: number;
  dayRate: number;
  billableDays: number;
  lostPct: number; // 0..1
  recoveryPct: number; // 0..1
  seatPerMonth: number;
};

const DEFAULT: State = {
  currency: "USD",
  people: 20,
  dayRate: CURRENCY.USD.defaultDayRate,
  billableDays: 220,
  lostPct: 0.35,
  recoveryPct: 0.5,
  seatPerMonth: CURRENCY.USD.defaultSeat,
};

export function RoiCalculator() {
  const [s, setS] = useState<State>(DEFAULT);
  const [copied, setCopied] = useState(false);

  function set<K extends keyof State>(key: K, value: State[K]) {
    setS((prev) => ({ ...prev, [key]: value }));
  }

  function switchCurrency(cur: Currency) {
    setS((prev) => ({
      ...prev,
      currency: cur,
      dayRate: CURRENCY[cur].defaultDayRate,
      seatPerMonth: CURRENCY[cur].defaultSeat,
    }));
  }

  // --- The math (first principles, fully transparent) ---
  const m = useMemo(() => {
    const annualBillingPerPerson = s.dayRate * s.billableDays;
    const lostPerPerson = annualBillingPerPerson * s.lostPct;
    const totalChaos = lostPerPerson * s.people;
    const recoverable = totalChaos * s.recoveryPct;
    const annualToolCost = s.people * s.seatPerMonth * 12;
    const netGain = recoverable - annualToolCost;
    const roiMultiple = annualToolCost > 0 ? recoverable / annualToolCost : 0;
    const paybackMonths = recoverable > 0 ? (annualToolCost / recoverable) * 12 : 0;
    const daysBackPerPerson = s.billableDays * s.lostPct * s.recoveryPct;
    return {
      annualBillingPerPerson,
      lostPerPerson,
      totalChaos,
      recoverable,
      annualToolCost,
      netGain,
      roiMultiple,
      paybackMonths,
      daysBackPerPerson,
    };
  }, [s]);

  const animatedChaos = useCountUp(m.totalChaos);

  const lostBarPct = Math.round(s.lostPct * 100);

  async function copySummary() {
    const cur = s.currency;
    const lines = [
      `PYNGYN cost-of-chaos estimate`,
      `Firm: ${s.people} billable people at ${formatMoney(s.dayRate, cur)}/day, ${s.billableDays} billable days/year`,
      `Time lost to coordination: ${Math.round(s.lostPct * 100)}%`,
      ``,
      `Cost of chaos: ${formatMoney(m.totalChaos, cur)}/year (${formatShort(m.totalChaos, cur)})`,
      `Recoverable at ${Math.round(s.recoveryPct * 100)}% win-back: ${formatMoney(m.recoverable, cur)}/year`,
      `That is about ${m.daysBackPerPerson.toFixed(0)} billable days back, per person, per year`,
      `Tool cost: ${formatMoney(m.annualToolCost, cur)}/year`,
      `Net annual gain: ${formatMoney(m.netGain, cur)}  |  ROI: ${m.roiMultiple.toFixed(1)}x  |  Payback: ${m.paybackMonths.toFixed(1)} months`,
      ``,
      `Estimate from PYNGYN's free calculator. Numbers are illustrative; book a demo to model your firm.`,
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable, ignore */
    }
  }

  const cur = s.currency;

  return (
    <div className="wrap pb-[80px]">
      <div className="grid gap-7 lg:grid-cols-[420px_1fr]">
        {/* ---------------- Inputs ---------------- */}
        <aside className="lg:sticky lg:top-[88px] lg:self-start">
          <div className="rounded-[20px] border border-line bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Your firm
              </div>
              {/* Currency toggle */}
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
                    {CURRENCY[c].symbol} {c}
                  </button>
                ))}
              </div>
            </div>

            <h2 className="mt-3 font-display text-[24px] font-semibold tracking-[-0.02em]">
              What is the chaos costing you?
            </h2>

            <div className="mt-5 space-y-5">
              <NumberField
                label="Billable people"
                hint="Consultants who bill"
                value={s.people}
                min={1}
                max={2000}
                onChange={(v) => set("people", v)}
              />

              <NumberField
                label="Average day rate"
                hint={`What you bill per person/day (${CURRENCY[cur].symbol})`}
                value={s.dayRate}
                min={0}
                max={cur === "INR" ? 500000 : 10000}
                step={cur === "INR" ? 500 : 25}
                prefix={CURRENCY[cur].symbol}
                onChange={(v) => set("dayRate", v)}
              />

              <NumberField
                label="Billable days / year"
                hint="Typical is around 220"
                value={s.billableDays}
                min={1}
                max={300}
                onChange={(v) => set("billableDays", v)}
              />

              <SliderField
                label="Time lost to coordination"
                value={s.lostPct}
                min={0.05}
                max={0.5}
                step={0.01}
                display={`${Math.round(s.lostPct * 100)}%`}
                caption="Status-chasing, tool-switching, hunting for context."
                onChange={(v) => set("lostPct", v)}
              />

              <SliderField
                label="Time you could win back"
                value={s.recoveryPct}
                min={0.2}
                max={0.8}
                step={0.05}
                display={`${Math.round(s.recoveryPct * 100)}%`}
                caption="A conservative share of lost time PYNGYN helps recover."
                onChange={(v) => set("recoveryPct", v)}
              />

              <NumberField
                label="Tool cost / person / month"
                hint="Editable, defaults to PYNGYN Pro"
                value={s.seatPerMonth}
                min={0}
                max={cur === "INR" ? 100000 : 1000}
                step={cur === "INR" ? 50 : 1}
                prefix={CURRENCY[cur].symbol}
                onChange={(v) => set("seatPerMonth", v)}
              />
            </div>

            <button
              type="button"
              onClick={() => setS(DEFAULT)}
              className="mt-6 w-full rounded-full border border-line bg-white py-2.5 text-[13px] font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
            >
              Reset to defaults
            </button>
          </div>
        </aside>

        {/* ---------------- Results ---------------- */}
        <section className="space-y-4">
          {/* Headline: cost of chaos */}
          <div className="relative overflow-hidden rounded-[22px] border border-line bg-ink p-7 text-white shadow-card lg:p-9">
            <div
              className="glow-radial pointer-events-none absolute inset-0 opacity-[0.6]"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
                Your cost of chaos, per year
              </div>
              <div className="mt-3 font-display text-[clamp(40px,7vw,68px)] font-semibold leading-none tracking-[-0.03em]">
                {formatMoney(animatedChaos, cur)}
              </div>
              <div className="mt-2 text-[15px] text-white/65">
                That is <span className="font-semibold text-white">{formatShort(m.totalChaos, cur)}</span> in
                unbilled hours across {s.people} {s.people === 1 ? "person" : "people"}, or about{" "}
                <span className="font-semibold text-white">{formatMoney(m.lostPerPerson, cur)}</span> per person.
              </div>

              {/* Billable vs lost bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-[12px] text-white/55">
                  <span>Where the billable year goes</span>
                  <span>{s.billableDays} days</span>
                </div>
                <div className="mt-2 flex h-3.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full bg-white/85"
                    animate={{ width: `${100 - lostBarPct}%` }}
                    transition={{ duration: 0.5, ease: [0.21, 0.6, 0.35, 1] }}
                  />
                  <motion.div
                    className="h-full bg-accent"
                    animate={{ width: `${lostBarPct}%` }}
                    transition={{ duration: 0.5, ease: [0.21, 0.6, 0.35, 1] }}
                  />
                </div>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px]">
                  <span className="inline-flex items-center gap-1.5 text-white/70">
                    <span className="h-2 w-2 rounded-full bg-white/85" /> Billable
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-white/70">
                    <span className="h-2 w-2 rounded-full bg-accent" /> Lost to chaos ({lostBarPct}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recoverable + headline outcomes */}
          <div className="rounded-[22px] border border-accent/20 bg-accent-lt p-7 shadow-card">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              What PYNGYN could win back
            </div>
            <div className="mt-3 grid gap-5 sm:grid-cols-2">
              <div>
                <div className="font-display text-[clamp(30px,4.5vw,42px)] font-semibold leading-none tracking-[-0.02em] text-ink">
                  {formatMoney(m.recoverable, cur)}
                </div>
                <div className="mt-1.5 text-[14px] text-muted">
                  recovered per year at {Math.round(s.recoveryPct * 100)}% win-back
                </div>
              </div>
              <div className="sm:border-l sm:border-accent/20 sm:pl-5">
                <div className="font-display text-[clamp(30px,4.5vw,42px)] font-semibold leading-none tracking-[-0.02em] text-ink">
                  {m.daysBackPerPerson.toFixed(0)} days
                </div>
                <div className="mt-1.5 text-[14px] text-muted">
                  of billable time back, per person, per year
                </div>
              </div>
            </div>
          </div>

          {/* ROI metric cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard
              label="Net annual gain"
              value={formatShort(m.netGain, cur)}
              sub={`after ${formatShort(m.annualToolCost, cur)} tool cost`}
              tone={m.netGain >= 0 ? "positive" : "warn"}
            />
            <MetricCard
              label="Return on investment"
              value={`${m.roiMultiple.toFixed(1)}x`}
              sub="recovered vs spent"
              tone="accent"
            />
            <MetricCard
              label="Payback period"
              value={
                m.paybackMonths <= 0 || m.paybackMonths >= 60
                  ? "N/A"
                  : m.paybackMonths < 1
                  ? "< 1 mo"
                  : `${m.paybackMonths.toFixed(1)} mo`
              }
              sub="time to break even"
              tone="ink"
            />
          </div>

          {/* Breakdown */}
          <div className="rounded-[22px] border border-line bg-white p-6 shadow-card">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              How the numbers add up
            </div>
            <dl className="mt-4 divide-y divide-line text-[14px]">
              <Row k="Annual billing per person" v={`${formatMoney(m.annualBillingPerPerson, cur)}`} note={`${formatMoney(s.dayRate, cur)}/day × ${s.billableDays} days`} />
              <Row k="Lost per person (chaos)" v={`${formatMoney(m.lostPerPerson, cur)}`} note={`× ${Math.round(s.lostPct * 100)}% time lost`} />
              <Row k="Firm-wide cost of chaos" v={`${formatMoney(m.totalChaos, cur)}`} note={`× ${s.people} people`} strong />
              <Row k="Recoverable per year" v={`${formatMoney(m.recoverable, cur)}`} note={`× ${Math.round(s.recoveryPct * 100)}% win-back`} />
              <Row k="Annual tool cost" v={`${formatMoney(m.annualToolCost, cur)}`} note={`${formatMoney(s.seatPerMonth, cur)}/seat/mo × ${s.people} × 12`} />
              <Row k="Net annual gain" v={`${formatMoney(m.netGain, cur)}`} strong />
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
              <span className="text-[12px] text-muted">
                Estimates only. Inputs and win-back rate are yours to adjust.
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="overflow-hidden rounded-[22px] border border-line bg-gradient-to-br from-accent-lt via-white to-canvas p-7 lg:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  Turn lost hours into billable ones
                </div>
                <h3 className="mt-2 font-display text-[26px] font-semibold tracking-[-0.02em] lg:text-[30px]">
                  See where your firm&apos;s time actually goes.
                </h3>
                <p className="mt-2 max-w-[540px] text-[15px] text-muted">
                  In a 30-minute demo we run PYNGYN on a project like yours and show how status,
                  context, and updates stop eating your billable day.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={DEMO_URL} className="btn btn-primary">Book a demo</a>
                <a href={SIGNUP_URL} className="btn btn-ghost">Start free</a>
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
