import type { Metadata } from "next";
import Image from "next/image";
import { DEMO_URL, SIGNUP_URL, ROI_URL } from "@/components/config";
import { StickyCTABar } from "@/components/StickyCTABar";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { VIDEO_TESTIMONIALS, TestimonialVideo } from "@/components/VideoTestimonials";

// =============================================================================
// PROFESSIONAL SERVICES LANDING PAGE  (paid traffic — noindex)
// =============================================================================
// This page is conversion-aggressive on purpose: it lives at /lp/* which is set
// to noindex, so urgency and scarcity framing is allowed here (and only here).
//
// HONESTY GUARDRAILS:
// • All testimonials and customer counts are PLACEHOLDERS until real ones exist.
//   Search this file for "TODO: replace" before driving paid traffic.
// • All outcome metrics use math derived from the public ROI calculator,
//   not claimed customer results.
// • The comparison table reflects category-level differences only; competitors'
//   names are factual and capabilities are marked honestly (✓ / ~ / ✕).
// =============================================================================

export const metadata: Metadata = {
  title: "The AI Operating System for Professional Services | PYNGYN",
  description:
    "Stop running client work through spreadsheets and WhatsApp. PYNGYN is the AI operations layer for consulting, agency, and services firms. Book a demo.",
  robots: { index: false, follow: false },
};

const PRIMARY_CTA = DEMO_URL;
const SECONDARY_CTA = SIGNUP_URL;

// -----------------------------------------------------------------------------
// Small primitives
// -----------------------------------------------------------------------------

function PrimaryButton({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-accent-dk ${className}`}
    >
      {label}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
    </a>
  );
}

function GhostButton({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-[15px] font-semibold text-white transition-all hover:border-white/30 hover:bg-white/[0.08] ${className}`}
    >
      {label}
    </a>
  );
}

function Check({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11.5px] font-semibold uppercase tracking-[0.14em] text-accent">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {children}
    </span>
  );
}

// -----------------------------------------------------------------------------
// Data
// -----------------------------------------------------------------------------

const INDUSTRIES = [
  "CA & Tax firms",
  "Consulting firms",
  "Marketing & creative agencies",
  "Law firms",
  "Architecture firms",
  "Audit & advisory",
  "Boutique advisory",
];

const PAINS: { tag: string; title: string; body: string; impact: string }[] = [
  { tag: "Coordination", title: "Status lives in 30 places.", body: "Updates are scattered across WhatsApp, email, and spreadsheets. Nobody has the full picture before a client call, and your client has even less.", impact: "Hours lost weekly per manager." },
  { tag: "Delivery", title: "Deadlines slip without warning.", body: "Risk is invisible until it has already cost you the date. The first time you hear about a problem is when the client does.", impact: "Margin and trust, gone together." },
  { tag: "Scope", title: "Scope creeps in silence.", body: "Small asks pile up between formal change orders. The team works extra, the firm absorbs the cost, the client never knew.", impact: "Quiet revenue leak." },
  { tag: "Knowledge", title: "Senior people are bottlenecks.", body: "SOPs and client context sit in one partner's head. When they take leave, work slows. When they leave, knowledge walks out the door.", impact: "Quality depends on availability." },
  { tag: "Accountability", title: "Ownership is fuzzy.", body: "Several people are on a task but nobody really owns it. Things drift. Follow-ups become a job in itself.", impact: "Endless chasing, no progress." },
  { tag: "Visibility", title: "You learn about losses after the invoice.", body: "Without live engagement health, you only find out a project was unprofitable after billing. By then it's already too late to fix.", impact: "P&L surprises every quarter." },
];

