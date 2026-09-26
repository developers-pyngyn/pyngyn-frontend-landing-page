"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ResponsiveMockupFrameProps {
  children: React.ReactNode;
  baseWidth?: number;
  baseHeight?: number;
  className?: string;
  enableScrollZoom?: boolean;
}

export function ResponsiveMockupFrame({
  children,
  baseWidth = 1040,
  baseHeight = 630,
  className = "",
  enableScrollZoom = true,
}: ResponsiveMockupFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const currentWidth = container.offsetWidth;
      if (currentWidth > 0) {
        const computedScale = Math.min(1, currentWidth / baseWidth);
        setScale(computedScale);
      }
    };

    updateScale();

    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [baseWidth]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-[18px] sm:rounded-[22px] border border-slate-200/90 bg-white shadow-[0_25px_60px_-15px_rgba(15,23,42,0.1),0_0_1px_rgba(15,23,42,0.08)] ${className}`}
    >
      {/* Outer sizing box that shrinks height proportionally to avoid blank gaps */}
      <div
        style={{
          height: mounted ? `${baseHeight * scale}px` : `${baseHeight}px`,
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Scaled Inner Canvas */}
        <div
          style={{
            width: `${baseWidth}px`,
            height: `${baseHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}
