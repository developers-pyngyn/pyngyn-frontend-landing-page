"use client";

import { useEffect, useState } from "react";

type Props = {
  ctaHref: string;
  ctaLabel?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  dismissLabel?: string;
  /**
   * Shared across pages via sessionStorage so a visitor who sees this on
   * /pricing doesn't get hit again on /demo in the same session. Pass a
   * distinct key only if a page genuinely needs its own independent trigger.
   */
  storageKey?: string;
};

// Lightweight exit-intent modal, reused across /lp, /pricing, and /demo with
// per-page copy. Fires once per real mouse exit to the top of the viewport,
// and at most once per browser session across every page that mounts it
// (shared storageKey), not once per page load.
// Touch-only devices never trigger it. Always dismissible.
export function ExitIntentModal({
  ctaHref,
  ctaLabel = "Book a demo",
  eyebrow = "Before you go",
  title = "See where your firm's billable hours are actually going.",
  body = "A 30-minute live walkthrough on a real engagement of yours. You leave with a written rollout plan, whether you sign up or not.",
  dismissLabel = "No thanks, I'll keep doing it the hard way",
  storageKey = "pyngyn-exit-intent-shown",
}: Props) {
  const [open, setOpen] = useState(false);
  const [hasFired, setHasFired] = useState(false);

  useEffect(() => {
    if (hasFired) return;

    // Already shown once this session, on this page or another one sharing
    // the same storageKey. Never fire twice per browser session.
    try {
      if (sessionStorage.getItem(storageKey)) return;
    } catch {
      /* sessionStorage unavailable, fall through and allow firing */
    }

    // Ignore on touch primary devices (mobile, no cursor exit signal)
    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) return;

    function onLeave(e: MouseEvent) {
      // Only when the cursor exits through the top of the viewport
      if (e.clientY <= 0 && !hasFired) {
        setHasFired(true);
        setOpen(true);
        try {
          sessionStorage.setItem(storageKey, "1");
        } catch {
          /* ignore */
        }
      }
    }

    // Small delay to avoid firing immediately on load
    const t = window.setTimeout(() => {
      document.addEventListener("mouseleave", onLeave);
    }, 4000);

    return () => {
      window.clearTimeout(t);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [hasFired, storageKey]);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-title"
      className="fixed inset-0 z-[80] flex items-center justify-center px-5 py-8"
    >
      <div
        className="absolute inset-0 bg-[#0b0d12]/80 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-[440px] overflow-hidden rounded-2xl border border-white/10 bg-[#11141a] p-7 shadow-2xl">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-white/55 transition hover:bg-white/5 hover:text-white"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {eyebrow}
        </span>

        <h2 id="exit-title" className="mt-3 font-display text-[24px] font-semibold leading-tight tracking-[-0.02em] text-white">
          {title}
        </h2>
        <p className="mt-2 text-[14.5px] leading-relaxed text-white/65">{body}</p>

        <a
          href={ctaHref}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-[14.5px] font-semibold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-accent-dk"
          onClick={() => setOpen(false)}
        >
          {ctaLabel}
          <span aria-hidden="true">→</span>
        </a>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-2.5 block w-full text-center text-[12.5px] text-white/45 hover:text-white/80"
        >
          {dismissLabel}
        </button>
      </div>
    </div>
  );
}
