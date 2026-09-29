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
  Globe2,
  FileWarning,
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
  title: "Tax Practice Management Software for Direct & Indirect Tax Teams | Pyngyn ClientSpace",
  description:
    "Purpose-built tax practice software for Chartered Accountants, corporate tax teams, and tax advisory partnerships. Streamline corporate ITR pipelines, GST 2B reconciliations, advance tax, TDS, and scrutiny notices.",
  alternates: { canonical: "/solutions/tax-teams" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Tax Practice Management Software for Direct & Indirect Tax Teams | Pyngyn ClientSpace",
    description:
      "Automate corporate tax computations, GST reconciliations, advance tax forecasting, and notice tracking in one tax practice command center.",
    url: "/solutions/tax-teams",
    type: "website",
  },
};

const TAX_PROBLEMS: { num: string; title: string; body: string }[] = [
  {
    num: "01",
    title: "Last-minute AIS & 26AS mismatch discoveries before deadline",
    body: "Unreconciled TDS credits, unreported high-value transactions, or AIS discrepancies stall final return sign-offs hours before the tax portal locks.",
  },
  {
    num: "02",
    title: "Blocked input tax credit (ITC) from delayed GST 2B matching",
    body: "Corporate clients lose thousands in working capital because vendor invoice mismatches are detected only after monthly GSTR-3B filings are submitted.",
  },
  {
    num: "03",
    title: "Section 234B & 234C interest penalties from flawed estimates",
    body: "Manual tax estimation spreadsheets fail to capture quarterly profit spikes, leaving corporate clients with avoidable interest liabilities.",
  },
  {
    num: "04",
    title: "Department scrutiny notices slipping through the cracks",
    body: "Faceless assessment notices under Section 142(1) or 148 get buried in client executive inboxes, risking ex-parte adverse orders.",
  },
  {
    num: "05",
    title: "Endless chase for foreign asset & capital gain disclosures",
    body: "Tax professionals waste weeks following up for schedule FA foreign asset statements, ESOP valuations, and crypto transaction records.",
  },
  {
    num: "06",
    title: "Quarterly TDS certificate distribution bottleneck",
    body: "Generating, verifying, and distributing hundreds of Form 16 and 16A certificates across client workforces drains multiple days of team capacity.",
  },
];

const TAX_WORKFLOWS = [
  {
    icon: FileSpreadsheet,
    title: "Corporate & Individual ITR Pipelines",
    desc: "Track computation drafts, MAT/AMT schedules, 26AS/AIS reconciliations, and final e-filing acknowledgments across ITR-1 through ITR-7.",
  },
  {
    icon: Receipt,
    title: "GST Monthly & Annual Reconciliations",
    desc: "Coordinate monthly GSTR-1 & GSTR-3B filings, automated GSTR-2B vs purchase register matching, and annual GSTR-9/9C reconciliation schedules.",
  },
  {
    icon: Calendar,
    title: "Advance Tax Forecasting & Interest Shielding",
    desc: "Forecast quarterly advance tax liabilities, model Section 234B/234C interest implications, and issue client tax payment challan summaries.",
  },
  {
    icon: FileCheck2,
    title: "TDS & TCS Returns & Certificate Generation",
    desc: "Quarterly Form 24Q, 26Q, and 27Q processing pipelines, challan validation, and automated Form 16/16A client certificate distribution.",
  },
  {
    icon: FileWarning,
    title: "Department Notice Tracking & Scrutiny Appeals",
    desc: "Log Section 142(1), 143(2), and 148 income tax notices, track statutory limitation dates, and maintain faceless assessment response trails.",
  },
  {
    icon: Globe2,
    title: "Transfer Pricing & International Tax Registers",
    desc: "Maintain Form 3CEB accountant certificates, transfer pricing study documentation, and Form 15CA/15CB foreign remittance certification queues.",
  },
];

const TAX_FAQS = [
  {
    q: "Can Pyngyn track multi-entity tax structures for business groups?",
    a: "Yes. Pyngyn organizes client hierarchies by holding company, subsidiaries, LLPs, and individual director tax profiles so all group filings remain visible on a single dashboard.",
  },
  {
    q: "How does Pyngyn help with GST 2B reconciliation and invoice chase?",
    a: "You can track GSTR-2B vs purchase register matching status directly on the client portfolio. Automated alerts notify clients regarding vendor non-compliance so ITC is never blocked.",
  },
  {
    q: "How does Pyngyn manage faceless income tax assessments and scrutiny notices?",
    a: "Every department notice is logged with its statutory reply cutoff date, assigned tax specialist, draft response file, and portal acknowledgment receipt.",
  },
  {
    q: "Can clients review and approve draft tax computations before filing?",
    a: "Yes. Tax teams can share draft computations and tax summaries securely via the client portal. Clients approve computations with one click before e-filing.",
  },
];

export default function TaxTeamsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/solutions/tax-teams",
            name: "Tax Practice Management Software for Direct & Indirect Tax Teams | Pyngyn ClientSpace",
            description:
              "Purpose-built tax practice management software for Chartered Accountants, corporate tax teams, and tax consultants.",
            breadcrumbId: "/solutions/tax-teams#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Solutions", url: "/solutions/professional-services" },
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
            Direct &amp; Indirect Tax Practice Software · Pyngyn ClientSpace
          </span>
          <h1 className="mx-auto mt-4 max-w-[920px] font-display text-[clamp(34px,5.2vw,60px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Deliver every tax return on time with
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">automated computation tracking &amp; notice defense.</span>
          </h1>
          <p className="lead mx-auto mt-5 max-w-[700px]">
            Pyngyn ClientSpace powers modern tax practices: Corporate Tax computations, GST 2B reconciliations,
            Advance Tax liability forecasting, and faceless scrutiny tracking in one connected command center.
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

        {/* ===== Problems Solved ======================================== */}
        <section className="section border-t border-rule bg-sand/30">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">The Tax Season Reality</span>
              <h2 className="mt-3 font-display text-[clamp(26px,3.4vw,40px)] font-semibold tracking-[-0.025em]">
                Why tax season always ends in a last-minute scramble
              </h2>
              <p className="lead mx-auto mt-4 max-w-[620px]">
                Tax professionals spend up to 40% of peak season resolving document mismatches and tracking department notices.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TAX_PROBLEMS.map((p) => (
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
              <span className="eyebrow">Tax Practice Workflows</span>
              <h2 className="mt-3 max-w-[820px] mx-auto font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.025em]">
                Everything your tax team needs from computation to notice resolution.
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
          body="Book a 30-minute practice walkthrough. See how Pyngyn automates tax computations, GST reconciliations, and notice tracking."
          primaryLabel="Book a practice demo &rarr;"
          secondaryLabel="Start 7-day free trial"
          note="Tailored to tax practices &amp; CA firms · 30-minute walkthrough · No commitment"
        />
      </main>

      <Footer />
    </>
  );
}
