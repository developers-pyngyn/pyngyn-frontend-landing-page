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

// The rewards are set in Pyngyn's internal dashboard. This page is a static file (it must
// never fail, and next-on-pages has no ISR). Its HTML holds skeletons where the rewards go;
// ReferEarnLive reads the current values from the referral endpoint in the browser, fresh on
// every load and again while the tab is open. Do not make this page server-rendered
// (runtime "edge" / force-dynamic): on 7 Nov 2026 every server-rendered route on the live
// site answered 500.
//
// Search engines read the numbers only from the meta description and the FAQ JSON-LD, both
// built from DEFAULT_PROGRAM (lib/referralProgram.ts).
const seo = referralCopy(DEFAULT_PROGRAM);
const TITLE = "Refer & Earn with Pyngyn | Practice Referral Rewards";

export const metadata: Metadata = {
  title: TITLE,
  description: seo.metaDescription,
  alternates: { canonical: "/refer-and-earn" },
  openGraph: {
    title: TITLE,
    description: seo.metaDescription,
    url: "/refer-and-earn",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: seo.metaDescription,
    images: [OG_IMAGE.url],
  },
};

export default function ReferEarnPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: "/refer-and-earn",
            name: "Refer and earn | PYNGYN",
            description: seo.schemaDescription,
            breadcrumbId: "/refer-and-earn#breadcrumb",
          }),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Refer and earn", url: "/refer-and-earn" },
            ],
            "/refer-and-earn"
          ),
          faqPageSchema(seo.faq, "/refer-and-earn"),
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
