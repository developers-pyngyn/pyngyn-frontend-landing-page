"use client";

import React from "react";
import { PyngynWebsiteProduct } from "../product/website/PyngynWebsiteProduct";

export function ExecutiveDashboardMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full overflow-hidden bg-white select-none ${className}`}>
      <PyngynWebsiteProduct
        screen="audit"
        className="w-full h-full border-0 rounded-none shadow-none"
      />
    </div>
  );
}