const AI_FEATURES: { title: string; body: string; icon: React.ReactNode }[] = [
  { title: "AI plan generation", body: "Type the goal. PYNGYN drafts tasks, owners, dependencies, and a realistic timeline.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg> },
  { title: "Auto-generated status", body: "PYNGYN drafts client-ready status updates from the work itself. The Friday roll-up writes itself.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M7 3h7l4 4v14H7zM14 3v4h4M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { title: "Risk detection", body: "AI watches workload, dependencies, and deadlines. It flags what threatens dates and margin, days earlier.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3l10 18H2zM12 10v5M12 18h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { title: "Workload balancing", body: "See who is over-allocated this week before they tell you. Rebalance before quality drops.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 20V10M10 20V4M15 20v-8M20 20V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg> },
  { title: "AI meeting capture", body: "Decisions and follow-ups from a call become tracked tasks with owners. No more lost commitments.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { title: "Living knowledge base", body: "SOPs, frameworks, and client history surface in the workflow when they matter, not when someone remembers them.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 5a3 3 0 013-3h11v18H7a3 3 0 01-3-3zm3 12h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { title: "Forecast & utilisation", body: "Project capacity weeks ahead. Sell the next engagement with confidence, not hope.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 17l6-6 4 4 8-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { title: "Operations co-pilot", body: "Ask in plain language. PYNGYN answers across projects, people, and history, with sources.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 12a9 9 0 11-9-9M21 3l-9 9M16 3h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg> },
];

const STEPS = [
  { n: "01", title: "30-minute discovery", body: "We learn how your firm delivers today: tools, roles, what hurts." },
  { n: "02", title: "Live walkthrough on your workflow", body: "We model a real engagement of yours in PYNGYN. Not a generic demo." },
  { n: "03", title: "Written rollout plan", body: "A tailored plan you can share with your team, whether you sign up or not." },
];

const USE_CASES: { tag: string; title: string; pain: string; fix: string }[] = [
  { tag: "CA & Tax", title: "Chartered accounting firms", pain: "Filing seasons turn into fire drills. Partners chase juniors, deadlines hide in trackers.", fix: "Engagement plans, regulatory calendars, and review queues that run themselves." },
  { tag: "Consulting", title: "Management consulting", pain: "Plans live in slide decks that go stale by Wednesday. Status is a Monday meeting.", fix: "Live plans, written status, partner reviews that always reflect today's reality." },
  { tag: "Agencies", title: "Marketing & creative agencies", pain: "Client work juggled across Slack, Asana, and email. Scope creep funded by your team.", fix: "Briefs become plans. Approvals and rounds tracked. Profitability visible per client." },
  { tag: "Legal", title: "Law firms & legal teams", pain: "Matters managed across people, calendars, and habits. Risk and conflicts spotted late.", fix: "Matter workflows, deadline tracking, and risk surfacing built for legal work." },
  { tag: "Architecture", title: "Architecture & design", pain: "Phases stretch quietly. Drawings, revisions, and approvals scattered across drives.", fix: "Phase-aware project plans, drawing rounds, and stakeholder approvals in one flow." },
];

const COMPARE: { row: string; py: 2 | 1 | 0; cu: 2 | 1 | 0; tr: 2 | 1 | 0; mo: 2 | 1 | 0; ex: 2 | 1 | 0; wa: 2 | 1 | 0 }[] = [
  { row: "AI plan from a plain-language goal",           py: 2, cu: 1, tr: 0, mo: 1, ex: 0, wa: 0 },
  { row: "Status updates that write themselves",         py: 2, cu: 0, tr: 0, mo: 0, ex: 0, wa: 0 },
  { row: "Cross-engagement risk detection",              py: 2, cu: 1, tr: 0, mo: 1, ex: 0, wa: 0 },
  { row: "Live workload balancing across the team",      py: 2, cu: 2, tr: 0, mo: 2, ex: 0, wa: 0 },
  { row: "Built for services-firm engagements",          py: 2, cu: 1, tr: 1, mo: 1, ex: 0, wa: 0 },
  { row: "Knowledge that surfaces in the workflow",      py: 2, cu: 1, tr: 0, mo: 1, ex: 0, wa: 0 },
  { row: "Forecasting & utilisation built in",           py: 2, cu: 1, tr: 0, mo: 2, ex: 1, wa: 0 },
];

const OBJECTIONS = [
  { q: "We already use WhatsApp and spreadsheets. Why change?", a: "Both are great until the firm grows past about 20 people. Then status fragments, accountability drifts, and you stop trusting the numbers. PYNGYN is the layer you needed when scattered tools started costing you margin." },
  { q: "Our team will not adopt another tool.", a: "PYNGYN replaces work, not adds to it. Status updates, follow-ups, and Friday roll-ups happen automatically, so adopting means doing less, not more. Firms typically have most of the team live in under two weeks." },
  { q: "Setup sounds complicated.", a: "It is not. A typical mid-market firm onboards in days, not months. We model one of your real engagements live in the demo so you see exactly what week one looks like." },
  { q: "We already use another PM tool.", a: "Most firms already do. PYNGYN slots over the top: it can import projects, talk to the tools you keep, and replace the ones causing the most pain. You decide the pace." },
];

const FAQS = [
  { q: "How fast can we go live?", a: "A typical mid-market services firm has the first engagement running in under a week, and most of the team using it inside two." },
  { q: "Will it work with our existing tools?", a: "Yes. PYNGYN connects to Slack, Gmail, Google Workspace, QuickBooks, Xero, DocuSign, Stripe, Salesforce, HubSpot, n8n, Zapier, and Make, with more on the way." },
  { q: "How do you handle our data?", a: "Encryption in transit and at rest, SSO and SAML, SOC 2 aligned controls, GDPR alignment. Your data is never used to train AI models without explicit consent." },
  { q: "Can we migrate from another tool?", a: "Yes. We support imports from common project tools and spreadsheets, and our team helps with the first migration so you do not lose history." },
  { q: "How does pricing work?", a: "Client Space is $19 per client/month, standalone. Workspace is $9 per internal seat/month, standalone. Bundle both for $24.99/month. Enterprise pricing is custom. 7-day trial, no credit card required." },
  { q: "Will the team actually use it?", a: "Yes. Because PYNGYN replaces manual coordination work instead of adding to it, adoption is the rule rather than the exception in pilot teams." },
];

// =============================================================================
// Page
// =============================================================================

export default function ProfessionalServicesLP() {
  return (
    <main id="main" className="hero-dark relative min-h-screen text-white antialiased">
      {/* Page-scoped style: keep the body background dark behind this LP so iOS
          overscroll bounce does not show the grey canvas from globals.css. */}
      <style dangerouslySetInnerHTML={{ __html: "html,body{background:#0b0d12 !important;}" }} />
      {/* Persistent decorative grid behind everything */}
      <div className="pointer-events-none fixed inset-0 opacity-30" aria-hidden="true">
        <div className="hero-grid h-full w-full" />
      </div>

      <div className="relative">
        <BrandBar />
        <Hero />
        <BuiltForStrip />
        <PainSection />
        <StatStrip />
        <MidCTA
          eyebrow="7-day trial · No credit card"
          title="Stop running client work through chaos."
          body="In 30 minutes we map a real engagement of yours and show exactly where PYNGYN saves time."
        />
        <AIDifferentiator />
        <WorkspaceClientspaceExplainer />
        <HowItWorks />
        <ROISection />
        <UseCases />
        <ComparisonTable />
        <SocialProofSection />
        <Objections />
        <FAQSection />
        <FinalCTA />
        <FooterMini />
      </div>

      <StickyCTABar
        label="7-day free trial · No credit card required"
        ctaHref={PRIMARY_CTA}
        ctaLabel="Book a demo"
      />
      <ExitIntentModal ctaHref={PRIMARY_CTA} />
    </main>
  );
}


// =============================================================================
// Workspace / Clientspace explainer (injected for model clarity)
// =============================================================================

function WorkspaceClientspaceExplainer() {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-7 sm:py-28">
      <div className="text-center">
        <SectionEyebrow>The product</SectionEyebrow>
        <h2 className="mt-4 font-display text-[clamp(30px,4.5vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
          Two products. One operating system.
        </h2>
        <p className="mx-auto mt-4 max-w-[580px] text-[16px] leading-relaxed text-white/65">
          Client Space gives every client their own branded portal, and works on its own. Workspace runs
          your firm behind the scenes. Buy either standalone, or bundle both to replace the
          spreadsheets, WhatsApp threads, and status emails that eat your week.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* Clientspace */}
        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-8">
          <div className="flex items-center gap-3">
            <span className="rounded-xl border border-accent/40 px-3 py-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-accent">Client Space</span>
            <span className="text-[13px] text-white/50">$19 / client / month · standalone</span>
          </div>
          <h3 className="mt-4 font-display text-[22px] font-semibold text-white">A branded portal for every client.</h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-white/65">
            Each client gets their own isolated, white-labeled portal. They see deliverables,
            status, and approvals, nothing from your other clients, nothing internal.
          </p>
          <ul className="mt-5 space-y-2">
            {["Branded, white-labeled per client", "One isolated space per engagement", "Client-visible tasks and status", "Approvals and sign-off in the portal", "The client role, access-controlled"].map(f => (
              <li key={f} className="flex items-start gap-2 text-[13.5px] text-white/80">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 flex-none text-emerald-400">
                  <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>
        {/* Workspace */}
        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-8">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-accent/20 px-3 py-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-accent">Workspace</span>
            <span className="text-[13px] text-white/50">$9 / seat / month · standalone</span>
          </div>
          <h3 className="mt-4 font-display text-[22px] font-semibold text-white">Your firm&apos;s operating system.</h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-white/65">
            Everything directors, managers, and ICs need: projects, finances, billable timesheets,
            Business Brain AI, automations, team skills, and 240+ workflow templates.
          </p>
          <ul className="mt-5 space-y-2">
            {["Projects, tasks, and calendar", "Finance: revenue, MRR, profit", "Billable vs non-billable timesheets", "Business Brain AI (plans, status, risk)", "Roles for directors, managers, and ICs"].map(f => (
              <li key={f} className="flex items-start gap-2 text-[13.5px] text-white/80">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 flex-none text-emerald-400">
                  <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}

// =============================================================================
// Sections
// =============================================================================

function BrandBar() {
  return (
    <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-5 pt-7 sm:px-7">
      <Image
        src="/logo-dark.webp"
        alt="PYNGYN"
        width={150}
        height={40}
        priority
        className="h-8 w-auto"
      />
      <span className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] font-semibold text-white/70 sm:inline-flex">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Built for professional services
      </span>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-start gap-12 px-5 pb-16 pt-12 sm:px-7 sm:pb-24 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 font-mono text-[11.5px] font-semibold uppercase tracking-[0.12em] text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            7-day free trial · No credit card required
          </span>

          <h1 className="mt-6 font-display text-[clamp(38px,6.8vw,72px)] font-semibold leading-[0.98] tracking-[-0.035em] text-white">
            Your team isn&apos;t unproductive.{" "}
            <span className="text-indigo-300">
              Your operations are broken.
            </span>
          </h1>

          <p className="mt-6 max-w-[560px] text-[17.5px] leading-[1.55] text-white/65">
            Disconnected updates, slipping deadlines, scattered tasks, and zero live
            visibility quietly eat your margin every week. PYNGYN is the AI operating
            system built for services firms, so your team runs on a predictable system
            instead of heroics.
          </p>

          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <PrimaryButton href={PRIMARY_CTA} label="Book a demo" />
            <GhostButton href={SECONDARY_CTA} label="Start free trial" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium text-white/65">
            <span className="flex items-center gap-1.5"><Check className="text-emerald-400" /> 7-day free trial</span>
            <span className="flex items-center gap-1.5"><Check className="text-emerald-400" /> No credit card</span>
            <span className="flex items-center gap-1.5"><Check className="text-emerald-400" /> SOC 2 aligned</span>
            <span className="flex items-center gap-1.5"><Check className="text-emerald-400" /> SSO / SAML</span>
          </div>
        </div>

        <DashboardMock />
      </div>
    </section>
  );
}

// Inline AI dashboard visual. Static, no real data. Built to feel like a
// glance at the PYNGYN ops console without claiming any specific numbers
// belong to a real customer.
function DashboardMock() {
  return (
    <div className="relative">
      {/* Floating metric badges */}
      <div className="absolute -left-3 -top-4 z-10 hidden rotate-[-3deg] rounded-2xl border border-white/10 bg-[#11141a]/95 px-3.5 py-2.5 shadow-2xl backdrop-blur sm:block">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white/65">Risk caught early</div>
        <div className="mt-0.5 font-display text-[18px] font-semibold leading-tight text-emerald-400">3 days sooner</div>
      </div>
      <div className="absolute -right-4 top-16 z-10 hidden rotate-[2deg] rounded-2xl border border-white/10 bg-[#11141a]/95 px-3.5 py-2.5 shadow-2xl backdrop-blur sm:block">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white/65">Status drafts</div>
        <div className="mt-0.5 font-display text-[18px] font-semibold leading-tight text-white">Auto-written</div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-4 shadow-2xl backdrop-blur sm:p-5">
        {/* Mock browser chrome */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <div className="rounded-md bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-white/65">app.pyngyn.ai / ops</div>
          <div className="w-8" />
        </div>

        {/* Header */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">Live operations</div>
            <div className="mt-0.5 font-display text-[16px] font-semibold tracking-[-0.01em] text-white">This week, your firm</div>
          </div>
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-emerald-400">On track</span>
        </div>

        {/* KPI tiles */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          <KpiTile label="Engagements" value="14" sub="2 at risk" tone="accent" />
          <KpiTile label="Billable hrs" value="372" sub="this week" tone="white" />
          <KpiTile label="Utilisation" value="78%" sub="healthy" tone="emerald" />
        </div>

        {/* Sparkline */}
        <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <div className="flex items-center justify-between">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70">Delivery confidence, last 14 days</div>
            <span className="font-mono text-[11px] font-semibold text-emerald-400">+12 pts</span>
          </div>
          <svg viewBox="0 0 240 56" className="mt-2 h-12 w-full" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="lp-sg" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,42 L20,40 L40,44 L60,36 L80,38 L100,30 L120,32 L140,24 L160,20 L180,22 L200,14 L220,18 L240,10" stroke="#4f46e5" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M0,42 L20,40 L40,44 L60,36 L80,38 L100,30 L120,32 L140,24 L160,20 L180,22 L200,14 L220,18 L240,10 L240,56 L0,56 Z" fill="url(#lp-sg)" />
          </svg>
        </div>

        {/* AI alerts */}
        <div className="mt-3 space-y-1.5">
          <AlertRow tone="amber" tag="Risk" body="Acme audit may slip by 2 days, partner review pending" />
          <AlertRow tone="accent" tag="AI" body="Drafted Friday status for 9 engagements - ready to send" />
          <AlertRow tone="emerald" tag="Won" body="Beacon Capital approved phase 2 - 3 weeks of work added" />
        </div>
      </div>
    </div>
  );
}

function KpiTile({ label, value, sub, tone }: { label: string; value: string; sub: string; tone: "accent" | "white" | "emerald" }) {
  const color = tone === "accent" ? "text-accent" : tone === "emerald" ? "text-emerald-400" : "text-white";
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-white/70">{label}</div>
      <div className={`mt-1 font-display text-[22px] font-semibold leading-none tracking-[-0.02em] ${color}`}>{value}</div>
      <div className="mt-1 text-[10.5px] text-white/70">{sub}</div>
    </div>
  );
}

function AlertRow({ tone, tag, body }: { tone: "amber" | "accent" | "emerald"; tag: string; body: string }) {
  const tagStyle = tone === "amber" ? "bg-amber-500/15 text-amber-400" : tone === "emerald" ? "bg-emerald-500/15 text-emerald-400" : "bg-accent/15 text-accent";
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
      <span className={`flex-none rounded px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide ${tagStyle}`}>{tag}</span>
      <p className="text-[11.5px] leading-snug text-white/75">{body}</p>
    </div>
  );
}

function BuiltForStrip() {
  return (
    <section className="border-y border-white/10 bg-black/20">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-6 sm:px-7">
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[12.5px] font-medium text-white/65">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">Built for</span>
          {INDUSTRIES.map((i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-white/25" /> {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function PainSection() {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-7 sm:py-28">
      <div className="max-w-[640px]">
        <SectionEyebrow>The hidden cost of operational chaos</SectionEyebrow>
        <h2 className="mt-4 font-display text-[clamp(30px,4.4vw,46px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
          Most firms don&apos;t have a productivity problem.
          <br />
          They have an operations problem.
        </h2>
        <p className="mt-5 text-[16.5px] leading-relaxed text-white/65">
          The team isn&apos;t lazy. The work isn&apos;t hard. The system underneath it
          is leaking time, money, and trust. Here&apos;s where it goes.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PAINS.map((p, i) => (
          <div
            key={i}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05]"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-accent/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-accent">{p.tag}</span>
              <span className="font-mono text-[10px] text-white/60">{String(i + 1).padStart(2, "0")} / {String(PAINS.length).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-4 font-display text-[19.5px] font-semibold leading-tight tracking-[-0.015em] text-white">{p.title}</h3>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/65">{p.body}</p>
            <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-amber-400">
                <path d="M12 3l10 18H2zM12 10v5M12 18h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[12.5px] font-semibold text-white/80">{p.impact}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatStrip() {
  // Numbers derived from the public /tools/roi-calculator with default inputs:
  // 20 people × $1,200/day × 220 days × 35% time lost = ~$1.85M/year
  // Win-back rate 50% = ~$925K/year recoverable, ~39 days back per person
  return (
    <section className="border-y border-white/10 bg-black/20">
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 divide-y divide-white/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-7">
        <div className="px-2 py-8 text-center">
          <div className="font-display text-[32px] font-semibold tracking-[-0.025em] text-white">35%</div>
          <div className="mt-1.5 text-[13px] leading-snug text-white/65">of a billable day, lost to coordination</div>
        </div>
        <div className="px-2 py-8 text-center">
          <div className="font-display text-[32px] font-semibold tracking-[-0.025em] text-accent">~$1.85M</div>
          <div className="mt-1.5 text-[13px] leading-snug text-white/65">illustrative annual cost of chaos at a 20-person firm</div>
        </div>
        <div className="px-2 py-8 text-center">
          <div className="font-display text-[32px] font-semibold tracking-[-0.025em] text-emerald-400">~39 days</div>
          <div className="mt-1.5 text-[13px] leading-snug text-white/65">billable time back, per person, per year</div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1180px] px-5 pb-5 text-center sm:px-7">
        <a href={ROI_URL} className="text-[12.5px] font-medium text-white/65 underline-offset-2 hover:text-accent hover:underline">
          Run the numbers for your firm →
        </a>
      </div>
    </section>
  );
}

function MidCTA({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <section className="px-5 py-10 sm:px-7 sm:py-14">
      <div className="relative mx-auto w-full max-w-[1180px] overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent p-9 sm:p-12">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-[640px]">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{eyebrow}</span>
            <h2 className="mt-3 font-display text-[clamp(24px,3.6vw,34px)] font-semibold leading-tight tracking-[-0.02em] text-white">{title}</h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-white/65">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton href={PRIMARY_CTA} label="Book a demo" />
            <GhostButton href={SECONDARY_CTA} label="Start free trial" />
          </div>
        </div>
      </div>
    </section>
  );
}

function AIDifferentiator() {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-7 sm:py-28">
      <div className="text-center">
        <SectionEyebrow>The PYNGYN difference</SectionEyebrow>
        <h2 className="mx-auto mt-4 max-w-[820px] font-display text-[clamp(30px,4.4vw,46px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
          Not another project tool.{" "}
          <span className="text-indigo-300">
            An AI Operations Manager.
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-[640px] text-[16.5px] leading-relaxed text-white/65">
          Traditional tools organise tasks. PYNGYN improves operational decisions. Eight
          capabilities most services firms have never had until now.
        </p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {AI_FEATURES.map((f) => (
          <div
            key={f.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white/[0.05]"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" aria-hidden="true" />
            <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">{f.icon}</div>
            <h3 className="relative mt-4 font-display text-[17px] font-semibold leading-tight tracking-[-0.01em] text-white">{f.title}</h3>
            <p className="relative mt-2 text-[13.5px] leading-relaxed text-white/60">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-7 sm:py-24">
      <div className="max-w-[640px]">
        <SectionEyebrow>How it works</SectionEyebrow>
        <h2 className="mt-4 font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
          What happens after you click the button.
        </h2>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.n} className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <div className="font-mono text-[12.5px] font-semibold tracking-wide text-accent">{s.n}</div>
            <h3 className="mt-3 font-display text-[19px] font-semibold leading-tight tracking-[-0.015em] text-white">{s.title}</h3>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/65">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ROISection() {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-7 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionEyebrow>Operational efficiency on the P&amp;L</SectionEyebrow>
          <h2 className="mt-4 font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
            One missed client deadline costs more than a year of PYNGYN.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-white/65">
            Every hour your firm spends chasing status is an hour you can&apos;t bill.
            We built a free calculator so you can put a real number on the cost of chaos
            inside your firm in 30 seconds.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <PrimaryButton href={ROI_URL} label="Run the calculator" />
            <GhostButton href={PRIMARY_CTA} label="Or just book a demo" />
          </div>
          <p className="mt-4 text-[12.5px] text-white/65">Calculator is free, no signup.</p>
        </div>

        {/* Mini visual: a stack of "what you get back" */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">What firms typically get back</div>
          <ul className="mt-5 space-y-3.5">
            {[
              { v: "Faster delivery", b: "Fewer late dates, fewer apology emails." },
              { v: "Higher utilisation", b: "See who is over-allocated before quality drops." },
              { v: "Tighter accountability", b: "Owners on every task. No more follow-up follow-ups." },
              { v: "Earlier risk signal", b: "Days, not weeks, before the deadline." },
              { v: "Less overhead", b: "Status, roll-ups, and handoffs that write themselves." },
            ].map((r) => (
              <li key={r.v} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <Check size={12} />
                </span>
                <div>
                  <div className="text-[15px] font-semibold text-white">{r.v}</div>
                  <div className="text-[13.5px] leading-snug text-white/60">{r.b}</div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-white/10 pt-4 text-[11.5px] leading-snug text-white/65">
            Outcomes depend on your firm. Run the calculator on your own numbers, or book
            a demo and we will model it live.
          </p>
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-7 sm:py-24">
      <div className="max-w-[640px]">
        <SectionEyebrow>Built for your kind of work</SectionEyebrow>
        <h2 className="mt-4 font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
          One operating system, every services firm.
        </h2>
        <p className="mt-5 text-[16px] leading-relaxed text-white/65">
          PYNGYN is shaped around how services firms actually run, not retrofitted from
          a generic task tool.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {USE_CASES.map((u) => (
          <div key={u.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-0.5 hover:border-white/20">
            <span className="rounded-md bg-accent/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-accent">{u.tag}</span>
            <h3 className="mt-3.5 font-display text-[18px] font-semibold leading-tight tracking-[-0.015em] text-white">{u.title}</h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-white/65">
              <span className="font-semibold text-white/70">Pain:</span> {u.pain}
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/65">
              <span className="font-semibold text-emerald-400">Fix:</span> {u.fix}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ComparisonTable() {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-7 sm:py-24">
      <div className="max-w-[640px]">
        <SectionEyebrow>How we compare</SectionEyebrow>
        <h2 className="mt-4 font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
          A task tool is not an operating system.
        </h2>
        <p className="mt-5 text-[16px] leading-relaxed text-white/65">
          Category-level differences. Capabilities marked honestly, full, partial, or none.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="bg-white/[0.04] text-white/65">
                <th scope="col" className="border-b border-white/10 px-4 py-4 text-[12.5px] font-mono font-semibold uppercase tracking-wider">Capability</th>
                <th scope="col" className="border-b border-white/10 bg-accent/10 px-3 py-4 text-center text-[12.5px] font-semibold text-accent">PYNGYN</th>
                <th scope="col" className="border-b border-white/10 px-3 py-4 text-center text-[12.5px] font-semibold">ClickUp</th>
                <th scope="col" className="border-b border-white/10 px-3 py-4 text-center text-[12.5px] font-semibold">Trello</th>
                <th scope="col" className="border-b border-white/10 px-3 py-4 text-center text-[12.5px] font-semibold">Monday</th>
                <th scope="col" className="border-b border-white/10 px-3 py-4 text-center text-[12.5px] font-semibold">Excel</th>
                <th scope="col" className="border-b border-white/10 px-3 py-4 text-center text-[12.5px] font-semibold">WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row, idx) => (
                <tr key={row.row} className={idx % 2 === 0 ? "bg-white/[0.01]" : ""}>
                  <th scope="row" className="border-b border-white/10 px-4 py-3.5 text-[13.5px] font-medium text-white">{row.row}</th>
                  <CompareCell n={row.py} highlight />
                  <CompareCell n={row.cu} />
                  <CompareCell n={row.tr} />
                  <CompareCell n={row.mo} />
                  <CompareCell n={row.ex} />
                  <CompareCell n={row.wa} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-end gap-x-5 gap-y-1 text-[11.5px] text-white/70">
        <span className="inline-flex items-center gap-1.5"><Check size={11} className="text-emerald-400" /> Full</span>
        <span className="inline-flex items-center gap-1.5"><span className="text-amber-400">~</span> Partial</span>
        <span className="inline-flex items-center gap-1.5"><Cross size={11} className="text-white/60" /> None</span>
      </div>
    </section>
  );
}

function CompareCell({ n, highlight = false }: { n: 0 | 1 | 2; highlight?: boolean }) {
  const bg = highlight ? "bg-accent/[0.08]" : "";
  return (
    <td className={`border-b border-white/10 px-3 py-3.5 text-center ${bg}`}>
      {n === 2 && <Check size={16} className="mx-auto text-emerald-400" />}
      {n === 1 && <span className="font-mono text-[16px] font-bold text-amber-400">~</span>}
      {n === 0 && <Cross size={14} className="mx-auto text-white/60" />}
    </td>
  );
}

function SocialProofSection() {
  // Real, hosted customer video testimonials lead this section. The text cards
  // below remain anonymised discovery-call observations until named written
  // case studies are published.
  return (
    <section className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-7 sm:py-24">
      <div className="max-w-[640px]">
        <SectionEyebrow>In their words</SectionEyebrow>
        <h2 className="mt-4 font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
          Hear it from the teams using it.
        </h2>
        <p className="mt-5 text-[16px] leading-relaxed text-white/65">
          A short clip from a real customer. Below it are the patterns we hear in nearly every
          discovery call.
        </p>
      </div>

      {/* Real customer video testimonial */}
      <div className="mt-10 max-w-[520px]">
        {VIDEO_TESTIMONIALS.map((v) => (
          <figure key={v.src}>
            <TestimonialVideo
              src={v.src}
              label={v.label}
              className="border border-white/10 bg-white/[0.03]"
            />
          </figure>
        ))}
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* PLACEHOLDER, replace with real written quotes when available */}
        {[
          { quote: "We run client work across WhatsApp, Excel, and three trackers. The team is good. The system is broken.", role: "Founder, mid-market consulting firm" },
          { quote: "We only learn a project was unprofitable after the invoice goes out. Live engagement health would change how we sell.", role: "Partner, advisory firm" },
          { quote: "Our partner reviews are a Friday meeting. By Monday the status is already stale. We need a system that updates itself.", role: "Operations lead, marketing agency" },
        ].map((t, i) => (
          <figure key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-white/60">From a discovery call</span>
            <blockquote className="mt-3 font-display text-[16px] font-medium leading-[1.45] tracking-[-0.005em] text-white">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 border-t border-white/10 pt-3 text-[12.5px] text-white/65">{t.role}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Objections() {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-7 sm:py-24">
      <div className="max-w-[640px]">
        <SectionEyebrow>What teams ask us first</SectionEyebrow>
        <h2 className="mt-4 font-display text-[clamp(28px,4vw,42px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
          The honest answers to the obvious questions.
        </h2>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {OBJECTIONS.map((o) => (
          <div key={o.q} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-display text-[17.5px] font-semibold leading-tight tracking-[-0.015em] text-white">{o.q}</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-white/65">{o.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="mx-auto w-full max-w-[820px] px-5 py-20 sm:px-7 sm:py-24">
      <div className="text-center">
        <SectionEyebrow>FAQ</SectionEyebrow>
        <h2 className="mt-4 font-display text-[clamp(28px,4vw,40px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
          Everything else, answered.
        </h2>
      </div>
      <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
        {FAQS.map((f) => (
          <div key={f.q} className="py-5">
            <dt className="text-[16px] font-semibold text-white">{f.q}</dt>
            <dd className="mt-2 text-[14.5px] leading-relaxed text-white/65">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-5 pb-28 pt-12 text-center sm:px-7 sm:pb-36">
      <div className="relative mx-auto overflow-hidden rounded-[28px] border border-accent/30 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent p-10 sm:p-16">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative">
          <SectionEyebrow>Your move</SectionEyebrow>
          <h2 className="mx-auto mt-4 max-w-[760px] font-display text-[clamp(32px,5vw,56px)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
            Your operations will either scale your firm,
            <br className="hidden sm:inline" />{" "}
            or break it.
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[16.5px] leading-relaxed text-white/65">
            Stop running client work through chaos. See PYNGYN run one of your real
            engagements, live.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton href={PRIMARY_CTA} label="Book a demo" />
            <GhostButton href={SECONDARY_CTA} label="Start free trial" />
          </div>
          <p className="mt-5 text-[12.5px] text-white/70">7-day free trial. No credit card. Cancel anytime.</p>
        </div>
      </div>
    </section>
  );
}

function FooterMini() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-start justify-between gap-3 px-5 py-7 text-[12.5px] text-white/70 sm:flex-row sm:items-center sm:px-7">
        <p>© 2026 PYNGYN, a product of VIMOVI GlobalTech Private Limited.</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <a href="/privacy" className="hover:text-white">Privacy</a>
          <a href="/terms" className="hover:text-white">Terms</a>
          <a href="/support" className="hover:text-white">Support</a>
        </div>
      </div>
    </footer>
  );
}
