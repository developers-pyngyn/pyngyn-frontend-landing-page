"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { DEMO_URL, SIGNUP_URL } from "./config";

// Session-persisted, not per-mount: a visitor who dismisses this, or lets the
// timer run, gets the same real deadline on every page for the rest of their
// browser session, not a fresh 15:00 on every navigation. Cleared when the
// tab/browser session ends, same as a normal "today only" style offer.
const DISMISSED_KEY = "pyngyn-promo-dismissed";
const DEADLINE_KEY = "pyngyn-promo-deadline";
const DURATION_SECONDS = 15 * 60; // 15 minutes

// Trigger tuning: interrupting on a blind timer before anyone's had a
// chance to read the page costs more conversions than it wins. Instead we
// arm three ways in and fire on whichever happens first —
//   1. Exit intent (desktop): cursor leaves toward the tab/URL bar.
//   2. Scroll depth: the visitor has read roughly half the page.
//   3. A longer fallback timer, for touch devices and readers who do
//      neither (exit intent needs a mouse; some visitors don't scroll much
//      on a short page).
// A short arm delay avoids false triggers from cursor jitter during the
// very first moment of page load.
const ARM_DELAY_MS = 3000;
const FALLBACK_DELAY_MS = 20000;
const SCROLL_TRIGGER_PCT = 0.5;

// Pages that already run their own exit-intent popup (ExitIntentModal, on
// /lp, /pricing, and /demo) or are ad landing pages — showing a second,
// competing popup on the same page doesn't add conversions, it just adds
// noise right where a visitor is already deep in the decision.
const EXCLUDED_PREFIXES = ["/lp", "/pricing", "/demo"];

function format(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function readOrCreateDeadline(): number {
  try {
    const stored = sessionStorage.getItem(DEADLINE_KEY);
    if (stored) return Number(stored);
    const deadline = Date.now() + DURATION_SECONDS * 1000;
    sessionStorage.setItem(DEADLINE_KEY, String(deadline));
    return deadline;
  } catch {
    return Date.now() + DURATION_SECONDS * 1000;
  }
}

export function PromoPopup() {
  const pathname = usePathname();
  const excluded = EXCLUDED_PREFIXES.some((p) => pathname?.startsWith(p)) ?? false;
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [remaining, setRemaining] = useState(DURATION_SECONDS);
  const firedRef = useRef(false);

  // On mount, check whether this session already dismissed it or already has
  // a running deadline (from an earlier page). Never re-show after dismiss,
  // never reset the countdown just because the visitor navigated.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISSED_KEY)) {
        setDismissed(true);
      }
    } catch {
      /* sessionStorage unavailable, fall back to in-memory only */
    }
  }, []);

  // Arm exit-intent + scroll-depth + a fallback timer; whichever fires
  // first opens the popup. Runs once per session, never on excluded pages.
  useEffect(() => {
    if (dismissed || excluded) return;

    function trigger() {
      if (firedRef.current) return;
      firedRef.current = true;
      const deadline = readOrCreateDeadline();
      const secondsLeft = Math.max(0, Math.round((deadline - Date.now()) / 1000));
      if (secondsLeft <= 0) {
        close();
        return;
      }
      setRemaining(secondsLeft);
      setOpen(true);
    }

    let armed = false;
    const arm = setTimeout(() => {
      armed = true;
    }, ARM_DELAY_MS);

    function onMouseLeave(e: MouseEvent) {
      if (armed && e.clientY <= 0) trigger();
    }

    function onScroll() {
      if (!armed) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= SCROLL_TRIGGER_PCT) trigger();
    }

    const fallback = setTimeout(trigger, FALLBACK_DELAY_MS);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(arm);
      clearTimeout(fallback);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [dismissed, excluded]);

  // Countdown, driven by the real persisted deadline so it stays accurate
  // even if the tab was inactive or the interval drifted.
  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => {
      let deadline: number | null = null;
      try {
        const stored = sessionStorage.getItem(DEADLINE_KEY);
        if (stored) deadline = Number(stored);
      } catch {
        /* ignore */
      }
      const next = deadline ? Math.max(0, Math.round((deadline - Date.now()) / 1000)) : null;
      setRemaining((prev) => (next !== null ? next : prev > 0 ? prev - 1 : 0));
      if (next === 0) close();
    }, 1000);
    return () => clearInterval(id);
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  if (excluded) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-title"
        >
          {/* backdrop */}
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          />

          <motion.div
            className="relative w-full max-w-[440px] overflow-hidden rounded-[22px] bg-white shadow-soft"
            initial={{ scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 16, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.21, 0.6, 0.35, 1] }}
          >
            {/* dark header band */}
            <div className="hero-dark relative px-7 pb-7 pt-8 text-center">
              <button
                type="button"
                onClick={close}
                aria-label="Close popup"
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <span className="eyebrow-dark justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Limited-time offer
              </span>
              <h2 id="promo-title" className="mt-3 font-display text-[26px] font-semibold leading-tight text-white">
                Start free, set up in minutes
              </h2>
              <p className="mt-2 text-[14px] text-white/65">
                Book a 30-minute demo and we&apos;ll extend your trial with white-glove onboarding.
              </p>

              {/* evergreen timer */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent">
                  <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 9v4l2.5 2M9 2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="font-mono text-[16px] font-semibold tabular-nums text-white">
                  {format(remaining)}
                </span>
                <span className="text-[12px] text-white/55">left</span>
              </div>
            </div>

            {/* actions */}
            <div className="flex flex-col gap-2.5 p-6">
              <a href={DEMO_URL} className="btn btn-accent justify-center">
                Book a demo →
              </a>
              <a href={SIGNUP_URL} className="btn btn-ghost justify-center">
                Start free
              </a>
              <p className="mt-0.5 text-center text-[12px] text-muted">
                30 minutes · Tailored to your firm · No commitment
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-0.5 text-[13px] text-muted hover:text-ink"
              >
                No thanks, maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
