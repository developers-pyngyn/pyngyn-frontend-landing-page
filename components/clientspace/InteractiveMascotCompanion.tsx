"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Sparkles,
  X,
  MessageSquare,
  ArrowRight,
  ChevronUp,
  Volume2,
  Calendar,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { DEMO_URL, SIGNUP_URL } from "../config";

interface MascotState {
  section: string;
  image: string;
  quote: string;
  badge: string;
}

const SECTION_STATES: Record<string, MascotState> = {
  hero: {
    section: "hero",
    image: "/mascot/pyngyn-ai-avatar.png",
    quote: "Ready to run your firm from one client workspace?",
    badge: "Pyng Companion",
  },
  problem: {
    section: "problem",
    image: "/mascot/pyng-busy-season.png",
    quote: "No more busy season chaos or misplaced client files!",
    badge: "Zero Chaos",
  },
  tour: {
    section: "tour",
    image: "/mascot/pyng-rocket-launch.png",
    quote: "Switch tabs above to test the real Pyngyn interface!",
    badge: "Interactive Tour",
  },
  "client-management": {
    section: "client-management",
    image: "/mascot/pyng-welcome.jpg",
    quote: "Know every client entity, holding, and health score at a glance.",
    badge: "Client Hub",
  },
  "task-management": {
    section: "task-management",
    image: "/mascot/pyng-security.png",
    quote: "4-Eye review gates lock calculations before partner filing.",
    badge: "Review Gate",
  },
  engagements: {
    section: "engagements",
    image: "/mascot/pyng-hierarchy.png",
    quote: "Track retainer milestones & fee realization without scope creep.",
    badge: "Retainers",
  },
  "client-portal": {
    section: "client-portal",
    image: "/mascot/pyng-welcome.jpg",
    quote: "Clients log in via zero-password magic links to submit files.",
    badge: "Client Portal",
  },
  communication: {
    section: "communication",
    image: "/mascot/pyng-comms.png",
    quote: "WhatsApp and client emails ingest directly into your task queue!",
    badge: "Comms Engine",
  },
  automations: {
    section: "automations",
    image: "/mascot/pyng-rocket-launch.png",
    quote: "Pyng auto-chases missing vouchers so your team doesn't have to.",
    badge: "Autopilot",
  },
  workload: {
    section: "workload",
    image: "/mascot/pyng-hierarchy.png",
    quote: "Balancing partner capacity & preventing associate burnout!",
    badge: "Team Balance",
  },
  dashboard: {
    section: "dashboard",
    image: "/mascot/pyng-audit-megaphone.png",
    quote: "84% statutory filing velocity across all practice retainers.",
    badge: "Practice Radar",
  },
  "pyngyn-ai": {
    section: "pyngyn-ai",
    image: "/mascot/pyngyn-ai-avatar.png",
    quote: "Ask me to reconcile ITC or draft your Form 3CD notes!",
    badge: "Pyngyn AI",
  },
};

