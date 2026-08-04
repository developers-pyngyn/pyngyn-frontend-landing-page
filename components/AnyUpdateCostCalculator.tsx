"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { DEMO_URL, SIGNUP_URL } from "./config";

// ---------------------------------------------------------------------------
// Currency handling. Tool cost defaults to Clientspace's real per-client
// price, unlike the ROI Calculator (which defaults to Workspace's per-seat
// price) — this tool is priced the way Clientspace is actually sold.
// ---------------------------------------------------------------------------

type Currency = "INR" | "USD";

const CURRENCY: Record<
  Currency,
  { symbol: string; locale: string; defaultRate: number; defaultClientspacePrice: number }
> = {
  INR: { symbol: "₹", locale: "en-IN", defaultRate: 3000, defaultClientspacePrice: 1580 },
  USD: { symbol: "$", locale: "en-US", defaultRate: 150, defaultClientspacePrice: 19 },
};

function formatMoney(value: number, cur: Currency): string {
  const { symbol, locale } = CURRENCY[cur];
  const rounded = Math.max(0, Math.round(value));
  return `${symbol}${rounded.toLocaleString(locale)}`;
}

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
// Animated count-up
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
// Component
// ---------------------------------------------------------------------------

type State = {
  currency: Currency;
  clients: number;
  touchesPerWeek: number; // "any update?" emails/calls per client, per week
  minutesPerTouch: number;
  hourlyRate: number;
  recoveryPct: number; // 0..1, share eliminated once clients can self-serve
  clientspacePrice: number; // per client / month
};

const WEEKS_PER_YEAR = 48; // accounts for holidays and slow weeks

const DEFAULT: State = {
  currency: "USD",
  clients: 25,
  touchesPerWeek: 1.5,
  minutesPerTouch: 12,
  hourlyRate: CURRENCY.USD.defaultRate,
  recoveryPct: 0.7,
  clientspacePrice: CURRENCY.USD.defaultClientspacePrice,
};

