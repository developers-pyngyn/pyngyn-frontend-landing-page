import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Zap,
  FileText,
  UserCheck,
  Building2,
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
  title: "Secure Client Portal Software | Bank-Grade Encryption & Compliance | Pyngyn",
  description:
    "Protect sensitive client files and communications with Pyngyn's secure client portal software. Featuring AES-256 encryption, passwordless magic links, and immutable audit trails.",
  alternates: { canonical: "/secure-client-portal" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Secure Client Portal Software | Bank-Grade Encryption & Compliance | Pyngyn",
    description:
      "Bank-grade security meets effortless client experience. Protect confidential financial, legal, and tax documents in an isolated, secure client portal.",
    url: "/secure-client-portal",
    type: "website",
  },
};

const SECURITY_PILLARS = [
  {
    icon: ShieldCheck,
    title: "AES-256 & TLS 1.3 Encryption",
    desc: "All client documents, messages, and engagement files are encrypted at rest using industry-standard AES-256 and protected in transit with TLS 1.3 cryptographic protocols.",
  },
  {
    icon: Lock,
    title: "Zero Cross-Client Data Leaks",
    desc: "Strict logical tenancy and isolated client spaces ensure no client can ever view, search, or access another client's engagement, documents, or data.",
  },
  {
    icon: Zap,
    title: "Passwordless Magic-Link Defense",
    desc: "Eliminate credential stuffing, brute force attacks, and weak passwords. Verified clients receive cryptographically signed, single-use authentication links directly to their inbox.",
  },
  {
    icon: FileText,
    title: "Tamper-Evident Audit Logs",
    desc: "Every document view, download, upload, and approval is captured in immutable audit logs with timestamps, client identifiers, and IP addresses.",
  },
  {
    icon: UserCheck,
    title: "Granular Role & Permission Gates",
    desc: "Control who sees what down to the individual document. Internal working papers stay strictly internal; external clients only see authorized deliverables.",
  },
  {
    icon: Building2,
    title: "Regulatory Compliance Readiness",
    desc: "Engineered to satisfy DPDP (India) and statutory data privacy principles. Pyngyn is a DPIIT-recognized startup operated under an ISO 9001:2015 certified Quality Management System.",
  },
];

const COMPLIANCE_STANDARDS = [
  { name: "DPIIT Recognized", detail: "Recognized startup by the Department for Promotion of Industry and Internal Trade, Govt. of India." },
  { name: "ISO 9001:2015", detail: "Certified Quality Management System (QMS) ensuring dependable software delivery and processes." },
  { name: "DPDP Act (India)", detail: "Strict consent logging, purpose limitation, and data fiduciary compliance." },
  { name: "Bank-Grade Encryption", detail: "AES-256 encryption at rest and TLS 1.3 in transit across all client communications." },
];

const FAQS = [
  {
    q: "Why is a secure client portal software safer than emailing documents?",
    a: "Standard email was never designed for confidential document exchange. Email attachments pass through multiple intermediate mail servers unencrypted, remain indefinitely in sent folders, and can easily be forwarded or leaked. Pyngyn's secure client portal keeps all files within an encrypted, access-controlled vault with comprehensive download and view logs.",
  },
  {
    q: "How does Pyngyn ensure one client cannot see another client's information?",
    a: "Pyngyn enforces multi-tenant boundary isolation at the database and application levels. Each ClientSpace is provisioned in its own logically isolated compartment with scoped access tokens, preventing cross-tenant queries and accidental file disclosures.",
  },
  {
    q: "Are client approvals legally verifiable?",
    a: "Yes. When a client approves an engagement letter, tax return, or deliverable in Pyngyn, the system creates a cryptographic timestamped record including the user's authenticated identity, IP address, and approved document version.",
  },
  {
    q: "Can clients access their secure portal on mobile devices?",
    a: "Yes. Pyngyn ClientSpace is fully responsive and optimized for mobile browsers. Clients can review status, inspect documents, and sign off on approvals securely from their smartphone or tablet without installing third-party apps.",
  },
  {
    q: "How does passwordless magic-link authentication work?",
    a: "Instead of forcing clients to create and remember complex passwords (which are often written on sticky notes or reused across insecure websites), Pyngyn generates a time-limited, cryptographically secure token sent directly to the client's verified email address. One click logs them in securely.",
  },
];

