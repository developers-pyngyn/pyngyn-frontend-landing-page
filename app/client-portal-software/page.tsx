import type { Metadata } from "next";
import Link from "next/link";
import {
  Palette,
  BarChart3,
  ShieldCheck,
  FileCheck,
  Zap,
  MessageSquare,
} from "lucide-react";
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
  title: "Best Client Portal Software for Professional Services | Pyngyn ClientSpace",
  description:
    "Discover Pyngyn ClientSpace, the best client portal software for professional services and accounting firms. Deliver branded client portals, real-time status, secure file sharing, and approvals.",
  alternates: { canonical: "/client-portal-software" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Best Client Portal Software for Professional Services | Pyngyn ClientSpace",
    description:
      "Modern, white-labeled client portal software. Eliminate status update emails and give your clients a secure, branded window into their engagements.",
    url: "/client-portal-software",
    type: "website",
  },
};

const PILLARS = [
  {
    icon: Palette,
    title: "White-Labeled Client Experience",
    desc: "Every portal carries your firm's branding, custom domain, and colors. Clients interact with your identity, not a third-party tool.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Milestone Tracking",
    desc: "Give clients continuous visibility into phases, deliverables, and progress so they stop emailing you asking for updates.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Document Exchange",
    desc: "Centralize sensitive contracts, financial records, and deliverables with AES-256 encryption, access logs, and version control.",
  },
  {
    icon: FileCheck,
    title: "Instant Approvals & Sign-Offs",
    desc: "Accelerate phase sign-offs and engagement letter approvals with tamper-evident digital confirmations and automated reminders.",
  },
  {
    icon: Zap,
    title: "Passwordless Magic Link Access",
    desc: "Eliminate forgotten passwords and login friction. Clients access their portal instantly with one-click magic links.",
  },
  {
    icon: MessageSquare,
    title: "In-Context Client Communication",
    desc: "Keep discussions and questions tied directly to the relevant document or deliverable rather than scattered across inboxes.",
  },
];

const COMPARISON: { feature: string; email: string; genericDrive: string; pyngyn: string }[] = [
  {
    feature: "Client Status Visibility",
    email: "Manual reply required every time",
    genericDrive: "Static folders, no status timeline",
    pyngyn: "Live 24/7 self-serve project cockpit",
  },
  {
    feature: "Client Login Experience",
    email: "Cluttered, unencrypted inboxes",
    genericDrive: "Account creation & permission errors",
    pyngyn: "1-click passwordless magic links",
  },
  {
    feature: "Confidentiality & Isolation",
    email: "Zero access controls or tracking",
    genericDrive: "High risk of accidental file sharing",
    pyngyn: "Isolated client spaces & bank-grade AES-256",
  },
  {
    feature: "Approvals & Audit Trail",
    email: "Informal 'looks good' replies",
    genericDrive: "No formal sign-off records",
    pyngyn: "Timestamped sign-offs with legal audit logs",
  },
  {
    feature: "Firm Branding",
    email: "Standard email client layout",
    genericDrive: "Third-party tech branding",
    pyngyn: "100% white-labeled with custom domain",
  },
];

