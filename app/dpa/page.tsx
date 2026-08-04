import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Data Processing Agreement | PYNGYN",
  description: "The Data Processing Agreement between Pyngyn (Data Processor) and Customer (Data Controller).",
  alternates: { canonical: "/dpa" },
};

export default function DPAPage() {
  return (
    <LegalPage
      url="/dpa"
      title="Data Processing Agreement"
      updated="June 24, 2026"
      readAlongside="For an executable copy, please reach out to **[vivek.pandey@pyngyn.com](mailto:vivek.pandey@pyngyn.com)**."
      intro="This Data Processing Agreement (“DPA”) is entered into by and between Pyngyn (“Data Processor” or “Pyngyn”) and the entity agreeing to these terms (“Data Controller” or “Customer”). This DPA forms part of the underlying agreement between the parties and reflects the parties' agreement with regard to the processing of Personal Data."
      sections={[
        {
          heading: "Definitions",
          blocks: [
            {
              type: "list",
              items: [
                "**“Personal Data”**: Any information relating to an identified or identifiable natural person as defined by applicable data protection laws, including the General Data Protection Regulation (GDPR).",
                "**“Data Controller”**: The entity that determines the purposes and means of the processing of Personal Data.",
                "**“Data Processor”**: The entity that processes Personal Data on behalf of the Data Controller (Pyngyn).",
                "**“Subprocessor”**: Any third party appointed by Pyngyn to process Personal Data on its behalf.",
                "**“Services”**: The Pyngyn marketing website, free AI tools, demo booking functionality, and the Pyngyn SaaS application located at app.pyngyn.ai.",
              ],
            },
          ],
        },
        {
          heading: "Duration",
          blocks: [
            {
              type: "p",
              text: "This DPA shall remain in effect for the duration of the Services agreement between the parties and shall survive termination until all Personal Data has been deleted or returned in accordance with Section 4 (Data Deletion).",
            },
          ],
        },
        {
          heading: "Processing of Data",
          blocks: [
            {
              type: "p",
              text: "Pyngyn will process Personal Data only on behalf of, and in accordance with, the Customer's documented instructions. The nature, purpose, and scope of processing are detailed in Annex A. Pyngyn processes the following categories of data:",
            },
            {
              type: "list",
              items: [
                "**Passive Website Data:** IP addresses, browser/device info (User-Agent), pages visited, timestamps, referrers, and cookie/tracking IDs (via Google Tag Manager and Meta Pixel).",
                "**Browser-Local Data:** Promo popup timers, workspace offer countdowns, roadmap upvotes, and calculator inputs (ROI, cost margin, team utilization). Note: this data is stored locally in the user's browser memory or localStorage and is not transmitted to or stored on Pyngyn's servers.",
                "**AI Feature Inputs:** Information submitted to AI-powered features, including project data, task data, workspace content, user prompts, support requests, and other information processed to generate AI-assisted outputs. This data is transmitted to Anthropic for output generation and is not saved in Pyngyn's database.",
                "**Demo Booking Data:** Name, email, phone, and meeting preferences collected via Calendly. This goes directly to Calendly and is not stored in the Pyngyn app database.",
                "**SaaS Application Data (app.pyngyn.ai):** Account data (Name, Email, Company, auth details via Clerk) and user-generated content (Project & task content) created within the product.",
              ],
            },
          ],
        },
        {
          heading: "Data Deletion",
          blocks: [
            {
              type: "p",
              text: "Upon termination of the Services, or upon the Customer's written request, Pyngyn shall delete all Personal Data processed on behalf of the Customer within thirty (30) days. This includes permanently deleting SaaS application data and account details.",
            },
            {
              type: "p",
              text: "Note: Browser-local data (e.g., localStorage items) cannot be deleted remotely by Pyngyn and must be cleared by the end-user via their browser settings.",
            },
          ],
        },
        {
          heading: "Data Export",
          blocks: [
            {
              type: "p",
              text: "Upon termination or upon request, Customer may export their Customer Data through the export functionality available within the Service. If the export functionality is unavailable, Pyngyn will provide a copy of Customer Data in a commonly used machine-readable format before deletion.",
            },
          ],
        },
        {
          heading: "Security Measures",
          blocks: [
            {
              type: "p",
              text: "Pyngyn shall implement and maintain appropriate technical and organizational security measures designed to protect Personal Data against unauthorized access, disclosure, alteration, or loss. These measures are detailed in Annex B.",
            },
          ],
        },
        {
          heading: "Confidentiality of Personnel",
          blocks: [
            {
              type: "p",
              text: "Pyngyn shall ensure that all personnel authorized to process Personal Data are subject to appropriate confidentiality obligations, whether contractual or statutory, and shall access Personal Data only to the extent necessary to provide the Services. Pyngyn shall ensure such personnel receive appropriate training regarding the protection of Personal Data.",
            },
          ],
        },
        {
          heading: "Breach Notification",
          blocks: [
            {
              type: "p",
              text: "In the event of a Personal Data breach, Pyngyn shall notify the Customer without undue delay, and in any case within seventy-two (72) hours, after becoming aware of the breach. Pyngyn will provide all reasonable information necessary for the Customer to fulfill its own breach notification obligations to relevant supervisory authorities and data subjects.",
            },
          ],
        },
        {
          heading: "Data Subject Rights Assistance",
          blocks: [
            {
              type: "p",
              text: "Taking into account the nature of the processing, Pyngyn shall assist the Customer in fulfilling its obligations to respond to data subjects' requests regarding their rights (e.g., access, rectification, erasure, portability) as required under the GDPR.",
            },
            {
              type: "p",
              text: "If Pyngyn receives a request directly from a data subject, Pyngyn will forward the request to the Customer and direct the data subject to contact the Customer directly.",
            },
          ],
        },
        {
          heading: "Audit Rights",
          blocks: [
            {
              type: "p",
              text: "Upon reasonable written notice and no more than once annually, Pyngyn shall make available to Customer all information reasonably necessary to demonstrate compliance with this Data Processing Agreement, including relevant security documentation, policies, and information regarding its technical and organizational security measures.",
            },
            {
              type: "p",
              text: "Where such information is insufficient to demonstrate compliance with applicable data protection laws, Customer may conduct an audit or inspection, either directly or through an independent third-party auditor, subject to reasonable confidentiality obligations, advance notice, and measures designed to avoid disruption to Pyngyn's operations and the confidentiality of other customers' information.",
            },
            {
              type: "p",
              text: "Any audit shall be conducted during normal business hours and in a manner that does not unreasonably interfere with Pyngyn's business operations. Customer shall bear its own audit costs unless otherwise required by applicable law.",
            },
          ],
        },
        {
          heading: "International Transfers",
          blocks: [
            {
              type: "p",
              text: "If Personal Data is transferred outside of the European Economic Area (EEA) or the UK to a country that has not been deemed to provide an adequate level of protection, such transfers shall be subject to appropriate safeguards, such as the European Commission's Standard Contractual Clauses (SCCs) or the UK International Data Transfer Agreement (IDTA), as detailed in Annex C.",
            },
          ],
        },
        {
          heading: "Subprocessors",
          blocks: [
            {
              type: "p",
              text: "Pyngyn is authorized to engage third-party Subprocessors to process Personal Data. Pyngyn shall remain liable for the acts and omissions of its Subprocessors. Current Subprocessors include:",
            },
            {
              type: "list",
              items: [
                "**Google Cloud Platform (GCP):** Infrastructure and cloud hosting (asia-south1 region), including database and compute services.",
                "**Google Tag Manager / GA4 / Google Fonts:** Analytics, tag management, and font delivery.",
                "**Meta / Facebook Pixel:** Tracking page views and configured events.",
                "**Calendly:** Demo booking and scheduling.",
                "**Anthropic:** Processing data submitted to AI-powered features within the Pyngyn platform, including task generation, support assistance, organizational reporting, workload recommendations, project insights, workflow optimization, and other AI-assisted functionality.",
                "**Clerk:** Single Sign-On (SSO), email service, and authentication.",
                "**Razorpay:** Payment processing for paid subscriptions and invoicing.",
                "**Microsoft Entra ID:** Identity and access management for internal Pyngyn team accounts and organization-level SSO.",
              ],
            },
            {
              type: "p",
              text: "Pyngyn will provide the Customer with prior notice of any intended addition or replacement of a Subprocessor. See our full **[Subprocessors](/subprocessors)** list for current details.",
            },
          ],
        },
        {
          heading: "Liability",
          blocks: [
            {
              type: "p",
              text: "Pyngyn's liability arising out of or related to this DPA, whether in contract, tort, or under any other theory of liability, shall be subject to the limitations and exclusions of liability set forth in the underlying agreement between the parties. Pyngyn shall not be liable for any indirect, incidental, or consequential damages arising from the processing of Personal Data.",
            },
          ],
        },
        {
          heading: "Annex A, Subject Matter and Details of the Data Processing",
          noNumber: true,
          blocks: [
            {
              type: "table",
              headers: ["Field", "Detail"],
              rows: [
                ["Subject Matter", "Provision of the Pyngyn marketing website tools, demo scheduling, and SaaS application services."],
                ["Duration of Processing", "For the term of the Customer's use of the Services, plus the period necessary for data deletion post-termination."],
                [
                  "Nature and Purpose of Processing",
                  "Website analytics and performance monitoring. AI-powered task generation. AI-powered customer support assistance. AI-generated organizational and project summaries. AI-generated workload and task assignment recommendations. AI-powered project management insights and recommendations. AI-assisted productivity and workflow optimization. AI-powered analysis of workspace content to generate outputs requested by users. Scheduling product demonstrations. Providing project and task management SaaS functionality.",
                ],
                [
                  "Types of Personal Data",
                  "Identification data (Name, Email, Company). Authentication data (managed via Clerk). Network/Device data (IP address, User-Agent). User-generated content (Project details, task content, AI tool inputs). Scheduling data (Phone, meeting time). Workspace content. Task data. Project data. User activity information. Workspace collaboration data. Project participation data. User prompts submitted to AI features. AI-generated outputs.",
                ],
                [
                  "Categories of Data Subjects",
                  "Visitors to the Pyngyn marketing site. Users of the free AI tools. Prospects booking a demo. Authorized users of the Pyngyn SaaS application (app.pyngyn.ai).",
                ],
              ],
            },
          ],
        },
        {
          heading: "Annex B, Technical and Organizational Security Measures",
          noNumber: true,
          blocks: [
            {
              type: "p",
              text: "Pyngyn implements the following technical and organizational measures to protect Personal Data. These measures reflect the current state of Pyngyn's security practices and compliance posture. Pyngyn holds GDPR compliance as its primary regulatory framework.",
            },
            {
              type: "table",
              headers: ["Measure", "Detail"],
              rows: [
                [
                  "Access Control",
                  "Role-based access control (RBAC) to internal systems. Authentication data is secured and managed by Clerk (SSO). Unique user IDs and password requirements are enforced.",
                ],
                ["Data Transmission", "All data in transit is encrypted using TLS/SSL (HTTPS)."],
                [
                  "Data Minimization",
                  "Pyngyn explicitly avoids storing sensitive AI tool inputs or Calendly booking data in its own databases. Browser-local data is kept strictly on the user's device.",
                ],
                [
                  "Subprocessor Management",
                  "Pyngyn engages only with reputable third parties (Google Cloud Platform, Anthropic, Razorpay, Calendly, Clerk, Microsoft Entra ID) that maintain industry-standard security and privacy practices.",
                ],
                ["Incident Response", "Pyngyn maintains internal procedures for identifying, managing, and responding to security incidents."],
              ],
            },
          ],
        },
        {
          heading: "Annex C, Cross-Border Data Transfer Terms",
          noNumber: true,
          blocks: [
            {
              type: "list",
              items: [
                "**Applicability:** This Annex applies if Personal Data is processed in a country outside the EEA, UK, or Switzerland that lacks an adequacy decision.",
                "**Standard Contractual Clauses:** The parties agree to be bound by the Standard Contractual Clauses (SCCs) set out in the European Commission's Implementing Decision (EU) 2021/914 of 4 June 2021.",
                "**Module Selection:** Module Two (Controller to Processor) or Module Three (Processor to Processor) shall apply, depending on the respective roles of the parties.",
                "**Subprocessor Transfers:** Pyngyn shall ensure that any transfers to Subprocessors (e.g., Google Cloud Platform, Anthropic, Google, Meta, Calendly, Clerk, Razorpay, Microsoft Entra ID) outside the EEA/UK are subject to appropriate safeguards, including the SCCs or equivalent legal mechanisms.",
              ],
            },
          ],
        },
      ]}
    />
  );
}
