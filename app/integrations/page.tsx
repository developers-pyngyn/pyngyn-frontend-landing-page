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
  title: "Pyngyn Integrations | Gmail, Google Drive, Razorpay, Zoho Books & Tally",
  description:
    "Connect Pyngyn ClientSpace with Gmail, Google Calendar, Google Drive, Razorpay, Zoho Books and Tally Prime to automate document collection, payments and practice workflows.",
  alternates: { canonical: "/integrations" },
  openGraph: {
    title: "Pyngyn Integrations | Gmail, Google Drive, Razorpay, Zoho Books & Tally",
    description:
      "Connect Pyngyn ClientSpace with Gmail, Google Calendar, Google Drive, Razorpay, Zoho Books and Tally Prime to automate document collection, payments and practice workflows.",
    url: "/integrations",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pyngyn Integrations | Gmail, Google Drive, Razorpay, Zoho Books & Tally",
    description:
      "Connect Pyngyn ClientSpace with Gmail, Google Calendar, Google Drive, Razorpay, Zoho Books and Tally Prime.",
    images: [OG_IMAGE.url],
  },
};

const INTEGRATION_FAQS = [
  {
    q: "Which tools integrate with PYNGYN today?",
    a: "PYNGYN integrates with Gmail, Google Calendar and Google Drive for email, deadlines and client files, Razorpay for fee collection, and Zoho Books and Tally Prime for invoices, ledgers and vouchers. More integrations are on the way.",
  },
  {
    q: "How does data synchronize from external tools to the client portal?",
    a: "Data syncs automatically through secure connectors. When a client pays through Razorpay, an invoice is raised in Zoho Books, or a deliverable status updates in Pyngyn, the client's branded ClientSpace portal reflects the change without manual re-entry.",
  },
  {
    q: "Do we need engineering or IT staff to connect our tools?",
    a: "No. Integrations connect with a standard sign-in in a couple of minutes. Our team provides complimentary setup assistance during your initial onboarding to ensure your email, calendars, cloud storage and accounting software are mapped properly.",
  },
  {
    q: "Will you add more integrations?",
    a: "Yes. We add integrations as they are ready. Tell us which tools your firm uses and we will let you know when they arrive.",
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
            Connect ClientSpace to Gmail, Google Calendar, Google Drive, Razorpay, Zoho Books and
            Tally Prime. Emails, deadlines, files, payments and invoices flow in automatically, and
            the result shows up live in your clients&apos; ClientSpace, no manual updates required.
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
                A Razorpay payment, a synced Zoho Books invoice, a file added in Google Drive — all
                of it lands in PYNGYN ClientSpace. From there it surfaces automatically in the
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
