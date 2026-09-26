"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";
import { LayoutDashboard, CheckSquare } from "lucide-react";
import { DesktopMockupFrame } from "../clientspace/DesktopMockupFrame";
import {
  EASE_OUT,
  MOTION_TIMINGS,
} from "../clientspace/motionTokens";
import {
  PyngynProductShell,
  PyngynTaskTable,
  PyngynBoardView,
  PyngynOswalClientView,
  PyngynTaskListView,
  PyngynTaskBoardView,
} from "../product-demo";

interface HeroDesktopMockupProps {
  initialScreen?: "dashboard" | "tasks";
}

export function HeroDesktopMockup({
  initialScreen = "tasks",
}: HeroDesktopMockupProps) {
  const [activeScreen, setActiveScreen] = useState<"dashboard" | "tasks">(initialScreen);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion hooks for entrance & breathing
  const isInView = useInView(containerRef, { once: false, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimation();
  const hasEnteredRef = useRef(false);

  // Desktop native dimensions of the real product interface
  const baseWidth = 1440;
  const imageHeight = 860;

  // Entrance zoom-in & subtle breathing loop (pauses when out of view)
  useEffect(() => {
    const mediaQuery =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    const isReduced = Boolean(mediaQuery?.matches || shouldReduceMotion);

    if (isReduced) {
      controls.start({ scale: 1, opacity: 1, transition: { duration: 0 } });
      return;
    }

    if (isInView) {
      let active = true;

      async function runEntranceAndBreathing() {
        if (!hasEnteredRef.current) {
          // 1. Entrance Zoom-in: scale 0.94 -> 1, opacity 0.6 -> 1 over 800ms
          await controls.start({
            scale: 1,
            opacity: 1,
            transition: {
              duration: MOTION_TIMINGS.entrance,
              ease: EASE_OUT,
            },
          });
          hasEnteredRef.current = true;
        }

        if (!active) return;

        // 2. Subtle continuous breathing motion: 1 <-> 1.008 over slow 7s loop
        controls.start({
          scale: [1, 1.008, 1],
          transition: {
            duration: MOTION_TIMINGS.breathingLoop,
            repeat: Infinity,
            ease: "easeInOut",
          },
        });
      }

      runEntranceAndBreathing();

      return () => {
        active = false;
        controls.stop();
      };
    } else {
      controls.stop();
    }
  }, [isInView, shouldReduceMotion, controls]);

  const currentUrl =
    activeScreen === "dashboard"
      ? "app.pyngyn.com/clients/oswal-exports/board"
      : "app.pyngyn.com/clients/oswal-exports/tasks";

  return (
    <div className="w-full flex flex-col items-center">
      {/* View Switcher: Segmented pill toggle between Command Board & Tasks List */}
      <div className="mb-4 sm:mb-5 flex justify-center">
        <div className="inline-flex items-center gap-1.5 p-1 rounded-full border border-slate-200/90 bg-white/95 shadow-2xs backdrop-blur-sm">
          <button
            type="button"
            data-product-target="hero-toggle-tasks"
            onClick={() => setActiveScreen("tasks")}
            className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-[12px] sm:text-[13px] font-bold transition-all duration-150 cursor-pointer select-none ${
              activeScreen === "tasks"
                ? "bg-[#14223d] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Tasks Table (Oswal Exports)</span>
          </button>

          <button
            type="button"
            data-product-target="hero-toggle-board"
            onClick={() => setActiveScreen("dashboard")}
            className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-[12px] sm:text-[13px] font-bold transition-all duration-150 cursor-pointer select-none ${
              activeScreen === "dashboard"
                ? "bg-[#14223d] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Kanban Board (Statutory Stages)</span>
          </button>
        </div>
      </div>

      {/* Browser Chrome Frame with Entrance Zoom & Subtle Breathing Loop */}
      <motion.div
        ref={containerRef}
        data-hero-mockup-frame="true"
        initial={
          shouldReduceMotion
            ? { scale: 1, opacity: 1 }
            : { scale: 0.94, opacity: 0.6 }
        }
        animate={controls}
        className="w-full max-w-[1140px] mx-auto transform-gpu origin-center"
      >
        <DesktopMockupFrame
          url={currentUrl}
          imageHeight={imageHeight}
          baseWidth={baseWidth}
          maxWidthClass="max-w-[1140px]"
        >
          <PyngynProductShell
            activeRailItem="clients"
            sidebarVariant="clients"
            showAlertBanner={true}
            alertText="GSTR-3B Overdue · 3 not ready +2"
            showBottomTimer={true}
            bottomActiveTaskTitle="[Oswal Exports] GSTR-1 sales ledger ..."
            bottomClientName="Oswal Exports"
            className="w-full h-full rounded-none border-0 shadow-none"
          >
            {activeScreen === "tasks" ? (
              <PyngynTaskListView standalone={false} autoPlay={true} />
            ) : (
              <PyngynTaskBoardView standalone={false} autoPlay={true} />
            )}
          </PyngynProductShell>
        </DesktopMockupFrame>
      </motion.div>
    </div>
  );
}
