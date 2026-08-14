import type { Metadata } from "next";
import { canonicalPriceCopy } from "@/lib/pricing/copy";
import Link from "next/link";
import { SmartInboxShowcase } from "@/components/showcase/SmartInboxShowcase";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Integrations, Security } from "@/components/Sections";
import { ProductShowcase } from "@/components/ProductShowcase";
import { StickyCTABar } from "@/components/StickyCTABar";
import { SIGNUP_URL, DEMO_URL } from "@/components/config";
import {
  OG_IMAGE,
  JsonLd,
  breadcrumbSchema,
  faqPageSchema,
  webPageSchema,
} from "@/components/schema";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

// This page is statically prerendered. Making it a per-request edge route to
// localise prices (runtime="edge" + force-dynamic + detectCountry) turned this
// heavy page into an edge Function that 500s on Cloudflare, so the on-page
// price copy uses the canonical USD figures below; per-visitor currency lives
// on /pricing and in the client-localised pricing tables.

// USD, from lib/pricing/config.ts — metadata, JSON-LD and FAQ answers are
// indexed once and must not vary by visitor.
const CANON = canonicalPriceCopy();

export const metadata: Metadata = {
  title: "Workspace | PYNGYN, the operating system for your firm",
  description:
    "Workspace is PYNGYN's operating system for professional-services firms. Run projects, track finances, log billable time, and let AI keep plans, status, and risk current automatically.",
  alternates: { canonical: "/workspace" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Workspace | PYNGYN, the operating system for your firm",
    description:
      "Run every engagement from one place: engagement health, request triage, change orders, approvals, and capacity, with AI doing the busywork.",
    url: "/workspace",
    type: "website",
  },
};

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is Workspace client-facing?",
    a: "No. Workspace is your internal command center, only your team sees it. Client Space is a separate, standalone product for giving clients a portal of their own, you can add it, or use it without Workspace at all.",
  },
  {
    q: "How is Workspace different from Client Space?",
    a: `Workspace is where your firm runs internal work: projects, finances, billable timesheets, and team management, all at ${CANON.workspace} per seat/month. Clientspace is a standalone branded client portal at ${CANON.clientspace} per seat/month with unlimited free client access, giving each client their own isolated space with client-visible tasks, approvals, and sign-off. Bundle both for ${CANON.bundle}/month.`,
  },
  {
    q: "How many people can use Workspace?",
    a: `Workspace is ${CANON.workspace} per seat per month with no seat cap. Add as many directors, managers, and ICs as your firm needs. Prices are shown in your local currency on the pricing page.`,
  },
  {
    q: "Can the AI draft client messages for a change request?",
    a: "Yes. When you review a change request, you can generate an AI draft of the client message, then edit it before anything is sent.",
  },
  {
    q: "What happens when a change request is approved?",
    a: "On approval it becomes a change order: it amends the statement of work and updates the engagement budget, so your numbers stay accurate without manual rework.",
  },
  {
    q: "How do I get my work into Workspace?",
    a: "Start from your goal and let the AI draft the plan, or build engagements directly. The point is to be running real work the same day, not setting up for weeks.",
  },
  {
    q: "What happens after the free trial?",
    a: `You can keep your firm on Workspace at ${CANON.workspace} per seat/month, and add Clientspace at ${CANON.clientspace} per seat whenever you want a client portal, or bundle both for ${CANON.bundle}/month. See the pricing page for what each plan includes.`,
  },
  {
    q: "Do you help with onboarding and support?",
    a: "Every plan includes support. Enterprise adds dedicated onboarding and migration, a named account manager, and a custom SLA.",
  },
];

// Small inline icon set (stroke = currentColor) to match the site style.
function Icon({ path }: { path: React.ReactNode }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {path}
    </svg>
  );
}
const s = { stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };


const KPIS: { label: string; blurb: string; path: React.ReactNode }[] = [
  {
    label: "Active engagements",
    blurb: "Everything in flight, in one list you can act on.",
    path: <><rect x="3" y="4" width="18" height="16" rx="2" {...s} /><path d="M7 9h10M7 13h7" {...s} /></>,
  },
  {
    label: "At budget risk",
    blurb: "Flagged the moment an engagement trends over budget.",
    path: <><path d="M12 3l9 16H3l9-16z" {...s} /><path d="M12 10v4M12 17h.01" {...s} /></>,
  },
  {
    label: "Open change requests",
    blurb: "Scope changes tracked from request to change order.",
    path: <><path d="M4 7h11l-3-3M20 17H9l3 3" {...s} /></>,
  },
  {
    label: "Pending approvals",
    blurb: "What is waiting on a decision, and from whom.",
    path: <><path d="M9 12l2 2 4-4" {...s} /><circle cx="12" cy="12" r="9" {...s} /></>,
  },
];

