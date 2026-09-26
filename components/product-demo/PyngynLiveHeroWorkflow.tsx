'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import {
  CheckSquare,
  Folder,
  Clock,
  Users,
  Filter,
  ArrowUpDown,
  Search,
  Flag,
  ChevronDown,
  Check,
  Play,
  Settings,
  Layers,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  FileCheck2,
  Calendar,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Real Accounting Tasks Data
// ---------------------------------------------------------------------------
interface LiveTask {
  id: string;
  name: string;
  client: string;
  status: 'To Do' | 'In Progress' | 'Internal Review' | 'Awaiting Decision' | 'Filed / Completed' | 'Blocked';
  statusTone: 'slate' | 'blue' | 'purple' | 'amber' | 'emerald' | 'red';
  effortSpent: number;
  effortTotal: number;
  effortColor: 'slate' | 'blue' | 'purple' | 'amber' | 'emerald';
  assigneeInitials: string;
  assigneeBg: string;
  assigneeName?: string;
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  priorityTone: 'red' | 'amber' | 'blue' | 'slate';
  dueDate: string;
  isOverdue?: boolean;
}

// Initial 2 tasks visible at startup
const BASE_TASKS: LiveTask[] = [
  {
    id: 'task-1',
    name: 'GSTR-1 sales ledger matching & E-way bill validation',
    client: 'Oswal Exports',
    status: 'In Progress',
    statusTone: 'blue',
    effortSpent: 3.5,
    effortTotal: 6,
    effortColor: 'blue',
    assigneeInitials: 'RM',
    assigneeBg: '#004AAD',
    assigneeName: 'Rohan',
    priority: 'High',
    priorityTone: 'amber',
    dueDate: '28 Aug',
  },
  {
    id: 'task-2',
    name: 'GSTR-3B Monthly Return Filing (August 2026)',
    client: 'Oswal Exports',
    status: 'Internal Review',
    statusTone: 'purple',
    effortSpent: 5,
    effortTotal: 5,
    effortColor: 'emerald',
    assigneeInitials: 'PS',
    assigneeBg: '#7E22CE',
    assigneeName: 'Priya',
    priority: 'Urgent',
    priorityTone: 'red',
    dueDate: '20 Sep',
  },
];

// Tasks dynamically inserted during Workflow #1
const NEW_TASK_GSTR2B: LiveTask = {
  id: 'task-3',
  name: 'Match GSTR-2B - resolve ₹3.2L ITC mismatch',
  client: 'Horizon Exports',
  status: 'In Progress',
  statusTone: 'blue',
  effortSpent: 2.5,
  effortTotal: 4,
  effortColor: 'blue',
  assigneeInitials: 'NJ',
  assigneeBg: '#D97706',
  assigneeName: 'Nikhil Jain',
  priority: 'High',
  priorityTone: 'amber',
  dueDate: 'Tomorrow',
  isOverdue: true,
};

const NEW_TASK_PROVISIONAL_BS: LiveTask = {
  id: 'task-4',
  name: 'Provisional balance sheet for bank CC renewal',
  client: 'Bharat Manufacturing',
  status: 'In Progress',
  statusTone: 'blue',
  effortSpent: 2,
  effortTotal: 12,
  effortColor: 'blue',
  assigneeInitials: 'PA',
  assigneeBg: '#EC4899',
  assigneeName: 'Pooja',
  priority: 'High',
  priorityTone: 'amber',
  dueDate: '25 Sep',
};

const NEW_TASK_ADVANCE_TAX: LiveTask = {
  id: 'task-5',
  name: 'Advance tax computation (Q2 FY27)',
  client: 'Northstar Trading',
  status: 'To Do',
  statusTone: 'slate',
  effortSpent: 0,
  effortTotal: 4,
  effortColor: 'slate',
  assigneeInitials: 'AS',
  assigneeBg: '#475569',
  assigneeName: 'Aditya',
  priority: 'Medium',
  priorityTone: 'blue',
  dueDate: '15 Sep',
};

