"use client";

import React from "react";
import { AutomationStudioView } from "../product/AutomationStudioView";

export function AutomationWorkflowMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full rounded-[14px] border border-slate-300 shadow-2xl overflow-hidden bg-white ${className}`}>
      {/* Studio Header bar */}
      <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="font-mono bg-white px-4 py-0.5 rounded border border-slate-200 text-slate-700">
          Automations Studio · Visual Trigger Pipeline
        </div>
        <span className="font-bold text-[#db2777]">Live Engine</span>
      </div>

      <div className="min-h-[440px]">
        <AutomationStudioView />
      </div>
    </div>
  );
}
