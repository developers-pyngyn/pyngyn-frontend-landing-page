import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { DEMO_URL, SIGNUP_URL } from "@/components/config";
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

export const metadata: Metadata = {
  title: "Your firm's knowledge, finally working for you | Pyngyn",
  description:
    "Pyngyn is the operating system for professional services firms, built for 15–30 person consulting teams who are tired of juggling 5 platforms just to deliver one engagement. This is a 20-minute conversation, not a pitch.",
  alternates: { canonical: "/sales-pitch" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Pyngyn for PS firms, your knowledge, working for you",
    description:
      "Built for 15–30 person consulting teams who are tired of juggling 5 platforms just to deliver one engagement.",
    url: "/sales-pitch",
    type: "website",
  },
};

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const HERO_STATS: { value: string; label: string }[] = [
  { value: "35%", label: "Of your day lost to tool-switching" },
  { value: "5+", label: "Platforms to complete one engagement" },
  { value: "2x", label: "Task completion with Pyngyn" },
  { value: "$9", label: "Per seat / month. Cancel anytime." },
];

const BEFORE_MONDAY: { time: string; icon: string; body: string }[] = [
  { time: "8:45 am", icon: "📱", body: "Opened WhatsApp to find 47 messages from 3 different client threads." },
  { time: "9:10 am", icon: "💻", body: "Spent 20 minutes hunting for the proposal draft, was it in Google Drive, Notion, or email?" },
  { time: "9:35 am", icon: "🔄", body: "New consultant asked where the SOPs are. You said 'check Notion', they're outdated." },
  { time: "10:00 am", icon: "📊", body: "Client asked for a status update. You had to ping 3 people to piece together an answer." },
  { time: "10:30 am", icon: "😤", body: "First 2 hours gone. Zero billable work done. This is the fragmentation tax." },
];

const AFTER_MONDAY: { time: string; icon: string; body: string }[] = [
  { time: "8:45 am", icon: "✓", body: "Open Pyngyn. One dashboard shows all active engagements, pending tasks, and team updates. No WhatsApp hunting." },
  { time: "9:05 am", icon: "✓", body: "New consultant onboards. Finds all SOPs, client history, and playbooks in one place. Productive in 2 hours, not 2 weeks." },
  { time: "9:25 am", icon: "✓", body: "Client asks for status update. You open the engagement view, everything is there. Answer in 60 seconds." },
  { time: "9:45 am", icon: "✓", body: "AI suggests the right SOP as you create a new task. It already knows your firm's way of handling this type of engagement." },
  { time: "10:00 am", icon: "🐧", body: "Entire team is aligned. Knowledge is live. First 2 hours = 2 hours of billable work. That's the Pyngyn difference." },
];

const COST_STATS: { stat: string; title: string; body: string }[] = [
  { stat: "35%", title: "Of every workday", body: "Lost to switching between tools, searching for context, and repeating information across platforms." },
  { stat: "35%", title: "Hours lost per week", body: "At a blended billing rate of $150/hour × 35% time lost, a 20-person firm loses over $200K in recoverable hours annually." },
  { stat: "95%", title: "Team misalignment", body: "Teams work from different versions of the same information. Proposals, SOPs, client history, all fragmented." },
  { stat: "30%", title: "Tool adoption rate", body: "Of the enterprise tools firms invest in, only 30% of the team actively uses them after 3 months." },
];

type Pillar = {
  tag: string;
  title: string;
  subtitle: string;
  body: string;
  before: string;
  after: string;
};

const PILLARS: Pillar[] = [
  {
    tag: "KM",
    title: "Knowledge management",
    subtitle: "Your firm's brain, always on.",
    body: "Every proposal, SOP, framework, and client history, organized and searchable. The new consultant finds it in 30 seconds, not 30 minutes.",
    before: "SOPs in Notion nobody reads",
    after: "SOPs that surface when needed",
  },
  {
    tag: "AI",
    title: "AI that knows your firm",
    subtitle: "Not ChatGPT. Your co-pilot.",
    body: "AI trained on your own SOPs, client history, and workflows, not generic prompts. It knows your firm, your clients, your way of working.",
    before: "Generic AI that knows nothing",
    after: "AI trained on your context",
  },
  {
    tag: "CO",
    title: "Collaboration",
    subtitle: "One source of truth. Always.",
    body: "Tasks, updates, and decisions in one shared space. Every consultant aligned, without pinging 3 people for a status update.",
    before: "WhatsApp + email + Slack",
    after: "One place. Everyone aligned.",
  },
];