// ---------------------------------------------------------------------------
// Camera Targets & Stages
// ---------------------------------------------------------------------------
type WorkflowStage =
  | 'init' // 0-2s: Full overview (scale 1)
  | 'tasks_appearing' // 2-5s: Camera glides to table, new tasks added, overlay: Task Created
  | 'status_focus' // 5-6.5s: Camera zooms toward Status button of GSTR-3B
  | 'status_dropdown' // 6.5-8s: Real status dropdown opens & selects Filed / Completed
  | 'status_completed' // 8-9.5s: Status updates to Filed / Completed, overlay: GST Filing Completed
  | 'priority_focus' // 9.5-11s: Camera shifts to Priority of GSTR-2B, dropdown opens
  | 'priority_updated' // 11-12.5s: High -> Urgent, overlay: Priority Escalated
  | 'effort_focus' // 12.5-14s: Camera moves to Effort column, 2.5h -> 3.5h, bar 62% -> 88%
  | 'effort_updated' // 14-16s: Progress overlay, background deliverables update
  | 'summary_zoomout' // 16-18.5s: Camera smoothly zooms out to complete My Work, Pyng companion overlay
  | 'settle_hold'; // 18.5-20s: Clean resting state before smooth loop restart

interface OverlayData {
  title: string;
  subtitle: string;
  tag: string;
  type: 'success' | 'alert' | 'progress' | 'pyng';
}

