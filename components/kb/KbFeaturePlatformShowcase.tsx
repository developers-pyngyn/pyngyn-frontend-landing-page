"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  FileText,
  Building2,
  Calendar,
  Zap,
  KeyRound,
  MessageSquare,
  Database,
  RefreshCw,
  Sliders,
  Download,
  Lock,
  Check,
  Eye,
  Monitor,
  ImageIcon,
  Sparkles,
  ArrowRight,
  Send,
  FileCheck2,
  AlertCircle,
  FileSpreadsheet,
} from "lucide-react";
import type { KbArticle } from "@/components/kb-data";

export function KbFeaturePlatformShowcase({ article }: { article: KbArticle }) {
  const [viewMode, setViewMode] = useState<"interactive" | "screenshot">("interactive");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [resolvedInvoices, setResolvedInvoices] = useState<Record<string, boolean>>({});

  const route = article.routePath || `app.pyngyn.ai/clientspace/${article.slug}`;
  const screenshotSrc = article.cover || `/kb/platform/${article.slug}.png`;

  return (
    <div className="mt-8 overflow-hidden rounded-[20px] border border-slate-200/90 bg-white shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08),0_0_1px_rgba(15,23,42,0.12)]">
      {/* Window Titlebar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-[#f8fafc] px-4 py-3 select-none">
        {/* Left: Window Dots */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57] border border-[#e0443e]/40 shadow-xs" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e] border border-[#d89e24]/40 shadow-xs" />
            <span className="h-3 w-3 rounded-full bg-[#28c840] border border-[#1aab29]/40 shadow-xs" />
          </div>
          <span className="hidden md:inline-block pl-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Pyngyn ClientSpace Engine
          </span>
        </div>

        {/* Center: URL Pill */}
        <div className="flex flex-1 max-w-[460px] items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] text-slate-600 font-mono shadow-2xs">
          <Lock className="h-3 w-3 text-emerald-600 flex-none" />
          <span className="truncate">{route}</span>
        </div>

        {/* Right: View Toggle Controls */}
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-[12px]">
          <button
            type="button"
            onClick={() => setViewMode("interactive")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-semibold transition-all ${
              viewMode === "interactive"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Monitor className="h-3.5 w-3.5 text-accent" />
            <span>Interactive UI</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("screenshot")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-semibold transition-all ${
              viewMode === "screenshot"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ImageIcon className="h-3.5 w-3.5 text-slate-600" />
            <span>App Screenshot</span>
          </button>
        </div>
      </div>

      {/* Frame Body */}
      <div className="relative bg-[#f8fafc] p-4 sm:p-6 min-h-[440px]">
        {viewMode === "interactive" ? (
          <InteractiveView
            type={article.mockupType || "gst-recon"}
            article={article}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            resolvedInvoices={resolvedInvoices}
            setResolvedInvoices={setResolvedInvoices}
          />
        ) : (
          <ScreenshotView screenshotSrc={screenshotSrc} title={article.title} />
        )}
      </div>

      {/* Frame Footer Caption Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-5 py-3 text-[12px] text-slate-500">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-semibold text-slate-700">ClientSpace Real-Time Platform:</span>
          <span>{article.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600">
            {viewMode === "interactive" ? "Live Interactive Sandbox" : "Verified App Snapshot"}
          </span>
          <Link
            href="/demo"
            className="flex items-center gap-1 font-semibold text-accent hover:underline"
          >
            <span>Test drive this module</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Mockup Switcher
// ─────────────────────────────────────────────────────────────────────────────
function InteractiveView({
  type,
  article,
  activeTab,
  setActiveTab,
  resolvedInvoices,
  setResolvedInvoices,
}: {
  type: string;
  article: KbArticle;
  activeTab: string;
  setActiveTab: (t: string) => void;
  resolvedInvoices: Record<string, boolean>;
  setResolvedInvoices: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) {
  switch (type) {
    case "gst-recon":
      return (
        <GstReconInteractive
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          resolved={resolvedInvoices}
          setResolved={setResolvedInvoices}
        />
      );
    case "statutory-calendar":
      return <StatutoryCalendarInteractive />;
    case "four-eye-review":
      return <FourEyeReviewInteractive />;
    case "dsc-vault":
      return <DscVaultInteractive />;
    case "whatsapp-inbox":
      return <WhatsAppInboxInteractive />;
    case "tally-connector":
      return <TallyConnectorInteractive />;
    case "client-portal":
      return <ClientPortalInteractive />;
    case "workload-cockpit":
      return <WorkloadCockpitInteractive />;
    case "client-hierarchies":
      return <ClientHierarchyInteractive />;
    case "direct-tax":
      return <DirectTaxInteractive />;
    case "intake-pipeline":
      return <IntakePipelineInteractive />;
    case "payments":
      return <PaymentsInteractive />;
    case "audit-papers":
      return <AuditPapersInteractive />;
    default:
      return <GstReconInteractive activeTab={activeTab} setActiveTab={setActiveTab} resolved={resolvedInvoices} setResolved={setResolvedInvoices} />;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. GST 3-Way Reconciliation Interactive UI
// ─────────────────────────────────────────────────────────────────────────────
function GstReconInteractive({
  activeTab,
  setActiveTab,
  resolved,
  setResolved,
}: {
  activeTab: string;
  setActiveTab: (t: string) => void;
  resolved: Record<string, boolean>;
  setResolved: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) {
  const invoices = [
    {
      id: "inv-1",
      vendor: "Tata Communications Ltd",
      gstin: "27AAACT2727Q1ZW",
      invNo: "TC/MUM/8821",
      date: "14 Aug 2026",
      taxable: "₹1,45,000",
      itc: "₹26,100",
      status: "MATCHED",
      tag: "100% Taxable & Tax Match",
    },
    {
      id: "inv-2",
      vendor: "Infosys Cloud Solutions",
      gstin: "29AABCI1234F1Z5",
      invNo: "INF-2026-902",
      date: "18 Aug 2026",
      taxable: "₹3,20,000",
      itc: "₹57,600",
      status: "MATCHED",
      tag: "Matched with 2B Filing",
    },
    {
      id: "inv-3",
      vendor: "Reliance Logistics Cargo",
      gstin: "24AABCR4455P1ZK",
      invNo: "RLC-0941",
      date: "22 Aug 2026",
      taxable: "₹82,400",
      itc: "₹14,832",
      status: resolved["inv-3"] ? "MATCHED" : "MISMATCH",
      tag: resolved["inv-3"] ? "Discrepancy Approved by Manager" : "Tax Diff: ₹412 in Books",
    },
    {
      id: "inv-4",
      vendor: "QuickMove Transport LLP",
      gstin: "27AAHFQ9912M1Z2",
      invNo: "QM/AUG/012",
      date: "26 Aug 2026",
      taxable: "₹45,000",
      itc: "₹8,100",
      status: resolved["inv-4"] ? "MATCHED" : "MISSING_IN_2B",
      tag: resolved["inv-4"] ? "Vendor Filed GSTR-1 via WhatsApp Alert" : "Vendor GSTR-1 Pending",
    },
  ];

  const handleResolve = (id: string) => {
    setResolved((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-4">
      {/* Top Banner / Metrics */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="text-[11px] font-semibold uppercase text-slate-500">2B Eligible ITC</div>
          <div className="mt-1 font-mono text-[18px] font-bold text-slate-900">₹18,42,900</div>
          <div className="mt-0.5 text-[10.5px] text-emerald-600 font-medium">✓ Pulled via GSP 04:00 AM</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="text-[11px] font-semibold uppercase text-slate-500">Books ITC Claimed</div>
          <div className="mt-1 font-mono text-[18px] font-bold text-slate-900">₹18,34,500</div>
          <div className="mt-0.5 text-[10.5px] text-slate-500">Tally Prime Synced</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="text-[11px] font-semibold uppercase text-slate-500">Recon Score</div>
          <div className="mt-1 font-mono text-[18px] font-bold text-emerald-600">99.4%</div>
          <div className="mt-0.5 text-[10.5px] text-emerald-700">412 / 414 Invoices Matched</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="text-[11px] font-semibold uppercase text-slate-500">ITC At Risk</div>
          <div className="mt-1 font-mono text-[18px] font-bold text-amber-600">
            {resolved["inv-3"] && resolved["inv-4"] ? "₹0.00" : "₹8,512"}
          </div>
          <div className="mt-0.5 text-[10.5px] text-amber-700">
            {resolved["inv-3"] && resolved["inv-4"] ? "All Discrepancies Resolved" : "Requires Vendor Action"}
          </div>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-2.5">
        <div className="flex items-center gap-1.5 text-[12px]">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
              activeTab === "all" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            All Invoices (4)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("mismatch")}
            className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
              activeTab === "mismatch" ? "bg-amber-100 text-amber-900" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Discrepancies ({resolved["inv-3"] && resolved["inv-4"] ? 0 : 2})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400">GSTIN: 27AABCU9603R1ZX (Aug 2026)</span>
          <button
            type="button"
            className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1 text-[11.5px] font-semibold text-white hover:bg-emerald-700 transition-colors shadow-2xs"
          >
            <Check className="h-3 w-3" />
            <span>Push Matched to GSTR-3B</span>
          </button>
        </div>
      </div>

      {/* Reconciliation Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
        <table className="w-full text-left text-[12px]">
          <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600">
            <tr>
              <th className="px-3.5 py-2.5">Supplier / Party</th>
              <th className="px-3.5 py-2.5">Invoice #</th>
              <th className="px-3.5 py-2.5">Taxable Value</th>
              <th className="px-3.5 py-2.5">ITC Amount</th>
              <th className="px-3.5 py-2.5">Match Status</th>
              <th className="px-3.5 py-2.5 text-right">Quick Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices
              .filter((inv) => (activeTab === "mismatch" ? inv.status !== "MATCHED" : true))
              .map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-3.5 py-2.5">
                    <div className="font-semibold text-slate-900">{inv.vendor}</div>
                    <div className="font-mono text-[10.5px] text-slate-400">{inv.gstin}</div>
                  </td>
                  <td className="px-3.5 py-2.5 font-mono text-slate-700">{inv.invNo}</td>
                  <td className="px-3.5 py-2.5 font-mono text-slate-900">{inv.taxable}</td>
                  <td className="px-3.5 py-2.5 font-mono font-semibold text-slate-900">{inv.itc}</td>
                  <td className="px-3.5 py-2.5">
                    {inv.status === "MATCHED" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-800">
                        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
                        <span>{inv.tag}</span>
                      </span>
                    ) : inv.status === "MISMATCH" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10.5px] font-semibold text-amber-800">
                        <AlertTriangle className="h-2.5 w-2.5 text-amber-600" />
                        <span>{inv.tag}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2 py-0.5 text-[10.5px] font-semibold text-rose-800">
                        <AlertCircle className="h-2.5 w-2.5 text-rose-600" />
                        <span>{inv.tag}</span>
                      </span>
                    )}
                  </td>
                  <td className="px-3.5 py-2.5 text-right">
                    {inv.status === "MATCHED" ? (
                      <span className="text-[11px] font-medium text-emerald-600">✓ In GSTR-3B Table 4</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleResolve(inv.id)}
                        className="rounded-md border border-accent bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent hover:bg-accent hover:text-white transition-all shadow-2xs"
                      >
                        {inv.status === "MISMATCH" ? "Accept 2B Value" : "Send WhatsApp Chaser"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Statutory Compliance Calendar Interactive UI
// ─────────────────────────────────────────────────────────────────────────────
function StatutoryCalendarInteractive() {
  const events = [
    {
      date: "11 SEP 2026",
      regime: "GST",
      badgeBg: "bg-blue-50 text-blue-800 border-blue-200",
      form: "GSTR-1 Monthly Return",
      client: "Titanium Conglomerate (3 GSTINs)",
      status: "COMPLETED",
      details: "ARN: AA270926019842 · DSC Affixed by Rajiv Kapadia, FCA",
    },
    {
      date: "15 SEP 2026",
      regime: "Income Tax",
      badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
      form: "Advance Tax Q2 (45% Tranche)",
      client: "Horizon Exports & 18 SME Retainers",
      status: "COMPUTED",
      details: "Challans pre-filled with BSR code · 16/19 Payments Verified",
    },
    {
      date: "20 SEP 2026",
      regime: "GST",
      badgeBg: "bg-blue-50 text-blue-800 border-blue-200",
      form: "GSTR-3B Summary Return",
      client: "Pan-India Retainer Clients (38 Entities)",
      status: "IN_REVIEW",
      details: "3-Way Recon Complete · 4-Eye Partner Review Gate Active",
    },
    {
      date: "30 SEP 2026",
      regime: "Direct Tax",
      badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
      form: "Section 44AB Form 3CD Tax Audit",
      client: "Corporate Assessees > ₹10 Cr Turnover",
      status: "VOUCHING",
      details: "44 Clauses Verified · Depreciation & Section 43B Tied Out",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Month Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-[14px] text-slate-900">September 2026 Statutory Radar</h4>
            <p className="text-[11.5px] text-slate-500">Live Regulatory Tracking for 124 Active Indian Entities</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
            <ShieldCheck className="h-3 w-3 text-emerald-600" />
            <span>0 Overdue Penalties</span>
          </span>
          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-mono text-slate-600">
            Quarter 2 Filing Window
          </span>
        </div>
      </div>

      {/* Statutory Events List */}
      <div className="grid gap-3">
        {events.map((e, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs hover:border-slate-300 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 min-w-[76px] text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase">{e.date.split(" ")[0]} {e.date.split(" ")[1]}</span>
                <span className="font-mono text-[14px] font-bold text-slate-900">{e.date.split(" ")[0]}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-md border px-2 py-0.2 text-[10.5px] font-semibold ${e.badgeBg}`}>
                    {e.regime}
                  </span>
                  <span className="font-bold text-[13px] text-slate-900">{e.form}</span>
                </div>
                <div className="mt-0.5 text-[11.5px] text-slate-600">{e.client}</div>
                <div className="mt-0.5 font-mono text-[10.5px] text-slate-400">{e.details}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              {e.status === "COMPLETED" ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  <span>Filed &amp; Sealed</span>
                </span>
              ) : e.status === "IN_REVIEW" ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-1 text-[11px] font-semibold text-blue-800">
                  <Clock className="h-3 w-3 text-blue-600" />
                  <span>Partner Gate Active</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                  <span>In Execution</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. 4-Eye Partner Review Gates Interactive UI
// ─────────────────────────────────────────────────────────────────────────────
function FourEyeReviewInteractive() {
  const [partnerSigned, setPartnerSigned] = useState(false);

  return (
    <div className="space-y-4">
      {/* Workflow Stepper */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-emerald-800">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>Tier 1: Preparer Check</span>
          </div>
          <div className="mt-1 font-semibold text-[13px] text-slate-900">Ananya Sharma (Article)</div>
          <div className="mt-0.5 text-[10.5px] text-slate-500">Working papers verified · 18 schedules tied out</div>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-emerald-800">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>Tier 2: Manager Review</span>
          </div>
          <div className="mt-1 font-semibold text-[13px] text-slate-900">Sunita Rao, ACA (Manager)</div>
          <div className="mt-0.5 text-[10.5px] text-slate-500">Clause testing approved · Trial balance cleared</div>
        </div>

        <div
          className={`rounded-xl border p-3 shadow-2xs transition-colors ${
            partnerSigned
              ? "border-emerald-200 bg-emerald-50/70"
              : "border-accent/40 bg-accent/5 ring-1 ring-accent/20"
          }`}
        >
          <div className="flex items-center justify-between text-[11px] font-bold uppercase">
            <span className={partnerSigned ? "text-emerald-800" : "text-accent"}>
              Tier 3: Partner Sign-Off
            </span>
            <span className="font-mono text-[10px] text-slate-500">EQCR Gate</span>
          </div>
          <div className="mt-1 font-semibold text-[13px] text-slate-900">CA Rajiv Kapadia, FCA</div>
          <div className="mt-0.5 text-[10.5px] text-slate-500">
            {partnerSigned ? "Signed with Class 3 DSC Token" : "Awaiting Partner Digital Authorization"}
          </div>
        </div>
      </div>

      {/* Deliverable Review Sheet */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600">
              AUDIT-2026-ENG-089
            </span>
            <h4 className="mt-1 font-bold text-[14px] text-slate-900">
              Horizon Exports Ltd — FY 2025-26 Form 3CD &amp; ITR-6 Computation
            </h4>
          </div>
          <div className="font-mono text-[11px] text-slate-500">
            SHA-256: <span className="text-slate-800 font-semibold">9e4a8b...1f09</span>
          </div>
        </div>

        {/* Verification Checkpoints */}
        <div className="mt-3 grid grid-cols-1 gap-2 text-[12px] sm:grid-cols-2">
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2">
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-slate-700">Clause 21(a): Section 40(a)(ia) disallowance reconciled</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2">
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-slate-700">Clause 34: Chapter XVII-B TDS challans matched in TRACES</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2">
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-slate-700">Depreciation Schedule III tied to Fixed Asset Register</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2">
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-slate-700">Section 269SS / 269T cash transactions verified with bank books</span>
          </div>
        </div>

        {/* Partner Action Row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-[12px]">
            <KeyRound className="h-4 w-4 text-accent" />
            <span className="font-semibold text-slate-800">DSC Token:</span>
            <span className="font-mono text-slate-600">ePass2003 (CA Rajiv Kapadia) · PIN Cached</span>
          </div>

          {partnerSigned ? (
            <div className="flex items-center gap-2 text-[12px] font-semibold text-emerald-700">
              <FileCheck2 className="h-4 w-4 text-emerald-600" />
              <span>Deliverable Sealed &amp; Ready for Department Upload</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setPartnerSigned(true)}
              className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-1.5 text-[12px] font-semibold text-white hover:bg-accent-hover transition-all shadow-xs"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Apply Partner DSC Sign-Off</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. DSC Hardware Token Vault Interactive UI
// ─────────────────────────────────────────────────────────────────────────────
function DscVaultInteractive() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-[14px] text-slate-900">Cryptographic DSC &amp; Credential Vault</h4>
            <p className="text-[11.5px] text-slate-500">USB Bridge Active: Localhost Port 14201 · FIPS 140-2 Level 3</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-semibold text-emerald-800">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Daemon Connected</span>
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
        <table className="w-full text-left text-[12px]">
          <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600">
            <tr>
              <th className="px-3.5 py-2.5">Certificate Holder</th>
              <th className="px-3.5 py-2.5">Token Model / Serial</th>
              <th className="px-3.5 py-2.5">Validity Expiry</th>
              <th className="px-3.5 py-2.5">Hardware Custody</th>
              <th className="px-3.5 py-2.5 text-right">Filing Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50/70">
              <td className="px-3.5 py-2.5">
                <div className="font-semibold text-slate-900">CA Rajiv Kapadia, FCA</div>
                <div className="font-mono text-[10.5px] text-slate-400">Class 3 Signing · PAN: AAAPK8910M</div>
              </td>
              <td className="px-3.5 py-2.5 font-mono text-slate-700">ePass2003 / #EP-90214</td>
              <td className="px-3.5 py-2.5 font-mono text-emerald-600 font-semibold">14 Nov 2027 (412 Days)</td>
              <td className="px-3.5 py-2.5">
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-800">
                  Plugged in USB Slot 1
                </span>
              </td>
              <td className="px-3.5 py-2.5 text-right">
                <span className="font-semibold text-accent text-[11.5px]">Batch Ready (4 Returns)</span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50/70">
              <td className="px-3.5 py-2.5">
                <div className="font-semibold text-slate-900">CA Pooja Mehta, Partner</div>
                <div className="font-mono text-[10.5px] text-slate-400">Class 3 Signing · PAN: AAYPM4401L</div>
              </td>
              <td className="px-3.5 py-2.5 font-mono text-slate-700">mToken CryptoID / #MT-88120</td>
              <td className="px-3.5 py-2.5 font-mono text-emerald-600 font-semibold">22 Mar 2028 (540 Days)</td>
              <td className="px-3.5 py-2.5">
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-800">
                  Plugged in USB Slot 2
                </span>
              </td>
              <td className="px-3.5 py-2.5 text-right">
                <span className="font-semibold text-slate-600 text-[11.5px]">Active Session</span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50/70">
              <td className="px-3.5 py-2.5">
                <div className="font-semibold text-slate-900">Sunil Agarwal (Director)</div>
                <div className="font-mono text-[10.5px] text-slate-400">Titanium Conglomerate · DIN 01928401</div>
              </td>
              <td className="px-3.5 py-2.5 font-mono text-slate-700">ProxKey Watchdata / #PK-11029</td>
              <td className="px-3.5 py-2.5 font-mono text-amber-600 font-semibold">18 Oct 2026 (19 Days Left)</td>
              <td className="px-3.5 py-2.5">
                <span className="rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10.5px] font-semibold text-slate-700">
                  Physical Locker Box #B-12
                </span>
              </td>
              <td className="px-3.5 py-2.5 text-right">
                <button type="button" className="text-amber-700 font-semibold text-[11px] underline">
                  Trigger Renewal Reminder
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. WhatsApp Practice Inbox Interactive UI
// ─────────────────────────────────────────────────────────────────────────────
function WhatsAppInboxInteractive() {
  const [messages, setMessages] = useState([
    {
      sender: "system",
      text: "Hello Mr. Rajesh! Please share your purchase invoices for August 2026 to ensure 100% GSTR-2B input tax credit matching before 15th.",
      time: "10:14 AM",
    },
    {
      sender: "client",
      text: "Sharing the machinery freight invoice received today.",
      time: "10:18 AM",
      attachment: "INV_FREIGHT_AUG26.pdf (1.2 MB)",
    },
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleSend = () => {
    if (!inputVal.trim()) return;
    setMessages((prev) => [
      ...prev,
      { sender: "firm", text: inputVal.trim(), time: "Just now" },
    ]);
    setInputVal("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-[420px]">
      {/* Left Chat Roster */}
      <div className="md:col-span-4 rounded-xl border border-slate-200 bg-white p-3 overflow-y-auto">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          Practice Inboxes (WhatsApp API)
        </div>
        <div className="space-y-1">
          <div className="rounded-lg bg-slate-100 p-2.5 cursor-pointer">
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-bold text-slate-900">Apex Logistics Ltd</span>
              <span className="text-[10px] text-slate-500 font-mono">10:18 AM</span>
            </div>
            <div className="text-[11px] text-slate-600 truncate mt-0.5">Attachment: INV_FREIGHT_AUG26.pdf</div>
            <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>AI Optical Ingestion Ready</span>
            </div>
          </div>
          <div className="rounded-lg p-2.5 hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-semibold text-slate-800">Horizon Exports</span>
              <span className="text-[10px] text-slate-400 font-mono">Yesterday</span>
            </div>
            <div className="text-[11px] text-slate-500 truncate mt-0.5">Bank statements for Axis Bank current a/c</div>
          </div>
          <div className="rounded-lg p-2.5 hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-semibold text-slate-800">Zenith Tech LLP</span>
              <span className="text-[10px] text-slate-400 font-mono">Sep 24</span>
            </div>
            <div className="text-[11px] text-slate-500 truncate mt-0.5">Advance tax challan confirmation acknowledged</div>
          </div>
        </div>
      </div>

      {/* Right Active Conversation */}
      <div className="md:col-span-8 flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white text-[11px] font-bold">
              AL
            </div>
            <div>
              <div className="font-bold text-[12.5px] text-slate-900">Rajesh Agarwal (Apex Logistics)</div>
              <div className="text-[10.5px] text-slate-500">+91 98201 XXXXX · Director Signatory</div>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-800">
            Verified Business API
          </span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-slate-50/30">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col max-w-[80%] ${
                m.sender === "client" ? "self-start items-start" : "self-end items-end"
              }`}
            >
              <div
                className={`rounded-2xl px-3.5 py-2 text-[12.5px] shadow-2xs ${
                  m.sender === "client"
                    ? "bg-white border border-slate-200 text-slate-900"
                    : "bg-accent text-white"
                }`}
              >
                {m.text}
                {m.attachment && (
                  <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-800 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-accent flex-none" />
                    <span className="font-semibold truncate">{m.attachment}</span>
                  </div>
                )}
              </div>
              <span className="mt-0.5 text-[10px] text-slate-400 font-mono px-1">{m.time}</span>
            </div>
          ))}

          {/* Optical Extraction Action Card */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 text-[12px] shadow-2xs">
            <div className="flex items-center justify-between font-semibold text-emerald-900">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald-700" />
                <span>AI Ingestion: Extracted GST Invoice</span>
              </span>
              <span className="font-mono text-[10.5px]">Confidence 99.1%</span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-[11.5px] text-slate-700">
              <div>Supplier: <strong className="text-slate-900">Apex Freight Carriers</strong></div>
              <div>GSTIN: <strong className="text-slate-900">27AABCA8921M1ZK</strong></div>
              <div>Taxable: <strong className="text-slate-900">₹1,20,000</strong></div>
              <div>IGST (18%): <strong className="text-slate-900">₹21,600</strong></div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                className="rounded-lg bg-emerald-700 px-3 py-1 text-[11.5px] font-semibold text-white hover:bg-emerald-800"
              >
                ✓ Push to Tally &amp; GSTR-2B Recon
              </button>
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="border-t border-slate-200 p-2 bg-white flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type WhatsApp broadcast or reply..."
            className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] outline-none focus:border-accent"
          />
          <button
            type="button"
            onClick={handleSend}
            className="rounded-lg bg-accent p-2 text-white hover:bg-accent-hover transition-colors"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Tally Prime Real-Time Connector Interactive UI
// ─────────────────────────────────────────────────────────────────────────────
function TallyConnectorInteractive() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-[14px] text-slate-900">TallyPrime v4.1 XML-RPC Bridge</h4>
            <p className="text-[11.5px] text-slate-500">Connected to Localhost Port 9000 · AES-256 Cloud Pipe</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-semibold text-emerald-800">
            <RefreshCw className="h-3 w-3 animate-spin text-emerald-600" />
            <span>Live Sync Active</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="text-[11px] font-semibold uppercase text-slate-500">Vouchers Synced</div>
          <div className="mt-1 font-mono text-[18px] font-bold text-slate-900">14,892</div>
          <div className="text-[10.5px] text-emerald-600 font-medium">100% Daybook Parity</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="text-[11px] font-semibold uppercase text-slate-500">Ledger Accounts</div>
          <div className="mt-1 font-mono text-[18px] font-bold text-slate-900">418 Heads</div>
          <div className="text-[10.5px] text-slate-500">Mapped to Schedule III</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="text-[11px] font-semibold uppercase text-slate-500">Unmapped Heads</div>
          <div className="mt-1 font-mono text-[18px] font-bold text-emerald-600">0</div>
          <div className="text-[10.5px] text-emerald-700">Zero Mapping Exceptions</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="text-[11px] font-semibold uppercase text-slate-500">Last Pulse</div>
          <div className="mt-1 font-mono text-[18px] font-bold text-slate-900">4s ago</div>
          <div className="text-[10.5px] text-slate-500">Auto-Polling Active</div>
        </div>
      </div>

      {/* Live Daybook Feed */}
      <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          Live Daybook Stream (Horizon Exports Ltd)
        </div>
        <div className="space-y-1.5 text-[12px]">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2 font-mono">
            <span className="text-slate-500">12:44:10 PM</span>
            <span className="font-semibold text-slate-900">Sales Voucher #412 (Gaurav Traders)</span>
            <span className="text-emerald-700 font-bold">₹1,84,000</span>
            <span className="text-[10.5px] text-emerald-600">✓ Synced to 3B Pool</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2 font-mono">
            <span className="text-slate-500">12:42:35 PM</span>
            <span className="font-semibold text-slate-900">Purchase Voucher #890 (Tata Comm)</span>
            <span className="text-blue-700 font-bold">₹26,100 ITC</span>
            <span className="text-[10.5px] text-blue-600">✓ In GSTR-2B Match</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2 font-mono">
            <span className="text-slate-500">12:39:18 PM</span>
            <span className="font-semibold text-slate-900">Bank Payment (Axis A/c - TDS 194C)</span>
            <span className="text-slate-900 font-bold">₹8,400</span>
            <span className="text-[10.5px] text-slate-600">✓ Challan 281 Tagged</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. Client Portal Interactive UI
// ─────────────────────────────────────────────────────────────────────────────
function ClientPortalInteractive() {
  return (
    <div className="space-y-4">
      {/* Branded Portal Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-bold font-display text-[15px]">
            KA
          </div>
          <div>
            <div className="font-bold text-[14px] text-slate-900">Kapadia &amp; Associates, CAs</div>
            <div className="text-[11px] text-slate-500">Client Space for Horizon Exports Ltd (portal.kapadia-ca.com)</div>
          </div>
        </div>

        <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-700">
          Role: Signing Director
        </span>
      </div>

      {/* Actionable Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-accent/30 bg-accent/5 p-3.5 shadow-2xs">
          <div className="text-[11px] font-bold uppercase text-accent">Pending Action</div>
          <div className="mt-1 font-bold text-[13.5px] text-slate-900">Sign Engagement Letter</div>
          <div className="mt-1 text-[11px] text-slate-600">FY 2026-27 Statutory Audit Scope</div>
          <button
            type="button"
            className="mt-3 flex items-center gap-1 rounded-lg bg-accent px-3 py-1 text-[11.5px] font-semibold text-white hover:bg-accent-hover"
          >
            <span>Aadhaar eSign (OTP)</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
          <div className="text-[11px] font-bold uppercase text-slate-500">Document Vault</div>
          <div className="mt-1 font-bold text-[13.5px] text-slate-900">Filed Returns (14)</div>
          <div className="mt-1 text-[11px] text-slate-600">GSTR-1, GSTR-3B &amp; Advance Tax</div>
          <button
            type="button"
            className="mt-3 flex items-center gap-1 text-[11.5px] font-semibold text-accent hover:underline"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Tax Packets</span>
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
          <div className="text-[11px] font-bold uppercase text-slate-500">Compliance Health</div>
          <div className="mt-1 font-bold text-[13.5px] text-emerald-600">100% Regulatory Clear</div>
          <div className="mt-1 text-[11px] text-slate-600">0 Outstanding Notices or Penalties</div>
          <div className="mt-3 font-mono text-[10.5px] text-slate-400">Next Due: GSTR-3B (20 Oct)</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. Workload Cockpit Interactive UI
// ─────────────────────────────────────────────────────────────────────────────
function WorkloadCockpitInteractive() {
  const staff = [
    { name: "CA Rajiv Kapadia", role: "Signing Partner", load: 72, tasks: 12, badge: "Balanced" },
    { name: "Sunita Rao, ACA", role: "Audit Manager", load: 94, tasks: 28, badge: "High Load (94%)" },
    { name: "Amit Verma", role: "Senior Tax Executive", load: 78, tasks: 19, badge: "Balanced" },
    { name: "Article Assistants Pool (4)", role: "Trainee Vouching", load: 82, tasks: 44, badge: "82% Capacity" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
        <div>
          <h4 className="font-bold text-[14px] text-slate-900">Firm-Wide Workload &amp; Capacity Radar</h4>
          <p className="text-[11.5px] text-slate-500">Live Team Heatmap across 124 Statutory Engagements</p>
        </div>
        <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-700">
          Peak Season Mode: Active
        </span>
      </div>

      <div className="space-y-2.5">
        {staff.map((s, idx) => (
          <div key={idx} className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
            <div className="flex items-center justify-between text-[12px]">
              <div>
                <span className="font-bold text-slate-900">{s.name}</span>
                <span className="ml-2 text-slate-500 text-[11px]">({s.role})</span>
              </div>
              <span
                className={`font-semibold text-[11px] ${
                  s.load > 90 ? "text-amber-700" : "text-emerald-700"
                }`}
              >
                {s.badge} · {s.tasks} Active Matters
              </span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  s.load > 90 ? "bg-amber-500" : "bg-accent"
                }`}
                style={{ width: `${s.load}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. Client Hierarchy Interactive UI
// ─────────────────────────────────────────────────────────────────────────────
function ClientHierarchyInteractive() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-accent" />
          <h4 className="font-bold text-[14px] text-slate-900">
            Titanium Conglomerate Private Limited (Parent Group)
          </h4>
        </div>
        <div className="mt-1 font-mono text-[11px] text-slate-500">
          CIN: U74999MH2018PTC123456 · PAN: AAACR8821M · Consolidated MCA Health: 100%
        </div>
      </div>

      <div className="ml-4 space-y-2 border-l-2 border-slate-200 pl-4">
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="flex items-center justify-between text-[12.5px]">
            <span className="font-bold text-slate-900">Titanium Heavy Machinery Pvt Ltd (Subsidiary)</span>
            <span className="rounded bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10.5px] font-semibold text-blue-800">
              GSTIN: 27AABCT9901M1ZX (Maharashtra)
            </span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Assigned Partner: CA Rajiv Kapadia · Statutory Audit + Monthly GST
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="flex items-center justify-between text-[12.5px]">
            <span className="font-bold text-slate-900">Titanium Logistics LLP (Logistics Arm)</span>
            <span className="rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-800">
              LLPIN: AAB-8921 · Form 11 Filed
            </span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Assigned Manager: Sunita Rao · Form 8 Statement of Accounts
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="flex items-center justify-between text-[12.5px]">
            <span className="font-bold text-slate-900">Director Tax Profile: Rajesh Agarwal</span>
            <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10.5px] font-semibold text-slate-700">
              DIN: 01849201 · ITR-2 Filed
            </span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Director Remuneration &amp; Section 185 Compliance Linked to Parent Entity
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. Direct Tax Interactive UI
// ─────────────────────────────────────────────────────────────────────────────
function DirectTaxInteractive() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="text-[11px] font-semibold uppercase text-slate-500">Gross Total Income</div>
          <div className="mt-1 font-mono text-[17px] font-bold text-slate-900">₹4,82,40,000</div>
          <div className="text-[10.5px] text-slate-500">Form 3CD P&amp;L Reconciled</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="text-[11px] font-semibold uppercase text-slate-500">26AS / AIS TDS Credit</div>
          <div className="mt-1 font-mono text-[17px] font-bold text-emerald-600">₹42,18,500</div>
          <div className="text-[10.5px] text-emerald-700">100% Tied Out with Books</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="text-[11px] font-semibold uppercase text-slate-500">Advance Tax Paid</div>
          <div className="mt-1 font-mono text-[17px] font-bold text-slate-900">₹38,00,000</div>
          <div className="text-[10.5px] text-slate-500">Challan 280 Verified</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="text-[11px] font-semibold uppercase text-slate-500">Net Tax Payable / (Refund)</div>
          <div className="mt-1 font-mono text-[17px] font-bold text-accent">₹1,42,800</div>
          <div className="text-[10.5px] text-accent">Self-Assessment Tax Due</div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          Statutory Notice Radar (ITD Faceless Portal)
        </div>
        <div className="space-y-2 text-[12px]">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5">
            <div>
              <span className="font-bold text-slate-900">Section 143(1)(a) Communication</span>
              <div className="text-[11px] text-slate-500">AY 2025-26 Intimation · Prima facie adjustment resolved</div>
            </div>
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-800">
              Closed (Order Verified)
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5">
            <div>
              <span className="font-bold text-slate-900">Section 142(1) Inquiry Notice</span>
              <div className="text-[11px] text-slate-500">AY 2024-25 Scrutiny · Reply Drafted with Partner Review Gate</div>
            </div>
            <span className="rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10.5px] font-semibold text-blue-800">
              12 Days to Limitation
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. Intake Pipeline Interactive UI
// ─────────────────────────────────────────────────────────────────────────────
function IntakePipelineInteractive() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
        <h4 className="font-bold text-[14px] text-slate-900">Unified Document Intake Hub</h4>
        <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-semibold text-emerald-800">
          Auto-Ingestion from WhatsApp, Drive &amp; Gmail
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="text-[11px] font-bold uppercase text-slate-500">Step 1: Intake Channels</div>
          <div className="mt-1 font-bold text-[13px] text-slate-900">WhatsApp + Drive Sync</div>
          <div className="mt-1 text-[11px] text-slate-600">88 files ingested today across active client folders</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="text-[11px] font-bold uppercase text-slate-500">Step 2: AI Parser</div>
          <div className="mt-1 font-bold text-[13px] text-emerald-700">99.2% OCR Extraction</div>
          <div className="mt-1 text-[11px] text-slate-600">Auto-identifies GSTIN, Date, Taxable, and HSN/SAC codes</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="text-[11px] font-bold uppercase text-slate-500">Step 3: Vouching Vault</div>
          <div className="mt-1 font-bold text-[13px] text-accent">Auto-Tied to Working Papers</div>
          <div className="mt-1 text-[11px] text-slate-600">Ready for Article Assistant verification</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. Payments Interactive UI
// ─────────────────────────────────────────────────────────────────────────────
function PaymentsInteractive() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
        <h4 className="font-bold text-[14px] text-slate-900">Razorpay Practice Billing &amp; Retainer Mandates</h4>
        <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-semibold text-emerald-800">
          Automated e-Mandate Realization
        </span>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs text-[12px] space-y-2">
        <div className="flex items-center justify-between font-mono bg-slate-50 p-2 rounded-lg">
          <span>Horizon Exports Ltd — Monthly Retainer (Aug 2026)</span>
          <span className="font-bold text-slate-900">₹45,000 + GST</span>
          <span className="text-emerald-700 font-semibold">✓ Paid via UPI AutoDebit</span>
        </div>
        <div className="flex items-center justify-between font-mono bg-slate-50 p-2 rounded-lg">
          <span>Apex Logistics — Statutory Audit Advance</span>
          <span className="font-bold text-slate-900">₹1,25,000 + GST</span>
          <span className="text-emerald-700 font-semibold">✓ Settled via NetBanking</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 13. Audit Papers Interactive UI
// ─────────────────────────────────────────────────────────────────────────────
function AuditPapersInteractive() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
        <h4 className="font-bold text-[14px] text-slate-900">CARO 2020 &amp; Form 3CD Standardized Working Papers</h4>
        <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-700">
          ICAI SQC-1 Peer Review Compliant
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="font-bold text-slate-900">CARO 2020 Clause i (Fixed Assets)</div>
          <div className="text-[11px] text-slate-600 mt-1">Physical verification cycle documented · Title deeds verified</div>
          <div className="mt-2 text-emerald-700 font-semibold text-[11px]">✓ 100% Tested &amp; Cross-Referenced</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
          <div className="font-bold text-slate-900">CARO 2020 Clause ii (Working Capital)</div>
          <div className="text-[11px] text-slate-600 mt-1">Quarterly bank statements tied to sanction terms &gt; ₹5 Cr</div>
          <div className="mt-2 text-emerald-700 font-semibold text-[11px]">✓ Bank Confirmations Archived</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Screenshot Full View with Zoom / Metadata
// ─────────────────────────────────────────────────────────────────────────────
function ScreenshotView({ screenshotSrc, title }: { screenshotSrc: string; title: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-md">
        <Image
          src={screenshotSrc}
          alt={`Authentic screenshot of ${title}`}
          width={1440}
          height={900}
          priority
          className="h-auto w-full object-contain"
        />
        <div className="absolute bottom-3 right-3 rounded-md bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono text-white/90 border border-white/10 shadow-lg">
          Pyngyn ClientSpace Production UI
        </div>
      </div>
    </div>
  );
}
