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
} from "@/components/schema";

export const metadata: Metadata = {
  title: "Benefits | PYNGYN",
  description:
    "AI planning, auto status, and risk detection. See how PYNGYN turns plain-language goals into a living plan.",
  alternates: { canonical: "/benefits" },
};

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
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
