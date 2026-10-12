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
  faqPageSchema,
  OG_IMAGE,
} from "@/components/schema";
import { FaqSection } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "Pyngyn Integrations | Tally, Zoho, Drive, WhatsApp & More",
  description:
    "Connect Pyngyn ClientSpace with Tally, Computax, Zoho Books, QuickBooks, Google Drive, WhatsApp, and Slack to automate document collection and practice workflows.",
  alternates: { canonical: "/integrations" },
  openGraph: {
    title: "Pyngyn Integrations | Tally, Zoho, Drive, WhatsApp & More",
    description:
      "Connect Pyngyn ClientSpace with Tally, Computax, Zoho Books, QuickBooks, Google Drive, WhatsApp, and Slack to automate document collection and practice workflows.",
    url: "/integrations",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pyngyn Integrations | Tally, Zoho, Drive, WhatsApp & More",
    description:
      "Connect Pyngyn ClientSpace with Tally Prime, Zoho Books, Computax, QuickBooks, and Google Drive.",
    images: [OG_IMAGE.url],
  },
};

const INTEGRATION_FAQS = [
  {
    q: "Which accounting and practice software integrate with PYNGYN?",
    a: "PYNGYN integrates with Tally Prime, Zoho Books, Computax, QuickBooks, and Xero for ledger and invoice sync. It also connects with communication and cloud suites including Slack, Microsoft Teams, Gmail, Google Calendar, Google Drive, and DocuSign for end-to-end client collaboration.",
  },
  {
    q: "How does data synchronize from external tools to the client portal?",
    a: "Data syncs automatically via secure webhooks and API connectors. When an invoice is generated in QuickBooks, a document is signed in DocuSign, or a deliverable status updates in Pyngyn, the client's branded ClientSpace portal reflects the change in real time without manual re-entry.",
  },
  {
    q: "Do we need engineering or IT staff to connect our tools?",
    a: "No. Standard integrations connect in under two minutes with standard OAuth authentication. Our team provides complimentary setup assistance during your initial onboarding to ensure your cloud storage, calendars, and accounting software are mapped properly.",
  },
  {
    q: "Can we build custom workflows using Zapier, Make, or n8n?",
    a: "Yes. PYNGYN offers native webhook endpoints and connects seamlessly to Zapier, Make, and n8n. You can trigger automated notifications, intake workflows, or status syncs across more than 5,000 third-party business applications.",
  },
  {
    q: "Is data transferred through integrations encrypted and secure?",
    a: "Yes. All data transferred via integrations is protected by TLS 1.3 in transit and AES-256 encryption at rest. PYNGYN enforces strict tenant isolation, ensuring synchronized client data never leaks to unauthorized users or external clients.",
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/integrations",
            name: "Integrations | PYNGYN",
            description:
              "Connect ClientSpace with the tools your team uses every day, so status stays current in your clients' portal automatically.",
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
          faqPageSchema(INTEGRATION_FAQS, "/integrations"),
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
            Connect ClientSpace to QuickBooks, Xero, DocuSign, Slack, and the other tools your
            firm already runs on. Plans, status, and approvals flow in automatically, and the
            result shows up live in your clients&apos; ClientSpace, no manual updates required.
          </p>
        </section>
        <IntegrationsDirectory />

        <section className="section-tight">
          <div className="wrap max-w-[820px]">
            <div className="rounded-[22px] border border-accent/30 bg-accent-lt px-7 py-9 sm:px-9">
              <span className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />How it fits together</span>
              <h2 className="mt-3 font-display text-[22px] font-semibold leading-snug tracking-[-0.01em] sm:text-[26px]">
                Integrations feed your workflow. ClientSpace keeps clients informed.
              </h2>
              <p className="mt-3 max-w-[640px] text-[15px] leading-relaxed text-muted">
                A signed DocuSign envelope, a synced QuickBooks invoice, a Slack update — all of
                it lands in PYNGYN ClientSpace. From there it surfaces automatically in the
                specific client&apos;s portal, so nobody on your team
                has to re-type a status update just because the source system changed.
              </p>
            </div>
          </div>
        </section>

        <FaqSection
          eyebrow="Integration FAQ"
          title="Frequently asked questions about integrations."
          description="Everything you need to know about syncing your accounting tools, communications, and custom workflows with PYNGYN."
          faqs={INTEGRATION_FAQS}
        />

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
