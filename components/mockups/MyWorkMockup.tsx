"use client";

import React from "react";
import { PyngynMyWorkDemo } from "../product-demo/PyngynMyWorkDemo";

export function MyWorkMockup({ className = "" }: { className?: string }) {
  return <PyngynMyWorkDemo className={className} alwaysShowCelebration={true} />;
}
