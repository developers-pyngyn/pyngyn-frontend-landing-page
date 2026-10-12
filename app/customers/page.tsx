import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Proof, Metrics } from "@/components/Sections";
import { FinalCTA, Footer } from "@/components/Footer";
import { DEMO_URL, SIGNUP_URL } from "@/components/config";
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
  faqPageSchema,
} from "@/components/schema";
import { FaqSection } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "Customers | PYNGYN",
  description:
    "500+ professional-services firms run on PYNGYN. What firms tell us, what customers get, and how to get started.",
  alternates: { canonical: "/customers" },
};

// Discovery-call observations, pulled from the same honestly-labelled pool
// used on /clientspace and /workspace, aggregated here rather than repeating
// the homepage's testimonial block verbatim. Roles only, no names, no
// invented company logos.
const VOICES: { quote: string; role: string; topic: string }[] = [
  {
    quote:
      "Every Monday starts with the same five emails: any update on our filing? The answer exists, it just lives in our tracker, not anywhere the client can see.",
    role: "Partner, CA firm",
    topic: "Client visibility",
  },
  {
    quote:
      "We finally see whether an engagement is profitable while it's running, not after the invoice. We price and staff client work completely differently now.",
    role: "Partner, advisory firm",
    topic: "Engagement profitability",
  },
  {
    quote:
      "Sign-offs are our bottleneck. The engagement letter sits in someone's inbox for a week, and nobody notices until the deadline is already at risk.",
    role: "Practice manager, law firm",
    topic: "Approvals & sign-offs",
  },
  {
    quote:
      "Internal work and client work finally live in one place. When a senior leaves, five years of client context doesn't walk out the door with them.",
    role: "Operations lead, consulting firm",
    topic: "Practice continuity",
  },
];

const CUSTOMER_BENEFITS = [
  {
    title: "Your roadmap input, actually used",
    body: "Customers get a direct line to the team building this. Feature requests from real firms get prioritized first.",
  },
  {
    title: "Pricing locked at today's rate",
    body: "Join now and keep your rate even as list pricing changes later, for as long as you stay subscribed.",
  },
  {
    title: "Hands-on setup, not a help doc",
    body: "We personally help configure your first few client engagements, not a generic onboarding email sequence.",
  },
];

const CUSTOMER_FAQS = [
  {
    q: "What types of firms get the most value from PYNGYN?",
    a: "PYNGYN is built specifically for accounting firms, Chartered Accountants (CAs), tax advisors, audit practices, and professional-services partnerships ranging from 3 to 100+ practitioners who manage high-volume client deliverables and statutory deadlines.",
  },
  {
    q: "How does migration work from our current spreadsheets or PM software?",
    a: "We provide structured Excel and CSV import templates for client masters, active engagements, and recurring tasks. Our onboarding team directly assists with your initial data upload to ensure zero disruption to ongoing client work.",
  },
  {
    q: "How do our clients react to using ClientSpace?",
    a: "Clients appreciate the simplicity. Because ClientSpace requires no password (using secure magic links sent to email or WhatsApp), client adoption is frictionless. Clients get immediate visibility into active filing stages and pending document requests without asking.",
  },
  {
    q: "What kind of ongoing training and support do customers receive?",
    a: "Every customer receives dedicated onboarding support, video walkthroughs, and responsive email assistance. Business and Enterprise plans include dedicated practice consultation and priority SLA responses.",
  },
  {
    q: "Can multiple partners manage separate service lines within the same firm account?",
    a: "Yes. PYNGYN supports multi-team role permissions and branch hierarchy. Audit, Tax, Advisory, and ROC compliance teams can operate their respective pipelines while firm partners retain holistic practice oversight.",
  },
];

export default function CustomersPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/customers",
            name: "Customers | PYNGYN",
            description:
              "500+ professional-services firms run on PYNGYN. What firms tell us, and what customers get.",
            breadcrumbId: "/customers#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Customers", url: "/customers" },
            ],
            "/customers"
          ),
          faqPageSchema(CUSTOMER_FAQS, "/customers"),
        ]}
      />
      <Navbar />
      <main id="main">
        <section className="wrap pb-[20px] pt-[150px]">
          <span className="eyebrow">Customers</span>
          <h1 className="mt-3 max-w-[760px] font-display text-[clamp(34px,4.8vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            500+ professional-services firms run on PYNGYN.
          </h1>
          <p className="lead mt-4 max-w-[680px]">
            Rather than show you a logo wall, here&apos;s what firms evaluating ClientSpace
            actually tell us, and what customers get for coming on board.
          </p>
        </section>
        <Proof />

        {/* ===== Voices ==================================================== */}
        <section className="section">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">From discovery calls</span>
              <h2 className="mt-3 font-display text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.02em]">
                What firms tell us before they sign up.
              </h2>
              <p className="lead mx-auto mt-4 max-w-[640px]">
                Anonymised observations from conversations with partners, practice managers, and
                operations leads. Roles only, no names, no invented logos.
              </p>
            </div>
            <div className="mt-[46px] grid gap-[22px] md:grid-cols-2">
              {VOICES.map(({ quote, role, topic }) => (
                <figure key={role + topic} className="card flex h-full flex-col">
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {topic}
                  </span>
                  <blockquote className="mt-3 flex-1 text-[16.5px] leading-relaxed">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 border-t border-line pt-3.5 text-[13.5px] text-muted">
                    {role}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <Metrics />

        {/* ===== Customer benefits ================================ */}
        <section className="section-tight bg-[#fbfbfd]">
          <div className="wrap">
            <div className="text-center">
              <span className="eyebrow">Why firms choose PYNGYN</span>
              <h2 className="mt-3 font-display text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.02em]">
                What customers get.
              </h2>
            </div>
            <div className="mt-10 grid gap-[18px] md:grid-cols-3">
              {CUSTOMER_BENEFITS.map((b) => (
                <div key={b.title} className="card h-full">
                  <h3 className="text-[16px] font-bold leading-snug">{b.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{b.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a href={SIGNUP_URL} className="btn btn-accent">
                Start free trial →
              </a>
              <a href={DEMO_URL} className="btn btn-ghost">
                Talk to us first
              </a>
            </div>
          </div>
        </section>

        <FaqSection
          eyebrow="Customer FAQ"
          title="Frequently asked questions from customers."
          description="Everything you need to know about rollout, team adoption, data migration, and partner support."
          faqs={CUSTOMER_FAQS}
        />

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
