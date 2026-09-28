import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { DEMO_URL, SIGNUP_URL, PRICING_URL } from "@/components/config";
import {
  OG_IMAGE,
  JsonLd,
  breadcrumbSchema,
  faqPageSchema,
  webPageSchema,
} from "@/components/schema";

export const metadata: Metadata = {
  title: "Client Portal Software | Secure Client Portal for Modern Firms | Pyngyn ClientSpace",
  description:
    "Pyngyn ClientSpace is secure client portal software purpose-built for accounting firms, CAs, and professional services. Give clients a branded portal with live status, bank-grade documents, approvals, and passwordless access.",
  alternates: { canonical: "/clientspace" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Client Portal Software | Secure Client Portal for Modern Firms | Pyngyn ClientSpace",
    description:
      "Stop being the bottleneck between clients and their information. Pyngyn is the secure client portal software providing branded workspaces, encrypted documents, live milestones, and approvals.",
    url: "/clientspace",
    type: "website",
  },
};

// ---------------------------------------------------------------------------
// Data — grounded in real client-portal pain points from professional-services firms
// ---------------------------------------------------------------------------

// Anonymised observations from discovery calls with services firms, same
// honest framing as the Workspace page: roles only, no names, clearly
// labelled as discovery-call quotes rather than customer testimonials.
const CS_VOICES: { quote: string; role: string }[] = [
  {
    quote:
      "Every Monday starts with the same five emails: any update on our filing? The answer exists, it just lives in our tracker, not anywhere the client can see.",
    role: "Partner, CA firm",
  },
  {
    quote:
      "We look less organised than we are. The work is on track, but the client only ever sees silence between our fortnightly calls.",
    role: "Client services lead, consulting firm",
  },
  {
    quote:
      "Sign-offs are our bottleneck. The engagement letter sits in someone's inbox for a week, and nobody notices until the deadline is already at risk.",
    role: "Practice manager, law firm",
  },
];

const PAINS: { stat: string; title: string; body: string }[] = [
  {
    stat: "\u201CDid you get my email?\u201D",
    title: "Clients chase you for updates",
    body: "Every status request is an email, a call, or a text. You become the bottleneck between your client and their own information, and the work stops while you answer.",
  },
  {
    stat: "90%",
    title: "Email creates more work, not less",
    body: "Email threads generate far more back-and-forth than a portal, leave no audit trail, and bury the one document everyone needs under twenty replies.",
  },
  {
    stat: "Forgotten",
    title: "Clients leave because they feel ignored",
    body: "Clients rarely leave over the quality of your work. They leave because they feel forgotten between conversations, never sure what is happening or what comes next.",
  },
  {
    stat: "Risk",
    title: "Sensitive documents sent over email",
    body: "Financial records, legal documents, and signed agreements move through unsecured inboxes, no encryption, no access control, and no record of who saw what.",
  },
];

const FEATURES: { icon: string; title: string; body: string }[] = [
  {
    icon: "\uD83C\uDFF7\uFE0F",
    title: "Branded as your firm",
    body: "White-labeled with your logo, colors, and domain. Clients land in a space that looks like yours, not like a generic tool you bolted on.",
  },
  {
    icon: "\uD83D\uDCCA",
    title: "Live status, 24/7",
    body: "Clients see exactly where their engagement stands (current phase, what's done, what's next, and key dates), without emailing anyone.",
  },
  {
    icon: "\uD83D\uDD12",
    title: "One isolated space per client",
    body: "Each client sees only their own engagement. Nothing leaks between clients. Bank-grade encryption and access control on every document.",
  },
  {
    icon: "\uD83D\uDCCE",
    title: "Secure documents & e-signature",
    body: "Share, request, and sign documents inside the portal. Version-controlled, with a full audit trail, no more attachments lost in email.",
  },
  {
    icon: "\u2705",
    title: "Approvals & sign-off",
    body: "Clients review deliverables and approve them in the portal. Every decision is logged, so there's never a 'who approved what, when' dispute.",
  },
  {
    icon: "\uD83D\uDD17",
    title: "One-click, password-less access",
    body: "Clients join with a magic link, no password to remember, no login friction, no support tickets. The biggest reason portals fail, solved.",
  },
  {
    icon: "\uD83D\uDCAC",
    title: "Messaging in context",
    body: "Client questions and your answers live next to the work they're about, not scattered across inboxes. Everyone sees the same thread.",
  },
  {
    icon: "\uD83D\uDCB3",
    title: "Invoices & online payment",
    body: "Clients view invoices and pay inside the portal. Faster cash flow, fewer billing disputes, and no chasing.",
  },
];

