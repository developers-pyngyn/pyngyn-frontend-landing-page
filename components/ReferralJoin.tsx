"use client";

import { useState } from "react";
import { SIGNUP_URL } from "./config";

// Builds an illustrative referral link from the person's email/handle.
// In production, your backend issues a unique code and tracks conversions.
function makeCode(input: string) {
  const base = input.split("@")[0].replace(/[^a-zA-Z0-9]/g, "").toLowerCase().slice(0, 10) || "friend";
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base}-${suffix}`;
}

export function ReferralJoin() {
  const [email, setEmail] = useState("");
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  function generate() {
    if (!valid) {
      setError("Enter a valid email to get your link.");
      return;
    }
    setError(null);
    const code = makeCode(email.trim());
    const origin = typeof window !== "undefined" ? window.location.origin : "https://pyngyn.ai";
    setLink(`${origin}/?ref=${code}`);
    setCopied(false);
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
              className="flex-none rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white shadow-cta transition-transform hover:-translate-y-0.5 hover:bg-accent-dk"
            >
              Get my link
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
            This is your shareable link. Tracking and payouts are managed in your{" "}
            <a href={SIGNUP_URL} className="font-semibold text-accent">PYNGYN account</a>.
          </p>
        </>
      )}
    </div>
  );
}
