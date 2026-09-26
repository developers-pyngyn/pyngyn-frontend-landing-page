"use client";

import React from "react";
import { PyngynWorkloadDemo } from "../product-demo/PyngynWorkloadDemo";

export function WorkloadCockpitMockup({ className = "" }: { className?: string }) {
  return <PyngynWorkloadDemo className={className} />;
}
