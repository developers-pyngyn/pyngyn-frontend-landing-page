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
  title: "PYNGYN for Creative Studios | Briefs, Revisions & Client Sign-off",
  description: "PYNGYN gives every client of your studio a standalone branded Client Space to review, feedback, and sign off work. Workspace, which runs your briefs, production, and revision rounds, is a separate product you can add.",
  alternates: { canonical: "/solutions/creative-services" },
  openGraph: {
    images: [OG_IMAGE],
    title: "PYNGYN for Creative Studios | Briefs, Revisions & Client Sign-off",
    description: "PYNGYN gives every client of your studio a standalone branded Client Space to review, feedback, and sign off work. Workspace, which runs your briefs, production, and revision rounds, is a separate product you can add.",
    url: "/solutions/creative-services",
    type: "website",
  },
};

const PROBLEMS: { num: string; title: string; body: string }[] = [
  { num: "01", title: "Briefs misunderstood at handoff", body: "The brief goes in, the first concepts come back, and the client says that is not what they meant. Two rounds wasted because the brief was never locked." },
  { num: "02", title: "Revision rounds go over", body: "Three rounds are in scope. The client is on round six. Nobody tracked the extras, and the conversation about scope is awkward to have after the fact." },
  { num: "03", title: "Feedback scattered everywhere", body: "Notes come in by email, voice memo, marked-up PDF, and in comments on a shared file. Consolidating them is its own project." },
  { num: "04", title: "Deadlines slip without warning", body: "Production depends on a client decision that has not come. The deadline risk is invisible until you are already late." },
  { num: "05", title: "No live profitability per project", body: "Fixed-fee projects live and die by hours spent. You find out you went over at billing, not when you could have reset scope." },
  { num: "06", title: "Client confusion at delivery", body: "The client is not sure what they approved, when, or what is still outstanding. Sign-off turns into a back-and-forth." },
];

const WORKSPACE_BULLETS: string[] = [
  "Project plans with brief lock, production, and sign-off phases",
  "Revision round tracking with scope limits",
  "Billable timesheet logging per client project",
  "Business Brain AI: drafts status and flags overdue feedback",
  "Roles for creative directors, designers, and producers",
];

const CLIENTSPACE_BULLETS: string[] = [
  "Branded client portal per project",
  "Brief lock and approval at kickoff",
  "Consolidated feedback and revision rounds",
  "Final sign-off with a versioned approval record",
];

const BOARD_TASKS: { label: string; tag: string }[] = [
  { label: "Creative brief signed off", tag: "Done" },
  { label: "Concept exploration", tag: "In progress" },
  { label: "Design production", tag: "In progress" },
  { label: "Client sign-off", tag: "At risk" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Can PYNGYN track revision rounds against a scope limit?", a: "Yes. Each project can have a defined number of revision rounds. PYNGYN tracks where you are against scope and alerts you before you exceed it." },
  { q: "How does Client Space work for creative feedback?", a: "Clients receive work inside their branded portal, give structured feedback, and formally approve rounds there. Every version and comment is logged, no scattered email threads." },
  { q: "How do I track profitability on fixed-fee projects?", a: "Team members log hours per project. The finance dashboard shows hours delivered vs budgeted and margin in real time, so you can act before going over, not after." },
  { q: "Can multiple team members work on one client project?", a: "Yes. The project is shared across the team with role-based access. Each person sees their tasks; the creative director sees the full picture." },
  { q: "How long does setup take?", a: "Most studios have their first client project running inside a week. Set up a project from a template, invite the client to their Client Space, and start the brief-lock process on day one." },
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
            url: "/solutions/creative-services",
            name: "PYNGYN for Creative Studios | Briefs, Revisions & Client Sign-off",
            description: "PYNGYN gives every client of your studio a standalone branded Client Space to review, feedback, and sign off work. Workspace, which runs your briefs, production, and revision rounds, is a separate product you can add.",
            breadcrumbId: "/solutions/creative-services#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Solutions", url: "/solutions/professional-services" },
              { name: "Creative Services", url: "/solutions/creative-services" },
            ],
            "/solutions/creative-services"
          ),
          faqPageSchema(FAQS, "/solutions/creative-services"),
        ]}
      />
      <Navbar />
      <main id="main">

        {/* ===== Hero ================================================== */}
        <section className="wrap pb-[60px] pt-[140px]">
          <span className="eyebrow">Creative studios</span>
          <h1 className="mt-4 max-w-[860px] font-display text-[clamp(34px,5.2vw,60px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Deliver creative work
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">on brief and on time.</span>
          </h1>
          <p className="lead mt-5 max-w-[680px]">PYNGYN gives every client of your studio a standalone branded Client Space, to review work, leave feedback, and sign off rounds in one place instead of scattered email and PDFs. Add Workspace, a separate product, to run your briefs, production, and revision rounds internally.</p>
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
              <span className="ml-2 truncate font-mono text-[11.5px] text-muted">Lumen Studio · Brand Refresh</span>
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
              <span className="text-[12.5px] text-positive">PYNGYN flagged 1 task at risk: sign-off depends on production, which is 2 days behind.</span>
            </div>
          </div>
        </section>

        {/* ===== Problems ============================================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <span className="eyebrow">Why firms switch</span>
            <h2 className="mt-3 max-w-[760px] font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.025em]">
              The problems every creative studios knows.
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
              Everything your team needs to run creative studios work, with AI that keeps
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
              Questions from creative studios.
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