export function PyngynLiveHeroWorkflow({
  className = '',
  autoPlay = true,
}: {
  className?: string;
  autoPlay?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  // Dynamic workflow stage
  const [stage, setStage] = useState<WorkflowStage>('init');

  // Dynamic task state
  const [tasks, setTasks] = useState<LiveTask[]>([BASE_TASKS[0], BASE_TASKS[1]]);

  // Live element states
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<OverlayData | null>(null);

  // Workflow timeline orchestration
  useEffect(() => {
    if (!autoPlay || shouldReduceMotion) {
      // Static settled preview for reduced motion
      setTasks([
        BASE_TASKS[0],
        { ...BASE_TASKS[1], status: 'Filed / Completed', statusTone: 'emerald' },
        { ...NEW_TASK_GSTR2B, priority: 'Urgent', priorityTone: 'red', effortSpent: 3.5 },
        NEW_TASK_PROVISIONAL_BS,
        NEW_TASK_ADVANCE_TAX,
      ]);
      setStage('summary_zoomout');
      return;
    }

    const timeline: { time: number; run: () => void }[] = [
      // 0s: Reset baseline
      {
        time: 0,
        run: () => {
          setStage('init');
          setTasks([BASE_TASKS[0], BASE_TASKS[1]]);
          setIsStatusDropdownOpen(false);
          setIsPriorityDropdownOpen(false);
          setActiveOverlay(null);
        },
      },
      // 2.0s: Camera moves to table, insert task GSTR-2B
      {
        time: 2000,
        run: () => {
          setStage('tasks_appearing');
          setTasks([BASE_TASKS[0], BASE_TASKS[1], NEW_TASK_GSTR2B]);
          setActiveOverlay({
            title: 'Task Created & Assigned',
            subtitle: 'Match GSTR-2B · Horizon Exports',
            tag: 'Assigned to Nikhil Jain · Due Tomorrow',
            type: 'success',
          });
        },
      },
      // 3.2s: Insert Provisional BS & Advance Tax
      {
        time: 3200,
        run: () => {
          setTasks([
            BASE_TASKS[0],
            BASE_TASKS[1],
            NEW_TASK_GSTR2B,
            NEW_TASK_PROVISIONAL_BS,
            NEW_TASK_ADVANCE_TAX,
          ]);
        },
      },
      // 4.8s: Dismiss task overlay
      {
        time: 4800,
        run: () => {
          setActiveOverlay(null);
        },
      },
      // 5.4s: Camera zooms to Status column on GSTR-3B
      {
        time: 5400,
        run: () => {
          setStage('status_focus');
        },
      },
      // 6.6s: Open real Pyngyn status dropdown
      {
        time: 6600,
        run: () => {
          setStage('status_dropdown');
          setIsStatusDropdownOpen(true);
        },
      },
      // 8.6s: Select "Filed / Completed"
      {
        time: 8600,
        run: () => {
          setIsStatusDropdownOpen(false);
          setStage('status_completed');
          setTasks((prev) =>
            prev.map((t) =>
              t.id === 'task-2'
                ? { ...t, status: 'Filed / Completed', statusTone: 'emerald' }
                : t
            )
          );
          setActiveOverlay({
            title: 'GST Filing Completed',
            subtitle: 'GSTR-3B Monthly Return · Oswal Exports',
            tag: 'Filed / Completed · Verified on Portal ✓',
            type: 'success',
          });
        },
      },
      // 10.6s: Camera moves to Priority column on GSTR-2B + open Priority dropdown
      {
        time: 10600,
        run: () => {
          setActiveOverlay(null);
          setStage('priority_focus');
          setIsPriorityDropdownOpen(true);
        },
      },
      // 12.6s: Priority dropdown changes to Urgent
      {
        time: 12600,
        run: () => {
          setIsPriorityDropdownOpen(false);
          setStage('priority_updated');
          setTasks((prev) =>
            prev.map((t) =>
              t.id === 'task-3'
                ? { ...t, priority: 'Urgent', priorityTone: 'red' }
                : t
            )
          );
          setActiveOverlay({
            title: 'Priority Escalated to Urgent',
            subtitle: 'Match GSTR-2B · Horizon Exports',
            tag: 'ITC Filing Window · 2 Days Remaining',
            type: 'alert',
          });
        },
      },
      // 14.4s: Camera moves to Effort column on GSTR-2B
      {
        time: 14400,
        run: () => {
          setActiveOverlay(null);
          setStage('effort_focus');
        },
      },
      // 15.2s: Log effort 2.5h -> 3.5h (88% progress)
      {
        time: 15200,
        run: () => {
          setStage('effort_updated');
          setTasks((prev) =>
            prev.map((t) =>
              t.id === 'task-3'
                ? { ...t, effortSpent: 3.5, effortColor: 'emerald' }
                : t
            )
          );
          setActiveOverlay({
            title: 'Billable Progress Logged',
            subtitle: 'Match GSTR-2B reconciliation',
            tag: '3.5h / 4h Logged · 88% Scope Complete',
            type: 'progress',
          });
        },
      },
      // 17.6s: Camera smoothly glides out to complete My Work view + Grand summary overlay
      {
        time: 17600,
        run: () => {
          setStage('summary_zoomout');
          setActiveOverlay({
            title: 'Pyng Practice Automation',
            subtitle: 'All 5 Q2 filing deliverables in motion',
            tag: '1 Filed · 3 In Progress · 0 Blockers',
            type: 'pyng',
          });
        },
      },
      // 21.0s: Hold clean settled state
      {
        time: 21000,
        run: () => {
          setStage('settle_hold');
          setActiveOverlay(null);
        },
      },
    ];

    const timeouts = timeline.map((step) => setTimeout(step.run, step.time));
    const loopTimer = setTimeout(() => {
      // Loop seamlessly
      setStage('init');
    }, 23500);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(loopTimer);
    };
  }, [autoPlay, shouldReduceMotion]);

  // -------------------------------------------------------------------------
  // Intelligently Guided Camera Transformations
  // The camera selectively focuses on the active component while keeping
  // enough surrounding UI visible so the user always sees the Pyngyn product!
  // -------------------------------------------------------------------------
  let cameraScale = 1;
  let cameraX = 0;
  let cameraY = 0;

  if (stage === 'tasks_appearing') {
    cameraScale = 1.12;
    cameraX = 0;
    cameraY = -12;
  } else if (stage === 'status_focus' || stage === 'status_dropdown' || stage === 'status_completed') {
    // Zoom toward Status button on Row 2 (GSTR-3B)
    cameraScale = 1.28;
    cameraX = -32;
    cameraY = -28;
  } else if (stage === 'priority_focus' || stage === 'priority_updated') {
    // Zoom toward Priority on Row 3 (GSTR-2B)
    cameraScale = 1.26;
    cameraX = -95;
    cameraY = -48;
  } else if (stage === 'effort_focus' || stage === 'effort_updated') {
    // Zoom toward Effort column on Row 3
    cameraScale = 1.28;
    cameraX = -45;
    cameraY = -52;
  } else {
    // 'init', 'summary_zoomout', 'settle_hold'
    cameraScale = 1.0;
    cameraX = 0;
    cameraY = 0;
  }

  return (
    <div
      data-workflow-stage={stage}
      className={`relative w-full max-w-[700px] select-none font-sans text-slate-800 ${className}`}
    >
      {/* ================================================================= */}
      {/* 1. FLOATING PROFESSIONAL WORKFLOW OVERLAY NOTIFICATION              */}
      {/* Appears smoothly above/around the product to explain automations  */}
      {/* ================================================================= */}
      <div className="absolute -top-3.5 right-4 z-[200] pointer-events-none">
        <AnimatePresence mode="wait">
          {activeOverlay && (
            <motion.div
              key={activeOverlay.title}
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 rounded-xl border border-slate-200/90 bg-white/95 px-3.5 py-2.5 shadow-xl backdrop-blur-md"
              style={{
                boxShadow:
                  '0 12px 28px -6px rgba(15, 23, 42, 0.16), 0 0 0 1px rgba(226, 232, 240, 0.9)',
              }}
            >
              {/* Overlay Icon Indicator */}
              <div
                className={`flex h-8 w-8 flex-none items-center justify-center rounded-lg ${
                  activeOverlay.type === 'success'
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/70'
                    : activeOverlay.type === 'alert'
                    ? 'bg-amber-50 text-amber-600 border border-amber-200/70'
                    : activeOverlay.type === 'progress'
                    ? 'bg-blue-50 text-blue-600 border border-blue-200/70'
                    : 'bg-indigo-50 text-[#004AAD] border border-blue-200/70'
                }`}
              >
                {activeOverlay.type === 'success' && <CheckCircle2 size={16} />}
                {activeOverlay.type === 'alert' && <AlertCircle size={16} />}
                {activeOverlay.type === 'progress' && <TrendingUp size={16} />}
                {activeOverlay.type === 'pyng' && (
                  <div className="relative h-6 w-6 overflow-hidden rounded-full border border-slate-200">
                    <Image
                      src="/mascot/pyngyn-ai-avatar.png"
                      alt="Pyng Mascot"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Overlay Text Details */}
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-bold text-slate-900 leading-tight">
                    {activeOverlay.title}
                  </span>
                </div>
                <span className="text-[10.5px] font-medium text-slate-600 truncate max-w-[210px] leading-tight mt-0.5">
                  {activeOverlay.subtitle}
                </span>
                <span className="text-[9.5px] font-mono font-semibold text-slate-400 leading-tight mt-0.5">
                  {activeOverlay.tag}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ================================================================= */}
      {/* 2. PRODUCT VIEWPORT CONTAINER (With Camera System Inside)          */}
      {/* ================================================================= */}
      <div
        className="relative w-full overflow-hidden rounded-[14px] border border-slate-200/90 bg-white shadow-2xl"
        style={{
          boxShadow:
            '0 25px 50px -18px rgba(15, 23, 42, 0.16), 0 0 0 1px rgba(226, 232, 240, 0.85)',
        }}
      >
        {/* PRODUCT CAMERA LAYER */}
        <motion.div
          animate={{
            scale: shouldReduceMotion ? 1 : cameraScale,
            x: shouldReduceMotion ? 0 : cameraX,
            y: shouldReduceMotion ? 0 : cameraY,
          }}
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            transformOrigin: '50% 40%',
          }}
          className="relative w-full bg-white will-change-transform"
        >
          {/* ------------------------------------------------------------- */}
          {/* A. PRODUCT TOP APP BAR (Real Pyngyn Navigation & Live Pulse)  */}
          {/* ------------------------------------------------------------- */}
          <div className="flex h-11 items-center justify-between border-b border-slate-200/80 bg-slate-50/90 px-3.5 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#113353] text-[10px] font-bold text-white shadow-xs">
                SA
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[13px] font-bold tracking-tight text-[#113353]">
                  Pyngyn
                </span>
                <span className="text-[11px] font-medium text-slate-400">/</span>
                <span className="text-[12px] font-semibold text-slate-600">
                  Sharma &amp; Associates
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-400">
                <Search size={11} className="text-slate-400" />
                <span className="hidden sm:inline">Search...</span>
                <kbd className="hidden sm:inline-block rounded bg-slate-100 px-1 text-[9px] font-mono font-medium text-slate-500">
                  ⌘K
                </kbd>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-700">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                <span>Live Sync</span>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* B. MY WORK SUB-HEADER & NAVIGATION TABS                       */}
          {/* ------------------------------------------------------------- */}
          <div className="border-b border-slate-200 bg-white px-3.5 pt-2.5">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-[15px] font-bold tracking-tight text-slate-900">
                  My Work
                </h2>
                <motion.span
                  key={tasks.length}
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  className="rounded-full bg-slate-100 px-2 py-0.5 text-[10.5px] font-bold text-slate-600"
                >
                  {tasks.length} of 48 Tasks
                </motion.span>
              </div>

              {/* View Switcher: List | Board */}
              <div className="flex items-center rounded-md border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                <span className="flex items-center gap-1 rounded bg-white px-2 py-0.5 font-bold text-[#113353] shadow-2xs">
                  <CheckSquare size={11} />
                  <span>List</span>
                </span>
                <span className="flex items-center gap-1 px-2 py-0.5 font-medium text-slate-500 hover:text-slate-700">
                  <Layers size={11} />
                  <span>Board</span>
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-4 text-[12px] font-semibold text-slate-500">
              <div className="flex items-center gap-1.5 border-b-2 border-[#004AAD] pb-2 text-[#004AAD]">
                <CheckSquare size={12} />
                <span>My Tasks</span>
                <span className="rounded-full bg-blue-50 px-1.5 text-[10px] font-bold text-blue-700">
                  48
                </span>
              </div>
              <div className="flex items-center gap-1.5 pb-2 hover:text-slate-800">
                <Folder size={12} />
                <span>My Engagements</span>
                <span className="rounded-full bg-slate-100 px-1.5 text-[10px] font-semibold text-slate-500">
                  32
                </span>
              </div>
              <div className="flex items-center gap-1.5 pb-2 hover:text-slate-800">
                <Clock size={12} />
                <span>My Timesheet</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 pb-2 hover:text-slate-800">
                <Users size={12} />
                <span>Shared with Me</span>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* C. TOOLBAR CONTROLS                                          */}
          {/* ------------------------------------------------------------- */}
          <div className="flex items-center justify-between border-b border-slate-200/90 bg-slate-50/70 px-3.5 py-1.5 text-[11px]">
            <div className="flex items-center gap-1.5 flex-wrap">
              <div className="flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-0.5 font-semibold text-slate-700 shadow-3xs">
                <Filter size={10} className="text-slate-400" />
                <span>Filter</span>
                <ChevronDown size={10} className="text-slate-400" />
              </div>
              <div className="flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-0.5 font-semibold text-slate-700 shadow-3xs">
                <ArrowUpDown size={10} className="text-slate-400" />
                <span>Sort</span>
              </div>
              <div className="flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-0.5 font-semibold text-slate-700 shadow-3xs">
                <span>Group by: Due Date</span>
                <ChevronDown size={10} className="text-slate-400" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center -space-x-1">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#004AAD] text-[8px] font-bold text-white ring-1 ring-white">
                  RM
                </span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#7E22CE] text-[8px] font-bold text-white ring-1 ring-white">
                  PS
                </span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#D97706] text-[8px] font-bold text-white ring-1 ring-white">
                  NJ
                </span>
              </div>
              <span className="rounded border border-slate-200 bg-white px-2 py-0.5 text-[10.5px] font-bold text-[#113353] shadow-3xs">
                Save View
              </span>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* D. REAL TASK TABLE (With individually animatable rows)        */}
          {/* ------------------------------------------------------------- */}
          <div className="relative bg-white">
            {/* Table Column Headers */}
            <div className="grid grid-cols-[1fr_98px_72px_64px_68px_56px] items-center gap-1.5 border-b border-slate-200 bg-slate-50/90 px-3.5 py-1.5 text-[9.5px] font-bold tracking-wider text-slate-400 uppercase">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-3 w-3 rounded border-slate-300 text-blue-600"
                  readOnly
                />
                <span>NAME</span>
              </div>
              <span>STATUS</span>
              <span>EFFORT</span>
              <span>ASSIGNEES</span>
              <span>PRIORITY</span>
              <span className="text-right">DUE</span>
            </div>

            {/* Section Header: Assigned To Me */}
            <div className="flex items-center gap-1.5 bg-slate-100/70 px-3.5 py-1 text-[11px] font-bold text-slate-700 border-b border-slate-200/60">
              <ChevronDown size={12} className="text-slate-500" />
              <span>Assigned To Me</span>
              <span className="rounded-full bg-slate-200/80 px-1.5 text-[9.5px] text-slate-600">
                {tasks.length}
              </span>
            </div>

            {/* TASK ROWS CONTAINER */}
            <div className="relative divide-y divide-slate-100 min-h-[265px]">
              <AnimatePresence initial={false}>
                {tasks.map((task, idx) => {
                  const isTargetTask2 = task.id === 'task-2';
                  const isTargetTask3 = task.id === 'task-3';

                  // Dynamic row highlight when camera focuses on it
                  const isHighlighted =
                    (isTargetTask2 &&
                      (stage === 'status_focus' ||
                        stage === 'status_dropdown' ||
                        stage === 'status_completed')) ||
                    (isTargetTask3 &&
                      (stage === 'priority_focus' ||
                        stage === 'priority_updated' ||
                        stage === 'effort_focus' ||
                        stage === 'effort_updated'));

                  const progressPct = Math.round(
                    (task.effortSpent / task.effortTotal) * 100
                  );

                  return (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      transition={{
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{
                        zIndex: isStatusDropdownOpen && isTargetTask2
                          ? 60
                          : isPriorityDropdownOpen && isTargetTask3
                          ? 60
                          : 20 - idx,
                      }}
                      className={`group relative grid grid-cols-[1fr_98px_72px_64px_68px_56px] items-center gap-1.5 px-3.5 py-2 text-[11.5px] transition-colors ${
                        isHighlighted
                          ? 'bg-blue-50/40 ring-1 ring-blue-300/80 shadow-xs'
                          : 'hover:bg-slate-50/80'
                      }`}
                    >
                      {/* 1. Name & Client */}
                      <div className="flex items-center gap-2 pr-2 min-w-0">
                        <input
                          type="checkbox"
                          checked={task.status === 'Filed / Completed'}
                          className="h-3 w-3 rounded border-slate-300 text-emerald-600 cursor-pointer"
                          readOnly
                        />
                        <div className="truncate">
                          <span
                            className={`font-semibold transition-colors truncate block text-[11.5px] ${
                              task.status === 'Filed / Completed'
                                ? 'text-slate-500 line-through'
                                : 'text-slate-900 group-hover:text-blue-700'
                            }`}
                          >
                            {task.name}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate block">
                            {task.client}
                          </span>
                        </div>
                      </div>

                      {/* 2. Status Pill (Interactive focal point) */}
                      <div className="relative">
                        <motion.div
                          animate={
                            isTargetTask2 && stage === 'status_focus'
                              ? { scale: [1, 1.1, 1] }
                              : {}
                          }
                          transition={{ duration: 0.4 }}
                          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold border transition-colors shadow-3xs cursor-pointer ${
                            task.statusTone === 'emerald'
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                              : task.statusTone === 'blue'
                              ? 'border-blue-200 bg-blue-50 text-blue-700'
                              : task.statusTone === 'purple'
                              ? 'border-purple-200 bg-purple-50 text-purple-700'
                              : task.statusTone === 'amber'
                              ? 'border-amber-200 bg-amber-50 text-amber-700'
                              : task.statusTone === 'red'
                              ? 'border-red-200 bg-red-50 text-red-700'
                              : 'border-slate-200 bg-slate-50 text-slate-600'
                          } ${
                            isTargetTask2 && (stage === 'status_focus' || stage === 'status_dropdown')
                              ? 'ring-2 ring-blue-400/80'
                              : ''
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              task.statusTone === 'emerald'
                                ? 'bg-emerald-500'
                                : task.statusTone === 'blue'
                                ? 'bg-blue-500'
                                : task.statusTone === 'purple'
                                ? 'bg-purple-500'
                                : task.statusTone === 'amber'
                                ? 'bg-amber-500'
                                : task.statusTone === 'red'
                                ? 'bg-red-500'
                                : 'bg-slate-400'
                            }`}
                          />
                          <span>{task.status}</span>
                        </motion.div>

                        {/* REAL PYNGYN STATUS DROPDOWN (Anchored on Task 2) */}
                        <AnimatePresence>
                          {isTargetTask2 && isStatusDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 4, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 2, scale: 0.96 }}
                              transition={{ duration: 0.2 }}
                              className="absolute left-0 top-full mt-1.5 z-[999] w-[174px] rounded-lg border border-slate-200 bg-white p-1 text-[11px] shadow-2xl ring-1 ring-slate-900/10 font-sans"
                              style={{
                                boxShadow:
                                  '0 16px 36px -6px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(226, 232, 240, 1)',
                              }}
                            >
                              <div className="px-2 py-1 text-[9.5px] font-bold tracking-wider text-slate-400 uppercase">
                                CHANGE STATUS
                              </div>

                              <div className="flex items-center justify-between rounded px-2 py-1 text-slate-600 hover:bg-slate-50">
                                <span className="flex items-center gap-1.5">
                                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                                  <span>To Do</span>
                                </span>
                              </div>

                              <div className="flex items-center justify-between rounded px-2 py-1 text-slate-600 hover:bg-slate-50">
                                <span className="flex items-center gap-1.5">
                                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                  <span>In Progress</span>
                                </span>
                              </div>

                              <div className="flex items-center justify-between rounded px-2 py-1 text-slate-600 hover:bg-slate-50">
                                <span className="flex items-center gap-1.5">
                                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                                  <span>Internal Review</span>
                                </span>
                              </div>

                              <div className="flex items-center justify-between rounded px-2 py-1 text-slate-600 hover:bg-slate-50">
                                <span className="flex items-center gap-1.5">
                                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                  <span>Awaiting Decision</span>
                                </span>
                              </div>

                              {/* Target Selection: Filed / Completed */}
                              <div className="flex items-center justify-between rounded px-2 py-1 bg-emerald-50 text-emerald-700 font-bold transition-colors">
                                <span className="flex items-center gap-1.5">
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                  <span>Filed / Completed</span>
                                </span>
                                <Check size={12} className="text-emerald-600" />
                              </div>

                              <div className="flex items-center justify-between rounded px-2 py-1 text-slate-600 hover:bg-slate-50">
                                <span className="flex items-center gap-1.5">
                                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                  <span>Blocked</span>
                                </span>
                              </div>

                              <div className="my-1 border-t border-slate-100" />
                              <div className="flex items-center gap-1.5 rounded px-2 py-1 text-[10px] text-slate-500 hover:bg-slate-50 cursor-pointer">
                                <Settings size={10} />
                                <span>Edit Workflow</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* 3. Effort Progress Bar */}
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-[10px] font-semibold text-slate-600">
                          {task.effortSpent}/{task.effortTotal}h
                        </span>
                        <div className="h-1.5 w-12 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                          <motion.div
                            animate={{ width: `${progressPct}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className={`h-full rounded-full ${
                              task.status === 'Filed / Completed'
                                ? 'bg-emerald-500'
                                : isTargetTask3 && (stage === 'effort_focus' || stage === 'effort_updated')
                                ? 'bg-emerald-500'
                                : 'bg-blue-500'
                            }`}
                          />
                        </div>
                      </div>

                      {/* 4. Assignee Avatar */}
                      <div className="flex items-center">
                        <span
                          style={{ backgroundColor: task.assigneeBg }}
                          className="flex h-5 w-5 items-center justify-center rounded-full text-[8.5px] font-bold text-white ring-1 ring-white shadow-3xs"
                        >
                          {task.assigneeInitials}
                        </span>
                      </div>

                      {/* 5. Priority (Interactive focal point) */}
                      <div className="relative">
                        <motion.div
                          animate={
                            isTargetTask3 && stage === 'priority_focus'
                              ? { scale: [1, 1.15, 1] }
                              : {}
                          }
                          transition={{ duration: 0.4 }}
                          className={`flex items-center gap-1 cursor-pointer ${
                            isTargetTask3 && isPriorityDropdownOpen
                              ? 'ring-2 ring-red-400/80 rounded px-1'
                              : ''
                          }`}
                        >
                          <Flag
                            size={10}
                            className={
                              task.priorityTone === 'red'
                                ? 'text-red-500 fill-red-500'
                                : task.priorityTone === 'amber'
                                ? 'text-amber-500 fill-amber-500'
                                : 'text-blue-500 fill-blue-500'
                            }
                          />
                          <span
                            className={`font-semibold text-[10.5px] ${
                              task.priorityTone === 'red'
                                ? 'text-red-700'
                                : task.priorityTone === 'amber'
                                ? 'text-amber-700'
                                : 'text-slate-600'
                            }`}
                          >
                            {task.priority}
                          </span>
                        </motion.div>

                        {/* REAL PYNGYN PRIORITY DROPDOWN (Anchored on Task 3) */}
                        <AnimatePresence>
                          {isTargetTask3 && isPriorityDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 4, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 2, scale: 0.96 }}
                              transition={{ duration: 0.2 }}
                              className="absolute left-0 top-full mt-1.5 z-[999] w-[140px] rounded-lg border border-slate-200 bg-white p-1 text-[11px] shadow-2xl ring-1 ring-slate-900/10 font-sans"
                              style={{
                                boxShadow:
                                  '0 16px 36px -6px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(226, 232, 240, 1)',
                              }}
                            >
                              <div className="px-2 py-1 text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                                PRIORITY
                              </div>

                              {/* Target Selection: Urgent */}
                              <div className="flex items-center justify-between rounded px-2 py-1 bg-red-50 text-red-700 font-bold">
                                <span className="flex items-center gap-1.5">
                                  <Flag size={10} className="text-red-500 fill-red-500" />
                                  <span>Urgent</span>
                                </span>
                                <Check size={11} className="text-red-600" />
                              </div>

                              <div className="flex items-center justify-between rounded px-2 py-1 text-slate-600 hover:bg-slate-50">
                                <span className="flex items-center gap-1.5">
                                  <Flag size={10} className="text-amber-500 fill-amber-500" />
                                  <span>High</span>
                                </span>
                              </div>

                              <div className="flex items-center justify-between rounded px-2 py-1 text-slate-600 hover:bg-slate-50">
                                <span className="flex items-center gap-1.5">
                                  <Flag size={10} className="text-blue-500 fill-blue-500" />
                                  <span>Medium</span>
                                </span>
                              </div>

                              <div className="flex items-center justify-between rounded px-2 py-1 text-slate-600 hover:bg-slate-50">
                                <span className="flex items-center gap-1.5">
                                  <Flag size={10} className="text-slate-400 fill-slate-400" />
                                  <span>Low</span>
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* 6. Due Date */}
                      <div className="text-right">
                        <span
                          className={`font-mono text-[10px] font-semibold ${
                            task.isOverdue
                              ? 'text-red-600 bg-red-50 px-1 py-0.5 rounded'
                              : 'text-slate-500'
                          }`}
                        >
                          {task.dueDate}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* E. FOOTER: Active Practice Timer Bar                          */}
          {/* ------------------------------------------------------------- */}
          <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/90 px-3.5 py-1.5 text-[11px] text-slate-600 rounded-b-[14px]">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#113353] text-white shadow-3xs">
                <Play size={9} className="ml-0.5" />
              </div>
              <span className="font-mono text-[11px] font-semibold text-slate-800">
                00:04:18
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-[10.5px] text-slate-500 truncate max-w-[240px]">
                Task: [Oswal Exports] GSTR-1 sales ledger...
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[10.5px] font-medium text-slate-400">
              <span>Shortcuts (?)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
