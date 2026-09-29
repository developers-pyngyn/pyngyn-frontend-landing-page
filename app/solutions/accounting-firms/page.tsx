import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Receipt,
  CreditCard,
  FileSpreadsheet,
  Users,
  CalendarDays,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
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
  title: "Accounting & Bookkeeping Practice Management Software | Pyngyn ClientSpace",
  description:
    "Purpose-built practice software for accounting firms, outsourced bookkeepers, and Client Accounting Services (CAS) teams. Streamline monthly ledger closes, bank reconciliations, MIS reports, and AP/AR.",
  alternates: { canonical: "/solutions/accounting-firms" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Accounting & Bookkeeping Practice Management Software | Pyngyn ClientSpace",
    description:
      "Eliminate month-end scrambles with automated bank statement intake, recurring closing pipelines, and real-time management accounts for clients.",
    url: "/solutions/accounting-firms",
    type: "website",
  },
};

const ACCOUNTING_PROBLEMS: { num: string; title: string; body: string }[] = [
  {
    num: "01",
    title: "Missing bank statements & receipts stalling monthly close",
    body: "Staff waste hours chasing clients across WhatsApp and email for missing bank feeds, expense receipts, and payroll inputs before they can even begin ledger posting.",
  },
  {
    num: "02",
    title: "Unbilled scope creep on fixed monthly bookkeeping retainers",
    body: "Ad-hoc client requests, extra bank accounts, and unexpected transaction volume eat into your firm's margins because billable effort is never tracked against retainer caps.",
  },
  {
    num: "03",
    title: "Month-end closing chaos across multiple ledger platforms",
    body: "Managing reconciliations across Tally, Zoho Books, Computax, and QuickBooks leads to missed closing steps, delayed management reports, and frustrated founders.",
  },
  {
    num: "04",
    title: "Chasing overdue vendor bills and client invoice receivables",
    body: "Bookkeepers get dragged into AP/AR coordination without a centralized approval trail, resulting in vendor payment disputes and delayed client collections.",
  },
  {
    num: "05",
    title: "Scrambling for payroll inputs and statutory labor compliance",
    body: "Gathering monthly employee attendance, salary adjustments, and PF/ESI calculations on spreadsheets invites calculation errors and late filing penalties.",
  },
  {
    num: "06",
    title: "Year-end financial finalization bottleneck",
    body: "When year-end arrives, incomplete accrual entries, unverified depreciation schedules, and untracked journal entries create a frantic rush before the audit handover.",
  },
];

const ACCOUNTING_WORKFLOWS = [
  {
    icon: CalendarDays,
    title: "Monthly Retainer Bookkeeping Pipelines",
    desc: "Pre-built recurring monthly closing checklists that guide staff from trial balance imports and journal postings to finalized management accounts.",
  },
  {
    icon: CreditCard,
    title: "Bank & Credit Card Feed Reconciliations",
    desc: "Automated transaction import tracking, rule-based reconciliation checklists, and automated chasers for missing statements and receipts.",
  },
  {
    icon: BarChart3,
    title: "Management MIS Reporting Packs",
    desc: "Deliver automated monthly P&L, balance sheet, cash burn, and budget-vs-actual financial dashboards directly to client leadership through their portal.",
  },
  {
    icon: Receipt,
    title: "Accounts Payable & Receivable (AP/AR) Hub",
    desc: "Centralize vendor bill intake, route bills for 1-click client payment approvals, and track debtor aging reports with automated payment reminders.",
  },
  {
    icon: Users,
    title: "Payroll & Statutory Deductions Engine",
    desc: "Streamline monthly salary register processing, PF/ESI/PT deduction summaries, and automated employee payslip distribution to clients.",
  },
  {
    icon: FileSpreadsheet,
    title: "Year-End Financial Close & Accruals",
    desc: "Structured year-end closing checklists covering prepaid expense amortization, fixed asset depreciation schedules, and audit-ready trial balance packs.",
  },
];

const ACCOUNTING_FAQS = [
  {
    q: "How does Pyngyn help our bookkeeping firm collect monthly bank statements faster?",
    a: "Pyngyn allows you to set recurring monthly PBC (Provided-By-Client) requests. The system automatically notifies clients via WhatsApp and email on your chosen closing day until all statements and invoices are uploaded.",
  },
  {
    q: "Does Pyngyn integrate with our existing accounting ledger software?",
    a: "Yes. Pyngyn integrates with the core tools accounting practices rely on, including Tally, Computax, Zoho Books, QuickBooks, Google Drive, and Gmail.",
  },
  {
    q: "Can we track whether our monthly bookkeeping retainers are profitable?",
    a: "Yes. Every client portfolio tracks budgeted effort hours against actual logged time. When out-of-scope work or high transaction volume occurs, the system alerts managers to adjust retainer fees.",
  },
  {
    q: "How do clients access their monthly P&L and financial statements?",
    a: "Clients receive their own white-labeled ClientSpace portal accessible via frictionless magic links. They can review approved MIS packs, upload bills, and track their monthly bookkeeping progress anytime.",
  },
];

