"use client";

import { useEffect, useMemo, useState } from "react";

// ---------------------------------------------------------------------------
// Native, self-contained demo booking widget.
//
// Layout mirrors modern scheduler UIs (Cal.com / Lunaca / Calendly): a month
// grid calendar on the left, a scrollable column of time slots on the right,
// then an inline details form, then a confirmation state. No third-party
// iframe, no external script, no <a> jumping off-site. Submission posts to
// /api/demo which logs/forwards the request server-side.
// ---------------------------------------------------------------------------

const STEPS = ["Date", "Time", "Details", "Confirm"] as const;
type Step = (typeof STEPS)[number];

const SLOTS = [
  "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
] as const;

const TEAM_SIZES = ["1–10", "11–50", "51–200", "201–1000", "1000+"] as const;
const FOCUS_AREAS = [
  "Partner / Director",
  "Manager",
  "Associate / IC",
  "Operations",
  "Other",
] as const;

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SESSION = {
  name: "Live strategy walkthrough",
  duration: "30 min",
  format: "Google Meet",
};

// ----- Date helpers --------------------------------------------------------

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isPast(d: Date, today: Date): boolean {
  // Compare midnight-of-day, so "today" itself is bookable but yesterday isn't.
  const a = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const b = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return a.getTime() < b.getTime();
}

function isWeekend(d: Date): boolean {
  const day = d.getDay();
  return day === 0 || day === 6;
}

// Build a 6-row × 7-col grid covering the visible month, including
// leading/trailing days from neighbouring months so the layout is stable.
function buildMonthGrid(month: Date): Date[] {
  const first = startOfMonth(month);
  const startWeekday = first.getDay(); // 0 = Sun
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - startWeekday);
  const out: Date[] = [];
  for (let i = 0; i < 42; i++) {
    out.push(
      new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i),
    );
  }
  return out;
}

