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
  title: "PYNGYN for Law Firms | Matter Management & Client Portals",
  description: "PYNGYN runs matters, deadlines, and client communication for law firms. A standalone branded Client Space for every client, with Workspace available on its own or bundled.",
  alternates: { canonical: "/solutions/lawyers" },
  openGraph: {
    images: [OG_IMAGE],
    title: "PYNGYN for Law Firms | Matter Management & Client Portals",
    description: "PYNGYN runs matters, deadlines, and client communication for law firms. A standalone branded Client Space for every client, with Workspace available on its own or bundled.",
    url: "/solutions/lawyers",
    type: "website",
  },
};

const PROBLEMS: { num: string; title: string; body: string }[] = [
  { num: "01", title: "Matter overload", body: "Matters are tracked across spreadsheets, emails, and wall calendars. A filing date slips and nobody catches it until the day before." },
  { num: "02", title: "Client chasing", body: "Clients email for updates. You chase your team for the answer. Both sides waste hours doing administration instead of legal work." },
  { num: "03", title: "Knowledge locked in people", body: "A senior solicitor leaves and takes five years of client context. The next fee-earner starts the relationship from zero." },
  { num: "04", title: "Invisible risk", body: "A deadline depends on a client sign-off that is two days late. Nobody flags it until the filing date is already at risk." },
  { num: "05", title: "Scope creep on fixed fees", body: "Small extra asks pile up. The team absorbs the time. The firm discovers the overrun after the invoice goes out." },
  { num: "06", title: "No live profitability", body: "You find out a matter was unprofitable at the end of the year, not while you could still fix it." },
];

const WORKSPACE_BULLETS: string[] = [
  "Matter plans with milestones and court deadlines",
  "Conflicts check and intake workflow",
  "Billable timesheet logging per matter",
  "Business Brain AI: drafts status and flags risk",
  "Roles for partners, associates, and paralegals",
];

const CLIENTSPACE_BULLETS: string[] = [
  "Branded client portal per matter",
  "Matter status, key dates, and documents",
  "Client-visible tasks and sign-off",
  "Approvals for instructions and deliverables",
];

const BOARD_TASKS: { label: string; tag: string }[] = [
  { label: "Open matter & run conflicts check", tag: "Done" },
  { label: "Draft complaint", tag: "In progress" },
  { label: "Compile evidence & exhibits", tag: "In progress" },
  { label: "Client review & sign-off", tag: "To do" },
  { label: "File with court & serve", tag: "At risk" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Is PYNGYN designed specifically for law firms?", a: "Yes. Matter management, court-deadline tracking, conflicts check workflows, and client portals are all built into the product. It is not a generic task tool repurposed for legal." },
  { q: "What is Client Space for a law firm?", a: "Each client gets a branded portal showing their matter status, key dates, and documents. They can review and approve deliverables inside their portal, no email threads." },
  { q: "Does PYNGYN track court and filing deadlines?", a: "Yes. Deadlines are first-class objects in PYNGYN. Business Brain AI watches dependencies and flags at-risk dates before they become a problem." },
  { q: "How do billable timesheets work?", a: "Fee-earners log time against each matter. You see billable vs non-billable hours and matter-level profitability in real time, not at invoice time." },
  { q: "How long does setup take?", a: "Most firms have their first matters running inside a week. Import existing matters, set up your first client Client Space, and invite the client, all on day one." },
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
            url: "/solutions/lawyers",
            name: "PYNGYN for Law Firms | Matter Management & Client Portals",
            description: "PYNGYN runs matters, deadlines, and client communication for law firms. A standalone branded Client Space for every client, with Workspace available on its own or bundled.",
            breadcrumbId: "/solutions/lawyers#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Solutions", url: "/solutions/professional-services" },
              { name: "Lawyers", url: "/solutions/lawyers" },
            ],
            "/solutions/lawyers"
          ),
          faqPageSchema(FAQS, "/solutions/lawyers"),
        ]}
      />
      <Navbar />
      <main id="main">

        {/* ===== Hero ================================================== */}
        <section className="wrap pb-[60px] pt-[140px]">
          <span className="eyebrow">Law firms</span>
          <h1 className="mt-4 max-w-[860px] font-display text-[clamp(34px,5.2vw,60px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Run every matter from
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">intake to filing.</span>
          </h1>
          <p className="lead mt-5 max-w-[680px]">PYNGYN gives every client of your law firm a standalone branded Client Space, their matter status, documents, and approvals, available 24/7 instead of by email. Add Workspace, a separate product, to run your matters, deadlines, and billable time internally.</p>
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
              <span className="ml-2 truncate font-mono text-[11.5px] text-muted">Acme Corp v. Dalton · Matter</span>
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
              <span className="text-[12.5px] text-positive">PYNGYN flagged 1 task at risk: filing depends on client sign-off, which is 2 days behind.</span>
            </div>
          </div>
        </section>

        {/* ===== Problems ============================================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <span className="eyebrow">Why firms switch</span>
            <h2 className="mt-3 max-w-[760px] font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.025em]">
              The problems every law firms knows.
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
              Everything your team needs to run law firms work, with AI that keeps
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
              Questions from law firms.
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
