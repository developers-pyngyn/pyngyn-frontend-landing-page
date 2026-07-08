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
  title: "Branded Client Portal | Client Space | PYNGYN",
  description:
    "White-labeled with your firm's logo, colors, and domain. Every client gets their own isolated, branded space, not a generic tool with your logo bolted on.",
  alternates: { canonical: "/clientspace/branded-portal" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Branded Client Portal | PYNGYN",
    description: "A client portal that looks like your firm, not ours.",
    url: "/clientspace/branded-portal",
    type: "website",
  },
};

const DETAILS: { title: string; body: string }[] = [
  { title: "Your logo, your colors", body: "Upload your firm's logo and set your brand color once. Every client space carries it automatically, no per-client setup." },
  { title: "Your domain", body: "Point a subdomain of your own site at your Client Space so the URL your clients see is yours, not a generic pyngyn.ai link." },
  { title: "One space per client, fully isolated", body: "Each client gets their own portal. Nothing they see is shared with, or visible to, any other client of your firm." },
  { title: "No login friction", body: "Clients join with a one-click magic link. No password to set, remember, or reset, and no support tickets about forgotten logins." },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Can I use my own domain for the client portal?", a: "Yes. Point a subdomain you own (like clients.yourfirm.com) at your Client Space so the address your clients visit is your firm's own." },
  { q: "Do I need Workspace to get a branded portal?", a: "No. Branded client portals are part of Client Space, which is sold standalone at $19 per client/month. Workspace is a separate, optional product for your firm's internal operations." },
  { q: "Does every client get their own separate space?", a: "Yes. Each client's space is fully isolated, they see only their own engagement, documents, and status, never another client's." },
  { q: "How much can I customize?", a: "Logo, brand color, and domain are built in today. If you need deeper customization for a large rollout, tell us on a demo call and we'll scope it with you." },
];

export default function BrandedPortalPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/clientspace/branded-portal",
            name: "Branded Client Portal | PYNGYN",
            description: "White-labeled with your firm's logo, colors, and domain. Every client gets their own isolated, branded space.",
            breadcrumbId: "/clientspace/branded-portal#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Client Space", url: "/clientspace" },
              { name: "Branded client portal", url: "/clientspace/branded-portal" },
            ],
            "/clientspace/branded-portal"
          ),
          faqPageSchema(FAQS, "/clientspace/branded-portal"),
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
            Branded client portal
          </span>
          <h1 className="mt-4 max-w-[820px] font-display text-[clamp(34px,5vw,58px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            A client portal that looks like your firm.
            <br className="hidden sm:block" />
            <span className="text-accent">Not ours.</span>
          </h1>
          <p className="lead mt-5 max-w-[640px]">
            White-labeled with your logo, colors, and domain. Clients land in a space that
            feels like an extension of your firm, not a generic tool you bolted on.
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
              Set your brand once. Every client space carries it.
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
              <Link href="/clientspace/secure-documents" className="btn btn-ghost">Secure documents & e-signature →</Link>
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
          headline="Give every client their own portal, not another email thread."
          body="See a branded Client Space set up on a real engagement in 30 minutes."
          secondaryLabel="Start free trial"
          note="30-minute walkthrough · Set up in minutes · No commitment"
        />
      </main>
      <Footer />
    </>
  );
}