function formatMonthYear(d: Date): string {
  return d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

function formatLongDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

type Details = {
  name: string;
  email: string;
  company: string;
  teamSize: (typeof TEAM_SIZES)[number] | "";
  focus: (typeof FOCUS_AREAS)[number] | "";
  notes: string;
};

const EMPTY_DETAILS: Details = {
  name: "",
  email: "",
  company: "",
  teamSize: "",
  focus: "",
  notes: "",
};

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

// ---------------------------------------------------------------------------
// Main widget
// ---------------------------------------------------------------------------

export function DemoBooking() {
  // Render-stable "today" — captured once on mount so SSR/CSR match.
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => {
    setToday(new Date());
  }, []);

  const [month, setMonth] = useState<Date>(() => startOfMonth(new Date()));
  const [step, setStep] = useState<Step>("Date");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [details, setDetails] = useState<Details>(EMPTY_DETAILS);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tz = useMemo(getTimezone, []);
  const days = useMemo(() => buildMonthGrid(month), [month]);

  const canContinueDetails =
    details.name.trim().length > 1 &&
    isEmail(details.email) &&
    details.company.trim().length > 0;

  function selectDate(d: Date) {
    setDate(d);
    setTime(null);
    setStep("Time");
  }

  function selectTime(t: string) {
    setTime(t);
    setStep("Details");
  }

  async function handleSubmit() {
    if (!date || !time || !canContinueDetails) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: date.toISOString().slice(0, 10),
          time,
          timezone: tz,
          ...details,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Could not save your booking.");
      }
      setSubmitted(true);
      setStep("Confirm");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  function resetAll() {
    setDate(null);
    setTime(null);
    setDetails(EMPTY_DETAILS);
    setSubmitted(false);
    setError(null);
    setStep("Date");
  }

  return (
    <div
      id="booking-panel"
      className="overflow-hidden rounded-3xl border border-line bg-white shadow-soft"
    >
      {/* Header strip, session metadata, kept compact */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-canvas/60 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white">
            <ClockIcon />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-ink">{SESSION.name}</p>
            <p className="text-[12px] text-muted">
              {SESSION.duration} · {SESSION.format} · {tz}
            </p>
          </div>
        </div>
        <Stepper step={step} />
      </div>

      <div className="p-5 sm:p-6">
        {(step === "Date" || step === "Time") && today && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Calendar
              month={month}
              today={today}
              selected={date}
              days={days}
              onPrev={() => setMonth((m) => addMonths(m, -1))}
              onNext={() => setMonth((m) => addMonths(m, 1))}
              onSelect={selectDate}
            />
            <TimeColumn
              date={date}
              selected={time}
              onSelect={selectTime}
              tz={tz}
              step={step}
            />
          </div>
        )}

        {step === "Details" && date && time && (
          <DetailsStep
            date={date}
            time={time}
            details={details}
            onChange={setDetails}
            onBack={() => setStep("Time")}
            onSubmit={handleSubmit}
            canSubmit={canContinueDetails && !submitting}
            submitting={submitting}
            error={error}
            tz={tz}
          />
        )}

        {step === "Confirm" && submitted && date && time && (
          <ConfirmStep
            date={date}
            time={time}
            details={details}
            tz={tz}
            onReset={resetAll}
          />
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Stepper({ step }: { step: Step }) {
  const activeIdx = STEPS.indexOf(step);
  return (
    <ol className="flex items-center gap-1.5">
      {STEPS.map((s, i) => {
        const done = i < activeIdx;
        const active = i === activeIdx;
        return (
          <li key={s} className="flex items-center gap-1.5">
            <span
              className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold ${
                active
                  ? "bg-ink text-white"
                  : done
                    ? "bg-accent text-white"
                    : "bg-white text-muted ring-1 ring-line"
              }`}
            >
              {done ? "✓" : i + 1}
            </span>
            <span
              className={`hidden text-[11px] font-semibold uppercase tracking-[0.14em] md:inline ${
                active ? "text-ink" : done ? "text-accent" : "text-muted"
              }`}
            >
              {s}
            </span>
            {i < STEPS.length - 1 && (
              <span className="mx-1 h-px w-4 bg-line" aria-hidden />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Calendar({
  month,
  today,
  selected,
  days,
  onPrev,
  onNext,
  onSelect,
}: {
  month: Date;
  today: Date;
  selected: Date | null;
  days: Date[];
  onPrev: () => void;
  onNext: () => void;
  onSelect: (d: Date) => void;
}) {
  // Don't let the user page back into months that are entirely in the past.
  const prevDisabled =
    month.getFullYear() < today.getFullYear() ||
    (month.getFullYear() === today.getFullYear() &&
      month.getMonth() <= today.getMonth());

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-ink">
          {formatMonthYear(month)}
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onPrev}
            disabled={prevDisabled}
            aria-label="Previous month"
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink/40 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevIcon dir="left" />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next month"
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink/40"
          >
            <ChevIcon dir="right" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted"
          >
            {d}
          </div>
        ))}
        {days.map((d) => {
          const inMonth = d.getMonth() === month.getMonth();
          const past = isPast(d, today);
          const weekend = isWeekend(d);
          const isToday = isSameDay(d, today);
          const isActive = selected !== null && isSameDay(d, selected);
          const disabled = past || weekend || !inMonth;
          return (
            <div key={d.toISOString()} className="flex justify-center py-0.5">
              <button
                type="button"
                onClick={() => !disabled && onSelect(d)}
                disabled={disabled}
                aria-pressed={isActive}
                aria-label={formatLongDate(d)}
                className={[
                  "relative grid h-10 w-10 place-items-center rounded-full text-[14px] font-semibold transition-all",
                  isActive
                    ? "bg-ink text-white shadow-cta"
                    : disabled
                      ? "cursor-not-allowed text-muted/40"
                      : "text-ink hover:bg-accent-lt hover:text-accent-dk",
                  isToday && !isActive && !disabled
                    ? "ring-1 ring-accent/60"
                    : "",
                ].join(" ")}
              >
                {d.getDate()}
                {isToday && !isActive && !disabled && (
                  <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-accent" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-[12px] text-muted">
        Weekdays only · times shown in your local timezone
      </p>
    </div>
  );
}

function TimeColumn({
  date,
  selected,
  onSelect,
  tz,
  step,
}: {
  date: Date | null;
  selected: string | null;
  onSelect: (s: string) => void;
  tz: string;
  step: Step;
}) {
  if (!date || step === "Date") {
    return (
      <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-canvas/40 p-6 text-center">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-accent-lt text-accent">
          <CalendarIcon />
        </div>
        <p className="mt-3 text-[14px] font-semibold text-ink">
          Pick a date to see times
        </p>
        <p className="mt-1 text-[12px] text-muted">
          We&apos;ll show 30-min slots in {tz}.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          {date.toLocaleDateString(undefined, { weekday: "long" })}
        </p>
        <h3 className="text-[16px] font-semibold text-ink">
          {date.toLocaleDateString(undefined, {
            day: "numeric",
            month: "long",
          })}
        </h3>
      </div>
      <div className="max-h-[340px] overflow-y-auto pr-1">
        <ul className="grid grid-cols-2 gap-2">
          {SLOTS.map((slot) => {
            const isActive = selected === slot;
            return (
              <li key={slot}>
                <button
                  type="button"
                  onClick={() => onSelect(slot)}
                  aria-pressed={isActive}
                  className={[
                    "w-full rounded-xl border px-2 py-3 text-center text-[14px] font-semibold transition-all",
                    isActive
                      ? "border-ink bg-ink text-white shadow-cta"
                      : "border-line bg-white text-ink hover:-translate-y-0.5 hover:border-ink/30",
                  ].join(" ")}
                >
                  {slot}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function DetailsStep({
  date,
  time,
  details,
  onChange,
  onBack,
  onSubmit,
  canSubmit,
  submitting,
  error,
  tz,
}: {
  date: Date;
  time: string;
  details: Details;
  onChange: (d: Details) => void;
  onBack: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
  submitting: boolean;
  error: string | null;
  tz: string;
}) {
  const set = <K extends keyof Details>(key: K, value: Details[K]) =>
    onChange({ ...details, [key]: value });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (canSubmit) onSubmit();
      }}
    >
      <div className="mb-5 flex items-center gap-3 rounded-2xl border border-line bg-canvas/50 px-4 py-3">
        <CheckRingIcon />
        <div className="text-[13px]">
          <p className="font-semibold text-ink">
            {formatLongDate(date)} at {time}
          </p>
          <p className="text-muted">
            {SESSION.duration} · {SESSION.format} · {tz}
          </p>
        </div>
      </div>

      <h2 className="text-[18px] font-semibold text-ink">Your details</h2>
      <p className="mt-1 text-[13px] text-muted">
        We&apos;ll send the calendar invite and meeting link to your email.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Full name" required>
          <input
            type="text"
            required
            value={details.name}
            onChange={(e) => set("name", e.target.value)}
            className="input"
            placeholder="Ada Lovelace"
            autoComplete="name"
          />
        </Field>
        <Field label="Work email" required>
          <input
            type="email"
            required
            value={details.email}
            onChange={(e) => set("email", e.target.value)}
            className="input"
            placeholder="you@company.ai"
            autoComplete="email"
          />
        </Field>
        <Field label="Company" required>
          <input
            type="text"
            required
            value={details.company}
            onChange={(e) => set("company", e.target.value)}
            className="input"
            placeholder="Acme Inc."
            autoComplete="organization"
          />
        </Field>
        <Field label="Team size">
          <select
            value={details.teamSize}
            onChange={(e) => set("teamSize", e.target.value as Details["teamSize"])}
            className="input"
          >
            <option value="">Select…</option>
            {TEAM_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Primary focus" className="sm:col-span-2">
          <select
            value={details.focus}
            onChange={(e) => set("focus", e.target.value as Details["focus"])}
            className="input"
          >
            <option value="">Select…</option>
            {FOCUS_AREAS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Anything we should know?" className="sm:col-span-2">
          <textarea
            value={details.notes}
            onChange={(e) => set("notes", e.target.value)}
            className="input min-h-[88px] resize-y"
            placeholder="Tools you use today, what's broken, what you want to fix…"
            rows={3}
            maxLength={1000}
          />
        </Field>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700"
        >
          {error}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between">
        <button type="button" onClick={onBack} className="btn btn-ghost">
          ← Back
        </button>
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Booking…" : "Book my demo →"}
        </button>
      </div>

      <p className="mt-3 text-[11px] text-muted">
        By booking you agree to our{" "}
        <a href="/privacy" className="underline hover:text-ink">
          privacy policy
        </a>
        . No spam, ever.
      </p>
    </form>
  );
}

function ConfirmStep({
  date,
  time,
  details,
  tz,
  onReset,
}: {
  date: Date;
  time: string;
  details: Details;
  tz: string;
  onReset: () => void;
}) {
  return (
    <div className="py-2 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-lt text-2xl font-bold text-accent">
        ✓
      </div>
      <h2 className="mt-4 text-[20px] font-semibold text-ink">
        You&apos;re booked in.
      </h2>
      <p className="mt-1 text-[14px] text-muted">
        We&apos;ve sent a confirmation to{" "}
        <span className="font-semibold text-ink">{details.email}</span>.
      </p>

      <dl className="mx-auto mt-5 max-w-sm divide-y divide-line rounded-2xl border border-line bg-canvas text-left">
        <Row k="When" v={`${formatLongDate(date)} · ${time}`} />
        <Row k="Timezone" v={tz} />
        <Row k="Who" v={`${details.name} · ${details.company}`} />
        {details.focus && <Row k="Focus" v={details.focus} />}
      </dl>

      <div className="mt-6 flex justify-center gap-3">
        <button type="button" onClick={onReset} className="btn btn-ghost">
          Book another
        </button>
        <a href="/" className="btn btn-primary">
          Back to home
        </a>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 text-[13px]">
      <dt className="font-semibold uppercase tracking-wider text-muted">{k}</dt>
      <dd className="text-ink">{v}</dd>
    </div>
  );
}

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1 ${className ?? ""}`}>
      <span className="text-[12px] font-semibold uppercase tracking-wider text-muted">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}

// ----- Tiny inline icons (no extra deps) -----------------------------------

function ChevIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ transform: dir === "left" ? "rotate(180deg)" : undefined }}
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckRingIcon() {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-lt text-accent">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 12l5 5L20 6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
