"use client";

import React from "react";
import { PyngynCalendarView } from "../product-demo/PyngynCalendarView";

export function StatutoryCalendarMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full overflow-hidden bg-white select-none ${className}`}>
      <PyngynCalendarView autoPlay={true} className="w-full h-full border-0 rounded-none shadow-none" />
    </div>
  );
}
