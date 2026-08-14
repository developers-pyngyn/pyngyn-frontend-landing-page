import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Pricing, Compare, Security } from "@/components/Sections";
import { FAQ, FinalCTA, Footer } from "@/components/Footer";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { DEMO_URL } from "@/components/config";
import { ACTIVE_STAGE, PRICING, getPricing } from "@/lib/pricing/config";
import {
  JsonLd,
  breadcrumbSchema,
  productSchema,
  webPageSchema,
} from "@/components/schema";

// Statically prerendered. This page used to detect the visitor's currency
// server-side (runtime="edge" + force-dynamic), but under the OpenNext
// Cloudflare adapter that runs the whole app in one Worker, per-request page
// rendering pushes the Worker past its CPU/memory limit ("Worker exceeded the
// resource limit"). Keeping every page static serves them as assets instead;
// the pricing tables localise currency client-side (see PricingTiers). JSON-LD
// stays in USD on purpose — the canonical price search engines index.
export const metadata: Metadata = {
  title: "Pricing | PYNGYN",
  description:
    "Clientspace, Workspace, Full Bundle, and Enterprise plans, priced per seat in your local currency with unlimited free client access. Book a demo when you're evaluating for your firm.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  // Structured data stays in USD on purpose — that's the canonical price search
  // engines index, not what a given visitor sees. The figures still come from
  // the config so they can never drift from the on-page tables.
  const usd = getPricing("US", ACTIVE_STAGE);
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/pricing",
            name: "Pricing | PYNGYN",
            description:
              "Clientspace and Workspace are sold per seat, on their own or bundled, priced in your local currency.",
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
            name: "PYNGYN",
            description:
              "The operating system for professional-services firms: a standalone Clientspace plan, a standalone Workspace plan, a Full Bundle, and Enterprise.",
            offers: [
              {
                name: "Clientspace",
                priceMonthly: usd.clientspace.monthly,
                priceCurrency: PRICING.US.currency,
                description:
                  "A branded client portal, sold per seat with unlimited free client access: client-visible tasks, deliverables, status, approvals, and the client role. No Workspace required.",
                url: "/pricing",
              },
              {
                name: "Workspace",
                priceMonthly: usd.workspace.monthly,
                priceCurrency: PRICING.US.currency,
                description:
                  "The firm's operating system, per internal seat: projects, finances, billable timesheets, team skills, and 240+ workflow templates.",
                url: "/pricing",
              },
              {
                name: "Full Bundle",
                priceMonthly: usd.bundle.monthly,
                priceCurrency: PRICING.US.currency,
                description:
                  "Workspace and Clientspace together at a bundled rate, lower than buying each separately.",
                url: "/pricing",
              },
              {
                name: "Enterprise",
                isCustom: true,
                priceCurrency: PRICING.US.currency,
                description:
                  "Unlimited seats, SSO/SAML, RBAC, audit log, data residency, custom fields, API and webhooks, and dedicated onboarding and support.",
                url: "/pricing",
              },
            ],
          }),
        ]}
      />
      <Navbar />
      <main id="main">
        <section className="wrap pb-[10px] pt-[150px] text-center">
          <span className="eyebrow">Pricing</span>
          <h1 className="mx-auto mt-3 max-w-[760px] font-display text-[clamp(34px,4.8vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            Pricing that scales with your firm.
          </h1>
          <p className="lead mx-auto mt-4">
            Buy Clientspace on its own, Workspace on its own, or bundle both for less. Book
            a demo when you&apos;re evaluating for your firm.
          </p>
        </section>
        <Pricing showHeader={false} />
        <Compare />
        <Security />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <ExitIntentModal
        ctaHref={DEMO_URL}
        ctaLabel="Book a 30-min walkthrough"
        eyebrow="Questions before you go?"
        title="Not sure which plan fits your firm?"
        body="A quick 30-minute walkthrough, we'll map Client Space and Workspace pricing to your actual seat and client count, no obligation."
        dismissLabel="No thanks, I'll keep browsing"
      />
    </>
  );
}
