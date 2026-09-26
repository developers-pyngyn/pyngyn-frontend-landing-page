"use client";

import React, { useState, useEffect, useRef } from "react";
import { DesktopMockupFrame } from "./DesktopMockupFrame";
import { PyngynTaskWorkflowView } from "@/components/product-demo";

export function WorkflowShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // IntersectionObserver to start/stop loop when in/out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="see-it-in-action"
      ref={containerRef}
      className="relative overflow-hidden py-[90px] lg:py-[120px] bg-white border-b border-slate-200"
    >
      <div className="wrap">
        {/* Section Header */}
        <div className="mx-auto max-w-[840px] text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-gradient-to-r from-slate-50 via-pink-50/40 to-slate-50 px-3.5 py-1 text-[12px] font-semibold text-[#14223d] shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#14223d] to-[#db2777] animate-pulse" />
            <span>Lifecycle In Motion • Autonomous Practice Workflow</span>
          </div>

          <h2 className="mt-4 font-display text-[clamp(28px,4.5vw,46px)] font-bold tracking-tight text-slate-950 leading-[1.15]">
            See it in action.{" "}
            <span className="bg-gradient-to-r from-[#14223d] via-[#7c3aed] to-[#db2777] bg-clip-text text-transparent">
              From overdue filing to verified &amp; synced.
            </span>
          </h2>

          <p className="mt-3.5 text-[clamp(15px,1.6vw,18px)] text-slate-600 leading-relaxed max-w-[680px] mx-auto">
            Watch how a compliance task moves seamlessly from associate execution through partner scrutiny and client portal synchronization—without chasing emails or spreadsheet trackers.
          </p>
        </div>

        {/* Unified Desktop Mockup Frame with Real Product Components */}
        <DesktopMockupFrame
          url="app.pyngyn.com/clients/oswal-exports/tasks"
          imageHeight={880}
          baseWidth={1440}
          maxWidthClass="max-w-[1240px]"
        >
          <div className="w-full h-full">
            <PyngynTaskWorkflowView
              autoPlay={isInView}
              workflowMode="gstr1"
            />
          </div>
        </DesktopMockupFrame>
      </div>
    </section>
  );
}
