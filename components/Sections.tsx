"use client";

import Link from "next/link";
import { Reveal } from "./Reveal";
import { PricingTiers } from "./PricingTiers";
import type { MarketCode } from "@/lib/pricing/config";
import { INTEGRATIONS_URL, ROI_URL } from "./config";

// Section label pill with an accent dot (Apptics style).
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow">
      <span className="eyebrow-dot" aria-hidden="true" />
      {children}
    </span>
  );
}

export function Proof() {
  // Honest positioning strip: the industries PYNGYN is built for, not a
  // claim that named companies are customers. Replaces the previous
  // fabricated logo wall (see handoff §9). Each pill links to its solutions
  // page — no dead-end industries without a corresponding page (removed
  // "IT services", which had no /solutions route).
  const industries: [string, string][] = [
    ["Consulting", "/solutions/consultants"],
    ["CA & accounting", "/solutions/accountants"],
    ["Agencies", "/solutions/creative-services"],
    ["Legal", "/solutions/lawyers"],
    ["Architecture", "/solutions/architects"],
  ];
  return (
    <section id="proof" className="section-tight">
      <div className="wrap">
        <Reveal>
          <p className="mb-7 text-center text-sm text-muted">
            Built for professional-services and consulting firms
          </p>
        </Reveal>
        <Reveal i={1}>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
            {industries.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="rounded-full border border-line bg-white px-4 py-1.5 text-[14px] font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {label}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Problem() {
  const pains: [string, string][] = [
    ["Clients in the dark", "Clients can't see anything without asking, so they ask constantly. \u201CAny update?\u201D \u201CDid you get my email?\u201D, and the work stops while you answer."],
    ["Clients feel forgotten", "Firms rarely lose clients over the work. They lose them because clients feel ignored between conversations, never sure what's happening or what comes next."],
    ["Email everywhere", "Documents, approvals, and decisions are scattered across inboxes and WhatsApp, unsecured, untraceable, and impossible to find when you need them."],
    ["Decision fog", "A scope change agreed six months ago affects today's delivery. Nobody remembers what was decided, why, or who approved it."],
    ["Budget blindness", "A partner does not know if a project is profitable until the invoice goes out. By then the overrun has already happened."],
    ["Knowledge walks out", "A senior leaves and takes five years of client context with them. Nobody wrote it down. The next engagement starts from zero."],
  ];
  return (
    <section className="section">
      <div className="wrap">
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="title mt-3 max-w-[720px]">Your clients are in the dark.</h2>
          <p className="lead mt-4 max-w-[620px]">
            Most firms still run client communication through email. Clients can&apos;t see
            anything without asking, so you become the bottleneck between them and their
            own information.
          </p>
        </Reveal>

        {/* Joined-cell 2x3 grid (gap creates the dividing lines) */}
        <div className="mt-[46px] overflow-hidden rounded-2xl border border-line bg-line">
          <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {pains.map(([title, body], i) => (
              <Reveal i={i} key={title}>
                <div className="h-full bg-white p-8">
                  <div className="mb-5 font-mono text-[13px] font-medium text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mb-3 font-display text-[22px] font-semibold italic tracking-[-0.01em]">
                    {title}
                  </h3>
                  <p className="text-[15.5px] leading-relaxed text-muted">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Benefits() {
  const items: [string, string, string][] = [
    ["◈", "Clients stop chasing you", "Every client gets a branded portal where they see status, documents, and approvals 24/7, so the \u201Cany update?\u201D emails stop and you stop being the bottleneck."],
    ["✶", "You look buttoned-up", "A white-labeled portal in your firm's name makes every client feel informed and in control. Clients leave firms that ignore them; this keeps them close."],
    ["◉", "Nothing runs on email", "Documents, approvals, and messages live in one secure place per client (encrypted, audit-trailed, and isolated), instead of scattered across unsecured inboxes."],
  ];
  return (
    <section id="features" className="section">
      <div className="wrap">
        <Reveal>
          <div className="text-center">
            <Eyebrow>Why PYNGYN</Eyebrow>
            <h2 className="title mt-3">Three reasons firms switch.</h2>
          </div>
        </Reveal>
        <div className="mt-[46px] grid gap-[22px] md:grid-cols-3">
          {items.map(([icon, title, body], i) => (
            <Reveal i={i} key={title}>
              <div className="card h-full">
                <div className="mb-[18px] grid h-[46px] w-[46px] place-items-center rounded-xl bg-accent-lt text-[22px] text-accent" aria-hidden="true">
                  {icon}
                </div>
                <h3 className="mb-2.5 font-display text-[21px] font-semibold">{title}</h3>
                <p className="text-[15.5px] text-muted">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps: [string, string][] = [
    ["Create the Clientspace", "Spin up a branded portal for a client in a couple of clicks, your logo, your colors, your domain."],
    ["Invite the client", "Send a magic link. They click once and they're in, no password, no setup on their end."],
    ["They self-serve, 24/7", "Status, documents, approvals, and invoices are all there. The \u201Cany update?\u201D emails stop, and your team keeps the picture current from Workspace."],
  ];
  return (
    <section id="how" className="section">
      <div className="wrap">
        <Reveal>
          <div className="text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="title mt-3">A client portal live in minutes.</h2>
          </div>
        </Reveal>
        <div className="mt-[50px] grid gap-px overflow-hidden rounded-[20px] border border-line bg-line md:grid-cols-3">
          {steps.map(([title, body], i) => (
            <Reveal i={i} key={title}>
              <div className="h-full bg-white p-8">
                <span className="index-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mb-2 mt-5 text-[19px] font-bold">{title}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  // Representative, role-only testimonials written for the professional-services
  // relaunch. They carry NO invented names and no fabricated metrics. Treat them
  // as illustrative placeholder copy and replace each with a real, attributable
  // customer quote (with permission) before publishing — see handoff note.
  const data: { quote: string; role: string }[] = [
    {
      quote:
        "We finally see whether an engagement is profitable while it's running, not after the invoice. We price and staff client work completely differently now.",
      role: "Partner, advisory firm",
    },
    {
      quote:
        "Clients open their own Clientspace and see exactly where things stand without emailing us. Our partner review stopped being a status-chasing meeting.",
      role: "Managing Partner, accounting firm",
    },
    {
      quote:
        "Internal work and client work finally live in one place. When a senior leaves, five years of client context doesn't walk out the door with them.",
      role: "Operations lead, consulting firm",
    },
  ];
  return (
    <section className="section">
      <div className="wrap">
        <Reveal>
          <div className="text-center">
            <Eyebrow>From the firms we build for</Eyebrow>
            <h2 className="title mt-3">Made for how services firms run.</h2>
            <p className="lead mx-auto mt-4 max-w-[640px]">
              How professional-services and consulting firms put Clientspace and Workspace
              to work. Roles only, no names.
            </p>
          </div>
        </Reveal>
        <div className="mt-[46px] grid gap-[22px] md:grid-cols-3">
          {data.map(({ quote, role }, i) => (
            <Reveal i={i} key={role}>
              <figure className="card flex h-full flex-col">
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Professional services
                </span>
                <blockquote className="mt-3 flex-1 text-[16.5px] leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-3.5 text-[13.5px] text-muted">
                  {role}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Metrics() {
  // Illustrative figures derived from the free ROI calculator's default
  // assumptions (about 35% of billable time lost to coordination, a
  // conservative 50% win-back), NOT customer averages. Each is reproducible
  // in the calculator. Replaces the previous fabricated outcome metrics
  // (see handoff §9).
  const m: [string, string][] = [
    ["~35%", "of billable time typically lost to coordination"],
    ["~7 hrs", "a week back per person, at a conservative win-back"],
    ["~38 days", "of billable time back per person each year"],
  ];
  return (
    <section className="section-tight">
      <div className="wrap">
        <div className="rounded-[28px] bg-accent px-8 py-14 shadow-soft">
          <div className="grid gap-[18px] sm:grid-cols-2 md:grid-cols-3">
            {m.map(([stat, label], i) => (
              <Reveal i={i} key={label}>
                <div className="text-center">
                  <div className="font-display text-[46px] font-semibold leading-none text-white">
                    {stat}
                  </div>
                  <div className="mt-2 text-sm text-white/75">{label}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal i={3}>
            <p className="mx-auto mt-10 max-w-[700px] text-center text-[13px] leading-relaxed text-white/70">
              Illustrative figures from our free ROI calculator using default assumptions, not
              customer averages.{" "}
              <a
                href={ROI_URL}
                className="font-semibold text-white underline underline-offset-2"
              >
                Model your own firm
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Compare() {
  const rows: [string, string, string][] = [
    ["Build the plan", "You enter every task by hand", "AI drafts it from your goal"],
    ["Keep status current", "Manual updates & chasing", "Generated automatically"],
    ["Spot risk", "You notice when it's late", "Flagged before it slips"],
    ["Time to value", "Hours of setup", "Minutes"],
  ];
  return (
    <section className="section">
      <div className="wrap max-w-[920px]">
        <Reveal>
          <div className="mb-10 text-center">
            <Eyebrow>The difference</Eyebrow>
            <h2 className="title mt-3">Why teams leave their old tracker.</h2>
          </div>
        </Reveal>
        <Reveal i={1}>
          <div className="overflow-hidden rounded-2xl border border-line">
            <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse sm:table-auto">
              <caption className="sr-only">
                Feature comparison between a traditional project tracker and PYNGYN
              </caption>
              <thead>
                <tr className="bg-[#fafafe] text-left">
                  <th scope="col" className="w-[24%] border-b border-line break-words px-3.5 py-4 text-[13px] sm:text-[15px] font-semibold sm:w-auto sm:px-5">
                    <span className="sr-only">Capability</span>
                  </th>
                  <th scope="col" className="border-b border-line break-words px-3.5 py-4 text-center text-[13px] sm:text-[15px] font-semibold sm:px-5"><span className="sm:hidden">Old tracker</span><span className="hidden sm:inline">Traditional tracker</span></th>
                  <th scope="col" className="border-b border-line bg-accent-lt break-words px-3.5 py-4 text-center text-[13px] sm:text-[15px] font-semibold sm:px-5">PYNGYN</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([feature, old, neu], idx) => (
                  <tr key={feature}>
                    <th scope="row" className={`break-words px-3.5 py-4 text-left text-[13px] sm:text-[15px] font-semibold sm:px-5 ${idx < rows.length - 1 ? "border-b border-line" : ""}`}>
                      {feature}
                    </th>
                    <td className={`break-words px-3.5 py-4 text-center text-[13px] sm:text-[15px] text-muted sm:px-5 ${idx < rows.length - 1 ? "border-b border-line" : ""}`}>
                      <span className="text-[#b9281f]" aria-hidden="true">✕</span> {old}
                    </td>
                    <td className={`bg-accent-lt break-words px-3.5 py-4 text-center text-[13px] sm:text-[15px] font-semibold sm:px-5 ${idx < rows.length - 1 ? "border-b border-line" : ""}`}>
                      <span className="text-positive" aria-hidden="true">✓</span> {neu}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Integrations() {
  const apps = ["Slack", "QuickBooks", "Google", "Figma", "Zoom", "Xero", "Salesforce", "DocuSign"];
  return (
    <section className="section-tight">
      <div className="wrap text-center">
        <Reveal>
          <h2 className="title text-[clamp(26px,3vw,34px)]">Works with the tools you already use.</h2>
        </Reveal>
        <Reveal i={1}>
          <div className="mt-[34px] flex flex-wrap items-center justify-center gap-x-10 gap-y-5 opacity-70">
            {apps.map((a) => (
              <span key={a} className="text-[17px] font-bold tracking-wide text-[#9aa0ad]">
                {a}
              </span>
            ))}
          </div>
          <a href={INTEGRATIONS_URL} className="mt-7 inline-block font-semibold text-accent">
            See all integrations →
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Security() {
  const items = ["SOC 2 aligned", "GDPR compliant", "Encrypted in transit & at rest", "SSO / SAML"];
  return (
    <section className="section">
      <div className="wrap max-w-[800px] text-center">
        <Reveal>
          <Eyebrow>Security &amp; trust</Eyebrow>
          <h2 className="title mt-3 text-[clamp(26px,3vw,36px)]">Enterprise-grade, by default.</h2>
          <p className="lead mx-auto mt-4">
            Your data is encrypted, never sold, and never used to train models without your
            consent.
          </p>
        </Reveal>
        <div className="mt-[30px] flex flex-wrap items-center justify-center gap-3.5">
          {items.map((x, i) => (
            <Reveal i={i} key={x}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-card"><span aria-hidden="true" className="text-positive">✓</span> {x}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing({
  showHeader = true,
  market,
}: {
  showHeader?: boolean;
  /** resolved server-side so the currency is right in the initial HTML */
  market?: MarketCode;
}) {
  return (
    <section id="pricing" className="section">
      <div className="wrap">
        {showHeader && (
          <Reveal>
            <div className="text-center">
              <Eyebrow>Pricing</Eyebrow>
              <h2 className="title mt-3">Pricing that scales with your team.</h2>
              <p className="lead mx-auto mt-4">
                Flexible, transparent pricing built for teams of all sizes.
              </p>
            </div>
          </Reveal>
        )}
        <PricingTiers className={showHeader ? "mt-[46px]" : ""} market={market} />
      </div>
    </section>
  );
}
