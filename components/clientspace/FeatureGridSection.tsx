"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Calendar,
  PieChart,
  Kanban,
  Users,
  Clock,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { EASE_OUT, MOTION_TIMINGS } from "./motionTokens";
import {
  PyngynCalendarView,
  PyngynWorkloadView,
  PyngynBoardView,
  PyngynClientSpaceView,
  PyngynCelebrationOverlay,
} from "../product-demo";

/**
 * Scaled Product Component Wrapper for Secondary Feature Cards
 * Displays the real React component rendered at desktop dimensions,
 * scaled down proportionally with zero letterboxing or reflow.
 */
function ScaledFeaturePreview({
  children,
  virtualWidth = 1100,
  virtualHeight = 620,
  height = 230,
}: {
  children: React.ReactNode;
  virtualWidth?: number;
  virtualHeight?: number;
  height?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.44);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      if (w > 0) setScale(w / virtualWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [virtualWidth]);

  return (
    <div
      ref={containerRef}
      className="mt-6 relative w-full overflow-hidden rounded-xl border border-slate-200/90 bg-slate-50 shadow-2xs select-none"
      style={{ height: `${height}px` }}
    >
      <div
        style={{
          width: `${virtualWidth}px`,
          height: `${virtualHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      >
        {children}
      </div>
      {/* Bottom subtle gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/70 to-transparent pointer-events-none" />
    </div>
  );
}

export function FeatureGridSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();

  // 1. Calendar Chip Pulse State (3.5s loop while in view)
  const [calendarPulsing, setCalendarPulsing] = useState(false);
  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setCalendarPulsing(true);
      const timer = setTimeout(() => {
        setCalendarPulsing(false);
      }, MOTION_TIMINGS.pulse * 1000);
      return () => clearTimeout(timer);
    }, MOTION_TIMINGS.pulseLoop * 1000);

    return () => clearInterval(interval);
  }, [isInView, shouldReduceMotion]);

  // 2. Workload Capacity Bar Animation (animates from 0 to 87% once on scroll into view)
  const workloadRef = useRef<HTMLDivElement>(null);
  const isWorkloadInView = useInView(workloadRef, { once: true, margin: "-40px" });

  // 3. Kanban Drag Hint Shift State (4.5s loop while in view)
  const [kanbanShift, setKanbanShift] = useState(false);
  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setKanbanShift(true);
      const timer = setTimeout(() => {
        setKanbanShift(false);
      }, MOTION_TIMINGS.kanbanShift * 1000);
      return () => clearTimeout(timer);
    }, MOTION_TIMINGS.kanbanLoop * 1000);

    return () => clearInterval(interval);
  }, [isInView, shouldReduceMotion]);

  // 4. Client Portal Status Badge Crossfade State (cycles every 3s)
  const [portalState, setPortalState] = useState<"progress" | "filed">("progress");
  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setPortalState((prev) => (prev === "progress" ? "filed" : "progress"));
    }, MOTION_TIMINGS.portalBadgeLoop * 1000);

    return () => clearInterval(interval);
  }, [isInView, shouldReduceMotion]);

  return (
    <section
      id="features-grid"
      ref={containerRef}
      className="relative overflow-hidden py-[90px] lg:py-[115px] bg-[#f8fafc] border-b border-slate-200"
    >
      <div className="wrap">
        {/* Section Header */}
        <div className="mx-auto max-w-[840px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-gradient-to-r from-slate-50 via-pink-50/40 to-slate-50 px-3.5 py-1 text-[12px] font-semibold text-[#14223d] shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#14223d] to-[#db2777] animate-pulse" />
            <span>Comprehensive Firm Management • Supporting Workspaces</span>
          </div>

          <h2 className="mt-4 font-display text-[clamp(28px,4.5vw,46px)] font-bold tracking-tight text-slate-950 leading-[1.15]">
            Every dimension of practice control,{" "}
            <span className="bg-gradient-to-r from-[#14223d] via-[#7c3aed] to-[#db2777] bg-clip-text text-transparent">
              unified in one system.
            </span>
          </h2>

          <p className="mt-3.5 text-[clamp(15px,1.6vw,18px)] text-slate-600 leading-relaxed max-w-[680px] mx-auto">
            Explore the secondary operational tools that keep Indian accounting and corporate governance firms running with zero missed deadlines.
          </p>
        </div>

        {/* 2x2 Feature Grid */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-[1080px] mx-auto">
          {/* Card 1: Statutory Calendar (Real React Component) */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-700">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400">
                    Compliance Radar
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                  Monthly Grid
                </span>
              </div>

              <h3 className="text-[20px] font-bold text-slate-950 tracking-tight">
                Statutory calendar, always current
              </h3>
              <p className="mt-2 text-[14.5px] text-slate-600 leading-relaxed">
                Track GST, TDS, advance tax, and ROC deadlines across all active client portfolios in a single centralized calendar grid.
              </p>
            </div>

            {/* Real React Product Component with Pulsing Filing Chip */}
            <div className="relative">
              <ScaledFeaturePreview virtualWidth={1100} virtualHeight={640} height={230}>
                <PyngynCalendarView showInsideCockpit={false} activeTarget="feature-grid-calendar" />
              </ScaledFeaturePreview>

              {/* Floating Well-Designed Celebration Overlay */}
              <div className="absolute top-[16px] right-2 sm:right-3 z-20 pointer-events-none drop-shadow-lg">
                <PyngynCelebrationOverlay
                  title="20th Sep: GSTR-3B Filing"
                  subtitle="9 Portfolios Due · Reconciled"
                  statusText="On Track"
                  avatarInitials="AS"
                  avatarBg="bg-[#7E22CE]"
                  mascotSrc="/mascot/pyngyn-insights.png"
                  compact={true}
                  showCursor={false}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Workload Overview (Real React Component) */}
          <div
            ref={workloadRef}
            className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200/80 flex items-center justify-center text-purple-700">
                    <PieChart className="w-4 h-4" />
                  </div>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400">
                    Resource Intelligence
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                  Capacity Meter
                </span>
              </div>

              <h3 className="text-[20px] font-bold text-slate-950 tracking-tight">
                Know your firm&apos;s workload at a glance
              </h3>
              <p className="mt-2 text-[14.5px] text-slate-600 leading-relaxed">
                Monitor team bandwidth, pending filings per article assistant, and bottleneck risks before deadlines approach.
              </p>
            </div>

            {/* Real React Product Component with Animated Capacity Bar */}
            <div className="relative">
              <ScaledFeaturePreview virtualWidth={1100} virtualHeight={640} height={230}>
                <PyngynWorkloadView activeTarget="feature-grid-workload" />
              </ScaledFeaturePreview>

              {/* Floating Well-Designed Celebration Overlay */}
              <div className="absolute top-[16px] right-2 sm:right-3 z-20 pointer-events-none drop-shadow-lg">
                <PyngynCelebrationOverlay
                  title="Team Capacity Balanced"
                  subtitle="Practice Bandwidth 87% · Optimal"
                  statusText="Balanced"
                  avatarInitials="NJ"
                  avatarBg="bg-[#004AAD]"
                  mascotSrc="/mascot/pyngyn-ai-avatar.png"
                  compact={true}
                  showCursor={false}
                />
              </div>
            </div>
          </div>

          {/* Card 3: Kanban View (Real React Component) */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700">
                    <Kanban className="w-4 h-4" />
                  </div>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400">
                    Workflow Stages
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                  Kanban Board
                </span>
              </div>

              <h3 className="text-[20px] font-bold text-slate-950 tracking-tight">
                Kanban view for every engagement
              </h3>
              <p className="mt-2 text-[14.5px] text-slate-600 leading-relaxed">
                Visualize multi-client tasks grouped by Overdue, Due Today, Due This Week, and Filed with intuitive drag-and-drop progression.
              </p>
            </div>

            {/* Real React Product Component with Drag Shift Hint */}
            <div className="relative">
              <ScaledFeaturePreview virtualWidth={1100} virtualHeight={640} height={230}>
                <PyngynBoardView
                  clientName="Oswal Exports"
                  clientHealth="at-risk"
                  clientTier={1}
                  activeTarget="feature-grid-board"
                />
              </ScaledFeaturePreview>

              {/* Floating Well-Designed Celebration Overlay */}
              <div className="absolute top-[16px] right-2 sm:right-3 z-20 pointer-events-none drop-shadow-lg">
                <PyngynCelebrationOverlay
                  title="Moved to Internal Review"
                  subtitle="GSTR-1 Ledger Matching · Oswal"
                  statusText="In Review"
                  avatarInitials="PA"
                  avatarBg="bg-[#EC4899]"
                  mascotSrc="/mascot/pyngyn-insights.png"
                  compact={true}
                  showCursor={false}
                />
              </div>
            </div>
          </div>

          {/* Card 4: Client Portal View (Real React Component) */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-700">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400">
                    Client Experience
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                  Branded Portal
                </span>
              </div>

              <h3 className="text-[20px] font-bold text-slate-950 tracking-tight">
                Clients see their status in real time
              </h3>
              <p className="mt-2 text-[14.5px] text-slate-600 leading-relaxed">
                Provide client stakeholders with secure, live visibility into compliance filings, pending queries, and document requests.
              </p>
            </div>

            {/* Real React Product Component with Live Celebration Overlay */}
            <div className="relative">
              <ScaledFeaturePreview virtualWidth={1100} virtualHeight={640} height={230}>
                <PyngynClientSpaceView
                  clientName="Oswal Exports"
                  firmName="Sharma & Associates"
                  activeTarget="feature-grid-portal"
                />
              </ScaledFeaturePreview>

              {/* Floating Well-Designed Celebration Overlay */}
              <div className="absolute top-[16px] right-2 sm:right-3 z-20 pointer-events-none drop-shadow-lg">
                <PyngynCelebrationOverlay
                  title="Client Portal Auto-Synced"
                  subtitle="GSTR-3B Filed · Ack on WhatsApp"
                  statusText={portalState === "progress" ? "In Progress" : "100% Synced"}
                  avatarSrc="/team/vivek-pandey.png"
                  mascotSrc="/mascot/pyngyn-ai-avatar.png"
                  compact={true}
                  showCursor={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
