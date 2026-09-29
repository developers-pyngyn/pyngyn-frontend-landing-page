"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Home,
  Building2,
  Users,
  LayoutDashboard,
  BarChart3,
  Calendar,
  Sparkles,
  Search,
  Plus,
  Bell,
  Trash2,
  ChevronDown,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Layers,
  Star,
  Sliders,
  MoreHorizontal,
  Play,
  HelpCircle,
  AlertTriangle,
  Folder,
} from "lucide-react";
import { WebsiteTaskList } from "./WebsiteTaskList";
import { WebsiteTaskBoard } from "./WebsiteTaskBoard";
import { WebsiteAuditTax } from "./WebsiteAuditTax";
import { WebsiteCalendar } from "./WebsiteCalendar";
import { WorkloadOverview } from "../WorkloadOverview";

export type ProductScreenType =
  | "tasks"
  | "board"
  | "calendar"
  | "workload"
  | "audit"
  | "client";

interface PyngynWebsiteProductProps {
  screen?: ProductScreenType;
  clientId?: "oswal" | "shreeji";
  className?: string;
}

export const PyngynWebsiteProduct: React.FC<PyngynWebsiteProductProps> = ({
  screen = "tasks",
  clientId = "oswal",
  className = "",
}) => {
  const [currentScreen, setCurrentScreen] = useState<ProductScreenType>(screen);
  const [currentClient, setCurrentClient] = useState<"oswal" | "shreeji">(clientId);
  const [activeTab, setActiveTab] = useState("tasks");

  const isOswal = currentClient === "oswal";
  const isFullHeight = className.includes("h-full");

  return (
    <div
      className={`flex flex-col bg-white text-slate-800 select-none font-sans text-[12px] antialiased ${
        isFullHeight
          ? "w-full h-full overflow-hidden"
          : "rounded-[14px] border border-slate-300 shadow-2xl overflow-hidden"
      } ${className}`}
      style={{
        minHeight: isFullHeight ? "100%" : "490px",
        height: isFullHeight ? "100%" : undefined,
      }}
    >
      {/* 1. TOP STATUTORY ESCALATION ALERT STRIP */}
      <div className="bg-amber-500/10 border-b border-amber-300/60 px-3 sm:px-4 py-1.5 flex items-center justify-between gap-2 text-[11px] text-amber-900 font-semibold shrink-0">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping shrink-0" />
          <span className="truncate flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span><strong>GSTR-3B &amp; Advance Tax Overdue:</strong> 3 client deliverables require partner e-sign.</span>
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded font-mono text-[10px] font-bold">
            Escalation Level 1
          </span>
        </div>
      </div>

      {/* 2. AUTHENTIC TOP BAR */}
      <header className="h-[50px] min-h-[50px] px-3 sm:px-4 flex items-center justify-between border-b border-slate-200 bg-white shrink-0 z-30">
        {/* Left: Firm Workspace Pill */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 border border-slate-200 rounded-[8px] py-1 px-2.5 bg-slate-50 hover:bg-slate-100 cursor-pointer shadow-2xs transition-colors">
            <div className="w-[20px] h-[20px] rounded-[5px] bg-white border border-slate-300 flex items-center justify-center p-0.5 overflow-hidden shrink-0 shadow-2xs">
              <Image
                src="/mascot/pyngyn-ai-avatar.png"
                alt="Pyngyn"
                width={18}
                height={18}
                className="object-contain"
              />
            </div>
            <span className="text-[13px] font-bold text-slate-900 leading-none">Pyngyn</span>
            <span className="text-[11.5px] text-slate-500 font-normal hidden sm:inline">
              / Sharma &amp; Associates
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Center: Command Search Bar */}
        <div className="flex-1 max-w-[420px] mx-4 hidden md:flex items-center">
          <div className="w-full bg-slate-50 hover:bg-white rounded-[20px] py-1.5 px-3.5 flex items-center justify-between border border-slate-200 hover:border-slate-300 shadow-2xs cursor-pointer transition-colors">
            <div className="flex items-center gap-2 text-slate-400">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[12px] font-normal text-slate-500">Search ⌘K</span>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-[#db2777]" />
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="h-[30px] px-2.5 rounded-[7px] bg-[#14223d] hover:bg-[#1c2e4f] text-white text-[11.5px] font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-white stroke-[2.5]" />
            <span>Create</span>
            <ChevronDown className="w-3 h-3 text-slate-300" />
          </button>

          <div className="w-[1px] h-[18px] bg-slate-200 mx-0.5" />

          {/* Compliance Watch Chip */}
          <div className="hidden sm:inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-2 py-1 rounded-[6px] text-[10.5px] font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>3 WATCH</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-200 px-2 py-1 rounded-[6px] text-[10.5px] font-mono font-medium">
            <span>Jobs: 1 waiting</span>
          </div>

          {/* Pyngyn mascot avatar trigger */}
          <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-300 cursor-pointer shadow-2xs">
            <Image
              src="/mascot/pyngyn-ai-avatar.png"
              alt="Pyngyn Mascot"
              width={28}
              height={28}
              className="object-cover"
            />
          </div>
        </div>
      </header>

      {/* 3. MAIN PRODUCT SHELL BODY */}
      <div className="flex-1 flex overflow-hidden min-h-0 bg-white">
        {/* PRIMARY LEFT ICON RAIL (Matching Rail.tsx) */}
        <aside className="w-[66px] min-w-[66px] max-w-[66px] bg-white border-r border-slate-200 py-2.5 px-1 flex flex-col items-center justify-between select-none shrink-0 z-20">
          <div className="flex flex-col items-center gap-1 w-full">
            {/* Pyngyn Logo Tile */}
            <div className="w-[36px] h-[36px] rounded-[10px] border border-slate-200 bg-white flex items-center justify-center p-1 mb-1 shadow-2xs cursor-pointer hover:border-slate-400 transition-colors">
              <Image
                src="/mascot/pyngyn-ai-avatar.png"
                alt="Pyngyn"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>

            {/* Nav Items */}
            {[
              { id: "home", label: "Home", icon: Home },
              { id: "clients", label: "Clients", icon: Building2 },
              { id: "crm", label: "CRM", icon: Users },
              { id: "cockpit", label: "Cockpit", icon: LayoutDashboard },
              { id: "dashboard", label: "Dashboard", icon: Sparkles },
              { id: "workload", label: "Workload", icon: BarChart3 },
              { id: "calendar", label: "Calendar", icon: Calendar },
            ].map((item) => {
              const Icon = item.icon;
              const isActive =
                (item.id === "clients" && (currentScreen === "tasks" || currentScreen === "board" || currentScreen === "client")) ||
                (item.id === "dashboard" && currentScreen === "audit") ||
                (item.id === "calendar" && currentScreen === "calendar") ||
                (item.id === "workload" && currentScreen === "workload");

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (item.id === "clients") setCurrentScreen("tasks");
                    if (item.id === "dashboard") setCurrentScreen("audit");
                    if (item.id === "calendar") setCurrentScreen("calendar");
                    if (item.id === "workload") setCurrentScreen("workload");
                  }}
                  className={`w-[56px] py-1.5 px-0.5 rounded-[9px] flex flex-col items-center justify-center gap-0.5 cursor-pointer text-center relative border transition-colors ${
                    isActive
                      ? "bg-slate-200 text-slate-950 font-bold border-slate-300 shadow-3xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent"
                  }`}
                  title={item.label}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="text-[9.5px] leading-tight truncate max-w-full font-semibold">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Utility Cluster: Notifications, Avatar, Trash */}
          <div className="flex flex-col items-center gap-2 w-full pb-1">
            <button
              type="button"
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-[7px] cursor-pointer relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500" />
            </button>

            {/* CA Nikhil Jain Avatar */}
            <div
              className="w-[30px] h-[30px] rounded-[7px] bg-[#6366f1] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs border border-white/40 cursor-pointer"
              title="CA Nikhil Jain (Partner)"
            >
              NJ
            </div>

            <button
              type="button"
              className="p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer"
              title="Trash"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>

        {/* SECONDARY CONTEXTUAL SIDEBAR (Matching SidebarFacetedTree.tsx) */}
        <aside className="w-[195px] min-w-[195px] bg-slate-50/70 border-r border-slate-200 hidden md:flex flex-col shrink-0 select-none">
          {currentScreen === "audit" ? (
            /* Sidebar for Dashboard / Audit Command */
            <div className="flex-1 flex flex-col p-2 space-y-3">
              <div className="px-2 pt-1 pb-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Dashboards
              </div>
              <div className="space-y-1 text-[11.5px]">
                <div className="px-2.5 py-1.5 rounded-[7px] bg-slate-200 text-slate-950 font-bold border border-slate-300 shadow-3xs flex items-center justify-between cursor-pointer">
                  <span>Statutory Audit &amp; Tax</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="px-2.5 py-1.5 rounded-[7px] text-slate-700 hover:bg-slate-100 cursor-pointer flex items-center justify-between">
                  <span>GST &amp; ITC Radar</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-[7px] text-slate-700 hover:bg-slate-100 cursor-pointer flex items-center justify-between">
                  <span>Partner Workload Yield</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-[7px] text-slate-700 hover:bg-slate-100 cursor-pointer flex items-center justify-between">
                  <span>ROC / MCA Center</span>
                </div>
              </div>

              <div className="px-2 pt-2 pb-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Risks &amp; Governance</span>
                <span className="font-mono text-[10px] text-rose-700 bg-rose-50 border border-rose-200 px-1 rounded">
                  18
                </span>
              </div>
              <div className="space-y-1 text-[11.5px]">
                <div className="px-2.5 py-1 rounded text-slate-700 hover:bg-slate-100 cursor-pointer flex justify-between">
                  <span>Active Risks</span>
                  <span className="font-mono text-slate-500">18</span>
                </div>
                <div className="px-2.5 py-1 rounded text-slate-700 hover:bg-slate-100 cursor-pointer flex justify-between">
                  <span>Notice Register (148A)</span>
                  <span className="font-mono text-slate-500">4</span>
                </div>
              </div>
            </div>
          ) : currentScreen === "calendar" ? (
            /* Sidebar for Calendar */
            <div className="flex-1 flex flex-col p-2 space-y-3">
              <div className="px-2 pt-1 pb-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Statutory Calendars
              </div>
              <div className="space-y-1 text-[11.5px]">
                <div className="px-2.5 py-1.5 rounded-[7px] bg-slate-200 text-slate-950 font-bold border border-slate-300 shadow-3xs flex items-center justify-between cursor-pointer">
                  <span>Unified Statutory (48)</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                <div className="px-2.5 py-1.5 rounded-[7px] text-slate-700 hover:bg-slate-100 cursor-pointer">
                  <span>GST Filings (22)</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-[7px] text-slate-700 hover:bg-slate-100 cursor-pointer">
                  <span>Income Tax &amp; TDS (16)</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-[7px] text-slate-700 hover:bg-slate-100 cursor-pointer">
                  <span>MCA &amp; ROC Filings (6)</span>
                </div>
              </div>
            </div>
          ) : (
            /* Authentic Clients Tree (Matching media_1790225790785 & 791) */
            <div className="flex-1 flex flex-col p-2 space-y-2 overflow-y-auto text-[11.5px]">
              <div className="px-2 pt-1 pb-0.5 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Client Portfolios</span>
                <span className="font-mono text-[9.5px] text-slate-500 bg-white border border-slate-200 px-1 rounded">
                  25 Active
                </span>
              </div>

              {/* Category: Manufacturing & Export */}
              <div className="space-y-0.5">
                <div className="flex items-center gap-1 px-1.5 py-1 text-slate-500 font-bold text-[11px]">
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                  <span>Manufacturing &amp; Export</span>
                </div>

                {/* Subfolder: Automotive & Ancillary */}
                <div className="ml-2 pl-2 border-l border-slate-200 space-y-0.5">
                  <div className="flex items-center gap-1 px-1 py-0.5 text-slate-400 text-[10.5px] font-semibold">
                    <ChevronDown className="w-2.5 h-2.5" />
                    <span>Automotive &amp; Ancillary</span>
                  </div>

                  {/* Oswal Exports Client */}
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentClient("oswal");
                    }}
                    className={`w-full flex items-center justify-between px-2 py-1 rounded-[6px] transition-colors cursor-pointer text-left ${
                      isOswal
                        ? "bg-slate-200 text-slate-950 font-bold border border-slate-300 shadow-3xs"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      <span className="truncate">Oswal Exports</span>
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500 shrink-0" />
                    </div>
                    <span className="font-mono text-[10px] text-slate-500 bg-white px-1 rounded border border-slate-200">
                      2
                    </span>
                  </button>

                  <div className="flex items-center justify-between px-2 py-1 rounded-[6px] text-slate-600 hover:bg-slate-100 cursor-pointer">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="truncate">Precision Eng.</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">3</span>
                  </div>

                  <div className="flex items-center justify-between px-2 py-1 rounded-[6px] text-slate-600 hover:bg-slate-100 cursor-pointer">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="truncate">Allied Metals</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">3</span>
                  </div>
                </div>

                {/* Subfolder: Heavy Machinery & EPC */}
                <div className="ml-2 pl-2 border-l border-slate-200 space-y-0.5 pt-1">
                  <div className="flex items-center gap-1 px-1 py-0.5 text-slate-400 text-[10.5px] font-semibold">
                    <ChevronDown className="w-2.5 h-2.5" />
                    <span>Heavy Machinery &amp; EPC</span>
                  </div>

                  {/* Shreeji Constructions Client */}
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentClient("shreeji");
                    }}
                    className={`w-full flex items-center justify-between px-2 py-1 rounded-[6px] transition-colors cursor-pointer text-left ${
                      !isOswal
                        ? "bg-slate-200 text-slate-950 font-bold border border-slate-300 shadow-3xs"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="truncate">Infra Developers</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-500 bg-white px-1 rounded border border-slate-200">
                      3
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* CENTER CONTENT COLUMN */}
        <main className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden">
          {/* MIDDLE PANEL HEADER (Shown for Client Tasks/Board, hidden for Audit Dashboard) */}
          {currentScreen !== "audit" && (
            <div className="border-b border-slate-200 bg-white shrink-0">
            {/* Top row: Client Title + Badges + Actions */}
            <div className="px-3 sm:px-4 pt-2.5 pb-2 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-[15px] font-extrabold text-slate-900 flex items-center gap-1">
                  <span>{isOswal ? "Oswal Exports" : "Shreeji Constructions"}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </h1>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 cursor-pointer" />

                {/* Risk / Status Badge */}
                {isOswal ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10.5px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                    <span>AT-RISK</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10.5px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>ATTENTION</span>
                  </span>
                )}

                <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                  {isOswal ? "Tier 1" : "Tier 2"}
                </span>

                <span className="text-[10.5px] font-medium text-slate-500 hidden sm:inline">
                  ★ Default
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-[6px] border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>More Actions</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Tab Bar */}
            <div className="px-3 sm:px-4 flex items-center gap-4 text-[12px] font-semibold text-slate-600 border-b border-slate-100 overflow-x-auto scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`py-1.5 cursor-pointer transition-colors ${
                  activeTab === "overview"
                    ? "text-slate-900 border-b-2 border-slate-900 font-bold"
                    : "hover:text-slate-900"
                }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("tasks")}
                className={`py-1.5 cursor-pointer transition-colors ${
                  activeTab === "tasks"
                    ? "text-slate-900 border-b-2 border-slate-900 font-bold"
                    : "hover:text-slate-900"
                }`}
              >
                Tasks ({isOswal ? "14" : "5"})
              </button>
              <button
                type="button"
                className="py-1.5 hover:text-slate-900 cursor-pointer"
              >
                Engagements (2)
              </button>
              <button
                type="button"
                className="py-1.5 hover:text-slate-900 cursor-pointer"
              >
                Files (7)
              </button>
              <button
                type="button"
                className="py-1.5 hover:text-slate-900 cursor-pointer"
              >
                Client Portal
              </button>
              <button
                type="button"
                className="py-1.5 text-slate-400 hover:text-slate-600 cursor-pointer flex items-center gap-0.5"
              >
                <span>More</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <button
                type="button"
                className="py-1.5 text-blue-600 font-bold hover:underline cursor-pointer"
              >
                + View
              </button>
            </div>

            {/* Sub-Bar: Filter chips + Shape Switcher (List / Board / Calendar / Timeline) */}
            <div className="px-3 sm:px-4 py-1.5 bg-slate-50/60 flex items-center justify-between gap-2 flex-wrap text-[11px]">
              {/* Left filter presets */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                <span className="font-bold text-slate-800 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs">
                  All Tasks ({isOswal ? "14" : "5"})
                </span>
                <span className="text-slate-600 hover:bg-slate-100 px-2 py-0.5 rounded cursor-pointer">
                  Active Filings ({isOswal ? "12" : "3"})
                </span>
                <span className="text-slate-600 hover:bg-slate-100 px-2 py-0.5 rounded cursor-pointer">
                  Review Queue ({isOswal ? "11" : "2"})
                </span>
                <span className="text-slate-600 hover:bg-slate-100 px-2 py-0.5 rounded cursor-pointer">
                  Filed &amp; Done (2)
                </span>
              </div>

              {/* Right: Shape Switcher & Controls */}
              <div className="flex items-center gap-2">
                {/* Shape Switcher Pills */}
                <div className="flex items-center bg-white border border-slate-200 rounded-[7px] p-0.5 shadow-2xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setCurrentScreen("tasks")}
                    className={`px-2 py-0.5 rounded-[5px] cursor-pointer transition-colors ${
                      currentScreen === "tasks"
                        ? "bg-[#0f172a] text-white font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    List
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentScreen("board")}
                    className={`px-2 py-0.5 rounded-[5px] cursor-pointer transition-colors ${
                      currentScreen === "board"
                        ? "bg-[#0f172a] text-white font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Board
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentScreen("calendar")}
                    className={`px-2 py-0.5 rounded-[5px] cursor-pointer transition-colors ${
                      currentScreen === "calendar"
                        ? "bg-[#0f172a] text-white font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Calendar
                  </button>
                </div>

                <div className="hidden lg:flex items-center gap-1.5 text-slate-500">
                  <span className="text-[10.5px] font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                    Group by: <strong>Due Date</strong>
                  </span>
                  <div className="flex -space-x-1">
                    <span className="w-5 h-5 rounded-md bg-purple-600 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                      PS
                    </span>
                    <span className="w-5 h-5 rounded-md bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                      RM
                    </span>
                    <span className="w-5 h-5 rounded-md bg-teal-600 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                      JG
                    </span>
                    <span className="w-5 h-5 rounded-md bg-slate-200 text-slate-700 text-[8.5px] font-bold flex items-center justify-center border border-white">
                      +2
                    </span>
                  </div>
                </div>
              </div>
            </div>
            </div>
          )}

          {/* DYNAMIC SCREEN VIEW BODY */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
            {currentScreen === "board" ? (
              <WebsiteTaskBoard />
            ) : currentScreen === "audit" ? (
              <WebsiteAuditTax />
            ) : currentScreen === "calendar" ? (
              <WebsiteCalendar />
            ) : currentScreen === "workload" ? (
              <WorkloadOverview />
            ) : (
              <WebsiteTaskList clientId={currentClient} />
            )}
          </div>
        </main>
      </div>

      {/* 4. AUTHENTIC BOTTOM DOCKED TIMER (Matching BottomDockedTimer.tsx) */}
      <footer className="h-[38px] min-h-[38px] bg-slate-900 text-slate-200 px-3 sm:px-4 flex items-center justify-between border-t border-slate-800 text-[11.5px] shrink-0 font-mono select-none z-30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-white font-bold tracking-widest text-[12.5px]">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>00:00:00</span>
          </div>

          <button
            type="button"
            className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10.5px] flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
          >
            <Play className="w-2.5 h-2.5 fill-white" />
            <span>Start</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-300 truncate max-w-[340px]">
            <span className="text-slate-400">TASK:</span>
            <span className="text-slate-100 font-semibold truncate">
              [{isOswal ? "Oswal Exports" : "Shreeji Constructions"}] GSTR-1 sales ledger scrutiny...
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 hover:text-slate-200 cursor-pointer hidden md:inline">
            Shortcuts (?)
          </span>

          {/* Pyng mascot pill trigger button */}
          <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full cursor-pointer hover:border-slate-500 transition-colors">
            <div className="w-4 h-4 rounded-full overflow-hidden shrink-0">
              <Image
                src="/mascot/pyngyn-ai-avatar.png"
                alt="Pyngyn"
                width={16}
                height={16}
                className="object-cover"
              />
            </div>
            <span className="text-[10px] text-slate-300 font-bold hidden sm:inline">
              Pyng AI
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
