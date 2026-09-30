"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertTriangle, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { PyngynWebsiteProduct } from "../product/website/PyngynWebsiteProduct";
import { PyngynCelebrationOverlay } from "../product-demo/PyngynCelebrationOverlay";
import { ResponsiveMockupFrame } from "./ResponsiveMockupFrame";

interface AgentStep {
  id: number;
  text: string;
  tone: "green" | "amber" | "blue";
  flagIcon?: boolean;
}

const AGENT_STEPS: AgentStep[] = [
  {
    id: 1,
    text: "Scanning GSTR-2B for mismatches",
    tone: "blue",
  },
  {
    id: 2,
    text: "Matched 34 line items",
    tone: "green",
  },
  {
    id: 3,
    text: "Flagged 1 discrepancy (₹3.2L)",
    tone: "amber",
    flagIcon: true,
  },
  {
    id: 4,
    text: "Task moved to Internal Review",
    tone: "green",
  },
];

export function SplitAgentWorkShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeStep, setActiveStep] = useState(0); // 0 = none, 1 = step 1, 2 = step 2, 3 = step 3, 4 = step 4
  const [isLoopingPause, setIsLoopingPause] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    }
  }, []);

  // IntersectionObserver to only animate when ~30% visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Step progression animation loop
  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    let timeoutId: NodeJS.Timeout;

    if (activeStep < 4) {
      timeoutId = setTimeout(() => {
        setActiveStep((prev) => prev + 1);
      }, activeStep === 0 ? 400 : 900);
    } else {
      // Hold for 3s after step 4 completes, then reset
      timeoutId = setTimeout(() => {
        setIsLoopingPause(true);
        setTimeout(() => {
          setActiveStep(0);
          setIsLoopingPause(false);
        }, 400);
      }, 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [isInView, activeStep, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-4">
      {/* 1. TOP AUTONOMOUS SCRUTINY AGENT CONTROL CONSOLE */}
      <div className="w-full rounded-2xl border border-slate-200/90 bg-white/95 p-3.5 sm:p-4 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 backdrop-blur-xs">
        {/* Left: Agent Identity */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-2xs shrink-0 flex items-center justify-center">
            <Image
              src="/mascot/pyngyn-ai-avatar.png"
              alt="Pyngyn Agent"
              width={26}
              height={26}
              className="object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-[13px] text-slate-900 leading-tight">
                Pyngyn Autonomous Scrutiny
              </h4>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[9px] font-bold text-blue-700 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span>LIVE RECON</span>
              </span>
            </div>
            <span className="text-[10.5px] font-mono text-slate-500 block mt-0.5">
              Agent ID: pyng-recon-gstr2b · Cross-checking ledger against GST portal
            </span>
          </div>
        </div>

        {/* Center: Live Progressive Checklist Pills */}
        <div
          className={`flex items-center gap-1.5 flex-wrap py-0.5 transition-opacity duration-300 ${
            isLoopingPause ? "opacity-30" : "opacity-100"
          }`}
        >
          {AGENT_STEPS.map((step) => {
            const isVisible = prefersReducedMotion || activeStep >= step.id;
            const isCurrentActive = activeStep === step.id;
            const isCompleted = prefersReducedMotion || activeStep > step.id;

            return (
              <div
                key={step.id}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11.5px] font-semibold transition-all shrink-0 select-none ${
                  isCurrentActive
                    ? "bg-blue-50/80 border-blue-300 text-blue-900 shadow-2xs ring-1 ring-blue-400/40"
                    : isCompleted
                    ? step.flagIcon
                      ? "bg-amber-50/80 border-amber-300 text-amber-900"
                      : "bg-emerald-50/80 border-emerald-300 text-emerald-900"
                    : "bg-slate-50 border-slate-200 text-slate-400 opacity-60"
                }`}
              >
                {/* Step icon */}
                {isCurrentActive && !prefersReducedMotion ? (
                  <Loader2 className="w-3 h-3 text-blue-600 animate-spin shrink-0 stroke-[2.5]" />
                ) : isCompleted ? (
                  step.flagIcon ? (
                    <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0 stroke-[2.5]" />
                  ) : (
                    <Check className="w-3 h-3 text-emerald-600 shrink-0 stroke-[3]" />
                  )
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                )}
                <span>{step.text}</span>
              </div>
            );
          })}
        </div>

        {/* Right: 4-Eye Gate Seal */}
        <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50/80 border border-emerald-200/80 px-2.5 py-1 rounded-lg shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>4-Eye Gate Verified</span>
        </div>
      </div>

      {/* 2. FULL-WIDTH DESKTOP VIEWPORT PRODUCT MOCKUP */}
      <div className="relative w-full overflow-visible">
        <ResponsiveMockupFrame baseWidth={1040} baseHeight={640}>
          <PyngynWebsiteProduct screen="tasks" clientId="oswal" className="w-full h-full" />
        </ResponsiveMockupFrame>

        {/* Floating Celebration Overlay on top / outer side */}
        <div className="absolute -top-3 sm:-top-5 right-4 sm:right-10 z-50 pointer-events-none drop-shadow-2xl">
          <PyngynCelebrationOverlay
            title="Verified ₹3.2L ITC Match"
            subtitle="Horizon Exports · Reconciled with GSTR-2B"
            statusText="Filed"
            avatarSrc="/team/vivek-pandey.png"
            mascotSrc="/mascot/pyngyn-insights.png"
            showCursor={true}
            cursorOffset={{ x: 135, y: 14 }}
          />
        </div>
      </div>
    </div>
  );
}
