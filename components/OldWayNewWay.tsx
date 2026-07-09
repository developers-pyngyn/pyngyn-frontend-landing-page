"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { ProductPreviewCard } from "./ProductPreviewCard";

// "Old way vs new way" section with a drag-to-reveal comparison slider,
// plus a two-column bullet breakdown underneath.
//
// The slider deliberately does NOT recreate a competitor's actual product
// screenshot — the "old way" panel is an original chaos-of-tools mockup
// (generic mail/chat/spreadsheet chips, not any real product's UI), and the
// "new way" panel reuses PYNGYN's own ProductPreviewCard, already built for
// the hero. Copy below is paraphrased from PYNGYN's own PAINS/AI_FEATURES
// vocabulary (see app/lp/professional-services/page.tsx), not lifted from
// anyone else's marketing.

const OLD_WAY: string[] = [
  "Status scattered across WhatsApp, email, and spreadsheets — nobody has the full picture before a client call.",
  "SOPs and client context live in one partner's head. When they're out, work slows down.",
  "Deadlines slip silently — risk is invisible until it's already cost you the date.",
  "Scope creeps between formal change orders. The firm quietly absorbs the cost.",
  "Several people are \"on\" a task, but nobody really owns it.",
  "You learn a project was unprofitable after the invoice goes out.",
];

const NEW_WAY: string[] = [
  "One branded Clientspace per engagement — client and team see the same live status.",
  "A living knowledge base surfaces SOPs and client history exactly when they matter.",
  "AI risk detection flags what threatens dates and margin, days earlier.",
  "Change requests and approvals are tracked in the open, not absorbed in silence.",
  "Every task has a clear, visible owner from the moment it's created.",
  "Live engagement health, so margin problems surface weeks before the invoice.",
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

const CHAOS_CHIPS: { icon: JSX.Element; label: string; sub: string; rotate: string; top: string; left: string }[] = [
  { icon: <MailIcon />, label: "Proposal_final_v3.pdf", sub: "Gmail · attachment", rotate: "-rotate-3", top: "6%", left: "6%" },
  { icon: <ChatIcon />, label: "\"did we sign this yet?\"", sub: "WhatsApp thread", rotate: "rotate-2", top: "2%", left: "46%" },
  { icon: <SheetIcon />, label: "Pricing_ACME_v7.xlsx", sub: "Downloads folder", rotate: "rotate-1", top: "34%", left: "2%" },
  { icon: <MailIcon />, label: "Re: Re: Re: status update", sub: "Gmail · unread", rotate: "-rotate-1", top: "40%", left: "52%" },
  { icon: <ChatIcon />, label: "call recording link", sub: "Slack DM", rotate: "-rotate-2", top: "66%", left: "10%" },
  { icon: <SheetIcon />, label: "Engagement_tracker_FINAL2.xlsx", sub: "Shared drive", rotate: "rotate-2", top: "70%", left: "44%" },
];

function ChaosPanel() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-canvas">
      {CHAOS_CHIPS.map((c, i) => (
        <div
          key={i}
          className={`absolute w-[46%] max-w-[230px] rounded-[10px] border border-line bg-white px-3 py-2 shadow-card ${c.rotate}`}
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
// Drag-to-reveal comparison slider
// ---------------------------------------------------------------------------

function CompareSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(50);
  const draggingRef = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.min(96, Math.max(4, pct)));
  }, []);

  useEffect(() => {
    function onMove(e: MouseEvent | TouchEvent) {
      if (!draggingRef.current) return;
      const clientX = "touches" in e ? e.touches[0]?.clientX : e.clientX;
      if (clientX !== undefined) setFromClientX(clientX);
    }
    function onUp() {
      draggingRef.current = false;
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [setFromClientX]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") setPercent((p) => Math.max(4, p - 5));
    if (e.key === "ArrowRight") setPercent((p) => Math.min(96, p + 5));
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10.5] w-full select-none overflow-hidden rounded-[20px] border border-line bg-white shadow-art sm:aspect-[16/8.5]"
    >
      {/* New way — full underlying layer */}
      <div className="absolute inset-0 grid place-items-center bg-canvas p-4 sm:p-8">
        <div className="w-full max-w-[560px]">
          <ProductPreviewCard />
        </div>
      </div>

      {/* Old way — clipped from the right as the handle moves left */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      >
        <ChaosPanel />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-line bg-white/90 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-wide text-muted backdrop-blur">
        Old way
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-accent/30 bg-accent-lt/90 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-wide text-accent-dk backdrop-blur">
        New way
      </span>

      {/* Divider + drag handle */}
      <div
        className="absolute inset-y-0 z-10 w-[2px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
        style={{ left: `${percent}%` }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label="Drag to compare old way and new way"
          aria-valuenow={Math.round(percent)}
          aria-valuemin={4}
          aria-valuemax={96}
          onKeyDown={onKeyDown}
          onMouseDown={() => {
            draggingRef.current = true;
          }}
          onTouchStart={() => {
            draggingRef.current = true;
          }}
          className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-line bg-white text-ink shadow-cta transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bullet list column
// ---------------------------------------------------------------------------

function BulletColumn({
  heading,
  items,
  tone,
}: {
  heading: string;
  items: string[];
  tone: "old" | "new";
}) {
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span
          className={`grid h-9 w-9 flex-none place-items-center rounded-[10px] ${
            tone === "old" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
          }`}
          aria-hidden="true"
        >
          {tone === "old" ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <h3 className="text-[18px] font-semibold text-ink">{heading}</h3>
      </div>
      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-muted">
            <span
              className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${
                tone === "old" ? "bg-amber-400" : "bg-emerald-500"
              }`}
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
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
            <CompareSlider />
          </div>
        </Reveal>

        <Reveal i={2}>
          <div className="mt-16 grid gap-12 sm:grid-cols-2 sm:gap-16">
            <BulletColumn heading="Old way" items={OLD_WAY} tone="old" />
            <BulletColumn heading="New way" items={NEW_WAY} tone="new" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
