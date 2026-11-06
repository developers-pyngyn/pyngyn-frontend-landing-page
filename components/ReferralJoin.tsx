"use client";

import { useEffect, useRef, useState } from "react";
import { SIGNIN_URL } from "./config";
import { cleanRefCode, makeReferralCode, referralLink } from "@/lib/referral";

// Pyngyn saves referral codes through one public endpoint (a Supabase Edge Function),
// reached with a plain fetch. No Supabase library or keys belong on this site.
const REFERRAL_ENDPOINT = process.env.NEXT_PUBLIC_REFERRAL_ENDPOINT;
// Cloudflare Turnstile, invisible mode. Without a site key no captcha is sent.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

const INVALID_EMAIL = "Enter a valid email to get your link.";

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  execute: (id: string) => void;
  reset: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

type RegisterResult =
  | { kind: "ok"; code: string | null }
  | { kind: "invalid_email" }
  | { kind: "rate_limited" }
  | { kind: "failed" };

async function register(email: string, captcha: string | null): Promise<RegisterResult> {
  if (!REFERRAL_ENDPOINT) return { kind: "failed" };
  try {
    const res = await fetch(REFERRAL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "register", email: email.trim(), ...(captcha ? { captcha } : {}) }),
      signal: AbortSignal.timeout(6000),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; code?: string; reason?: string } | null;
    if (res.status === 400 && data?.reason === "invalid_email") return { kind: "invalid_email" };
    if (res.status === 429) return { kind: "rate_limited" };
    if (!res.ok || !data?.ok) return { kind: "failed" };
    return { kind: "ok", code: cleanRefCode(data.code) };
  } catch {
    return { kind: "failed" };
  }
}

/** Loads Turnstile once and hands out a fresh token per call (null when it is off or fails). */
function useTurnstile() {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const pending = useRef<((token: string | null) => void) | null>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    const settle = (token: string | null) => {
      pending.current?.(token);
      pending.current = null;
    };
    const mount = () => {
      if (!window.turnstile || !box.current || widget.current) return;
      widget.current = window.turnstile.render(box.current, {
        sitekey: TURNSTILE_SITE_KEY,
        execution: "execute",
        callback: (token: string) => settle(token),
        "error-callback": () => settle(null),
        "expired-callback": () => settle(null),
      });
    };
    if (window.turnstile) {
      mount();
      return;
    }
    let script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = TURNSTILE_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", mount);
    return () => script?.removeEventListener("load", mount);
  }, []);

  function token(): Promise<string | null> {
    const ts = window.turnstile;
    const id = widget.current;
    if (!ts || !id) return Promise.resolve(null);
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        pending.current = null;
        resolve(null);
      }, 5000);
      pending.current = (t) => {
        clearTimeout(timer);
        resolve(t);
      };
      try {
        ts.reset(id); // a token is single-use: start a fresh challenge every time
        ts.execute(id);
      } catch {
        clearTimeout(timer);
        pending.current = null;
        resolve(null);
      }
    });
  }

  return { box, token };
}

export function ReferralJoin() {
  const [email, setEmail] = useState("");
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const retry = useRef<ReturnType<typeof setTimeout> | null>(null);
  const turnstile = useTurnstile();

  useEffect(() => () => {
    if (retry.current) clearTimeout(retry.current);
  }, []);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  async function generate() {
    if (busy) return;
    if (!valid) {
      setError(INVALID_EMAIL);
      return;
    }
    setError(null);
    setBusy(true);
    const typed = email.trim();
    const local = await makeReferralCode(typed);
    const result = await register(typed, await turnstile.token());
    setBusy(false);

    if (result.kind === "invalid_email") {
      setError(INVALID_EMAIL);
      return;
    }
    // Pyngyn's answer wins (someone with an older code keeps it). On any failure
    // the link worked out here is shown, so nobody is left without one.
    setLink(referralLink(result.kind === "ok" && result.code ? result.code : local));
    setCopied(false);
    if (result.kind === "failed" && REFERRAL_ENDPOINT) {
      if (retry.current) clearTimeout(retry.current);
      retry.current = setTimeout(async () => {
        retry.current = null;
        const again = await register(typed, await turnstile.token());
        if (again.kind === "ok" && again.code) setLink(referralLink(again.code));
      }, 10000);
    }
  }

  async function copy() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const share = (network: "x" | "linkedin" | "whatsapp" | "email") => {
    if (!link) return "#";
    const text = encodeURIComponent("I'm using PYNGYN to run client work. Get 20% off your annual plan:");
    const url = encodeURIComponent(link);
    switch (network) {
      case "x": return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
      case "linkedin": return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      case "whatsapp": return `https://wa.me/?text=${text}%20${url}`;
      case "email": return `mailto:?subject=${encodeURIComponent("20% off PYNGYN")}&body=${text}%20${url}`;
    }
  };

  return (
    <div className="rounded-[20px] border border-line bg-white p-6 shadow-card sm:p-8">
      {!link ? (
        <>
          <h3 className="font-display text-[22px] font-semibold tracking-[-0.015em]">Get your referral link</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            Enter your email and we&apos;ll create your unique link. Share it anywhere, you
            earn when a friend subscribes.
          </p>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null); }}
              onKeyDown={(e) => e.key === "Enter" && generate()}
              placeholder="you@yourfirm.com"
              aria-label="Your email"
              className="w-full rounded-full border border-line bg-white px-5 py-3.5 text-[15px] outline-none focus-visible:border-accent"
            />
            <button
              type="button"
              onClick={generate}
              disabled={busy}
              aria-busy={busy}
              className="flex-none rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white shadow-cta transition-transform hover:-translate-y-0.5 hover:bg-accent-dk disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0"
            >
              {busy ? "Getting your link…" : "Get my link"}
            </button>
          </div>
          {error && <p className="mt-2 text-[13px] font-medium text-[#dc2626]">{error}</p>}
          <p className="mt-3 text-[12.5px] text-muted">No cost to join. Earn on every paid referral.</p>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 text-[13px] font-semibold text-positive">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#e6f4ec]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            Your link is ready
          </div>
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <code className="flex-1 truncate rounded-full border border-line bg-canvas px-5 py-3.5 font-mono text-[14px] text-ink">{link}</code>
            <button
              type="button"
              onClick={copy}
              className="flex-none rounded-full bg-ink px-6 py-3.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              {copied ? "Copied ✓" : "Copy link"}
            </button>
          </div>
          <div className="mt-5">
            <span className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-muted">Share via</span>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {([["x", "X / Twitter"], ["linkedin", "LinkedIn"], ["whatsapp", "WhatsApp"], ["email", "Email"]] as const).map(([net, label]) => (
                <a
                  key={net}
                  href={share(net)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line bg-white px-4 py-2 text-[13.5px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <p className="mt-5 text-[12.5px] leading-relaxed text-muted">
            This link is always the same for your email.{" "}
            <a href={SIGNIN_URL} className="font-semibold text-accent">Sign in to Pyngyn</a> with this
            email to follow your referrals and get paid.
          </p>
        </>
      )}
      {/* Invisible Turnstile widget (renders nothing visible). */}
      <div ref={turnstile.box} aria-hidden="true" />
    </div>
  );
}
