"use client";

import React, { useRef, useState, useEffect } from "react";
import { AutomationStudioView } from "../product/AutomationStudioView";

export function AutomationWorkflowMockup({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const baseWidth = 1040;
  const baseHeight = 560;

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
      className={`relative w-full overflow-hidden rounded-[14px] border border-slate-200/90 shadow-xl bg-white ${className}`}
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
        className="flex flex-col bg-white"
      >
        {/* Studio Header bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500 select-none flex-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="font-mono bg-white px-4 py-0.5 rounded border border-slate-200 text-slate-700 font-semibold">
            Automations Studio · Visual Trigger Pipeline
          </div>
          <span className="font-bold text-[#db2777]">Live Engine</span>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
          <AutomationStudioView />
        </div>
      </div>
    </div>
  );
}
