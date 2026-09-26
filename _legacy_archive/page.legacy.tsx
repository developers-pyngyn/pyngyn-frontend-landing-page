import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Partners } from "@/components/Partners";
import {
  Proof,
  Problem,
  Benefits,
  HowItWorks,
  Testimonials,
  Metrics,
  Compare,
  Security,
  Pricing,
} from "@/components/Sections";
import { FAQ, FinalCTA, Footer } from "@/components/Footer";
import { IndustrySolutions } from "@/components/IndustrySolutions";
import { Connections } from "@/components/Connections";
import { VideoTestimonials } from "@/components/VideoTestimonials";
import { ProductShowcase } from "@/components/ProductShowcase";
import { SpacesExplainer } from "@/components/SpacesExplainer";
import { OldWayNewWay } from "@/components/OldWayNewWay";
import type { Metadata } from "next";
import {
  JsonLd,
  softwareApplicationSchema,
  webPageSchema,
  faqPageSchema,
} from "@/components/schema";

// Title/description are inherited from the root layout; this page only needs
// to declare its self-referencing canonical URL.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const HOME_FAQS: { q: string; a: string }[] = [
  {
    q: "What happens in the demo?",
    a: "A 30-minute guided walkthrough where we run PYNGYN on an engagement like yours, with no generic slideshow.",
  },
  {
    q: "Do I have to trust the AI's plan?",
    a: "No. Every plan is fully editable. PYNGYN drafts; you decide.",
  },
  {
    q: "Can I import from my current tool?",
    a: "Yes. One-click import from common trackers, with mapping handled for you.",
  },
  {
    q: "Is my data used to train AI?",
    a: "Not without your explicit consent. Your data stays yours.",
  },
  {
    q: "Can I just try it instead of booking a demo?",
    a: "Absolutely. Start a free trial with no credit card required, Client Space is $19 per client/month standalone, Workspace is $9 per seat/month, or bundle both for $24.99/month.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/",
            name: "PYNGYN: The operating system for professional-services firms",
            description:
              "PYNGYN gives every client a branded Client Space (a standalone portal for status, documents, and approvals), with Workspace, your firm's back office for projects, finances, and billable time, available on its own or bundled together.",
          }),
          softwareApplicationSchema(),
          faqPageSchema(HOME_FAQS, "/"),
        ]}
      />
      <span id="top" />
      <Navbar />
      <main id="main">
        <Hero />
        <Partners />
        <Proof />
        <Problem />
        <SpacesExplainer />
        <Benefits />
        <HowItWorks />
        <IndustrySolutions />
        <ProductShowcase />
        <OldWayNewWay />
        <VideoTestimonials />
        <Testimonials />
        <Metrics />
        <Compare />
        <Connections />
        <Security />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
