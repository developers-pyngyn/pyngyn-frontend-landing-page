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
  title: "Admin & Security | PYNGYN",
  description:
    "SSO/SAML, role-based permissions, data isolation, and audit logs, enterprise-grade controls without enterprise complexity.",
  alternates: { canonical: "/benefits/admin-security" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Admin & Security | PYNGYN",
    description: "Enterprise-grade controls, without enterprise complexity.",
    url: "/benefits/admin-security",
    type: "website",
  },
};

const DETAILS: { title: string; body: string }[] = [
  { title: "SSO / SAML", body: "Sign in through your firm's existing identity provider. One less password for your team, and one more control point for you." },
  { title: "Role-based permissions", body: "Directors, managers, and individual contributors see and can do different things. Client-facing roles are separate again, controlled per client." },
  { title: "Data isolation by client", body: "Each Client Space is fully isolated. A client can never see another client's data, and internal Workspace data is never exposed to clients unless you explicitly share it." },
  { title: "Audit logs", body: "Key actions, logins, approvals, document access, are logged, so you can answer \"who did what, when\" if you're ever asked." },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Do you support SSO?", a: "Yes, SSO/SAML is available so your team signs in through your firm's existing identity provider." },
  { q: "Are you SOC 2 certified?", a: "Our security program is SOC 2 aligned. If you need details for a vendor security review, ask on a demo call and we'll walk through our current posture and documentation." },
  { q: "How is client data isolated?", a: "Every Client Space is fully isolated at the data level. A client can only ever access their own engagement, never another client's, and never your firm's internal Workspace data unless you choose to share something specific." },
  { q: "Is my data used to train AI models?", a: "No. Customer data is not used to train AI models without explicit consent." },
];

export default function AdminSecurityPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/benefits/admin-security",
            name: "Admin & Security | PYNGYN",
            description: "SSO/SAML, role-based permissions, data isolation, and audit logs.",
            breadcrumbId: "/benefits/admin-security#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Benefits", url: "/benefits" },
              { name: "Admin & security", url: "/benefits/admin-security" },
            ],
            "/benefits/admin-security"
          ),
          faqPageSchema(FAQS, "/benefits/admin-security"),
        ]}
      />
      <Navbar />
      <main id="main">
        {/* ===== Hero ====================================================== */}
        <section className="wrap pb-[56px] pt-[140px]">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            <Link href="/benefits" className="hover:text-accent">Benefits</Link>
            <span className="mx-1 text-muted/50">/</span>
            Admin & security
          </span>
          <h1 className="mt-4 max-w-[820px] font-display text-[clamp(34px,5vw,58px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Enterprise-grade controls.
            <br className="hidden sm:block" />
            <span className="text-accent">Without enterprise complexity.</span>
          </h1>
          <p className="lead mt-5 max-w-[640px]">
            SSO/SAML, role-based permissions, data isolation, and audit logs, the controls
            a security review asks for, without the multi-week rollout.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={DEMO_URL} className="btn btn-accent">Book a demo</a>
            <a href={SIGNUP_URL} className="btn btn-primary">Start free trial</a>
          </div>
          <p className="mt-4 text-[13px] text-muted">
            Encrypted in transit and at rest · GDPR compliant · SOC 2 aligned
          </p>
        </section>

        {/* ===== Details ==================================================== */}
        <section className="section bg-[#fbfbfd]">
          <div className="wrap">
            <span className="eyebrow">What's included</span>
            <h2 className="mt-3 max-w-[680px] font-display text-[clamp(24px,3vw,34px)] font-semibold leading-tight tracking-[-0.02em]">
              The controls a security review actually asks for.
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
          headline="Get the security answers before your buyer has to ask."
          body="Talk through your firm's specific security and compliance questions on a 30-minute call."
          note="30-minute walkthrough · Tailored to your team · No commitment"
        />
      </main>
      <Footer />
    </>
  );
}
