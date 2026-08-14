"use client";

/*
 * Footer "Get in touch" column: contact details plus the growth-tips
 * newsletter form, which POSTs to /api/subscribe (that route emails
 * sales@pyngyn.com and sets replyTo to the subscriber).
 *
 * The reference design sits on a dark footer; this site's footer is white
 * (see Footer.tsx: `bg-white`), so the same treatment is expressed with the
 * repo's light-surface tokens — muted heading, ink-tinted pill, accent
 * button — rather than white-on-dark alphas that would be invisible here.
 */

import { useEffect, useState } from "react";

/** The site's accent/CTA token (tailwind.config.ts `accent`). Change here only. */
const ACCENT = "#4f46e5";

export const contactData = {
  heading: "Get in touch",
  email: "sales@pyngyn.com",
  phones: [
    { label: "+1 6282286124", href: "tel:+16282286124" },
    /* Second line is parked until it goes live — uncomment to show it again.
    { label: "+91 91200 05593", href: "tel:+919120005593" },
    */
  ],
  newsletter: "",
  placeholder: "you@company.com",
  submitLabel: "Subscribe",
  emailLabel: "Email address",
  invalid: "Enter a valid email address.",
  /* rendered as: prefix + <a>sales@pyngyn.com</a> + "." */
  failedPrefix: "Something went wrong. Try again or email ",
  success: "Thanks — you're on the list.",
};

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ArrowRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h13M12.5 5.5 19 12l-6.5 6.5" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="animate-spin" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={2.5} opacity={0.3} fill="none" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={ACCENT}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.5 10 17.5 19 7" />
    </svg>
  );
}

export function GetInTouch() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const loading = status === "loading";
  const showInvalid = invalid;

  /* fade the success line in on the frame after it mounts (reduced motion is
     neutralised by the global rule in globals.css) */
  useEffect(() => {
    if (status !== "success") {
      setFadeIn(false);
      return;
    }
    const id = requestAnimationFrame(() => setFadeIn(true));
    return () => cancelAnimationFrame(id);
  }, [status]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setInvalid(true);
      setStatus("idle");
      return;
    }

    setInvalid(false);
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe/", {  // trailing slash: next.config has trailingSlash: true
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: value,
          company,
          path: typeof window === "undefined" ? "" : window.location.pathname,
          referrer: typeof document === "undefined" ? "" : document.referrer,
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !data?.ok) throw new Error("failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  const pillBorder = showInvalid ? "#FF6B6B" : "rgba(15,17,21,0.12)";

  return (
    <section
      aria-labelledby="get-in-touch-heading"
      className="w-full max-w-none md:max-w-[360px]"
    >
      {/* heading and links match the sibling footer columns exactly */}
      <h4 id="get-in-touch-heading" className="mb-3 text-[14px] font-bold text-ink">
        {contactData.heading}
      </h4>

      <ul className="flex flex-col">
        <li>
          <a
            href={`mailto:${contactData.email}`}
            className="block py-1.5 transition-colors duration-150 hover:text-accent"
          >
            {contactData.email}
          </a>
        </li>
        {contactData.phones.map((phone) => (
          <li key={phone.href}>
            <a
              href={phone.href}
              className="block py-1.5 transition-colors duration-150 hover:text-accent"
            >
              {phone.label}
            </a>
          </li>
        ))}
      </ul>

      {/* contact rows → 24px → newsletter line → 14px → form */}
      <p className="mt-6 leading-relaxed text-ink">{contactData.newsletter}</p>

      {/* reserved so the footer doesn't jump when the form swaps for the
          success line */}
      <div className="mt-3.5 min-h-[74px]">
        {status === "success" ? (
          <p
            className={`flex items-center gap-2 text-[15px] text-ink transition-opacity duration-300 ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
          >
            <Check />
            {contactData.success}
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <label htmlFor="get-in-touch-email" className="sr-only">
              {contactData.emailLabel}
            </label>

            {/* Focus shows on the whole pill (focus-within), not on the inner
                input box — the input's own outline is suppressed below so the
                ring can't appear inset and misaligned from the left edge. */}
            <div
              className="flex h-12 items-center overflow-hidden rounded-full border bg-[rgba(15,17,21,0.03)] transition-shadow focus-within:border-[rgba(15,17,21,0.28)] focus-within:ring-2 focus-within:ring-accent/30"
              style={{ borderColor: pillBorder }}
            >
              <input
                id="get-in-touch-email"
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                disabled={loading}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (invalid) setInvalid(false);
                  if (status === "error") setStatus("idle");
                }}
                placeholder={contactData.placeholder}
                aria-invalid={showInvalid || undefined}
                aria-describedby={showInvalid ? "get-in-touch-error" : undefined}
                className="h-full min-w-0 flex-1 bg-transparent pl-[14px] pr-1.5 text-[15px] leading-none text-ink outline-none focus:outline-none focus-visible:outline-none placeholder:text-[#6b7280] disabled:opacity-60"
              />

              {/* honeypot: visually hidden but not display:none, so bots fill it */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="sr-only"
              />

              <button
                type="submit"
                aria-label={contactData.submitLabel}
                aria-busy={loading || undefined}
                disabled={loading}
                className="mr-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full text-white transition-[transform,filter] duration-150 hover:scale-105 hover:brightness-110 active:scale-[0.97] disabled:hover:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100"
                style={{ background: ACCENT }}
              >
                {loading ? <Spinner /> : <ArrowRight />}
              </button>
            </div>

            <div aria-live="polite">
              {showInvalid ? (
                <p id="get-in-touch-error" className="mt-2 text-[13px] text-[#FF6B6B]">
                  {contactData.invalid}
                </p>
              ) : null}
              {status === "error" ? (
                <p className="mt-2 text-[13px] text-[#FF6B6B]">
                  {contactData.failedPrefix}
                  <a href={`mailto:${contactData.email}`} className="underline">
                    {contactData.email}
                  </a>
                  .
                </p>
              ) : null}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
