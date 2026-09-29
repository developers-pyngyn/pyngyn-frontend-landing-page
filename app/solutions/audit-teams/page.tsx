import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  CheckSquare,
  ShieldCheck,
  FileCheck2,
  Users,
  FolderLock,
  ArrowRight,
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
  title: "Audit Practice Management Software for CA & Audit Teams | Pyngyn ClientSpace",
  description:
    "Statutory audit, tax audit, and internal audit software for Chartered Accountants and audit assurance firms. Run working papers, PBC checklists, and 4-eye partner review gates.",
  alternates: { canonical: "/solutions/audit-teams" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Audit Practice Management Software for CA & Audit Teams | Pyngyn ClientSpace",
    description:
      "Maintain audit quality and working paper integrity with structured review gates, automated PBC tracking, and partner sign-offs.",
    url: "/solutions/audit-teams",
    type: "website",
  },
};

const AUDIT_WORKFLOWS = [
  {
    icon: Search,
    title: "Statutory & Tax Audit Programmes",
    desc: "Standardized audit programmes for Form 3CD, CARO, Companies Act statutory audits, and internal assurance engagements.",
  },
  {
    icon: CheckSquare,
    title: "4-Eye Partner Review Queues",
    desc: "Every working paper, ledger schedule, and audit observation moves from article assistant $\\rightarrow$ audit manager $\\rightarrow$ engagement partner before sign-off.",
  },
  {
    icon: FolderLock,
    title: "PBC (Provided-By-Client) Audit Vault",
    desc: "Provide clients with categorized checklists for trial balances, fixed asset registers, and bank confirmations with bank-grade encryption.",
  },
  {
    icon: Users,
    title: "Article Trainee & Fieldwork Allocation",
    desc: "Allocate client audit fieldwork, set budgeted effort hours, and monitor live audit progress without waiting for weekly status calls.",
  },
  {
    icon: FileCheck2,
    title: "Management Representation & Sign-Offs",
    desc: "Collect client management representation letters and audit query responses directly through the secure client portal.",
  },
  {
    icon: ShieldCheck,
    title: "Tamper-Evident Working Paper Audit Trails",
    desc: "Maintain strict compliance standards with unalterable version histories, timestamped reviewer annotations, and access logs.",
  },
];

const AUDIT_FAQS = [
  {
    q: "How does Pyngyn enforce 4-eye partner review on audit files?",
    a: "Every deliverable and working paper has configurable review gates. Article staff submit their findings, managers review schedules and queries, and signing partners approve final audit reports before release.",
  },
  {
    q: "Can clients upload sensitive bank statements and trial balances securely?",
    a: "Yes. All client uploads are encrypted in transit with TLS 1.3 and at rest with AES-256 bank-grade encryption with dedicated tenant isolation.",
  },
  {
    q: "Does Pyngyn support Form 3CD tax audit schedules?",
    a: "Yes. You can use standard statutory audit and Form 3CD checklists, track query clearance status, and share draft observations with clients securely.",
  },
];

export default function AuditTeamsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/solutions/audit-teams",
            name: "Audit Practice Management Software for CA & Audit Teams | Pyngyn ClientSpace",
            description:
              "Statutory audit, tax audit, and internal audit software for Chartered Accountants and audit assurance firms.",
            breadcrumbId: "/solutions/audit-teams#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Solutions", url: "/solutions/accountants" },
              { name: "For Audit Teams", url: "/solutions/audit-teams" },
            ],
            "/solutions/audit-teams"
          ),
          faqPageSchema(AUDIT_FAQS, "/solutions/audit-teams"),
        ]}
      />
      <Navbar />

      <main id="main">
        {/* ===== Hero ================================================== */}
        <section className="wrap pb-[56px] pt-[140px] text-center">
          <span className="eyebrow mx-auto justify-center">
            <span className="eyebrow-dot" aria-hidden="true" />
            Audit Assurance Operating System · Pyngyn ClientSpace
          </span>
          <h1 className="mx-auto mt-4 max-w-[920px] font-display text-[clamp(34px,5.2vw,60px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Deliver airtight audit engagements with
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">4-eye review gates &amp; structured working papers.</span>
          </h1>
          <p className="lead mx-auto mt-5 max-w-[700px]">
            Pyngyn ClientSpace powers modern audit practices: Statutory Audits, Tax Audits, and Internal Assurance
            with complete working paper versioning, automated PBC chasing, and partner sign-off gates.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a href={DEMO_URL} className="btn btn-accent">
              Book an audit practice demo
            </a>
            <a href={SIGNUP_URL} className="btn btn-primary">
              Start 7-day free trial
            </a>
            <Link href={PRICING_URL} className="btn btn-ghost">
              View practice pricing
            </Link>
          </div>
          <p className="mt-4 text-[13px] text-muted">
            Starting at ₹499/mo ($29/mo) · Built for statutory audit firms &amp; CAs · Bank-grade AES-256 encryption
          </p>
        </section>

        {/* ===== Features Grid ========================================= */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">Audit Assurance Workflows</span>
              <h2 className="mt-3 max-w-[820px] mx-auto font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.025em]">
                Quality control, team resourcing, and partner review assurance.
              </h2>
              <p className="lead mx-auto mt-4 max-w-[620px]">
                Maintain peer-review audit standards without drowning partners in administrative query chasing.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {AUDIT_WORKFLOWS.map((w) => {
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

        {/* ===== FAQs ================================================== */}
        <section className="section">
          <div className="wrap max-w-[840px]">
            <div className="text-center">
              <span className="eyebrow">FAQ</span>
              <h2 className="mt-3 font-display text-[clamp(24px,3vw,36px)] font-semibold tracking-[-0.02em]">
                Audit practice questions, answered.
              </h2>
            </div>
            <div className="mt-10 space-y-4">
              {AUDIT_FAQS.map((faq) => (
                <div key={faq.q} className="card p-6">
                  <h3 className="text-[16.5px] font-bold text-ink">{faq.q}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <FinalCTA
          eyebrow="Upgrade Audit Quality"
          headline="Maintain audit review standards with zero last-minute bottlenecks."
          body="Book a 30-minute practice walkthrough. See how Pyngyn standardizes audit working papers and review gates."
          primaryLabel="Book a practice demo &rarr;"
          secondaryLabel="Start 7-day free trial"
          note="Tailored to CA audit practices · 30-minute walkthrough · No commitment"
        />
      </main>

      <Footer />
    </>
  );
}
