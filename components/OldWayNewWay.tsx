"use client";

import { Reveal } from "./Reveal";
import { ProductPreviewCard } from "./ProductPreviewCard";

// "Old way vs new way" section: a side-by-side comparison (SplitScene) on top —
// the "old way" chaos-of-tools panel beside the live "new way" ProductPreviewCard,
// with looping animations and no drag interaction — plus a two-column ledger
// breakdown (Ledger) underneath.
//
// The scene deliberately does NOT recreate a competitor's actual product
// screenshot — the "old way" panel is an original chaos-of-tools mockup
// (generic mail/chat/spreadsheet chips, not any real product's UI), and the
// "new way" panel reuses PYNGYN's own ProductPreviewCard, already built for
// the hero. Copy below is paraphrased from PYNGYN's own PAINS/AI_FEATURES
// vocabulary (see app/lp/professional-services/page.tsx), not lifted from
// anyone else's marketing.

// Two-column ledger data. Values (₹4.2L, 86%, …) are illustrative framing for
// the "old vs new" story, not audited figures. Each row pairs a finance-flavoured
// pain on the left with the matching PYNGYN fix on the right.
type IconKey = "wip" | "ar" | "gauge" | "scope" | "doc" | "branch" | "layout";
type LedgerRow = { icon: IconKey; text: string; value: string };

const OLD_WAY: LedgerRow[] = [
  { icon: "wip", text: "Unbilled WIP sitting in a spreadsheet nobody reconciles", value: "₹4.2L" },
  { icon: "ar", text: "Receivables ageing quietly past 60 days", value: "38 days" },
  { icon: "gauge", text: "Realization rate discovered only after invoicing", value: "?%" },
  { icon: "scope", text: "Scope creep absorbed between change orders", value: "−₹90k" },
  { icon: "doc", text: "Status spread across email, chat & spreadsheets", value: "6 tools" },
];

const NEW_WAY: LedgerRow[] = [
  { icon: "wip", text: "WIP & billing reconciled automatically, in real time", value: "Live" },
  { icon: "ar", text: "AR ageing tracked with reminders before it slips", value: "12 days" },
  { icon: "gauge", text: "Realization visible per engagement, as you go", value: "86%" },
  { icon: "branch", text: "Change requests approved & billed in the open", value: "+₹90k" },
  { icon: "layout", text: "One branded Clientspace — team & client aligned", value: "1 hub" },
];

// ---------------------------------------------------------------------------
// "Old way" chaos panel — original illustration, not a copy of anyone's UI.
// ---------------------------------------------------------------------------

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5h16v11H9l-4 4V16H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function SheetIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 10h16M10 4v16" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

// `drift` picks one of three looping float animations (ow-chip-1/2/3) so the
// scattered chips gently bob at different rhythms — the "old way" never settles.
const CHAOS_CHIPS: { icon: JSX.Element; label: string; sub: string; drift: string; top: string; left: string }[] = [
  { icon: <MailIcon />, label: "Proposal_final_v3.pdf", sub: "Gmail · attachment", drift: "ow-chip-1", top: "6%", left: "6%" },
  { icon: <ChatIcon />, label: "\"did we sign this yet?\"", sub: "WhatsApp thread", drift: "ow-chip-2", top: "2%", left: "46%" },
  { icon: <SheetIcon />, label: "Pricing_ACME_v7.xlsx", sub: "Downloads folder", drift: "ow-chip-3", top: "34%", left: "2%" },
  { icon: <MailIcon />, label: "Re: Re: Re: status update", sub: "Gmail · unread", drift: "ow-chip-1", top: "40%", left: "52%" },
  { icon: <ChatIcon />, label: "call recording link", sub: "Slack DM", drift: "ow-chip-2", top: "66%", left: "10%" },
  { icon: <SheetIcon />, label: "Engagement_tracker_FINAL2.xlsx", sub: "Shared drive", drift: "ow-chip-3", top: "70%", left: "44%" },
];