const INDUSTRIES: { title: string; desc: string; href: string }[] = [
  {
    title: "Accounting & CA Practices",
    desc: "Collect PBC documents, share statutory audit working papers, and track tax return milestones seamlessly.",
    href: "/client-portal-for-accounting-firms",
  },
  {
    title: "Legal & Advisory Practices",
    desc: "Share confidential filings, contracts, and retainer updates under strict client-by-client security perimeters.",
    href: "/solutions/lawyers",
  },
  {
    title: "Management & Strategy Consultants",
    desc: "Present executive deliverables, schedule steering meetings, and capture sign-offs without email sprawl.",
    href: "/solutions/consultants",
  },
  {
    title: "Creative & Digital Agencies",
    desc: "Review creative assets, manage feedback iterations, and approve scopes with full version control.",
    href: "/solutions/creative-services",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is client portal software?",
    a: "Client portal software is a dedicated digital application that allows professional services firms to share documents, project milestones, invoices, and communication securely with their clients. It acts as a branded, centralized hub where clients can check the status of their engagements 24/7 without needing to email or call their service provider.",
  },
  {
    q: "Why is Pyngyn considered the best client portal software for professional services?",
    a: "Pyngyn ClientSpace is specifically designed for knowledge-based and professional practices like accounting, consulting, and legal firms. Unlike generic file-sharing software, Pyngyn combines branded client spaces, passwordless access, statutory timeline tracking, and tamper-evident approvals in a single unified solution.",
  },
  {
    q: "How does a secure client portal software protect client data?",
    a: "Pyngyn encrypts all documents using AES-256 encryption at rest and TLS 1.3 in transit. Each client space is strictly isolated so that no client can ever view another client's data. Furthermore, detailed audit logs record every file view, download, and approval.",
  },
  {
    q: "Do clients have to create an account or remember complicated passwords?",
    a: "No. Password fatigue is the number one reason client portals fail. Pyngyn provides passwordless magic-link authentication, allowing clients to securely enter their private workspace with a single click from their email.",
  },
  {
    q: "Can I use our firm's own custom domain with Pyngyn client portal software?",
    a: "Yes. You can white-label your client portal with your firm's custom subdomain (e.g., portal.yourfirm.com), your firm's logo, and your brand color scheme.",
  },
  {
    q: "Can I get started with a free trial or demo?",
    a: "Yes. Pyngyn offers a 7-day free trial with no credit card required, as well as a 30-minute personalized demo to walk through your firm's specific engagement workflows.",
  },
];

