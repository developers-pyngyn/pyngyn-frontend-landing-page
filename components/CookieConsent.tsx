"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ConsentState,
  OPEN_PREFERENCES_EVENT,
  getStoredConsent,
  saveConsent,
} from "./consent";
import { COOKIE_POLICY_URL } from "./config";

type Choices = { analytics: boolean; marketing: boolean };

const DEFAULT_CHOICES: Choices = { analytics: false, marketing: false };

const CATEGORIES: { key: keyof Choices; label: string; description: string }[] = [
  {
    key: "analytics",
    label: "Analytics & Performance",
    description:
      "Google Tag Manager and Google Analytics (GA4). Page views, load times, and referral paths — aggregated and anonymized.",
  },
  {
    key: "marketing",
    label: "Marketing & Targeting",
    description:
      "Meta/Facebook Pixel, to measure campaign performance and conversions. Never active on app.pyngyn.ai.",
  },
];

/**
 * Cookie consent banner for the marketing site. Shown on first visit (no
 * stored decision yet), and reopenable at any time via the "Cookie
 * preferences" link in the footer, which dispatches OPEN_PREFERENCES_EVENT.
 *
 * "Reject all" and "Accept all" apply immediately. "Customize" expands an
 * inline panel with a toggle per category; Strictly Necessary/Functional
 * are shown as always-on and can't be turned off here, matching
 * /cookie-policy.
 */
export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [choices, setChoices] = useState<Choices>(DEFAULT_CHOICES);

  useEffect(() => {
    setMounted(true);
    if (!getStoredConsent()) {
      setVisible(true);
    }

    function reopen() {
      const current = getStoredConsent();
      setChoices({
        analytics: current?.analytics ?? false,
        marketing: current?.marketing ?? false,
      });
      setExpanded(true);
      setVisible(true);
    }

    window.addEventListener(OPEN_PREFERENCES_EVENT, reopen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, reopen);
  }, []);

  function close() {
    setVisible(false);
    setExpanded(false);
  }

  function commit(next: Choices) {
    saveConsent(next);
    close();
  }

  function toggle(key: keyof Choices) {
    setChoices((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  // Server render and first client render both return null — no hydration
  // mismatch — then the banner appears once we know whether a decision is
  // already on file.
  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-line bg-white px-5 py-5 shadow-soft sm:px-7"
    >
      <div className="mx-auto w-full max-w-[1180px]">
        {!expanded ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[640px] text-[13.5px] leading-relaxed text-muted">
              We use Strictly Necessary cookies to run this site, and, only with your
              permission, Analytics and Marketing cookies to understand traffic and measure
              campaigns. See our{" "}
              <Link href={COOKIE_POLICY_URL} className="font-semibold text-accent hover:underline">
                Cookie Policy
              </Link>{" "}
              for details.
            </p>
            <div className="flex flex-none flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => commit({ analytics: false, marketing: false })}
                className="btn btn-ghost px-5 py-2.5 text-[13.5px]"
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="btn btn-ghost px-5 py-2.5 text-[13.5px]"
              >
                Customize
              </button>
              <button
                type="button"
                onClick={() => commit({ analytics: true, marketing: true })}
                className="btn btn-accent px-5 py-2.5 text-[13.5px]"
              >
                Accept all
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-[17px] font-semibold text-ink">Cookie preferences</h2>
                <p className="mt-1 text-[13px] text-muted">
                  Strictly Necessary and Functional storage are always active and can&apos;t be
                  turned off here. Choose what else you&apos;re comfortable with.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                aria-label="Back"
                className="flex-none rounded-full p-1.5 text-muted hover:bg-canvas hover:text-ink"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="mt-4 divide-y divide-line rounded-2xl border border-line">
              <div className="flex items-center justify-between gap-4 px-4 py-3.5">
                <div>
                  <p className="text-[14px] font-semibold text-ink">Strictly Necessary</p>
                  <p className="mt-0.5 text-[12.5px] text-muted">
                    Keeps core site features working (promo timers, roadmap votes).
                  </p>
                </div>
                <span className="flex-none rounded-full bg-canvas px-3 py-1 text-[11.5px] font-semibold text-muted">
                  Always on
                </span>
              </div>

              {CATEGORIES.map((c) => (
                <div key={c.key} className="flex items-center justify-between gap-4 px-4 py-3.5">
                  <div className="max-w-[440px]">
                    <p className="text-[14px] font-semibold text-ink">{c.label}</p>
                    <p className="mt-0.5 text-[12.5px] text-muted">{c.description}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={choices[c.key]}
                    aria-label={c.label}
                    onClick={() => toggle(c.key)}
                    className={`relative h-6 w-11 flex-none rounded-full transition-colors ${
                      choices[c.key] ? "bg-accent" : "bg-line"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        choices[c.key] ? "translate-x-[22px]" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap justify-end gap-2.5">
              <button
                type="button"
                onClick={() => commit({ analytics: false, marketing: false })}
                className="btn btn-ghost px-5 py-2.5 text-[13.5px]"
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={() => commit(choices)}
                className="btn btn-primary px-5 py-2.5 text-[13.5px]"
              >
                Save preferences
              </button>
              <button
                type="button"
                onClick={() => commit({ analytics: true, marketing: true })}
                className="btn btn-accent px-5 py-2.5 text-[13.5px]"
              >
                Accept all
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Re-exported so callers only need one import for the type.
export type { ConsentState };
