import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import {
  Benefits,
  HowItWorks,
  Compare,
  Integrations,
} from "@/components/Sections";
import { FinalCTA, Footer } from "@/components/Footer";
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
  faqPageSchema,
} from "@/components/schema";
import { FaqSection } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "Benefits | PYNGYN",
  description:
    "AI planning, auto status, and risk detection. See how PYNGYN turns plain-language goals into a living plan.",
  alternates: { canonical: "/benefits" },
};

const BENEFITS_FAQS = [
  {
    q: "How does PYNGYN increase billable utilization for professional services firms?",
    a: "PYNGYN eliminates 5 to 8 non-billable hours per team member each week by automating manual status updates, client document chasing, and multi-tool coordination. Real-time capacity heatmaps ensure staff workloads remain balanced at optimal billable targets without burnout.",
  },
  {
    q: "How does AI risk detection prevent client deliverable delays?",
    a: "PYNGYN's continuous risk engine monitors task velocity, pending document requests, and review bottlenecks. When an internal milestone or client dependency stalls, the system flags the risk days before the statutory deadline or client delivery date is compromised.",
  },
  {
    q: "What is the client experience benefit of a dedicated ClientSpace portal?",
    a: "Clients receive a white-labeled, passwordless portal showing real-time engagement progress, pending document requests, and approval gates. This transparency cuts incoming 'any update?' inquiries by over 70% and measurably improves client retention.",
  },
  {
    q: "How does PYNGYN protect practice continuity when staff leave?",
    a: "All client communication, workpapers, review notes, and historical filings are indexed under the client's permanent record rather than buried in individual personal inboxes. When team members change or take leave, replacement staff step in with complete historical context.",
  },
  {
    q: "How quickly does a firm realize ROI from adopting PYNGYN?",
    a: "Most firms report operational payback within their first month. Onboarding takes days instead of months because PYNGYN imports client rosters directly from spreadsheets and integrates with your existing tools without disrupting current work.",
  },
];

export default function BenefitsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/benefits",
            name: "Benefits | PYNGYN",
            description:
              "AI planning, auto status, and risk detection. See how PYNGYN turns plain-language goals into a living plan.",
            breadcrumbId: "/benefits#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Benefits", url: "/benefits" },
            ],
            "/benefits"
          ),
          faqPageSchema(BENEFITS_FAQS, "/benefits"),
        ]}
      />
      <Navbar />
      <main id="main">
        <section className="wrap pb-[40px] pt-[150px]">
          <span className="eyebrow">Benefits</span>
          <h1 className="mt-3 max-w-[760px] font-display text-[clamp(34px,4.8vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            Everything you need to run the firm and the client work.
          </h1>
          <p className="lead mt-4">
            PYNGYN handles the operations so your firm can focus on client work.
            Here&apos;s what it does.
          </p>
        </section>
        <Benefits />
        <HowItWorks />
        <Compare />
        <Integrations />
        <FaqSection
          eyebrow="Benefits FAQ"
          title="Frequently asked questions about practice benefits."
          description="How PYNGYN delivers measurable efficiency gains, risk reduction, and client satisfaction for professional firms."
          faqs={BENEFITS_FAQS}
        />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
