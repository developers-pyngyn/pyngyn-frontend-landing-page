"use client";

import React from "react";

interface BrowserFrameProps {
  children: React.ReactNode;
  url?: string;
  badge?: string;
  className?: string;
  baseWidth?: number;
  baseHeight?: number;
}

export function BrowserFrame({
  children,
  url = "app.pyngyn.ai/clientspace/horizon-exports",
  badge = "Live ClientSpace",
  className = "",
  baseWidth,
  baseHeight,
}: BrowserFrameProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    if (!baseWidth) return;
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const w = container.offsetWidth;
      if (w > 0) {
        setScale(w / baseWidth);
      }
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(container);
    window.addEventListener("resize", updateScale);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [baseWidth]);

  const hasScale = Boolean(baseWidth && baseHeight);

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-full overflow-hidden rounded-[16px] sm:rounded-[20px] border border-[#e2e8f0] bg-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.12),0_0_1px_rgba(15,23,42,0.08)] ${className}`}
      style={hasScale ? { aspectRatio: `${baseWidth} / ${(baseHeight || 600) + 44}` } : undefined}
    >
      {/* Window Header */}
      <div className="flex h-11 items-center justify-between border-b border-[#e2e8f0] bg-[#f8fafc] px-3 sm:px-4 select-none flex-none">
        {/* Traffic Lights */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#ff5f57] border border-[#e0443e]/50" />
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#febc2e] border border-[#d89e24]/50" />
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#28c840] border border-[#1aab29]/50" />
        </div>

        {/* URL Pill */}
        <div className="mx-2 flex max-w-[420px] flex-1 items-center justify-center gap-2 overflow-hidden rounded-md border border-[#e2e8f0] bg-white px-3 py-1 text-[11px] sm:text-[12px] text-slate-500 font-mono shadow-xs">
          <svg
            className="h-3 w-3 text-slate-400 flex-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="truncate">{url}</span>
        </div>

        {/* Live Badge */}
        {badge && (
          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-700">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span>{badge}</span>
          </div>
        )}
      </div>

      {/* Frame Content */}
      {hasScale ? (
        <div className="relative w-full overflow-hidden bg-[#f8fafc]" style={{ height: `calc(100% - 44px)` }}>
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
            }}
          >
            {children}
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-full overflow-x-auto bg-[#f8fafc]">{children}</div>
      )}
    </div>
  );
}
