"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SIGNUP_URL, DEMO_URL } from "./config";
import { ProductPreviewCard } from "./ProductPreviewCard";

// ---------------------------------------------------------------------------
// Live status pill strip. Three client-facing items, each cycling through
// realistic states on its own cadence, communicating "status is always
// current" in the visual language a professional-services buyer actually
// lives in: documents, drafts, invoices.
// ---------------------------------------------------------------------------

type PillTone = "neutral" | "progress" | "positive";

type PillState = { text: string; tone: PillTone };

const PILL_SEQUENCES: PillState[][] = [
  [
    { text: "Engagement letter · Pending", tone: "progress" },
    { text: "Engagement letter · Signed ✓", tone: "positive" },
  ],
  [
    { text: "Q3 draft · In review", tone: "progress" },
    { text: "Q3 draft · Approved ✓", tone: "positive" },
    { text: "Q3 draft · In review", tone: "progress" },
  ],
  [
    { text: "Invoice #204 · Sent", tone: "neutral" },
    { text: "Invoice #204 · Viewed", tone: "progress" },
    { text: "Invoice #204 · Paid ✓", tone: "positive" },
  ],
];

const pillTone: Record<PillTone, string> = {
  neutral: "border-white/10 bg-white/[0.04] text-white/60",
  progress: "border-accent/30 bg-accent/10 text-white/85",
  positive: "border-[#2fbf71]/30 bg-[#2fbf71]/10 text-[#8ce0b4]",
};

const pillDot: Record<PillTone, string> = {
  neutral: "bg-white/35",
  progress: "bg-accent",
  positive: "bg-[#2fbf71]",
};

function StatusPill({ sequence, startDelay }: { sequence: PillState[]; startDelay: number }) {
  const reduceMotion = useReducedMotion();
  // Reduced motion: skip straight to the final (settled) state, no cycling.
  const [index, setIndex] = useState(reduceMotion ? sequence.length - 1 : 0);

  useEffect(() => {
    if (reduceMotion) return;
    // Each pill starts cycling only after its own offset delay, so the three
    // never tick in unison, which reads more like live activity.
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      setIndex((i) => (i + 1) % sequence.length);
      interval = setInterval(() => {
        setIndex((i) => (i + 1) % sequence.length);
      }, 3600);
    }, startDelay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [reduceMotion, sequence.length, startDelay]);

  const state = sequence[index];
  // Fixed to this pill's own longest possible state text (+ a small buffer
  // for wider glyphs like ✓), so switching text never changes this pill's
  // width, which is what previously caused the row to jitter between one
  // line and two as pills changed state.
  const widestChars = Math.max(...sequence.map((s) => s.text.length)) + 1.5;

  return (
    <span
      style={{ minWidth: `${widestChars}ch` }}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors duration-500 ${pillTone[state.tone]}`}
    >
      <span className="relative flex h-1.5 w-1.5 flex-none" aria-hidden="true">
        <span className={`absolute inline-flex h-full w-full rounded-full ${pillDot[state.tone]} ${state.tone !== "neutral" ? "motion-safe:animate-ping opacity-60" : ""}`} />
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${pillDot[state.tone]}`} />
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={state.text}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {state.text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function StatusPillStrip() {
  return (
    <div className="mt-7 flex flex-wrap items-center gap-2.5" aria-label="Live client status examples">
      {PILL_SEQUENCES.map((seq, i) => (
        <StatusPill key={i} sequence={seq} startDelay={1200 + i * 1300} />
      ))}
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Disable parallax when the user prefers reduced motion.
  const y = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 80]);

  return (
    <section ref={ref} className="hero-dark relative overflow-hidden pb-[90px] pt-[150px]">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-[120px] -top-[140px] h-[520px] w-[520px] rounded-full bg-accent opacity-25 blur-[90px]" aria-hidden="true" />
      <div className="wrap relative">
        <div className="grid items-center gap-[54px] lg:grid-cols-[1.05fr_1fr]">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="eyebrow-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                THE CLIENT PORTAL FOR PROFESSIONAL-SERVICES FIRMS
              </span>
            </motion.div>
            <motion.h1
              className="mt-[22px] font-display text-[clamp(40px,5.6vw,68px)] font-semibold leading-[1.02] tracking-[-0.025em] text-white"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
            >
              One place to run your firm
              <br />
              and <span className="text-accent">every client</span> engagement.
            </motion.h1>
            <motion.p
              className="mt-[22px] max-w-[560px] text-[18px] leading-relaxed text-white/65"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
            >
              PYNGYN gives every client a branded portal where they see their
              status, documents, and approvals 24/7, instead of emailing you for
              updates. It&apos;s a standalone product, no Workspace required, though
              firms that also want to run projects and billable time internally
              can add Workspace or bundle both.
            </motion.p>

            {/* Live client-status accent: three items cycling through
                realistic states, "status is always current" at a glance. */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
            >
              <StatusPillStrip />
            </motion.div>

            <motion.div
              className="mt-[30px] flex flex-wrap items-center gap-3.5"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <a href={DEMO_URL} className="btn bg-white text-ink shadow-cta hover:-translate-y-0.5 hover:bg-white/90">
                Book a demo →
              </a>
              <a href={SIGNUP_URL} className="btn border border-white/15 bg-white/5 text-white hover:-translate-y-0.5 hover:bg-white/10">
                Start free
              </a>
            </motion.div>
            <motion.p
              className="mt-4 text-[13px] font-semibold text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              Trusted by 500+ professional-services firms
            </motion.p>
            <motion.p
              className="mt-1.5 font-mono text-[12px] uppercase tracking-[0.1em] text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              30-min walkthrough · On your firm&apos;s workflows · No commitment
            </motion.p>
          </div>
          <motion.div style={{ y }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.6, 0.35, 1] }}
            >
              <ProductPreviewCard />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
