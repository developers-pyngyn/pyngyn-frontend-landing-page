import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardCheck,
  Calendar,
  CheckSquare,
  ShieldCheck,
  Zap,
  Briefcase,
} from "lucide-react";
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
  title: "Client Portal for Accounting Firms & CAs | Pyngyn ClientSpace",
  description:
    "The dedicated client portal software for accounting firms, Chartered Accountants, and tax teams. Automate PBC document collection, track statutory deadlines, and collect approvals securely.",
  alternates: { canonical: "/client-portal-for-accounting-firms" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Client Portal for Accounting Firms & CAs | Pyngyn ClientSpace",
    description:
      "Purpose-built client portal software for accountants and CAs. Stop chasing tax documents, provide 24/7 compliance visibility, and accelerate client sign-offs.",
    url: "/client-portal-for-accounting-firms",
    type: "website",
  },
};

const ACCOUNTING_WORKFLOWS = [
  {
    icon: ClipboardCheck,
    title: "Automated PBC Checklists",
    desc: "Set up Provided-By-Client document checklists with specific file types and due dates. Automated WhatsApp and email chasers follow up so your team doesn't have to.",
  },
  {
    icon: Calendar,
    title: "Statutory Tax & Filing Deadlines",
    desc: "Clients see live progress on GST returns, advance tax filings, corporate tax audits, and ROC compliances without calling your partners.",
  },
  {
    icon: CheckSquare,
    title: "4-Eye Review & Partner Sign-Off Gates",
    desc: "Maintain rigorous review standards. Deliverables move through preparer, manager, and signing partner review gates before presentation in the client portal.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Working Paper Security",
    desc: "Protect confidential balance sheets, ledger exports, and tax computation files with AES-256 encryption, access logs, and tenant isolation.",
  },
  {
    icon: Zap,
    title: "Passwordless Magic-Link Access",
    desc: "No account setup or password frustration for business owners. Clients click a secure magic link from their email and land straight in their portal.",
  },
  {
    icon: Briefcase,
    title: "Retainers & Fixed-Fee Tracking",
    desc: "Keep recurring accounting retainers and audit milestones organized with clear billing deliverables and integrated payment options.",
  },
];

const METRICS = [
  { value: "70%", label: "Faster document collection" },
  { value: "5+ hrs", label: "Saved per partner each week" },
  { value: "100%", label: "Statutory audit readiness" },
  { value: "Zero", label: "Password login support tickets" },
];

const FAQS = [
  {
    q: "Why do accounting firms need a dedicated client portal software?",
    a: "Accounting practices handle extreme volumes of sensitive financial data, strict statutory filing deadlines, and repetitive document chasing. Standard email is insecure, disorganized, and leaves no audit trail. Pyngyn's client portal software for accounting firms centralizes PBC lists, tax computations, approvals, and communication in one white-labeled, bank-secure environment.",
  },
  {
    q: "How does Pyngyn handle Provided-By-Client (PBC) document requests?",
    a: "You can create customized PBC document checklists for audits, GST reconciliations, or income tax filings. The portal displays pending versus completed items to the client, validates file uploads, and sends courteous automated reminders until all documents are received.",
  },
  {
    q: "Can clients see internal working notes or draft calculations?",
    a: "No. Pyngyn maintains strict internal vs. external visibility boundaries. Your audit working papers, review notes, and team discussions remain private within your firm's view; clients only see finalized deliverables, active requests, and verified status updates.",
  },
  {
    q: "Does Pyngyn integrate with common accounting software?",
    a: "Pyngyn connects with accounting tools including Tally, Computax, Zoho Books, QuickBooks, and Excel. You can sync client lists and deliver exports directly into client spaces.",
  },
  {
    q: "What does Pyngyn ClientSpace cost for accounting practices?",
    a: "Pyngyn pricing starts at ₹999 per user/month for the Professional practice plan, making it highly cost-effective for boutique CA firms and scaling accounting partnerships alike.",
  },
];

export default function ClientPortalForAccountingFirmsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/client-portal-for-accounting-firms",
            name: "Client Portal for Accounting Firms & CAs | Pyngyn",
            description:
              "Purpose-built client portal software for accounting firms, CAs, and CPAs. Automate PBC document collection, track statutory tax deadlines, and get client sign-offs.",
            breadcrumbId: "/client-portal-for-accounting-firms#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Client Space", url: "/clientspace" },
              { name: "Portal for Accounting Firms", url: "/client-portal-for-accounting-firms" },
            ],
            "/client-portal-for-accounting-firms"
          ),
          faqPageSchema(FAQS, "/client-portal-for-accounting-firms"),
        ]}
      />
      <Navbar />

      <main id="main">
        {/* ===== Hero ====================================================== */}
        <section className="wrap pb-[56px] pt-[140px] text-center">
          <span className="eyebrow mx-auto justify-center">
            <span className="eyebrow-dot" aria-hidden="true" />
            Built for CAs &amp; Accounting Firms · Pyngyn ClientSpace
          </span>
          <h1 className="mx-auto mt-4 max-w-[940px] font-display text-[clamp(34px,5.4vw,62px)] font-semibold leading-[1.03] tracking-[-0.027em]">
            The dedicated client portal software for accounting firms &amp; CAs.
          </h1>
          <p className="lead mx-auto mt-5 max-w-[720px]">
            Automate PBC document chasing, give business owners 24/7 visibility into statutory compliance deadlines,
            and secure partner review sign-offs in a branded, bank-grade client portal.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Link href={DEMO_URL} prefetch={true} className="btn btn-accent">
              Book a CA practice demo
            </Link>
            <a href={SIGNUP_URL} className="btn btn-primary">
              Start 7-day free trial
            </a>
            <Link href={PRICING_URL} prefetch={true} className="btn btn-ghost">
              View practice pricing
            </Link>
          </div>
          <p className="mt-4 text-[13px] text-muted">
            Starting at ₹999/user/mo · Built for CA &amp; accounting practices · 1-click magic links
          </p>
        </section>

        {/* ===== Metrics Strip ============================================= */}
        <section className="wrap pb-12">
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-line bg-white p-6 shadow-card sm:grid-cols-4 sm:p-8">
            {METRICS.map((m) => (
              <div key={m.label} className="text-center">
                <div className="font-display text-[clamp(26px,3.5vw,38px)] font-bold text-accent">
                  {m.value}
                </div>
                <div className="mt-1 text-[13px] font-medium text-muted">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== The Accounting Dilemma ==================================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap max-w-[880px]">
            <span className="eyebrow">The Tax Season Reality</span>
            <h2 className="mt-3 font-display text-[clamp(26px,3.4vw,42px)] font-semibold leading-tight tracking-[-0.025em]">
              Stop letting document chasing consume your firm&apos;s billable hours.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              Every tax season and audit cycle, accounting teams lose hundreds of hours tracking down missing bank statements,
              invoices, and TDS certificates across scattered email chains and messaging apps. When clients don&apos;t know what is
              missing, deadlines get compromised and partner stress multiplies.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              <strong>Pyngyn ClientSpace for Accounting Firms</strong> turns document collection into a self-driving workflow.
              Clients log into their white-labeled portal, see exactly which documents are pending, and upload them with one click.
              Automated reminders follow up with clients on your schedule.
            </p>
          </div>
        </section>

        {/* ===== Accounting Features ====================================== */}
        <section className="section">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">Practice-Specific Workflows</span>
              <h2 className="mt-3 font-display text-[clamp(26px,3.4vw,42px)] font-semibold leading-tight tracking-[-0.025em]">
                Everything your accounting practice needs to operate seamlessly.
              </h2>
              <p className="lead mx-auto mt-4 max-w-[620px]">
                Designed around real compliance workflows: GST, Corporate Tax, TDS, ROC, and Statutory Audits.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ACCOUNTING_WORKFLOWS.map((w) => {
                const Icon = w.icon;
                return (
                  <div key={w.title} className="card flex flex-col p-7 transition-all duration-200 hover:shadow-card-hover">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="h-6 w-6 stroke-[1.8]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-[17px] font-bold text-ink">{w.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{w.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== FAQs ===================================================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap max-w-[840px]">
            <div className="text-center">
              <span className="eyebrow">FAQ</span>
              <h2 className="mt-3 font-display text-[clamp(24px,3vw,36px)] font-semibold tracking-[-0.02em]">
                Frequently asked questions for accounting &amp; CA firms.
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
          eyebrow="Upgrade Your Firm"
          headline="Elevate your accounting practice with a dedicated client portal."
          body="Book a 30-minute practice walkthrough. See how Pyngyn configures your tax season checklists and client portals in minutes."
          primaryLabel="Book a practice demo &rarr;"
          secondaryLabel="Start free trial"
          note="Tailored to CA & accounting firms · 30-minute walkthrough · No commitment"
        />
      </main>
      <Footer />
    </>
  );
}
