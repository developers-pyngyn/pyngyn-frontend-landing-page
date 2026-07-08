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

export const metadata: Metadata = {
  title: "PYNGYN for Accountants & CA Firms | Audit & Filing Workflows",
  description: "PYNGYN runs audit pipelines, tax filings, and statutory deadlines for accounting and CA firms. A standalone branded Client Space for every client, with Workspace available on its own or bundled.",
  alternates: { canonical: "/solutions/accountants" },
  openGraph: {
    images: [OG_IMAGE],
    title: "PYNGYN for Accountants & CA Firms | Audit & Filing Workflows",
    description: "PYNGYN runs audit pipelines, tax filings, and statutory deadlines for accounting and CA firms. A standalone branded Client Space for every client, with Workspace available on its own or bundled.",
    url: "/solutions/accountants",
    type: "website",
  },
};

const PROBLEMS: { num: string; title: string; body: string }[] = [
  { num: "01", title: "Deadline chaos in filing season", body: "Statutory deadlines for dozens of clients live in spreadsheets and individual calendars. One missed filing triggers penalties and damages trust." },
  { num: "02", title: "Status-chasing at review time", body: "Partners spend review week chasing associates for where the files are. The status call is the only source of truth." },
  { num: "03", title: "Knowledge locked in senior staff", body: "Audit programmes and client context sit with the manager who has always run the engagement. When they leave, onboarding the next person takes months." },
  { num: "04", title: "Billable time lost to administration", body: "Fee-earners spend time on follow-ups, status updates, and internal check-ins that should be automated, not logged against a client." },
  { num: "05", title: "No live profitability", body: "You find out an engagement was unprofitable when you review billing at the end of the quarter, not while you could still fix it." },
  { num: "06", title: "Client documents scattered", body: "Client-provided records arrive by email, WhatsApp, and drive links. Collecting and chasing them is a job in itself." },
];

const WORKSPACE_BULLETS: string[] = [
  "Audit and filing plans with statutory deadline tracking",
  "Billable timesheet logging per engagement",
  "Finance dashboard: revenue, realization, and profitability per client",
  "Business Brain AI: drafts status, flags at-risk filings",
  "Roles for partners, managers, and juniors",
];

const CLIENTSPACE_BULLETS: string[] = [
  "Branded client portal per engagement",
  "Document collection checklist with status",
  "Client-visible milestones and filing dates",
  "Approvals for accounts and tax returns before filing",
];

