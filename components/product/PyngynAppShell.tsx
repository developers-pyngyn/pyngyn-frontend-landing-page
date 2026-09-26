"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Building2,
  Users,
  LayoutDashboard,
  BarChart3,
  Calendar,
  BookOpen,
  Zap,
  Settings,
  ChevronDown,
  ChevronRight,
  Filter,
  Layers,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Sparkles,
} from "lucide-react";
import { TopBar } from "./TopBar";
import { BottomDockedTimer } from "./BottomDockedTimer";
import { INITIAL_CLIENTS } from "./data";
import { ClientProfile } from "./types";

interface PyngynAppShellProps {
  children?: React.ReactNode;
  activeClient?: ClientProfile;
  onClientChange?: (client: ClientProfile) => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  showSecondarySidebar?: boolean;
  className?: string;
}

export const PyngynAppShell: React.FC<PyngynAppShellProps> = ({
  children,
  activeClient: controlledClient,
  onClientChange,
  activeTab = "tasks",
  onTabChange,
  showSecondarySidebar = true,
  className = "",
}) => {
  const [selectedClient, setSelectedClient] = useState<ClientProfile>(
    controlledClient || INITIAL_CLIENTS[0]
  );
  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("clients");
  const [currentTab, setCurrentTab] = useState(activeTab);

  const activeClientData = controlledClient || selectedClient;

  const handleSelectClient = (c: ClientProfile) => {
    setSelectedClient(c);
    setIsClientDropdownOpen(false);
    if (onClientChange) onClientChange(c);
  };

  const handleTabClick = (tabKey: string) => {
    setCurrentTab(tabKey);
    if (onTabChange) onTabChange(tabKey);
  };

  return (
    <div
      className={`flex flex-col bg-slate-100 text-slate-800 rounded-[14px] border border-slate-300 shadow-2xl overflow-hidden select-none font-sans text-[13px] ${className}`}
      style={{ minHeight: "560px" }}
    >
      {/* 1. Global Top Bar */}
      <TopBar firmName="Sharma & Associates" />

      {/* 2. Main Body Split: Left Nav Rail + Contextual Tree + Center Content */}
      <div className="flex-1 flex overflow-hidden min-h-0 bg-white">
        {/* PRIMARY LEFT ICON RAIL */}
        <nav
          className="w-[46px] min-w-[46px] bg-[#14223d] text-slate-300 flex flex-col items-center py-2.5 justify-between shrink-0 z-20 select-none border-r border-[#1c2e4f]"
          aria-label="App Navigation"
        >
          {/* Top Rail Navigation Icons */}
          <div className="flex flex-col items-center gap-1.5 w-full">
            {[
              { id: "home", label: "My Work", icon: Home },
              { id: "clients", label: "Clients", icon: Building2 },
              { id: "crm", label: "CRM", icon: Users },
              { id: "cockpit", label: "Cockpit", icon: LayoutDashboard },
              { id: "workload", label: "Workload", icon: BarChart3 },
              { id: "calendar", label: "Calendar", icon: Calendar },
              { id: "kb", label: "Knowledge Base", icon: BookOpen },
              { id: "automations", label: "Automations", icon: Zap },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  title={item.label}
                  className={`w-8 h-8 rounded-[8px] flex items-center justify-center transition-all cursor-pointer relative group ${
                    isActive
                      ? "bg-gradient-to-tr from-[#db2777] to-[#7c3aed] text-white shadow-xs"
                      : "hover:bg-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {isActive && (
                    <span className="absolute -left-1 w-1 h-3.5 bg-white rounded-r-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Settings Icon */}
          <button
            type="button"
            className="w-8 h-8 rounded-[8px] flex items-center justify-center hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Practice Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </nav>

        {/* CONTEXTUAL SECONDARY SIDEBAR: Single coherent tree */}
        {showSecondarySidebar && (
          <aside className="w-[185px] min-w-[185px] bg-slate-50/80 border-r border-slate-200 hidden md:flex flex-col shrink-0 select-none">
            <div className="px-3 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Client Portfolios
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                24 Active
              </span>
            </div>

            <div className="p-2 space-y-1 overflow-y-auto flex-1 text-[12px]">
              {/* Category 1: Manufacturing & Export */}
              <div className="space-y-0.5">
                <div className="flex items-center gap-1 px-1.5 py-1 text-slate-400 font-semibold text-[11px]">
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                  <span>Manufacturing &amp; Export</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectClient(INITIAL_CLIENTS[0])}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-[6px] text-left transition-colors cursor-pointer ${
                    activeClientData.id === "oswal"
                      ? "bg-pink-50/90 text-[#db2777] font-bold border border-pink-200/80 shadow-2xs"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span className="truncate">Oswal Exports</span>
                  </div>
                  <span className="text-[10px] font-mono text-rose-600 bg-rose-50 px-1 rounded border border-rose-200">
                    At-Risk
                  </span>
                </button>
              </div>

              {/* Category 2: EPC & Infrastructure */}
              <div className="space-y-0.5 pt-1.5">
                <div className="flex items-center gap-1 px-1.5 py-1 text-slate-400 font-semibold text-[11px]">
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                  <span>EPC &amp; Infrastructure</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectClient(INITIAL_CLIENTS[1])}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-[6px] text-left transition-colors cursor-pointer ${
                    activeClientData.id === "shreeji"
                      ? "bg-pink-50/90 text-[#db2777] font-bold border border-pink-200/80 shadow-2xs"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="truncate">Shreeji Const.</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1 rounded border border-emerald-200">
                    Tier 1
                  </span>
                </button>
              </div>

              {/* Category 3: Automotive & Tech */}
              <div className="space-y-0.5 pt-1.5 opacity-60">
                <div className="flex items-center gap-1 px-1.5 py-1 text-slate-400 font-semibold text-[11px]">
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                  <span>Automotive &amp; Tech</span>
                </div>
                <div className="px-2 py-1 text-[11px] text-slate-500">
                  Zentrix Labs Pvt Ltd
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* MIDDLE CONTENT PANEL */}
        <main className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden">
          {/* MIDDLE PANEL HEADER: Client Switcher Dropdown & Metadata */}
          <div className="border-b border-slate-200 bg-slate-50/50 px-3 sm:px-4 py-2 flex flex-col gap-2 shrink-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              {/* Single Central Client Switcher Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-[8px] bg-white border border-slate-200 hover:border-pink-300 text-slate-900 font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                >
                  <div className="w-6 h-6 rounded-[6px] bg-[#14223d] text-white flex items-center justify-center font-bold text-[11px]">
                    {activeClientData.name.charAt(0)}
                  </div>
                  <div className="text-left leading-tight">
                    <div className="text-[13.5px] font-extrabold text-slate-900 group-hover:text-[#db2777] transition-colors flex items-center gap-1.5">
                      <span>{activeClientData.name}</span>
                      <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-[#db2777]" />
                    </div>
                    <div className="text-[10.5px] text-slate-500 font-normal">
                      {activeClientData.entityType} · {activeClientData.turnover}
                    </div>
                  </div>
                </button>

                {/* Smooth Animated Switcher Menu */}
                <AnimatePresence>
                  {isClientDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-1.5 w-72 bg-white border border-slate-200 rounded-[10px] shadow-2xl p-2 z-50 text-[12px]"
                    >
                      <div className="px-2 py-1 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
                        Switch Client Space
                      </div>
                      {INITIAL_CLIENTS.map((c) => {
                        const isSelected = c.id === activeClientData.id;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => handleSelectClient(c)}
                            className={`w-full text-left p-2 rounded-[8px] transition-all cursor-pointer flex items-start justify-between mt-1 ${
                              isSelected
                                ? "bg-pink-50 text-[#db2777] font-bold border border-pink-200"
                                : "hover:bg-slate-50 text-slate-800"
                            }`}
                          >
                            <div>
                              <div className="font-bold text-[12.5px] flex items-center gap-1">
                                <span>{c.name}</span>
                                {isSelected && <CheckCircle2 className="w-3 h-3 text-[#db2777]" />}
                              </div>
                              <div className="text-[11px] text-slate-500 font-normal">
                                {c.industry} · {c.turnover}
                              </div>
                            </div>
                            <span
                              className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded border ${
                                c.health === "at-risk"
                                  ? "bg-rose-50 text-rose-700 border-rose-200"
                                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
                              }`}
                            >
                              {c.health === "at-risk" ? "At-Risk" : "Healthy"}
                            </span>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Client Health & Statutory Tags */}
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-[11px] font-mono font-medium text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-[6px]">
                  PAN: <strong className="text-slate-800">{activeClientData.pan}</strong>
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-2xs ${
                    activeClientData.health === "at-risk"
                      ? "bg-rose-50 text-rose-700 border-rose-200/90"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200/90"
                  }`}
                >
                  {activeClientData.health === "at-risk" ? (
                    <>
                      <AlertTriangle className="w-3 h-3 text-rose-600" />
                      <span>At-Risk · 2 Overdue Targets</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Compliant · All Clear</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Horizontal Sub-Navigation Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto text-[12px] pt-1">
              {[
                { id: "tasks", label: "Tasks", badge: activeClientData.activeTasksCount },
                { id: "engagements", label: "Engagements", badge: 2 },
                { id: "statutory", label: "Statutory Master", badge: "3 GST" },
                { id: "documents", label: "Documents", badge: 14 },
                { id: "portal", label: "Client Portal Admin" },
                { id: "timesheets", label: "Timesheets" },
              ].map((t) => {
                const isCurrent = currentTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleTabClick(t.id)}
                    className={`px-3 py-1 rounded-[6px] font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      isCurrent
                        ? "bg-white text-slate-900 border border-slate-200 shadow-2xs"
                        : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                    }`}
                  >
                    <span>{t.label}</span>
                    {t.badge && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                          isCurrent
                            ? "bg-pink-100 text-[#db2777]"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {t.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* VIEW WORKSPACE: Embedded Real Component */}
          <div className="flex-1 overflow-y-auto min-h-0 bg-white">
            {children}
          </div>
        </main>
      </div>

      {/* 3. Bottom Docked Live Timer Bar */}
      <BottomDockedTimer
        clientName={activeClientData.name}
        activeTaskTitle="GSTR-1 sales ledger matching & E-way bill validation"
      />
    </div>
  );
};
