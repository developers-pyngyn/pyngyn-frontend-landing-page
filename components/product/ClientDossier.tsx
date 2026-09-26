"use client";

import React, { useState } from "react";
import {
  Building2,
  ShieldCheck,
  FileText,
  Key,
  Database,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  CreditCard,
  Briefcase,
  Clock,
  Layers,
} from "lucide-react";
import { ClientProfile } from "./types";
import { INITIAL_CLIENTS } from "./data";

export const ClientDossier: React.FC<{ client?: ClientProfile }> = ({
  client = INITIAL_CLIENTS[0],
}) => {
  const [activeTab, setActiveTab] = useState<"registrations" | "vault" | "financials">("registrations");

  return (
    <div className="flex flex-col h-full bg-slate-50/50 p-3 sm:p-4 select-none overflow-y-auto space-y-4">
      {/* 1. Client Identity & Telemetry Bar */}
      <div className="bg-white border border-slate-200 rounded-[12px] p-4 shadow-2xs space-y-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[10px] bg-gradient-to-tr from-[#14223d] to-[#db2777] text-white flex items-center justify-center font-extrabold text-[20px] shadow-xs">
              {client.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-[17px] font-extrabold text-slate-900 leading-tight">
                  {client.name}
                </h2>
                <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                  {client.code}
                </span>
                <span
                  className={`text-[10.5px] font-bold px-2 py-0.5 rounded border ${
                    client.health === "at-risk"
                      ? "bg-rose-50 text-rose-700 border-rose-200"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  }`}
                >
                  {client.health === "at-risk" ? "● At-Risk (Filing Blocker)" : "● Healthy (Compliant)"}
                </span>
              </div>
              <p className="text-[12px] text-slate-500 mt-0.5">
                {client.entityType} · {client.industry} · Turnover {client.turnover} · Tier {client.tier} Account
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
                Monthly Retainer
              </div>
              <div className="text-[16px] font-mono font-extrabold text-slate-900">
                ₹{client.retainerMonthly.toLocaleString("en-IN")}/mo
              </div>
            </div>
          </div>
        </div>

        {/* Quick Badges: PAN, TAN, UDYAM, Books */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-[11.5px]">
          <div className="bg-slate-50 p-2 rounded-[6px] border border-slate-200">
            <span className="text-slate-400 font-medium block text-[10px] uppercase">Permanent Account No</span>
            <span className="font-mono font-bold text-slate-800">{client.pan}</span>
          </div>
          <div className="bg-slate-50 p-2 rounded-[6px] border border-slate-200">
            <span className="text-slate-400 font-medium block text-[10px] uppercase">Tax Deduction Acct</span>
            <span className="font-mono font-bold text-slate-800">{client.tan}</span>
          </div>
          <div className="bg-slate-50 p-2 rounded-[6px] border border-slate-200">
            <span className="text-slate-400 font-medium block text-[10px] uppercase">MSME Udyam Registration</span>
            <span className="font-mono font-bold text-slate-800 truncate block">{client.udyam}</span>
          </div>
          <div className="bg-slate-50 p-2 rounded-[6px] border border-slate-200">
            <span className="text-slate-400 font-medium block text-[10px] uppercase">Accounting Software</span>
            <span className="font-semibold text-slate-800 truncate block">
              {client.books.software} ({client.books.lastSynced})
            </span>
          </div>
        </div>
      </div>

      {/* 2. Sub-Tabs: Registrations, Vault, Financials */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 text-[12px] font-bold text-slate-600">
        <button
          type="button"
          onClick={() => setActiveTab("registrations")}
          className={`px-3 py-1 rounded-[6px] transition-colors cursor-pointer ${
            activeTab === "registrations"
              ? "bg-[#14223d] text-white shadow-2xs"
              : "hover:bg-slate-200 text-slate-600"
          }`}
        >
          GSTIN Registrations ({client.gstins.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("vault")}
          className={`px-3 py-1 rounded-[6px] transition-colors cursor-pointer ${
            activeTab === "vault"
              ? "bg-[#14223d] text-white shadow-2xs"
              : "hover:bg-slate-200 text-slate-600"
          }`}
        >
          DSC Token Vault &amp; Custody
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("financials")}
          className={`px-3 py-1 rounded-[6px] transition-colors cursor-pointer ${
            activeTab === "financials"
              ? "bg-[#14223d] text-white shadow-2xs"
              : "hover:bg-slate-200 text-slate-600"
          }`}
        >
          Financials &amp; Audit Status
        </button>
      </div>

      {/* 3. Tab Content */}
      {activeTab === "registrations" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {client.gstins.map((g, idx) => (
            <div
              key={g.gstin}
              className="bg-white border border-slate-200 rounded-[10px] p-3 shadow-2xs space-y-2 hover:border-pink-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-800">{g.state}</span>
                <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  Active
                </span>
              </div>
              <div className="font-mono font-extrabold text-[13px] text-slate-900 tracking-wider">
                {g.gstin}
              </div>
              <div className="text-[10.5px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                <span>Monthly GSTR-1 &amp; 3B</span>
                <span className="text-slate-700 font-semibold">LUT Valid till 2027</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "vault" && (
        <div className="bg-white border border-slate-200 rounded-[10px] p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-[#db2777]" />
              <h3 className="font-bold text-slate-900 text-[13px]">
                Digital Signature Certificate (DSC) Physical Custody
              </h3>
            </div>
            <span className="text-[10.5px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Passcode Token Update Due
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px]">
            <div className="p-3 bg-slate-50 rounded-[8px] border border-slate-200 space-y-1">
              <span className="text-[10.5px] text-slate-500 font-bold block uppercase">Signatory &amp; Serial</span>
              <div className="font-bold text-slate-900">Sunita Oswal (Managing Partner)</div>
              <div className="font-mono text-slate-600 text-[11px]">Serial: 6E4B9F2A10C837 · eMudhra Class 3</div>
              <div className="text-slate-500 text-[11px]">Valid from Apr 2025 till Apr 2027</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-[8px] border border-slate-200 space-y-1">
              <span className="text-[10.5px] text-slate-500 font-bold block uppercase">Vault Storage &amp; Custodian</span>
              <div className="font-bold text-slate-900">Sharma &amp; Associates Vault Lock 1</div>
              <div className="text-slate-700 font-medium">Designated Custodian: Rajesh Sharma (Partner)</div>
              <div className="text-emerald-700 text-[11px] font-semibold">✓ 2FA Verified &amp; Audit Logged</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "financials" && (
        <div className="bg-white border border-slate-200 rounded-[10px] p-4 shadow-2xs space-y-3">
          <h3 className="font-bold text-slate-900 text-[13px]">
            Statutory Audit &amp; Financial Scope
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12px]">
            <div className="p-3 bg-slate-50 rounded-[8px] border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Previous FY Turnover</span>
              <span className="font-mono font-bold text-slate-900 text-[14px]">₹3,80,00,000</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-[8px] border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Tax Audit Applicability</span>
              <span className="font-bold text-blue-700">Applicable u/s 44AB (Form 3CD)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-[8px] border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Advance Tax Regime</span>
              <span className="font-bold text-slate-800">Quarterly (15% Q1, 45% Q2, 75% Q3, 100% Q4)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
