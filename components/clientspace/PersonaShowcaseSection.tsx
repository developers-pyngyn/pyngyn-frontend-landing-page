"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  ClipboardList,
  Clock,
  UserCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  PyngynProductShell,
  MyWorkView,
  WorkloadView,
  DashboardView,
  CalendarView,
  ComplianceView,
  ClientPortalView,
  TaskRowData,
  useSharedWorkflow,
} from "../product-demo";

interface PersonaItem {
  id: "staff" | "senior" | "partner" | "client";
  title: string;
  role: string;
  benefit: string;
  icon: React.ElementType;
}

const PERSONAS: PersonaItem[] = [
  {
    id: "staff",
    title: "Article Assistant / Staff",
    role: "Execution & Timesheets",
    benefit: "Execute assigned audit checklists, reconcile vouchers & log billable hours with live task timers.",
    icon: Clock,
  },
  {
    id: "senior",
    title: "Compliance / Audit Senior",
    role: "Workload & Scrutiny",
    benefit: "Track statutory deadlines, team capacity rebalancing & 4-eye review gates across firm portfolios.",
    icon: ClipboardList,
  },
  {
    id: "partner",
    title: "Managing Partner",
    role: "Executive Command",
    benefit: "See firm-wide statutory compliance velocity, filing deadlines & partner sign-offs at a glance.",
    icon: ShieldCheck,
  },
  {
    id: "client",
    title: "Client (Portal User)",
    role: "Client Transparency",
    benefit: "Access live filings, review deliverables & sign engagement letters via zero-password magic links.",
    icon: UserCheck,
  },
];