const COMPARE_HEAD = ["What you need", "Pyngyn", "Notion", "ClickUp", "Sana", "Atlas"];
const COMPARE_ROWS: [string, string, string, string, string, string][] = [
  ["Knowledge + tasks in one platform", "✓", "✗", "✗", "✗", "✗"],
  ["AI that knows YOUR firm's SOPs", "✓", "~", "✗", "✓", "✗"],
  ["Built for PS consulting firms", "✓", "✗", "✗", "~", "~"],
  ["SOPs that surface in workflow", "✓", "✗", "✗", "✗", "✗"],
  ["Replaces 5+ tools (not adds)", "✓", "✗", "✗", "✗", "✗"],
  ["Day-1 productivity, no training", "✓", "~", "~", "✗", "✗"],
  ["Transparent per-seat pricing", "✓", "✓", "✓", "✗", "✗"],
  ["2x task completion proven", "✓", "✗", "✗", "✗", "✗"],
];

const HOW_IT_WORKS: { day: string; icon: string; title: string; body: string }[] = [
  { day: "Day 1", icon: "📞", title: "Setup call", body: "We set up your workspace together. Import your existing SOPs, connect your team. Takes 60 minutes." },
  { day: "Day 2–3", icon: "👥", title: "Team onboarding", body: "Your team logs in. No training required, the interface is intuitive from day one. We stay on standby." },
  { day: "Day 4–7", icon: "⚡", title: "First workflows live", body: "Your first client engagement runs through Pyngyn. Tasks assigned, SOPs active, AI learning your context." },
  { day: "Day 30", icon: "✓", title: "Review & decide", body: "We review what time was saved, what got easier. If you're happy, you pay. If not, you walk away. No hard sell." },
];

const PLAN_FEATURES: string[] = [
  "Knowledge management + SOPs",
  "AI trained on your firm",
  "Projects, finances & billable timesheets",
  "Unlimited client workspaces",
  "Onboarding & setup support",
  "Cancel anytime · no lock-in",
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "We already use Notion / ClickUp.",
    a: "Those tools store documents or manage tasks. Pyngyn connects both to your AI and makes SOPs active in workflow. You'd still be using 3–4 other tools. Pyngyn replaces all of them.",
  },
  {
    q: "My team won't adopt another tool.",
    a: "We hear this every time. Pyngyn is designed for day-one productivity, no training sessions, no thick documentation. Hand it to a new hire and they're productive within the hour.",
  },
  {
    q: "Is our data safe?",
    a: "Your firm's data is encrypted, stored securely, and never used to train general AI models. Your knowledge stays yours, it only makes your Pyngyn smarter.",
  },
  {
    q: "Does PYNGYN pay for itself?",
    a: "20 consultants × 35% time saved = significant recoverable hours every week. PYNGYN pays for itself well within the first month for most firms.",
  },
];