export default function ClientPortalSoftwarePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/client-portal-software",
            name: "Best Client Portal Software for Professional Services | Pyngyn ClientSpace",
            description:
              "Discover Pyngyn ClientSpace, the best client portal software for professional services and accounting firms. Branded portals, live milestones, and secure documents.",
            breadcrumbId: "/client-portal-software#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Client Space", url: "/clientspace" },
              { name: "Client Portal Software", url: "/client-portal-software" },
            ],
            "/client-portal-software"
          ),
          faqPageSchema(FAQS, "/client-portal-software"),
        ]}
      />
      <Navbar />

      <main id="main">
        {/* ===== Hero ====================================================== */}
        <section className="wrap pb-[56px] pt-[140px] text-center">
          <span className="eyebrow mx-auto justify-center">
            <span className="eyebrow-dot" aria-hidden="true" />
            Client Portal Software · Pyngyn ClientSpace
          </span>
          <h1 className="mx-auto mt-4 max-w-[920px] font-display text-[clamp(34px,5.4vw,62px)] font-semibold leading-[1.03] tracking-[-0.027em]">
            The best client portal software for modern professional services.
          </h1>
          <p className="lead mx-auto mt-5 max-w-[700px]">
            Replace disjointed email threads and shared folders with an elegant, white-labeled client portal solution.
            Give clients real-time visibility into project milestones, encrypted document exchange, and seamless approvals.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a href={DEMO_URL} className="btn btn-accent">
              Book a 30-minute demo
            </a>
            <a href={SIGNUP_URL} className="btn btn-primary">
              Start 7-day free trial
            </a>
          </div>
          <p className="mt-4 text-[13px] text-muted">
            $19 / client / month standalone · No credit card required to start · 1-click passwordless client login
          </p>
        </section>

        {/* ===== What is Client Portal Software? ========================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap max-w-[880px]">
            <span className="eyebrow">Definition &amp; Shift</span>
            <h2 className="mt-3 font-display text-[clamp(26px,3.4vw,42px)] font-semibold leading-tight tracking-[-0.025em]">
              What is client portal software?
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              <strong>Client portal software</strong> is a secure web application that gives external clients a dedicated,
              branded environment to view engagement progress, access and upload confidential files, review invoices, and approve
              deliverables.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              Historically, traditional client extranets were notoriously clunky, requiring complex login credentials and manual folder
              permissions that clients routinely abandoned. Modern client portal software like <strong>Pyngyn ClientSpace</strong> transforms
              this relationship by pairing consumer-grade simplicity (passwordless magic links, mobile optimization) with enterprise-grade
              data protection and statutory audit trails.
            </p>
          </div>
        </section>

        {/* ===== Core Pillars ============================================= */}
        <section className="section">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">Essential Capabilities</span>
              <h2 className="mt-3 font-display text-[clamp(26px,3.4vw,42px)] font-semibold leading-tight tracking-[-0.025em]">
                Everything required in modern client portal software.
              </h2>
              <p className="lead mx-auto mt-4 max-w-[620px]">
                Built specifically for firms delivering high-value advisory, accounting, legal, and consulting engagements.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PILLARS.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="card flex flex-col p-7 transition-all duration-200 hover:shadow-card-hover">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="h-6 w-6 stroke-[1.8]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-[17px] font-bold text-ink">{p.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== Comparison Table ========================================= */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">Comparison</span>
              <h2 className="mt-3 font-display text-[clamp(26px,3.4vw,42px)] font-semibold leading-tight tracking-[-0.025em]">
                Why firms choose Pyngyn over email and generic cloud drives.
              </h2>
            </div>
            <div className="mt-10 overflow-x-auto rounded-2xl border border-line bg-white shadow-card">
              <table className="w-full text-left text-[14px]">
                <thead className="border-b border-line bg-canvas text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th className="py-4 px-6 font-semibold">Capability</th>
                    <th className="py-4 px-6 font-semibold">Email Threads</th>
                    <th className="py-4 px-6 font-semibold">Generic Cloud Drives</th>
                    <th className="py-4 px-6 font-bold text-accent">Pyngyn ClientSpace</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {COMPARISON.map((row) => (
                    <tr key={row.feature} className="hover:bg-canvas/50">
                      <td className="py-4 px-6 font-semibold text-ink">{row.feature}</td>
                      <td className="py-4 px-6 text-muted">{row.email}</td>
                      <td className="py-4 px-6 text-muted">{row.genericDrive}</td>
                      <td className="py-4 px-6 font-medium text-accent-dk">{row.pyngyn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ===== Industry Solutions ======================================= */}
        <section className="section">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">Tailored Workflows</span>
              <h2 className="mt-3 font-display text-[clamp(26px,3.4vw,42px)] font-semibold leading-tight tracking-[-0.025em]">
                Client portal software engineered for your profession.
              </h2>
              <p className="lead mx-auto mt-4 max-w-[640px]">
                Whether you run an accounting firm, legal consultancy, or design practice, Pyngyn adapts to your client lifecycle.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {INDUSTRIES.map((ind) => (
                <Link
                  key={ind.title}
                  href={ind.href}
                  className="card group flex flex-col p-6 transition-all hover:border-accent hover:shadow-soft"
                >
                  <h3 className="font-bold text-[16.5px] text-ink group-hover:text-accent transition-colors">
                    {ind.title} &rarr;
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{ind.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQs ===================================================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap max-w-[840px]">
            <div className="text-center">
              <span className="eyebrow">FAQ</span>
              <h2 className="mt-3 font-display text-[clamp(24px,3vw,36px)] font-semibold tracking-[-0.02em]">
                Frequently asked questions about client portal software.
              </h2>
            </div>
            <div className="mt-10 space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.q} className="card p-6">
                  <h3 className="text-[16.5px] font-bold text-ink">{faq.q}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA
          eyebrow="Transform Client Collaboration"
          headline="Ready to launch modern client portal software for your firm?"
          body="Book a 30-minute live strategy walkthrough. We'll configure a branded client portal on one of your real engagements."
          primaryLabel="Book a demo &rarr;"
          secondaryLabel="Start free trial"
          note="Tailored to your firm · 30-minute walkthrough · No commitment"
        />
      </main>
      <Footer />
    </>
  );
}