export function PersonaShowcaseSection() {
  const [activePersonaId, setActivePersonaId] = useState<PersonaItem["id"]>("staff");
  const shouldReduceMotion = useReducedMotion();

  // Central Shared Reactive Workflow State
  const workflow = useSharedWorkflow(true);

  // Responsive scale handler for clean 16:9 desktop container
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!containerRef.current) return;
    const targetEl = containerRef.current.parentElement || containerRef.current;

    const computeScale = (width: number) => {
      const targetWidth = 1180;
      if (width > 0 && width < targetWidth) {
        setScale(Math.max(0.32, Math.min(1, width / targetWidth)));
      } else if (width >= targetWidth) {
        setScale(1);
      }
    };

    computeScale(targetEl.clientWidth);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        computeScale(width);
      }
    });

    resizeObserver.observe(targetEl);
    const handleResize = () => computeScale(targetEl.clientWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // URL query param support for direct linking to a persona
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const persona = params.get("persona") as PersonaItem["id"] | null;
      if (persona && PERSONAS.some((p) => p.id === persona)) {
        setActivePersonaId(persona);
      }
    }
  }, []);

  // Live Task Data synchronized with shared workflow state
  const liveTasks: TaskRowData[] = [
    {
      id: "task-1",
      name: "GSTR-1 sales ledger matching & E-way bill validation",
      client: "Oswal Exports",
      status: "In Progress",
      effortSpent: 3.5,
      effortTotal: 6,
      assigneeInitials: "RM",
      assigneeName: "Rohan Meena",
      assigneeBg: "#004AAD",
      priority: "High",
      dueDate: "28 Aug",
    },
    {
      id: "task-2",
      name: "GSTR-3B Monthly Return Filing (August 2026)",
      client: "Oswal Exports",
      status: workflow.gstStatus,
      effortSpent: workflow.gstEffortSpent,
      effortTotal: workflow.gstEffortTotal,
      assigneeInitials: "PS",
      assigneeName: "Priya Sharma",
      assigneeBg: "#7E22CE",
      priority: workflow.gstPriority,
      dueDate: "20 Sep",
    },
    {
      id: "task-3",
      name: "Match GSTR-2B - resolve ₹3.2L ITC mismatch",
      client: "Horizon Exports",
      status: "In Progress",
      effortSpent: 2.5,
      effortTotal: 4,
      assigneeInitials: "NJ",
      assigneeName: "Nikhil Jain",
      assigneeBg: "#D97706",
      priority: "High",
      dueDate: "Tomorrow",
      isOverdue: true,
    },
    {
      id: "task-4",
      name: "Provisional balance sheet for bank CC renewal",
      client: "Bharat Manufacturing",
      status: "In Progress",
      effortSpent: 2,
      effortTotal: 12,
      assigneeInitials: "PA",
      assigneeName: "Pooja Agarwal",
      assigneeBg: "#EC4899",
      priority: "High",
      dueDate: "25 Sep",
    },
    {
      id: "task-5",
      name: "Advance tax computation (Q2 FY27)",
      client: "Northstar Trading",
      status: "To Do",
      effortSpent: 0,
      effortTotal: 4,
      assigneeInitials: "AS",
      assigneeName: "Aman Singh",
      assigneeBg: "#475569",
      priority: "Medium",
      dueDate: "15 Sep",
    },
  ];

  return (
    <section
      id="roles"
      className="relative overflow-hidden py-[90px] lg:py-[115px] bg-[#f8fafc] border-b border-slate-200"
    >
      <div className="wrap">
        {/* Section Header */}
        <div className="mx-auto max-w-[840px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-gradient-to-r from-slate-50 via-pink-50/40 to-slate-50 px-3.5 py-1 text-[12px] font-semibold text-[#14223d] shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#14223d] to-[#db2777] animate-pulse" />
            <span>Built for Accounting Practices • Multi-Stakeholder Workspace</span>
          </div>

          <h2 className="mt-4 font-display text-[clamp(28px,4.5vw,46px)] font-bold tracking-tight text-slate-950 leading-[1.15]">
            Built for every role in your firm.{" "}
            <span className="block sm:inline bg-gradient-to-r from-[#14223d] via-[#7c3aed] to-[#db2777] bg-clip-text text-transparent">
              From partner sign-offs to client approvals.
            </span>
          </h2>

          <p className="mt-3.5 text-[clamp(15px,1.6vw,18px)] text-slate-600 leading-relaxed max-w-[680px] mx-auto">
            Pyngyn connects partners, compliance seniors, article trainees, and clients into one unified operating system—giving each stakeholder the exact tools and visibility they need.
          </p>
        </div>

        {/* 4 Interactive Persona Selector Cards */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-[1180px] mx-auto">
          {PERSONAS.map((persona) => {
            const isActive = activePersonaId === persona.id;
            const Icon = persona.icon;

            return (
              <button
                key={persona.id}
                type="button"
                data-product-target={`persona-card-${persona.id}`}
                onClick={() => setActivePersonaId(persona.id)}
                aria-pressed={isActive}
                className={`group relative text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                  isActive
                    ? "bg-white border-[#14223d] shadow-soft ring-2 ring-[#14223d]/10 -translate-y-0.5"
                    : "bg-white/70 border-slate-200/90 hover:bg-white hover:border-slate-300 hover:shadow-2xs"
                }`}
              >
                <div>
                  {/* Top line: Role Icon & Pill */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`h-9 w-9 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-[#14223d] text-white"
                          : "bg-slate-100 text-slate-600 group-hover:bg-slate-200/70"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <span
                      className={`text-[10.5px] font-mono px-2 py-0.5 rounded-full font-bold transition-colors ${
                        isActive
                          ? "bg-[#f0f4fa] text-[#14223d] border border-blue-200/60"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {persona.role}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-bold text-[15px] sm:text-[15.5px] leading-tight transition-colors ${
                      isActive ? "text-slate-950" : "text-slate-800"
                    }`}
                  >
                    {persona.title}
                  </h3>

                  {/* Benefit */}
                  <p className="mt-2 text-[12.5px] sm:text-[13px] text-slate-600 leading-relaxed">
                    {persona.benefit}
                  </p>
                </div>

                {/* Active indicator bar */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span
                    className={`text-[11px] font-bold inline-flex items-center gap-1 transition-colors ${
                      isActive ? "text-[#14223d]" : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    <span>View Workspace</span>
                    <ArrowRight className={`h-3 w-3 transition-transform ${isActive ? "translate-x-0.5" : ""}`} />
                  </span>

                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-[#14223d] animate-pulse" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Real Native Product Demonstration Surface */}
        <div className="mt-8 sm:mt-10 max-w-[1220px] mx-auto">
          <div
            ref={containerRef}
            data-active-persona={activePersonaId}
            data-workflow-phase={workflow.phase}
            className="w-full relative flex items-center justify-center select-none"
            style={{
              height: scale < 1 ? `${Math.round(700 * scale)}px` : "700px",
            }}
          >
            <div
              style={{
                width: scale < 1 ? `${Math.round(1180 * scale)}px` : "1180px",
                height: scale < 1 ? `${Math.round(700 * scale)}px` : "700px",
                maxWidth: "100%",
              }}
              className="relative flex-none overflow-visible"
            >
              <div
                style={{
                  width: "1180px",
                  height: "700px",
                  transform: `scale(${scale})`,
                  transformOrigin: "top center",
                }}
                className="relative flex-none rounded-2xl border border-slate-200/90 bg-white shadow-xl overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePersonaId}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    {/* 1. Article Assistant / Staff: Full 3-column My Work Workspace */}
                    {activePersonaId === "staff" && (
                      <PyngynProductShell
                        activeRailItem="home"
                        sidebarVariant="home"
                        showAlertBanner={false}
                        showBottomTimer={true}
                        bottomTimerDisplay="00:04:18"
                        bottomActiveTaskTitle="GSTR-3B Monthly Return Filing (August 2026)"
                        bottomClientName="Oswal Exports"
                        className="w-full h-full rounded-none border-0 shadow-none"
                      >
                        <MyWorkView tasks={liveTasks} />
                      </PyngynProductShell>
                    )}

                    {/* 2. Compliance / Audit Senior: Workload & Team Capacity */}
                    {activePersonaId === "senior" && (
                      <PyngynProductShell
                        activeRailItem="workload"
                        sidebarVariant="none"
                        showAlertBanner={true}
                        alertText="GSTR-3B Overdue · Rebalancing Capacity"
                        showBottomTimer={true}
                        bottomTimerDisplay="00:18:42"
                        bottomActiveTaskTitle="Team Workload Rebalance — Q2 Capacity"
                        bottomClientName="Sharma & Associates"
                        className="w-full h-full rounded-none border-0 shadow-none"
                      >
                        <WorkloadView
                          activeTasks={workflow.activeTasks}
                          capacityUtilization={workflow.capacityUtilization}
                          overdueTasks={workflow.overdueTasks}
                          nikhilHours={workflow.nikhilHours}
                          priyaHours={workflow.priyaHours}
                          rohanHours={workflow.rohanHours}
                        />
                      </PyngynProductShell>
                    )}

                    {/* 3. Managing Partner: Executive Command & Sign-off Gates */}
                    {activePersonaId === "partner" && (
                      <PyngynProductShell
                        activeRailItem="dashboard"
                        sidebarVariant="none"
                        showAlertBanner={false}
                        showBottomTimer={true}
                        bottomTimerDisplay="01:05:12"
                        bottomActiveTaskTitle="Sec 44AB Tax Audit Draft - Form 3CD Sign-off"
                        bottomClientName="Northstar Mfg"
                        className="w-full h-full rounded-none border-0 shadow-none"
                      >
                        <DashboardView
                          complianceIndex={workflow.complianceIndex}
                          statutoryFilingsRatio={workflow.statutoryFilingsRatio}
                          gstReturnsFiledCount={workflow.gstReturnsFiledCount}
                        />
                      </PyngynProductShell>
                    )}

                    {/* 4. Client (Portal User): Oswal Exports ClientSpace */}
                    {activePersonaId === "client" && (
                      <ClientPortalView
                        clientName="Oswal Exports"
                        firmName="Sharma & Associates"
                        gstProgress={workflow.clientGstProgress}
                        statusBadge={workflow.clientStatusBadge}
                        docCount={workflow.clientDocCount}
                        actionItemsCount={workflow.clientActionItemsCount}
                        className="w-full h-full"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
