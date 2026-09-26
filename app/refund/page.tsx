import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Refund & Subscription Cancellation Policy | PYNGYN",
  description:
    "Refund and subscription cancellation policy for Pyngyn ClientSpace and Workspace software applications.",
  alternates: { canonical: "/refund" },
};

export default function RefundPage() {
  return (
    <LegalPage
      url="/refund"
      title="Refund & Subscription Cancellation Policy"
      updated="September 26, 2026"
      readAlongside="Read alongside our [Terms of Service](/terms), [Privacy Policy](/privacy), and [Pricing](/pricing)."
      intro="This Refund & Subscription Cancellation Policy governs subscription cancellations, automatic renewal, prorated billing for plan upgrades and seat additions, and limited refund exceptions for Pyngyn ClientSpace and Workspace software services, operated by VIMOVI GlobalTech Private Limited (“Pyngyn,” “we,” “us,” or “our”). We are committed to predictable, transparent, and fair billing for professional practices, Chartered Accountants, legal advisors, and corporate organizations."
      sections={[
        {
          heading: "Subscription Cancellation Policy",
          blocks: [
            {
              type: "p",
              text: "We believe in complete operational control and flexibility for your practice. You may cancel your subscription at any time without cancellation penalties or exit fees:",
            },
            {
              type: "list",
              items: [
                "**Cancel Anytime:** Customers may cancel their active subscription at any time directly through their account billing settings on [app.pyngyn.ai](https://app.pyngyn.ai) or by emailing our billing team at **[vivek.pandey@pyngyn.com](mailto:vivek.pandey@pyngyn.com)**.",
                "**Stops Next Automatic Renewal:** A valid cancellation request immediately stops the next scheduled automatic recurring charge for your account.",
                "**Continued Access Through Paid Period:** Cancellation does not immediately terminate access to the paid service. Your practice, practitioners, and invited client portals will retain full access to all features, deliverables, and workspace records under your paid plan until the end of the current paid billing period.",
                "**Non-Refundable for Ongoing Billing Period:** Subscription payments are non-refundable for the ongoing or current billing period. This applies to unused days, voluntary early termination, or partial use of the service during the billing cycle.",
                "**No Automatic Prorated Refunds for Cancellation:** Cancelling a subscription does not automatically create, entitle, or trigger a prorated refund, credit, or cash payout for the remaining unused days of the current billing cycle.",
              ],
            },
          ],
        },
        {
          heading: "Automatic Renewal & Billing Cycles",
          blocks: [
            {
              type: "p",
              text: "To ensure uninterrupted access to statutory client portals, working papers, and workflow automations, subscriptions renew automatically:",
            },
            {
              type: "list",
              items: [
                "**Billing Frequency:** Subscriptions are billed in advance on either a monthly or annual recurring cycle, depending on the option selected at checkout or in your account settings.",
                "**Next Renewal Date Visibility:** Your next scheduled renewal date, current billing tier, and seat count are displayed clearly in your account billing settings at all times.",
                "**Cancelling Before Renewal Date:** Cancelling your subscription before the next scheduled renewal date prevents the upcoming subscription charge from taking place.",
                "**No Unauthorized Charges After Cancellation:** Pyngyn will not charge your payment method again after a valid cancellation has been processed, unless you subsequently start a new subscription, reactivate your account, or otherwise explicitly authorize a charge.",
              ],
            },
          ],
        },
        {
          heading: "Prorated Billing Rules (Upgrades & Add-ons)",
          blocks: [
            {
              type: "p",
              text: "When your firm expands or requires additional capability mid-cycle, we apply fair prorated billing rules:",
            },
            {
              type: "list",
              items: [
                "**Plan Upgrades Mid-Cycle:** If you upgrade your plan during an active billing cycle (for example, moving from the Pro tier to the Business tier with the Workload Cockpit), the applicable prorated amount for the remaining days of the current billing period is calculated. The unused portion of your existing subscription fee is credited against the upgraded tier, and only the net prorated difference is charged.",
                "**Additional Users, Seats & Add-Ons:** If your practice adds additional practitioner seats, reviewer accounts, or storage add-ons during an active billing cycle, prorated billing is applied for the additional seats for the remaining days of the current cycle. At your next regular renewal, the updated seat count is billed for the full cycle.",
                "**Pre-Confirmation Price Disclosure:** Whenever our billing flow or payment checkout supports a plan change or seat addition, the exact prorated amount payable immediately and the new recurring renewal amount are clearly displayed for your review before you confirm the change.",
                "**Plan Downgrades & Reductions:** If you downgrade to a lower-tier plan or reduce your seat count, the change takes effect at the end of your current paid billing period. You retain full access to your existing plan features and seats through the remainder of the paid term, and the reduced rate applies starting with your next renewal date.",
              ],
            },
          ],
        },
        {
          heading: "Free Trial Terms",
          blocks: [
            {
              type: "p",
              text: "We want you to experience ClientSpace with complete confidence. We offer a 7-day free trial on paid plans with no credit card required to start:",
            },
            {
              type: "list",
              items: [
                "**No Credit Card Required:** You can test client portals, compliance calendars, and task assignments for 7 days without entering payment details.",
                "**Zero Charges on Expiry:** If you choose not to upgrade to a paid subscription by the end of the trial period, your trial expires automatically and no charges are incurred.",
                "**Preserving Trial Data:** If you upgrade during or immediately after the trial, all client portals, working papers, and firm configurations created during the trial are seamlessly preserved.",
              ],
            },
          ],
        },
        {
          heading: "Limited Refund Exceptions",
          blocks: [
            {
              type: "p",
              text: "While subscription payments are generally non-refundable, Pyngyn may provide a prorated refund or billing credit under strict, limited exceptions:",
            },
            {
              type: "table",
              headers: ["Exception Category", "Eligibility Criteria", "Resolution"],
              rows: [
                [
                  "Material Service Failure",
                  "Where Pyngyn materially fails to provide the subscribed Service as agreed—specifically, an extended, severe, and uncured technical outage attributable solely to Pyngyn that prevents normal use for a substantial portion of the billing period.",
                  "Prorated refund or billing credit for the affected downtime period, upon investigation and verification by our engineering team.",
                ],
                [
                  "Statutory & Legal Requirements",
                  "Where a refund is explicitly mandated by applicable statutory law, Indian consumer protection regulations, or an executed enterprise agreement.",
                  "Refund issued in accordance with the statutory requirement or contractual mandate.",
                ],
                [
                  "Administrative Billing Errors",
                  "Where an erroneous duplicate charge, incorrect seat count calculation, or payment gateway processing glitch occurred.",
                  "Prompt 100% refund of the overcharged or duplicate amount to the original payment method upon verification.",
                ],
              ],
            },
            {
              type: "p",
              text: "Please note that ordinary cancellation, lack of user adoption, change of mind, inability to utilize the platform due to external factors, or unused subscription days do **not** constitute grounds for a refund. Pyngyn does not offer a general 30-day money-back guarantee or discretionary refund window.",
            },
          ],
        },
        {
          heading: "Dispute Resolution & Payment Inquiries",
          blocks: [
            {
              type: "p",
              text: "If you believe an incorrect charge has occurred on your account, please reach out to our billing team directly before initiating a chargeback or payment gateway dispute. Most billing questions, invoice corrections, and GST adjustments can be resolved quickly by contacting our support team directly.",
            },
          ],
        },
        {
          heading: "Billing & Refund Contact",
          blocks: [
            {
              type: "p",
              text: "For any questions regarding cancellations, plan upgrades, prorated billing calculations, or invoice inquiries, please contact our official billing department:",
            },
            {
              type: "contact",
              heading: "Billing Department — VIMOVI GlobalTech Private Limited",
              lines: [
                "Entity: VIMOVI GlobalTech Private Limited (Pyngyn)",
                "Attention: Billing & Accounts / Vivek Pandey",
                "Email: vivek.pandey@pyngyn.com",
                "Operating Brand: Pyngyn (DPIIT Recognized Startup & ISO 9001:2015 Certified QMS)",
                "Registered Office: Bengaluru, Karnataka, India",
                "Response Time: Billing inquiries are reviewed within one to two business days.",
              ],
            },
          ],
        },
      ]}
    />
  );
}
