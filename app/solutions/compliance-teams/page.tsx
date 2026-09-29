import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Calendar,
  KeyRound,
  Building,
  BellRing,
  CheckCircle,
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
  title: "Statutory Compliance Management Software for CA & Corporate Secretarial Teams | Pyngyn ClientSpace",
  description:
    "Statutory compliance software for accounting firms, CAs, and CS teams. Track ROC/MCA, GST, TDS, advance tax, and secretarial due dates with automated client alerts.",
  alternates: { canonical: "/solutions/compliance-teams" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Statutory Compliance Management Software for CA & Corporate Secretarial Teams | Pyngyn ClientSpace",
    description:
      "Never miss a statutory due date. Track ROC/MCA, GST, TDS, and secretarial deadlines with centralized DSC registries and client alerts.",
    url: "/solutions/compliance-teams",
    type: "website",
  },
};

const COMPLIANCE_WORKFLOWS = [
  {
    icon: Calendar,
    title: "Statutory Compliance Master Calendar",
    body: "Pre-configured recurring schedules for ROC annual returns (AOC-4, MGT-7), GST, TDS, Advance Tax, and statutory audits across all entities.",
  },
  {
    icon: KeyRound,
    title: "DSC & Government Portal Credential Register",
    body: "Track client Digital Signature Certificates (DSC) validity, USB tokens, and MCA/IT/GST portal logins with automated expiry alerts.",
  },
  {
    icon: Building,
    title: "Multi-Entity Group Compliance Matrix",
    body: "Maintain bird's-eye visibility across complex conglomerate corporate hierarchies, LLPs, subsidiaries, and director DIN status.",
  },
  {
    icon: BellRing,
    title: "Automated WhatsApp & Email Due Date Alerts",
    body: "Keep corporate clients informed of upcoming statutory cut-offs well in advance without staff spending hours sending manual reminder emails.",
  },
  {
    icon: Shield,
    title: "Statutory Penalty Risk Mitigation",
    body: "Dependencies and bottleneck tasks flag at-risk filings days before the statutory cutoff, safeguarding clients against late-fee penalties.",
  },
  {
    icon: CheckCircle,
    title: "Filing Challan & Acknowledgment Archive",
    body: "Every SRN, GST ARN, and tax acknowledgment challan is systematically tagged to the client portfolio for instant audit retrieval.",
  },
];

const COMPLIANCE_FAQS = [
  {
    q: "How does Pyngyn alert our team to upcoming statutory due dates?",
    a: "Pyngyn maintains a live statutory compliance calendar across all active clients. Dashboards highlight due dates 30, 15, and 7 days out, and flag dependencies that threaten compliance.",
  },
  {
    q: "Can Pyngyn track DSC expirations across company directors?",
    a: "Yes. The DSC Register tracks holder names, expiry dates, token locations, and linked PANs. The system automatically alerts your firm and client 30 days before a DSC expires.",
  },
  {
    q: "Can clients check their compliance health status independently?",
    a: "Yes. In their white-labeled ClientSpace portal, clients see their group entity compliance status, pending sign-offs, and historical filing acknowledgments.",
  },
];

export default function ComplianceTeamsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/solutions/compliance-teams",
            name: "Statutory Compliance Management Software for CA & Corporate Secretarial Teams | Pyngyn ClientSpace",
            description:
              "Statutory compliance software for accounting firms, CAs, and CS teams.",
            breadcrumbId: "/solutions/compliance-teams#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Solutions", url: "/solutions/accountants" },
              { name: "For Compliance Teams", url: "/solutions/compliance-teams" },
            ],
            "/solutions/compliance-teams"
          ),
          faqPageSchema(COMPLIANCE_FAQS, "/solutions/compliance-teams"),
        ]}
      />
      <Navbar />

      <main id="main">
        {/* ===== Hero ================================================== */}
        <section className="wrap pb-[56px] pt-[140px] text-center">
          <span className="eyebrow mx-auto justify-center">
            <span className="eyebrow-dot" aria-hidden="true" />
            Compliance Practice Operating System · Pyngyn ClientSpace
          </span>
          <h1 className="mx-auto mt-4 max-w-[920px] font-display text-[clamp(34px,5.2vw,60px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Never miss a statutory filing with
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">automated calendars, DSC registers &amp; alerts.</span>
          </h1>
          <p className="lead mx-auto mt-5 max-w-[700px]">
            Pyngyn ClientSpace protects your practice and client entities against missed cut-offs:
            ROC/MCA filings, GST, TDS, advance tax, and secretarial compliance with automated client chasers.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a href={DEMO_URL} className="btn btn-accent">
              Book a compliance demo
            </a>
            <a href={SIGNUP_URL} className="btn btn-primary">
              Start 7-day free trial
            </a>
            <Link href={PRICING_URL} className="btn btn-ghost">
              View practice pricing
            </Link>
          </div>
          <p className="mt-4 text-[13px] text-muted">
            Starting at ₹499/mo ($29/mo) · Built for CA &amp; corporate compliance practices · No credit card required
          </p>
        </section>

        {/* ===== Features Grid ========================================= */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">Compliance Workflows</span>
              <h2 className="mt-3 max-w-[820px] mx-auto font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.025em]">
                Statutory risk prevention, DSC governance, and client visibility.
              </h2>
              <p className="lead mx-auto mt-4 max-w-[620px]">
                Eliminate compliance blind spots across multi-entity groups and statutory deadlines.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {COMPLIANCE_WORKFLOWS.map((w) => {
                const Icon = w.icon;
                return (
                  <div key={w.title} className="card flex flex-col p-7 transition-all duration-200 hover:shadow-card-hover">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="h-6 w-6 stroke-[1.8]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-[17px] font-bold text-ink">{w.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{w.body}</p>
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
                Compliance practice questions, answered.
              </h2>
            </div>
            <div className="mt-10 space-y-4">
              {COMPLIANCE_FAQS.map((faq) => (
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
          eyebrow="Eliminate Statutory Penalty Risk"
          headline="Keep every client entity strictly compliant with zero manual stress."
          body="Book a 30-minute practice walkthrough. See how Pyngyn automates compliance registers and due date tracking."
          primaryLabel="Book a practice demo &rarr;"
          secondaryLabel="Start 7-day free trial"
          note="Tailored to CA & compliance practices · 30-minute walkthrough · No commitment"
        />
      </main>

      <Footer />
    </>
  );
}
