import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | PYNGYN",
  description:
    "Terms of Service governing your access to and use of Pyngyn ClientSpace and Workspace software applications and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      url="/terms"
      title="Terms of Service"
      updated="September 26, 2026"
      readAlongside="Read alongside our [Privacy Policy](/privacy), [Data Processing Agreement](/dpa), and [Refund Policy](/refund)."
      intro="These Terms of Service (“Terms”) constitute a binding legal agreement between you (“Customer,” “User,” or “you”) and VIMOVI GlobalTech Private Limited, operating under the brand “Pyngyn” (a DPIIT-recognized startup certified under ISO 9001:2015 for Quality Management Systems; “Pyngyn,” “we,” “us,” or “our”). These Terms govern your access to and use of our public websites at [pyngyn.ai](https://pyngyn.ai), our ClientSpace and Workspace software applications at [app.pyngyn.ai](https://app.pyngyn.ai), and all associated tools, APIs, calculators, and AI capabilities (together, the “Service(s)”). If you register for an account or access the Service on behalf of a company, partnership, accounting or CA firm, legal practice, consultancy, or other legal entity (“Organization”), you represent and warrant that you have full legal authority to bind that Organization to these Terms. In that case, “you” and “your” refers to that Organization. If you do not agree to these Terms, you must not access or use the Services."
      sections={[
        {
          heading: "Description of the Services",
          blocks: [
            {
              type: "p",
              text: "Pyngyn provides a cloud-based operating system purpose-built for professional services firms, chartered accountants, legal advisors, consultancies, agencies, and architecture practices. The Services comprise two core product components:",
            },
            {
              type: "list",
              items: [
                "**ClientSpace:** A dedicated, branded client portal environment enabling professional practices to share deliverables, exchange sensitive files, manage multi-stakeholder approval workflows, track project milestones, and communicate with external clients without fragmented email threads.",
                "**Workspace:** An internal operations platform providing project planning, team workload scheduling, statutory compliance tracking, billing coordination, and automated progress reporting.",
                "**AI Productivity Capabilities:** Integrated generative AI tools that assist practitioners with drafting project plans, structuring weekly client status reports, detecting delivery bottlenecks, and summarizing operational workflows.",
              ],
            },
          ],
        },
        {
          heading: "Account Registration, Authorized Users & Security Responsibilities",
          blocks: [
            {
              type: "list",
              items: [
                "**1.1 Accurate Credentials.** You agree to provide true, accurate, current, and complete information during registration on app.pyngyn.ai and to keep your organization and billing details updated at all times.",
                "**1.2 Managing Authorized Users.** Customer is responsible for managing and provisioning authorized users (including partners, staff, contractors, and invited external clients) and for ensuring that all authorized users comply with these Terms.",
                "**1.3 Keeping Credentials Secure.** Customer and its authorized users are responsible for keeping account credentials, passwords, and authentication tokens secure and confidential. Customer must immediately notify Pyngyn at **[vivek.pandey@pyngyn.com](mailto:vivek.pandey@pyngyn.com)** upon discovering any unauthorized access or security incident.",
                "**1.4 Lawful Use & Upload Authority.** Customer is responsible for using ClientSpace lawfully and warrants that it has all necessary rights, licenses, client consents, and legal authority to upload and process customer, client, and financial information within the platform.",
                "**1.5 Security Integrity & Tenant Boundaries.** Customer and its users shall not attempt to bypass security controls, probe platform vulnerabilities, access another customer's data or workspaces, or upload any viruses, worms, malware, or malicious code intended to compromise the service.",
                "**1.6 Age of Majority & Human Accounts.** The Service is a B2B platform available only to individuals who are at least eighteen (18) years of age. Accounts must be registered by human beings; programmatic bot registration without prior consent is prohibited.",
              ],
            },
          ],
        },
        {
          heading: "Customer Content, Intellectual Property & Ownership",
          blocks: [
            {
              type: "p",
              text: "We believe your firm's data should remain entirely yours. We clearly distinguish between what belongs to you and what belongs to Pyngyn:",
            },
            {
              type: "list",
              items: [
                "**Customer Content Ownership:** Customer retains 100% of all right, title, interest, and intellectual property in and to all data, documents, files, client records, project scopes, task data, financial computations, comments, and communications uploaded or submitted to the Service by Customer or its Authorized Users (“Customer Content”). Pyngyn claims zero ownership over Customer Content.",
                "**Limited Service License to Pyngyn:** Customer grants Pyngyn a worldwide, non-exclusive, royalty-free, limited license to host, copy, transmit, display, and process Customer Content solely to the extent necessary to provide, maintain, support, and secure the Services in accordance with these Terms and our [Data Processing Agreement](/dpa).",
                "**Pyngyn Intellectual Property:** Pyngyn and its licensors retain all right, title, and interest in and to the Services, including all software, source code, user interface designs, logos, trademarks, documentation, algorithms, and product architecture (“Pyngyn Property”). Nothing in these Terms grants Customer any right or license to Pyngyn Property except the limited right to access and use the Service during the subscription term.",
                "**Feedback:** If you submit suggestions, recommendations, or ideas regarding the Services (“Feedback”), Pyngyn may freely use, incorporate, and exploit such Feedback without any compensation, attribution, or accounting to you.",
              ],
            },
          ],
        },
        {
          heading: "Customer Responsibility for Client Data & Lawful Processing",
          blocks: [
            {
              type: "p",
              text: "Professional practices frequently upload confidential client documents, tax filings, audit papers, and business records into ClientSpace. Customer represents, warrants, and covenants that:",
            },
            {
              type: "list",
              items: [
                "**Authority and Lawful Grounds:** Customer has obtained all necessary rights, licenses, client consents, authorizations, or established valid legal grounds under applicable law (including India's DPDP Act, 2023 and professional conduct regulations) to upload, process, and transfer Customer Content into ClientSpace.",
                "**Client Privacy Notices:** Where required by law, Customer has provided appropriate privacy disclosures to its end-clients regarding the use of cloud-based portal software for engagement delivery.",
                "**Professional Review of Deliverables:** Customer exercises independent professional judgment and due diligence before relying on, acting upon, or transmitting any deliverables, calculations, or reports produced through the Service to its clients.",
                "**Confidentiality Compliance:** Customer's use of ClientSpace complies with all applicable professional secrecy and confidentiality rules governing Chartered Accountants, Advocates, Company Secretaries, or management consultants in their respective jurisdictions.",
              ],
            },
          ],
        },
        {
          heading: "Acceptable Use Policy & Restrictions",
          blocks: [
            {
              type: "p",
              text: "You agree that you will not, and will not permit any Authorized User or third party to:",
            },
            {
              type: "list",
              items: [
                "Disassemble, decompile, reverse-engineer, or attempt to derive the source code or underlying architecture of the Service;",
                "Access or query the Service through unauthorized automated means (such as scrapers, crawlers, or bots), except standard search engines indexing public marketing pages;",
                "Interfere with, disrupt, or compromise the integrity, security, or performance of the Service, servers, networks, or cloud hosting infrastructure;",
                "Upload or transmit any viruses, malware, worms, trojan horses, ransomware, or other malicious computer code;",
                "Bypass, disable, or circumvent any rate-limiting, authentication controls, encryption, or security measures implemented on the platform;",
                "Use the Service to transmit unsolicited commercial communications (spam) or violate any applicable telemarketing or electronic communication laws;",
                "Upload or process any content that infringes upon the intellectual property, privacy, publicity, or trade secret rights of any third party;",
                "Resell, sublicense, lease, rent, or distribute access to the Service to unauthorized third parties without Pyngyn's express written agreement.",
              ],
            },
          ],
        },
        {
          heading: "Confidentiality Obligations",
          blocks: [
            {
              type: "list",
              items: [
                "**5.1 Definition of Confidential Information.** “Confidential Information” means all non-public information disclosed by one party (“Disclosing Party”) to the other party (“Receiving Party”) that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and circumstances of disclosure. Customer Confidential Information includes all Customer Content. Pyngyn Confidential Information includes the non-public aspects of the Service, pricing proposals, and security audit documentation.",
                "**5.2 Protection Standards.** The Receiving Party agrees to: (i) protect the Disclosing Party's Confidential Information with the same degree of care it uses for its own confidential information of like kind (and not less than a reasonable degree of care); (ii) use Confidential Information solely to perform obligations or exercise rights under these Terms; and (iii) disclose Confidential Information only to employees, contractors, and subprocessors who have a need to know and are bound by confidentiality obligations no less restrictive than those herein.",
                "**5.3 Exclusions.** Confidential Information does not include information that: (i) is or becomes publicly known without breach of these Terms; (ii) was known to Receiving Party prior to disclosure without confidentiality breach; (iii) is independently developed without reference to Disclosing Party's Confidential Information; or (iv) is received from a third party without breach of any confidentiality obligation.",
                "**5.4 Compelled Disclosure.** If required by applicable court order or government subpoena to disclose Confidential Information, the Receiving Party will provide prompt advance written notice (where legally permissible) so the Disclosing Party may seek a protective order.",
              ],
            },
          ],
        },
        {
          heading: "Artificial Intelligence (AI) Features",
          blocks: [
            {
              type: "list",
              items: [
                "**6.1 Purpose of AI Features.** Pyngyn provides generative AI tools (such as project plan generation, status reporting, and workload summaries) to assist users with administrative operations. These features rely on enterprise model APIs provided by our AI partners (including Anthropic and Groq).",
                "**6.2 No Model Training on Customer Content.** Pyngyn does not use Customer Content, client files, or workspace project data to train base generative AI models without your explicit written consent. Our agreements with AI API providers strictly prohibit the use of customer inputs for model training.",
                "**6.3 No Transfer of Ownership.** You retain full ownership of all prompts and inputs submitted to AI features. Pyngyn assigns to Customer all its right, title, and interest (if any) in the specific outputs generated for Customer by the AI features.",
                "**6.4 Verification Responsibility.** Generative AI outputs are probabilistic and may occasionally contain inaccuracies, omissions, or outdated references. All AI-generated suggestions, project plans, and status reports are provided “as is” as working drafts, and Customer is solely responsible for reviewing, verifying, and approving all outputs before presenting them to clients or relying on them for business decisions.",
              ],
            },
          ],
        },
        {
          heading: "Data Protection, DPA & Regulatory Compliance",
          blocks: [
            {
              type: "p",
              text: "Both parties agree to comply with applicable data protection laws, including India's Digital Personal Data Protection Act, 2023 (DPDP Act) and the GDPR where applicable. With respect to Customer Content and personal data processed within ClientSpace, Customer is the Data Fiduciary (or Data Controller) and Pyngyn is the Data Processor. Personal data handling is governed by our **[Privacy Policy](/privacy)** and binding **[Data Processing Agreement](/dpa)**, which is incorporated into these Terms by reference. Customer is responsible for ensuring that all data uploaded or processed complies with applicable data protection requirements. Pyngyn may process and retain security information and technical logs as required for service security, fraud prevention, troubleshooting, and legal and regulatory compliance (including applicable Indian cybersecurity requirements). Customer authorizes Pyngyn to engage third-party Subprocessors as documented on our **[Subprocessors](/subprocessors)** directory, subject to the safeguards set forth in the DPA.",
            },
          ],
        },
        {
          heading: "Subscription Fees, Invoicing & Payment Terms",
          blocks: [
            {
              type: "list",
              items: [
                "**8.1 Pricing & Plans.** Customer agrees to pay all applicable subscription fees in accordance with the pricing schedule displayed on our website or set forth in an executed order form. Fees are billed in advance on a recurring monthly or annual basis.",
                "**8.2 Payment Processing via Razorpay.** Payments are processed securely via our PCI-DSS Level 1 compliant payment gateway partner, **Razorpay**. By subscribing, you authorize Razorpay and Pyngyn to charge your selected payment method (Credit/Debit Card, Net Banking, or UPI) for all recurring subscription charges until cancelled.",
                "**8.3 Taxes.** All subscription fees are exclusive of applicable taxes. In India, Goods and Services Tax (GST) will be charged at the statutory rate and itemized on tax invoices containing Customer's GSTIN where provided.",
                "**8.4 Automatic Renewal & Cancellation.** Subscriptions automatically renew at the end of each billing cycle unless cancelled prior to the renewal date. You may cancel your subscription renewal at any time directly through your account settings or by emailing **[vivek.pandey@pyngyn.com](mailto:vivek.pandey@pyngyn.com)**. Cancellations, prorated billing for upgrades, and refunds are governed by our **[Refund & Subscription Cancellation Policy](/refund)**.",
                "**8.5 Fee Adjustments.** Pyngyn reserves the right to modify subscription pricing upon at least thirty (30) days advance notice. Price changes will take effect only upon your next billing renewal.",
              ],
            },
          ],
        },
        {
          heading: "Service Availability & Maintenance",
          blocks: [
            {
              type: "p",
              text: "Pyngyn uses commercially reasonable efforts to ensure the Service is available 24 hours a day, 7 days a week, excluding scheduled maintenance windows and emergency repairs. Scheduled maintenance is conducted during off-peak hours with advance notice where feasible. Pyngyn does not provide an absolute uptime SLA unless explicitly agreed in a separate Enterprise Service Level Agreement. We maintain automated multi-region encrypted database snapshots to prevent data loss.",
            },
          ],
        },
        {
          heading: "Suspension, Termination & Post-Termination Data Handling",
          blocks: [
            {
              type: "list",
              items: [
                "**10.1 Suspension.** Pyngyn may suspend access to the Service immediately if: (i) subscription fees are past due; (ii) Customer breaches Section 4 (Lawful Processing) or Section 5 (Acceptable Use); (iii) Pyngyn reasonably suspects unauthorized account access; or (iv) required by law enforcement or regulatory authorities.",
                "**10.2 Termination for Convenience.** Customer may terminate its subscription at any time via account settings. Termination takes effect at the conclusion of the currently paid billing period.",
                "**10.3 Termination for Cause.** Either party may terminate these Terms immediately upon written notice if the other party materially breaches these Terms and fails to cure such breach within thirty (30) days of receiving written notice.",
                "**10.4 Data Handling, Retention & Deletion.** Data handling, retention, and deletion are governed by our [Privacy Policy](/privacy). Customer workspace data is additionally governed by the applicable [Data Processing Agreement](/dpa) and customer agreement. Following termination or expiration of your account, Pyngyn will return or delete Customer Content in accordance with the DPA and Privacy Policy, provided that Pyngyn may retain information where required or permitted by applicable law or necessary for legitimate legal, security, fraud-prevention, or statutory accounting requirements.",
              ],
            },
          ],
        },
        {
          heading: "Disclaimer of Warranties",
          blocks: [
            {
              type: "p",
              text: "EXCEPT AS EXPRESSLY PROVIDED HEREIN, THE SERVICES, PLATFORM, AND ALL CONTENT ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PYNGYN AND ITS DIRECTORS, OFFICERS, EMPLOYEES, AFFILIATES, AND LICENSORS EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING WITHOUT LIMITATION THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. PYNGYN DOES NOT WARRANT THAT THE SERVICES WILL BE COMPLETELY UNINTERRUPTED, ERROR-FREE, OR FREE OF VULNERABILITIES, OR THAT DELIVERABLES GENERATED BY AI WILL MEET ALL REGULATORY OR PROFESSIONAL CRITERIA WITHOUT HUMAN VERIFICATION.",
            },
          ],
        },
        {
          heading: "Limitation of Liability",
          blocks: [
            {
              type: "list",
              items: [
                "**12.1 Consequential Damages Waiver.** TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL EITHER PARTY BE LIABLE TO THE OTHER FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS INTERRUPTION, ARISING OUT OF OR IN CONNECTION WITH THE SERVICES OR THESE TERMS, REGARDLESS OF THE THEORY OF LIABILITY (CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE), EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
                "**12.2 Aggregate Liability Cap.** TO THE FULLEST EXTENT PERMITTED BY LAW, PYNGYN'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE TOTAL FEES ACTUALLY PAID BY CUSTOMER TO PYNGYN IN THE TWELVE (12) MONTHS PRECEDING THE INCIDENT GIVING RISE TO LIABILITY, OR ONE HUNDRED U.S. DOLLARS (USD $100 / INR EQUIVALENT), WHICHEVER IS GREATER.",
                "**12.3 Exceptions.** The limitations in Sections 12.1 and 12.2 shall not apply to: (i) Customer's breach of Section 5 (Acceptable Use Policy); (ii) Customer's payment obligations under Section 9; or (iii) liability which cannot be limited or excluded by applicable law.",
              ],
            },
          ],
        },
        {
          heading: "Mutual Indemnification",
          blocks: [
            {
              type: "list",
              items: [
                "**13.1 Customer Indemnification.** Customer agrees to defend, indemnify, and hold harmless Pyngyn, its officers, directors, employees, and agents from and against any third-party claims, damages, liabilities, costs, and reasonable attorney's fees arising out of or related to: (i) Customer Content uploaded without appropriate rights or consents; (ii) Customer's violation of professional conduct rules or client confidentiality obligations; or (iii) Customer's material breach of the Acceptable Use Policy.",
                "**13.2 Pyngyn Indemnification.** Pyngyn agrees to defend Customer against any third-party claim alleging that the core Pyngyn software infringes a valid patent, copyright, or trademark, and will indemnify Customer against damages finally awarded by a court of competent jurisdiction, provided Customer: (i) promptly gives Pyngyn written notice; (ii) grants Pyngyn sole control of the defense and settlement; and (iii) provides reasonable cooperation.",
              ],
            },
          ],
        },
        {
          heading: "Governing Law & Dispute Resolution",
          blocks: [
            {
              type: "list",
              items: [
                "**14.1 Governing Law.** These Terms and any dispute, controversy, or claim arising out of or relating to them or the Services shall be governed by, interpreted, and construed in accordance with the substantive laws of **India**, without regard to conflict of law principles.",
                "**14.2 Exclusive Court Jurisdiction.** Subject to Section 14.3, the civil courts located in **Bengaluru, Karnataka, India** shall have exclusive jurisdiction over any legal proceedings arising under these Terms.",
                "**14.3 Arbitration.** Any dispute, controversy, or claim arising out of or relating to these Terms or the breach, termination, or invalidity thereof, shall be referred to and finally resolved by binding arbitration conducted in accordance with the **Arbitration and Conciliation Act, 1996** (as amended). The arbitration shall be conducted by a sole arbitrator mutually appointed by the parties (or appointed in accordance with the Act). The seat and legal venue of arbitration shall be **Bengaluru, Karnataka, India**, and the proceedings shall be conducted in the **English language**.",
                "**14.4 Injunctive Relief.** Nothing in this Section prevents either party from seeking interim injunctive or equitable relief from a court of competent jurisdiction to prevent irreparable harm or protect intellectual property or confidentiality rights.",
              ],
            },
          ],
        },
        {
          heading: "General Provisions",
          blocks: [
            {
              type: "list",
              items: [
                "**15.1 Entire Agreement.** These Terms, together with the Privacy Policy, Data Processing Agreement, and Refund Policy, constitute the complete and exclusive understanding between the parties and supersede all prior agreements, proposals, and communications.",
                "**15.2 Modifications.** We may revise these Terms from time to time. When material changes are made, we will provide at least thirty (30) days advance notice via email or a prominent banner on the Service. Your continued use after the effective date constitutes acceptance of the revised Terms.",
                "**15.3 Severability.** If any provision of these Terms is found to be unlawful, void, or unenforceable, that provision will be severed without affecting the validity and enforceability of the remaining provisions.",
                "**15.4 Assignment.** You may not assign or transfer your rights or obligations under these Terms without Pyngyn's prior written consent. Pyngyn may assign these Terms in connection with a merger, acquisition, corporate reorganization, or sale of assets.",
                "**15.5 Force Majeure.** Neither party shall be liable for delay or failure in performance resulting from causes beyond reasonable control, including acts of God, natural disasters, telecommunications outages, war, terrorism, or widespread internet disruptions.",
              ],
            },
          ],
        },
        {
          heading: "Legal Inquiries & Contact",
          blocks: [
            {
              type: "p",
              text: "If you have any questions regarding these Terms of Service or wish to deliver formal legal notices, please contact us at:",
            },
            {
              type: "contact",
              heading: "Legal Department — VIMOVI GlobalTech Private Limited",
              lines: [
                "Entity: VIMOVI GlobalTech Private Limited (Pyngyn)",
                "Attention: Legal / Vivek Pandey",
                "Email: **[vivek.pandey@pyngyn.com](mailto:vivek.pandey@pyngyn.com)**",
                "Support: **[support@pyngyn.com](mailto:support@pyngyn.com)**",
                "Website: **[pyngyn.ai](https://pyngyn.ai)**",
                "Location: Bengaluru, Karnataka, India",
              ],
            },
          ],
        },
      ]}
    />
  );
}
