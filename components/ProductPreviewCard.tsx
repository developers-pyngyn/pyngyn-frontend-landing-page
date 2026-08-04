"use client";

import { useState } from "react";

// Coded product preview for the hero, not a screenshot. A real app
// screenshot downscaled to ~620px becomes illegible (dense sidebar + table
// UI shrunk to fit), so this rebuilds just the "needs your attention" list
// as actual markup: a handful of large, legible rows plus one highlighted
// AI-insight callout, matching PYNGYN's own vocabulary (engagement letters,
// change requests, review cycles) already used in the hero copy next to it.
//
// This is decorative hero art, not a live product view — nothing here is
// wired to a backend. The row checkboxes are cosmetically interactive
// (toggle on click, keyboard-operable) so the card doesn't feel dead next
// to real, working CTAs, and the status pill now updates with the checkbox
// so the two stay visually consistent.

type RowTone = "amber" | "positive" | "accent" | "neutral";

const rowTone: Record<RowTone, { pill: string; dot: string }> = {
  amber: { pill: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  positive: { pill: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  accent: { pill: "bg-accent-lt text-accent-dk", dot: "bg-accent" },
  neutral: { pill: "bg-canvas text-muted", dot: "bg-muted" },
};

type RowConfig = {
  label: string;
  sub: string;
  done?: boolean;
  // Status shown while unchecked, and while checked — kept distinct per row
  // so ticking a box reads as a real state change ("Signed", "Received"),
  // not a generic "Done" slapped on every row.
  notDone: { status: string; tone: RowTone };
  onDone: { status: string; tone: RowTone };
};

const ROWS: RowConfig[] = [
  {
    label: "Engagement letter",
    sub: "Compliance Audit Q3 · Agreement",
    notDone: { status: "Awaiting signature", tone: "amber" },
    onDone: { status: "Signed ✓", tone: "positive" },
  },
  {
    label: "Change Request #CR-001",
    sub: "Compliance Audit Q3 · Addendum",
    done: true,
    notDone: { status: "Awaiting signature", tone: "amber" },
    onDone: { status: "Signed ✓", tone: "positive" },
  },
  {
    label: "Vendor API credentials",
    sub: "Compliance Audit Q3 · File requested",
    notDone: { status: "Action needed", tone: "accent" },
    onDone: { status: "Received ✓", tone: "positive" },
  },
  {
    label: "Expand controls testing",
    sub: "Include Q2 retroactively",
    notDone: { status: "In review", tone: "neutral" },
    onDone: { status: "Done ✓", tone: "positive" },
  },
];

export function ProductPreviewCard() {
  // Local-only, cosmetic state — resets on reload/navigation, never touches
  // status pill text. Purely so the card has a little life to it on hover
  // and click, matching the "live product" framing of the window chrome.
  const [checked, setChecked] = useState<boolean[]>(() => ROWS.map((r) => Boolean(r.done)));

  function toggle(i: number) {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  return (
    <div className="overflow-hidden rounded-[18px] border border-line bg-white shadow-art">
      {/* Window chrome, same visual grammar as the reference: traffic-light
          dots + a title bar, signals "this is a live product" at a glance. */}
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[14px] font-semibold text-ink">
            Compliance Audit Q3 <span className="font-normal text-muted">· Engagement</span>
          </span>
        </div>
        <span className="hidden text-[12.5px] text-muted sm:inline">Client view</span>
      </div>

      <div className="divide-y divide-line">
        {ROWS.map((r, i) => {
          const done = checked[i];
          const pill = done ? r.onDone : r.notDone;
          return (
            <div
              key={r.label}
              className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-canvas/60"
            >
              <div className="flex items-center gap-3.5">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={done}
                  aria-label={`Mark "${r.label}" as ${done ? "not done" : "done"}`}
                  onClick={() => toggle(i)}
                  className={`grid h-6 w-6 flex-none cursor-pointer place-items-center rounded-md border transition-all duration-150 hover:scale-105 active:scale-95 ${
                    done
                      ? "border-emerald-500 bg-emerald-500"
                      : "border-line bg-white group-hover:border-accent/50"
                  }`}
                >
                  {done && (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <div>
                  <p className="text-[15px] font-semibold leading-tight text-ink">{r.label}</p>
                  <p className="mt-0.5 text-[13px] leading-tight text-muted">{r.sub}</p>
                </div>
              </div>
              <span
                className={`flex-none rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-colors duration-200 ${rowTone[pill.tone].pill}`}
              >
                {pill.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* AI-insight callout: the payoff for the "AI drafts, you decide"
          positioning already made elsewhere on the page (see the FAQ). */}
      <div className="flex items-start gap-3 bg-accent-lt px-5 py-4">
        <span className="mt-0.5 text-accent" aria-hidden="true">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2L12 2z" />
          </svg>
        </span>
        <p className="text-[13.5px] leading-snug text-accent-dk">
          <span className="font-semibold">PYNGYN flagged 1 item at risk:</span> the signature is
          2 days overdue and the next client session is Friday.
        </p>
      </div>
    </div>
  );
}
