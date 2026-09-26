"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Search,
  AlertCircle,
  Calendar,
  Building2,
  Users,
  CheckSquare,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  Check,
  Zap,
  ChevronRight,
  Database,
  Lock,
} from "lucide-react";
import { DEMO_URL, SIGNUP_URL } from "../config";

interface QueryDemo {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  question: string;
  checklist: string[];
  summary: string;
  summaryType: "risk" | "capacity" | "status" | "priorities";
  cards: {
    title: string;
    subtitle: string;
    status: string;
    statusColor: string;
    details: string;
    metric?: string;
    tag?: string;
  }[];
  recommendation: string;
  actionText?: string;
  sources: string[];
}

const AI_DEMOS: QueryDemo[] = [
  {
    id: "risk",
    label: "At-Risk Work",
    icon: AlertCircle,
    question: "Which client filings are at risk this week?",
    checklist: [
      "Checking tasks...",
      "Checking deadlines...",
      "Checking approvals...",
      "Checking client status...",
      "Checking engagement progress...",
    ],
    summary: "3 filings need attention this week.",
    summaryType: "risk",
    cards: [
      {
        title: "Horizon Exports",
        subtitle: "GSTR-3B Monthly Return",
        status: "At Risk",
        statusColor: "text-rose-700 bg-rose-50 border-rose-200",
        details: "Sales register reconciled, but bank statement for ITC claim is still pending from client.",
        tag: "Due 20 Sep",
      },
      {
        title: "Northstar Manufacturing",
        subtitle: "Sec 44AB Tax Audit (Form 3CD)",
        status: "Delayed",
        statusColor: "text-amber-700 bg-amber-50 border-amber-200",
        details: "Fixed asset depreciation schedules have 3 unverified entries awaiting voucher proof.",
        tag: "Due 30 Sep",
      },
      {
        title: "BluePeak Industries",
        subtitle: "Advance Tax Q2 Instalment",
        status: "Review Pending",
        statusColor: "text-[#14223d] bg-slate-100 border-slate-300",
        details: "Computation ready with article assistant; awaiting Partner sign-off before challan generation.",
        tag: "Due Today",
      },
    ],
    recommendation: "Automated WhatsApp document reminder ready for Horizon Exports. Dispatch now?",
    actionText: "Send 1-Click WhatsApp Follow-up",
    sources: ["Tasks", "Statutory Deadlines", "Client Documents", "Review Gates"],
  },
  {
    id: "capacity",
    label: "Team Workload",
    icon: Users,
    question: "Who on my team has capacity this week?",
    checklist: [
      "Analyzing active timesheet allocations",
      "Checking unassigned audit working papers",
      "Comparing weekly budget vs logged effort",
      "Reviewing leave and statutory deadlines",
    ],
    summary: "2 team members currently have available capacity for allocation.",
    summaryType: "capacity",
    cards: [
      {
        title: "Aarav Mehta",
        subtitle: "Article Assistant • Direct Tax",
        status: "12h Available",
        statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
        details: "Completed Form 15CA/15CB verification 2 days ahead of schedule. Ready for voucher audit.",
        metric: "28 / 40h booked (70% load)",
      },
      {
        title: "Priya Sharma",
        subtitle: "Senior Consultant • GST Practice",
        status: "8h Available",
        statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
        details: "GSTR-1 filing wave completed. Capacity opens Thursday afternoon for notice scrutiny reply.",
        metric: "32 / 40h booked (80% load)",
      },
    ],
    recommendation: "You can assign the 6 pending Bansal Heavy Ltd voucher verifications to Aarav Mehta.",
    actionText: "Rebalance Team Workload",
    sources: ["Timesheets", "Practice Workload", "Active Engagements"],
  },
  {
    id: "client-status",
    label: "Client Status",
    icon: Building2,
    question: "Give me a quick update on Horizon Exports.",
    checklist: [
      "Querying Horizon Exports client workspace",
      "Checking multi-entity compliance status",
      "Reviewing pending document intake checklists",
      "Auditing active billing and retainer status",
    ],
    summary: "Horizon Exports: 3 active engagements, 2 tasks in progress, overall status on track.",
    summaryType: "status",
    cards: [
      {
        title: "Statutory Compliance",
        subtitle: "FY 2026-27 Retainer",
        status: "On Track",
        statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
        details: "GST filing on schedule. E-way bill portal sync running with zero flagged mismatches.",
        tag: "Next: 20 Sep",
      },
      {
        title: "Internal Tax Audit",
        subtitle: "Working Papers Drafted",
        status: "In Progress",
        statusColor: "text-slate-800 bg-slate-100 border-slate-300",
        details: "4-Eye review stage: Article assistant completed vouching; Manager review 65% complete.",
        tag: "Next: 28 Sep",
      },
      {
        title: "Pending Document",
        subtitle: "Client Portal Request",
        status: "1 Pending",
        statusColor: "text-amber-700 bg-amber-50 border-amber-200",
        details: "Aug 2026 export invoice copies uploaded; August Forex remittance certificate requested.",
        tag: "Overdue 1d",
      },
    ],
    recommendation: "Engagement health is healthy (92%). No partner intervention required at this stage.",
    actionText: "Open Horizon Exports Workspace",
    sources: ["Client Vault", "Task Pipeline", "Portal Activity", "Billing Logs"],
  },
  {
    id: "priorities",
    label: "Today's Priorities",
    icon: CheckSquare,
    question: "What needs my attention today?",
    checklist: [
      "Filtering tasks assigned to Partner role",
      "Identifying statutory filings due in 24 hours",
      "Auditing overdue client approval checkpoints",
      "Checking unread client portal messages",
    ],
    summary: "4 items require partner sign-off and action before 6:00 PM.",
    summaryType: "priorities",
    cards: [
      {
        title: "GSTR-3B Final Sign-Off",
        subtitle: "Rathore Machining Pvt Ltd",
        status: "Statutory Deadline",
        statusColor: "text-rose-700 bg-rose-50 border-rose-200",
        details: "Draft computation matches GSTR-2B. Partner DSC token required for portal upload.",
        tag: "High Priority",
      },
      {
        title: "Audit Engagement Letter",
        subtitle: "Apex Logistics LLP",
        status: "Approval Needed",
        statusColor: "text-slate-800 bg-slate-100 border-slate-300",
        details: "Scope document and statutory fee schedule revised as per Partner review.",
        tag: "Ready to Dispatch",
      },
      {
        title: "Bank Reconciliation Sign-Off",
        subtitle: "Bansal Heavy Ltd",
        status: "Manager Checked",
        statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
        details: "Uncleared cheques for ₹4.8L verified against counterfoils by senior article.",
        tag: "Sign-Off Ready",
      },
    ],
    recommendation: "Sign off on Rathore Machining GSTR-3B first to avoid late filing statutory fees.",
    actionText: "Review Priority Queue",
    sources: ["Partner Review Queue", "Statutory Deadlines", "DSC Queue"],
  },
];