export function InteractiveMascotCompanion() {
  const [currentSection, setCurrentSection] = useState<string>("hero");
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isOpenCard, setIsOpenCard] = useState<boolean>(false);
  const [bubbleVisible, setBubbleVisible] = useState<boolean>(true);
  const [bounceKey, setBounceKey] = useState<number>(0);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track sections on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        "hero",
        "problem",
        "tour",
        "client-management",
        "task-management",
        "engagements",
        "client-portal",
        "communication",
        "automations",
        "workload",
        "dashboard",
        "pyngyn-ai",
      ];

      const scrollPos = window.scrollY + 350;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            if (currentSection !== id) {
              setCurrentSection(id);
              setBounceKey((k) => k + 1);
              setBubbleVisible(true);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSection]);

  const state = SECTION_STATES[currentSection] || SECTION_STATES.hero;

  return (
    <>
      {/* 1. Global Scroll Progress Bar at very top */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3.5px] z-[9999] bg-gradient-to-r from-[#14223d] via-[#7c3aed] to-[#db2777] origin-left shadow-sm pointer-events-none"
      />

      {/* 2. Floating Mascot Companion (Bottom Right) */}
      <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex flex-col items-end select-none pointer-events-auto">
        <AnimatePresence>
          {/* Expanded Dialogue / Help Card */}
          {isOpenCard && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="mb-3 w-[310px] sm:w-[340px] rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="relative h-7 w-7 rounded-full overflow-hidden border border-pink-300">
                    <Image
                      src={state.image}
                      alt="Pyng mascot avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[13px] text-slate-900 leading-tight">
                      Pyng Practice Companion
                    </h4>
                    <span className="text-[10.5px] font-semibold text-[#db2777]">
                      {state.badge} Active
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpenCard(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                  aria-label="Close assistant card"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="py-3">
                <p className="text-[12.5px] text-slate-600 leading-relaxed">
                  &ldquo;{state.quote}&rdquo;
                </p>
                <div className="mt-3 space-y-1.5 rounded-xl bg-slate-50 p-2.5 border border-slate-100 text-[11.5px] text-slate-700">
                  <div className="flex items-center gap-1.5 font-bold text-[#14223d]">
                    <Sparkles className="h-3.5 w-3.5 text-[#db2777]" />
                    <span>Quick Practice Actions</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    <span>Statutory Deadlines auto-synced</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    <span>Zero-install WhatsApp client intake</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                <a
                  href={DEMO_URL}
                  className="flex-1 btn btn-primary py-2 text-center text-[12px] font-bold"
                >
                  Book 1-on-1 Demo →
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("tour");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    setIsOpenCard(false);
                  }}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-[12px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Tour ↓
                </button>
              </div>
            </motion.div>
          )}

          {/* Floating Speech Bubble (When card is closed) */}
          {!isOpenCard && bubbleVisible && !isMinimized && (
            <motion.div
              key={state.section}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative mb-2.5 max-w-[240px] sm:max-w-[270px] rounded-2xl border border-slate-200/90 bg-white/95 px-3.5 py-2 shadow-xl backdrop-blur-md text-[12px] text-slate-700 font-medium cursor-pointer hover:border-pink-300 transition-colors"
              onClick={() => setIsOpenCard(true)}
            >
              <div className="flex items-start justify-between gap-1.5">
                <span className="leading-snug">
                  {state.quote}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setBubbleVisible(false);
                  }}
                  className="text-slate-400 hover:text-slate-600 text-[10px] ml-1 p-0.5"
                  aria-label="Dismiss message bubble"
                >
                  ×
                </button>
              </div>
              {/* Bubble pointer triangle */}
              <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-slate-200/90 bg-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mascot Avatar Trigger Button */}
        <div className="flex items-center gap-2">
          {!isMinimized && (
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className="h-6 w-6 rounded-full bg-white/80 hover:bg-white border border-slate-200 text-slate-400 hover:text-slate-700 text-[10px] flex items-center justify-center shadow-xs transition-colors"
              title="Minimize mascot"
              aria-label="Minimize mascot"
            >
              –
            </button>
          )}

          <motion.div
            key={bounceKey}
            initial={{ scale: 0.85, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.08, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            onClick={() => {
              if (isMinimized) {
                setIsMinimized(false);
                setBubbleVisible(true);
              } else {
                setIsOpenCard((prev) => !prev);
              }
            }}
            className="group relative cursor-pointer"
            title="Click to interact with Pyng"
          >
            {/* Ambient Pulse Glow */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#14223d]/20 via-[#7c3aed]/30 to-[#db2777]/30 blur-sm group-hover:blur-md transition-all animate-pulse" />

            {/* Avatar Pill Shell */}
            <div className="relative flex items-center gap-2 rounded-full border-2 border-white bg-gradient-to-b from-slate-900 to-[#14223d] p-1 shadow-2xl ring-1 ring-slate-200">
              <div className="relative h-12 w-12 sm:h-13 sm:w-13 overflow-hidden rounded-full border border-slate-700 bg-white">
                <Image
                  src={state.image}
                  alt="Pyng interactive mascot"
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </div>

              {!isMinimized && (
                <div className="pr-3 pl-0.5 hidden sm:block text-left">
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[11px] font-bold text-white tracking-wide">
                      Pyng
                    </span>
                  </div>
                  <span className="text-[10px] text-pink-300 font-semibold block leading-none mt-0.5">
                    {state.badge}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
