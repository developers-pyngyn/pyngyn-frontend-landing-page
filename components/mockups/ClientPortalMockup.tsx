"use client";

import React from "react";
import { PyngynClientSpaceView } from "../product-demo/PyngynClientSpaceView";
import { PyngynProductCamera } from "../product-demo/PyngynProductCamera";

export function ClientPortalMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden bg-[#F8FAFC] ${className || "rounded-[14px] border border-slate-200/90 shadow-xl"}`}>
      <PyngynProductCamera nativeWidth={1440} nativeHeight={880}>
        <PyngynClientSpaceView
          clientName="Oswal Exports"
          firmName="Sharma & Associates"
          className="w-full h-full"
          autoPlay={true}
        />
      </PyngynProductCamera>
    </div>
  );
}
