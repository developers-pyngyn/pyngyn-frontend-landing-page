"use client";

import React, { useState } from "react";
import { Zap, ArrowRight, MessageSquare, AlertCircle, CheckCircle2, Play, Settings, Sparkles } from "lucide-react";

export const AutomationStudioView: React.FC = () => {
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [lastExecuted, setLastExecuted] = useState("Today, 14:22");

  const runSimulation = () => {
    setIsRunningSim(true);
    setTimeout(() => {
      setIsRunningSim(false);
      setLastExecuted("Just now");
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/70 p-4 select-none overflow-y-auto space-y-4 text-[12.5px]">
      {/* Studio Header */}
      <div className="bg-white border border-slate-200 rounded-[12px] p-4 shadow-2xs flex items-center justify-between gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#db2777]" />
            <h2 className="font-extrabold text-[15px] text-slate-900 leading-tight">
              Rule #AUT-04: GSTR-2B Supplier ITC Chase &amp; Escalation
            </h2>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
              Active Workflow
            </span>
          </div>
          <p className="text-[11.5px] text-slate-500 mt-0.5">
            Auto-detects supplier filing discrepancies &gt;₹50,000 and initiates WhatsApp outreach to supplier accounts teams.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={runSimulation}
            disabled={isRunningSim}
            className="px-3 py-1.5 rounded-[7px] bg-[#14223d] hover:bg-[#1c2e4f] text-white text-[11.5px] font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer disabled:opacity-60"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>{isRunningSim ? "Running Rule..." : "Test Trigger"}</span>
          </button>
        </div>
      </div>

      {/* Visual Node Diagram */}
      <div className="bg-white border border-slate-200 rounded-[12px] p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <span className="font-bold text-slate-800 text-[13px]">Workflow Canvas: Logic Pipeline</span>
          <span className="text-[11px] font-mono text-slate-400">Triggered 18 times this month · Last: {lastExecuted}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
          {/* Node 1: Trigger */}
          <div className="p-3.5 bg-indigo-50/60 border border-indigo-200 rounded-[10px] space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-indigo-700 bg-white px-1.5 py-0.2 rounded border border-indigo-200">
                1. TRIGGER
              </span>
              <AlertCircle className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-[13px]">GSTR-2B Mismatch Detected</h4>
            <p className="text-[11.5px] text-slate-600">
              When ledger scrutiny identifies unmatched ITC variance exceeding <strong>₹50,000</strong> on monthly CBIC sync.
            </p>
          </div>

          {/* Node 2: Condition Gate */}
          <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-[10px] space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-amber-700 bg-white px-1.5 py-0.2 rounded border border-amber-200">
                2. FILTER GATE
              </span>
              <Settings className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-[13px]">Supplier Inactivity Check</h4>
            <p className="text-[11.5px] text-slate-600">
              Condition: Supplier has not uploaded invoice within <strong>14 days</strong> of supply and no credit note recorded.
            </p>
          </div>

          {/* Node 3: Automated Actions */}
          <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-[10px] space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-white px-1.5 py-0.2 rounded border border-emerald-200">
                3. MULTI-ACTION
              </span>
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-[13px]">Dispatch WhatsApp + Create Task</h4>
            <p className="text-[11.5px] text-slate-600">
              1. Sends branded WhatsApp reminder to supplier CFO.
              <br />
              2. Creates internal review task assigned to <strong>Aditya Sharma</strong>.
            </p>
          </div>
        </div>

        {/* Execution Log */}
        <div className="p-3 bg-slate-50 rounded-[8px] border border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Latest Successful Run:</strong> Auto-dispatched WhatsApp chase to Oswal Exports supplier (Jain Traders, GSTIN: 27AABJ0981K) for ₹3.2L ITC gap.
            </span>
          </div>
          <span className="font-mono text-emerald-700 font-bold shrink-0">Status: 200 OK</span>
        </div>
      </div>
    </div>
  );
};
