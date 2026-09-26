"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckSquare,
  AlertTriangle,
  DollarSign,
  Users,
  Activity,
  BarChart2,
  TrendingUp,
  Clock,
} from "lucide-react";
import { TEAM_MEMBERS } from "./data";

export const WorkloadOverview: React.FC = () => {
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  // Donut chart status breakdown slices
  const statusSlices = [
    { id: "completed", label: "Complete", count: 14, pct: 34, color: "#2563EB" },
    { id: "in_progress", label: "In Progress", count: 18, pct: 42, color: "#0D9488" },
    { id: "pending", label: "At Risk / Overdue", count: 6, pct: 14, color: "#F43F5E" },
    { id: "not_started", label: "Not Started", count: 4, pct: 10, color: "#818CF8" },
  ];

  // Column chart categories
  const categories = [
    { label: "Audit", height: "75%", count: 12, color: "#6366F1" },
    { label: "GST", height: "95%", count: 18, color: "#14B8A6" },
    { label: "Tax 3CD", height: "60%", count: 10, color: "#2563EB" },
    { label: "ROC/MCA", height: "40%", count: 6, color: "#06B6D4" },
    { label: "TDS", height: "50%", count: 8, color: "#3B82F6" },
    { label: "Adv Tax", height: "30%", count: 4, color: "#10B981" },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50/50 p-3 sm:p-4 select-none overflow-y-auto space-y-4">
      {/* 1. TOP TELEMETRY KPI SUMMARY CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {/* Metric 1: Active Tasks */}
        <div className="p-3 bg-white border border-slate-200 rounded-[10px] shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">Active Tasks</span>
            <div className="w-6 h-6 rounded-[6px] bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <CheckSquare className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-[22px] font-extrabold font-mono text-slate-900">42</span>
            <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.2 rounded">
              +4 completed
            </span>
          </div>
          <div className="text-[10.5px] text-slate-400 truncate">Across 24 active client retainers</div>
        </div>

        {/* Metric 2: Capacity Utilization */}
        <div className="p-3 bg-white border border-slate-200 rounded-[10px] shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">Capacity Utilization</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
              118% Overload
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-[22px] font-extrabold font-mono text-slate-900">118%</span>
            <span className="text-[10.5px] font-bold text-slate-500 font-mono">165 / 140h</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-rose-500 to-indigo-600 rounded-full w-[95%]" />
          </div>
        </div>

        {/* Metric 3: Retainer Revenue */}
        <div className="p-3 bg-white border border-slate-200 rounded-[10px] shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">Retainer Value</span>
            <div className="w-6 h-6 rounded-[6px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-[22px] font-extrabold font-mono text-slate-900">₹94.8L</span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.2 rounded">
              ↑ 12.4% MoM
            </span>
          </div>
          <div className="text-[10.5px] text-slate-400 truncate">Annual contracted recurring fees</div>
        </div>

        {/* Metric 4: Attention / Risk */}
        <div className="p-3 bg-white border border-slate-200 rounded-[10px] shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">At Risk / Overdue</span>
            <div className="w-6 h-6 rounded-[6px] bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-[22px] font-extrabold font-mono text-slate-900">3</span>
            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-100 px-1.5 py-0.2 rounded">
              Need Review
            </span>
          </div>
          <div className="text-[10.5px] text-slate-400 truncate">Blocked deliverables or due soon</div>
        </div>
      </div>

      {/* 2. ROW 1 CHARTS: SCOPE DISTRIBUTION & SVG DONUT STATUS BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* CHART 1: SCOPE DISTRIBUTION (Column Bar Chart) */}
        <div className="md:col-span-6 bg-white border border-slate-200 rounded-[10px] p-3.5 shadow-2xs flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-[13px]">Task Lengths &amp; Categories</h3>
              <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Scope Split</span>
            </div>
            <p className="text-[11px] text-slate-500">Deliverable distribution by compliance category.</p>
          </div>

          <div className="py-3">
            <div className="h-28 flex items-end justify-between gap-2 px-2 border-b border-slate-200 relative">
              {categories.map((c) => (
                <div key={c.label} className="flex-1 flex flex-col items-center gap-1 group relative">
                  <div
                    className="w-full rounded-t-[4px] transition-all group-hover:brightness-95 cursor-pointer shadow-3xs"
                    style={{ height: c.height, backgroundColor: c.color }}
                  />
                  <span className="text-[9.5px] font-semibold text-slate-600 truncate">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-500">
            <span>6 Primary Compliance Verticals</span>
            <span className="font-mono font-bold text-slate-700">42 Total Filings</span>
          </div>
        </div>

        {/* CHART 2: SVG CIRCULAR DONUT CHART */}
        <div className="md:col-span-6 bg-white border border-slate-200 rounded-[10px] p-3.5 shadow-2xs flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-[13px]">Tasks Status Breakdown</h3>
              <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Filing Stage</span>
            </div>
            <p className="text-[11px] text-slate-500">Live ratio of completed vs in-progress &amp; risk deliverables.</p>
          </div>

          <div className="py-2 flex items-center justify-center relative">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {(() => {
                  let accumulatedPct = 0;
                  const radius = 38;
                  const circumference = 2 * Math.PI * radius;

                  return statusSlices.map((slice) => {
                    const strokeDasharray = `${(slice.pct / 100) * circumference} ${circumference}`;
                    const strokeDashoffset = -((accumulatedPct / 100) * circumference);
                    accumulatedPct += slice.pct;
                    const isHovered = hoveredSlice === slice.id;

                    return (
                      <circle
                        key={slice.id}
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="transparent"
                        stroke={slice.color}
                        strokeWidth={isHovered ? 20 : 16}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-150 cursor-pointer"
                        onMouseEnter={() => setHoveredSlice(slice.id)}
                        onMouseLeave={() => setHoveredSlice(null)}
                      />
                    );
                  });
                })()}
              </svg>

              {/* Center Donut Readout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none text-center">
                <span className="text-[18px] font-extrabold font-mono text-slate-900 leading-none">42</span>
                <span className="text-[9.5px] font-bold text-slate-400 uppercase mt-0.5">Tasks</span>
              </div>
            </div>

            {/* Right Legend */}
            <div className="ml-4 space-y-1.5 text-[11px]">
              {statusSlices.map((s) => (
                <div
                  key={s.id}
                  onMouseEnter={() => setHoveredSlice(s.id)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
                    hoveredSlice === s.id ? "font-bold text-slate-900" : "text-slate-600"
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-[2px] shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="truncate">{s.label}:</span>
                  <span className="font-mono font-bold">{s.count} ({s.pct}%)</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-500">
            <span>76% In-Flight or Done</span>
            <span className="text-rose-600 font-bold">14% Need Attention</span>
          </div>
        </div>
      </div>

      {/* 3. ROW 2: TEAM BANDWIDTH & CAPACITY PROGRESS BARS */}
      <div className="bg-white border border-slate-200 rounded-[10px] p-3.5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <h3 className="font-bold text-slate-900 text-[13px]">Team Workload &amp; Bandwidth Allocation</h3>
            <p className="text-[11px] text-slate-500">Active billable hours vs maximum capacity per practitioner.</p>
          </div>
          <span className="text-[10px] font-mono font-bold bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-700">
            Weekly 40h Threshold
          </span>
        </div>

        <div className="space-y-2.5">
          {TEAM_MEMBERS.map((m) => (
            <div key={m.id} className="space-y-1">
              <div className="flex items-center justify-between text-[11.5px]">
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full text-white font-bold text-[9px] flex items-center justify-center shrink-0"
                    style={{ backgroundColor: m.color }}
                  >
                    {m.initials}
                  </div>
                  <span className="font-bold text-slate-900">{m.name}</span>
                  <span className="text-slate-400 text-[10.5px]">({m.role})</span>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <span className="font-semibold text-slate-700">
                    {m.allocatedHours} / {m.capacityHours}h
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                      m.status === "overloaded"
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}
                  >
                    {m.utilizationPct}%
                  </span>
                </div>
              </div>

              {/* Utilization Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    m.utilizationPct > 100
                      ? "bg-gradient-to-r from-rose-500 to-rose-600"
                      : "bg-gradient-to-r from-teal-500 to-indigo-500"
                  }`}
                  style={{ width: `${Math.min(100, m.utilizationPct)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
