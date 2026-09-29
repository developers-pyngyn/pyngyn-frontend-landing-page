"use client";

/*
 * Manual country/currency override. IP geolocation is wrong often enough
 * (VPNs, corporate egress, bad lookups) that it can never be the only path.
 *
 * Selecting a market writes the first-party `pyngyn_market` cookie and calls
 * router.refresh(), so the server re-renders prices for the new market without
 * a full reload. The URL never changes — same URL for every visitor, only the
 * displayed currency differs, so nothing is geo-redirected and no cache entry
 * can leak one region's prices to another.
 */

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { PRICING, type MarketCode } from "@/lib/pricing/config";
import {
  MARKET_COOKIE,
  MARKET_COOKIE_MAX_AGE,
  SELECTABLE_MARKETS,
} from "@/lib/pricing/detect-country";

/** Code + label per selectable market. `DEFAULT` is the USD catch-all. */
const LABELS: Record<MarketCode, { code: string; label: string }> = {
  US: { code: "US", label: "United States" },
  GB: { code: "GB", label: "United Kingdom" },
  CA: { code: "CA", label: "Canada" },
  AU: { code: "AU", label: "Australia" },
  AE: { code: "AE", label: "United Arab Emirates" },
  IN: { code: "IN", label: "India" },
  DEFAULT: { code: "GLOBAL", label: "Other" },
};

export function MarketSelector({
  market,
  className = "",
  onChange,
}: {
  market: MarketCode;
  className?: string;
  onChange?: (next: MarketCode) => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<MarketCode | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  /* click-outside / Escape close */
  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = LABELS[market];
  const currency = PRICING[market].currency;

  function choose(next: MarketCode) {
    setPending(next);
    setOpen(false);
    onChange?.(next);
    // Not HttpOnly on purpose — this is the client-side override path.
    document.cookie = `${MARKET_COOKIE}=${next}; Path=/; Max-Age=${MARKET_COOKIE_MAX_AGE}; SameSite=Lax`;
    router.refresh();
  }

  useEffect(() => setPending(null), [market]);

  return (
    <div ref={wrapRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Currency: ${currency}. Change country`}
        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[13px] font-semibold text-ink transition-colors hover:border-accent"
      >
        <Globe className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
        <span className="font-mono text-[11px] font-bold text-muted">{current.code}</span>
        <span>{currency}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 9.5 12 15.5 18 9.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Country and currency"
          className="absolute right-0 z-30 mt-2 w-[232px] overflow-hidden rounded-xl border border-line bg-white py-1 shadow-soft"
        >
          {SELECTABLE_MARKETS.map((code) => {
            const item = LABELS[code];
            const selected = code === market;
            return (
              <li key={code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => choose(code)}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13.5px] transition-colors hover:bg-canvas ${
                    selected ? "font-semibold text-ink" : "text-muted"
                  }`}
                >
                  <span className="flex-none font-mono text-[11px] font-bold text-muted w-7 text-left">{item.code}</span>
                  <span className="flex-1 truncate">
                    {code === "DEFAULT" ? "Other (USD)" : item.label}
                  </span>
                  <span className="text-[12px] font-medium text-muted">
                    {PRICING[code].currency}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {pending && <span className="sr-only" role="status">Updating prices…</span>}
    </div>
  );
}
