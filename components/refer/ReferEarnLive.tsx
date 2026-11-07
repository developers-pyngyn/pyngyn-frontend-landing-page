"use client";

import { useEffect, useState } from "react";
import { ReferEarnContent } from "./ReferEarnContent";
import { DEFAULT_PROGRAM, getReferralProgram, type ReferralProgram } from "@/lib/referralProgram";

/**
 * The Refer and earn page body. The HTML is built with today's values (so the page is
 * a plain static file that can never fail to render), then the browser reads the
 * current rewards from the referral endpoint and swaps them in. A dashboard change
 * shows within the endpoint's 5-minute cache, with no redeploy. Any failure keeps
 * the defaults.
 */
export function ReferEarnLive({ initial = DEFAULT_PROGRAM }: { initial?: ReferralProgram }) {
  const [program, setProgram] = useState<ReferralProgram>(initial);

  useEffect(() => {
    let alive = true;
    getReferralProgram().then((p) => {
      if (alive) setProgram(p);
    });
    return () => {
      alive = false;
    };
  }, []);

  return <ReferEarnContent program={program} />;
}
