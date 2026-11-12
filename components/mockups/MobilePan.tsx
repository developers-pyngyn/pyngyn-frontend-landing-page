import React from "react";

/**
 * Wide product mockups on phones. Every mockup scales itself to its container's width,
 * so on a 390px phone a 1040–1440px desktop screen ends up at a third of its size and
 * unreadable. Below `sm`, this gives the mockup a wider box (`minWidth`) inside a
 * horizontal scroller, so it renders at a readable size and visitors swipe across it.
 * From `sm` up it is a plain pass-through. The page itself never scrolls sideways.
 */
export function MobilePan({
  children,
  minWidth = 640,
  className = "",
}: {
  children: React.ReactNode;
  minWidth?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="-mx-4 overflow-x-auto overscroll-x-contain px-4 pb-3 pt-1 [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-0 [&::-webkit-scrollbar]:hidden">
        <div
          className="min-w-[var(--pan-min)] sm:min-w-0"
          style={{ ["--pan-min" as string]: `${minWidth}px` }}
        >
          {children}
        </div>
      </div>
      <p className="mt-1 flex items-center justify-center gap-1.5 text-[12px] font-medium text-slate-500 sm:hidden" aria-hidden="true">
        <span>←</span> Swipe to explore the screen <span>→</span>
      </p>
    </div>
  );
}
