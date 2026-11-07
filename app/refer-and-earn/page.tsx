import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { FinalCTA, Footer } from "@/components/Footer";
import { ReferEarnLive } from "@/components/refer/ReferEarnLive";
import { DEFAULT_PROGRAM, referralCopy } from "@/lib/referralProgram";
import {
  JsonLd,
  breadcrumbSchema,
  faqPageSchema,
  webPageSchema,
  OG_IMAGE,
} from "@/components/schema";

// The rewards are set in Pyngyn's internal dashboard. This page is a static file built
// with today's values (it must never fail, and next-on-pages has no ISR); ReferEarnLive
// reads the current values from the referral endpoint in the browser and swaps them in.
// Do not make this page server-rendered (runtime "edge" / force-dynamic): on 7 Nov 2026
// every server-rendered route on the live site answered 500.

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

export default function ReferEarnPage() {
  // Search engines read the FAQ data built with the defaults; visitors see the live values.
  const copy = referralCopy(DEFAULT_PROGRAM);
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
        <ReferEarnLive />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
