import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy | PYNGYN",
  description: "How refunds and cancellations work for PYNGYN subscriptions.",
  alternates: { canonical: "/refund" },
};

export default function RefundPage() {
  return (
    <LegalPage
      url="/refund"
      title="Refund Policy"
      updated="May 2026"
      intro="This Refund Policy explains how cancellations and refunds work for PYNGYN subscriptions. We want you to be happy with the Service, so if something isn't right, please reach out."
      sections={[
        {
          heading: "Free trial",
          blocks: [{ type: "p", text: "Paid plans include a free trial. You will not be charged during the trial, and you can cancel anytime before it ends without any charge. No credit card is required to start." }],
        },
        {
          heading: "Monthly subscriptions",
          blocks: [{ type: "p", text: "Monthly plans are billed in advance each month. You can cancel anytime; your plan remains active until the end of the current billing period, and you will not be billed again. Monthly fees already paid are generally non-refundable." }],
        },
        {
          heading: "Annual subscriptions",
          blocks: [{ type: "p", text: "Annual plans are billed in advance for the year. If you cancel within 14 days of an annual purchase or renewal, you may request a full refund. After 14 days, annual fees are non-refundable, though you retain access through the end of the paid term." }],
        },
        {
          heading: "How to request a refund",
          blocks: [{ type: "p", text: "To request a refund or cancel, email vivek.pandey@pyngyn.com from the address on your account, or cancel from your account settings. We aim to respond within two business days." }],
        },
        {
          heading: "Exceptions",
          blocks: [{ type: "p", text: "We may grant refunds outside this policy at our discretion, for example in cases of prolonged service outages or billing errors. Refunds required by applicable law will always be honored." }],
        },
        {
          heading: "Contact",
          blocks: [{ type: "p", text: "Questions about billing or refunds? Email vivek.pandey@pyngyn.com." }],
        },
      ]}
    />
  );
}