const STEPS: { num: string; title: string; body: string }[] = [
  { num: "01", title: "Create the Client Space", body: "Spin up a branded portal for a client in a couple of clicks. Your logo, your colors, your domain." },
  { num: "02", title: "Invite the client", body: "Send a magic link. They click once and they're in, no password, no setup on their end." },
  { num: "03", title: "They self-serve", body: "Status, documents, approvals, and invoices are all there, 24/7. The 'any update?' emails stop." },
  { num: "04", title: "You stay in control", body: "You decide exactly what each client sees. Internal work stays internal; clients see only their own engagement." },
];

const VERTICALS: { label: string; href: string; line: string }[] = [
  { label: "Law firms", href: "/solutions/lawyers", line: "Matter status, documents, and sign-off, without the phone tag." },
  { label: "Accountants & CAs", href: "/solutions/accountants", line: "Secure document collection and approvals that beat unsecured email." },
  { label: "Marketing consultants", href: "/solutions/consultants", line: "Campaign status and approval rounds clients can actually follow." },
  { label: "Creative studios", href: "/solutions/creative-services", line: "Briefs, revisions, and sign-off with a versioned record." },
  { label: "Architects", href: "/solutions/architects", line: "Design phase status, drawings, and phase-gate approvals." },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is client portal software, and why does my firm need it?", a: "Client portal software gives your clients a dedicated, branded workspace to view real-time project milestones, exchange confidential documents, review invoices, and approve deliverables. Instead of chasing email threads, clients can self-serve status updates 24/7." },
  { q: "What is Pyngyn ClientSpace?", a: "Pyngyn ClientSpace is secure client portal software purpose-built for professional services, CA practices, and accounting firms. Each client receives their own private, white-labeled portal with bank-grade encryption and passwordless magic links." },
  { q: "How much does ClientSpace cost?", a: "ClientSpace is $19 per client per month standalone, with transparent practice tiers starting at ₹499/mo. You don't need Workspace to use it. If your firm also wants internal project and resource management, you can bundle both for $24.99/month." },
  { q: "Is Pyngyn a secure client portal software solution?", a: "Yes. All client data and documents are protected with AES-256 encryption at rest and TLS 1.3 in transit. ClientSpace includes role-based access control, comprehensive audit logging, and strict data isolation between clients." },
  { q: "Do my clients need to create an account or remember a password?", a: "No. Clients join with a one-click magic link, no password to remember and no login friction. Login frustration is the number-one reason client portals go unused, so we removed it entirely." },
  { q: "Is there a specialized client portal for accounting firms?", a: "Yes. Pyngyn provides tailored workflows for accounting and CA practices, including PBC document collection checklists, statutory deadline tracking, and multi-tier partner review sign-offs." },
  { q: "Can I brand it with my firm's own identity?", a: "Yes. ClientSpace is fully white-labeled with your custom logo, brand colors, and firm domain, presenting a cohesive, premium client experience." },
  { q: "Can I try Pyngyn ClientSpace before committing?", a: "Yes. You can start a 7-day free trial with no credit card required, or book a live 30-minute walkthrough tailored to your practice." }
];

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 flex-none text-positive">
      <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ClientspacePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/clientspace",
            name: "Client Space | PYNGYN, the standalone branded client portal for professional-services firms",
            description:
              "Give every client a branded portal where they see status, documents, and approvals 24/7 instead of emailing you. $19 per client / month, standalone.",
            breadcrumbId: "/clientspace#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Client Space", url: "/clientspace" },
            ],
            "/clientspace"
          ),
          faqPageSchema(FAQS, "/clientspace"),
        ]}
      />
      <Navbar />

      <main id="main">

        {/* ===== Hero ====================================================== */}
        <section className="wrap pb-[56px] pt-[140px]">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Secure Client Portal Software · Pyngyn ClientSpace
          </span>
          <h1 className="mt-4 max-w-[920px] font-display text-[clamp(34px,5.4vw,62px)] font-semibold leading-[1.03] tracking-[-0.027em]">
            Secure client portal software for managing client relationships.
          </h1>
          <p className="lead mt-5 max-w-[680px]">
            Pyngyn ClientSpace gives every client a branded, secure portal where they track live milestones,
            exchange confidential documents, approve deliverables, and review invoices 24/7. Stop email chaos
            and deliver the best client portal experience your clients deserve.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={DEMO_URL} className="btn btn-accent">Book a demo</a>
            <a href={SIGNUP_URL} className="btn btn-primary">Start free trial</a>
          </div>
          <p className="mt-4 text-[13px] text-muted">
            From <strong className="text-ink">$19 per client / month</strong> · standalone, no Workspace required · clients join with one click
          </p>
        </section>

        {/* ===== Portal screenshot ========================================= */}
        <section className="wrap pb-[72px]">
          <div className="mx-auto max-w-[900px] overflow-hidden rounded-[22px] border border-line bg-white shadow-art">
            <Image
              src="/screens/clientspace-space.webp"
              alt="Secure client portal software showing needs-your-attention items, active engagements, and document approvals"
              width={1909}
              height={940}
              priority
              sizes="(max-width: 768px) 100vw, 900px"
              className="h-auto w-full"
            />
          </div>
          <p className="mt-3 text-center text-[13px] text-muted">
            What your client sees when they log in, branded as your firm, updated automatically.
          </p>
        </section>

        {/* ===== Pain ===================================================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <span className="eyebrow">Why Firms Switch</span>
            <h2 className="mt-3 max-w-[720px] font-display text-[clamp(26px,3.4vw,42px)] font-semibold leading-tight tracking-[-0.025em]">
              Why firms switch to dedicated client portal software.
            </h2>
            <p className="lead mt-4 max-w-[640px]">
              Most firms still run client communication through email. Clients can&apos;t see anything
              without asking, so they ask constantly, and the work waits while you answer.
            </p>
            <div className="mt-10 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
              {PAINS.map((p) => (
                <div key={p.title} className="card h-full">
                  <div className="font-display text-[20px] font-semibold leading-tight text-accent">{p.stat}</div>
                  <h3 className="mt-3 text-[15.5px] font-bold leading-snug">{p.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{p.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-[14px]">
              <span className="text-muted">Want to see how ClientSpace eliminates client communication bottlenecks?</span>
              <Link href={DEMO_URL} className="font-semibold text-accent hover:text-accent-dk">
                Book a 30-min walkthrough →
              </Link>
            </div>
          </div>
        </section>

        {/* ===== Features ================================================= */}
        <section className="section">
          <div className="wrap">
            <span className="eyebrow">Complete Client Portal Solution</span>
            <h2 className="mt-3 max-w-[760px] font-display text-[clamp(26px,3.4vw,42px)] font-semibold leading-tight tracking-[-0.025em]">
              Everything your practice needs in secure client portal software.
            </h2>
            <p className="lead mt-4 max-w-[640px]">
              Everything a client needs to feel informed and in control, branded as your firm,
              secure by default, and effortless to use.
            </p>
            <div className="mt-10 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((f) => (
                <div key={f.title} className="card h-full">
                  <span className="text-[26px]" aria-hidden="true">{f.icon}</span>
                  <h3 className="mt-3 text-[15.5px] font-bold leading-snug">{f.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== You stay in control (director/oversight screenshot) ====== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="eyebrow">Your side of the portal</span>
                <h2 className="mt-3 font-display text-[clamp(24px,3vw,34px)] font-semibold leading-tight tracking-[-0.02em]">
                  You see every engagement across every client, in one dashboard.
                </h2>
                <p className="lead mt-4 max-w-[480px]">
                  While each client sees only their own Client Space, your team gets a portfolio
                  view, realisation, engagement health, and the approvals only you can make,
                  across every client at once.
                </p>
              </div>
              <div className="overflow-hidden rounded-[18px] border border-line bg-white shadow-art">
                <Image
                  src="/screens/clientspace-director.webp"
                  alt="Client Space director dashboard showing portfolio-wide revenue, realisation percentage, active engagements, CSAT, and engagement health across all clients"
                  width={1906}
                  height={949}
                  sizes="(max-width: 768px) 100vw, 640px"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== How it works ============================================= */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <span className="eyebrow">How it works</span>
            <h2 className="mt-3 max-w-[680px] font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.025em]">
              Live for a client in minutes.
            </h2>
            <div className="mt-10 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s) => (
                <div key={s.num} className="card h-full">
                  <div className="index-num">{s.num}</div>
                  <h3 className="mt-3 text-[16px] font-bold">{s.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Workspace (optional pairing) =============================== */}
        <section className="section">
          <div className="wrap">
            <div className="rounded-[24px] border border-line bg-white p-8 shadow-card sm:p-10">
              <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
                <div>
                  <span className="eyebrow">Works standalone. Better together.</span>
                  <h2 className="mt-3 font-display text-[clamp(22px,3vw,32px)] font-semibold leading-tight tracking-[-0.02em]">
                    Client Space runs on its own.
                    <br />
                    Add Workspace when you want the back office too.
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">
                    Client Space is a complete, standalone product, you don&apos;t need anything
                    else to give clients a branded portal. If your firm also wants to run projects,
                    finances, and billable time internally, Workspace is a separate product you can
                    add, and the two bundle together for less than buying them apart.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/workspace" className="btn btn-primary">Explore Workspace</Link>
                    <Link href="/pricing" className="btn btn-ghost">See pricing</Link>
                  </div>
                </div>
                <div className="rounded-[18px] border border-line bg-[#fbfbfd] p-6">
                  <div className="text-[12px] font-semibold uppercase tracking-wide text-muted">The stack</div>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl border border-accent/40 bg-white p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-accent">Client Space</span>
                        <span className="text-[13px] text-muted">$19 / client · standalone</span>
                      </div>
                      <p className="mt-1 text-[12.5px] text-muted">The branded portal your clients log into. Works on its own.</p>
                    </div>
                    <div className="flex justify-center text-muted">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="rounded-xl border border-line bg-white p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-bold">Workspace</span>
                        <span className="text-[13px] text-muted">$9 / seat · optional</span>
                      </div>
                      <p className="mt-1 text-[12.5px] text-muted">Your firm's optional back office. Bundle both for $24.99/mo.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Verticals =============================================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <span className="eyebrow">Built for your firm</span>
            <h2 className="mt-3 font-display text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.02em]">
              A client portal that fits your practice.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {VERTICALS.map((v) => (
                <Link key={v.label} href={v.href} className="card group flex h-full flex-col transition-all hover:border-accent hover:shadow-soft">
                  <div className="font-semibold text-ink group-hover:text-accent transition-colors">{v.label}</div>
                  <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted">{v.line}</p>
                  <span className="mt-3 text-[12.5px] font-semibold text-accent">See how &rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Voices (discovery-call observations) ==================== */}
        <section className="section">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">From discovery calls</span>
              <h2 className="mt-3 font-display text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.02em]">
                What firms tell us about client communication.
              </h2>
              <p className="lead mx-auto mt-4 max-w-[640px]">
                Anonymised observations from conversations with partners and client-services
                leads at services firms. Roles only, no names.
              </p>
            </div>
            <div className="mt-[46px] grid gap-[22px] md:grid-cols-3">
              {CS_VOICES.map(({ quote, role }) => (
                <figure key={role} className="card flex h-full flex-col">
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
              ))}
            </div>
          </div>
        </section>

        {/* ===== Pricing band ============================================ */}
        <section className="section">
          <div className="wrap">
            <div className="rounded-[24px] border border-accent bg-accent/[0.04] p-8 text-center shadow-soft sm:p-12">
              <span className="eyebrow">Pricing</span>
              <h2 className="mt-3 font-display text-[clamp(26px,3.4vw,40px)] font-semibold tracking-[-0.02em]">
                $19 per client, standalone. That&apos;s it.
              </h2>
              <p className="lead mx-auto mt-4 max-w-[560px]">
                No Workspace purchase required. Add Client Space for each client you bring in.
                Want Workspace too? Bundle both for $24.99/mo and save.
              </p>
              <ul className="mx-auto mt-7 grid max-w-[640px] gap-2.5 text-left sm:grid-cols-2">
                {["Branded, white-labeled portal", "Unlimited client guests per space", "Secure documents & e-signature", "Approvals with full audit trail", "One-click magic-link access", "Invoices & online payments"].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14.5px]"><Check />{f}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={SIGNUP_URL} className="btn btn-accent">Start free trial</a>
                <a href={DEMO_URL} className="btn btn-primary">Book a demo</a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Deep-dive SEO Pages Hub ================================= */}
        <section className="section">
          <div className="wrap">
            <span className="eyebrow">Explore Client Portals</span>
            <h2 className="mt-3 font-display text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.02em]">
              Specialized client portal software solutions.
            </h2>
            <p className="lead mt-4 max-w-[640px]">
              Explore deep dives into modern client collaboration, security architectures, and practice-specific portals.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              <Link
                href="/client-portal-software"
                className="card group flex flex-col p-6 transition-all hover:border-accent hover:shadow-soft"
              >
                <div className="font-bold text-[17px] text-ink group-hover:text-accent transition-colors">
                  Client Portal Software &rarr;
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                  Discover how modern client portal solutions replace email chasing, centralize deliverables, and elevate the client experience.
                </p>
              </Link>
              <Link
                href="/secure-client-portal"
                className="card group flex flex-col p-6 transition-all hover:border-accent hover:shadow-soft"
              >
                <div className="font-bold text-[17px] text-ink group-hover:text-accent transition-colors">
                  Secure Client Portal &rarr;
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                  Learn about AES-256 encryption, passwordless magic links, and audit-ready compliance built for sensitive financial and legal records.
                </p>
              </Link>
              <Link
                href="/client-portal-for-accounting-firms"
                className="card group flex flex-col p-6 transition-all hover:border-accent hover:shadow-soft"
              >
                <div className="font-bold text-[17px] text-ink group-hover:text-accent transition-colors">
                  Portal for Accounting Firms &rarr;
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                  Purpose-built for Chartered Accountants and accounting firms: PBC document collection, GST/ROC compliance calendars, and sign-offs.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===================================================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-3 font-display text-[clamp(24px,3vw,32px)] font-semibold tracking-[-0.01em]">
              Questions about Client Space.
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

        <FinalCTA
          headline="Give every client their own portal, not another email thread."
          body="See Client Space set up on a real engagement in 30 minutes, branded portal, magic-link invite, live status from day one."
          secondaryLabel="Start free trial"
          note="30-minute walkthrough · Set up in minutes · No commitment"
        />
      </main>
      <Footer />
    </>
  );
}
