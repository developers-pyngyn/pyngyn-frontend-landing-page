"use client";

import React, { useRef, useState, useEffect } from "react";
import { Lock } from "lucide-react";
import { MOCKUP_DIMENSIONS } from "./motionTokens";

interface DesktopMockupFrameProps {
  url: string;
  imageHeight?: number;
  baseWidth?: number;
  className?: string;
  maxWidthClass?: string;
  children: React.ReactNode;
  /** Optional custom header right actions */
  headerActions?: React.ReactNode;
}

/**
 * Unified Desktop Mockup Frame
 * Ensures identical chrome styling, traffic lights, aspect-ratio and uniform downscaling
 * across Hero, Persona Switcher, and Workflow Showcase sections.
 */
export function DesktopMockupFrame({
  url,
  imageHeight = MOCKUP_DIMENSIONS.defaultImageHeight,
  baseWidth = MOCKUP_DIMENSIONS.baseWidth,
  className = "",
  maxWidthClass = "max-w-[1024px]",
  children,
  headerActions,
}: DesktopMockupFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const chromeHeaderHeight = MOCKUP_DIMENSIONS.chromeHeaderHeight;
  const baseHeight = imageHeight + chromeHeaderHeight;

  // Responsive scale down: uniformly downscale on mobile & tablet without cropping or reflowing
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const containerWidth = container.offsetWidth;
      if (containerWidth > 0) {
        setScale(containerWidth / baseWidth);
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
      className={`relative w-full ${maxWidthClass} mx-auto overflow-hidden rounded-[14px] sm:rounded-[18px] border border-slate-200/90 bg-white shadow-[0_25px_60px_-15px_rgba(15,23,42,0.1),0_0_1px_rgba(15,23,42,0.08)] ${className}`}
      style={{
        aspectRatio: `${baseWidth} / ${baseHeight}`,
      }}
    >
      {/* Scaled Desktop Canvas: Always renders at exact fixed desktop dimensions */}
      <div
        style={{
          width: `${baseWidth}px`,
          height: `${baseHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        className="flex flex-col bg-white"
      >
        {/* Browser Chrome Header */}
        <div className="h-[38px] w-full flex-none bg-slate-100/95 border-b border-slate-200/90 px-3.5 flex items-center justify-between select-none z-20">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 w-16">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e]/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-[#1aab29]/40" />
          </div>

          {/* Address pill */}
          <div className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200/80 shadow-2xs text-[11px] font-mono text-slate-600 max-w-[360px] truncate">
            <Lock className="w-2.5 h-2.5 text-slate-400 shrink-0" />
            <span className="truncate">{url}</span>
          </div>

          {/* Right window actions / spacer */}
          <div className="w-16 flex justify-end items-center gap-1.5">
            {headerActions || (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              </>
            )}
          </div>
        </div>

        {/* Viewport Content Area */}
        <div
          className="relative w-full flex-none bg-slate-50 overflow-hidden"
          style={{ height: `${imageHeight}px` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
