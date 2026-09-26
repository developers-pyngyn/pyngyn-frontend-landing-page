"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface CursorWaypoint {
  x: number;
  y: number;
  label?: string;
  duration?: number;
  delay?: number;
  action?: "click" | "hover" | "highlight";
}

interface AnimatedCursorOverlayProps {
  waypoints: CursorWaypoint[];
  active?: boolean;
  loop?: boolean;
  className?: string;
}

export function AnimatedCursorOverlay({
  waypoints,
  active = true,
  loop = true,
  className = "",
}: AnimatedCursorOverlayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClicking, setIsClicking] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!active || isPaused || waypoints.length === 0) return;

    const currentWaypoint = waypoints[currentIndex];
    const duration = currentWaypoint.duration || 2600;

    // Trigger click effect halfway through dwelling
    const clickTimer = setTimeout(() => {
      if (currentWaypoint.action === "click") {
        setIsClicking(true);
        setShowRipple(true);
        setTimeout(() => setIsClicking(false), 200);
        setTimeout(() => setShowRipple(false), 600);
      }
    }, duration - 800);

    // Transition to next waypoint
    const nextTimer = setTimeout(() => {
      setCurrentIndex((prev) => {
        if (prev + 1 >= waypoints.length) {
          return loop ? 0 : prev;
        }
        return prev + 1;
      });
    }, duration);

    return () => {
      clearTimeout(clickTimer);
      clearTimeout(nextTimer);
    };
  }, [currentIndex, active, isPaused, loop, waypoints]);

  if (!active || waypoints.length === 0) return null;

  const current = waypoints[currentIndex];

  return (
    <div className={`pointer-events-none absolute inset-0 z-30 select-none overflow-hidden ${className}`}>
      {/* Animated Cursor Arrow */}
      <motion.div
        animate={{
          x: current.x,
          y: current.y,
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{
          x: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
          y: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
          scale: { duration: 0.15 },
        }}
        className="absolute top-0 left-0"
        style={{ willChange: "transform" }}
      >
        {/* Click Ripple Effect */}
        <AnimatePresence>
          {showRipple && (
            <motion.div
              initial={{ scale: 0.3, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute -top-3 -left-3 h-10 w-10 rounded-full border-2 border-pink-500 bg-pink-500/20 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Sleek macOS/Windows Style Cursor */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        >
          <path
            d="M5.5 3.5L18.5 13.5L12 14.5L9.5 20.5L5.5 3.5Z"
            fill="#14223d"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>

        {/* Animated Action Label / Micro-Pill */}
        <AnimatePresence mode="wait">
          {current.label && (
            <motion.div
              key={current.label}
              initial={{ opacity: 0, y: 4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute left-6 top-1 whitespace-nowrap rounded-md bg-[#14223d]/95 px-2.5 py-1 text-[10.5px] font-semibold text-white shadow-xl backdrop-blur-xs border border-white/20 flex items-center gap-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-pulse" />
              <span>{current.label}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
