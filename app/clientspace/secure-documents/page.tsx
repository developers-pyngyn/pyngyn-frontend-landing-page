import type { Metadata } from "next";
import Link from "next/link";
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
  title: "Secure Documents & E-Signature | Client Space | PYNGYN",
  description:
    "Share, request, and sign documents inside the client portal. Version-controlled, encrypted, and audit-logged, instead of moving financial and legal records through unsecured email.",
  alternates: { canonical: "/clientspace/secure-documents" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Secure Documents & E-Signature | PYNGYN",
    description: "Documents and e-signatures, without the inbox risk.",
    url: "/clientspace/secure-documents",
    type: "website",
  },
};

const DETAILS: { title: string; body: string }[] = [
  { title: "Encrypted in transit and at rest", body: "Every document uploaded to a Client Space is encrypted, both while it moves and while it's stored, the same standard you'd expect from a bank, not an email inbox." },
  { title: "Access controlled per client", body: "A client can only ever see documents inside their own isolated space. There is no shared drive, no accidental cross-client visibility." },
  { title: "Built-in e-signature", body: "Send engagement letters, deliverables, and agreements for signature without leaving the portal. No separate e-signature subscription to manage." },
  { title: "Full audit trail", body: "Every upload, view, and signature is logged. If a client ever asks \"did you send that?\" or \"who signed off?\", the answer is one click away." },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Is this secure enough for legal and financial documents?", a: "Yes. Documents are encrypted in transit and at rest, access is controlled per client, and every action is logged in an audit trail, far safer than emailing sensitive records, which most firms still do today." },
  { q: "Do I need a separate e-signature tool?", a: "No. E-signature is built into Client Space. You can send a document for signature without a separate subscription to DocuSign or similar." },
  { q: "Can clients upload documents too, not just receive them?", a: "Yes. Clients can upload requested documents directly into their space, so you're not chasing attachments across email threads." },
  { q: "What happens to documents if we cancel?", a: "You can export your firm's documents at any time. Ask your onboarding contact for the specifics of your plan's export and retention terms." },
];

export default function SecureDocumentsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/clientspace/secure-documents",
            name: "Secure Documents & E-Signature | PYNGYN",
            description: "Share, request, and sign documents inside the client portal. Version-controlled, encrypted, and audit-logged.",
            breadcrumbId: "/clientspace/secure-documents#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Client Space", url: "/clientspace" },
              { name: "Secure documents", url: "/clientspace/secure-documents" },
            ],
            "/clientspace/secure-documents"
          ),
          faqPageSchema(FAQS, "/clientspace/secure-documents"),
        ]}
      />
      <Navbar />
      <main id="main">
        {/* ===== Hero ====================================================== */}
        <section className="wrap pb-[56px] pt-[140px]">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            <Link href="/clientspace" className="hover:text-accent">Client Space</Link>
            <span className="mx-1 text-muted/50">/</span>
            Secure documents & e-signature
          </span>
          <h1 className="mt-4 max-w-[820px] font-display text-[clamp(34px,5vw,58px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Documents and signatures,
            <br className="hidden sm:block" />
            <span className="text-accent">without the inbox risk.</span>
          </h1>
          <p className="lead mt-5 max-w-[640px]">
            Financial records, legal documents, and signed agreements stop moving through
            unsecured email. Share, request, and sign, all inside the client's own
            encrypted, access-controlled portal.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={DEMO_URL} className="btn btn-accent">Book a demo</a>
            <a href={SIGNUP_URL} className="btn btn-primary">Start free trial</a>
          </div>
          <p className="mt-4 text-[13px] text-muted">
            Part of <Link href="/clientspace" className="font-semibold text-accent">Client Space</Link>,
            from $19 per client/month · standalone, no Workspace required
          </p>
        </section>

        {/* ===== Details ==================================================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <span className="eyebrow">How it works</span>
            <h2 className="mt-3 max-w-[680px] font-display text-[clamp(24px,3vw,34px)] font-semibold leading-tight tracking-[-0.02em]">
              Built for records that can't afford to leak.
            </h2>
            <div className="mt-10 grid gap-[18px] sm:grid-cols-2">
              {DETAILS.map((d) => (
                <div key={d.title} className="card h-full">
                  <h3 className="text-[16px] font-bold leading-snug">{d.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Related capabilities ======================================= */}
        <section className="section-tight">
          <div className="wrap">
            <span className="eyebrow">Also part of Client Space</span>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/clientspace/branded-portal" className="btn btn-ghost">Branded client portal →</Link>
              <Link href="/clientspace/approvals" className="btn btn-ghost">Approvals & sign-off →</Link>
              <Link href="/clientspace" className="btn btn-ghost">See all of Client Space →</Link>
            </div>
          </div>
        </section>

        {/* ===== FAQ ========================================================= */}
        <section className="section">
          <div className="wrap max-w-[760px]">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-3 font-display text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.02em]">
              Common questions
            </h2>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {FAQS.map((f) => (
                <div key={f.q} className="py-5">
                  <h3 className="text-[15.5px] font-bold">{f.q}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA
          headline="Stop moving sensitive documents through email."
          body="See secure document sharing and e-signature set up on a real engagement in 30 minutes."
          secondaryLabel="Start free trial"
          note="30-minute walkthrough · Set up in minutes · No commitment"
        />
      </main>
      <Footer />
    </>
  );
}
