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
    "Simple team-size pricing for CA and accounting firms: every core feature on every plan, from $49/month for up to 5 users to $999/month for 100. 7-day free trial, no credit card.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pyngyn Pricing | Plans from $49/month for 5 Users",
    description:
      "Simple team-size pricing for CA and accounting firms: every core feature on every plan, from $49/month for up to 5 users to $999/month for 100. 7-day free trial, no credit card.",
    url: "/pricing",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pyngyn Pricing | Plans from $49/month for 5 Users",
    description:
      "Every core feature on every plan, from $49/month for up to 5 users. 7-day free trial, no credit card.",
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
              "The practice operating system for Chartered Accountants, tax practitioners, and audit firms. One plan with every core feature, priced by team size; Workload Cockpit and CRM on the Enterprise plan.",
            offers: [
              ...PRICING_TIERS.map((t) => ({
                name: `Pyngyn ClientSpace, up to ${t.users} users`,
                priceMonthly: t.monthly,
                users: t.users,
                description: `Every core ClientSpace feature for a team of up to ${t.users} users, billed monthly.`,
                url: "/pricing",
              })),
              {
                name: `Pyngyn ClientSpace, more than ${ENTERPRISE_FROM_USERS} users`,
                isCustom: true,
                description: "Custom plan for large partnerships and multi-branch firms, including the Workload Cockpit and CRM.",
                url: "/pricing",
              },
            ],
          }),
        ]}
      />
      <Navbar />
      <main id="main">
        {/* Pricing Matrix & Features */}
        <section className="w-full bg-[#f5f8ff] pb-20 pt-[120px] sm:pt-[140px]">
          <ClientSpacePricing headingLevel="h1" />
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
