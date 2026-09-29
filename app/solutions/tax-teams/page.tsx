import type { Metadata } from "next";
import Link from "next/link";
import {
  FileSpreadsheet,
  Receipt,
  FileCheck2,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Zap,
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
  title: "Tax Practice Software for CA & Accounting Teams | Pyngyn ClientSpace",
  description:
    "Purpose-built tax practice management software for Chartered Accountants, corporate tax teams, and tax consultants. Streamline GST, Corporate Tax, Advance Tax, and TDS filings.",
  alternates: { canonical: "/solutions/tax-teams" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Tax Practice Software for CA & Accounting Teams | Pyngyn ClientSpace",
    description:
      "Automate tax season document collection, track statutory due dates, and secure partner review sign-offs before tax returns are filed.",
    url: "/solutions/tax-teams",
    type: "website",
  },
};

const TAX_WORKFLOWS = [
  {
    icon: FileSpreadsheet,
    title: "Corporate & Individual Tax Filing",
    desc: "Manage end-to-end income tax filing pipelines. Track computation drafts, 26AS/AIS reconciliations, and final ITR acknowledgments.",
  },
  {
    icon: Receipt,
    title: "GST Return Reconciliation (GSTR-1, 3B, 9)",
    desc: "Coordinate monthly, quarterly, and annual GST filing schedules across multiple GSTIN entities with automated mismatch alerts.",
  },
  {
    icon: Calendar,
    title: "Advance Tax Estimation & Challan Vault",
    desc: "Calculate quarterly advance tax liabilities, share tax computation summaries with clients, and store tax payment challans securely.",
  },
  {
    icon: Zap,
    title: "Automated PBC Tax Document Chase",
    desc: "Chase bank statements, depreciation schedules, 16A certificates, and foreign asset disclosures with automated WhatsApp & email reminders.",
  },
  {
    icon: FileCheck2,
    title: "4-Eye Partner Tax Review Gates",
    desc: "Ensure tax computations and return drafts pass through preparer, manager, and signing tax partner gates before submission.",
  },
  {
    icon: ShieldCheck,
    title: "Statutory Notice Tracking & Appeals",
    desc: "Log department inquiries, scrutiny notices (Section 143/148), and appeal timelines with audit trails and filing confirmations.",
  },
];

const TAX_FAQS = [
  {
    q: "Can Pyngyn track multi-entity tax structures for business groups?",
    a: "Yes. Pyngyn organizes client hierarchies by holding company, subsidiaries, LLPs, and individual director tax profiles so all group filings remain visible on a single dashboard.",
  },
  {
    q: "How does Pyngyn help with GST and TDS document chase?",
    a: "You can create customized PBC (Provided-By-Client) checklists for GST invoices, 26AS reconciliations, and TDS certificates. Automated WhatsApp and email alerts notify clients until documents are uploaded.",
  },
  {
    q: "Is there a review gate before returns are submitted to government portals?",
    a: "Yes. Pyngyn enforces 4-eye review gates where article staff prepare computations, managers verify reconciliations, and tax partners approve the final return before filing.",
  },
];

export default function TaxTeamsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/solutions/tax-teams",
            name: "Tax Practice Software for CA & Accounting Teams | Pyngyn ClientSpace",
            description:
              "Purpose-built tax practice management software for Chartered Accountants, corporate tax teams, and tax consultants.",
            breadcrumbId: "/solutions/tax-teams#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Solutions", url: "/solutions/accountants" },
              { name: "For Tax Teams", url: "/solutions/tax-teams" },
            ],
            "/solutions/tax-teams"
          ),
          faqPageSchema(TAX_FAQS, "/solutions/tax-teams"),
        ]}
      />
      <Navbar />

      <main id="main">
        {/* ===== Hero ================================================== */}
        <section className="wrap pb-[56px] pt-[140px] text-center">
          <span className="eyebrow mx-auto justify-center">
            <span className="eyebrow-dot" aria-hidden="true" />
            Tax Practice Operating System · Pyngyn ClientSpace
          </span>
          <h1 className="mx-auto mt-4 max-w-[920px] font-display text-[clamp(34px,5.2vw,60px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Deliver every tax return on time with
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">automated document chase &amp; review gates.</span>
          </h1>
          <p className="lead mx-auto mt-5 max-w-[700px]">
            Pyngyn ClientSpace powers modern tax practices: Corporate Tax, GST, Advance Tax, and TDS filings
            with automated client document collection and partner sign-offs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a href={DEMO_URL} className="btn btn-accent">
              Book a tax practice demo
            </a>
            <a href={SIGNUP_URL} className="btn btn-primary">
              Start 7-day free trial
            </a>
            <Link href={PRICING_URL} className="btn btn-ghost">
              View practice pricing
            </Link>
          </div>
          <p className="mt-4 text-[13px] text-muted">
            Starting at ₹499/mo ($29/mo) · Built for direct and indirect tax practices · No credit card required
          </p>
        </section>

        {/* ===== Features Grid ========================================= */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">Tax Practice Workflows</span>
              <h2 className="mt-3 max-w-[820px] mx-auto font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.025em]">
                Everything your tax team needs from computation to filing.
              </h2>
              <p className="lead mx-auto mt-4 max-w-[620px]">
                Eliminate tax-season scrambles with standardized working papers and client visibility.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TAX_WORKFLOWS.map((w) => {
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
                Tax practice questions, answered.
              </h2>
            </div>
            <div className="mt-10 space-y-4">
              {TAX_FAQS.map((faq) => (
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
          eyebrow="Transform Tax Season"
          headline="Take control of corporate tax, GST, and statutory filing deadlines."
          body="Book a 30-minute practice walkthrough. See how Pyngyn automates tax checklists and client sign-offs."
          primaryLabel="Book a practice demo &rarr;"
          secondaryLabel="Start 7-day free trial"
          note="Tailored to tax practices & CA firms · 30-minute walkthrough · No commitment"
        />
      </main>

      <Footer />
    </>
  );
}
