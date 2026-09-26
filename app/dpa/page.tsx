import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Data Processing Agreement (DPA) | PYNGYN",
  description:
    "Data Processing Agreement between Customer (Data Fiduciary / Controller) and VIMOVI GlobalTech Private Limited (Data Processor).",
  alternates: { canonical: "/dpa" },
};

export default function DPAPage() {
  return (
    <LegalPage
      url="/dpa"
      title="Data Processing Agreement"
      updated="September 26, 2026"
      readAlongside="For an executed countersigned copy of this DPA for your firm's compliance files, please contact **[vivek.pandey@pyngyn.com](mailto:vivek.pandey@pyngyn.com)**."
      intro="This Data Processing Agreement (“DPA”) is entered into by and between VIMOVI GlobalTech Private Limited, operating under the brand “Pyngyn” (a DPIIT-recognized startup certified under ISO 9001:2015 for Quality Management Systems; “Data Processor” or “Pyngyn”) and the customer organization agreeing to the Pyngyn Terms of Service (“Customer,” “Data Fiduciary” under India's DPDP Act, or “Data Controller” under the GDPR). This DPA supplements and forms part of the underlying agreement between the parties for access to the Pyngyn Service. It governs the processing of Personal Data in compliance with applicable data protection legislation, including India's Digital Personal Data Protection Act, 2023 (“DPDP Act”), the Information Technology Act, 2000 and CERT-In directions, and the General Data Protection Regulation (“GDPR”)."
      sections={[
        {
          heading: "Definitions",
          blocks: [
            {
              type: "list",
              items: [
                "**“Personal Data”**: Any data about an individual who is identifiable by or in relation to such data, as defined under the DPDP Act, 2023, or any information relating to an identified or identifiable natural person under the GDPR.",
                "**“Data Fiduciary” / “Data Controller”**: The entity that determines the purpose and means of processing Personal Data (the Customer).",
                "**“Data Processor”**: The entity that processes Personal Data on behalf of the Data Fiduciary (Pyngyn).",
                "**“Data Principal” / “Data Subject”**: The natural person to whom the Personal Data relates (including Customer's clients, partners, employees, and contractors).",
                "**“Services”**: The Pyngyn ClientSpace and Workspace software application located at `app.pyngyn.ai`, the marketing website at `pyngyn.ai`, free AI interactive tools, demo booking functionality, and associated APIs.",
                "**“Subprocessor”**: Any third-party data processor engaged by Pyngyn to assist in fulfilling its obligations with respect to providing the Services.",
                "**“Customer Personal Data”**: Personal Data contained within Customer Content uploaded to or processed within Customer's workspace or client portals.",
              ],
            },
          ],
        },
        {
          heading: "Scope, Roles & Documented Instructions",
          blocks: [
            {
              type: "p",
              text: "The parties acknowledge and agree that with respect to the processing of Customer Personal Data within the Services, Customer is the Data Fiduciary (or Data Controller) and Pyngyn is the Data Processor. Pyngyn agrees to process Customer Personal Data strictly on behalf of and in accordance with Customer's documented instructions, including with respect to transfers of personal data outside India or the EEA, unless required to do so by applicable law.",
            },
            {
              type: "p",
              text: "The Customer's initial documented instructions are set forth in the Terms of Service, this DPA, and Customer's active configuration and utilization of the Service's administrative features.",
            },
          ],
        },
        {
          heading: "Duration of Processing",
          blocks: [
            {
              type: "p",
              text: "This DPA takes effect on the date Customer creates an account or subscribes to the Services and remains in full force and effect until the termination of the underlying Services agreement and the complete return or deletion of all Customer Personal Data in accordance with Section 5.",
            },
          ],
        },
        {
          heading: "Categories of Data Processed",
          blocks: [
            {
              type: "p",
              text: "Pyngyn processes the following categories of data in connection with delivering the Services (detailed further in Annex A):",
            },
            {
              type: "list",
              items: [
                "**SaaS Application & Workspace Data (app.pyngyn.ai):** Customer account records (name, email, company, role, auth tokens via Clerk), client portal details, project workspaces, tasks, assignments, deadlines, comments, approval audit records, and documents/working papers uploaded by Authorized Users.",
                "**AI Processing Payloads:** Information submitted to generative AI features (including status report notes, project planning scopes, and prompt inputs). Transmitted transiently to Anthropic or Groq solely to generate requested outputs; never used for base model training.",
                "**Interactive Demo & Scheduling Data:** Prospect contact details (name, business email, meeting notes) processed via Calendly or native booking endpoints.",
                "**Passive Security & Edge Telemetry:** IP addresses, browser user-agent headers, edge HTTP traffic logs, and error telemetry processed via Cloudflare and GCP.",
                "**Browser-Local Storage:** Promo timers, calculator states, and roadmap upvotes held exclusively in browser memory or localStorage without server transmission.",
              ],
            },
          ],
        },
        {
          heading: "Data Deletion & Post-Termination Handling",
          blocks: [
            {
              type: "p",
              text: "Following the termination or expiry of the customer relationship or Services agreement, Pyngyn will, subject to applicable law and the customer agreement:",
            },
            {
              type: "list",
              items: [
                "**Return or Deletion:** Return customer data where applicable, or securely delete Customer Personal Data processed on behalf of Customer, in accordance with the customer's documented instructions.",
                "**Documented Instructions:** Follow the customer's documented instructions regarding the return or secure deletion of Customer Personal Data.",
                "**Applicable Retention Exceptions:** Apply applicable retention exceptions where Pyngyn is required or permitted by applicable law to retain customer information, or where retention is necessary for legitimate legal, security, fraud-prevention, or statutory accounting requirements.",
                "**Backup Lifecycle:** Handle and retain backup copies containing Customer Personal Data according to the applicable backup lifecycle before they are overwritten or securely removed.",
              ],
            },
          ],
        },
        {
          heading: "Data Export Assistance",
          blocks: [
            {
              type: "p",
              text: "Throughout the active subscription term and during any agreed post-termination transition period, Customer may export Customer Content directly using self-service export features available within the product interface. If Customer requires assistance, Pyngyn will provide a machine-readable export (JSON/CSV) of Customer Personal Data prior to final deletion.",
            },
          ],
        },
        {
          heading: "Technical & Organizational Security Measures",
          blocks: [
            {
              type: "p",
              text: "Pyngyn implements and maintains appropriate technical, administrative, and organizational safeguards designed to protect Customer Personal Data against accidental, unauthorized, or unlawful destruction, loss, alteration, disclosure, or access. These high-level security measures cover:",
            },
            {
              type: "list",
              items: [
                "**Confidentiality:** Enforceable confidentiality obligations and security awareness training for all personnel authorized to process Customer Personal Data.",
                "**Access Controls:** Logical tenant isolation, server-side authorization, and role-based permissions designed to restrict access solely to authorized personnel and accounts.",
                "**Encryption:** Strong encryption of customer data during transmission (TLS 1.3 / HTTPS) and, where applicable, while stored (industry-standard encryption at rest for databases and file storage).",
                "**Security Monitoring & Incident Response:** Continuous system logging, monitoring, and documented incident response procedures for detecting and responding to security events.",
                "**Vulnerability Management:** Periodic security assessments, dependency vulnerability scanning, and testing appropriate to the service.",
                "**Backup & Recovery:** Appropriate backup and recovery measures maintained to support service continuity and data protection.",
                "**Subprocessor Controls:** Diligent security vetting and binding data processing agreements with all authorized subprocessors.",
              ],
            },
            {
              type: "p",
              text: "Our controls are designed with reference to SOC 2 Trust Services Criteria and ISO/IEC 27001 principles. Our operating entity holds ISO 9001:2015 certification for Quality Management Systems and is recognized by DPIIT, Government of India. Additional technical domains are summarized in Annex B.",
            },
          ],
        },
        {
          heading: "Personnel Confidentiality & Security Training",
          blocks: [
            {
              type: "p",
              text: "Pyngyn ensures that all employees, contractors, and personnel who have access to Customer Personal Data are bound by enforceable confidentiality obligations and receive regular training regarding cybersecurity and personal data protection.",
            },
          ],
        },
        {
          heading: "Security Incident & Personal Data Breach Notification",
          blocks: [
            {
              type: "p",
              text: "In the event of an applicable personal data or security incident affecting Customer Personal Data:",
            },
            {
              type: "list",
              items: [
                "**Customer Notification:** Pyngyn will notify Customer of applicable personal-data or security incidents according to this DPA and applicable law without undue delay upon becoming aware of the incident.",
                "**Information Provided:** Pyngyn will provide relevant information reasonably necessary for Customer to understand the nature of the incident and meet its own statutory reporting obligations (such as to Data Principals or supervisory authorities).",
                "**Cooperation:** Pyngyn will cooperate reasonably in the investigation, containment, and response to the incident, and take reasonable steps to remediate identified security impacts.",
              ],
            },
          ],
        },
        {
          heading: "Subprocessors & Third-Party Engagement",
          blocks: [
            {
              type: "p",
              text: "Customer grants Pyngyn general written authorization to engage third-party Subprocessors to support the delivery of the Services. Pyngyn's current authorized Subprocessors are:",
            },
            {
              type: "list",
              items: [
                "**Google Cloud Platform (GCP):** Primary cloud hosting, PostgreSQL databases, compute, and encrypted storage (India, asia-south1 Mumbai region).",
                "**Cloudflare, Inc.:** Edge CDN, DNS routing, DDoS mitigation, and edge runtime compute (USA & Global Edge Network).",
                "**Clerk, Inc.:** User authentication, Single Sign-On (SSO), session tokens, and identity management (USA).",
                "**Razorpay Software Pvt. Ltd.:** Payment processing, subscription billing, and tax invoicing (India).",
                "**Anthropic, PBC:** Generative AI capabilities for ClientSpace and Workspace SaaS workflows (USA).",
                "**Groq Inc.:** Fast AI inference engine for free interactive website tools (USA).",
                "**Calendly LLC:** Demo booking and schedule coordination (USA).",
                "**Google LLC:** Google Tag Manager, GA4 analytics, and Google Fonts (USA, gated behind consent).",
                "**Meta Platforms, Inc.:** Meta Pixel conversion measurement (USA, gated behind consent).",
                "**Microsoft Corporation:** Microsoft Entra ID enterprise SSO and team account management (USA & EU).",
              ],
            },
            {
              type: "p",
              text: "Pyngyn imposes data protection obligations on every Subprocessor that are no less protective than those set forth in this DPA. Pyngyn remains fully liable to Customer for the performance of its Subprocessors' obligations. Pyngyn will maintain an up-to-date list at **[Subprocessors](/subprocessors)** and provide advance notice of new Subprocessors.",
            },
          ],
        },
        {
          heading: "Assistance with Data Principal & Data Subject Rights",
          blocks: [
            {
              type: "p",
              text: "Taking into account the nature of the processing, Pyngyn will provide reasonable technical and organizational assistance to Customer, to the extent commercially possible, to enable Customer to respond to requests from Data Principals exercising their rights (such as access, correction, erasure, grievance redressal, and nomination under the DPDP Act, or access, rectification, erasure, and portability under the GDPR).",
            },
            {
              type: "p",
              text: "If a Data Principal submits a request directly to Pyngyn concerning Customer Personal Data, Pyngyn will promptly forward the request to Customer and advise the individual to contact Customer directly.",
            },
          ],
        },
        {
          heading: "Cross-Border Data Transfers",
          blocks: [
            {
              type: "p",
              text: "Pyngyn stores primary customer workspace databases locally in India (GCP Mumbai). To the extent personal data is transferred across international borders, Pyngyn ensures compliance with Section 16 of India's DPDP Act, 2023. For transfers of personal data originating from the EEA, UK, or Switzerland to countries lacking an adequacy decision, the parties agree to be bound by the Standard Contractual Clauses (SCCs) as set forth in Annex C.",
            },
          ],
        },
        {
          heading: "Audit Rights",
          blocks: [
            {
              type: "p",
              text: "Upon reasonable written notice (at least 30 days in advance) and no more than once in any twelve-month period, Pyngyn shall make available to Customer information reasonably necessary to demonstrate compliance with this DPA. Customer may conduct an audit of Pyngyn's compliance documentation during normal business hours, subject to strict confidentiality and security safeguards to avoid compromising the security or confidentiality of other Pyngyn customers.",
            },
          ],
        },
        {
          heading: "Annex A, Subject Matter & Scope of Processing",
          noNumber: true,
          blocks: [
            {
              type: "table",
              headers: ["Field", "Specification"],
              rows: [
                ["Subject Matter", "Provision of the Pyngyn ClientSpace and Workspace software platform, interactive tools, and customer support."],
                ["Duration of Processing", "For the duration of the customer agreement plus any period necessary for post-termination data return, deletion, or statutory retention compliance."],
                [
                  "Nature and Purpose",
                  "Client portal delivery, file sharing, approval workflows, task assignment, progress tracking, time and capacity estimation, AI-assisted project planning and status report generation, and subscription billing.",
                ],
                [
                  "Categories of Data Principals",
                  "Customer's partners, employees, contractors, external clients, and prospects booking product demonstrations.",
                ],
                [
                  "Types of Personal Data",
                  "Contact data (name, email, phone), authentication tokens, workspace deliverables, task notes, client communications, billing identifiers, and system access logs.",
                ],
              ],
            },
          ],
        },
        {
          heading: "Annex B, Technical & Organizational Security Measures",
          noNumber: true,
          blocks: [
            {
              type: "p",
              text: "Pyngyn maintains the following technical and organizational security controls designed with reference to SOC 2 Trust Services Criteria and ISO/IEC 27001 principles:",
            },
            {
              type: "table",
              headers: ["Security Domain", "Implemented Technical Measure"],
              rows: [
                ["Cryptographic Controls", "TLS 1.3 / HTTPS encryption for data in transit; industry-standard encryption at rest for databases and file storage where applicable."],
                ["Tenant Logical Isolation", "Logical tenant isolation and server-side authorization designed to restrict customer and workspace information to authorized users."],
                ["Identity & Access Control", "Role-Based Access Control (RBAC), Single Sign-On (SSO/SAML via Clerk and Entra ID), multi-factor authentication (MFA) capabilities."],
                ["Edge & Network Defense", "Cloudflare WAF, automated DDoS mitigation, rate-limiting, and ingress security filtering."],
                ["AI Feature Safeguards", "Enterprise API processing via Anthropic and Groq; zero public foundation model training on customer workspace data."],
                ["Security & Compliance Logging", "Security and technical logs maintained for monitoring, fraud prevention, service reliability, and Indian cybersecurity (CERT-In) compliance."],
                ["Business Continuity", "Appropriate encrypted backup and recovery measures maintained to support service continuity and data protection."],
              ],
            },
          ],
        },
        {
          heading: "Annex C, Cross-Border Transfer Terms (EU Standard Contractual Clauses)",
          noNumber: true,
          blocks: [
            {
              type: "list",
              items: [
                "**Applicability:** Applies solely to transfers of Personal Data originating from the European Economic Area, UK, or Switzerland to countries outside those areas that do not possess an adequacy decision.",
                "**Standard Contractual Clauses:** The parties incorporate by reference the Standard Contractual Clauses (SCCs) approved under European Commission Implementing Decision (EU) 2021/914.",
                "**Module Selection:** Module Two (Controller to Processor) shall apply where Customer is a Controller, and Module Three (Processor to Processor) shall apply where Customer is an intermediary processor.",
                "**Governing Law for SCCs:** The laws of the Republic of Ireland shall govern the SCCs, without prejudice to the substantive governing law of the underlying agreement.",
              ],
            },
          ],
        },
      ]}
    />
  );
}
