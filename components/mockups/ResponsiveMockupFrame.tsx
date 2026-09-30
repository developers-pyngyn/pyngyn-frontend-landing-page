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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const currentWidth = container.offsetWidth;
      if (currentWidth > 0) {
        setScale(currentWidth / baseWidth);
      }
    };

    updateScale();

    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    resizeObserver.observe(container);
    window.addEventListener("resize", updateScale);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [baseWidth]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-[14px] sm:rounded-[18px] border border-slate-200/90 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] ${className}`}
      style={{
        aspectRatio: `${baseWidth} / ${baseHeight}`,
      }}
    >
      <div
        style={{
          width: `${baseWidth}px`,
          height: `${baseHeight}px`,
          transform: `scale(${scale}) translateZ(0)`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