const BOARD_TASKS: { label: string; tag: string }[] = [
  { label: "Engagement letter signed", tag: "Done" },
  { label: "Collect financial records", tag: "In progress" },
  { label: "Audit fieldwork", tag: "In progress" },
  { label: "Review queries cleared", tag: "To do" },
  { label: "File tax return", tag: "At risk" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Does PYNGYN track statutory and tax deadlines?", a: "Yes. Deadlines are first-class objects. Business Brain AI watches dependencies and flags at-risk filings before the due date, not on it." },
  { q: "What is Client Space for an accounting firm?", a: "Each client gets a branded portal with a document collection checklist, filing milestones, and an approvals flow for accounts and tax returns before submission." },
  { q: "How does it handle busy-season volume?", a: "PYNGYN is designed around the multi-client, deadline-driven rhythm of accounting firms. You can run hundreds of concurrent engagements with a single dashboard view." },
  { q: "Can clients submit documents through their portal?", a: "Clients see a collection checklist in their Client Space and can approve documents. For document upload, connect PYNGYN to Google Drive or your existing document management system." },
  { q: "How long does setup take?", a: "Most accounting firms have their first client engagements running inside a week. Import existing client lists, set up filing plans, and add clients to their Client Space on day one." },
];

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 flex-none text-positive">
      <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TagPill({ tag }: { tag: string }) {
  const styles: Record<string, string> = {
    "Done":        "bg-positive/10 text-positive",
    "In progress": "bg-accent-lt text-accent-dk",
    "To do":       "bg-surface text-muted",
    "At risk":     "bg-[#fff3cd] text-[#92400e]",
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${styles[tag] ?? "bg-surface text-muted"}`}>
      {tag}
    </span>
  );
}

export default function VerticalPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/solutions/accountants",
            name: "PYNGYN for Accountants & CA Firms | Audit & Filing Workflows",
            description: "PYNGYN runs audit pipelines, tax filings, and statutory deadlines for accounting and CA firms. A standalone branded Client Space for every client, with Workspace available on its own or bundled.",
            breadcrumbId: "/solutions/accountants#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Solutions", url: "/solutions/professional-services" },
              { name: "Accountants & CAs", url: "/solutions/accountants" },
            ],
            "/solutions/accountants"
          ),
          faqPageSchema(FAQS, "/solutions/accountants"),
        ]}
      />
      <Navbar />
      <main id="main">

        {/* ===== Hero ================================================== */}
        <section className="wrap pb-[60px] pt-[140px]">
          <span className="eyebrow">Accounting & CA firms</span>
          <h1 className="mt-4 max-w-[860px] font-display text-[clamp(34px,5.2vw,60px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Close the books and
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">never miss a deadline.</span>
          </h1>
          <p className="lead mt-5 max-w-[680px]">PYNGYN gives every client of your accounting firm a standalone branded Client Space, document checklists, filing status, and approvals in one secure place instead of email. Add Workspace, a separate product, to run your audits, filings, and statutory deadlines internally.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={DEMO_URL} className="btn btn-accent">Book a demo</a>
            <a href={SIGNUP_URL} className="btn btn-primary">Start free trial</a>
          </div>
          <p className="mt-4 text-[13px] text-muted">
            30-min walkthrough on your firm&apos;s workflows · No commitment
          </p>
        </section>

        {/* ===== Mini board ============================================= */}
        <section className="wrap pb-[60px]">
          <div className="mx-auto max-w-[620px] overflow-hidden rounded-[20px] border border-line bg-white shadow-card">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28ca41]" />
              <span className="ml-2 truncate font-mono text-[11.5px] text-muted">Northwind Pvt Ltd · FY Audit</span>
            </div>
            <ul className="divide-y divide-line">
              {BOARD_TASKS.map((t) => (
                <li key={t.label} className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-[14px] text-ink">{t.label}</span>
                  <TagPill tag={t.tag} />
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 border-t border-line bg-positive/5 px-5 py-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="flex-none text-positive">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 7v6l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-[12.5px] text-positive">PYNGYN flagged 1 task at risk: the filing depends on fieldwork, which is 2 days behind.</span>
            </div>
          </div>
        </section>

        {/* ===== Problems ============================================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <span className="eyebrow">Why firms switch</span>
            <h2 className="mt-3 max-w-[760px] font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.025em]">
              The problems every accounting & ca firms knows.
            </h2>
            <div className="mt-10 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
              {PROBLEMS.map((p) => (
                <div key={p.num} className="card h-full">
                  <div className="index-num">{p.num}</div>
                  <h3 className="mt-3 text-[17px] font-bold leading-snug">{p.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Client Space =========================================== */}
        <section className="section">
          <div className="wrap">
            <div className="flex items-center gap-3">
              <span className="eyebrow">The client portal</span>
              <span className="rounded-full border border-accent/40 px-2.5 py-0.5 text-[11px] font-bold text-accent">Client Space</span>
            </div>
            <h2 className="mt-3 max-w-[820px] font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.025em]">
              A branded portal for every client.
              <span className="block text-accent">$19 per client / month, standalone.</span>
            </h2>
            <p className="lead mt-4 max-w-[640px]">
              Give each client their own isolated, white-labeled portal. They see what you
              want them to see, nothing from your other clients.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {CLIENTSPACE_BULLETS.map((b) => (
                <li key={b} className="card flex items-start gap-3">
                  <Check />
                  <span className="text-[15px]">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== Workspace ============================================= */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <div className="flex items-center gap-3">
              <span className="eyebrow">The engine</span>
              <span className="rounded-full border border-line px-2.5 py-0.5 text-[11px] font-bold text-muted">Workspace</span>
            </div>
            <h2 className="mt-3 max-w-[820px] font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.025em]">
              Your firm&apos;s operating system.
              <span className="block text-accent">$9 per seat / month.</span>
            </h2>
            <p className="lead mt-4 max-w-[640px]">
              Everything your team needs to run accounting & ca firms work, with AI that keeps
              plans, status, and risk current automatically.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {WORKSPACE_BULLETS.map((b) => (
                <li key={b} className="card flex items-start gap-3">
                  <Check />
                  <span className="text-[15px]">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== Pricing =============================================== */}
        <section className="section">
          <div className="wrap text-center">
            <span className="eyebrow">Pricing</span>
            <h2 className="mt-3 font-display text-[clamp(26px,3.4vw,38px)] font-semibold tracking-[-0.02em]">
              Simple and predictable.
            </h2>
            <p className="lead mx-auto mt-3 max-w-[520px]">
              Choose Client Space, Workspace, or bundle both for $24.99/mo.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[15px]">
              <div className="rounded-2xl border border-accent bg-accent/5 px-6 py-4 text-center shadow-soft">
                <div className="font-display text-[32px] font-semibold">$19</div>
                <div className="mt-1 text-muted">per client / month · Client Space</div>
              </div>
              <div className="rounded-2xl border border-line bg-white px-6 py-4 text-center shadow-card">
                <div className="font-display text-[32px] font-semibold">$9</div>
                <div className="mt-1 text-muted">per seat / month · Workspace</div>
              </div>
              <span className="text-[22px] text-muted">or bundle for</span>
              <div className="rounded-2xl border border-line bg-white px-6 py-4 text-center shadow-card">
                <div className="font-display text-[32px] font-semibold">$24.99</div>
                <div className="mt-1 text-muted">/mo · both together</div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={SIGNUP_URL} className="btn btn-accent">Start free trial</a>
              <a href={DEMO_URL} className="btn btn-primary">Book a demo</a>
            </div>
            <p className="mt-4 text-[13px] text-muted">
              Enterprise pricing available for larger firms ·{" "}
              <Link href="/pricing" className="underline underline-offset-2 hover:text-ink">Full pricing →</Link>
            </p>
          </div>
        </section>

        {/* ===== FAQ =================================================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-3 font-display text-[clamp(24px,3vw,32px)] font-semibold tracking-[-0.01em]">
              Questions from accounting & ca firms.
            </h2>
            <div className="mt-7 grid gap-[18px] md:grid-cols-2">
              {FAQS.map((f) => (
                <div key={f.q} className="card h-full">
                  <h3 className="text-[16.5px] font-bold leading-snug">{f.q}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Hub link ============================================== */}
        <section className="section">
          <div className="wrap text-center">
            <p className="text-[14px] text-muted">
              Not exactly your firm?{" "}
              <Link href="/solutions/professional-services" className="font-semibold text-accent hover:underline">
                See all professional-services verticals →
              </Link>
            </p>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