const NEXT_STEPS: { num: string; title: string; body: string }[] = [
  { num: "01", title: "Book a 30-min demo", body: "See Pyngyn running on a real PS firm workflow. We show you exactly how it replaces your current stack." },
  { num: "02", title: "Start your free trial", body: "We set up your workspace in 60 minutes. Your team is live by end of day. No credit card needed." },
  { num: "03", title: "Pay only if you love it", body: "At day 30 we review together. If Pyngyn isn't saving your team time, you walk away. Simple." },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function MarkSymbol({ s }: { s: string }) {
  if (s === "✓") return <span className="font-bold text-positive">✓</span>;
  if (s === "~") return <span className="font-bold text-amber-600">~</span>;
  if (s === "✗") return <span className="font-bold text-muted">✗</span>;
  return <span>{s}</span>;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SalesPitchPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/sales-pitch",
            name: "Your firm's knowledge, finally working for you | Pyngyn",
            description:
              "A 20-minute conversation, not a pitch. Pyngyn for 15–30 person professional services firms.",
            breadcrumbId: "/sales-pitch#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Sales Pitch", url: "/sales-pitch" },
            ],
            "/sales-pitch"
          ),
          faqPageSchema(FAQS, "/sales-pitch"),
        ]}
      />
      <Navbar />

      <main id="main">
        {/* ===== Hero ====================================================== */}
        <section className="wrap pb-[20px] pt-[150px]">
          <span className="eyebrow">Sales pitch · 20 min</span>
          <h1 className="mt-3 max-w-[920px] font-display text-[clamp(34px,5.2vw,60px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Your firm&apos;s knowledge,{" "}
            <span className="text-accent">finally working for you.</span>
          </h1>
          <p className="lead mt-5 max-w-[760px]">
            Pyngyn is the operating system for professional services firms, built for 15–30
            person consulting teams who are tired of juggling 5 platforms just to deliver one
            engagement.
          </p>
          <p className="mt-3 max-w-[680px] text-[14.5px] text-muted">
            This is a 20-minute conversation, not a pitch. Let me show you what your team&apos;s
            day could look like.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <Link href={DEMO_URL} className="btn btn-primary">
              Book a 30-min demo →
            </Link>
            <a href={SIGNUP_URL} className="btn btn-ghost">
              Start a 30-day free trial
            </a>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="card">
                <div className="font-display text-[30px] font-semibold leading-none tracking-[-0.02em]">
                  {s.value}
                </div>
                <div className="mt-2 text-[13.5px] text-muted">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 text-[13.5px] text-muted">
            Vivek Pandey ·{" "}
            <a className="text-accent hover:underline" href="mailto:vivek.pandey@pyngyn.com">
              vivek.pandey@pyngyn.com
            </a>{" "}
            · pyngyn.ai
          </div>
        </section>

        {/* ===== Monday morning before ===================================== */}
        <section className="wrap py-[40px]">
          <span className="eyebrow">Let&apos;s start here</span>
          <h2 className="mt-3 max-w-[820px] font-display text-[clamp(24px,3vw,34px)] font-semibold leading-tight tracking-[-0.02em]">
            Think about last Monday morning.
          </h2>

          <ol className="mt-7 space-y-2.5">
            {BEFORE_MONDAY.map((b) => (
              <li
                key={b.time}
                className="flex items-start gap-4 rounded-2xl border border-line bg-white p-4 shadow-card"
              >
                <span className="w-[78px] flex-none text-[13px] font-mono font-semibold uppercase tracking-wide text-muted">
                  {b.time}
                </span>
                <span className="text-[18px]" aria-hidden="true">
                  {b.icon}
                </span>
                <span className="text-[14.5px] leading-relaxed text-ink">{b.body}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ===== Cost ====================================================== */}
        <section className="wrap py-[40px]">
          <span className="eyebrow">The real cost</span>
          <h2 className="mt-3 max-w-[820px] font-display text-[clamp(24px,3vw,34px)] font-semibold leading-tight tracking-[-0.02em]">
            This isn&apos;t a productivity problem.{" "}
            <span className="text-accent">It&apos;s a fragmentation tax.</span>
          </h2>

          <div className="mt-7 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {COST_STATS.map((s) => (
              <div key={s.title} className="card h-full">
                <div className="font-display text-[30px] font-semibold leading-none tracking-[-0.02em] text-accent">
                  {s.stat}
                </div>
                <div className="mt-3 text-[15px] font-bold text-ink">{s.title}</div>
                <div className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{s.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Solution pillars ========================================== */}
        <section className="wrap py-[40px]">
          <span className="eyebrow">The solution</span>
          <h2 className="mt-3 max-w-[820px] font-display text-[clamp(24px,3vw,34px)] font-semibold leading-tight tracking-[-0.02em]">
            One place for everything your firm knows and does.
          </h2>

          <div className="mt-8 grid gap-[22px] md:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.tag} className="card h-full">
                <div className="inline-flex h-8 items-center rounded-md bg-accent-lt px-2.5 font-mono text-[12px] font-bold tracking-[0.12em] text-accent-dk">
                  {p.tag}
                </div>
                <h3 className="mt-3 text-[18px] font-bold">{p.title}</h3>
                <div className="text-[13.5px] font-semibold text-accent">{p.subtitle}</div>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{p.body}</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-line bg-[#fbfbfd] p-3">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                      Before
                    </div>
                    <div className="mt-1 text-[13px] text-ink">{p.before}</div>
                  </div>
                  <div className="rounded-xl border border-accent/30 bg-accent-lt p-3">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-accent-dk">
                      After
                    </div>
                    <div className="mt-1 text-[13px] text-ink">{p.after}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[14px] text-muted">
            Built specifically for 15–30 person professional services and consulting firms. Not
            another horizontal tool.
          </p>
        </section>

        {/* ===== Monday with Pyngyn ====================================== */}
        <section className="wrap py-[40px]">
          <span className="eyebrow">What your Monday looks like with Pyngyn</span>
          <h2 className="mt-3 max-w-[820px] font-display text-[clamp(24px,3vw,34px)] font-semibold leading-tight tracking-[-0.02em]">
            Same team. Same clients. Zero fragmentation.
          </h2>

          <ol className="mt-7 space-y-2.5">
            {AFTER_MONDAY.map((b) => (
              <li
                key={b.time}
                className="flex items-start gap-4 rounded-2xl border border-line bg-white p-4 shadow-card"
              >
                <span className="w-[78px] flex-none text-[13px] font-mono font-semibold uppercase tracking-wide text-muted">
                  {b.time}
                </span>
                <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-positive/10 text-[12px] font-bold text-positive">
                  {b.icon}
                </span>
                <span className="text-[14.5px] leading-relaxed text-ink">{b.body}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ===== Compare ================================================== */}
        <section className="wrap py-[40px]">
          <span className="eyebrow">Why not Notion, ClickUp or others?</span>
          <h2 className="mt-3 max-w-[820px] font-display text-[clamp(24px,3vw,34px)] font-semibold leading-tight tracking-[-0.02em]">
            They built for everyone. We built for you.
          </h2>

          <div className="mt-7 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-[14.5px]">
                <thead className="bg-[#fbfbfd] text-[12px] uppercase tracking-wide text-muted">
                  <tr>
                    {COMPARE_HEAD.map((h, i) => (
                      <th
                        key={h}
                        className={`px-5 py-3 font-semibold ${i === 1 ? "text-accent-dk" : ""}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row, ri) => (
                    <tr
                      key={row[0]}
                      className={ri < COMPARE_ROWS.length - 1 ? "border-b border-line" : ""}
                    >
                      <td className="px-5 py-3.5 font-semibold text-ink">{row[0]}</td>
                      {row.slice(1).map((c, i) => (
                        <td
                          key={i}
                          className={`px-5 py-3.5 ${i === 0 ? "bg-accent-lt/40" : ""}`}
                        >
                          <MarkSymbol s={c} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-[14px] text-muted">
            The honest answer: other tools <em>add to</em> your stack. Pyngyn <em>replaces</em> it.
          </p>
        </section>

        {/* ===== Pricing summary =========================================== */}
        <section className="wrap py-[40px]">
          <span className="eyebrow">Simple pricing</span>
          <h2 className="mt-3 max-w-[820px] font-display text-[clamp(24px,3vw,34px)] font-semibold leading-tight tracking-[-0.02em]">
            One price. Everything included. Cancel anytime.
          </h2>

          <div className="mt-7 grid gap-[22px] lg:grid-cols-[1.05fr_1fr]">
            <div className="rounded-[22px] border border-accent bg-white p-7 shadow-soft ring-1 ring-accent">
              <div className="text-[11px] font-bold uppercase tracking-wider text-accent">
                Professional services plan
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-[44px] font-semibold leading-none tracking-[-0.02em]">
                  $9
                </span>
                <span className="text-[14px] text-muted">per seat / month</span>
              </div>
              <div className="mt-1 text-[13.5px] text-muted">
                Workspace · pair with Client Space ($19/client) or bundle for $24.99/mo
              </div>
              <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {PLAN_FEATURES.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[14px] text-ink">
                    <span className="mt-1 text-positive">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={DEMO_URL} className="btn btn-primary">
                  Book a demo →
                </Link>
                <a href={SIGNUP_URL} className="btn btn-ghost">
                  Start 30-day free trial
                </a>
              </div>
            </div>

            <div className="card">
              <h3 className="text-[16px] font-bold">The ROI for your firm</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                20 consultants × 35% time saved × $150/hr billing ={" "}
                <strong className="text-ink">$210K/year</strong> in recoverable value. PYNGYN
                pays for itself in the first month.
              </p>
              <h4 className="mt-6 text-[14px] font-bold uppercase tracking-wide text-muted">
                Start with a 30-day free trial
              </h4>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                No credit card. No commitment. Set up in under an hour. If it doesn&apos;t save
                your team time in 30 days, walk away.
              </p>
            </div>
          </div>
        </section>

        {/* ===== How it works ============================================== */}
        <section className="wrap py-[40px]">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-3 max-w-[820px] font-display text-[clamp(24px,3vw,34px)] font-semibold leading-tight tracking-[-0.02em]">
            Up and running in under a week.
          </h2>

          <div className="mt-8 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((h) => (
              <div key={h.day} className="card h-full">
                <div className="text-[22px]" aria-hidden="true">
                  {h.icon}
                </div>
                <div className="mt-3 text-[11.5px] font-bold uppercase tracking-wide text-accent">
                  {h.day}
                </div>
                <div className="mt-1 text-[16.5px] font-bold text-ink">{h.title}</div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{h.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[14px] text-muted">
            We handle the entire setup. You focus on client work. Our goal: you feel value in
            week 1, not month 3.
          </p>
        </section>

        {/* ===== FAQ ======================================================= */}
        <section className="wrap py-[40px]">
          <span className="eyebrow">Questions we always get</span>
          <h2 className="mt-3 font-display text-[26px] font-semibold tracking-[-0.01em]">
            Let&apos;s address them directly.
          </h2>
          <div className="mt-7 grid gap-[18px] md:grid-cols-2">
            {FAQS.map((f) => (
              <div key={f.q} className="card h-full">
                <h3 className="text-[16.5px] font-bold leading-snug">“{f.q}”</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Next steps =============================================== */}
        <section className="wrap py-[40px]">
          <div className="rounded-[24px] border border-line bg-[#0b0d12] p-8 text-white shadow-art md:p-12">
            <span className="eyebrow-dark">Ready to stop juggling tools?</span>
            <h2 className="mt-3 max-w-[760px] font-display text-[clamp(26px,3.6vw,42px)] font-semibold leading-tight tracking-[-0.02em]">
              One conversation. One demo. 30 days free.{" "}
              <span className="text-accent">No commitment.</span>
            </h2>

            <ol className="mt-8 grid gap-[18px] md:grid-cols-3">
              {NEXT_STEPS.map((s) => (
                <li
                  key={s.num}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="font-mono text-[12px] font-semibold tracking-[0.12em] text-accent">
                    {s.num}
                  </div>
                  <div className="mt-2 text-[15.5px] font-bold">{s.title}</div>
                  <div className="mt-1.5 text-[13.5px] leading-relaxed text-white/70">
                    {s.body}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link href={DEMO_URL} className="btn bg-white text-ink hover:bg-white/90">
                Book a demo
              </Link>
              <a
                href={SIGNUP_URL}
                className="btn border border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                Start free trial
              </a>
            </div>

            <div className="mt-8 text-[13px] text-white/55">
              <strong className="text-white/80">Scale simply, work happily.</strong> · 15–30
              person PS &amp; consulting firms · Vivek Pandey, Founder &amp; CEO ·{" "}
              <a className="hover:text-white" href="mailto:vivek.pandey@pyngyn.com">
                vivek.pandey@pyngyn.com
              </a>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
