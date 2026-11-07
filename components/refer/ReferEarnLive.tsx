"use client";

import { useEffect, useState } from "react";
import { ReferEarnContent } from "./ReferEarnContent";
import { watchReferralProgram, type ReferralProgram } from "@/lib/referralProgram";

/**
 * The Refer and earn page body. The static HTML shows skeletons where the rewards go
 * (never the built-in defaults, which may be out of date). In the browser the current
 * values are read from the referral endpoint on load, whenever the tab becomes visible
 * and every 30 seconds while it is visible, and update in place. If the endpoint can't
 * be read, the defaults replace the skeletons; a later successful read replaces them.
 *
 * `initial` is for tests: it renders a given program instead of the skeletons.
 */
export function ReferEarnLive({ initial = null }: { initial?: ReferralProgram | null }) {
  const [program, setProgram] = useState<ReferralProgram | null>(initial);

  useEffect(() => watchReferralProgram(setProgram), []);

  return <ReferEarnContent program={program} />;
}
