"use client";

import { useEffect, useState } from "react";

/**
 * A simple persistent CTA bar that slides in from the bottom after the
 * visitor scrolls past the hero. Unlike EvergreenTimer, this makes no
 * urgency or deadline claim, just a plain, honest reminder of the offer
 * (trial length, no credit card) and a way to act on it.
 */
export function StickyCTABar({
  label,
  ctaHref,
  ctaLabel = "Start free trial",
  showAfter = 560,
}: {
  label: string;
  ctaHref: string;
  ctaLabel?: string;
  showAfter?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[70] border-t border-white/10 bg-ink text-white shadow-[0_-10px_30px_-14px_rgba(0,0,0,0.55)] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
      role="region"
      aria-label="Start a free trial"
      aria-hidden={!visible}
    >
      <div className="flex items-center justify-between gap-3 px-5 py-3 pl-[76px]">
        <span className="text-[13.5px] font-semibold text-white/85">{label}</span>
        <a href={ctaHref} className="btn btn-accent flex-none px-4 py-2 text-[13.5px]">
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}
