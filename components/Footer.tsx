"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "./Reveal";
import { openCookiePreferences } from "./consent";
import { GetInTouch } from "./footer/GetInTouch";
import {
  SIGNUP_URL,
  DEMO_URL,
  BENEFITS_URL,
  CUSTOMERS_URL,
  PRICING_URL,
  BLOG_URL,
  ABOUT_URL,
  CAREERS_URL,
  PRIVACY_URL,
  TERMS_URL,
  REFUND_URL,
  COOKIE_POLICY_URL,
  DPA_URL,
  SUBPROCESSORS_URL,
  SOCIAL_X,
  SOCIAL_LINKEDIN,
  SOCIAL_REDDIT,
  SOCIAL_FACEBOOK,
  SOCIAL_YOUTUBE,
  SOCIAL_INSTAGRAM,
  INTEGRATIONS_URL,
  CHANGELOG_URL,
  GUIDES_URL,
  STATUS_URL,
  KB_URL,
  ROADMAP_URL,
  REFER_URL,
  COMPARE_URL,
  COMPETITORS,
  TOOLS_URL,
  ROI_URL,
  UTILIZATION_URL,
  COST_ESTIMATOR_URL,
} from "./config";

const faqs: [string, string][] = [
  ["What happens in the demo?", "A 30-minute guided walkthrough where we run PYNGYN on a project like yours, with no generic slideshow."],
  ["Do I have to trust the AI's plan?", "No. Every plan is fully editable. PYNGYN drafts; you decide."],
  ["Can I import from my current tool?", "Yes. One-click import from common trackers, with mapping handled for you."],
  ["Is my data used to train AI?", "Not without your explicit consent. Your data stays yours."],
  ["Can I just try it instead of booking a demo?", "Absolutely. Start a 7-day free trial with no credit card required. Explore our Pro and Business practice plans, or book a demo for a personalized firm walkthrough."],
];

