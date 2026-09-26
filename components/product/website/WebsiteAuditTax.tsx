"use client";

import React from "react";
import {
  ShieldCheck,
  TrendingUp,
  FileCheck2,
  AlertCircle,
  Clock,
  Download,
  RotateCw,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export const WebsiteAuditTax: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50/70 overflow-hidden select-none font-sans text-[12px] p-3 gap-3">
      {/* Dashboard Top Header Bar */}
      <div className="flex items-center justify-between bg-white px-3 py-2 rounded-[9px] border border-slate-200/90 shadow-2xs shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[6px] bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-[13px] font-extrabold text-slate-900 leading-tight">
              Statutory Audit &amp; Tax Command Dashboard
            </h2>
            <div className="flex items-center gap-2 text-[10.5px] text-slate-500">
              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                REAL-TIME RADAR
              </span>
              <span>·</span>
              <span className="font-mono">FY 2026-27</span>
              <span>·</span>
              <span>Partner: CA Nikhil Jain</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-2.5 py-1 rounded-[6px] border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Download className="w-3 h-3 text-slate-500" />
            <span>Export Report</span>
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-[6px] border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-2xs cursor-pointer"
            title="Refresh Radar"
          >
            <RotateCw className="w-3 h-3 text-slate-500" />
          </button>
        </div>
      </div>

      {/* 2x2 Grid of Product Widgets */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 min-h-0 overflow-y-auto">
        {/* WIDGET 1: Statutory Filing Deadlines */}
        <div className="bg-white border border-slate-200/90 rounded-[10px] p-3 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-extrabold text-slate-800">
                Statutory Filing Deadlines (Next 14 Days)
              </span>
              <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded">
                4 Active Deadlines
              </span>
            </div>

            <div className="space-y-2 text-[11.5px]">
              {/* Row 1 */}
              <div className="p-1.5 rounded-[6px] border border-slate-100 hover:bg-slate-50/80 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-800">GSTR-3B (Sep 20)</span>
                    <span className="text-[9.5px] font-mono bg-emerald-50 text-emerald-700 px-1 rounded border border-emerald-200">
                      GST
                    </span>
                  </div>
                  <span className="font-mono text-[10.5px] text-slate-600">
                    18 filed · 2 pending
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div className="h-full bg-emerald-500 rounded-full w-[90%]" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="p-1.5 rounded-[6px] border border-slate-100 hover:bg-slate-50/80 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-800">TDS Deposit Challan 281</span>
                    <span className="text-[9.5px] font-mono bg-amber-50 text-amber-700 px-1 rounded border border-amber-200">
                      TAX
                    </span>
                  </div>
                  <span className="font-mono text-[10.5px] text-slate-600">
                    24 filed · 0 pending
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div className="h-full bg-emerald-500 rounded-full w-[100%]" />
                </div>
              </div>

              {/* Row 3 */}
              <div className="p-1.5 rounded-[6px] border border-slate-100 hover:bg-slate-50/80 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-800">Tax Audit Sec 44AB (Sep 30)</span>
                    <span className="text-[9.5px] font-mono bg-blue-50 text-blue-700 px-1 rounded border border-blue-200">
                      AUDIT
                    </span>
                  </div>
                  <span className="font-mono text-[10.5px] text-amber-700 font-bold">
                    42 certified · 18 in review
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div className="h-full bg-amber-500 rounded-full w-[68%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-500 font-mono">
            <span>Unified CBDT &amp; GSTN Radar</span>
            <span className="text-emerald-700 font-bold">All APIs Synced</span>
          </div>
        </div>

        {/* WIDGET 2: Filing Velocity & Gauge */}
        <div className="bg-white border border-slate-200/90 rounded-[10px] p-3 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-extrabold text-slate-800">
                Filing Velocity &amp; Completion Health
              </span>
              <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded">
                Speedometer Gauge
              </span>
            </div>

            {/* Gauge visualization representation */}
            <div className="flex items-center justify-center py-2">
              <div className="relative flex flex-col items-center">
                <svg className="w-36 h-20 overflow-visible" viewBox="0 0 100 50">
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 10 50 A 40 40 0 0 1 76 18"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute bottom-0 text-center">
                  <span className="text-[26px] font-black font-mono text-slate-900 leading-none">
                    84%
                  </span>
                  <div className="text-[9.5px] text-slate-500 font-bold">ON-TIME VELOCITY</div>
                </div>
              </div>
            </div>

            {/* 3 mini stats */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-[6px] p-1.5 text-center">
                <div className="text-[14px] font-bold font-mono text-emerald-800">142</div>
                <div className="text-[9px] text-emerald-700 font-semibold uppercase">Timely</div>
              </div>
              <div className="bg-amber-50/70 border border-amber-200/70 rounded-[6px] p-1.5 text-center">
                <div className="text-[14px] font-bold font-mono text-amber-800">12</div>
                <div className="text-[9px] text-amber-700 font-semibold uppercase">Grace Period</div>
              </div>
              <div className="bg-blue-50/70 border border-blue-200/70 rounded-[6px] p-1.5 text-center">
                <div className="text-[14px] font-bold font-mono text-blue-800">0</div>
                <div className="text-[9px] text-blue-700 font-semibold uppercase">Penalties</div>
              </div>
            </div>
          </div>
        </div>

        {/* WIDGET 3: Audit Working Papers Tree */}
        <div className="bg-white border border-slate-200/90 rounded-[10px] p-3 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-extrabold text-slate-800">
                Audit Working Papers &amp; Engagement Scrutiny
              </span>
              <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200 px-1.5 py-0.5 rounded">
                Tree View
              </span>
            </div>

            <div className="space-y-1.5 text-[11.5px]">
              <div className="p-1.5 rounded-[6px] border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">Oswal Exports Pvt Ltd</div>
                  <div className="text-[10px] text-slate-500">Statutory Audit · Fieldwork</div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[11px] font-bold text-blue-700">82%</span>
                  <div className="text-[9.5px] text-slate-400">Reviewer: CA Nikhil</div>
                </div>
              </div>

              <div className="p-1.5 rounded-[6px] border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">Shreeji Constructions</div>
                  <div className="text-[10px] text-slate-500">Tax Audit Sec 44AB · Partner Signoff</div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[11px] font-bold text-emerald-700">94%</span>
                  <div className="text-[9.5px] text-slate-400">Reviewer: CA Nikhil</div>
                </div>
              </div>

              <div className="p-1.5 rounded-[6px] border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">Apex Healthcare LLP</div>
                  <div className="text-[10px] text-slate-500">Internal Controls &amp; CARO · Planning</div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[11px] font-bold text-amber-700">35%</span>
                  <div className="text-[9.5px] text-slate-400">Reviewer: Pooja A.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WIDGET 4: Sec 44AB Tax Audit Progress */}
        <div className="bg-white border border-slate-200/90 rounded-[10px] p-3 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-extrabold text-slate-800">
                Sec 44AB Tax Audit Progress (68 of 80 Complete)
              </span>
              <span className="text-[10px] font-mono font-bold bg-purple-50 text-purple-800 border border-purple-200 px-1.5 py-0.5 rounded">
                Milestones
              </span>
            </div>

            <div className="space-y-2 text-[11px]">
              <div>
                <div className="flex justify-between mb-0.5">
                  <span className="font-semibold text-slate-700">Form 3CA/3CD Drafts</span>
                  <span className="font-mono font-bold text-slate-800">68/80 (85%)</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div className="h-full bg-blue-600 rounded-full w-[85%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-0.5">
                  <span className="font-semibold text-slate-700">Clause 44 Breakdown</span>
                  <span className="font-mono font-bold text-slate-800">62/80 (77.5%)</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div className="h-full bg-teal-500 rounded-full w-[77.5%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-0.5">
                  <span className="font-semibold text-slate-700">UDIN Generation</span>
                  <span className="font-mono font-bold text-slate-800">54/80 (67.5%)</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div className="h-full bg-purple-600 rounded-full w-[67.5%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-500 font-mono">
            <span>Deadline: Sep 30, 2026</span>
            <span className="text-amber-700 font-bold">6 Days Remaining</span>
          </div>
        </div>
      </div>
    </div>
  );
};
