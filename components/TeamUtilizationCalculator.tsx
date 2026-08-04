"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { DEMO_URL, SIGNUP_URL } from "./config";

// ---------------------------------------------------------------------------
// Currency handling (kept consistent with RoiCalculator)
// ---------------------------------------------------------------------------

type Currency = "INR" | "USD";

const CURRENCY: Record<
  Currency,
  { symbol: string; locale: string; defaultRate: number }
> = {
  // Hourly rates, roughly consistent with the day rates used in the ROI
  // calculator (₹25,000/day and $1,200/day over an ~8 hour day).
  INR: { symbol: "₹", locale: "en-IN", defaultRate: 3000 },
  USD: { symbol: "$", locale: "en-US", defaultRate: 150 },
};

// Full grouped number, e.g. ₹1,19,23,200 or $1,400,000
function formatMoney(value: number, cur: Currency): string {
  const { symbol, locale } = CURRENCY[cur];
  const rounded = Math.max(0, Math.round(value));
  return `${symbol}${rounded.toLocaleString(locale)}`;
}

// Short human form: ₹1.2 Cr / ₹8.5 L  |  $1.4M / $140k
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

function formatHours(value: number): string {
  return Math.max(0, Math.round(value)).toLocaleString("en-US");
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
  hoursPerWeek: number;
  workingWeeks: number;
  billRate: number;
  currentUtil: number; // 0..1
  targetUtil: number; // 0..1
};

const DEFAULT: State = {
  currency: "USD",
  people: 12,
  hoursPerWeek: 40,
  workingWeeks: 46, // after typical PTO and public holidays
  billRate: CURRENCY.USD.defaultRate,
  currentUtil: 0.62,
  targetUtil: 0.8,
};

