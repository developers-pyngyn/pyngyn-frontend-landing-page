import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | PYNGYN",
  description:
    "How Vimovi Global Tech (Pyngyn) collects, uses, and protects your information under GDPR and the DPDP Act.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      url="/privacy"
      title="Pyngyn Privacy Policy"
      updated="June 22, 2026"
      intro="Welcome to Pyngyn. Your privacy is extremely important to us. Because Pyngyn is a business-to-business (B2B) platform, the way we handle your data depends on how you interact with our service. This Privacy Policy explains what data we collect, why we collect it, our legal bases for doing so under the General Data Protection Regulation (“GDPR”) and the Digital Personal Data Protection Act (“DPDP Act”), and how you can exercise your rights. If you do not agree to our use of your personal data in line with this policy, please do not use the Pyngyn Services."
      sections={[
        {
          heading: "Our Role: Controller vs. Processor",
          blocks: [
            {
              type: "p",
              text: "To understand how your data is managed, it is important to understand the distinct roles Pyngyn plays, depending on how you interact with us:",
            },
            {
              type: "list",
              items: [
                "**As a Data Controller:** When you create an account, request customer support, book a demo, or browse our public website, Pyngyn acts as the Data Controller. We determine how and why this operational, billing, marketing, and account data is processed.",
                "**As a Data Processor:** For all the project data, tasks, comments, and files you create or upload within a corporate workspace, your employer or organization is the Data Controller. Pyngyn acts solely as the Data Processor. We only process this workspace data based strictly on the instructions of the parent organization (the Controller) through executed Data Processing Agreements (DPAs).",
              ],
            },
          ],
        },
        {
          heading: "What Data We Collect & Our Legal Basis",
          blocks: [
            { type: "p", text: "We collect specific categories of data mapped to established lawful bases." },
            { type: "p", text: "**A. Data We Control (Account, Marketing & Operations)**" },
            {
              type: "table",
              headers: ["Category", "Why we collect it", "Legal basis"],
              rows: [
                [
                  "Identity & Contact Data, first name, last name, email, and authentication credentials. Sign-up, login, and credential storage are managed on our behalf by **Clerk**, our identity and authentication sub-processor.",
                  "To provision your account, secure your identity, and send critical system notifications.",
                  "Performance of a Contract (GDPR Art. 6(1)(b)) / Fulfilling an explicit service request (DPDP Act Sec. 4).",
                ],
                [
                  "Billing & Transaction Data, billing name, billing email, phone number, transaction amount, payment status, payment identifiers, and truncated card details (last 4 digits / UPI VPA).",
                  "To process your subscription payments, handle invoices, and prevent transaction fraud. Raw card numbers are processed directly by our PCI-DSS compliant partner, **Razorpay**, and never touch our servers.",
                  "Performance of a Contract (GDPR Art. 6(1)(b)).",
                ],
                [
                  "Marketing & Analytics Telemetry, cookie identifiers, tracking IDs, page interactions, and timestamps captured via Google Tag Manager (GA4) and the Meta/Facebook Pixel.",
                  "To track site performance, optimize user flows, and run targeted ad campaigns.",
                  "Explicit, Freely Given Consent (GDPR Art. 6(1)(a)). These trackers remain strictly blocked by default until you interact with our cookie consent banner.",
                ],
                [
                  "AI Feature Inputs, information submitted to AI-powered features, including project data, task data, workspace content, user prompts, and support requests.",
                  "Processed transiently to generate AI-assisted outputs such as task generation, support assistance, organizational reporting, workload recommendations, and project insights.",
                  "Legitimate Interest / Performance of a service request. This data is passed instantly to our AI processing partner, **Anthropic**, and is not permanently recorded or saved in Pyngyn's internal databases.",
                ],
                [
                  "Communications Data, support ticket histories, issue subjects, and diagnostic communications.",
                  "To troubleshoot platform exceptions and provide customer support.",
                  "Legitimate Interest / Legitimate Use (GDPR Art. 6(1)(f) / DPDP Act Sec. 7).",
                ],
                [
                  "Technical & Security Telemetry, IP addresses, user-agent strings, and edge ingress access logs.",
                  "Essential for cyber defense, real-time rate-limiting, and maintaining the stability of our cloud boundaries.",
                  "Legitimate Interest / Legitimate Use (GDPR Art. 6(1)(f) / DPDP Act Sec. 7).",
                ],
              ],
            },
            { type: "p", text: "**B. Data We Process (Workspace Content)**" },
            {
              type: "list",
              items: [
                "**Workspace Assets:** projects, tasks, comments, files, user assignments, project participation records, activity logs, and information submitted to AI-powered features. AI functionality may analyze this data to generate task recommendations, organizational summaries, support responses, workload insights, and other requested outputs. Processed to deliver the core project management functionality, handled strictly on behalf of the customer organization (Performance of a Contract with the enterprise client).",
              ],
            },
          ],
        },
        {
          heading: "Data Retention Periods",
          blocks: [
            {
              type: "p",
              text: "We only keep personal data for as long as reasonably necessary to fulfill the purposes for which it was collected, or as required or permitted by law.",
            },
            {
              type: "list",
              items: [
                "**Account & Identity Data:** Retained for the duration of your active subscription or contract, plus a standard 30-day grace period following account deletion, after which it is permanently purged from our primary database.",
                "**Security Telemetry (IP Logs):** Directed to automated deletion sinks within our Google Cloud Platform (GCP) infrastructure and permanently erased after 30 days.",
                "**Workspace Content:** Dictated entirely by the enterprise customer's retention policies and DPA. When a corporate customer terminates their contract, all associated workspace payload data is securely wiped according to their specific instructions.",
                "**Statutory Exceptions to Deletion:** If you have processed payments on our platform, financial transaction data and associated billing logs cannot be deleted immediately upon account closure due to statutory financial, tax, and anti-money laundering reporting obligations. Upon an erasure request, your profile link will be permanently anonymized, but core ledger records will be securely retained for the legally mandated statutory period under GDPR Art. 17(3)(b).",
              ],
            },
          ],
        },
        {
          heading: "Outside Contractors & Sub-processors",
          blocks: [
            {
              type: "p",
              text: "Pyngyn does not sell your personal data. We employ independent contractors, vendors, and infrastructure partners (collectively, “Outside Contractors”) to provide specific services related to the Pyngyn Service, such as hosting, payment processing, and AI-assisted features. We only share data with trusted sub-processors required to deliver our service and securely operate our platform:",
            },
            {
              type: "list",
              items: [
                "**Cloud Infrastructure:** Google Cloud Platform (GCP) is utilized for hosting our application, maintaining our multi-tenant PostgreSQL databases, and securely encrypting cloud storage buckets.",
                "**Identity & Authentication:** Clerk (account sign-up, login, session management, and single sign-on for app.pyngyn.ai).",
                "**Payment Processing:** Razorpay (processing transaction metadata, invoicing, and billing under PCI-DSS compliance).",
                "**AI Processing:** Anthropic (transient processing of text inputs entered into our free AI dashboard tools; no persistent data storage).",
                "**Scheduling:** Calendly (managing public demo bookings, organizer notifications, names, and emails).",
                "**Analytics & Marketing:** Google LLC (GA4) and Meta Platforms, Inc. (Meta Pixel) for user behavioral tracking upon explicit consent.",
              ],
            },
            {
              type: "p",
              text: "We require that these Outside Contractors agree to (1) protect the privacy of your personally identifiable information consistent with this Privacy Policy, and (2) not use or disclose your personally identifiable information for any purpose other than providing us with the products or services for which we contracted, or as required by law. All sub-processors are bound by strict confidentiality obligations and GDPR/DPDP-compliant data processing agreements. See our full **[Subprocessors](/subprocessors)** list and **[Data Processing Agreement](/dpa)** for details.",
            },
          ],
        },
        {
          heading: "Your Data Privacy Rights",
          blocks: [
            {
              type: "p",
              text: "Depending on your region, you have the following rights regarding your personal data:",
            },
            {
              type: "list",
              items: [
                "**Right to Access:** You may request a copy of the personal data we hold about you.",
                "**Right to Rectification:** You may request correction of inaccurate or incomplete personal data.",
                "**Right to Erasure:** You may request deletion of your personal data where it is no longer necessary for the purposes for which it was collected.",
                "**Right to Restriction of Processing:** You may request that we restrict processing of your personal data in certain circumstances.",
                "**Right to Data Portability:** You may request to receive your personal data in a structured, commonly used, machine-readable format.",
                "**Right to Object:** You may object to processing based on legitimate interests, direct marketing, or profiling.",
                "**Right to Withdraw Consent:** Where processing is based on consent, you may withdraw that consent at any time without affecting the lawfulness of prior processing.",
              ],
            },
            { type: "p", text: "**How to exercise your rights:**" },
            {
              type: "list",
              items: [
                "**For Account & Technical Data (Controller Data):** If you wish to access, correct, or delete your Pyngyn profile details, billing history, or support history, you can submit a request directly to us using the contact information below.",
                "**For Workspace Content (Processor Data):** If you wish to delete a specific task, comment, or file within your company's project environment, you must contact your organization's workspace administrator. Because Pyngyn is the Data Processor for this content, we cannot modify or delete enterprise data without direct authorization from the account owner (your employer).",
              ],
            },
          ],
        },
        {
          heading: "Where Will Data Be Transferred?",
          blocks: [
            {
              type: "p",
              text: "Your data, including personal data that we collect from you, may be transferred to, stored at, and processed by us and other third parties outside the country in which you reside, including, but not limited to, the United States, where data protection and privacy regulations may not offer the same level of protection as in other parts of the world. By using our platform, you agree to this transfer, storing, or processing, subject to the terms of our applicable Data Processing Agreements. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this policy.",
            },
          ],
        },
        {
          heading: "Do We Collect Information from Children?",
          blocks: [
            {
              type: "p",
              text: "We are committed to protecting the privacy of children. The Pyngyn Service is a B2B platform and is not designed for or directed to children under the age of 16. We do not knowingly collect personally identifiable information from any person we actually know is under the age of 16.",
            },
          ],
        },
        {
          heading: "How Will Information Be Secured?",
          blocks: [
            {
              type: "p",
              text: "We take precautions to protect the security of your information. We have physical, electronic, and managerial procedures in place to help safeguard, prevent unauthorized access, maintain data security, and correctly use your information. However, no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.",
            },
          ],
        },
        {
          heading: "How Will I Know if There Are Any Changes to This Privacy Policy?",
          blocks: [
            {
              type: "p",
              text: "We may revise this Privacy Policy from time to time. We will not make changes that result in significant additional uses or disclosures of your personal data without notifying you of such changes via email. We will also make non-significant changes to this Privacy Policy for which an email is not required. We encourage you to check this page periodically for any changes. Your continued use of the Pyngyn Service following the posting of changes to this Privacy Policy constitutes your acceptance of those changes.",
            },
          ],
        },
        {
          heading: "Contact for Data Requests",
          blocks: [
            {
              type: "p",
              text: "If you have any questions about this Privacy Policy, wish to exercise your rights as a data principal, or need to contact our Data Protection Officer (DPO), please reach out to us at:",
            },
            {
              type: "contact",
              heading: "Privacy & Compliance Team",
              lines: [
                "Data Protection Officer: Vivek Pandey",
                "Email: **[vivek.pandey@pyngyn.com](mailto:vivek.pandey@pyngyn.com)**",
                "Subject Line: Data Subject Request – [Your Name]",
              ],
            },
          ],
        },
      ]}
    />
  );
}
