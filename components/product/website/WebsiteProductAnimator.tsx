"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface WebsiteProductAnimatorProps {
  children: React.ReactNode;
  className?: string;
  enableScrollZoom?: boolean;
  baseWidth?: number;
  baseHeight?: number;
}

export const WebsiteProductAnimator: React.FC<WebsiteProductAnimatorProps> = ({
  children,
  className = "",
  enableScrollZoom = true,
  baseWidth = 1040,
  baseHeight = 640,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const w = container.offsetWidth;
      if (w > 0) {
        setScale(w / baseWidth);
      }
    };

    updateScale();
    const resizeObserver = new ResizeObserver(updateScale);
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
      className={`relative w-full overflow-hidden rounded-[14px] border border-slate-200/90 bg-white shadow-xl ${className}`}
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
        {enableScrollZoom ? (
          <motion.div
            initial={{ opacity: 0.95, y: 12, scale: 0.99 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full transform-gpu"
          >
            {children}
          </motion.div>
        ) : (
          <div className="w-full h-full">{children}</div>
        )}
      </div>
    </div>
  );
};

