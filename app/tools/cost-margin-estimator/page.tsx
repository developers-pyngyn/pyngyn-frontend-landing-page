import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { CostMarginEstimator } from "@/components/CostMarginEstimator";
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
  title: "Project Cost & Margin Estimator | PYNGYN",
  description:
    "Estimate effort, blended rate, and gross margin for a fixed-fee engagement before you send the proposal. See your breakeven fee and how scope creep erodes margin. Free, no signup.",
  alternates: { canonical: "/tools/cost-margin-estimator" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Project Cost & Margin Estimator | PYNGYN",
    description:
      "Price a fixed-fee engagement with confidence. Estimate cost to deliver, blended rate, gross margin, and breakeven fee. Free, no signup.",
    type: "website",
    url: "/tools/cost-margin-estimator",
  },
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "What does the cost and margin estimator do?",
    a: "It estimates the cost to deliver a fixed-fee engagement from the hours and cost rates of each role, adds any overhead and pass-through costs, and compares the total to your quoted fee. It returns gross margin in money and percent, your blended bill rate, and the breakeven fee.",
  },
  {
    q: "What is the difference between cost rate and bill rate?",
    a: "Cost rate is what a person costs your firm per hour, fully loaded. Bill rate is what you would charge a client per hour on time and materials. Margin lives in the gap between them, and the tool also shows how much your fixed fee discounts off the same work priced at bill rates.",
  },
  {
    q: "How is gross margin calculated?",
    a: "Labor cost is each role's hours times its cost rate, summed. Add optional overhead on labor and any other costs to get the cost to deliver. Gross margin is the quoted fee minus that cost, and the percentage is margin divided by fee.",
  },
  {
    q: "What is the breakeven fee?",
    a: "It is the fee at which margin is zero, equal to the total cost to deliver. Quoting below it means the engagement loses money before you have done any work. It is a useful floor when you are negotiating.",
  },
  {
    q: "Why does the effort overrun slider matter?",
    a: "Fixed-fee work carries the risk of scope creep. If the team spends more hours than planned, the extra cost comes straight out of your margin. The slider shows how quickly margin erodes, which is the single biggest reason fixed-fee projects underperform.",
  },
  {
    q: "Is the estimator free?",
    a: "Yes, it is free with no signup. Add as many roles as you like, adjust every rate, and copy a summary of the result. To track effort against the estimate once the work starts, book a demo.",
  },
];

export default function CostMarginEstimatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/tools/cost-margin-estimator",
            name: "Project Cost & Margin Estimator | PYNGYN",
            description:
              "Estimate cost to deliver, blended rate, and gross margin for a fixed-fee engagement before you quote.",
            breadcrumbId: "/tools/cost-margin-estimator#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Tools", url: "/tools" },
              { name: "Project Cost & Margin Estimator", url: "/tools/cost-margin-estimator" },
            ],
            "/tools/cost-margin-estimator"
          ),
          faqPageSchema(FAQS, "/tools/cost-margin-estimator"),
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
            Will this fixed fee actually make money?
          </h1>
          <p className="lead mx-auto mt-5">
            Lay out the team, the rates, and the fee, and see your cost to deliver, blended rate, and
            gross margin before the proposal goes out. Free, no signup.
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
          <CostMarginEstimator />
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
                Most fixed-fee proposals are priced on instinct, then the margin is discovered after
                delivery. The model here is deliberately transparent. For each role you estimate the
                hours and a cost rate, and the sum is your labor cost. Add an optional overhead uplift
                if your cost rates are not already fully loaded, plus any pass-through costs like
                travel or subcontractors, and you have the true cost to deliver.
              </p>
              <p>
                Gross margin is simply the quoted fee minus that cost. The tool also turns the fee into
                a blended bill rate so you can sanity-check it against your usual rates, and it shows
                how far the fixed fee sits below the same work priced on time and materials. The
                breakeven fee, the point where margin reaches zero, is the floor you should never quote
                beneath.
              </p>
              <p>
                The overrun slider is the part worth watching. Fixed-fee margin rarely dies at pricing;
                it dies in delivery, when the work takes more hours than planned. Treat the output as a
                directional estimate, not a quote, and use it to price with your eyes open. When you
                want to track real effort against the estimate,{" "}
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
          title="Stop estimating overrun after the fact. Workspace tracks it live."
          body="Workspace logs billable vs. non-billable time against the plan as work happens, so margin erosion shows up while there's still time to act, not at invoicing. Pair it with Clientspace to share progress with the client without exposing your internal margin."
        />

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
