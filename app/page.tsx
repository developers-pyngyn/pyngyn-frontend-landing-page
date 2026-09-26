import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/clientspace/HeroSection";
import { PersonaShowcaseSection } from "@/components/clientspace/PersonaShowcaseSection";
import { WorkflowShowcaseSection } from "@/components/clientspace/WorkflowShowcaseSection";
import { FeatureGridSection } from "@/components/clientspace/FeatureGridSection";
import { ProblemBeforeAfter } from "@/components/clientspace/ProblemBeforeAfter";
import { ProductTour } from "@/components/mockups/ProductTour";
import {
  ClientManagementSection,
  TaskManagementSection,
  EngagementSection,
  ClientPortalSection,
  CommunicationSection,
  AutomationsSection,
  WorkloadSection,
  DashboardSection,
  IntegrationsSection,
  UseCasesSection,
  TrustSecuritySection,
  FinalCTASection,
} from "@/components/clientspace/DeepDiveSections";
import { PyngynAiSection } from "@/components/clientspace/PyngynAiSection";
import { InteractiveMascotCompanion } from "@/components/clientspace/InteractiveMascotCompanion";
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
    q: "Does ClientSpace integrate with our existing accounting software?",
    a: "Yes. ClientSpace connects with Tally, Computax, Zoho Books, QuickBooks, Google Calendar, and Slack, ensuring your team does not need to duplicate client records or change core ledger software.",
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
        {/* 1. Hero Section with Interactive ClientSpace Mockup & Pyng Companion */}
        <HeroSection />

        {/* 2. Persona Showcase: Built for every role in your firm */}
        <PersonaShowcaseSection />

        {/* 3. Workflow Showcase: See it in action */}
        <WorkflowShowcaseSection />

        {/* 4. Supporting Feature Grid: 2x2 Cropped Real Product Screens */}
        <FeatureGridSection />

        {/* 5. Before / After Section (Busy Season Chaos vs Connected Workspace) */}
        <ProblemBeforeAfter />

        {/* 3. Interactive Product Tour (Clients, Tasks, Engagements, Documents, Automations, Portal, Workload) */}
        <div id="tour">
          <ProductTour />
        </div>

        {/* 4. Client Management (Know every client. At a glance.) */}
        <ClientManagementSection />

        {/* 5. Task Management (Keep every piece of client work moving.) */}
        <TaskManagementSection />

        {/* 6. Engagement Management (From engagement letter to sign-off.) */}
        <EngagementSection />

        {/* 7. Client Portal (Give clients one place to work with your firm.) */}
        <ClientPortalSection />

        {/* 8. Communication & Intake (WhatsApp, Email & AI in one thread) */}
        <CommunicationSection />

        {/* 9. Automations (Let routine work run itself.) */}
        <AutomationsSection />

        {/* 10. Workload Management (See who has capacity before work gets assigned.) */}
        <WorkloadSection />

        {/* 11. PYNGYN AI (Ask PYNGYN. Get the answer from your firm's work.) */}
        <PyngynAiSection />

        {/* 12. Dashboard & Compliance Radar (Statutory command & KPIs) */}
        <DashboardSection />

        {/* 12. Integrations (Accounting ecosystem) */}
        <IntegrationsSection />

        {/* 13. Use Cases (For CA firms, Tax practices, Audit teams, Bookkeepers) */}
        <UseCasesSection />

        {/* 14. Trust, Security & Client Isolation (Bank-grade privacy) */}
        <TrustSecuritySection />

        {/* 15. Final High-Conversion CTA */}
        <FinalCTASection />
      </main>

      {/* Persistent Interactive Mascot Companion with Live Scroll Tracking */}
      <InteractiveMascotCompanion />

      <Footer />
    </>
  );
}
