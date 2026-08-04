import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { RoiCalculator } from "@/components/RoiCalculator";
import { ToolConversionBridge } from "@/components/ToolConversionBridge";
import { DEMO_URL } from "@/components/config";
import {
  OG_IMAGE,
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
  faqPageSchema,
} from "@/components/schema";

export const metadata: Metadata = {
  title: "Cost of Chaos ROI Calculator | PYNGYN",
  description:
    "See what coordination overhead, status-chasing, and tool-switching cost your firm every year, and how much you could win back. Free, no signup. Built for professional-services teams.",
  alternates: { canonical: "/tools/roi-calculator" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Cost of Chaos ROI Calculator | PYNGYN",
    description:
      "Put a number on lost billable hours. Calculate the annual cost of project chaos and your potential ROI from fixing it. Free, no signup.",
    type: "website",
    url: "/tools/roi-calculator",
  },
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "What does the ROI calculator measure?",
    a: "It estimates the annual cost of coordination overhead at a services firm: the billable time lost to status-chasing, tool-switching, and hunting for context. It then shows how much of that you could realistically win back and the resulting return on investment and payback period.",
  },
  {
    q: "Where do the default numbers come from?",
    a: "The 35% time-lost default reflects commonly cited figures for time knowledge workers spend on coordination rather than billable work. Every input, including day rate, billable days, time lost, and win-back rate, is yours to adjust so the result reflects your firm.",
  },
  {
    q: "How is the cost of chaos calculated?",
    a: "Annual billing per person equals day rate times billable days. Multiply by the percentage of time lost to get the lost value per person, then by headcount for the firm-wide cost. The recoverable figure applies your chosen win-back rate to that total.",
  },
  {
    q: "Is the win-back rate realistic?",
    a: "It is an assumption you control. The default of 50% is deliberately conservative: no tool recovers every lost minute. Lower it for a cautious estimate or raise it to model a best case.",
  },
  {
    q: "Is the calculator free?",
    a: "Yes, it is free with no signup. Adjust the inputs as many times as you like and copy a summary of the result. To model your firm in detail, book a demo.",
  },
];

export default function RoiCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/tools/roi-calculator",
            name: "Cost of Chaos ROI Calculator | PYNGYN",
            description:
              "See what coordination overhead costs your firm every year, and how much you could win back.",
            breadcrumbId: "/tools/roi-calculator#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Tools", url: "/tools" },
              { name: "ROI Calculator", url: "/tools/roi-calculator" },
            ],
            "/tools/roi-calculator"
          ),
          faqPageSchema(FAQS, "/tools/roi-calculator"),
        ]}
      />
      <Navbar />
      <main id="main">
        {/* Light hero (dark hero reserved for home + KB per design system) */}
        <section className="wrap pb-[10px] pt-[140px] text-center">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Free tool
          </span>
          <h1 className="mx-auto mt-3 max-w-[820px] font-display text-[clamp(34px,5vw,58px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            What is project chaos costing your firm?
          </h1>
          <p className="lead mx-auto mt-5">
            Status-chasing, tool-switching, and hunting for context quietly eat billable hours.
            Put a number on it, then see how much you could win back. Free, no signup.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
            {["No signup", "USD or INR", "Built for services firms"].map((b) => (
              <span key={b} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {b}
              </span>
            ))}
          </div>
        </section>

        <div className="pt-12">
          <RoiCalculator />
        </div>

        {/* Methodology + FAQ */}
        <section className="section-tight">
          <div className="wrap max-w-[820px]">
            <span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />The method</span>
            <h2 className="title mt-3">Honest math, your inputs.</h2>
            <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-muted">
              <p>
                Most firms feel the drag of coordination but never price it. The model here is simple
                and transparent on purpose. Annual billing per person is your day rate times your
                billable days. The share of that time lost to status updates, tool-switching, and
                searching for context becomes lost value per person, and across the team it is your
                firm-wide cost of chaos.
              </p>
              <p>
                The recoverable figure is deliberately conservative. It applies a win-back rate that
                you set, because no tool reclaims every lost minute. From there the calculator compares
                the recovered value against an editable tool cost to show net annual gain, return on
                investment, and how quickly the spend pays for itself.
              </p>
              <p>
                Treat the output as a directional estimate, not a quote. The point is not a precise
                figure, it is to make a hidden cost visible so you can decide whether it is worth fixing.
                When you want to model your firm properly,{" "}
                <a href={DEMO_URL} className="font-semibold text-accent hover:text-accent-dk">
                  book a demo
                </a>
                .
              </p>
            </div>

            <div className="mt-12">
              <span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />FAQ</span>
              <h2 className="title mt-3">Questions, answered.</h2>
              <dl className="mt-6 divide-y divide-line">
                {FAQS.map((f) => (
                  <div key={f.q} className="py-5">
                    <dt className="text-[17px] font-semibold text-ink">{f.q}</dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-muted">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <ToolConversionBridge
          title="That recovered time shows up first in Workspace, then in front of your clients."
          body="Workspace is where the billable-hours drag actually gets fixed: projects, timesheets, and AI keeping status current instead of your team chasing it. Pair it with Clientspace and your clients see the improvement too, standalone or bundled with Workspace, your call."
        />

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