export function AnyUpdateCostCalculator() {
  const [s, setS] = useState<State>(DEFAULT);
  const [copied, setCopied] = useState(false);

  function set<K extends keyof State>(key: K, value: State[K]) {
    setS((prev) => ({ ...prev, [key]: value }));
  }

  function switchCurrency(cur: Currency) {
    setS((prev) => ({
      ...prev,
      currency: cur,
      hourlyRate: CURRENCY[cur].defaultRate,
      clientspacePrice: CURRENCY[cur].defaultClientspacePrice,
    }));
  }

  const m = useMemo(() => {
    const weeklyTouches = s.clients * s.touchesPerWeek;
    const weeklyMinutes = weeklyTouches * s.minutesPerTouch;
    const weeklyHours = weeklyMinutes / 60;
    const annualHours = weeklyHours * WEEKS_PER_YEAR;
    const annualCost = annualHours * s.hourlyRate;
    const recoverableCost = annualCost * s.recoveryPct;
    const recoverableHours = annualHours * s.recoveryPct;
    const annualClientspaceCost = s.clients * s.clientspacePrice * 12;
    const netGain = recoverableCost - annualClientspaceCost;
    const roiMultiple = annualClientspaceCost > 0 ? recoverableCost / annualClientspaceCost : 0;
    const paybackMonths = recoverableCost > 0 ? (annualClientspaceCost / recoverableCost) * 12 : 0;
    return {
      weeklyTouches,
      annualHours,
      annualCost,
      recoverableCost,
      recoverableHours,
      annualClientspaceCost,
      netGain,
      roiMultiple,
      paybackMonths,
    };
  }, [s]);

  const animatedCost = useCountUp(m.annualCost);
  const cur = s.currency;

  async function copySummary() {
    const lines = [
      `PYNGYN "any update?" cost estimate`,
      `${s.clients} active clients, ~${s.touchesPerWeek} status touches/week each, ${s.minutesPerTouch} min per touch`,
      ``,
      `Annual cost of status-chasing: ${formatMoney(m.annualCost, cur)}/year (${formatShort(m.annualCost, cur)})`,
      `Recoverable with Clientspace at ${Math.round(s.recoveryPct * 100)}% self-serve: ${formatMoney(m.recoverableCost, cur)}/year`,
      `That's about ${m.recoverableHours.toFixed(0)} hours back per year`,
      `Clientspace cost at ${formatMoney(s.clientspacePrice, cur)}/client/month: ${formatMoney(m.annualClientspaceCost, cur)}/year`,
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

  return (
    <div className="wrap pb-[80px]">
      <div className="grid gap-7 lg:grid-cols-[420px_1fr]">
        {/* ---------------- Inputs ---------------- */}
        <aside className="lg:sticky lg:top-[88px] lg:self-start">
          <div className="rounded-[20px] border border-line bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Your clients
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
                    {CURRENCY[c].symbol} {c}
                  </button>
                ))}
              </div>
            </div>

            <h2 className="mt-3 font-display text-[24px] font-semibold tracking-[-0.02em]">
              What is &ldquo;any update?&rdquo; costing you?
            </h2>

            <div className="mt-5 space-y-5">
              <NumberField
                label="Active clients"
                hint="Clients you're delivering work for right now"
                value={s.clients}
                min={1}
                max={500}
                onChange={(v) => set("clients", v)}
              />

              <SliderField
                label="Status touches / client / week"
                value={s.touchesPerWeek}
                min={0.5}
                max={5}
                step={0.5}
                display={`${s.touchesPerWeek}`}
                caption="Emails, calls, or Slack pings asking where things stand."
                onChange={(v) => set("touchesPerWeek", v)}
              />

              <NumberField
                label="Minutes per touch"
                hint="To stop, check status, and reply properly"
                value={s.minutesPerTouch}
                min={1}
                max={60}
                onChange={(v) => set("minutesPerTouch", v)}
              />

              <NumberField
                label="Billable rate / hour"
                hint={`What that time is worth (${CURRENCY[cur].symbol})`}
                value={s.hourlyRate}
                min={0}
                max={cur === "INR" ? 50000 : 1000}
                step={cur === "INR" ? 100 : 5}
                prefix={CURRENCY[cur].symbol}
                onChange={(v) => set("hourlyRate", v)}
              />

              <SliderField
                label="Eliminated once clients self-serve"
                value={s.recoveryPct}
                min={0.4}
                max={0.95}
                step={0.05}
                display={`${Math.round(s.recoveryPct * 100)}%`}
                caption="Clients checking their own Clientspace instead of asking you."
                onChange={(v) => set("recoveryPct", v)}
              />

              <NumberField
                label="Clientspace / client / month"
                hint="Editable, defaults to the real price"
                value={s.clientspacePrice}
                min={0}
                max={cur === "INR" ? 10000 : 200}
                step={cur === "INR" ? 50 : 1}
                prefix={CURRENCY[cur].symbol}
                onChange={(v) => set("clientspacePrice", v)}
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
          <div className="relative overflow-hidden rounded-[22px] border border-line bg-ink p-7 text-white shadow-card lg:p-9">
            <div
              className="glow-radial pointer-events-none absolute inset-0 opacity-[0.6]"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
                Cost of &ldquo;any update?&rdquo;, per year
              </div>
              <div className="mt-3 font-display text-[clamp(40px,7vw,68px)] font-semibold leading-none tracking-[-0.03em]">
                {formatMoney(animatedCost, cur)}
              </div>
              <div className="mt-2 text-[15px] text-white/65">
                That&apos;s <span className="font-semibold text-white">{m.annualHours.toFixed(0)} hours</span> a
                year spent answering status requests across {s.clients} clients, roughly{" "}
                <span className="font-semibold text-white">{m.weeklyTouches.toFixed(0)}</span> touches every week.
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-accent/20 bg-accent-lt p-7 shadow-card">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              What Clientspace could win back
            </div>
            <div className="mt-3 grid gap-5 sm:grid-cols-2">
              <div>
                <div className="font-display text-[clamp(30px,4.5vw,42px)] font-semibold leading-none tracking-[-0.02em] text-ink">
                  {formatMoney(m.recoverableCost, cur)}
                </div>
                <div className="mt-1.5 text-[14px] text-muted">
                  recovered per year at {Math.round(s.recoveryPct * 100)}% self-serve
                </div>
              </div>
              <div className="sm:border-l sm:border-accent/20 sm:pl-5">
                <div className="font-display text-[clamp(30px,4.5vw,42px)] font-semibold leading-none tracking-[-0.02em] text-ink">
                  {m.recoverableHours.toFixed(0)} hrs
                </div>
                <div className="mt-1.5 text-[14px] text-muted">
                  of billable time back, per year
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard
              label="Net annual gain"
              value={formatShort(m.netGain, cur)}
              sub={`after ${formatShort(m.annualClientspaceCost, cur)} Clientspace cost`}
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

          <div className="rounded-[22px] border border-line bg-white p-6 shadow-card">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              How the numbers add up
            </div>
            <dl className="mt-4 divide-y divide-line text-[14px]">
              <Row k="Status touches / week" v={m.weeklyTouches.toFixed(1)} note={`${s.clients} clients × ${s.touchesPerWeek}/week each`} />
              <Row k="Hours lost / year" v={`${m.annualHours.toFixed(0)} hrs`} note={`× ${s.minutesPerTouch} min/touch × ${WEEKS_PER_YEAR} weeks`} />
              <Row k="Cost of chasing" v={formatMoney(m.annualCost, cur)} note={`× ${formatMoney(s.hourlyRate, cur)}/hour`} strong />
              <Row k="Recoverable per year" v={formatMoney(m.recoverableCost, cur)} note={`× ${Math.round(s.recoveryPct * 100)}% self-serve`} />
              <Row k="Clientspace cost / year" v={formatMoney(m.annualClientspaceCost, cur)} note={`${formatMoney(s.clientspacePrice, cur)}/client/mo × ${s.clients} × 12`} />
              <Row k="Net annual gain" v={formatMoney(m.netGain, cur)} strong />
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
                Estimates only. Every input, including the self-serve rate, is yours to adjust.
              </span>
            </div>
          </div>

          <div className="overflow-hidden rounded-[22px] border border-line bg-gradient-to-br from-accent-lt via-white to-canvas p-7 lg:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  Give clients somewhere else to look
                </div>
                <h3 className="mt-2 font-display text-[26px] font-semibold tracking-[-0.02em] lg:text-[30px]">
                  Clientspace answers &ldquo;any update?&rdquo; before it's asked.
                </h3>
                <p className="mt-2 max-w-[540px] text-[15px] text-muted">
                  A branded portal per client, standalone at {formatMoney(CURRENCY[cur].defaultClientspacePrice, cur)}/month,
                  no Workspace purchase required. Status, documents, and approvals, always current.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={SIGNUP_URL} className="btn btn-primary">Start free trial</a>
                <a href={DEMO_URL} className="btn btn-ghost">Book a demo</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components (shared visual language with RoiCalculator)
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