const FEATURES: { title: string; blurb: string; path: React.ReactNode }[] = [
  {
    title: "Engagement health at a glance",
    blurb:
      "Every engagement shows progress and budget used, with the lead named, so you see what is healthy and what is heading over before it slips.",
    path: <><path d="M3 12h4l3 7 4-14 3 7h4" {...s} /></>,
  },
  {
    title: "Triage the request queue",
    blurb:
      "Incoming work lands in one queue with statuses and SLA timers, New, In progress, Awaiting client, Done, so nothing sits unanswered.",
    path: <><rect x="3" y="4" width="18" height="4" rx="1" {...s} /><rect x="3" y="10" width="18" height="4" rx="1" {...s} /><rect x="3" y="16" width="18" height="4" rx="1" {...s} /></>,
  },
  {
    title: "Balance team capacity",
    blurb:
      "See who is working on what and distribute workload across the team, so no one is buried while someone else has room.",
    path: <><circle cx="9" cy="8" r="3" {...s} /><path d="M3 20a6 6 0 0112 0" {...s} /><path d="M16 8h5M18.5 5.5v5" {...s} /></>,
  },
  {
    title: "Keep approvals moving",
    blurb:
      "Pending approvals are tracked in one place so decisions do not stall in inboxes and chat threads.",
    path: <><path d="M20 6L9 17l-5-5" {...s} /></>,
  },
  {
    title: "Role-aware views",
    blurb:
      "Switch perspective between consultant, manager, and director, so each person sees the slice of the work that matters to them.",
    path: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" {...s} /><circle cx="12" cy="12" r="2.5" {...s} /></>,
  },
  {
    title: "Business Brain AI",
    blurb:
      "Expanded AI drafts your status updates and summaries, surfaces suggestions, and gives you workload insights, the busywork, handled.",
    path: <><path d="M12 3v3M12 18v3M5 12H2M22 12h-3M6 6l-2-2M20 20l-2-2M6 18l-2 2M20 4l-2 2" {...s} /><circle cx="12" cy="12" r="3.2" {...s} /></>,
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const PAINS: { title: string; blurb: string; path: React.ReactNode }[] = [
  {
    title: "Status is always a meeting behind",
    blurb:
      "You chase the team for updates, and by the time the report is ready it is already out of date.",
    path: <><circle cx="12" cy="12" r="9" {...s} /><path d="M12 8v4l3 2" {...s} /></>,
  },
  {
    title: "Budget overruns surface too late",
    blurb:
      "An engagement slips past budget quietly, and you find out after the invoice, not before it.",
    path: <><path d="M12 3l9 16H3l9-16z" {...s} /><path d="M12 10v4M12 17h.01" {...s} /></>,
  },
  {
    title: "Scope creep eats the margin",
    blurb:
      "Clients ask for one more thing, and with no record of the cost it gets absorbed, not billed.",
    path: <><path d="M4 12h13M12 6l6 6-6 6" {...s} /></>,
  },
  {
    title: "The work is scattered",
    blurb:
      "Requests in email, status in slides, approvals in chat. No single place shows where things stand.",
    path: <><rect x="3" y="3" width="7" height="7" rx="1.5" {...s} /><rect x="14" y="3" width="7" height="7" rx="1.5" {...s} /><rect x="3" y="14" width="7" height="7" rx="1.5" {...s} /><rect x="14" y="14" width="7" height="7" rx="1.5" {...s} /></>,
  },
];

const OUTCOMES: { pain: string; gain: string }[] = [
  {
    pain: "You chase the team for status updates.",
    gain: "AI drafts each update from live activity, ready before the meeting.",
  },
  {
    pain: "Budget overruns turn up after the invoice.",
    gain: "Engagements flag the moment they trend over budget.",
  },
  {
    pain: "Scope creep gets absorbed, not billed.",
    gain: "Every change request shows hours, cost, and timeline, then becomes a change order.",
  },
  {
    pain: "Work is spread across email, slides, and chat.",
    gain: "Requests, status, and approvals all live in one place.",
  },
];

const STEPS: { title: string; blurb: string }[] = [
  { title: "Create your workspace", blurb: "Set up your firm's workspace in a couple of clicks. No setup project required." },
  { title: "Add your engagements", blurb: "Build them directly, or let the AI draft the plan from your goal." },
  { title: "Invite your firm", blurb: `${CANON.workspace} per seat, no cap. Directors, managers, and ICs each see the work that matters to their role.` },
  { title: "Let the AI take the busywork", blurb: "Status updates, summaries, and risk flags are drafted for you from day one." },
];

const INDUSTRIES: { name: string; blurb: string }[] = [
  { name: "Consultancies", blurb: "Run multiple audits and advisory engagements without losing the thread on any of them." },
  { name: "Agencies", blurb: "Keep retainers and project work on scope, on budget, and visible to the whole team." },
  { name: "Accounting", blurb: "Filings, reviews, and approvals tracked with a clear trail for every client." },
  { name: "Legal", blurb: "Matter work, redlines, and client sign-offs organized in one place." },
];

const WS_VOICES: { quote: string; role: string }[] = [
  {
    quote:
      "Half my week goes to asking people for updates, just to build a status that is already stale by Friday.",
    role: "Delivery manager, consulting firm",
  },
  {
    quote:
      "I find out an engagement blew its budget when finance flags the invoice, never in time to act on it.",
    role: "Engagement lead, advisory firm",
  },
  {
    quote:
      "Scope changes live in email threads. By the time everyone agrees, we have already done the work for free.",
    role: "Operations lead, professional-services firm",
  },
];

export default function WorkspacePage() {
  const price = CANON;
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/workspace",
            name: "Workspace, your internal delivery command center | PYNGYN",
            description:
              `Workspace is PYNGYN's operating system for professional-services firms: projects, finances, billable timesheets, and team management at ${CANON.workspace} per seat.`,
            breadcrumbId: "/workspace#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Workspace", url: "/workspace" },
            ],
            "/workspace"
          ),
          faqPageSchema(FAQS, "/workspace"),
        ]}
      />
      <Navbar />

      <main id="main">
        {/* ===== Hero ===================================================== */}
        <section className="wrap pb-[44px] pt-[150px]">
          <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
            <Reveal>
              <Eyebrow>Workspace</Eyebrow>
              <h1 className="mt-4 font-display text-[clamp(34px,4.6vw,56px)] font-semibold leading-[1.04] tracking-[-0.025em]">
                Run every engagement <span className="text-accent">from one place.</span>
              </h1>
              <p className="lead mt-5 max-w-[560px]">
                Workspace is PYNGYN&apos;s internal command center for managers and delivery leads.
                Track engagement health, balance your team&apos;s capacity, triage requests, and turn
                change requests into change orders, all in one view.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <a href={SIGNUP_URL} className="btn btn-primary px-[18px] py-2.5">
                  Start free trial
                </a>
                <a href={DEMO_URL} className="btn btn-ghost px-[18px] py-2.5">
                  Book a demo
                </a>
              </div>
              <p className="mt-4 text-[13.5px] text-muted">
                {price.workspace} per seat / month · pair with Clientspace at {price.clientspace} per seat, or bundle for {price.bundle}/mo.{" "}
                <Link href="/pricing" className="font-semibold text-accent hover:underline">
                  See pricing
                </Link>
              </p>
            </Reveal>

            <Reveal i={1}>
              {/* Live, component-built Smart Inbox (Business Brain) mockup for
                  Star Finance — replaces the old static workspace-dashboard.webp.
                  Scales the full desktop layout down on mobile via AppShell. */}
              <div className="overflow-hidden rounded-[18px] border border-line bg-white shadow-art">
                <SmartInboxShowcase />
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-12 max-w-[720px] rounded-[20px] border border-accent/30 bg-accent-lt p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    7-day free trial
                  </span>
                  <p className="mt-1.5 text-[16px] font-bold text-ink">Try Workspace on a real engagement first.</p>
                  <p className="text-[13.5px] text-muted">No credit card required, cancel anytime before the trial ends.</p>
                </div>
                <a href={SIGNUP_URL} className="btn btn-accent flex-none px-[18px] py-2.5">
                  Start free trial
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ===== Pain points ============================================= */}
        <section className="section-tight">
          <div className="wrap">
            <Reveal>
              <div className="max-w-[720px]">
                <Eyebrow>The reality without it</Eyebrow>
                <h2 className="title mt-3">Sound familiar?</h2>
                <p className="lead mt-4">
                  Running client delivery on email, spreadsheets, and status meetings means the
                  things that matter surface too late. Here is what that looks like day to day.
                </p>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {PAINS.map((p, i) => (
                <Reveal key={p.title} i={i % 2}>
                  <div className="card flex h-full gap-4 p-6">
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-[#fef2f2] text-[#dc2626]">
                      <Icon path={p.path} />
                    </span>
                    <div>
                      <h3 className="text-[16px] font-bold">{p.title}</h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{p.blurb}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Before / After ========================================= */}
        <section className="section-tight">
          <div className="wrap">
            <Reveal>
              <div className="max-w-[720px]">
                <Eyebrow>With Workspace</Eyebrow>
                <h2 className="title mt-3">From firefighting to in control.</h2>
                <p className="lead mt-4">
                  The same week, run on PYNGYN instead of email, spreadsheets, and status meetings.
                </p>
              </div>
            </Reveal>
            <div className="mt-10 overflow-hidden rounded-[22px] border border-line bg-white shadow-card">
              {OUTCOMES.map((o, i) => (
                <Reveal key={o.pain} i={i % 2}>
                  <div className={`grid sm:grid-cols-2 ${i < OUTCOMES.length - 1 ? "border-b border-line" : ""}`}>
                    <div className="flex items-start gap-3 bg-[#fff7f7] p-5">
                      <span className="mt-0.5 flex-none text-[15px] font-bold text-[#dc2626]" aria-hidden="true">✕</span>
                      <p className="text-[14px] leading-relaxed text-muted">{o.pain}</p>
                    </div>
                    <div className="flex items-start gap-3 bg-accent-lt p-5">
                      <span className="mt-0.5 flex-none text-[15px] font-bold text-positive" aria-hidden="true">✓</span>
                      <p className="text-[14px] font-medium leading-relaxed text-ink">{o.gain}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== KPI band ================================================= */}
        <section className="section-tight">
          <div className="wrap">
            <Reveal>
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted">
                Opens on what needs attention
              </p>
              <h2 className="title mt-3 max-w-[760px]">Your day starts with the decisions, not the digging.</h2>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {KPIS.map((k, i) => (
                <Reveal key={k.label} i={i}>
                  <div className="card h-full p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-lt text-accent">
                      <Icon path={k.path} />
                    </span>
                    <h3 className="mt-4 text-[16px] font-bold">{k.label}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{k.blurb}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Feature grid ============================================ */}
        <section className="section">
          <div className="wrap">
            <Reveal>
              <div className="text-center">
                <Eyebrow>What Workspace does</Eyebrow>
                <h2 className="title mt-3">Everything your team needs to run the work.</h2>
                <p className="lead mx-auto mt-4 max-w-[640px]">
                  One internal home for delivery, from the first request to the final approval.
                </p>
              </div>
            </Reveal>
            <div className="mt-[46px] grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} i={i % 3}>
                  <div className="card h-full p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-lt text-accent">
                      <Icon path={f.path} />
                    </span>
                    <h3 className="mt-4 text-[17px] font-bold">{f.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{f.blurb}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Product showcase (real screenshots) ===================== */}
        <ProductShowcase />

        {/* ===== Change request spotlight ================================ */}
        <section className="section-tight">
          <div className="wrap">
            <Reveal>
              <div className="grid items-center gap-9 rounded-[28px] border border-line bg-white p-8 shadow-card lg:grid-cols-[1.05fr_1fr] lg:p-12">
                <div>
                  <Eyebrow>Change requests, handled</Eyebrow>
                  <h2 className="title mt-3 text-[clamp(26px,3.4vw,38px)]">
                    Turn scope changes into change orders.
                  </h2>
                  <p className="lead mt-4">
                    When a client asks for more, Workspace shows the implications up front, added
                    hours, added cost, and timeline impact. Generate an AI draft of the client
                    message, edit it, and send.
                  </p>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
                    On approval it becomes a change order: it amends the statement of work and
                    updates the budget automatically, so your numbers never drift from reality.
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-canvas p-6">
                  <div className="text-[13px] font-bold uppercase tracking-wider text-muted">
                    Review implications
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[
                      { k: "Added hours", v: "+40h" },
                      { k: "Added cost", v: "+ budget" },
                      { k: "Timeline", v: "+2 wks" },
                    ].map((m) => (
                      <div key={m.k} className="rounded-xl border border-line bg-white p-3.5">
                        <div className="text-[12px] text-muted">{m.k}</div>
                        <div className="mt-1 text-[20px] font-bold">{m.v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <span className="btn btn-accent px-4 py-2 text-[13.5px]">Send to client</span>
                    <span className="btn btn-ghost px-4 py-2 text-[13.5px]">Edit</span>
                    <span className="btn btn-ghost px-4 py-2 text-[13.5px]">AI draft</span>
                  </div>
                  <p className="mt-3 text-[12.5px] italic text-muted">
                    Illustrative, your live numbers come from the engagement.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== How it works =========================================== */}
        <section className="section">
          <div className="wrap">
            <Reveal>
              <div className="text-center">
                <Eyebrow>Get started</Eyebrow>
                <h2 className="title mt-3">Live in an afternoon, not a quarter.</h2>
                <p className="lead mx-auto mt-4 max-w-[620px]">
                  No long rollout. Most teams are running their first engagement the same day.
                </p>
              </div>
            </Reveal>
            <div className="mt-[46px] grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, i) => (
                <Reveal key={step.title} i={i}>
                  <div className="card h-full p-6">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-[15px] font-bold text-white">
                      {i + 1}
                    </span>
                    <h3 className="mt-4 text-[16px] font-bold">{step.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{step.blurb}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Industries ============================================= */}
        <section className="section-tight">
          <div className="wrap">
            <Reveal>
              <div className="max-w-[720px]">
                <Eyebrow>Who it is for</Eyebrow>
                <h2 className="title mt-3">Built for client-services firms.</h2>
                <p className="lead mt-4">
                  If you bill for delivery and answer to clients, Workspace fits how you already work.
                </p>
              </div>
            </Reveal>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {INDUSTRIES.map((ind, i) => (
                <Reveal key={ind.name} i={i}>
                  <div className="card h-full p-5">
                    <h3 className="text-[15px] font-bold">{ind.name}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{ind.blurb}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Testimonials (Workspace voices) ======================== */}
        <section className="section">
          <div className="wrap">
            <Reveal>
              <div className="text-center">
                <Eyebrow>From discovery calls</Eyebrow>
                <h2 className="title mt-3">What delivery leads tell us.</h2>
                <p className="lead mx-auto mt-4 max-w-[640px]">
                  Anonymised observations from conversations with managers and delivery leads at
                  services firms. Roles only, no names.
                </p>
              </div>
            </Reveal>
            <div className="mt-[46px] grid gap-[22px] md:grid-cols-3">
              {WS_VOICES.map(({ quote, role }, i) => (
                <Reveal i={i} key={role}>
                  <figure className="card flex h-full flex-col">
                    <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">
                      From a discovery call
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

        {/* ===== Integrations + Security (reused product-wide strips) ==== */}
        <Integrations />
        <Security />

        {/* ===== Workspace vs Client Space =============================== */}
        <section className="section-tight">
          <div className="wrap">
            <Reveal>
              <div className="text-center">
                <Eyebrow>Workspace or Client Space</Eyebrow>
                <h2 className="title mt-3">Two standalone products. Use one, or bundle both.</h2>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <Reveal>
                <div className="card h-full p-7">
                  <h3 className="text-[18px] font-bold">Workspace</h3>
                  <p className="mt-1 text-[13px] text-muted">Internal, not client-facing</p>
                  <ul className="mt-5 flex flex-col gap-2.5 text-[14px] text-ink">
                    {[
                      "Engagement health and budget tracking",
                      "Team workload and capacity",
                      "Request queue and change orders",
                      "Approvals and reporting",
                      "Business Brain AI",
                    ].map((it) => (
                      <li key={it} className="flex gap-2.5">
                        <span className="mt-0.5 flex-none text-positive" aria-hidden="true">✓</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal i={1}>
                <div className="card h-full border-accent p-7 ring-1 ring-accent">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[18px] font-bold">Client Space</h3>
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold text-white">
                      Standalone
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] text-muted">A branded client portal, works with or without Workspace</p>
                  <ul className="mt-5 flex flex-col gap-2.5 text-[14px] text-ink">
                    {[
                      "A client portal of their own",
                      "Up to 50 clients",
                      "Scope Guard (scope-change protection)",
                      "Audit-trail approvals",
                    ].map((it) => (
                      <li key={it} className="flex gap-2.5">
                        <span className="mt-0.5 flex-none text-accent" aria-hidden="true">✓</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
            <div className="mt-8 text-center">
              <Link href="/pricing" className="btn btn-primary px-[18px] py-2.5">
                Compare plans
              </Link>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===================================================== */}
        <section className="section">
          <div className="wrap max-w-[820px]">
            <Reveal>
              <div className="text-center">
                <Eyebrow>Questions</Eyebrow>
                <h2 className="title mt-3">Workspace, answered.</h2>
              </div>
            </Reveal>
            <div className="mt-10 flex flex-col gap-3">
              {FAQS.map((f, i) => (
                <Reveal key={f.q} i={i}>
                  <div className="card p-6">
                    <h3 className="text-[16px] font-bold">{f.q}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{f.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>

      {/* Sticky CTA bar, slides in after the hero scrolls away */}
      <StickyCTABar
        label="7-day free trial · No credit card required"
        ctaHref={SIGNUP_URL}
        ctaLabel="Start free trial"
      />

      <Footer />
    </>
  );
}