function ChaosPanel() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-canvas">
      {CHAOS_CHIPS.map((c, i) => (
        <div
          key={i}
          className={`absolute w-[46%] max-w-[220px] rounded-[10px] border border-line bg-white px-3 py-2 shadow-card ${c.drift}`}
          style={{ top: c.top, left: c.left }}
        >
          <div className="flex items-center gap-1.5 text-muted">
            {c.icon}
            <span className="truncate text-[11px] font-medium">{c.sub}</span>
          </div>
          <p className="mt-1 truncate text-[12.5px] font-semibold text-ink">{c.label}</p>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Side-by-side comparison — no drag. The "old way" chaos panel (drifting chips
// on a loop) sits beside the live, interactive "new way" ProductPreviewCard,
// with an animated flow arrow pointing from one to the other. Stacks on mobile.
// ---------------------------------------------------------------------------

function SplitScene() {
  return (
    <div className="relative grid items-stretch gap-5 md:grid-cols-2 md:gap-0 md:overflow-hidden md:rounded-[20px] md:border md:border-line md:bg-white md:shadow-art">
      {/* Old way — chaotic, always drifting */}
      <div className="relative min-h-[300px] overflow-hidden rounded-[20px] border border-line bg-canvas md:min-h-[420px] md:rounded-none md:border-0 md:border-r md:border-line">
        <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-line bg-white/90 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-wide text-muted backdrop-blur">
          Old way
        </span>
        <ChaosPanel />
      </div>

      {/* New way — the live product card */}
      <div className="relative grid place-items-center rounded-[20px] border border-line bg-canvas p-4 sm:p-8 md:rounded-none md:border-0">
        <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full border border-accent/30 bg-accent-lt/90 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-wide text-accent-dk backdrop-blur">
          New way
        </span>
        <div className="w-full max-w-[560px]">
          <ProductPreviewCard />
        </div>
      </div>

      {/* Flow arrow: between the panels (points right on desktop, down on
          mobile). Animated nudge loops. */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 z-20 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-accent shadow-cta max-md:rotate-90"
      >
        <svg className="ow-flow" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// "Option G V1" bouncy ledger — side-by-side Old way / New way with
// finance-flavoured icons, value chips, and a looping spring animation.
// ---------------------------------------------------------------------------

const LEDGER_ICONS: Record<IconKey | "clock" | "check", JSX.Element> = {
  wip: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20V10M9 20V4M14 20v-8M19 20V7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  ),
  ar: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 12h.01M17 12h.01" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  ),
  gauge: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 15a8 8 0 0116 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 15l4-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  scope: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 8L4 4m0 0v4m0-4h4M16 16l4 4m0 0v-4m0 4h-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  doc: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3h7l4 4v14H7z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M13 3v5h5M9 13h6M9 16h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  branch: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="6" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="18" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6 8.2v7.6M8 6h4a4 4 0 014 4" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  ),
  layout: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  ),
  clock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function LedgerColumn({
  heading,
  sub,
  items,
  tone,
}: {
  heading: string;
  sub: string;
  items: LedgerRow[];
  tone: "old" | "new";
}) {
  const isOld = tone === "old";
  return (
    <div>
      {/* Column header */}
      <div className="mb-4 flex items-center gap-3">
        <span
          className={`grid h-9 w-9 flex-none place-items-center rounded-[10px] ${
            isOld ? "ow-head-old bg-rose-50 text-rose-500" : "ow-head-new bg-emerald-50 text-emerald-600"
          }`}
          aria-hidden="true"
        >
          {LEDGER_ICONS[isOld ? "clock" : "check"]}
        </span>
        <div>
          <h3 className="text-[17px] font-bold leading-tight text-ink">{heading}</h3>
          <p className="text-[12px] font-medium text-muted">{sub}</p>
        </div>
      </div>

      {/* Rows */}
      <ul className="space-y-2.5">
        {items.map((row, idx) => (
          <li
            key={row.text}
            className="ow-row flex items-center gap-3 rounded-[13px] border border-line bg-white px-4 py-3 shadow-card"
            style={{ animationDelay: `${(isOld ? 0 : 0.18) + idx * 0.12}s` }}
          >
            <span
              className={`grid h-8 w-8 flex-none place-items-center rounded-[9px] ${
                isOld ? "ow-ic-old bg-rose-50 text-rose-500" : "ow-ic-new bg-emerald-50 text-emerald-600"
              }`}
              aria-hidden="true"
            >
              {LEDGER_ICONS[row.icon]}
            </span>
            <span
              className={`flex-1 text-[13px] leading-snug ${isOld ? "text-muted" : "font-medium text-ink"}`}
            >
              {row.text}
            </span>
            <span
              className={`flex-none rounded-full px-2.5 py-1 text-[12px] font-extrabold tabular-nums ${
                isOld ? "bg-rose-50 text-rose-500" : "ow-badge bg-emerald-50 text-emerald-600"
              }`}
            >
              {row.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Ledger() {
  return (
    <div className="relative grid gap-8 sm:grid-cols-2 sm:gap-12">
      {/* Center divider (sm+ only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-6 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-line to-transparent sm:block"
      />
      <LedgerColumn
        heading="Old way"
        sub="Scattered tools · found out too late"
        items={OLD_WAY}
        tone="old"
      />
      <LedgerColumn
        heading="New way"
        sub="One system · live financial truth"
        items={NEW_WAY}
        tone="new"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export function OldWayNewWay() {
  return (
    <section className="section-tight">
      <div className="wrap">
        <Reveal>
          <div className="mx-auto max-w-[640px] text-center">
            <p className="eyebrow justify-center">
              <span className="eyebrow-dot" aria-hidden="true" /> Before / after
            </p>
            <h2 className="title mt-4">Why client work falls through the cracks.</h2>
            <p className="lead mx-auto mt-4">
              More clients, more stakeholders, more tools bolted together over time. Drag the
              slider to see what changes when it all runs through one system instead.
            </p>
          </div>
        </Reveal>

        <Reveal i={1}>
          <div className="mt-12">
            <SplitScene />
          </div>
        </Reveal>

        <Reveal i={2}>
          <div className="ow-anim mt-16">
            <Ledger />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
