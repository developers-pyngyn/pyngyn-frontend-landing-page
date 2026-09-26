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
} from "@/components/schema";

export const metadata: Metadata = {
  title: "ClientSpace Pricing for CA & Accounting Firms | Pyngyn",
  description:
    "Transparent pricing for Chartered Accountants, tax practitioners, and audit firms. Pro plan at ₹499/mo, Business plan at ₹799/mo with workload cockpit & automations, and custom Enterprise tier.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/pricing",
            name: "ClientSpace Pricing | Pyngyn",
            description:
              "ClientSpace pricing purpose-built for Chartered Accountants and accounting firms: Pro plan at ₹499/mo, Business plan at ₹799/mo, and custom Enterprise tier.",
            breadcrumbId: "/pricing#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Pricing", url: "/pricing" },
            ],
            "/pricing"
          ),
          productSchema({
            url: "/pricing",
            name: "Pyngyn ClientSpace",
            description:
              "The practice operating system for Chartered Accountants, tax practitioners, and audit firms: Pro plan at ₹499/user/month, Business plan at ₹799/user/month, and Enterprise.",
            offers: [
              {
                name: "ClientSpace Pro",
                priceMonthly: 499,
                priceCurrency: "INR",
                description:
                  "Essential client workspace, regulatory task tracking, and white-labeled client portal for boutique CA & tax firms.",
                url: "/pricing",
              },
              {
                name: "ClientSpace Business",
                priceMonthly: 799,
                priceCurrency: "INR",
                description:
                  "Complete practice operating system with Workload Cockpit, WhatsApp automations, Tally/Computax integrations, and 4-eye partner review gates.",
                url: "/pricing",
              },
              {
                name: "ClientSpace Enterprise",
                isCustom: true,
                priceCurrency: "INR",
                description:
                  "Dedicated practice migration, custom ERP integrations, enterprise SSO, and 99.9% uptime SLA for large CA partnerships.",
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
            <span>Pyngyn ClientSpace &bull; Practice-Friendly Pricing</span>
          </div>
          <h1 className="mx-auto mt-2 max-w-[840px] font-display text-[clamp(30px,4.5vw,52px)] font-bold leading-[1.12] tracking-[-0.025em] text-slate-950">
            Predictable pricing designed for CA &amp; accounting practices.
          </h1>
          <p className="lead mx-auto mt-4 max-w-[680px] text-sm sm:text-base text-slate-600">
            No per-client penalty fees. No hidden setup costs. Start on Pro for essential statutory workflows, or unlock the full Business Cockpit with automations and partner review sign-offs.
          </p>
        </section>

        {/* Pricing Matrix & Features */}
        <section className="wrap pb-20">
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
