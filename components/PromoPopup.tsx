"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { DEMO_URL, SIGNUP_URL } from "./config";

// Session-persisted: a visitor who dismisses this doesn't see it again for
// the rest of their browser session, on any page. Cleared when the tab
// closes.
const DISMISSED_KEY = "pyngyn-promo-dismissed";

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

export function PromoPopup() {
  const pathname = usePathname();
  const excluded = EXCLUDED_PREFIXES.some((p) => pathname?.startsWith(p)) ?? false;
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const firedRef = useRef(false);

  // On mount, check whether this session already dismissed it.
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
                Trusted by 500+ firms
              </span>
              <h2 id="promo-title" className="mt-3 font-display text-[26px] font-semibold leading-tight text-white">
                Start free, set up in minutes
              </h2>
              <p className="mt-2 text-[14px] text-white/65">
                Book a 30-minute demo, or start your 7-day free trial right now. No credit
                card required.
              </p>
            </div>

            {/* actions */}
            <div className="flex flex-col gap-2.5 p-6">
              <a href={DEMO_URL} className="btn btn-accent justify-center">
                Book a demo →
              </a>
              <a href={SIGNUP_URL} className="btn btn-ghost justify-center">
                Start free trial
              </a>
              <p className="mt-0.5 text-center text-[12px] text-muted">
                7-day free trial · No credit card required · Cancel anytime
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
