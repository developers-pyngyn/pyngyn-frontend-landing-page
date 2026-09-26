"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import {
  PyngynWebsiteProduct,
  ProductScreenType,
} from "../product/website/PyngynWebsiteProduct";

interface HeroTabItem {
  id: string;
  label: string;
  screen: ProductScreenType;
  clientId?: "oswal" | "shreeji";
  states: {
    action: string;
    badgeLabel: string;
    badgeTone: "amber" | "blue" | "rose" | "emerald";
  }[];
}

const HERO_TABS: HeroTabItem[] = [
  {
    id: "compliance",
    label: "Compliance Team",
    screen: "calendar",
    states: [
      {
        action: "Reviewing GSTR-3B filing",
        badgeLabel: "Reviewing",
        badgeTone: "amber",
      },
      {
        action: "Drafting client update email",
        badgeLabel: "Generating",
        badgeTone: "blue",
      },
      {
        action: "Flagged ITC mismatch — ₹3.2L",
        badgeLabel: "Blocked",
        badgeTone: "rose",
      },
      {
        action: "Filed & synced to Client Portal",
        badgeLabel: "Done",
        badgeTone: "emerald",
      },
    ],
  },
  {
    id: "partner",
    label: "Managing Partner",
    screen: "audit",
    states: [
      {
        action: "Auditing Form 3CD Clause 44",
        badgeLabel: "Reviewing",
        badgeTone: "amber",
      },
      {
        action: "Generating Sec 44AB UDIN batch",
        badgeLabel: "Generating",
        badgeTone: "blue",
      },
      {
        action: "Partner sign-off queue pending (3)",
        badgeLabel: "Blocked",
        badgeTone: "rose",
      },
      {
        action: "Certified & filed to IT Portal",
        badgeLabel: "Done",
        badgeTone: "emerald",
      },
    ],
  },
  {
    id: "portal",
    label: "Client Portal",
    screen: "tasks",
    clientId: "oswal",
    states: [
      {
        action: "Client viewed Q2 filing status",
        badgeLabel: "Reviewing",
        badgeTone: "amber",
      },
      {
        action: "Drafting WhatsApp document request",
        badgeLabel: "Generating",
        badgeTone: "blue",
      },
      {
        action: "Awaiting bank statement (HDFC)",
        badgeLabel: "Blocked",
        badgeTone: "rose",
      },
      {
        action: "Approved & digitally countersigned",
        badgeLabel: "Done",
        badgeTone: "emerald",
      },
    ],
  },
  {
    id: "audit",
    label: "Audit Staff",
    screen: "board",
    clientId: "oswal",
    states: [
      {
        action: "Scrutinizing fixed assets register",
        badgeLabel: "Reviewing",
        badgeTone: "amber",
      },
      {
        action: "Cross-checking e-invoices with ledgers",
        badgeLabel: "Generating",
        badgeTone: "blue",
      },
      {
        action: "Unvouched expense flagged — ₹84k",
        badgeLabel: "Blocked",
        badgeTone: "rose",
      },
      {
        action: "Working papers locked for review",
        badgeLabel: "Done",
        badgeTone: "emerald",
      },
    ],
  },
];

export function HeroInteractiveMockup() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [cardStateIdx, setCardStateIdx] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const hasManualInteracted = useRef(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Auto-advance tabs every 5.5s unless user manually clicked
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      if (!hasManualInteracted.current) {
        setActiveTabIdx((prev) => (prev + 1) % HERO_TABS.length);
      }
    }, 5500);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // Cycle floating AI status card states every 1.8s
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCardStateIdx((prev) => (prev + 1) % 4);
    }, 1800);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const handleTabClick = (idx: number) => {
    hasManualInteracted.current = true;
    setActiveTabIdx(idx);
    setCardStateIdx(0); // Reset card state on tab switch
  };

  const activeTab = HERO_TABS[activeTabIdx];
  const currentState = activeTab.states[cardStateIdx] || activeTab.states[0];

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. Category-Pill Tabs (matching monday.com motion pattern) */}
      <div className="mb-4 sm:mb-6 flex justify-center overflow-x-auto max-w-full pb-1 scrollbar-none px-2">
        <div className="inline-flex items-center gap-1.5 p-1 rounded-full border border-slate-200/90 bg-white/90 shadow-2xs backdrop-blur-sm">
          {HERO_TABS.map((tab, idx) => {
            const isActive = activeTabIdx === idx;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(idx)}
                className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-[12px] sm:text-[13px] font-bold transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
                  isActive
                    ? "bg-[#14223d] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Browser-Chrome-Style Mockup Frame with Floating Card */}
      <div className="relative w-full max-w-[1080px]">
        {/* Floating "Ask Pyngyn AI" Status Card */}
        <div className="absolute top-16 right-3 sm:right-8 z-30 pointer-events-auto">
          <div className="w-[280px] sm:w-[310px] rounded-[12px] border border-slate-200/90 bg-white/95 p-3 shadow-xl backdrop-blur-md transition-all">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="relative h-8 w-8 flex-none overflow-hidden rounded-full border border-slate-200 bg-slate-100 shadow-2xs">
                  <Image
                    src="/mascot/pyngyn-ai-avatar.png"
                    alt="Pyngyn AI"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[11.5px] font-bold text-slate-900 leading-tight">
                    Ask Pyngyn AI
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${activeTab.id}-${cardStateIdx}`}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="block text-[10.5px] text-slate-500 truncate leading-tight mt-0.5"
                    >
                      {currentState.action}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Status Badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentState.badgeLabel}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  {currentState.badgeTone === "amber" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10.5px] font-bold text-amber-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                      <span>{currentState.badgeLabel}</span>
                    </span>
                  )}
                  {currentState.badgeTone === "blue" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10.5px] font-bold text-blue-700">
                      <Loader2 className="h-2.5 w-2.5 animate-spin text-blue-600" />
                      <span>{currentState.badgeLabel}</span>
                    </span>
                  )}
                  {currentState.badgeTone === "rose" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2 py-0.5 text-[10.5px] font-bold text-rose-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                      <span>{currentState.badgeLabel}</span>
                    </span>
                  )}
                  {currentState.badgeTone === "emerald" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10.5px] font-bold text-emerald-800">
                      <motion.span
                        initial={prefersReducedMotion ? { scale: 1 } : { scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 0.3 }}
                      >
                        <Check className="h-3 w-3 stroke-[3] text-emerald-600" />
                      </motion.span>
                      <span>{currentState.badgeLabel}</span>
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mockup Frame Container */}
        <div
          className="relative overflow-x-auto max-w-full rounded-[14px] border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white scrollbar-none"
        >
          <div className="min-w-[720px] md:min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 10 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -10 }
                }
                transition={{
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full transform-gpu"
              >
                <PyngynWebsiteProduct
                  screen={activeTab.screen}
                  clientId={activeTab.clientId || "oswal"}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