export function TeamUtilizationCalculator() {
  const [s, setS] = useState<State>(DEFAULT);
  const [copied, setCopied] = useState(false);

  function set<K extends keyof State>(key: K, value: State[K]) {
    setS((prev) => ({ ...prev, [key]: value }));
  }

  function switchCurrency(cur: Currency) {
    setS((prev) => ({
      ...prev,
      currency: cur,
      billRate: CURRENCY[cur].defaultRate,
    }));
  }

  // --- The math (first principles, fully transparent) ---
  const m = useMemo(() => {
    const capacityHoursPP = Math.max(0, s.hoursPerWeek * s.workingWeeks);
    const currentBillablePP = capacityHoursPP * s.currentUtil;
    const targetBillablePP = capacityHoursPP * s.targetUtil;
    // Hours needed to reach target (never negative for the "opportunity" framing).
    const gapHoursPP = Math.max(0, targetBillablePP - currentBillablePP);
    const utilDelta = s.currentUtil - s.targetUtil; // +ve means above target

    const totalCapacity = capacityHoursPP * s.people;
    const currentBillable = currentBillablePP * s.people;
    const targetBillable = targetBillablePP * s.people;
    const gapHours = gapHoursPP * s.people;

    const currentRevenue = currentBillable * s.billRate;
    const targetRevenue = targetBillable * s.billRate;
    const revenueUpside = gapHours * s.billRate;

    // FTE-equivalent of the gap: how many full consultants of billable
    // capacity the firm already employs but is not yet billing.
    const gapFte = capacityHoursPP > 0 ? gapHours / capacityHoursPP : 0;

    // Per-person weekly billable hours, an intuitive cross-check.
    const billableHoursPerWeek = s.hoursPerWeek * s.currentUtil;
    const targetHoursPerWeek = s.hoursPerWeek * s.targetUtil;

    const atOrAboveTarget = s.currentUtil >= s.targetUtil;

    return {
      capacityHoursPP,
      currentBillablePP,
      targetBillablePP,
      gapHoursPP,
      utilDelta,
      totalCapacity,
      currentBillable,
      targetBillable,
      gapHours,
      currentRevenue,
      targetRevenue,
      revenueUpside,
      gapFte,
      billableHoursPerWeek,
      targetHoursPerWeek,
      atOrAboveTarget,
    };
  }, [s]);

  const currentPct = Math.round(s.currentUtil * 100);
  const targetPct = Math.round(s.targetUtil * 100);
  const animatedUtil = useCountUp(currentPct);

  async function copySummary() {
    const cur = s.currency;
    const lines = [
      `PYNGYN team utilization estimate`,
      `Team: ${s.people} billable people, ${s.hoursPerWeek} hrs/week, ${s.workingWeeks} working weeks/year`,
      `Average billable rate: ${formatMoney(s.billRate, cur)}/hour`,
      ``,
      `Current utilization: ${currentPct}%  |  Target: ${targetPct}%`,
      `Current billable revenue: ${formatMoney(m.currentRevenue, cur)}/year`,
      `Revenue at target: ${formatMoney(m.targetRevenue, cur)}/year`,
      m.atOrAboveTarget
        ? `You are at or above target. No utilization gap to close.`
        : `Upside of reaching target: ${formatMoney(m.revenueUpside, cur)}/year (${formatShort(
            m.revenueUpside,
            cur
          )})`,
      m.atOrAboveTarget
        ? ``
        : `That gap is about ${formatHours(m.gapHours)} billable hours, or roughly ${m.gapFte.toFixed(
            1
          )} consultants of capacity you already employ.`,
      ``,
      `Estimate from PYNGYN's free calculator. Numbers are illustrative; book a demo to model your firm.`,
    ];
    try {
      await navigator.clipboard.writeText(lines.filter((l) => l !== undefined).join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable, ignore */
    }
  }

  const cur = s.currency;

  // Bar fill is capped at 100% for display; target marker is positioned the same way.
  const fillPct = Math.min(100, Math.max(0, currentPct));
  const markerPct = Math.min(100, Math.max(0, targetPct));

  return (
    <div className="wrap pb-[80px]">
      <div className="grid gap-7 lg:grid-cols-[420px_1fr]">
        {/* ---------------- Inputs ---------------- */}
        <aside className="lg:sticky lg:top-[88px] lg:self-start">
          <div className="rounded-[20px] border border-line bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Your bench
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
              How busy is your billable team?
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
                label="Hours per week"
                hint="Standard working week"
                value={s.hoursPerWeek}
                min={1}
                max={80}
                onChange={(v) => set("hoursPerWeek", v)}
              />

              <NumberField
                label="Working weeks / year"
                hint="After PTO and holidays, often 46 to 48"
                value={s.workingWeeks}
                min={1}
                max={52}
                onChange={(v) => set("workingWeeks", v)}
              />

              <NumberField
                label="Average billable rate"
                hint={`What you bill per hour (${CURRENCY[cur].symbol})`}
                value={s.billRate}
                min={0}
                max={cur === "INR" ? 100000 : 2000}
                step={cur === "INR" ? 100 : 5}
                prefix={CURRENCY[cur].symbol}
                onChange={(v) => set("billRate", v)}
              />

              <SliderField
                label="Current utilization"
                value={s.currentUtil}
                min={0.2}
                max={1}
                step={0.01}
                display={`${currentPct}%`}
                caption="Share of capacity currently billed to clients."
                onChange={(v) => set("currentUtil", v)}
              />

              <SliderField
                label="Target utilization"
                value={s.targetUtil}
                min={0.4}
                max={1}
                step={0.01}
                display={`${targetPct}%`}
                caption="A healthy goal for your bench. 70 to 80% is common."
                onChange={(v) => set("targetUtil", v)}
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
          {/* Headline: current utilization */}
          <div className="relative overflow-hidden rounded-[22px] border border-line bg-ink p-7 text-white shadow-card lg:p-9">
            <div
              className="glow-radial pointer-events-none absolute inset-0 opacity-[0.6]"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
                Your current billable utilization
              </div>
              <div className="mt-3 flex items-end gap-3">
                <span className="font-display text-[clamp(40px,7vw,68px)] font-semibold leading-none tracking-[-0.03em]">
                  {Math.round(animatedUtil)}%
                </span>
                <span
                  className={`mb-2 rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                    m.atOrAboveTarget
                      ? "bg-emerald-400/15 text-emerald-300"
                      : "bg-white/10 text-white/70"
                  }`}
                >
                  {m.atOrAboveTarget
                    ? `At or above your ${targetPct}% target`
                    : `${targetPct - currentPct} pts below your ${targetPct}% target`}
                </span>
              </div>
              <div className="mt-2 text-[15px] text-white/65">
                Across {s.people} {s.people === 1 ? "person" : "people"}, that is{" "}
                <span className="font-semibold text-white">{formatHours(m.currentBillable)}</span>{" "}
                billable hours a year, worth{" "}
                <span className="font-semibold text-white">
                  {formatShort(m.currentRevenue, cur)}
                </span>
                .
              </div>

              {/* Utilization bar with target marker */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-[12px] text-white/55">
                  <span>Capacity billed vs target</span>
                  <span>Target {targetPct}%</span>
                </div>
                <div className="relative mt-2 h-3.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className={`h-full ${m.atOrAboveTarget ? "bg-emerald-400" : "bg-white/85"}`}
                    animate={{ width: `${fillPct}%` }}
                    transition={{ duration: 0.5, ease: [0.21, 0.6, 0.35, 1] }}
                  />
                  {/* Target marker */}
                  <div
                    className="absolute top-[-3px] bottom-[-3px] w-[2px] bg-accent"
                    style={{ left: `calc(${markerPct}% - 1px)` }}
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px]">
                  <span className="inline-flex items-center gap-1.5 text-white/70">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        m.atOrAboveTarget ? "bg-emerald-400" : "bg-white/85"
                      }`}
                    />{" "}
                    Currently billed ({currentPct}%)
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-white/70">
                    <span className="h-2 w-2 rounded-full bg-accent" /> Target ({targetPct}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Upside of hitting target */}
          <div className="rounded-[22px] border border-accent/20 bg-accent-lt p-7 shadow-card">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              {m.atOrAboveTarget ? "You are at target" : "Upside of reaching your target"}
            </div>
            {m.atOrAboveTarget ? (
              <p className="mt-3 max-w-[560px] text-[15px] leading-relaxed text-ink">
                Your current utilization is at or above the target you set, so there is no billable
                gap to close on these inputs. The opportunity now is protecting that level without
                burning the team out. Lower the target, or raise current utilization, to model a
                stretch goal.
              </p>
            ) : (
              <div className="mt-3 grid gap-5 sm:grid-cols-2">
                <div>
                  <div className="font-display text-[clamp(30px,4.5vw,42px)] font-semibold leading-none tracking-[-0.02em] text-ink">
                    {formatMoney(m.revenueUpside, cur)}
                  </div>
                  <div className="mt-1.5 text-[14px] text-muted">
                    in extra billable revenue per year at {targetPct}% utilization
                  </div>
                </div>
                <div className="sm:border-l sm:border-accent/20 sm:pl-5">
                  <div className="font-display text-[clamp(30px,4.5vw,42px)] font-semibold leading-none tracking-[-0.02em] text-ink">
                    {m.gapFte.toFixed(1)} {m.gapFte === 1 ? "consultant" : "consultants"}
                  </div>
                  <div className="mt-1.5 text-[14px] text-muted">
                    of billable capacity you already employ but are not yet billing
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Metric cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard
              label="Current billable revenue"
              value={formatShort(m.currentRevenue, cur)}
              sub={`${formatHours(m.currentBillable)} hrs/yr`}
              tone="ink"
            />
            <MetricCard
              label="Revenue at target"
              value={formatShort(m.targetRevenue, cur)}
              sub={`${formatHours(m.targetBillable)} hrs/yr`}
              tone="accent"
            />
            <MetricCard
              label={m.atOrAboveTarget ? "Gap to target" : "Billable hours to find"}
              value={m.atOrAboveTarget ? "0 hrs" : `${formatHours(m.gapHours)} hrs`}
              sub={m.atOrAboveTarget ? "already there" : `${m.gapFte.toFixed(1)} FTE equivalent`}
              tone={m.atOrAboveTarget ? "positive" : "warn"}
            />
          </div>

          {/* Breakdown */}
          <div className="rounded-[22px] border border-line bg-white p-6 shadow-card">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              How the numbers add up
            </div>
            <dl className="mt-4 divide-y divide-line text-[14px]">
              <Row
                k="Capacity per person"
                v={`${formatHours(m.capacityHoursPP)} hrs/yr`}
                note={`${s.hoursPerWeek} hrs/week × ${s.workingWeeks} weeks`}
              />
              <Row
                k="Billable per person, now"
                v={`${formatHours(m.currentBillablePP)} hrs/yr`}
                note={`${m.billableHoursPerWeek.toFixed(1)} hrs/week × ${currentPct}% util`}
              />
              <Row
                k="Firm-wide billable, now"
                v={`${formatHours(m.currentBillable)} hrs/yr`}
                note={`× ${s.people} people`}
              />
              <Row
                k="Current billable revenue"
                v={formatMoney(m.currentRevenue, cur)}
                note={`× ${formatMoney(s.billRate, cur)}/hour`}
                strong
              />
              <Row
                k="Firm-wide billable at target"
                v={`${formatHours(m.targetBillable)} hrs/yr`}
                note={`at ${targetPct}% utilization`}
              />
              <Row k="Revenue at target" v={formatMoney(m.targetRevenue, cur)} />
              <Row
                k={m.atOrAboveTarget ? "Revenue upside (at target)" : "Revenue upside at target"}
                v={formatMoney(m.revenueUpside, cur)}
                note={m.atOrAboveTarget ? "already at or above target" : `${formatHours(m.gapHours)} hrs to find`}
                strong
              />
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
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
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
                Estimates only. Utilization and target are yours to adjust.
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="overflow-hidden rounded-[22px] border border-line bg-gradient-to-br from-accent-lt via-white to-canvas p-7 lg:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  Turn idle capacity into billed work
                </div>
                <h3 className="mt-2 font-display text-[26px] font-semibold tracking-[-0.02em] lg:text-[30px]">
                  See where your team&apos;s hours actually go.
                </h3>
                <p className="mt-2 max-w-[540px] text-[15px] text-muted">
                  In a 30-minute demo we run PYNGYN on a team like yours and show how live status and
                  capacity views surface the bench time that quietly goes unbilled.
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
// Sub-components (same vocabulary as RoiCalculator)
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
      <div
        className={`mt-2 font-display text-[30px] font-semibold leading-none tracking-[-0.02em] ${valueColor}`}
      >
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
      <div
        className={`flex-none tabular-nums ${
          strong ? "font-display text-[17px] font-semibold" : "font-semibold"
        }`}
      >
        {v}
      </div>
    </div>
  );
}