export function FAQ() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="faq" className="section">
      <div className="wrap max-w-[780px]">
        <Reveal>
          <div className="mb-[30px] text-center">
            <span className="eyebrow">FAQ</span>
            <h2 className="title mt-3">Questions, answered.</h2>
          </div>
        </Reveal>
        <Reveal i={1}>
          <div>
            {faqs.map(([q, a], i) => (
              <div key={q} className="border-b border-line">
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center justify-between py-5 text-left text-[17px] font-semibold"
                >
                  {q}
                  <span
                    className="text-[22px] text-accent transition-transform duration-200"
                    style={{ transform: open === i ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      className="overflow-hidden text-muted"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="pb-5">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCTA({
  eyebrow = "Ready when you are",
  headline = "Stop managing the tool. Start shipping the work.",
  body = "See PYNGYN run a real project in 30 minutes, and let AI handle the project management busywork.",
  primaryLabel = "Book a demo →",
  primaryHref = DEMO_URL,
  secondaryLabel = "Start free",
  secondaryHref = SIGNUP_URL,
  note = "30-minute walkthrough · Tailored to your team · No commitment",
}: {
  eyebrow?: string;
  headline?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  note?: string;
} = {}) {
  return (
    <section id="demo" className="section">
      <div className="wrap">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-line bg-white px-7 py-[72px] text-center shadow-card">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent-lt opacity-70 blur-[80px]" aria-hidden="true" />
            <span className="eyebrow relative">{eyebrow}</span>
            <h2 className="title relative mx-auto mt-3.5 max-w-[680px] text-[clamp(30px,4.4vw,48px)]">
              {headline}
            </h2>
            <p className="lead relative mx-auto mt-[18px]">
              {body}
            </p>
            <div className="relative mt-[30px] flex flex-wrap items-center justify-center gap-3.5">
              <a href={primaryHref} className="btn btn-primary">
                {primaryLabel}
              </a>
              <a href={secondaryHref} className="btn btn-ghost">{secondaryLabel}</a>
            </div>
            <p className="relative mt-4 text-sm text-muted">
              {note}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type FooterLink = { label: string; href?: string }; // no href = "Soon" (muted, not clickable)
type FooterGroup = { heading: string; links: FooterLink[] };

export function Footer() {
  // Each column holds stacked groups balanced to 6-11 links each so no column shoots down or leaves empty space.
  const columns: FooterGroup[][] = [
    // Column 1: Product & Get started (7 links)
    [
      {
        heading: "Product",
        links: [
          { label: "ClientSpace", href: "/clientspace" },
          { label: "Client Portal", href: "/client-portal-for-accounting-firms" },
          { label: "Integrations", href: INTEGRATIONS_URL },
          { label: "Benefits", href: BENEFITS_URL },
          { label: "Pricing", href: PRICING_URL },
        ],
      },
      {
        heading: "Get started",
        links: [
          { label: "Book a demo", href: DEMO_URL },
          { label: "Start free trial", href: SIGNUP_URL },
        ],
      },
    ],
    // Column 2: Solutions & Client Portals (10 links)
    [
      {
        heading: "Practice Solutions",
        links: [
          { label: "Chartered Accountants", href: "/solutions/accountants" },
          { label: "Tax Teams", href: "/solutions/tax-teams" },
          { label: "Audit Teams", href: "/solutions/audit-teams" },
          { label: "Compliance Teams", href: "/solutions/compliance-teams" },
        ],
      },
      {
        heading: "Client Portals",
        links: [
          { label: "CA Client Portal", href: "/client-portal-for-accounting-firms" },
          { label: "Secure Client Portal", href: "/secure-client-portal" },
          { label: "Client Portal Software", href: "/client-portal-software" },
          { label: "Branded Portal", href: "/clientspace/branded-portal" },
          { label: "Document Vault", href: "/clientspace/secure-documents" },
          { label: "Client Approvals", href: "/clientspace/approvals" },
        ],
      },
    ],
    // Column 3: Compare (6 links)
    [
      {
        heading: "Compare",
        links: [
          ...COMPETITORS.map((c) => ({ label: `vs ${c.name}`, href: `${COMPARE_URL}/${c.slug}` })),
          { label: "All comparisons", href: COMPARE_URL },
        ],
      },
    ],
    // Column 4: Resources & Practice Tools (11 links)
    [
      {
        heading: "Resources",
        links: [
          { label: "Practice Blog", href: BLOG_URL },
          { label: "Setup Guides", href: GUIDES_URL },
          { label: "Knowledge Base", href: KB_URL },
          { label: "Product Roadmap", href: ROADMAP_URL },
          { label: "Changelog", href: CHANGELOG_URL },
          { label: "System Status", href: STATUS_URL },
          { label: "Practice FAQ", href: "/#faq" },
        ],
      },
      {
        heading: "Practice Tools",
        links: [
          { label: "All Free Tools", href: TOOLS_URL },
          { label: "ROI Calculator", href: ROI_URL },
          { label: "Team Utilization", href: UTILIZATION_URL },
          { label: "Cost & Margin Estimator", href: COST_ESTIMATOR_URL },
        ],
      },
    ],
    // Column 5: Company & Legal (9 links)
    [
      {
        heading: "Company",
        links: [
          { label: "About Us", href: ABOUT_URL },
          { label: "Founder Story", href: "/about/founder-story" },
          { label: "Customer Stories", href: CUSTOMERS_URL },
          { label: "Careers", href: CAREERS_URL },
          { label: "Refer & Earn", href: REFER_URL },
          { label: "Contact Us", href: DEMO_URL },
        ],
      },
      {
        heading: "Legal",
        links: [
          { label: "Privacy Policy", href: PRIVACY_URL },
          { label: "Terms of Service", href: TERMS_URL },
          { label: "Refund Policy", href: REFUND_URL },
        ],
      },
    ],
  ];

  const compliance = ["SOC 2 aligned", "DPDP (India)", "GDPR", "Encrypted", "SSO / SAML"];
  const legal: [string, string][] = [
    ["Privacy Policy", PRIVACY_URL],
    ["Terms of Service", TERMS_URL],
    ["Cookie Policy", COOKIE_POLICY_URL],
    ["DPA", DPA_URL],
    ["Subprocessors", SUBPROCESSORS_URL],
    ["Refund Policy", REFUND_URL],
  ];

  const renderLink = ({ label, href }: FooterLink) => {
    if (!href) {
      // Aspirational page that doesn't exist yet — shown but not a dead link.
      return (
        <span key={label} className="flex items-center gap-2 py-1.5 text-muted/60">
          {label}
          <span className="rounded-full bg-line px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
            Soon
          </span>
        </span>
      );
    }
    return href.startsWith("http") ? (
      <a key={label} href={href} className="block py-1.5 hover:text-accent">
        {label}
      </a>
    ) : (
      <Link key={label} href={href} prefetch={false} className="block py-1.5 hover:text-accent">
        {label}
      </Link>
    );
  };

  return (
    <footer className="border-t border-line bg-white pt-16 pb-10 text-sm text-muted">
      <div className="wrap">
        {/* Logo + columns + Get in touch */}
        <div className="grid items-start gap-10 sm:grid-cols-2 md:grid-cols-3 lg:gap-6 xl:gap-8 lg:grid-cols-[minmax(0,1.2fr)_repeat(5,minmax(0,1fr))_minmax(0,1.9fr)]">
          <div>
            <Link href="/" className="mb-4 inline-block" aria-label="pyngyn home">
              <Image src="/logo.webp" alt="pyngyn" width={150} height={40} className="h-8 w-auto" />
            </Link>
            <p className="max-w-[230px] leading-relaxed">
              The practice operating system for modern accounting &amp; CA firms.
            </p>
            <p className="mt-2 text-[11.5px] leading-relaxed text-muted/80">
              DPIIT Recognized Startup<br />
              ISO 9001:2015 Certified (QMS)
            </p>
          </div>

          {columns.map((groups, i) => (
            <div key={i} className="flex flex-col gap-7">
              {groups.map((g) => (
                <div key={g.heading}>
                  <h4 className="mb-2.5 text-[14px] font-bold text-ink">{g.heading}</h4>
                  <div className="flex flex-col">{g.links.map(renderLink)}</div>
                </div>
              ))}
            </div>
          ))}

          {/* Get in touch column */}
          <GetInTouch />
        </div>

        {/* Social + compliance row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-7 sm:flex-row">
          <div className="flex items-center gap-3">
            {[
              ["X (formerly Twitter)", SOCIAL_X, "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"],
              ["LinkedIn", SOCIAL_LINKEDIN, "M4.98 3.5a2 2 0 11-.02 4 2 2 0 01.02-4zM3 8.98h4V21H3zM10 8.98h3.8v1.64h.05c.53-1 1.83-2.06 3.76-2.06 4.02 0 4.76 2.65 4.76 6.1V21h-4v-5.36c0-1.28-.02-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.83V21h-4z"],
              ["Reddit", SOCIAL_REDDIT, "M22 12a2.06 2.06 0 00-3.5-1.43 10 10 0 00-5.2-1.65l.9-4.16 2.9.65a1.5 1.5 0 101.5-1.55 1.5 1.5 0 00-1.34.83l-3.24-.72a.4.4 0 00-.47.3l-1 4.65a10.1 10.1 0 00-5.27 1.65 2.06 2.06 0 10-2.27 3.4 4 4 0 00-.05.6c0 3.04 3.54 5.5 7.9 5.5s7.9-2.46 7.9-5.5a4 4 0 00-.05-.6A2.06 2.06 0 0022 12zM7 13.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm8.3 4.05c-1 1-3.07 1.08-3.3 1.08-.23 0-2.3-.07-3.3-1.08a.4.4 0 01.57-.57c.63.63 2 .86 2.73.86.73 0 2.1-.23 2.73-.86a.4.4 0 11.57.57zm-.3-2.55a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"],
              ["Facebook", SOCIAL_FACEBOOK, "M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z"],
              ["YouTube", SOCIAL_YOUTUBE, "M23 7.5a3 3 0 00-2.1-2.1C19 4.9 12 4.9 12 4.9s-7 0-8.9.5A3 3 0 001 7.5 31 31 0 00.5 12 31 31 0 001 16.5a3 3 0 002.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 002.1-2.1A31 31 0 0023.5 12 31 31 0 0023 7.5zM9.75 15.5v-7l6 3.5z"],
              ["Instagram", SOCIAL_INSTAGRAM, "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.18A6.66 6.66 0 1018.66 12 6.66 6.66 0 0012 5.34zm0 10.99A4.33 4.33 0 1116.33 12 4.33 4.33 0 0112 16.33zm6.92-11.25a1.56 1.56 0 11-1.55-1.55 1.56 1.56 0 011.55 1.55z"],
            ].map(([name, url, d]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={d} />
                </svg>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {compliance.map((c) => (
              <span
                key={c}
                className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[12px] font-semibold text-ink"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-positive">
                  <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom legal bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-line pt-5 text-[12.5px] md:flex-row">
          <span className="text-center md:text-left">© 2026 PYNGYN, a product of VIMOVI GlobalTech Private Limited. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5">
            {legal.map(([label, href]) => (
              <Link key={label} href={href} prefetch={false} className="hover:text-accent">
                {label}
              </Link>
            ))}
            <button
              type="button"
              onClick={openCookiePreferences}
              className="hover:text-accent"
            >
              Cookie preferences
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}


