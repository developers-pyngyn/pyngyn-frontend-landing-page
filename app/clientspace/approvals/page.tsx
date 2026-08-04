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
  title: "Approvals & Sign-Off | Client Space | PYNGYN",
  description:
    "Clients review deliverables and approve them inside their portal. Every decision is logged, so there's never a dispute about who approved what, when.",
  alternates: { canonical: "/clientspace/approvals" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Approvals & Sign-Off | PYNGYN",
    description: "Every approval, logged. No more \"who signed off on this?\"",
    url: "/clientspace/approvals",
    type: "website",
  },
};

const DETAILS: { title: string; body: string }[] = [
  { title: "Review inside the portal", body: "Clients see the deliverable, the context around it, and an approve/request-changes action, all in one place, no attachment hunting." },
  { title: "One click to approve", body: "No printing, scanning, or reply-all email chains. A client approves or requests changes with a single click inside their space." },
  { title: "Every decision logged", body: "Who approved what, and when, is recorded automatically. If a deadline slips because a sign-off was late, you have the timestamp to prove it." },
  { title: "Nothing sits in someone's inbox for a week", body: "Approvals are visible the moment they're needed, with the deadline attached, instead of one email lost among dozens." },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How is this different from asking a client to reply \"approved\" by email?", a: "An email reply isn't tied to the specific version of the deliverable, isn't logged anywhere searchable, and is easy to lose in a thread. An in-portal approval is timestamped, tied to the exact document, and visible to your whole team instantly." },
  { q: "Can clients request changes instead of approving?", a: "Yes. A client can approve or send it back with comments, directly against the deliverable, so the conversation stays attached to the right version." },
  { q: "Is there a record of who approved what?", a: "Yes, every approval is logged with a timestamp, so there's a clear audit trail if a client, or your own team, needs to look back at a decision." },
  { q: "Does this replace e-signature for contracts?", a: "Approvals and e-signature are two related but separate things. E-signature is for formally signing a document; approvals are for lighter-weight sign-off on deliverables and drafts. Client Space includes both." },
];

export default function ApprovalsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/clientspace/approvals",
            name: "Approvals & Sign-Off | PYNGYN",
            description: "Clients review deliverables and approve them inside their portal. Every decision is logged.",
            breadcrumbId: "/clientspace/approvals#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Client Space", url: "/clientspace" },
              { name: "Approvals & sign-off", url: "/clientspace/approvals" },
            ],
            "/clientspace/approvals"
          ),
          faqPageSchema(FAQS, "/clientspace/approvals"),
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
            Approvals & sign-off
          </span>
          <h1 className="mt-4 max-w-[820px] font-display text-[clamp(34px,5vw,58px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Every approval, logged.
            <br className="hidden sm:block" />
            <span className="text-accent">No more &ldquo;who signed off on this?&rdquo;</span>
          </h1>
          <p className="lead mt-5 max-w-[640px]">
            Clients review deliverables and approve them right inside their portal. Every
            decision is timestamped, so there&apos;s never a dispute about who approved
            what, or when.
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
              Sign-offs stop being your bottleneck.
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
              <Link href="/clientspace/secure-documents" className="btn btn-ghost">Secure documents & e-signature →</Link>
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
          headline="Stop chasing sign-offs. Let clients approve in one click."
          body="See approvals set up on a real engagement in 30 minutes."
          secondaryLabel="Start free trial"
          note="30-minute walkthrough · Set up in minutes · No commitment"
        />
      </main>
      <Footer />
    </>
  );
}
