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
  title: "Professional Services OS | PYNGYN",
  description:
    "PYNGYN gives every client a standalone branded Client Space (a portal for status, documents, and approvals). Workspace, your firm's back office, is available on its own or bundled. Built for lawyers, accountants, consultants, agencies, and architects.",
  alternates: { canonical: "/solutions/professional-services" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Professional Services OS | PYNGYN",
    description:
      "Client Space for every client. Workspace for your team. The operating system for professional-services firms.",
    url: "/solutions/professional-services",
    type: "website",
  },
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const VERTICALS: { label: string; href: string; icon: string; blurb: string }[] = [
  { label: "Lawyers", href: "/solutions/lawyers", icon: "⚖️", blurb: "Matter management, deadlines, and client portals for law firms." },
  { label: "Accountants & CAs", href: "/solutions/accountants", icon: "📊", blurb: "Audit pipelines, statutory deadlines, and filing workflows." },
  { label: "Marketing Consultants", href: "/solutions/consultants", icon: "📣", blurb: "Retainers, campaigns, and client approvals in one place." },
  { label: "Creative Services", href: "/solutions/creative-services", icon: "🎨", blurb: "Briefs, revision rounds, and sign-offs across client projects." },
  { label: "Architects", href: "/solutions/architects", icon: "📐", blurb: "Design phases, consultant coordination, and permit tracking." },
];

const PROBLEMS: { num: string; title: string; body: string }[] = [
  { num: "01", title: "Status lives in WhatsApp", body: "Updates scatter across messages, emails, and spreadsheets. Nobody has the full picture before a client call, and every partner carries the picture in their head." },
  { num: "02", title: "You learn about losses after invoicing", body: "Without live engagement health, you only find out a project was unprofitable after billing. By then the overrun has already happened." },
  { num: "03", title: "Knowledge walks out the door", body: "A senior leaves and takes five years of client context with them. Nobody wrote it down. The next engagement starts from zero." },
  { num: "04", title: "Clients don't know where things stand", body: "Clients email for updates. You chase the team for answers. Everybody loses time doing administration instead of work." },
  { num: "05", title: "SOP drift erodes quality", body: "The onboarding process lives in one partner's head. It gets done differently every time. Quality depends on who is available." },
  { num: "06", title: "Deadlines slip without warning", body: "Risk is invisible until it has already cost you the date. The first time you hear about a problem is when the client does." },
];

const WORKSPACE_FEATURES: { icon: string; title: string; body: string }[] = [
  { icon: "📋", title: "Projects, tasks, and calendar", body: "Run all client engagements and internal work in one board. Milestones, owners, and due dates always visible." },
  { icon: "💰", title: "Finance dashboard", body: "Revenue, MRR, and profit tracked live. Know if an engagement is profitable while it's running, not after the invoice." },
  { icon: "⏱️", title: "Billable timesheets", body: "Log billable vs non-billable hours. Export to CSV for invoicing with one click." },
  { icon: "🧠", title: "Business Brain", body: "Context-aware AI trained on your firm's knowledge. Drafts plans, writes status, and flags risk." },
  { icon: "⚡", title: "Automation builder", body: "Plain-English automation: 'when a task moves to review, notify the client.' No code needed." },
  { icon: "👥", title: "Team skills and roles", body: "Skills, benchmarks, and gap insights across directors, managers, and ICs. 240+ workflow templates." },
];

const CLIENTSPACE_FEATURES: { icon: string; title: string; body: string }[] = [
  { icon: "🏷️", title: "Branded client portal", body: "White-labeled with your firm's identity. Clients land in a space that looks like yours." },
  { icon: "🔒", title: "One isolated space per client", body: "Each client sees only their own engagement. Nothing leaks between clients." },
  { icon: "✅", title: "Client-visible tasks and status", body: "Clients see what you want them to see: deliverables, milestones, and current status, nothing else." },
  { icon: "📝", title: "Approvals and sign-off", body: "Clients approve deliverables inside their portal. No email threads, no lost attachments." },
  { icon: "🔗", title: "Shareable invite links", body: "Add clients with a link. No onboarding required on their end." },
];

