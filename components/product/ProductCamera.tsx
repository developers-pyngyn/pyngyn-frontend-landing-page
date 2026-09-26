"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export type CameraPreset = "overview" | "task" | "review" | "timer";

interface ProductCameraProps {
  children: React.ReactNode;
  defaultPreset?: CameraPreset;
  showControls?: boolean;
  className?: string;
}

export const ProductCamera: React.FC<ProductCameraProps> = ({
  children,
  defaultPreset = "overview",
  showControls = true,
  className = "",
}) => {
  const [preset, setPreset] = useState<CameraPreset>(defaultPreset);

  // Compute scale and transform origin based on preset
  let scale = 1;
  let origin = "50% 50%";

  if (preset === "task") {
    scale = 1.24;
    origin = "48% 34%";
  } else if (preset === "review") {
    scale = 1.30;
    origin = "72% 38%";
  } else if (preset === "timer") {
    scale = 1.36;
    origin = "45% 92%";
  }

  return (
    <div className={`relative flex flex-col ${className}`}>
      {/* Interactive Camera Preset Controls Bar */}
      {showControls && (
        <div className="flex items-center justify-between gap-2 pb-2.5 px-1 select-none flex-wrap text-[12px]">
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs border border-slate-200/90 rounded-full p-1 shadow-2xs overflow-x-auto max-w-full scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 shrink-0">
              Focus Zoom:
            </span>

            {[
              { id: "overview", label: "Full Overview (1.0x)" },
              { id: "task", label: "GSTR-1 Scrutiny" },
              { id: "review", label: "4-Eye Review Gate" },
              { id: "timer", label: "Live Running Timer" },
            ].map((p) => {
              const isActive = preset === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPreset(p.id as CameraPreset)}
                  className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#14223d] text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11.5px] text-slate-500 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#db2777]" />
            <span>Interactive real React UI · Click elements to test live transitions</span>
          </div>
        </div>
      )}

      {/* Main Viewport Container with Mobile Scroll Guard */}
      <div className="relative overflow-x-auto max-w-full rounded-[14px] border border-slate-200 shadow-2xl bg-white scrollbar-none">
        <div className="min-w-[680px] md:min-w-0">
          <motion.div
            animate={{ scale, transformOrigin: origin }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-full origin-center"
          >
            {children}
          </motion.div>
        </div>

        {/* Ambient focal indicator ring when zoomed in */}
        {preset !== "overview" && (
          <div className="pointer-events-none absolute inset-0 ring-2 ring-pink-500/30 rounded-[14px] transition-opacity" />
        )}
      </div>
    </div>
  );
};
