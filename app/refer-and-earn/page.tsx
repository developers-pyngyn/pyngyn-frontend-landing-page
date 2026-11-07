import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { ReferEarnContent } from "@/components/refer/ReferEarnContent";
import { getReferralProgram, referralCopy } from "@/lib/referralProgram";
import {
  JsonLd,
  breadcrumbSchema,
  faqPageSchema,
  webPageSchema,
  OG_IMAGE,
} from "@/components/schema";

// The rewards are set in Pyngyn's internal dashboard and read from the referral
// endpoint at request time, so a change shows here without a redeploy. Cloudflare
// (next-on-pages) has no ISR, so the page renders on the edge on each request; the
// endpoint caches its answer for 5 minutes and the page falls back to today's values.
export const runtime = "edge";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Refer & Earn with Pyngyn | Practice Referral Rewards",
  description:
    "Recommend Pyngyn ClientSpace to fellow Chartered Accountants and firm leaders. Earn generous recurring commissions and credits for every practice that joins.",
  alternates: { canonical: "/refer-and-earn" },
  openGraph: {
    title: "Refer & Earn with Pyngyn | Practice Referral Rewards",
    description:
      "Recommend Pyngyn ClientSpace to fellow Chartered Accountants and firm leaders. Earn generous recurring commissions and credits for every practice that joins.",
    url: "/refer-and-earn",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Refer & Earn with Pyngyn | Practice Referral Rewards",
    description:
      "Recommend Pyngyn ClientSpace to fellow Chartered Accountants and firm leaders. Earn generous recurring commissions.",
    images: [OG_IMAGE.url],
  },
};

export default async function ReferEarnPage() {
  const program = await getReferralProgram();
  const copy = referralCopy(program);
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/refer-and-earn",
            name: "Refer and earn | PYNGYN",
            description: copy.schemaDescription,
            breadcrumbId: "/refer-and-earn#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Refer and earn", url: "/refer-and-earn" },
            ],
            "/refer-and-earn"
          ),
          faqPageSchema(copy.faq, "/refer-and-earn"),
        ]}
      />
      <Navbar />
      <main id="main">
        <ReferEarnContent program={program} />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
