import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/clientspace/HeroSection";
import { WorkflowShowcaseSection } from "@/components/clientspace/WorkflowShowcaseSection";
import { ProblemBeforeAfter } from "@/components/clientspace/ProblemBeforeAfter";
import { ProductTour } from "@/components/mockups/ProductTour";
import {
  IntegrationsSection,
  TrustSecuritySection,
  FinalCTASection,
} from "@/components/clientspace/DeepDiveSections";
import {
  JsonLd,
  softwareApplicationSchema,
  webPageSchema,
  faqPageSchema,
} from "@/components/schema";

export const metadata: Metadata = {
  title: "Pyngyn ClientSpace | Client Management for CA & Accounting Firms",
  description:
    "Manage clients, tasks, documents, deadlines, communication and workflows in one workspace built for modern CA and accounting firms.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Pyngyn ClientSpace | Client Management for CA & Accounting Firms",
    description:
      "Run your accounting firm from one client workspace. Manage clients, tasks, documents, deadlines and communication.",
    url: "/",
    type: "website",
  },
};

const CLIENTSPACE_FAQS: { q: string; a: string }[] = [
  {
    q: "What is Pyngyn ClientSpace?",
    a: "Pyngyn ClientSpace is a dedicated client management and practice workspace purpose-built for Chartered Accountants (CAs), accounting firms, tax teams, and compliance practices. It brings together clients, statutory tasks, engagements, documents, deadlines, and client communication into one connected operating hub.",
  },
  {
    q: "How does ClientSpace differ from generic project management tools?",
    a: "Generic project management tools (like Asana, ClickUp, or Monday) lack understanding of accounting workflows. Pyngyn ClientSpace natively supports statutory filing targets (GST, Form 3CD, TDS, ROC), 4-eye partner review gates, client sector hierarchies, branded WhatsApp intake, and friction-free magic-link client portals.",
  },
  {
    q: "Do our clients need to create an account or set a password?",
    a: "No. Clients access their white-labeled portal via secure, one-click magic links sent to their email or WhatsApp. They never have to remember passwords or submit support tickets for access.",
  },
  {
    q: "Can clients see work from our other clients, or our internal notes?",
    a: "Never. Each client workspace operates with strict multi-tenant isolation. A client sees only their own deliverables, document requests, and approved files. Internal review notes and practitioner discussions remain strictly private.",
  },
  {
    q: "Does ClientSpace work alongside our existing firm tools?",
    a: "Yes. ClientSpace connects with Google Calendar, Google Drive, Gmail, Slack, and supports 1-click Excel/CSV spreadsheet imports for your client masters and tasks, ensuring your team does not need to duplicate records or change how you work.",
  },
  {
    q: "Can we book a personalized practice walkthrough for our firm?",
    a: "Yes. We offer a 30-minute tailored practice demo where we set up a real client engagement matching your firm's specific practice area (Audit, GST, Direct Tax, or Retainer Bookkeeping).",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/",
            name: "Pyngyn ClientSpace | Client Management for CA & Accounting Firms",
            description:
              "Manage clients, tasks, documents, deadlines, communication and workflows in one workspace built for modern CA and accounting firms.",
          }),
          softwareApplicationSchema(),
          faqPageSchema(CLIENTSPACE_FAQS, "/"),
        ]}
      />
      <span id="top" />
      <Navbar />

      <main id="main">
        {/* 1. Hero Section with Interactive ClientSpace Mockup */}
        <HeroSection />

        {/* 2. Workflow Showcase: See it in action (Smooth, jitter-free lifecycle) */}
        <WorkflowShowcaseSection />

        {/* 3. Before / After Section (Busy Season Chaos vs Connected Workspace) */}
        <ProblemBeforeAfter />

        {/* 3. Interactive Product Tour & Features (7-in-1 Tabs: Clients, Tasks, Engagements, Documents, Automations, Portal, Workload) */}
        <section id="features" className="scroll-mt-20">
          <div id="tour" className="scroll-mt-20">
            <ProductTour />
          </div>
        </section>

        {/* 4. Integrations (Accounting ecosystem: Tally, Computax, QuickBooks, Drive, Calendar, WhatsApp) */}
        <IntegrationsSection />

        {/* 5. Trust, Security & Client Isolation (Bank-grade privacy) */}
        <TrustSecuritySection />

        {/* 6. Final High-Conversion CTA */}
        <FinalCTASection />
      </main>

      <Footer />
    </>
  );
}
