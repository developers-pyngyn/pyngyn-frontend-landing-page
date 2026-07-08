import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { TeamUtilizationCalculator } from "@/components/TeamUtilizationCalculator";
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
  title: "Team Utilization Calculator | PYNGYN",
  description:
    "Work out billable utilization across your bench, see what your current rate is worth, and find the revenue upside of hitting your target. Free, no signup. Built for professional-services teams.",
  alternates: { canonical: "/tools/team-utilization" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Team Utilization Calculator | PYNGYN",
    description:
      "Measure billable utilization across your team and spot where capacity is being lost. Free, no signup.",
    type: "website",
    url: "/tools/team-utilization",
  },
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "What does the team utilization calculator measure?",
    a: "It estimates billable utilization for a services team: the share of your people's working capacity that is billed to clients. It then shows what that utilization is worth in revenue, and the upside of reaching the target you set.",
  },
  {
    q: "How is utilization calculated?",
    a: "Capacity per person is hours per week times working weeks per year, after PTO and holidays. Current utilization is the share of that capacity billed to clients. Multiply capacity by utilization and by your billable rate to get revenue, then compare current and target to find the gap.",
  },
  {
    q: "What is a good utilization target?",
    a: "It varies by firm and role. For client-facing consultants, 70 to 80% is a common healthy range; the rest goes to sales, internal work, learning, and rest. Senior and leadership roles usually carry lower billable targets. Set the target to match how your firm actually runs.",
  },
  {
    q: "What does the consultant-equivalent figure mean?",
    a: "It converts the gap to your target into whole people. If the firm-wide shortfall equals two consultants' worth of annual capacity, you are effectively employing two billable people you are not yet billing. It is a quick way to feel the size of the gap.",
  },
  {
    q: "Should I aim for 100% utilization?",
    a: "No. Full utilization leaves no room for business development, internal projects, training, or recovery, and it tends to drive burnout and attrition. The calculator deliberately compares against a target you choose, not against 100%.",
  },
  {
    q: "Is the calculator free?",
    a: "Yes, it is free with no signup. Adjust the inputs as many times as you like and copy a summary of the result. To model your firm in detail, book a demo.",
  },
];

export default function TeamUtilizationPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/tools/team-utilization",
            name: "Team Utilization Calculator | PYNGYN",
            description:
              "Measure billable utilization across your bench and find the revenue upside of hitting target.",
            breadcrumbId: "/tools/team-utilization#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Tools", url: "/tools" },
              { name: "Team Utilization Calculator", url: "/tools/team-utilization" },
            ],
            "/tools/team-utilization"
          ),
          faqPageSchema(FAQS, "/tools/team-utilization"),
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
            How much of your team is actually billing?
          </h1>
          <p className="lead mx-auto mt-5">
            Bench time, half-staffed projects, and unevenly loaded consultants quietly cap revenue.
            Measure your billable utilization, then see what hitting target is worth. Free, no signup.
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
          <TeamUtilizationCalculator />
        </div>

        {/* Methodology + FAQ */}
        <section className="section-tight">
          <div className="wrap max-w-[820px]">
            <span className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              The method
            </span>
            <h2 className="title mt-3">Honest math, your inputs.</h2>
            <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-muted">
              <p>
                Utilization is the simplest read on whether a services team is loaded well. The model
                here is deliberately transparent. Capacity per person is your working hours per week
                times your working weeks per year, after holidays and time off. Current utilization is
                the share of that capacity billed to clients, and multiplying by your rate turns hours
                into revenue.
              </p>
              <p>
                The opportunity is measured against a target you set, not against a theoretical 100%.
                Full utilization is neither realistic nor healthy, since people also sell, learn, run
                internal work, and rest. The gap between current and target, priced at your rate, is the
                revenue you could win back by loading the bench more evenly, and it is also expressed as
                whole consultants of capacity so the size is easy to feel.
              </p>
              <p>
                Treat the output as a directional estimate, not a quote. Averages hide a lot: two people
                at 90% and two at 30% read the same as four at 60%. The point is to make hidden idle
                capacity visible so you can decide whether it is worth addressing. When you want to model
                your firm properly,{" "}
                <a href={DEMO_URL} className="font-semibold text-accent hover:text-accent-dk">
                  book a demo
                </a>
                .
              </p>
            </div>

            <div className="mt-12">
              <span className="eyebrow">
                <span className="eyebrow-dot" aria-hidden="true" />
                FAQ
              </span>
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
          title="See utilization live, per person, per engagement, in Workspace."
          body="This calculator works from averages you enter by hand. Workspace tracks billable time per person and per engagement automatically, so the idle bench and the overloaded one both show up before quarter-end, not after."
        />

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
