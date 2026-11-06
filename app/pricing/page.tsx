import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Security } from "@/components/Sections";
import { FinalCTA, Footer } from "@/components/Footer";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { DEMO_URL } from "@/components/config";
import { ClientSpacePricing } from "@/components/clientspace/ClientSpacePricing";
import {
  JsonLd,
  breadcrumbSchema,
  productSchema,
  webPageSchema,
  faqPageSchema,
  OG_IMAGE,
} from "@/components/schema";
import { PRICING_FAQS, PRICING_TIERS, ENTERPRISE_FROM_USERS } from "@/components/clientspace-pricing-data";

export const metadata: Metadata = {
  title: "Pyngyn Pricing | Plans from $49/month for 5 Users",
  description:
    "Simple team-size pricing for CA and accounting firms: every feature on every plan, from $49/month for up to 5 users to $999/month for 100. 7-day free trial, no credit card.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pyngyn Pricing | Plans from $49/month for 5 Users",
    description:
      "Simple team-size pricing for CA and accounting firms: every feature on every plan, from $49/month for up to 5 users to $999/month for 100. 7-day free trial, no credit card.",
    url: "/pricing",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pyngyn Pricing | Plans from $49/month for 5 Users",
    description:
      "Every feature on every plan, from $49/month for up to 5 users. 7-day free trial, no credit card.",
    images: [OG_IMAGE.url],
  },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/pricing",
            name: "Pyngyn Practice Pricing",
            description:
              "Team-size pricing for Chartered Accountants and accounting firms, from $49/month for up to 5 users.",
            breadcrumbId: "/pricing#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Pricing", url: "/pricing" },
            ],
            "/pricing"
          ),
          faqPageSchema(PRICING_FAQS, "/pricing"),
          productSchema({
            url: "/pricing",
            name: "Pyngyn ClientSpace",
            description:
              "The practice operating system for Chartered Accountants, tax practitioners, and audit firms. One plan with every feature, priced by team size.",
            offers: [
              ...PRICING_TIERS.map((t) => ({
                name: `Pyngyn ClientSpace, up to ${t.users} users`,
                priceMonthly: t.monthly,
                users: t.users,
                description: `Every ClientSpace feature for a team of up to ${t.users} users, billed monthly.`,
                url: "/pricing",
              })),
              {
                name: `Pyngyn ClientSpace, more than ${ENTERPRISE_FROM_USERS} users`,
                isCustom: true,
                description: "Custom plan for large partnerships and multi-branch firms.",
                url: "/pricing",
              },
            ],
          }),
        ]}
      />
      <Navbar />
      <main id="main">
        {/* Page Hero Header */}
        <section className="wrap pb-[30px] pt-[130px] sm:pt-[150px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#14223d]/20 bg-[#f0f4fa] px-3.5 py-1 text-[12px] font-semibold text-[#14223d] shadow-2xs mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#14223d] animate-pulse" />
            <span>Pyngyn Practice Pricing &bull; Predictable Plans</span>
          </div>
          <h1 className="mx-auto mt-2 max-w-[840px] font-display text-[clamp(30px,4.5vw,52px)] font-bold leading-[1.12] tracking-[-0.025em] text-slate-950">
            Predictable pricing designed for CA &amp; accounting practices.
          </h1>
          <p className="lead mx-auto mt-4 max-w-[680px] text-sm sm:text-base text-slate-600">
            One plan with every feature, priced by team size. No per-client fees, no hidden setup costs, and unlimited client portal guests.
          </p>
        </section>

        {/* Pricing Matrix & Features */}
        <section className="w-full pb-20">
          <ClientSpacePricing />
        </section>

        {/* Security & Compliance Certifications */}
        <Security />

        {/* Final Call to Action */}
        <FinalCTA />
      </main>
      <Footer />
      <ExitIntentModal
        ctaHref={DEMO_URL}
        ctaLabel="Book a 30-min CA practice walkthrough"
        eyebrow="Questions before you choose?"
        title="Need guidance choosing the right plan for your firm?"
        body="Join a 30-minute practice consultation with our team. We'll review your active client roster, team size, and compliance workflows to suggest the right tier."
        dismissLabel="No thanks, I'll explore plans on my own"
      />
    </>
  );
}
