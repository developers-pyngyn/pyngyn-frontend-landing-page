import type { Metadata } from "next";
import { headers } from "next/headers";
import { Navbar } from "@/components/Navbar";
import { Pricing, Compare, Security } from "@/components/Sections";
import { FAQ, FinalCTA, Footer } from "@/components/Footer";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { DEMO_URL } from "@/components/config";
import { resolveRegion } from "@/components/regionPricing";
import {
  JsonLd,
  breadcrumbSchema,
  productSchema,
  webPageSchema,
} from "@/components/schema";

// Cloudflare stamps `CF-IPCountry` on every request that hits its edge —
// reading it via headers() is what makes this page IP-aware, and it's also
// what forces this route out of static prerendering (it must be resolved
// per-request, not once at build time). `runtime = "edge"` is required for
// any dynamic route under @cloudflare/next-on-pages. Structured data (JSON-LD
// below) intentionally stays in USD regardless of visitor region — that's
// the canonical price search engines index, not what a given visitor sees.
export const runtime = "edge";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pricing | PYNGYN",
  description:
    "Client Space, Workspace, Combined Bundle, and Enterprise plans. Client Space is $19 per client / month, standalone. Workspace is $9 per seat / month. Bundle both for $24.99/mo. Book a demo when you're evaluating for your firm.",
  alternates: { canonical: "/pricing" },
};

export default async function PricingPage() {
  const headersList = await headers();
  const region = resolveRegion(headersList.get("cf-ipcountry"));
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/pricing",
            name: "Pricing | PYNGYN",
            description:
              "Client Space is $19 per client/month, standalone. Workspace is $9 per seat/month. Bundle both for $24.99/mo.",
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
              "The operating system for professional-services firms: a standalone Client Space plan, a standalone Workspace plan, a Combined Bundle, and Enterprise.",
            offers: [
              {
                name: "Client Space",
                priceMonthly: 19,
                priceCurrency: "USD",
                description:
                  "A branded client portal, sold standalone per client: client-visible tasks, deliverables, status, approvals, and the client role. No Workspace required.",
                url: "/pricing",
              },
              {
                name: "Workspace",
                priceMonthly: 9,
                priceCurrency: "USD",
                description:
                  "The firm's operating system, per internal seat: projects, finances, billable timesheets, Business Brain AI, automations, team skills, and 240+ templates.",
                url: "/pricing",
              },
              {
                name: "Combined Bundle",
                priceMonthly: 24.99,
                priceCurrency: "USD",
                description:
                  "Workspace and Client Space together at a bundled rate, lower than buying each separately.",
                url: "/pricing",
              },
              {
                name: "Enterprise",
                isCustom: true,
                priceCurrency: "USD",
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
            Buy Client Space on its own, Workspace on its own, or bundle both for less. Book
            a demo when you&apos;re evaluating for your firm.
          </p>
        </section>
        <Pricing showHeader={false} region={region} />
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
