import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Metrics } from "@/components/Sections";
import { FinalCTA, Footer } from "@/components/Footer";
import {
  JsonLd,
  aboutPageSchema,
  breadcrumbSchema,
  faqPageSchema,
} from "@/components/schema";
import { FaqSection } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "About | PYNGYN",
  description:
    "PYNGYN ClientSpace is the unified client management and practice operating system for professional-services firms. Learn why we're building it and what we believe.",
  alternates: { canonical: "/about" },
};

const values: [string, string][] = [
  ["Client experience over admin", "The best firms spend their time serving clients, not chasing updates and reporting. ClientSpace removes the busywork that gets in the way of that relationship."],
  ["AI as a teammate", "Our AI drafts the plan and keeps it honest, but you stay in control. It assists; it never overrides."],
  ["Clarity by default", "Everyone should be able to see what's on track and what's at risk, without a meeting to find out."],
  ["Trust is earned", "Your data is yours. We're transparent about how PYNGYN works and how we handle your information."],
];

const ABOUT_FAQS = [
  {
    q: "What is PYNGYN and who is it built for?",
    a: "PYNGYN ClientSpace is the unified client management and practice operating system purpose-built for Chartered Accountants, accounting firms, tax teams, and professional-services partnerships to manage clients, statutory deadlines, document requests, and firm operations in one connected hub.",
  },
  {
    q: "Who operates PYNGYN and where is the company based?",
    a: "PYNGYN is developed and operated by VIMOVI GlobalTech Private Limited, headquartered in India. The company is officially recognized by the Department for Promotion of Industry and Internal Trade (DPIIT), Government of India, and is certified under ISO 9001:2015 for Quality Management Systems.",
  },
  {
    q: "How does PYNGYN differ from generic task trackers like Asana or ClickUp?",
    a: "Generic project management tools lack context for accounting and compliance workflows. PYNGYN is purpose-built with statutory calendars (GST, TDS, ROC, Income Tax), 4-eye partner review gates, PBC document chase workflows, capacity management, and client-facing white-labeled portals.",
  },
  {
    q: "What security standards and data protections does PYNGYN follow?",
    a: "PYNGYN enforces 256-bit AES encryption at rest, TLS 1.3 in transit, strict multi-tenant isolation, and role-based permissions. Our infrastructure and processes align with the Digital Personal Data Protection (DPDP) Act and international ISO quality benchmarks.",
  },
  {
    q: "Does PYNGYN train public AI models on customer or client data?",
    a: "No. Your firm data and client financial documents are strictly confidential and are never used to train public or foundation AI models. AI features operate within dedicated, secure tenant boundaries under strict access control.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          aboutPageSchema({
            url: "/about",
            name: "About PYNGYN",
            description:
              "PYNGYN ClientSpace is the practice operating system for professional-services firms. Our mission, story, and what we believe.",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "About", url: "/about" },
            ],
            "/about"
          ),
          faqPageSchema(ABOUT_FAQS, "/about"),
        ]}
      />
      <Navbar />
      <main id="main">
        <section className="wrap pb-[20px] pt-[150px]">
          <span className="eyebrow">About</span>
          <h1 className="mt-3 max-w-[820px] font-display text-[clamp(34px,4.8vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            We&apos;re building the operating system for professional-services firms.
          </h1>
          <p className="lead mt-5 max-w-[680px]">
            ClientSpace unifies client collaboration, task execution, document collection,
            and compliance tracking into one seamless platform. PYNGYN started from a simple
            frustration: services firms spend more time feeding fragmented tools than doing the
            high-value client work those tools are supposed to track. We thought AI could flip that,
            so the system handles the planning, status tracking, and risk-watching, while your team
            focuses on serving clients.
          </p>
        </section>

        <section className="wrap py-[60px]">
          <div className="grid gap-[22px] md:grid-cols-2">
            <div className="card">
              <h2 className="font-display text-[22px] font-semibold">Our mission</h2>
              <p className="mt-3 text-[16px] leading-[1.7] text-muted">
                Give every firm the clarity of a great operations team without the overhead.
                ClientSpace turns plain-language intent into a living plan that stays current on
                its own, giving your team and your clients the same clear picture without anyone
                having to chase or write manual status updates.
              </p>
            </div>
            <div className="card">
              <h2 className="font-display text-[22px] font-semibold">Our story</h2>
              <p className="mt-3 text-[16px] leading-[1.7] text-muted">
                Founded by people who&apos;d run too many projects across spreadsheets, chat
                threads, and trackers that went stale by Monday, and clients who found out about
                delays by asking. ClientSpace is the unified operating platform we wished we&apos;d
                had, built with AI and modern practice workflows at its core.
              </p>
              <p className="mt-4">
                <Link
                  href="/about/founder-story"
                  className="text-[14.5px] font-semibold text-accent hover:underline"
                >
                  Read the founder story →
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="wrap pb-[60px]">
          <h2 className="font-display text-[26px] font-semibold tracking-[-0.01em]">What we believe</h2>
          <div className="mt-7 grid gap-[22px] md:grid-cols-2">
            {values.map(([title, body]) => (
              <div key={title} className="card h-full">
                <h3 className="text-[18px] font-bold">{title}</h3>
                <p className="mt-2.5 text-[15px] text-muted">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap pb-[60px]">
          <div className="card">
            <h2 className="font-display text-[22px] font-semibold">Company &amp; quality standards</h2>
            <p className="mt-3 text-[16px] leading-[1.7] text-muted">
              PYNGYN is developed and operated by VIMOVI GlobalTech Private Limited. Our organization is recognized by the Department for Promotion of Industry and Internal Trade (DPIIT), Government of India, and is certified under ISO 9001:2015 for Quality Management Systems. These recognitions reflect our commitment to standardized processes, quality control, and customer satisfaction across our operations.
            </p>
          </div>
        </section>

        <Metrics />
        <FaqSection
          eyebrow="About PYNGYN FAQ"
          title="Frequently asked questions about our company & platform."
          description="Everything you need to know about our founding mission, company credentials, security practices, and technology."
          faqs={ABOUT_FAQS}
        />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
