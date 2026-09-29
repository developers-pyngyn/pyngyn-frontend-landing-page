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
  FolderArchive,
  FileCheck2,
  Lock,
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
    "Statutory compliance software for accounting firms, CAs, and CS teams. Track ROC/MCA, DSC registries, group compliance hierarchies, and statutory challan archives.",
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

const COMPLIANCE_PROBLEMS: { num: string; title: string; body: string }[] = [
  {
    num: "01",
    title: "Missed MCA annual filing deadlines triggering compounding daily fines",
    body: "Missing AOC-4 or MGT-7 cutoffs costs corporate clients ₹100/day per form, plus compounding director disqualification and strike-off risks.",
  },
  {
    num: "02",
    title: "Expired director DSC tokens discovered on the day of submission",
    body: "Filings stall at 11 PM because a key signing director's Digital Signature Certificate expired weeks earlier without automated warning.",
  },
  {
    num: "03",
    title: "Complex corporate group structures with blind subsidiary filing gaps",
    body: "Managing holding companies, operating subsidiaries, and LLPs on spreadsheets leaves partners blind to subsidiary compliance lapses.",
  },
  {
    num: "04",
    title: "Password chaos & OTP lockouts across government portals",
    body: "Sharing MCA-V3, GST, and Income Tax portal passwords via insecure chat groups results in blocked accounts and frantic last-minute credential resets.",
  },
  {
    num: "05",
    title: "Scrambling to locate historical SRN receipts and payment challans",
    body: "Secretarial teams lose days hunting for past approval letters and challans during due diligence, bank loan reviews, and statutory audits.",
  },
  {
    num: "06",
    title: "Difficulty proving real-time compliance health to corporate boards",
    body: "Company secretaries lack a clean, live dashboard to present overall statutory compliance standing to board members and audit committees.",
  },
];

const COMPLIANCE_WORKFLOWS = [
  {
    icon: Calendar,
    title: "Master Statutory Regulatory Calendar",
    body: "Pre-configured annual timeline tracking MCA annual filings, ROC event-based forms, GST returns, TDS schedules, and statutory audit cutoff dates.",
  },
  {
    icon: KeyRound,
    title: "DSC & USB Token Central Registry",
    body: "Track director & partner DSC validities, physical USB token locations, PIN vault, and automated 30-day expiry renewal reminders.",
  },
  {
    icon: Building,
    title: "Multi-Tier Corporate Group Hierarchy & DIN Mapping",
    body: "Dynamic corporate family trees displaying holding companies, Indian & foreign subsidiaries, joint ventures, and LLPs with director DIN mapping.",
  },
  {
    icon: FileCheck2,
    title: "MCA & ROC Secretarial Filing Pipelines",
    body: "End-to-end secretarial tracking for AOC-4, MGT-7, DIR-3 KYC, DPT-3, MSME-1, and board resolution registers with live SRN status tracking.",
  },
  {
    icon: Lock,
    title: "Government Portal Credential & OTP Manager",
    body: "Role-gated credential repository for secure team access to Income Tax, GST, MCA-V3, DGFT, and TRACES portals without credential leaks.",
  },
  {
    icon: FolderArchive,
    title: "Statutory Challan & Acknowledgment Archive",
    body: "Centralized document archive for SRNs, GST ARNs, tax payment challans, and government approval orders indexed by client financial year.",
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
  {
    q: "How does Pyngyn manage secretarial filings like AOC-4 and MGT-7?",
    a: "Pyngyn tracks the entire lifecycle of ROC forms: draft preparation, board approval date, DSC affixing, SRN generation, and final MCA approval receipt.",
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
              { name: "Solutions", url: "/solutions/professional-services" },
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
            Statutory &amp; Secretarial Compliance · Pyngyn ClientSpace
          </span>
          <h1 className="mx-auto mt-4 max-w-[920px] font-display text-[clamp(34px,5.2vw,60px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Never miss a statutory deadline with
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">centralized DSC registers &amp; ROC/MCA pipelines.</span>
          </h1>
          <p className="lead mx-auto mt-5 max-w-[700px]">
            Pyngyn ClientSpace powers modern corporate secretarial and compliance teams: Master statutory calendars,
            director DSC expiry tracking, multi-entity group matrices, and SRN archives in one secure system.
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
            Starting at ₹499/mo ($29/mo) · Built for CS teams, CAs &amp; corporate compliance managers · No credit card required
          </p>
        </section>

        {/* ===== Problems Solved ======================================== */}
        <section className="section border-t border-rule bg-sand/30">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">The Compliance Reality</span>
              <h2 className="mt-3 font-display text-[clamp(26px,3.4vw,40px)] font-semibold tracking-[-0.025em]">
                Why tracking corporate compliance on spreadsheets is a penalty trap
              </h2>
              <p className="lead mx-auto mt-4 max-w-[620px]">
                One missed annual return or expired director signature can trigger thousands in late fees and legal disqualifications.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {COMPLIANCE_PROBLEMS.map((p) => (
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
              <span className="eyebrow">Compliance Workflows</span>
              <h2 className="mt-3 max-w-[820px] mx-auto font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.025em]">
                Complete statutory control from secretarial filings to challan archives.
              </h2>
              <p className="lead mx-auto mt-4 max-w-[620px]">
                Safeguard client corporate health with centralized registries and automated expiry alerts.
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
                Statutory compliance questions, answered.
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
          eyebrow="Zero Missed Statutory Deadlines"
          headline="Take control of MCA/ROC filings, director DSCs, and group compliance."
          body="Book a 30-minute practice walkthrough. See how Pyngyn centralizes secretarial registers and eliminates penalty exposure."
          primaryLabel="Book a compliance demo &rarr;"
          secondaryLabel="Start 7-day free trial"
          note="Tailored to corporate compliance &amp; secretarial practices · 30-minute walkthrough · No commitment"
        />
      </main>

      <Footer />
    </>
  );
}