export function PyngynAiSection() {
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedQuestion, setTypedQuestion] = useState("");
  const [stage, setStage] = useState<"idle" | "typing" | "gathering" | "answered">("answered");
  const [checkedItems, setCheckedItems] = useState<number>(0);
  const [actionSuccess, setActionSuccess] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeDemo = AI_DEMOS[activeDemoIndex];

  // Run simulated typing and gathering flow
  const runDemo = (demoIndex: number) => {
    setActiveDemoIndex(demoIndex);
    setActionSuccess(false);
    const targetDemo = AI_DEMOS[demoIndex];
    setTypedQuestion("");
    setIsTyping(true);
    setStage("typing");
    setCheckedItems(0);

    let charIndex = 0;
    const fullText = targetDemo.question;

    if (timeoutRef.current) clearInterval(timeoutRef.current);

    const typeInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        setTypedQuestion(fullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setStage("gathering");

        // Animate checklist gathering items sequentially
        let itemIndex = 0;
        const checkInterval = setInterval(() => {
          if (itemIndex < targetDemo.checklist.length) {
            setCheckedItems((prev) => prev + 1);
            itemIndex++;
          } else {
            clearInterval(checkInterval);
            setTimeout(() => {
              setStage("answered");
            }, 300);
          }
        }, 220);
      }
    }, 28);
  };

  useEffect(() => {
    // Initial display
    setTypedQuestion(activeDemo.question);
    setCheckedItems(activeDemo.checklist.length);
    setStage("answered");
  }, []);

  return (
    <section
      id="pyngyn-ai"
      className="relative overflow-hidden py-[90px] lg:py-[120px] bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t border-slate-200"
    >
      <div className="wrap">
        {/* Section Header */}
        <div className="mx-auto max-w-[840px] text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-gradient-to-r from-slate-50 via-pink-50/40 to-slate-50 px-3.5 py-1 text-[12px] font-semibold text-[#14223d] shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#14223d] to-[#db2777] animate-pulse" />
            <span>Meet PYNGYN AI • Practice Intelligence</span>
          </div>

          <h2 className="mt-5 font-display text-[clamp(28px,4.5vw,46px)] font-bold tracking-tight text-slate-950 leading-[1.15]">
            Meet PYNGYN AI.{" "}
            <span className="bg-gradient-to-r from-[#14223d] via-[#7c3aed] to-[#db2777] bg-clip-text text-transparent">
              Ask about your clients, deadlines, workload and work at risk.
            </span>
          </h2>

          <p className="mt-4 text-[clamp(15px,1.6vw,18px)] text-slate-600 leading-relaxed max-w-[700px] mx-auto">
            PYNGYN AI synthesizes records directly from your firm&apos;s active tasks, statutory filing schedules, and partner review gates—giving you immediate answers without searching through multiple screens.
          </p>
        </div>

        {/* Scaled Interactive Product Demonstration Stage with Software Backdrop */}
        <motion.div
          initial={{ opacity: 0.95, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-12 mx-auto max-w-[1040px] rounded-2xl border border-slate-300 bg-white/95 p-4 sm:p-6 lg:p-8 shadow-card overflow-hidden"
        >
          {/* Grounding Authentic Product Software Backdrop */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04] blur-[1px] select-none -z-0">
            <Image
              src="/product-screens/oswal-list.png"
              alt="Pyngyn Real Software Interface"
              fill
              className="object-cover"
            />
          </div>
          {/* Top Interface Bar with Search & Mascot Avatar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            {/* Ask PYNGYN Input Box */}
            <div className="relative flex-1">
              <div className="flex items-center gap-3 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-4 py-3 shadow-inner text-slate-800 transition-all focus-within:border-[#14223d] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#14223d]/10">
                <Search className="h-4 w-4 text-[#14223d] flex-none" />
                <div className="flex-1 font-mono text-[13.5px] text-slate-800 truncate">
                  {stage === "typing" ? (
                    <span>
                      {typedQuestion}
                      <span className="inline-block w-1.5 h-4 bg-[#14223d] ml-0.5 align-middle animate-pulse" />
                    </span>
                  ) : (
                    <span>{typedQuestion || activeDemo.question}</span>
                  )}
                </div>
                {stage === "gathering" && (
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-200 px-2 py-0.5 text-[11px] font-semibold text-[#14223d] animate-pulse">
                    <Zap className="h-3 w-3" />
                    Checking workspace...
                  </span>
                )}
              </div>
            </div>

            {/* Official Mascot Teammate Avatar */}
            <div className="flex items-center gap-3 flex-none pl-2">
              <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-slate-300 shadow-sm bg-slate-100 flex-none">
                <Image
                  src="/mascot/pyngyn-ai-avatar.png"
                  alt="PYNGYN AI Teammate"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold text-slate-900">PYNGYN AI</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Practice Teammate</p>
              </div>
            </div>
          </div>

          {/* Quick Actions Row */}
          <div className="pt-4 pb-6">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-[11.5px] font-semibold text-slate-500 uppercase tracking-wider">
                Simulated Practice Queries:
              </span>
              <span className="text-[11px] text-slate-400">Click any query to run real-time analysis</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {AI_DEMOS.map((demo, idx) => {
                const IconComp = demo.icon;
                const isActive = activeDemoIndex === idx;
                return (
                  <button
                    key={demo.id}
                    onClick={() => runDemo(idx)}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[12.5px] font-semibold transition-all ${
                      isActive
                        ? "bg-[#14223d] text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200"
                    }`}
                  >
                    <IconComp className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-[#14223d]"}`} />
                    <span>{demo.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gathering Sequence or Structured Answer Display */}
          <div className="min-h-[380px] rounded-xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6 transition-all">
            <AnimatePresence mode="wait">
              {stage === "gathering" ? (
                /* Information Gathering Animation */
                <motion.div
                  key="gathering"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="py-6 max-w-[580px] mx-auto text-center"
                >
                  <div className="mx-auto mb-4 relative h-12 w-12 rounded-full border border-slate-300 bg-white shadow-sm flex items-center justify-center">
                    <Database className="h-5 w-5 text-[#14223d] animate-pulse" />
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-900">
                    PYNGYN is checking your practice workspace...
                  </h4>
                  <p className="text-[12.5px] text-slate-500 mt-1 mb-6">
                    Synthesizing real-time records across clients, task gates, and statutory calendars.
                  </p>

                  {/* Checklist */}
                  <div className="space-y-2.5 text-left max-w-[420px] mx-auto">
                    {activeDemo.checklist.map((item, idx) => {
                      const isChecked = idx < checkedItems;
                      return (
                        <div
                          key={idx}
                          className={`flex items-center justify-between p-2.5 rounded-lg border text-[12.5px] font-medium transition-all ${
                            isChecked
                              ? "bg-white border-slate-300 text-slate-900 shadow-2xs"
                              : "bg-transparent border-transparent text-slate-400"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] ${
                                isChecked
                                  ? "bg-[#14223d] text-white"
                                  : "border border-slate-300 text-transparent"
                              }`}
                            >
                              {isChecked && <Check className="h-2.5 w-2.5" />}
                            </div>
                            <span>{item}</span>
                          </div>
                          {isChecked && (
                            <span className="text-[11px] font-mono text-slate-500 font-semibold">Done</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                /* Structured Answer View */
                <motion.div
                  key="answered"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Summary Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-slate-300 bg-white shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center flex-none text-[#14223d]">
                        <CheckSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[15px] text-slate-950">
                          {activeDemo.summary}
                        </h4>
                        <p className="text-[12px] text-slate-500 font-medium">
                          Based on current tasks, statutory deadlines, and client approvals.
                        </p>
                      </div>
                    </div>
                    {/* Sources Badge */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {activeDemo.sources.map((src, i) => (
                        <span
                          key={i}
                          className="rounded bg-slate-100 text-slate-700 px-2 py-0.5 text-[10.5px] font-semibold border border-slate-200"
                        >
                          {src}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Findings Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {activeDemo.cards.map((card, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <h5 className="font-bold text-[13.5px] text-slate-900 truncate">
                              {card.title}
                            </h5>
                            <span
                              className={`rounded px-1.5 py-0.5 text-[10px] font-bold border ${card.statusColor}`}
                            >
                              {card.status}
                            </span>
                          </div>
                          <div className="text-[11.5px] font-semibold text-slate-600 mb-2">
                            {card.subtitle}
                          </div>
                          <p className="text-[12px] text-slate-600 leading-relaxed">
                            {card.details}
                          </p>
                        </div>

                        {(card.tag || card.metric) && (
                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                            <span>{card.metric || "Statutory window"}</span>
                            <span className="font-semibold text-slate-800">{card.tag}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Action Recommendation Banner */}
                  <div className="rounded-xl border border-slate-200 bg-slate-100/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-2.5">
                      <Zap className="h-4 w-4 text-[#14223d] flex-none mt-0.5 sm:mt-0" />
                      <p className="text-[12.5px] text-slate-700 font-medium">
                        <span className="font-bold text-slate-900">Recommended Action: </span>
                        {activeDemo.recommendation}
                      </p>
                    </div>

                    <button
                      onClick={() => setActionSuccess(true)}
                      className={`btn text-[12.5px] px-3.5 py-2 whitespace-nowrap shadow-2xs transition-all flex-none ${
                        actionSuccess
                          ? "bg-emerald-700 text-white hover:bg-emerald-800"
                          : "btn-accent"
                      }`}
                    >
                      {actionSuccess ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>Action Dispatched</span>
                        </>
                      ) : (
                        <>
                          <span>{activeDemo.actionText}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Grounded & Human Control Trust Statement */}
          <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px] text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#14223d]" />
              <span>
                <strong className="text-slate-800">Human Control Guarantee:</strong> PYNGYN AI assists your team. You stay in control.
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11.5px] text-slate-600">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              <span>Grounded in firm data • Zero external model training</span>
            </div>
          </div>
        </motion.div>

        {/* Section Closing CTA */}
        <div className="mt-14 text-center">
          <h3 className="font-display text-[22px] sm:text-[26px] font-bold text-slate-900">
            Ask PYNGYN what needs your attention.
          </h3>
          <p className="mt-2 text-[14.5px] text-slate-600 max-w-[560px] mx-auto">
            Get a clear view of your clients, deadlines, workload and risks without digging through multiple screens.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={DEMO_URL}
              className="btn btn-accent text-[14px] px-6 py-2.5 shadow-cta text-center w-full sm:w-auto"
            >
              Explore PYNGYN AI in Demo
            </a>
            <a
              href="#tour"
              className="btn btn-ghost text-[14px] px-5 py-2.5 border-slate-300 text-center w-full sm:w-auto"
            >
              See Connected Workspaces
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
