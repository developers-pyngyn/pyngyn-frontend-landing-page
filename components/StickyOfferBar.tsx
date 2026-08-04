"use client";

import { useEffect, useState } from "react";

const DURATION_SECONDS = 15 * 60; // evergreen window per visitor
const STORAGE_KEY = "lp_ps_deadline";

function format(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return { m: String(m).padStart(2, "0"), s: String(s).padStart(2, "0") };
}

export function StickyOfferBar({ ctaHref }: { ctaHref: string }) {
  // Start null so server and first client render match (avoids hydration mismatch).
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    // Evergreen: a per-visitor deadline that survives navigation within the session.
    let deadline: number;
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        deadline = parseInt(stored, 10);
      } else {
        deadline = Date.now() + DURATION_SECONDS * 1000;
        sessionStorage.setItem(STORAGE_KEY, String(deadline));
      }
    } catch {
      // sessionStorage blocked — fall back to in-memory for this load.
      deadline = Date.now() + DURATION_SECONDS * 1000;
    }

    const tick = () => {
      const left = Math.max(0, Math.round((deadline - Date.now()) / 1000));
      setRemaining(left);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (remaining === null) return null;

  const { m, s } = format(remaining);
  const expired = remaining <= 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="border-t border-white/10 bg-ink/95 backdrop-blur supports-[backdrop-filter]:bg-ink/85">
        <div className="mx-auto flex w-full max-w-[1080px] flex-col items-center gap-3 px-5 py-3.5 sm:flex-row sm:justify-between sm:px-7">
          <div className="flex items-center gap-3 text-white">
            <span className="relative flex h-2.5 w-2.5 flex-none">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <p className="text-[13.5px] leading-tight sm:text-[14.5px]">
              <span className="font-semibold">Clientspace onboarding cohort closing soon.</span>{" "}
              <span className="text-white/65">
                {expired ? "Limited spots, book now." : "Book before the timer ends for priority setup on your branded portal."}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            {!expired && (
              <div className="flex items-center gap-1.5" aria-label={`${m} minutes ${s} seconds remaining`}>
                <TimeCell value={m} unit="min" />
                <span className="-mt-2 text-[18px] font-bold text-white/40">:</span>
                <TimeCell value={s} unit="sec" />
              </div>
            )}
            <a
              href={ctaHref}
              className="inline-flex flex-none items-center rounded-full bg-accent px-5 py-2.5 text-[14px] font-semibold text-white shadow-cta transition-transform hover:-translate-y-0.5 hover:bg-accent-dk"
            >
              Book a demo →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeCell({ value, unit }: { value: string; unit: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="grid min-w-[34px] place-items-center rounded-md bg-white/10 px-1.5 py-1 font-mono text-[17px] font-bold tabular-nums text-white">
        {value}
      </span>
      <span className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-white/40">{unit}</span>
    </div>
  );
}
