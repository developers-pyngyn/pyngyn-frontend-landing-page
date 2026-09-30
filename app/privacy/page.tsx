import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | PYNGYN",
  description:
    "How VIMOVI GlobalTech Private Limited (Pyngyn) collects, uses, and safeguards personal data under India's DPDP Act, 2023 and the GDPR.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      url="/privacy"
      title="Pyngyn Privacy Policy"
      updated="September 26, 2026"
      readAlongside="Read alongside our [Terms of Service](/terms), [Data Processing Agreement](/dpa), [Subprocessors](/subprocessors), and [Cookie Policy](/cookie-policy)."
      intro="Welcome to Pyngyn, a business-to-business (B2B) professional services operating system provided by VIMOVI GlobalTech Private Limited (“Pyngyn,” “we,” “us,” or “our”). This Privacy Policy explains transparently how personal data is collected, used, disclosed, and protected across our marketing website at [pyngyn.ai](https://pyngyn.ai), our ClientSpace and Workspace software application at [app.pyngyn.ai](https://app.pyngyn.ai), and all associated tools, APIs, and services (collectively, the “Service(s)”). We are committed to processing personal data in full compliance with applicable data protection laws, including the Digital Personal Data Protection Act, 2023 (“DPDP Act”) of India, CERT-In Cyber Security Directions (2022), and, where applicable to European individuals, the General Data Protection Regulation (“GDPR”). If you do not agree with the practices described in this policy, please do not use our Services."
      sections={[
        {
          heading: "Our Legal Roles: Data Fiduciary vs. Data Processor",
          blocks: [
            {
              type: "p",
              text: "Under modern data protection frameworks, legal responsibilities depend on who determines why and how personal data is processed. Pyngyn acts in two distinct capacities depending on your relationship with our platform:",
            },
            {
              type: "list",
              items: [
                "**Pyngyn as a Data Fiduciary (under India's DPDP Act) / Data Controller (under GDPR):** When you browse our public website, test our interactive web tools, create an account, purchase a subscription, communicate with customer support, or book a live product demonstration, Pyngyn determines the purposes and means of processing that personal data. We are directly responsible to you (the **Data Principal** / **Data Subject**) for such operational, billing, marketing, and account data.",
                "**Pyngyn as a Data Processor:** When a professional services firm, accounting practice, law firm, consultancy, or enterprise customer (“Customer Organization”) uploads or creates data within a client portal or workspace—including client profiles, confidential project files, team assignments, tasks, timesheets, and communications—the Customer Organization determines the purposes and means of processing and acts as the **Data Fiduciary** (or **Data Controller**). Pyngyn acts solely as a **Data Processor**, processing that workspace data strictly on the documented instructions of the Customer Organization pursuant to our executed [Data Processing Agreement](/dpa).",
                "**Customer Organization Relationship:** If you are an employee, contractor, or end-client accessing ClientSpace through an invitation from a firm using Pyngyn, that firm is the primary Data Fiduciary for the workspace data they collect from you. Inquiries regarding workspace data should generally be directed to that firm's administrator, though Pyngyn provides full technical assistance as detailed below.",
              ],
            },
          ],
        },
        {
          heading: "Standalone DPDP Notice for India (Section 5, DPDP Act 2023)",
          blocks: [
            {
              type: "p",
              text: "In accordance with Section 5 of India's Digital Personal Data Protection Act, 2023, this notice provides an accessible summary of personal data processing before or at the time you provide consent or interact with our Services:",
            },
            {
              type: "list",
              items: [
                "**What personal data is collected:** Contact and identity details (name, business email, mobile number where provided, authentication credentials), billing records (invoices, transaction IDs, tax identifiers), workspace and collaboration records (tasks, documents, comments, approvals), tool inputs (project planning notes, status summaries), and technical logs (IP address, device metadata).",
                "**Why it is collected:** To provision and administer accounts, authenticate users via Single Sign-On (SSO), deliver ClientSpace client portals and project workspaces, execute user-requested AI summaries and plans, invoice subscriptions via Razorpay, maintain cybersecurity and edge reliability, and fulfill statutory compliance mandates.",
                "**How consent can be withdrawn:** Where processing is based on your consent (such as marketing communications or non-essential website tracking cookies), you can withdraw consent at any time by clicking “Cookie preferences” in our website footer, using the unsubscribe link in emails, or contacting our Grievance Officer.",
                "**How to exercise Data Principal rights:** You have the statutory right under the DPDP Act to request access to your personal data, seek correction or updating of inaccurate data, request erasure where purpose is completed, register grievances, and nominate a representative in the event of death or incapacity.",
                "**Grievance Redressal Officer:** You may reach our designated Grievance Officer, **Vivek Pandey**, directly at **[vivek.pandey@pyngyn.com](mailto:vivek.pandey@pyngyn.com)**. We resolve grievances within 30 calendar days.",
                "**Regulatory Complaint:** If you are unsatisfied with our response, you have the right to lodge a complaint with the **Data Protection Board of India (DPBI)** once constituted by the Central Government.",
              ],
            },
          ],
        },
        {
          heading: "Categories of Personal Data Collected & Purpose of Processing",
          blocks: [
            {
              type: "p",
              text: "We collect only the personal data that is strictly necessary to deliver, secure, and improve the ClientSpace and Workspace platforms. Below is an itemized breakdown of data categories, product purposes, and lawful grounds:",
            },
            {
              type: "table",
              headers: ["Data Category", "Specific Data Elements", "Product Purpose", "Lawful Ground (DPDP & GDPR)"],
              rows: [
                [
                  "Identity & Contact Data",
                  "First and last name, business email address, mobile phone number (optional/demo booking), job title, and company or firm name.",
                  "Account provisioning, user profile setup, team invitations, sending critical service notices, and scheduling product demonstrations.",
                  "Fulfilling requested service / Performance of contract (DPDP Sec. 4 / GDPR Art. 6(1)(b)). Managed via our authentication partner, Clerk.",
                ],
                [
                  "Authentication Credentials",
                  "User IDs, encrypted password hashes (stored securely by Clerk), Single Sign-On (SSO/SAML) tokens, and session identifiers.",
                  "Authenticating authorized users, enforcing role-based permissions, securing sessions, and preventing unauthorized account takeover.",
                  "Performance of contract & legitimate security interest (DPDP Sec. 4 & 7 / GDPR Art. 6(1)(b) & (f)). Raw passwords never touch Pyngyn servers.",
                ],
                [
                  "Billing & Payment Records",
                  "Billing contact name, billing address, business GSTIN/tax identifier, transaction amount, subscription tier, Razorpay payment ID, and payment status.",
                  "Processing subscription fees, issuing tax-compliant GST invoices, managing plan renewals, and preventing financial fraud.",
                  "Performance of contract & compliance with Indian financial regulations (DPDP Sec. 4 / GDPR Art. 6(1)(b) & (c)). Raw card/UPI credentials are encrypted and processed by Razorpay (PCI-DSS Level 1 compliant).",
                ],
                [
                  "Customer Workspace & ClientSpace Content",
                  "Project scopes, task descriptions, deliverables, document files, client comments, approval audit trails, deadlines, and team workload allocations.",
                  "Delivering the core ClientSpace portal and Workspace operational engine, enabling firm-client document exchange, and tracking delivery milestones.",
                  "Processing as Data Processor under Customer Organization's instructions and executed DPA (DPDP Sec. 4 & 6 / GDPR Art. 28).",
                ],
                [
                  "AI Feature Inputs & Prompts",
                  "Project parameters, rough weekly notes submitted to the Status Report Generator, scope details submitted to the AI Project Plan Generator, and user prompts.",
                  "Transiently generating structured project plans, executive status reports, and workload insights requested by the user.",
                  "Fulfilling user-initiated feature requests (DPDP Sec. 4 / GDPR Art. 6(1)(b)). Transmitted transiently to Anthropic or Groq; never used to train base AI models without consent.",
                ],
                [
                  "Security Telemetry & System Logs",
                  "IP address, browser type and version, operating system, edge access timestamps, HTTP request paths, referrer URLs, and rate-limiting counters.",
                  "Real-time DDoS mitigation, edge firewall defense, diagnosing server exceptions, detecting malicious intrusions, and statutory audit logging.",
                  "Legitimate use for cybersecurity and legal obligation under Indian CERT-In directives (DPDP Sec. 7 / CERT-In Directions 2022 / GDPR Art. 6(1)(c) & (f)).",
                ],
                [
                  "Cookie & Consent Records",
                  "Consent state flags (analytics: boolean, marketing: boolean), consent timestamp (`pyngyn_cookie_consent_v1`), and aggregated GA4/Meta Pixel tags.",
                  "Respecting visitor privacy choices, optimizing page load performance, and measuring advertising attribution only where permitted.",
                  "Freely given, informed consent (DPDP Sec. 6 / GDPR Art. 6(1)(a)). Non-essential cookies are strictly blocked until consented.",
                ],
                [
                  "Support & Communications Data",
                  "Support email correspondence, diagnostic logs shared by user, demo questionnaire notes, and meeting time preferences via Calendly.",
                  "Diagnosing platform bugs, providing technical customer support, answering pre-sales questions, and onboarding new firms.",
                  "Performance of requested assistance / Legitimate business use (DPDP Sec. 4 & 7 / GDPR Art. 6(1)(b) & (f)).",
                ],
              ],
            },
          ],
        },
        {
          heading: "Artificial Intelligence (AI) Features & Data Flow",
          blocks: [
            {
              type: "p",
              text: "Pyngyn incorporates specialized generative AI capabilities designed to eliminate administrative project management overhead for professional services practices. We maintain strict safeguards regarding how data interacts with AI systems:",
            },
            {
              type: "list",
              items: [
                "**ClientSpace Features Using AI:** Generative AI capabilities within ClientSpace and Workspace include AI project plan generation, automated client status report generation, workload and capacity summaries, and interactive chat assistance.",
                "**Information Submitted to AI:** Users may optionally submit text prompts, task descriptions, project scope notes, deliverable milestones, and relevant workspace context into AI-enabled features to generate draft outputs.",
                "**Purpose of Processing:** Submitted information is processed solely to generate the requested draft deliverables, project roadmaps, client updates, and conversational assistance.",
                "**AI Providers Used:** We utilize two distinct enterprise AI infrastructure providers: (1) **Anthropic, PBC** (USA) for generative assistance within the authenticated ClientSpace and Workspace SaaS platform (`app.pyngyn.ai`), and (2) **Groq Inc.** (USA) for inference powering our free interactive web tools (`/tools/ai-project-plan`, `/tools/status-report`, and `/api/chat`).",
                "**Processing & Subprocessor Terms:** Prompts and input text submitted to AI features are transmitted over secure encrypted TLS connections to the respective provider. Processing and data retention by these providers are governed by their respective enterprise API agreements and standard commercial data protection commitments. Authorized users may choose whether to submit customer workspace context into AI features.",
                "**No Public Foundation Model Training:** Pyngyn does not use Customer Workspace Content, client documents, or private project records to train public foundation AI models without explicit customer authorization. Under applicable enterprise API terms, customer inputs submitted via API are not utilized to train the providers' public foundation models.",
                "**Professional Review & Human Oversight:** All AI-generated deliverables (including project roadmaps, risk assessments, and status summaries) are working drafts provided for human review. Authorized users retain full discretion to inspect, edit, approve, or discard any generated content before sharing it with team members or clients.",
              ],
            },
          ],
        },
        {
          heading: "Third-Party Processors and Subprocessors",
          blocks: [
            {
              type: "p",
              text: "Pyngyn does not sell, rent, or trade your personal data. To provide our cloud services efficiently and securely, we engage selected third-party service providers (Subprocessors) that specialize in infrastructure, authentication, billing, and communication. Every subprocessor is vetted for rigorous security and bound by confidentiality and data processing agreements:",
            },
            {
              type: "table",
              headers: ["Subprocessor", "Role & Service Provided", "Data Processed", "Processing Region"],
              rows: [
                [
                  "Google Cloud Platform (GCP)",
                  "Primary cloud hosting, multi-tenant PostgreSQL databases, object storage, and backup systems for app.pyngyn.ai.",
                  "All SaaS application data, workspace files, account records, and server logs.",
                  "India (asia-south1, Mumbai)",
                ],
                [
                  "Cloudflare, Inc.",
                  "Global edge CDN, DNS management, DDoS mitigation, Web Application Firewall (WAF), and edge runtime for pyngyn.ai.",
                  "IP addresses, edge HTTP traffic telemetry, and ephemeral web tool API payloads.",
                  "USA & Global Edge Network",
                ],
                [
                  "Clerk, Inc.",
                  "Identity provider, user registration, Single Sign-On (SSO), multi-factor authentication, and session security.",
                  "Name, email address, password hashes, auth identifiers, and login audit timestamps.",
                  "USA",
                ],
                [
                  "Razorpay Software Pvt. Ltd.",
                  "Payment gateway, subscription recurring billing, invoice generation, and tax compliance.",
                  "Billing contact details, transaction amount, GSTIN, and tokenized payment identifiers.",
                  "India",
                ],
                [
                  "Anthropic, PBC",
                  "Generative AI model provider for ClientSpace/Workspace automated summaries and insights.",
                  "User-submitted text prompts, workspace task context, and requested deliverable parameters.",
                  "USA",
                ],
                [
                  "Groq Inc.",
                  "AI inference engine for free interactive web tools (AI Plan Generator, Status Report Generator, Chatbot).",
                  "Input notes, scope parameters, and public conversation messages submitted to free tools.",
                  "USA",
                ],
                [
                  "Calendly LLC",
                  "Interactive scheduling for live product walkthroughs and sales consultations on /demo.",
                  "Name, work email, phone number (optional), and meeting scheduling notes.",
                  "USA",
                ],
                [
                  "Microsoft Corporation",
                  "Microsoft Entra ID identity and access management for internal Pyngyn operations and enterprise SAML SSO.",
                  "Business contact info and SSO federation tokens for participating enterprise customers.",
                  "USA & EU",
                ],
                [
                  "Google LLC",
                  "Google Tag Manager, Google Analytics 4 (GA4), and Google Fonts delivery on the marketing site.",
                  "Aggregated visitor traffic, device viewport, referral URL, and IP address (anonymized).",
                  "USA (gated behind consent)",
                ],
                [
                  "Meta Platforms, Inc.",
                  "Meta Pixel for marketing campaign measurement and ad conversion tracking.",
                  "Hashed conversion identifiers and marketing site pageview events.",
                  "USA (gated behind consent)",
                ],
              ],
            },
            {
              type: "p",
              text: "For a live, detailed list of subprocessors and links to their respective compliance policies, please visit our dedicated **[Subprocessors](/subprocessors)** directory.",
            },
          ],
        },
        {
          heading: "Cross-Border Data Transfers & Safeguards",
          blocks: [
            {
              type: "p",
              text: "Our core production databases and customer workspace storage for `app.pyngyn.ai` are hosted locally in India on Google Cloud Platform's Mumbai region (`asia-south1`). However, to provide high-availability edge routing, secure identity federation, and advanced AI features, certain categories of personal data may be transferred to and processed by our qualified subprocessors located outside India (principally in the United States and European Union).",
            },
            {
              type: "list",
              items: [
                "**Compliance with India DPDP Act (Section 16):** Personal data transfers outside India comply with Section 16 of the DPDP Act. We do not transfer personal data to any foreign country or territory restricted by the Central Government of India.",
                "**GDPR Cross-Border Mechanisms:** For transfers of personal data originating within the European Economic Area (EEA), UK, or Switzerland to countries without an adequacy decision, Pyngyn relies on the European Commission's standard contractual clauses (SCCs, Module Two and Module Three) or equivalent approved safeguards, accompanied by transfer impact assessments and technical encryption.",
                "**Contractual & Organizational Protections:** All cross-border transfers are subject to binding data processing agreements requiring recipients to maintain encryption in transit and at rest, adhere to strict purpose limitation, and provide no less protection than mandated by Indian and EU privacy laws.",
              ],
            },
          ],
        },
        {
          heading: "Data Retention & Deletion",
          blocks: [
            {
              type: "p",
              text: "We apply the following retention and deletion principles across our platform:",
            },
            {
              type: "list",
              items: [
                "**Retention Principle:** Personal data is retained only for as long as reasonably necessary for the purpose for which it is processed, or where retention is required or permitted by applicable law.",
                "**Category-Specific Periods:** Different categories of personal data may have different retention periods based on operational, contractual, and regulatory requirements.",
                "**Customer Workspace Data:** Customer workspace data is retained or deleted according to the customer's agreement, Data Processing Agreement (DPA), and documented instructions.",
                "**Post-Termination Handling:** Account termination or closure does not necessarily mean every record is immediately deleted where legal, security, fraud-prevention, tax, accounting, or other applicable statutory requirements require retention.",
                "**Deletion or Anonymization:** Where the applicable retention period ends or data is no longer required, personal data is either securely deleted or anonymized so that it can no longer be associated with an identifiable individual.",
                "**Backup Lifecycle:** Personal data contained in backup archives may remain temporarily in accordance with our automated backup lifecycle before being overwritten or securely purged.",
                "**Security & Technical Logging:** Pyngyn collects and uses security and technical logs for security monitoring, fraud and abuse prevention, troubleshooting, service reliability, and compliance with applicable Indian cybersecurity requirements (including CERT-In directions). We do not promise that every category of data is permanently deleted after a single fixed period.",
              ],
            },
            {
              type: "table",
              headers: ["Data Category", "Retention Basis", "Retention Purpose & Governing Context"],
              rows: [
                [
                  "Customer Workspace Content",
                  "Governed by Customer Agreement and DPA",
                  "Retained during subscription; deleted or returned following account closure in accordance with customer instructions, subject to statutory retention exceptions and backup lifecycles.",
                ],
                [
                  "User Account & Profile Data",
                  "Active subscription lifecycle",
                  "Maintained to administer user access, authentication, and team collaboration; retained following account closure only as necessary for legal, tax, or fraud-prevention purposes.",
                ],
                [
                  "Security & Technical Logs",
                  "Operational & regulatory necessity",
                  "Collected and used for security monitoring, fraud prevention, troubleshooting, service reliability, and compliance with Indian cybersecurity requirements (CERT-In directions).",
                ],
                [
                  "Financial & Invoicing Records",
                  "Statutory tax and corporate mandates",
                  "Retained as required by applicable Indian tax and corporate laws (including GST regulations and the Companies Act, 2013).",
                ],
                [
                  "Customer Support Inquiries",
                  "Support resolution & dispute defense",
                  "Retained as reasonably needed to resolve inquiries, preserve service quality, and defend against potential legal claims.",
                ],
                [
                  "Disaster Recovery Backups",
                  "Automated backup lifecycle",
                  "Encrypted system snapshots maintained temporarily to ensure service continuity, overwritten in accordance with the backup schedule.",
                ],
              ],
            },
          ],
        },
        {
          heading: "Security Architecture & Technical Safeguards",
          blocks: [
            {
              type: "p",
              text: "Pyngyn maintains administrative, technical, and organizational safeguards designed to protect personal data against unauthorized access, loss, misuse, or alteration. Our controls are designed with reference to industry standards and leading cybersecurity principles. Controls implemented include:",
            },
            {
              type: "list",
              items: [
                "**Encryption:** Pyngyn uses encryption and other appropriate technical safeguards to protect information during transmission (TLS 1.3 / HTTPS) and, where applicable, while stored (industry-standard encryption at rest for databases and file storage).",
                "**Authentication & Access Control:** We support Single Sign-On (SSO via SAML/OIDC), multi-factor authentication (MFA) capabilities, and granular Role-Based Access Control (RBAC) allowing organization administrators to restrict permissions to authorized users.",
                "**Server-Side Authorization & Data Isolation:** Access controls and server-side authorization are designed to restrict customer and workspace information to authorized users. Logical tenant isolation ensures that authenticated queries are scoped to the customer's organization.",
                "**Security Logging & Monitoring:** Pyngyn collects and uses security and technical logs for security monitoring, fraud and abuse prevention, troubleshooting, and service reliability, and maintains processes designed to comply with applicable Indian cybersecurity requirements.",
                "**Backup & Recovery:** Appropriate backup and recovery measures are maintained to support service continuity and data protection, with automated encrypted snapshots designed for disaster recovery.",
                "**Vulnerability Management & Security Testing:** Pyngyn periodically performs security assessments, vulnerability management, and security testing appropriate to the service, including automated code analysis and dependency vulnerability reviews.",
                "**Edge Network Defense:** Web Application Firewall (WAF) filtering, DDoS mitigation, and rate-limiting protect public application endpoints against malicious traffic and common web vulnerabilities.",
                "**Corporate Standards & Quality Management:** Pyngyn's operating entity, VIMOVI GlobalTech Private Limited, holds ISO 9001:2015 certification for Quality Management Systems and is recognized by the Department for Promotion of Industry and Internal Trade (DPIIT), Government of India. Pyngyn's software runs on secure, high-availability enterprise cloud infrastructure (Google Cloud Platform and Cloudflare) with automated backups, DDoS mitigation, and robust data protection standards.",
              ],
            },
          ],
        },
        {
          heading: "Security Incident Management & Breach Notification",
          blocks: [
            {
              type: "p",
              text: "Pyngyn maintains documented procedures for detecting, investigating, containing, and responding to security incidents:",
            },
            {
              type: "list",
              items: [
                "**Detection and Incident Response:** Automated monitoring and operational telemetry alert our team to potential anomalous activity, unauthorized access attempts, or service disruptions, initiating established investigation and containment protocols.",
                "**Incident Notification:** Where required by applicable law or contractual obligations (such as under our Data Processing Agreement or the DPDP Act), Pyngyn will notify affected customers, Data Principals, regulatory authorities, or other relevant parties without undue delay and provide relevant information reasonably necessary to meet compliance obligations.",
                "**Indian Cybersecurity Alignment:** Pyngyn maintains security monitoring, logging, and incident-response processes designed to comply with applicable Indian cybersecurity requirements, including incident coordination with the Indian Computer Emergency Response Team (CERT-In) where applicable.",
              ],
            },
          ],
        },
        {
          heading: "Your Data Protection Rights (India DPDP & GDPR)",
          blocks: [
            {
              type: "p",
              text: "Depending on your geographic location and your relationship with Pyngyn, you have specific legal rights regarding your personal data:",
            },
            {
              type: "table",
              headers: ["Right", "Applicability", "What it Means"],
              rows: [
                [
                  "Right to Information & Access",
                  "DPDP Act (Sec. 11) & GDPR (Art. 15)",
                  "Request a summary of personal data being processed, the identities of all Data Fiduciaries/Processors with whom data was shared, and a copy of your records.",
                ],
                [
                  "Right to Correction & Updating",
                  "DPDP Act (Sec. 12) & GDPR (Art. 16)",
                  "Request correction, completion, or updating of inaccurate, misleading, or incomplete personal data.",
                ],
                [
                  "Right to Erasure (Deletion)",
                  "DPDP Act (Sec. 12) & GDPR (Art. 17)",
                  "Request deletion of your personal data where it is no longer necessary for the purpose it was collected, subject to statutory retention obligations.",
                ],
                [
                  "Right of Grievance Redressal",
                  "DPDP Act (Sec. 13)",
                  "Readily accessible means to register a grievance with Pyngyn regarding any act or omission respecting our DPDP obligations.",
                ],
                [
                  "Right to Nominate",
                  "DPDP Act (Sec. 14)",
                  "Nominate an individual who shall, in the event of death or incapacity, exercise your Data Principal rights on your behalf.",
                ],
                [
                  "Right to Restrict or Object",
                  "GDPR (Art. 18 & 21)",
                  "Object to processing based on legitimate interests or request restriction of processing under specified circumstances (EEA/UK individuals).",
                ],
                [
                  "Right to Data Portability",
                  "GDPR (Art. 20)",
                  "Obtain your personal data in a structured, commonly used, and machine-readable format.",
                ],
                [
                  "Right to Withdraw Consent",
                  "DPDP Act (Sec. 6) & GDPR (Art. 7)",
                  "Withdraw previously granted consent at any time, with the same ease with which consent was provided, without affecting prior lawful processing.",
                ],
              ],
            },
            {
              type: "p",
              text: "**How Requests Are Routed (Controller vs. Processor Data):**",
            },
            {
              type: "list",
              items: [
                "**For Direct Account, Billing & Marketing Data (Where Pyngyn is Data Fiduciary):** Submit your request directly to our Privacy Team as described in the Privacy Request Process below. We will authenticate your identity and fulfill your statutory request directly.",
                "**For Customer Workspace & ClientSpace Content (Where Pyngyn is Data Processor):** If you are an employee, contractor, or external client of a firm using Pyngyn, please submit your request directly to that firm's workspace administrator. As a Data Processor, Pyngyn is contractually required to forward any direct requests concerning workspace content to the customer organization and will provide all technical support necessary for them to fulfill your request.",
              ],
            },
          ],
        },
        {
          heading: "Practical Privacy Request & Grievance Process",
          blocks: [
            {
              type: "p",
              text: "To ensure that privacy requests and grievances are handled systematically and transparently, we adhere to the following documented operational workflow:",
            },
            {
              type: "list",
              items: [
                "**1. Submission:** You may submit an access, correction, erasure, or grievance request by emailing our designated Grievance Officer at **[vivek.pandey@pyngyn.com](mailto:vivek.pandey@pyngyn.com)** with the subject line `Data Privacy Request - [Your Name]`.",
                "**2. Identity Verification:** To protect your account from unauthorized disclosure or deletion, we verify your identity by confirming that the request originates from your registered account email, or by requesting matching confirmation tokens.",
                "**3. Recording & Logging:** Each request is assigned an internal tracking reference, logged in our compliance registry, and reviewed by our legal and security personnel.",
                "**4. Evaluation & Action:** We evaluate the request against applicable legal standards, verify whether statutory exceptions apply (such as mandatory tax ledger retention), and execute the necessary access, update, or deletion across our production systems.",
                "**5. Timely Response:** We provide a formal written resolution within **30 calendar days** of receiving your verified request, free of charge in accordance with DPDP and GDPR norms.",
                "**6. Internal Record of Resolution:** A permanent, confidential audit log of the request and resolution is maintained to demonstrate compliance to regulatory authorities.",
              ],
            },
          ],
        },
        {
          heading: "Consent Management & Cookie Controls",
          blocks: [
            {
              type: "p",
              text: "We believe privacy choices must be genuine and unbundled. We maintain the following controls across our public website and application:",
            },
            {
              type: "list",
              items: [
                "**Unbundled Consent:** We never bundle acceptance of non-essential marketing trackers with your acceptance of our Terms of Service or account creation.",
                "**Strict Opt-In for Trackers:** Third-party analytics (Google Analytics 4 / Google Tag Manager) and marketing scripts (Meta Pixel) remain completely uninitialized and blocked from executing on our marketing site until you click “Accept all” or enable them via “Customize” on our cookie banner.",
                "**Always-Accessible Preferences:** You can inspect or modify your cookie choices at any time by clicking the “Cookie preferences” link located in our website footer, or by visiting our **[Cookie Policy](/cookie-policy)**.",
                "**Authenticated Product Privacy:** The authenticated SaaS product at `app.pyngyn.ai` does not run third-party advertising or marketing tracking pixels. It uses only strictly necessary authentication tokens and functional session storage.",
              ],
            },
          ],
        },
        {
          heading: "Children's Privacy Protection (Section 9, DPDP Act 2023)",
          blocks: [
            {
              type: "p",
              text: "In strict compliance with Section 9 of India's DPDP Act, 2023 and international standards, Pyngyn defines a child as any individual under the age of eighteen (18) years. The Pyngyn platform, ClientSpace, and our marketing websites are designed exclusively for business professionals, corporate organizations, and adult practitioners. We do not knowingly solicit, collect, or process personal data of children under 18 years of age. If we become aware that personal data of a minor has been collected unintentionally, we take immediate steps to delete that data from our production databases.",
            },
          ],
        },
        {
          heading: "Policy Modifications & Notifications",
          blocks: [
            {
              type: "p",
              text: "We may update this Privacy Policy from time to time to reflect product enhancements, changes in our subprocessor ecosystem, or statutory guidance issued by the Data Protection Board of India. When we make material changes, we will notify you by posting a prominent notice on our website, updating the “Last updated” date at the top of this page, or sending an email notification to registered account administrators prior to the changes taking effect. We encourage you to review this page periodically to stay informed about our data stewardship practices.",
            },
          ],
        },
        {
          heading: "Designated Grievance Officer & Contact Information",
          blocks: [
            {
              type: "p",
              text: "If you have questions about this Privacy Policy, wish to exercise your rights as a Data Principal, or wish to register a formal privacy grievance, please contact our designated Grievance Officer:",
            },
            {
              type: "contact",
              heading: "Grievance Officer & Data Protection Officer",
              lines: [
                "Officer: Vivek Pandey",
                "Entity: VIMOVI GlobalTech Private Limited (Pyngyn)",
                "Email: **[vivek.pandey@pyngyn.com](mailto:vivek.pandey@pyngyn.com)**",
                "Alternative Contact: **[support@pyngyn.com](mailto:support@pyngyn.com)**",
                "Website: **[pyngyn.ai](https://pyngyn.ai)**",
                "Registered Office: Bengaluru, Karnataka, India",
                "Subject Line for Requests: Data Privacy Request – [Your Name / Organization]",
              ],
            },
          ],
        },
      ]}
    />
  );
}