export default function AccountingFirmsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/solutions/accounting-firms",
            name: "Accounting & Bookkeeping Practice Management Software | Pyngyn ClientSpace",
            description:
              "Purpose-built practice software for accounting firms, outsourced bookkeepers, and Client Accounting Services (CAS) teams.",
            breadcrumbId: "/solutions/accounting-firms#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Solutions", url: "/solutions/professional-services" },
              { name: "For Accounting Firms", url: "/solutions/accounting-firms" },
            ],
            "/solutions/accounting-firms"
          ),
          faqPageSchema(ACCOUNTING_FAQS, "/solutions/accounting-firms"),
        ]}
      />
      <Navbar />

      <main id="main">
        {/* ===== Hero ================================================== */}
        <section className="wrap pb-[56px] pt-[140px] text-center">
          <span className="eyebrow mx-auto justify-center">
            <span className="eyebrow-dot" aria-hidden="true" />
            Bookkeeping &amp; Accounting Practice Software · Pyngyn ClientSpace
          </span>
          <h1 className="mx-auto mt-4 max-w-[920px] font-display text-[clamp(34px,5.2vw,60px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Deliver monthly closes on time with
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">automated document intake &amp; MIS delivery.</span>
          </h1>
          <p className="lead mx-auto mt-5 max-w-[720px]">
            Pyngyn ClientSpace powers modern accounting and bookkeeping practices. Manage monthly client
            retainers, bank reconciliations, AP/AR workflows, and management reporting in one connected workspace.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a href={DEMO_URL} className="btn btn-accent">
              Book an accounting practice demo
            </a>
            <a href={SIGNUP_URL} className="btn btn-primary">
              Start 7-day free trial
            </a>
            <Link href={PRICING_URL} className="btn btn-ghost">
              View practice pricing
            </Link>
          </div>
          <p className="mt-4 text-[13px] text-muted">
            Starting at ₹499/mo ($29/mo) · Built for bookkeeping &amp; CAS practices · No credit card required
          </p>
        </section>

        {/* ===== Problems Solved ======================================== */}
        <section className="section border-t border-rule bg-sand/30">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">The Month-End Reality</span>
              <h2 className="mt-3 font-display text-[clamp(26px,3.4vw,40px)] font-semibold tracking-[-0.025em]">
                Why monthly bookkeeping feels like a never-ending scramble
              </h2>
              <p className="lead mx-auto mt-4 max-w-[620px]">
                Bookkeeping teams lose 30% of their billable capacity chasing missing records and managing ad-hoc client requests.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ACCOUNTING_PROBLEMS.map((p) => (
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
              <span className="eyebrow">Accounting Practice Workflows</span>
              <h2 className="mt-3 max-w-[820px] mx-auto font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.025em]">
                Purpose-built tools for client bookkeeping &amp; management reporting.
              </h2>
              <p className="lead mx-auto mt-4 max-w-[620px]">
                Standardize your firm&apos;s monthly closing cycle and deliver clean financial statements with zero client friction.
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

        {/* ===== FAQs ================================================== */}
        <section className="section">
          <div className="wrap max-w-[840px]">
            <div className="text-center">
              <span className="eyebrow">FAQ</span>
              <h2 className="mt-3 font-display text-[clamp(24px,3vw,36px)] font-semibold tracking-[-0.02em]">
                Accounting practice questions, answered.
              </h2>
            </div>
            <div className="mt-10 space-y-4">
              {ACCOUNTING_FAQS.map((faq) => (
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
          eyebrow="Modernize Your Bookkeeping Practice"
          headline="Take control of monthly ledger closes and client management accounts."
          body="Book a 30-minute practice walkthrough. See how Pyngyn standardizes bookkeeping pipelines and accelerates monthly closes."
          primaryLabel="Book an accounting practice demo &rarr;"
          secondaryLabel="Start 7-day free trial"
          note="Tailored to accounting firms &amp; outsourced bookkeepers · 30-minute walkthrough · No commitment"
        />
      </main>

      <Footer />
    </>
  );
}
