"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { EASE_OUT, MOTION_TIMINGS } from "./motionTokens";

export type AiCardStatus = "reviewing" | "generating" | "done" | "idle";

interface FloatingAiStatusCardProps {
  title?: string;
  subtext: string;
  status: AiCardStatus;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Shared Floating AI Status Card
 * Standardized across Workflow Showcase and interactive product demos.
 */
export function FloatingAiStatusCard({
  title = "Ask Pyngyn AI",
  subtext,
  status,
  style,
  className = "",
}: FloatingAiStatusCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{
        duration: MOTION_TIMINGS.aiCardTransition,
        ease: EASE_OUT,
      }}
      style={style}
      className={`z-30 rounded-[12px] border border-slate-200/90 bg-white/98 p-3 shadow-xl backdrop-blur-md ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Pyngyn Mascot Avatar */}
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
              {title}
            </span>

            <AnimatePresence mode="wait">
              <motion.span
                key={subtext}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: MOTION_TIMINGS.aiBadgeCycle }}
                className={`block text-[10.5px] truncate leading-tight mt-0.5 ${
                  status === "generating"
                    ? "text-blue-600 font-medium"
                    : status === "done"
                    ? "text-emerald-600 font-medium"
                    : "text-slate-500"
                }`}
              >
                {subtext}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Dynamic Status Badge */}
        <div className="shrink-0">
          <AnimatePresence mode="wait">
            {status === "reviewing" && (
              <motion.span
                key="badge-reviewing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: MOTION_TIMINGS.aiBadgeCycle }}
                className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10.5px] font-bold text-amber-800"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>Reviewing</span>
              </motion.span>
            )}

            {status === "generating" && (
              <motion.span
                key="badge-generating"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: MOTION_TIMINGS.aiBadgeCycle }}
                className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10.5px] font-bold text-blue-700"
              >
                <Loader2 className="h-2.5 w-2.5 animate-spin text-blue-600" />
                <span>Generating</span>
              </motion.span>
            )}

            {status === "done" && (
              <motion.span
                key="badge-done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: MOTION_TIMINGS.aiBadgeCycle }}
                className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10.5px] font-bold text-emerald-800"
              >
                <Check className="h-3 w-3 stroke-[3] text-emerald-600" />
                <span>Done</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
