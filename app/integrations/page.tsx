import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { IntegrationsDirectory } from "@/components/IntegrationsDirectory";
import { INTEGRATIONS } from "@/components/integrations-data";
import {
  JsonLd,
  breadcrumbSchema,
  itemListSchema,
  webPageSchema,
} from "@/components/schema";

export const metadata: Metadata = {
  title: "Integrations | PYNGYN",
  description:
    "Connect Workspace with the tools your team uses every day, from chat and email to accounting and e-signature, so the result shows up in your clients' Clientspace automatically.",
  alternates: { canonical: "/integrations" },
};

export default function IntegrationsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/integrations",
            name: "Integrations | PYNGYN",
            description:
              "Connect Workspace with the tools your team uses every day, so status stays current in your clients' Clientspace automatically.",
            breadcrumbId: "/integrations#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Integrations", url: "/integrations" },
            ],
            "/integrations"
          ),
          itemListSchema({
            url: "/integrations",
            name: "PYNGYN integrations",
            items: INTEGRATIONS.map((i) => ({
              name: i.name,
              description: i.description,
              url: "/integrations",
            })),
          }),
        ]}
      />
      <Navbar />
      <main id="main">
        <section className="wrap pb-[10px] pt-[150px] text-center">
          <span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />Integrations</span>
          <h1 className="mx-auto mt-3 max-w-[760px] font-display text-[clamp(34px,4.8vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            Your favorite tools, feeding one place your clients can see.
          </h1>
          <p className="lead mx-auto mt-5">
            Connect Workspace to QuickBooks, Xero, DocuSign, Slack, and the other tools your
            firm already runs on. Plans, status, and approvals flow in automatically, and the
            result shows up live in your clients&apos; Clientspace, no manual updates required.
          </p>
        </section>
        <IntegrationsDirectory />

        <section className="section-tight">
          <div className="wrap max-w-[820px]">
            <div className="rounded-[22px] border border-accent/30 bg-accent-lt px-7 py-9 sm:px-9">
              <span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />How it fits together</span>
              <h2 className="mt-3 font-display text-[22px] font-semibold leading-snug tracking-[-0.01em] sm:text-[26px]">
                Integrations feed Workspace. Workspace feeds Clientspace.
              </h2>
              <p className="mt-3 max-w-[640px] text-[15px] leading-relaxed text-muted">
                A signed DocuSign envelope, a synced QuickBooks invoice, a Slack update, all of
                it lands in Workspace first. From there it surfaces automatically in the
                specific client&apos;s Clientspace, standalone or bundled, so nobody on your team
                has to re-type a status update just because the source system changed.
              </p>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
