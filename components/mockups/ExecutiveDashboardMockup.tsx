"use client";

import React from "react";
import { PyngynWebsiteProduct } from "../product/website/PyngynWebsiteProduct";
import { WebsiteProductAnimator } from "../product/website/WebsiteProductAnimator";

export function ExecutiveDashboardMockup({ className = "" }: { className?: string }) {
  return (
    <WebsiteProductAnimator>
      <PyngynWebsiteProduct
        screen="audit"
        className={className}
      />
    </WebsiteProductAnimator>
  );
}