const ROLES: { role: string; icon: string; sees: string; does: string }[] = [
  { role: "Director / Partner", icon: "🏛️", sees: "Firm-wide: all engagements, finances, utilisation, and goals.", does: "Sets strategy, approves scope changes, reviews profitability." },
  { role: "Manager", icon: "📌", sees: "Their engagements: tasks, timelines, team workload, and risk.", does: "Plans delivery, unblocks the team, writes client updates." },
  { role: "IC / Associate", icon: "💼", sees: "Their assigned tasks and what they need to complete them.", does: "Does the work, logs time, flags blockers." },
  { role: "Client", icon: "🤝", sees: "Their Client Space only: deliverables, status, and approvals.", does: "Reviews work, gives feedback, signs off deliverables." },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Who is PYNGYN built for?", a: "Professional-services firms, law, accounting, consulting, agencies, creative studios, and architecture practices. It's not a generic project tool; every feature is designed around how firms deliver client work." },
  { q: "What is Workspace?", a: "Workspace is the operating system for your firm's internal work: projects, tasks, calendar, finance, billable timesheets, Business Brain AI, automations, team skills, and 240+ templates. Every internal seat gets Workspace." },
  { q: "What is Client Space?", a: "Client Space is a branded client portal, sold standalone at $19/month per client, no Workspace purchase required. Each client gets their own isolated space showing their deliverables, status, and approvals. Firms that also want Workspace can bundle both for $24.99/month." },
  { q: "What are the four roles?", a: "Directors/partners see the whole firm. Managers see their engagements. ICs see their tasks. Clients see only their own Client Space. Role-based access is enforced automatically." },
  { q: "How is PYNGYN different from generic PM tools?", a: "Generic tools (Asana, Monday, ClickUp) have no concept of a client portal, billable time, engagement profitability, or firm-level finance. PYNGYN is built around the professional-services delivery model from the ground up." },
  { q: "How long does setup take?", a: "Most firms are delivering inside PYNGYN within a week. Import from your current tool, set up your first engagement, and invite clients to their Client Space, all on day one." },
];

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 flex-none text-positive">
      <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ProfessionalServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/solutions/professional-services",
            name: "Professional Services OS | PYNGYN",
            description:
              "PYNGYN gives every client a standalone branded Client Space. Workspace, your firm's back office, is available on its own or bundled.",
            breadcrumbId: "/solutions/professional-services#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Solutions", url: "/solutions/professional-services" },
              { name: "Professional Services", url: "/solutions/professional-services" },
            ],
            "/solutions/professional-services"
          ),
          faqPageSchema(FAQS, "/solutions/professional-services"),
        ]}
      />
      <Navbar />

      <main id="main">

        {/* ===== Hero ====================================================== */}
        <section className="wrap pb-[60px] pt-[140px]">
          <span className="eyebrow">Professional Services</span>
          <h1 className="mt-4 max-w-[900px] font-display text-[clamp(34px,5.2vw,60px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            One place to run your firm
            <br className="hidden sm:block" /> and{" "}
            <span className="text-accent">every client engagement.</span>
          </h1>
          <p className="lead mt-5 max-w-[680px]">
            PYNGYN gives every client their own standalone branded <strong>Client Space</strong>, a
            portal where they see their status, documents, and approvals 24/7, instead of
            emailing you for updates. No <strong>Workspace</strong> purchase required, though firms
            that also want to run projects, finances, and billable time internally can add it
            or bundle both.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={DEMO_URL} className="btn btn-accent">Book a demo</a>
            <a href={SIGNUP_URL} className="btn btn-primary">Start free trial</a>
          </div>
          <p className="mt-4 text-[13px] text-muted">30-min walkthrough on your firm&apos;s workflows · No commitment</p>
        </section>

        {/* ===== Verticals nav ============================================= */}
        <section className="wrap pb-[60px]">
          <span className="eyebrow">Built for your practice</span>
          <h2 className="mt-3 font-display text-[clamp(22px,3vw,32px)] font-semibold tracking-[-0.02em]">
            Which type of firm are you?
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {VERTICALS.map((v) => (
              <Link
                key={v.label}
                href={v.href}
                className="card group flex flex-col gap-3 transition-all hover:border-accent hover:shadow-soft"
              >
                <span className="text-[28px]" aria-hidden="true">{v.icon}</span>
                <div>
                  <div className="font-semibold text-ink group-hover:text-accent transition-colors">{v.label}</div>
                  <div className="mt-1 text-[13px] leading-relaxed text-muted">{v.blurb}</div>
                </div>
                <span className="mt-auto text-[12.5px] font-semibold text-accent">See how it works →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== Problems ================================================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <span className="eyebrow">Why firms switch</span>
            <h2 className="mt-3 max-w-[760px] font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.025em]">
              The problems every services firm knows.
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

        {/* ===== Client Space =============================================== */}
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
            <p className="lead mt-4 max-w-[680px]">
              Give each client their own isolated, white-labeled portal. They see their
              deliverables, status, and approvals, nothing from your other clients, and nothing
              from your internal operations.
            </p>
            <div className="mt-10 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
              {CLIENTSPACE_FEATURES.map((f) => (
                <div key={f.title} className="card h-full">
                  <span className="text-[28px]" aria-hidden="true">{f.icon}</span>
                  <h3 className="mt-3 text-[16px] font-bold">{f.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Workspace ================================================= */}
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
            <p className="lead mt-4 max-w-[680px]">
              Everything directors, managers, and ICs need to run client work and the firm in
              one place, with AI that keeps plans, status, and risk current automatically.
            </p>
            <div className="mt-10 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
              {WORKSPACE_FEATURES.map((f) => (
                <div key={f.title} className="card h-full">
                  <span className="text-[28px]" aria-hidden="true">{f.icon}</span>
                  <h3 className="mt-3 text-[16px] font-bold">{f.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Four roles ================================================ */}
        <section className="section">
          <div className="wrap">
            <span className="eyebrow">Role-based access</span>
            <h2 className="mt-3 max-w-[760px] font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.025em]">
              Everyone sees exactly what they need.
            </h2>
            <p className="lead mt-4 max-w-[640px]">
              PYNGYN comes with four roles. Each role controls what a person can see and do,
              enforced automatically, no configuration required.
            </p>
            <div className="mt-10 grid gap-[18px] sm:grid-cols-2">
              {ROLES.map((r) => (
                <div key={r.role} className="card h-full">
                  <div className="flex items-center gap-3">
                    <span className="text-[28px]" aria-hidden="true">{r.icon}</span>
                    <h3 className="text-[17px] font-bold">{r.role}</h3>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex gap-2 text-[14px]">
                      <Check />
                      <span><strong>Sees:</strong> {r.sees}</span>
                    </div>
                    <div className="flex gap-2 text-[14px]">
                      <Check />
                      <span><strong>Does:</strong> {r.does}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Pricing summary =========================================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <span className="eyebrow">Pricing</span>
            <h2 className="mt-3 font-display text-[clamp(26px,3.4vw,40px)] font-semibold tracking-[-0.02em]">
              Simple. Predictable. Fair.
            </h2>
            <p className="lead mt-3 max-w-[580px]">
              Buy Client Space on its own, Workspace on its own, or bundle both for $24.99/mo.
            </p>
            <div className="mt-10 grid gap-[22px] lg:grid-cols-4">
              {/* Client Space */}
              <div className="flex flex-col rounded-[22px] border border-accent bg-white p-7 shadow-soft ring-1 ring-accent">
                <div className="flex items-center gap-2">
                  <h3 className="text-[20px] font-bold">Client Space</h3>
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold text-white">Most popular</span>
                </div>
                <div className="mt-1 text-[13px] text-muted">Per client · standalone</div>
                <div className="mt-5">
                  <span className="font-display text-[40px] font-semibold leading-none tracking-[-0.02em]">$19</span>
                  <div className="mt-1.5 text-[13px] text-muted">/client · per month</div>
                </div>
                <a href={SIGNUP_URL} className="btn btn-accent mt-6 justify-center">Start free trial</a>
                <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
                  {["Branded white-labeled client portal", "One isolated space per client", "Client-visible tasks and status", "Approvals and sign-off", "The client role", "No Workspace required"].map(f => (
                    <li key={f} className="flex gap-2.5 text-[14px]"><Check />{f}</li>
                  ))}
                </ul>
              </div>
              {/* Workspace */}
              <div className="flex flex-col rounded-[22px] border border-line bg-white p-7 shadow-card">
                <h3 className="text-[20px] font-bold">Workspace</h3>
                <div className="mt-1 text-[13px] text-muted">Per internal seat</div>
                <div className="mt-5">
                  <span className="font-display text-[40px] font-semibold leading-none tracking-[-0.02em]">$9</span>
                  <div className="mt-1.5 text-[13px] text-muted">/seat · per month</div>
                </div>
                <a href={SIGNUP_URL} className="btn btn-primary mt-6 justify-center">Start free trial</a>
                <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
                  {["Projects, tasks, and calendar", "Finance dashboard: revenue, MRR, profit", "Billable vs non-billable timesheets", "Business Brain AI", "Plain-English automation builder", "240+ workflow templates"].map(f => (
                    <li key={f} className="flex gap-2.5 text-[14px]"><Check />{f}</li>
                  ))}
                </ul>
              </div>
              {/* Combined Bundle */}
              <div className="flex flex-col rounded-[22px] border border-line bg-white p-7 shadow-card">
                <div className="flex items-center gap-2">
                  <h3 className="text-[20px] font-bold">Combined Bundle</h3>
                  <span className="rounded-full bg-ink/5 px-2.5 py-0.5 text-[11px] font-bold text-ink">Best value</span>
                </div>
                <div className="mt-1 text-[13px] text-muted">Workspace + Client Space</div>
                <div className="mt-5">
                  <span className="font-display text-[40px] font-semibold leading-none tracking-[-0.02em]">$24.99</span>
                  <div className="mt-1.5 text-[13px] text-muted">/mo · per seat + client</div>
                </div>
                <a href={SIGNUP_URL} className="btn btn-primary mt-6 justify-center">Start free trial</a>
                <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
                  {["All of Workspace", "All of Client Space", "Save $3+ per month vs. separately", "One bill for your firm"].map(f => (
                    <li key={f} className="flex gap-2.5 text-[14px]"><Check />{f}</li>
                  ))}
                </ul>
              </div>
              {/* Enterprise */}
              <div className="flex flex-col rounded-[22px] border border-line bg-white p-7 shadow-card">
                <h3 className="text-[20px] font-bold">Enterprise</h3>
                <div className="mt-1 text-[13px] text-muted">Unlimited seats</div>
                <div className="mt-5">
                  <span className="font-display text-[40px] font-semibold leading-none tracking-[-0.02em]">Custom</span>
                  <div className="mt-1.5 text-[13px] text-muted">Tailored to your firm</div>
                </div>
                <a href={DEMO_URL} className="btn btn-ghost mt-6 justify-center">Contact sales</a>
                <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
                  {["Everything in Workspace + Client Space", "SSO / SAML and RBAC", "Audit log and data residency", "Custom fields, API, and webhooks", "Dedicated onboarding and support"].map(f => (
                    <li key={f} className="flex gap-2.5 text-[14px]"><Check />{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ======================================================= */}
        <section className="section">
          <div className="wrap">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-3 font-display text-[clamp(24px,3vw,32px)] font-semibold tracking-[-0.01em]">
              Questions PS firms ask us.
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

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
