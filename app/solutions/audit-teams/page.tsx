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
  ClipboardList,
  FileSpreadsheet,
  Building2,
  FileText,
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
  title: "Audit Practice Management Software for Statutory & Internal Audit Teams | Pyngyn ClientSpace",
  description:
    "Statutory audit, tax audit, and internal assurance software for Chartered Accountants and audit firms. Run CARO 2020 programmes, Form 3CD workpapers, sample vouching, and EQCR reviews.",
  alternates: { canonical: "/solutions/audit-teams" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Audit Practice Management Software for Statutory & Internal Audit Teams | Pyngyn ClientSpace",
    description:
      "Maintain audit quality and working paper integrity with CARO 2020 checklists, Form 3CD schedules, substantive testing logs, and EQCR sign-offs.",
    url: "/solutions/audit-teams",
    type: "website",
  },
};

const AUDIT_PROBLEMS: { num: string; title: string; body: string }[] = [
  {
    num: "01",
    title: "Unresolved client audit queries stalling final report signing",
    body: "Open audit observations and pending trial balance schedules sit unanswered in email threads while statutory signing deadlines rapidly approach.",
  },
  {
    num: "02",
    title: "Disorganized working papers risking peer-review & NFRA exposure",
    body: "Unlinked spreadsheets, loose notes, and unverified lead schedules create severe non-compliance liabilities during external quality inspections.",
  },
  {
    num: "03",
    title: "Form 3CD clause verification consuming weeks of manual effort",
    body: "Cross-checking 44 separate tax audit clauses against raw client general ledgers drains hundreds of senior auditor and manager hours.",
  },
  {
    num: "04",
    title: "Inadequate evidence trails for CARO 2020 physical inspections",
    body: "Documenting fixed asset physical verifications, working capital limits, and inventory records on disparate files leaves audit teams vulnerable.",
  },
  {
    num: "05",
    title: "Concurrent bank audit fieldwork delays & calculation errors",
    body: "Teams conducting branch concurrent audits struggle to compute drawing power (DP) and verify loan covenants without standardized testing templates.",
  },
  {
    num: "06",
    title: "Delays in securing signed Management Representation Letters (MRL)",
    body: "Audit partners cannot issue the final independent auditor's report because signed management representations and confirmations remain pending.",
  },
];

const AUDIT_WORKFLOWS = [
  {
    icon: ClipboardList,
    title: "Statutory Companies Act Audits & CARO 2020",
    desc: "Pre-structured audit programmes aligned with Companies Act 2013 disclosures, CARO 2020 reporting requirements, and Schedule III balance sheet presentation.",
  },
  {
    icon: FileSpreadsheet,
    title: "Section 44AB Form 3CD Workpapers",
    desc: "Dedicated 44-clause verification modules, depreciation schedule checks, Section 40A(3) cash expense limits, and quantitative stock reconciliation tests.",
  },
  {
    icon: Search,
    title: "Substantive Fieldwork & Sample Vouching",
    desc: "Ledger transaction sampling tools, vouching checklists, cutoff testing documentation, and unadjusted audit observation registers.",
  },
  {
    icon: ShieldCheck,
    title: "Internal Financial Controls (IFCoR) Matrices",
    desc: "Risk-control matrices (RCM), process walkthrough documentation, operating effectiveness testing, and deficiency remediation tracking.",
  },
  {
    icon: Building2,
    title: "Bank Concurrent & Stock Inspection Audits",
    desc: "Drawing Power (DP) calculation worksheets, physical stock inspection logs, collateral valuation verifications, and NPA provisioning audits.",
  },
  {
    icon: FileCheck2,
    title: "Engagement Quality Control Review (EQCR) & MRLs",
    desc: "Independent EQCR partner sign-off gates, draft audit query clearance, and digital Management Representation Letter (MRL) intake.",
  },
];

