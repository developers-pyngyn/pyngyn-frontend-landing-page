"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  UploadCloud,
  FileCheck,
  CheckCircle2,
  Lock,
  Download,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export const ClientPortalView: React.FC = () => {
  const [approvedItems, setApprovedItems] = useState<string[]>([]);
  const [isUploaded, setIsUploaded] = useState(false);

  const toggleApprove = (id: string) => {
    setApprovedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/70 p-4 select-none overflow-y-auto space-y-4 text-[12.5px]">
      {/* Branded Portal Header */}
      <div className="bg-white border border-slate-200 rounded-[12px] p-4 shadow-2xs flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[8px] bg-[#14223d] text-white flex items-center justify-center font-bold text-[16px] shadow-2xs">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-[15px] text-slate-900 leading-tight">
                Sharma &amp; Associates Client Space
              </h2>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" />
                <span>Magic Link Active</span>
              </span>
            </div>
            <p className="text-[11.5px] text-slate-500">
              Client Portal for <strong className="text-slate-800">Oswal Exports</strong> · Logged in as Sunita Oswal (Managing Partner)
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10.5px] text-slate-400 font-bold block uppercase tracking-wider">Security</span>
          <span className="font-mono text-[11px] text-slate-700">AES-256 Multi-Tenant Isolation</span>
        </div>
      </div>

      {/* Deliverables Pending Client Sign-Off */}
      <div className="bg-white border border-slate-200 rounded-[12px] p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <h3 className="font-bold text-slate-900 text-[13.5px]">Deliverables Requiring Your Approval</h3>
            <p className="text-[11px] text-slate-500">Review prepared computations before statutory portal submission.</p>
          </div>
          <span className="text-[10.5px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded">
            Action Needed
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {[
            {
              id: "item-01",
              title: "GSTR-1 Monthly Return Filing (August 2026)",
              amount: "Net Tax Payable: ₹2,84,910",
              note: "Sales turnover reconciled with E-way bills. Partner signed off.",
            },
            {
              id: "item-02",
              title: "Advance Tax Q2 FY 2026-27 Challan Verification",
              amount: "Calculated Installment: ₹4,50,000",
              note: "Direct Tax ITD challan code 280 generated.",
            },
          ].map((item) => {
            const isApproved = approvedItems.includes(item.id);
            return (
              <div key={item.id} className="py-3 flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h4 className="font-bold text-slate-900 text-[13px]">{item.title}</h4>
                  <div className="text-[11.5px] font-mono text-slate-600 mt-0.5">{item.amount}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.note}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="px-2.5 py-1 rounded-[6px] border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download Draft</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleApprove(item.id)}
                    className={`px-3 py-1 rounded-[6px] text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                      isApproved
                        ? "bg-emerald-600 text-white"
                        : "bg-[#14223d] hover:bg-[#1c2e4f] text-white"
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{isApproved ? "Approved ✓" : "Review & Approve"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Document Request Dropzone */}
      <div className="bg-white border border-slate-200 rounded-[12px] p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <h3 className="font-bold text-slate-900 text-[13.5px]">Requested Working Papers</h3>
            <p className="text-[11px] text-slate-500">Upload pending documents directly into your secure audit folder.</p>
          </div>
          <span className="text-[10.5px] font-bold bg-pink-50 text-[#db2777] border border-pink-200 px-2 py-0.5 rounded">
            Due Today
          </span>
        </div>

        <div
          onClick={() => setIsUploaded(true)}
          className={`border-2 border-dashed rounded-[10px] p-6 text-center transition-all cursor-pointer ${
            isUploaded
              ? "border-emerald-500 bg-emerald-50/40"
              : "border-slate-300 hover:border-pink-500 bg-slate-50/50"
          }`}
        >
          <UploadCloud className={`w-8 h-8 mx-auto mb-2 ${isUploaded ? "text-emerald-600" : "text-slate-400"}`} />
          {isUploaded ? (
            <div className="space-y-1">
              <span className="font-bold text-emerald-700 text-[13px] block">
                ✓ August_Purchase_Invoices_BRC.xlsx uploaded successfully!
              </span>
              <span className="text-[11px] text-slate-500">Auto-notified Priya Agarwal (Sr. Accountant)</span>
            </div>
          ) : (
            <div className="space-y-1">
              <span className="font-bold text-slate-800 text-[13px] block">
                Drop August BRC &amp; Purchase Register Files Here
              </span>
              <span className="text-[11px] text-slate-500">
                Supports Excel, PDF, CSV, Scanned Vouchers (Max 50MB) · Click to simulate upload
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