export default function SecureClientPortalPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/secure-client-portal",
            name: "Secure Client Portal Software | Pyngyn",
            description:
              "Protect sensitive client files and communications with Pyngyn's secure client portal software. AES-256 encryption, passwordless magic links, and audit trails.",
            breadcrumbId: "/secure-client-portal#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Client Space", url: "/clientspace" },
              { name: "Secure Client Portal", url: "/secure-client-portal" },
            ],
            "/secure-client-portal"
          ),
          faqPageSchema(FAQS, "/secure-client-portal"),
        ]}
      />
      <Navbar />

      <main id="main">
        {/* ===== Hero ====================================================== */}
        <section className="wrap pb-[56px] pt-[140px] text-center">
          <span className="eyebrow mx-auto justify-center">
            <span className="eyebrow-dot" aria-hidden="true" />
            Bank-Grade Confidentiality · Pyngyn ClientSpace
          </span>
          <h1 className="mx-auto mt-4 max-w-[920px] font-display text-[clamp(34px,5.4vw,62px)] font-semibold leading-[1.03] tracking-[-0.027em]">
            Secure client portal software engineered for absolute confidentiality.
          </h1>
          <p className="lead mx-auto mt-5 max-w-[700px]">
            Protect sensitive financial audits, tax records, legal agreements, and corporate filings.
            Pyngyn combines AES-256 encryption, strict client isolation, and passwordless magic links to safeguard your firm's reputation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a href={DEMO_URL} className="btn btn-accent">
              Book a security walkthrough
            </a>
            <a href={SIGNUP_URL} className="btn btn-primary">
              Start 7-day free trial
            </a>
          </div>
          <p className="mt-4 text-[13px] text-muted">
            AES-256 at rest · TLS 1.3 in transit · DPDP (India) aligned · DPIIT Recognized · ISO 9001:2015 Certified
          </p>
        </section>

        {/* ===== Threat Landscape Section ================================= */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap max-w-[880px]">
            <span className="eyebrow">The Vulnerability</span>
            <h2 className="mt-3 font-display text-[clamp(26px,3.4vw,42px)] font-semibold leading-tight tracking-[-0.025em]">
              Why email attachments and unencrypted links put your practice at risk.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              Over 85% of professional service breaches originate in compromised client inboxes or unsecured email chains.
              When confidential financial statements, PAN details, audit working papers, and signed contracts move across plain email,
              they lack access controls, expiration dates, and verifiable audit trails.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              <strong>Secure client portal software</strong> replaces this vulnerability with an encrypted vault. Only authorized
              individuals with verified email access can interact with documents, and your firm retains complete authority over permissions,
              watermarking, and revision histories.
            </p>
          </div>
        </section>

        {/* ===== Security Architecture ==================================== */}
        <section className="section">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">Defense in Depth</span>
              <h2 className="mt-3 font-display text-[clamp(26px,3.4vw,42px)] font-semibold leading-tight tracking-[-0.025em]">
                Pyngyn&apos;s multi-layer security architecture.
              </h2>
              <p className="lead mx-auto mt-4 max-w-[620px]">
                Built from the ground up to satisfy the strictest confidentiality mandates of Chartered Accountants, attorneys, and corporate advisors.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SECURITY_PILLARS.map((p) => {
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

        {/* ===== Compliance Section ======================================= */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">Trust &amp; Compliance</span>
              <h2 className="mt-3 font-display text-[clamp(26px,3.4vw,42px)] font-semibold leading-tight tracking-[-0.025em]">
                Engineered to satisfy global and regional data privacy laws.
              </h2>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {COMPLIANCE_STANDARDS.map((std) => (
                <div key={std.name} className="card p-6">
                  <div className="font-bold text-[16px] text-ink">{std.name}</div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{std.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQs ===================================================== */}
        <section className="section">
          <div className="wrap max-w-[840px]">
            <div className="text-center">
              <span className="eyebrow">FAQ</span>
              <h2 className="mt-3 font-display text-[clamp(24px,3vw,36px)] font-semibold tracking-[-0.02em]">
                Frequently asked questions about secure client portals.
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
          eyebrow="Uncompromising Security"
          headline="Secure your firm's confidential client collaborations today."
          body="Schedule a 30-minute security walkthrough. We will review our encryption models, tenant boundaries, and audit logging live."
          primaryLabel="Book a demo &rarr;"
          secondaryLabel="Start free trial"
          note="Tailored to your firm · 30-minute walkthrough · No commitment"
        />
      </main>
      <Footer />
    </>
  );
}