const AUDIT_FAQS = [
  {
    q: "How does Pyngyn support Form 3CD tax audit schedules?",
    a: "Pyngyn provides standardized clause-by-clause Form 3CD verification modules. Teams can record observations, attach ledger evidence, and track manager reviews for all 44 clauses.",
  },
  {
    q: "Can audit teams record and resolve audit observations with clients?",
    a: "Yes. Query registers allow auditors to flag draft findings, request client management explanations, and record partner clearance notes directly on the audit file.",
  },
  {
    q: "Does Pyngyn maintain tamper-evident audit trails for peer reviews?",
    a: "Yes. Every working paper, reviewer comment, and sign-off is logged with unalterable timestamps and user IDs, ensuring complete audit readiness for ICAI peer review.",
  },
  {
    q: "How does Pyngyn help with concurrent bank audits and drawing power?",
    a: "Pyngyn includes built-in calculation templates for drawing power, stock statement vetting, and overdue loan accounts, allowing concurrent audit teams to submit clean reports faster.",
  },
];

export default function AuditTeamsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/solutions/audit-teams",
            name: "Audit Practice Management Software for Statutory & Internal Audit Teams | Pyngyn ClientSpace",
            description:
              "Statutory audit, tax audit, and internal audit software for Chartered Accountants and audit assurance firms.",
            breadcrumbId: "/solutions/audit-teams#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Solutions", url: "/solutions/professional-services" },
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
            Audit Assurance &amp; Working Papers · Pyngyn ClientSpace
          </span>
          <h1 className="mx-auto mt-4 max-w-[920px] font-display text-[clamp(34px,5.2vw,60px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Deliver statutory &amp; tax audits with
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">tamper-evident workpapers &amp; CARO 2020 controls.</span>
          </h1>
          <p className="lead mx-auto mt-5 max-w-[700px]">
            Pyngyn ClientSpace powers modern audit practices: Companies Act statutory audits, Form 3CD tax audits,
            substantive vouching, and EQCR partner sign-offs in one audit-ready workspace.
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
            Starting at ₹499/mo ($29/mo) · Built for statutory &amp; internal audit teams · No credit card required
          </p>
        </section>

        {/* ===== Problems Solved ======================================== */}
        <section className="section border-t border-rule bg-sand/30">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">The Audit Season Reality</span>
              <h2 className="mt-3 font-display text-[clamp(26px,3.4vw,40px)] font-semibold tracking-[-0.025em]">
                Why audit engagements stall right before the signing date
              </h2>
              <p className="lead mx-auto mt-4 max-w-[620px]">
                Audit assurance teams waste hundreds of hours chasing unlinked trial balance schedules and open query responses.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {AUDIT_PROBLEMS.map((p) => (
                <div key={p.num} className="card p-7">
                  <div className="flex items-center gap-3 text-accent font-mono text-[13px] font-bold">
                    <span>{p.num}</span>
                    <span className="h-px flex-1 bg-accent/20" />
                  </div>
                  <h3 className="mt-4 text-[17px] font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Dedicated Workflows =================================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">Audit Practice Workflows</span>
              <h2 className="mt-3 max-w-[820px] mx-auto font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.025em]">
                Standardized programmes from field vouching to final sign-off.
              </h2>
              <p className="lead mx-auto mt-4 max-w-[620px]">
                Maintain peer-review audit quality and working paper integrity across all assurance engagements.
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
          eyebrow="Modernize Audit Assurance"
          headline="Take control of statutory audits, Form 3CD, and CARO 2020 workflows."
          body="Book a 30-minute practice walkthrough. See how Pyngyn standardizes audit working papers and ensures peer-review readiness."
          primaryLabel="Book an audit practice demo &rarr;"
          secondaryLabel="Start 7-day free trial"
          note="Tailored to statutory audit &amp; assurance practices · 30-minute walkthrough · No commitment"
        />
      </main>

      <Footer />
    </>
  );
}
