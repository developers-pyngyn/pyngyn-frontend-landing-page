'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Check,
  CheckCircle2,
  ChevronDown,
  Filter,
  Flag,
  List,
  Play,
  Search,
  SlidersHorizontal,
  Users,
  Zap,
  Building2,
  ShieldCheck,
  ExternalLink,
  User,
  BarChart3,
  RefreshCw,
  Folder,
  Calendar,
  CheckSquare,
  MoreHorizontal,
} from 'lucide-react';
import { PyngynCelebrationOverlay } from './PyngynCelebrationOverlay';

// ============================================================================
// Types & Central Task Model
// ============================================================================
export interface HeroTask {
  id: string;
  name: string;
  client: string;
  status: 'In Progress' | 'Internal Review' | 'To Do' | 'Filed / Completed';
  effortSpent: number;
  effortTotal: number;
  assigneeInitials: string;
  assigneeBg: string;
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  dueDate: string;
  isOverdue?: boolean;
}

const BASE_TASKS: HeroTask[] = [
  {
    id: 'task-1',
    name: 'GSTR-1 sales ledger matching & E-way bill validation',
    client: 'Oswal Exports',
    status: 'In Progress',
    effortSpent: 3.5,
    effortTotal: 6,
    assigneeInitials: 'RM',
    assigneeBg: '#004AAD',
    priority: 'High',
    dueDate: '28 Aug',
  },
  {
    id: 'task-2',
    name: 'GSTR-3B Monthly Return Filing (August 2026)',
    client: 'Oswal Exports',
    status: 'In Progress',
    effortSpent: 4,
    effortTotal: 5,
    assigneeInitials: 'PS',
    assigneeBg: '#7E22CE',
    priority: 'Urgent',
    dueDate: '20 Sep',
  },
  {
    id: 'task-3',
    name: 'Match GSTR-2B - resolve ₹3.2L ITC mismatch',
    client: 'Horizon Exports',
    status: 'To Do',
    effortSpent: 2.5,
    effortTotal: 4,
    assigneeInitials: 'NJ',
    assigneeBg: '#D97706',
    priority: 'High',
    dueDate: 'Tomorrow',
    isOverdue: true,
  },
];

type ActivePerspective = 'my_work' | 'workload' | 'dashboard' | 'client_portal';

const PERSPECTIVE_OVERLAYS: Record<
  ActivePerspective,
  {
    title: string;
    subtitle: string;
    statusText: string;
    avatarSrc?: string;
    avatarInitials?: string;
    avatarBg?: string;
    mascotSrc: string;
    showCursor: boolean;
    cursorOffset?: { x: number; y: number };
    xOffset: number;
    yOffset: number;
  }
> = {
  my_work: {
    title: 'GSTR-3B Auto-Filed to GSTN',
    subtitle: 'Oswal Exports · ARN: AA270826019482M',
    statusText: 'Filed',
    avatarSrc: '/team/vivek-pandey.png',
    mascotSrc: '/mascot/pyngyn-insights.png',
    showCursor: true,
    cursorOffset: { x: 220, y: 14 },
    xOffset: 0,
    yOffset: 0,
  },
  workload: {
    title: 'Team Capacity Rebalanced',
    subtitle: 'Nikhil Jain & Priya Sharma · Optimal 49%',
    statusText: 'Balanced',
    avatarSrc: '/team/vivek-pandey.png',
    mascotSrc: '/mascot/pyng-hierarchy.png',
    showCursor: false,
    xOffset: 12,
    yOffset: -8,
  },
  dashboard: {
    title: '100% Statutory Compliance',
    subtitle: 'All 35 Filings Verified · 0 Penalties',
    statusText: 'Compliant',
    avatarSrc: '/team/vivek-pandey.png',
    mascotSrc: '/mascot/pyng-audit-megaphone.png',
    showCursor: false,
    xOffset: -8,
    yOffset: 6,
  },
  client_portal: {
    title: 'Client Portal Synced & Verified',
    subtitle: 'Oswal Exports · Sunita Oswal (Director)',
    statusText: 'Verified',
    avatarSrc: '/team/vivek-pandey.png',
    mascotSrc: '/mascot/pyng-comms.png',
    showCursor: false,
    xOffset: 6,
    yOffset: -4,
  },
};

export function PyngynHeroMyWork({
  className = '',
  autoPlay = true,
}: {
  className?: string;
  autoPlay?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);

  // Master Loop State: deterministic 16s connected multi-workflow loop
  const [loopCount, setLoopCount] = useState(0);
  const [activePerspective, setActivePerspective] = useState<ActivePerspective>('my_work');

  // Interactive Product States
  const [tasks, setTasks] = useState<HeroTask[]>(BASE_TASKS);
  const [gstrProgress, setGstrProgress] = useState(80);
  const [gstrStatus, setGstrStatus] = useState<'In Progress' | 'Internal Review' | 'Filed / Completed'>('In Progress');
  const [isGstrHovered, setIsGstrHovered] = useState(false);

  // Workload State
  const [workloadCapacity, setWorkloadCapacity] = useState(47);
  const [activeDeliverables, setActiveDeliverables] = useState(23);
  const [nikhilHours, setNikhilHours] = useState('42 / 35h');

  // Dashboard State
  const [complianceScore, setComplianceScore] = useState(84);
  const [statutoryFilingRatio, setStatutoryFilingRatio] = useState('34/40');

  // Client Portal State
  const [clientGstProgress, setClientGstProgress] = useState(78);

  // Camera Zoom State
  const [cameraZoom, setCameraZoom] = useState(1.0);
  const [cameraOrigin, setCameraOrigin] = useState('54% 45%');

  // Animated Mouse Cursor (High-precision coordinates: exact GSTR-3B status badge at x: 428, y: 247)
  const [cursorPos, setCursorPos] = useState({
    x: 520,
    y: 120,
    visible: false,
    clicked: false,
  });

  // Contextual Overlay Card & Automation Indicator
  const [showStatusOverlay, setShowStatusOverlay] = useState(false);
  const [showAutomationStrip, setShowAutomationStrip] = useState(false);

  // Deterministic Crisp Multi-Workflow Loop across all 4 Connected Perspectives (~16s cycle)
  useEffect(() => {
    if (!autoPlay || shouldReduceMotion) {
      setActivePerspective('my_work');
      setTasks(BASE_TASKS);
      setGstrProgress(100);
      setGstrStatus('Filed / Completed');
      setWorkloadCapacity(49);
      setActiveDeliverables(22);
      setCameraZoom(1.0);
      return;
    }

    const timers: NodeJS.Timeout[] = [];

    // ========================================================================
    // WORKFLOW 1: MY WORK & TASK AUTO-FILING (0.0s - 4.2s)
    // Starts directly focused on action rather than showing an idle full list
    // ========================================================================
    setActivePerspective('my_work');
    setTasks(BASE_TASKS);
    setGstrProgress(80);
    setGstrStatus('In Progress');
    setIsGstrHovered(false);
    setWorkloadCapacity(47);
    setActiveDeliverables(23);
    setNikhilHours('42 / 35h');
    setComplianceScore(84);
    setStatutoryFilingRatio('34/40');
    setClientGstProgress(78);
    setCameraZoom(1.0);
    setCameraOrigin('56% 50%');
    setCursorPos({ x: 500, y: 160, visible: false, clicked: false });
    setShowStatusOverlay(false);
    setShowAutomationStrip(false);

    if (typeof window !== 'undefined' && window.location.search.includes('hero_burst=1')) {
      setGstrStatus('Filed / Completed');
      setShowStatusOverlay(true);
      return;
    }

    // T = 0.35s: Cursor enters smoothly, targeting EXACT GSTR-3B Status Badge (x: 428, y: 247)
    timers.push(
      setTimeout(() => {
        setCursorPos({ x: 428, y: 247, visible: true, clicked: false });
      }, 350)
    );

    // T = 0.75s: Cursor hovers with visible feedback
    timers.push(
      setTimeout(() => {
        setIsGstrHovered(true);
      }, 750)
    );

    // T = 1.1s: Cursor clicks GSTR-3B Status with clear press scale and ripple
    timers.push(
      setTimeout(() => {
        setCursorPos((prev) => ({ ...prev, clicked: true }));
        setTimeout(() => setCursorPos((prev) => ({ ...prev, clicked: false })), 180);
      }, 1100)
    );

    // T = 1.35s: Progress bar rapidly fills 80% -> 95% -> 100%
    timers.push(
      setTimeout(() => {
        setGstrProgress(95);
        setTimeout(() => setGstrProgress(100), 200);
      }, 1350)
    );

    // T = 1.75s: In-row status completes to Filed / Completed, Checkbox ticks [✓] & Celebration overlay bursts
    timers.push(
      setTimeout(() => {
        setGstrStatus('Filed / Completed');
        setIsGstrHovered(false);
        setCursorPos((prev) => ({ ...prev, visible: false }));
        setShowStatusOverlay(true);
      }, 1750)
    );

    // T = 2.6s: Connected automation strip reveals data sync
    timers.push(
      setTimeout(() => {
        setShowAutomationStrip(true);
      }, 2600)
    );

    // ========================================================================
    // WORKFLOW 2: WORKLOAD & RESOURCE REBALANCE (4.2s - 8.0s)
    // Smooth transition with gliding celebration overlay & rebalance metrics
    // ========================================================================
    timers.push(
      setTimeout(() => {
        setShowAutomationStrip(false);
        setActivePerspective('workload');
        setWorkloadCapacity(49);
        setActiveDeliverables(22);
        setNikhilHours('35 / 35h');
        setCameraZoom(1.0);
        setCameraOrigin('50% 50%');
        setShowStatusOverlay(true);
      }, 4200)
    );

    // ========================================================================
    // WORKFLOW 3: STATUTORY AUDIT & TAX DASHBOARD (8.0s - 11.8s)
    // Smooth transition with gliding celebration overlay & compliance score
    // ========================================================================
    timers.push(
      setTimeout(() => {
        setActivePerspective('dashboard');
        setComplianceScore(86);
        setStatutoryFilingRatio('35/40');
        setCameraZoom(1.0);
        setShowStatusOverlay(true);
      }, 8000)
    );

    // ========================================================================
    // WORKFLOW 4: OSWAL EXPORTS CLIENTSPACE PORTAL (11.8s - 15.6s)
    // Authentic Oswal ClientSpace with gliding verification celebration overlay
    // ========================================================================
    timers.push(
      setTimeout(() => {
        setActivePerspective('client_portal');
        setClientGstProgress(100);
        setCameraZoom(1.0);
        setShowStatusOverlay(true);
      }, 11800)
    );

    // ========================================================================
    // SEAMLESS SETTLE & REPEAT (15.5s - 16.0s)
    // ========================================================================
    timers.push(
      setTimeout(() => {
        setShowStatusOverlay(false);
      }, 15500)
    );

    timers.push(
      setTimeout(() => {
        setLoopCount((prev) => prev + 1);
      }, 16000)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [loopCount, autoPlay, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      data-workflow-phase={activePerspective}
      data-loop-count={loopCount}
      className={`relative w-full flex items-start justify-center lg:justify-end select-none font-sans text-slate-800 ${className}`}
    >
      {/* Outer Scaled Layout Box (Pure CSS Container Query scaling: zero layout shift, zero hydration jump) */}
      <div
        style={{
          containerType: 'inline-size',
        }}
        className="relative w-full max-w-[780px] aspect-[780/520] flex-none overflow-visible"
      >
        {/* Unscaled 780x520 Canvas Container - Immediately scaled by CSS on first paint */}
        <div
          style={{
            width: '780px',
            height: '520px',
            transformOrigin: 'top left',
            transform: 'scale(min(1, max(0.38, calc(100cqw / 780px))))',
          }}
          className="relative flex-none overflow-visible"
        >
          {/* =============================================================== */}
          {/* =============================================================== */}
          {/* CELEBRATION CARD OVERLAY & MAGICAL CONFETTI ANIMATION           */}
          {/* Continuous floating overlay that smoothly glides and changes   */}
          {/* =============================================================== */}
          <AnimatePresence>
            {showStatusOverlay && (
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 16 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: PERSPECTIVE_OVERLAYS[activePerspective].xOffset,
                  y: PERSPECTIVE_OVERLAYS[activePerspective].yOffset,
                }}
                exit={{ opacity: 0, scale: 0.9, y: -12 }}
                transition={{
                  x: { type: 'spring', damping: 24, stiffness: 140 },
                  y: { type: 'spring', damping: 24, stiffness: 140 },
                  scale: { type: 'spring', damping: 22, stiffness: 240 },
                  opacity: { duration: 0.35 },
                }}
                className="absolute z-50 pointer-events-none drop-shadow-2xl"
                style={{
                  top: '-24px',
                  right: '-24px',
                }}
              >
                <PyngynCelebrationOverlay
                  title={PERSPECTIVE_OVERLAYS[activePerspective].title}
                  subtitle={PERSPECTIVE_OVERLAYS[activePerspective].subtitle}
                  statusText={PERSPECTIVE_OVERLAYS[activePerspective].statusText}
                  avatarSrc={PERSPECTIVE_OVERLAYS[activePerspective].avatarSrc}
                  avatarInitials={PERSPECTIVE_OVERLAYS[activePerspective].avatarInitials}
                  avatarBg={PERSPECTIVE_OVERLAYS[activePerspective].avatarBg}
                  mascotSrc={PERSPECTIVE_OVERLAYS[activePerspective].mascotSrc}
                  showCursor={PERSPECTIVE_OVERLAYS[activePerspective].showCursor}
                  cursorOffset={PERSPECTIVE_OVERLAYS[activePerspective].cursorOffset}
                  floating={true}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* =============================================================== */}
          {/* HIGH-PRECISION ANIMATED MOUSE CURSOR                             */}
          {/* =============================================================== */}
          <motion.div
            animate={{
              x: cursorPos.x,
              y: cursorPos.y,
              opacity: cursorPos.visible ? 1 : 0,
              scale: cursorPos.clicked ? 0.82 : 1,
            }}
            transition={{
              duration: 0.36,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="pointer-events-none absolute z-50 flex items-center justify-center"
            style={{ width: '24px', height: '24px' }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className="drop-shadow-lg"
            >
              <path
                d="M3 3L10.5 21L14 13.5L21.5 10L3 3Z"
                fill="#004AAD"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
            </svg>
            {cursorPos.clicked && (
              <>
                <motion.div
                  initial={{ scale: 0.4, opacity: 1 }}
                  animate={{ scale: 2.6, opacity: 0 }}
                  transition={{ duration: 0.32 }}
                  className="absolute -inset-1.5 rounded-full border-2 border-blue-500"
                />
                <motion.div
                  initial={{ scale: 0.2, opacity: 0.8 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute -inset-1 rounded-full bg-blue-400/40"
                />
              </>
            )}
          </motion.div>

          {/* =============================================================== */}
          {/* REAL PYNGYN PRODUCT SURFACE (780x520 Desktop Canvas)              */}
          {/* =============================================================== */}
          <div className="relative w-full h-[520px] overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl">
            {/* Controlled Camera Zoom Container */}
            <motion.div
              animate={{
                scale: cameraZoom,
                transformOrigin: cameraOrigin,
              }}
              transition={{
                duration: 0.52,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
              }}
              className="w-full h-full flex flex-col bg-white"
            >
              {/* =========================================================== */}
              {/* PERSPECTIVE SWITCHER CONTAINER                              */}
              {/* =========================================================== */}
              <AnimatePresence mode="wait">
                {/* --------------------------------------------------------- */}
                {/* PERSPECTIVE 1: MY WORK (Execution & Timesheets)           */}
                {/* --------------------------------------------------------- */}
                {activePerspective === 'my_work' && (
                  <motion.div
                    key="view-my-work"
                    initial={{ opacity: 0.95 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col w-full h-full bg-white relative overflow-hidden"
                  >
                    {/* 1. App Top Header */}
                    <div className="flex items-center justify-between border-b border-slate-200/80 bg-white px-4 py-2 text-[12px]">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#113353] text-[10px] font-bold text-white shadow-3xs">
                          SA
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 tracking-tight">Pyngyn</span>
                          <span className="text-slate-300">/</span>
                          <span className="font-medium text-slate-600 truncate max-w-[170px]">
                            Sharma &amp; Associates
                          </span>
                          <span className="text-slate-300 hidden sm:inline">/</span>
                          <span className="text-blue-700 font-semibold text-[11px] hidden sm:inline">
                            My Work
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className="hidden sm:flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50/80 px-2.5 py-1 text-[11px] text-slate-400">
                          <Search size={11} />
                          <span>Search...</span>
                          <kbd className="rounded border border-slate-200 bg-white px-1 font-mono text-[9px] text-slate-500">
                            ⌘K
                          </kbd>
                        </div>

                        <div className="flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/60 px-2.5 py-0.5 text-[10.5px] font-semibold text-[#004AAD]">
                          <span className="font-mono">{workloadCapacity}%</span>
                          <span className="text-[9.5px] text-blue-600 font-medium">Capacity</span>
                        </div>

                        <div className="flex items-center gap-1.5 rounded-full border border-emerald-200/90 bg-emerald-50/70 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Live Sync</span>
                        </div>
                      </div>
                    </div>

                    {/* 2. My Work View Head & Tabs */}
                    <div className="border-b border-slate-200/80 bg-white px-4 pt-2.5 pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h2 className="text-[14px] font-bold text-slate-900 tracking-tight">
                            My Work
                          </h2>
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                            {tasks.length} of 48 Tasks
                          </span>
                        </div>

                        <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50/80 p-0.5 text-[10.5px] font-medium text-slate-600">
                          <button className="flex items-center gap-1 rounded bg-white px-2 py-0.5 text-[#004AAD] shadow-3xs font-semibold">
                            <List size={11} />
                            <span>List</span>
                          </button>
                          <button className="flex items-center gap-1 px-2 py-0.5 text-slate-500 hover:text-slate-800">
                            <span>Board</span>
                          </button>
                        </div>
                      </div>

                      {/* Content Tabs */}
                      <div className="mt-2 flex items-center gap-5 border-b border-slate-100 text-[11px] font-medium text-slate-500">
                        <div className="relative pb-1.5 font-bold text-[#004AAD] flex items-center gap-1.5">
                          <span>My Tasks</span>
                          <span className="rounded-full bg-blue-100/80 px-1.5 py-0.2 text-[9px] font-bold text-[#004AAD]">
                            48
                          </span>
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#004AAD] rounded-full" />
                        </div>
                        <div className="pb-1.5 hover:text-slate-800 cursor-pointer flex items-center gap-1">
                          <span>My Engagements</span>
                          <span className="text-[9.5px] text-slate-400">32</span>
                        </div>
                        <div className="pb-1.5 hover:text-slate-800 cursor-pointer hidden sm:block">
                          <span>My Timesheet</span>
                        </div>
                        <div className="pb-1.5 hover:text-slate-800 cursor-pointer hidden md:block">
                          <span>Shared with Me</span>
                        </div>
                      </div>
                    </div>

                    {/* 3. Toolbar */}
                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/60 px-4 py-1 text-[10.5px] text-slate-600">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-0.5 font-medium hover:bg-slate-50">
                          <Filter size={10} />
                          <span>Filter</span>
                        </div>
                        <div className="flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-0.5 font-medium hover:bg-slate-50">
                          <SlidersHorizontal size={10} />
                          <span>Sort</span>
                        </div>
                        <div className="flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-0.5 font-medium hover:bg-slate-50">
                          <span>Group by: Due Date</span>
                          <ChevronDown size={10} />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-1.5">
                          <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#004AAD] text-[8px] font-bold text-white ring-1 ring-white">
                            RM
                          </span>
                          <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#7E22CE] text-[8px] font-bold text-white ring-1 ring-white">
                            PS
                          </span>
                          <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#D97706] text-[8px] font-bold text-white ring-1 ring-white">
                            NJ
                          </span>
                        </div>
                        <span className="rounded border border-slate-200 bg-white px-2 py-0.5 text-[9.5px] font-semibold text-slate-700 shadow-3xs">
                          Save View
                        </span>
                      </div>
                    </div>

                    {/* 4. Table Header: STRICT CSS GRID */}
                    <div
                      className="grid items-center gap-2.5 border-b border-slate-100 bg-slate-50/80 px-4 py-1 text-[9px] font-bold tracking-wider text-slate-400 uppercase"
                      style={{
                        gridTemplateColumns: 'minmax(0, 1fr) 108px 72px 46px 64px 58px',
                      }}
                    >
                      <span className="truncate min-w-0">NAME</span>
                      <span className="truncate min-w-0">STATUS</span>
                      <span className="truncate min-w-0">EFFORT</span>
                      <span className="truncate min-w-0">ASSIGNEE</span>
                      <span className="truncate min-w-0">PRIORITY</span>
                      <span className="text-right truncate min-w-0">DUE</span>
                    </div>

                    {/* 5. Collapsible Section: Assigned To Me */}
                    <div className="flex items-center gap-1.5 bg-slate-50/40 px-4 py-1 border-b border-slate-100/70 text-[10px] font-bold text-slate-700">
                      <ChevronDown size={10} className="text-slate-400" />
                      <span>Assigned To Me</span>
                      <span className="rounded-full bg-slate-200/80 px-1.5 py-0.2 text-[8.5px] font-bold text-slate-600">
                        {tasks.length}
                      </span>
                    </div>

                    {/* 6. Task Rows */}
                    <div className="flex-1 overflow-hidden divide-y divide-slate-100">
                      <AnimatePresence initial={false}>
                        {tasks.map((task) => {
                          const isGstr3B = task.id === 'task-2';
                          const currentStatus = isGstr3B ? gstrStatus : task.status;
                          const currentProgress = isGstr3B
                            ? gstrProgress
                            : Math.round((task.effortSpent / task.effortTotal) * 100);

                          return (
                            <motion.div
                              key={task.id}
                              initial={{ opacity: 0, y: 6, scale: 0.99 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                              className={`grid items-center gap-2.5 px-4 py-2 text-[11px] transition-colors ${
                                isGstr3B && (isGstrHovered || currentStatus !== 'In Progress')
                                  ? 'bg-blue-50/70 ring-1 ring-blue-300/80'
                                  : 'hover:bg-slate-50/80'
                              }`}
                              style={{
                                gridTemplateColumns: 'minmax(0, 1fr) 108px 72px 46px 64px 58px',
                              }}
                            >
                              {/* CELL 1: Name & Client */}
                              <div className="flex items-center gap-2 min-w-0 overflow-hidden pr-2">
                                <input
                                  type="checkbox"
                                  checked={currentStatus === 'Filed / Completed'}
                                  className="h-3 w-3 flex-none rounded border-slate-300 text-emerald-600 cursor-pointer"
                                  readOnly
                                />
                                <div className="min-w-0 flex-1 overflow-hidden">
                                  <span
                                    className={`font-semibold block truncate text-[11px] ${
                                      currentStatus === 'Filed / Completed'
                                        ? 'text-slate-500 line-through'
                                        : 'text-slate-900'
                                    }`}
                                  >
                                    {task.name}
                                  </span>
                                  <span className="text-[9.5px] text-slate-400 block truncate">
                                    {task.client}
                                  </span>
                                </div>
                              </div>

                              {/* CELL 2: Status (Direct Click Target with Interactive Hover) */}
                              <div className="min-w-0 overflow-hidden">
                                <motion.span
                                  key={currentStatus}
                                  initial={{ scale: 0.94, opacity: 0.8 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ duration: 0.22 }}
                                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold border transition-all max-w-full truncate ${
                                    isGstr3B && isGstrHovered
                                      ? 'ring-2 ring-blue-500/80 shadow-xs'
                                      : ''
                                  } ${
                                    currentStatus === 'Filed / Completed'
                                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                      : currentStatus === 'Internal Review'
                                      ? 'border-purple-200 bg-purple-50 text-purple-700'
                                      : currentStatus === 'To Do'
                                      ? 'border-slate-200 bg-slate-50 text-slate-600'
                                      : 'border-blue-200 bg-blue-50 text-blue-700'
                                  }`}
                                >
                                  <span
                                    className={`h-1.5 w-1.5 flex-none rounded-full ${
                                      currentStatus === 'Filed / Completed'
                                        ? 'bg-emerald-500'
                                        : currentStatus === 'Internal Review'
                                        ? 'bg-purple-500'
                                        : currentStatus === 'To Do'
                                        ? 'bg-slate-400'
                                        : 'bg-blue-500'
                                    }`}
                                  />
                                  <span className="truncate">{currentStatus}</span>
                                </motion.span>
                              </div>

                              {/* CELL 3: Effort & Progress Bar */}
                              <div className="min-w-0 overflow-hidden flex flex-col gap-0.5">
                                <div className="flex items-center justify-between text-[9px] font-mono font-semibold text-slate-600">
                                  <span>
                                    {isGstr3B && currentStatus === 'Filed / Completed'
                                      ? '5/5h'
                                      : `${task.effortSpent}/${task.effortTotal}h`}
                                  </span>
                                  <span className="text-[8.5px] text-slate-400">
                                    {currentProgress}%
                                  </span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                                  <motion.div
                                    animate={{ scaleX: currentProgress / 100 }}
                                    transition={{ duration: 0.35, ease: 'easeOut' }}
                                    style={{ transformOrigin: 'left' }}
                                    className={`h-full w-full rounded-full ${
                                      currentStatus === 'Filed / Completed'
                                        ? 'bg-emerald-500'
                                        : 'bg-[#004AAD]'
                                    }`}
                                  />
                                </div>
                              </div>

                              {/* CELL 4: Assignee */}
                              <div className="min-w-0 overflow-hidden flex items-center">
                                <span
                                  className="flex h-4.5 w-4.5 items-center justify-center rounded-full text-[8px] font-bold text-white shadow-3xs flex-none"
                                  style={{ backgroundColor: task.assigneeBg }}
                                >
                                  {task.assigneeInitials}
                                </span>
                              </div>

                              {/* CELL 5: Priority */}
                              <div className="min-w-0 overflow-hidden flex items-center gap-1 text-[9.5px] font-semibold">
                                <Flag
                                  size={9}
                                  className={
                                    task.priority === 'Urgent'
                                      ? 'text-red-500 fill-red-500 flex-none'
                                      : task.priority === 'High'
                                      ? 'text-amber-500 fill-amber-500 flex-none'
                                      : 'text-blue-500 fill-blue-500 flex-none'
                                  }
                                />
                                <span
                                  className={`truncate ${
                                    task.priority === 'Urgent'
                                      ? 'text-red-700 font-bold'
                                      : task.priority === 'High'
                                      ? 'text-amber-700'
                                      : 'text-blue-700'
                                  }`}
                                >
                                  {task.priority}
                                </span>
                              </div>

                              {/* CELL 6: Due Date */}
                              <div className="min-w-0 overflow-hidden text-right">
                                <span
                                  className={`font-mono text-[9px] font-semibold truncate block ${
                                    task.isOverdue
                                      ? 'text-red-600 bg-red-50 px-1 py-0.2 rounded'
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

                    {/* 7. CONNECTED AUTOMATION VISUAL */}
                    <AnimatePresence>
                      {showAutomationStrip && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28 }}
                          className="border-t border-blue-200/90 bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-blue-50/90 px-4 py-2 shadow-inner"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1.5">
                              <Zap size={11} className="text-amber-500 fill-amber-500" />
                              <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">
                                Active Practice Automation
                              </span>
                            </div>
                            <span className="font-mono text-[9px] text-[#004AAD] font-semibold">
                              Cross-Module Sync Active
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 rounded border border-emerald-200 bg-white px-2 py-1 shadow-3xs text-[10px] font-bold text-emerald-700">
                              <CheckCircle2 size={11} className="text-emerald-600" />
                              <span>GST Return Filed</span>
                            </div>

                            <div className="relative flex-1 h-0.5 bg-blue-200 overflow-hidden rounded">
                              <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ duration: 0.65, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-[#004AAD] to-transparent"
                              />
                            </div>

                            <div className="flex items-center gap-1.5 rounded border border-blue-200 bg-white px-2 py-1 shadow-3xs text-[10px] font-bold text-blue-700">
                              <Users size={11} className="text-[#004AAD]" />
                              <span>Workload 49% Rebalanced</span>
                            </div>

                            <div className="relative flex-1 h-0.5 bg-blue-200 overflow-hidden rounded">
                              <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ duration: 0.65, repeat: Infinity, ease: 'linear', delay: 0.2 }}
                                className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-purple-600 to-transparent"
                              />
                            </div>

                            <div className="flex items-center gap-1.5 rounded border border-purple-200 bg-white px-2 py-1 shadow-3xs text-[10px] font-bold text-purple-700">
                              <Building2 size={11} className="text-purple-600" />
                              <span>ClientSpace 100% Synced</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 8. Bottom Active Timer Bar */}
                    <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-1.5 text-[10.5px] text-slate-600">
                      <div className="flex items-center gap-2">
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#113353] text-white">
                          <Play size={7} className="ml-0.5" />
                        </div>
                        <span className="font-mono text-[10px] font-semibold text-slate-800">
                          01:42:18
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className="text-[9.5px] text-slate-500 truncate max-w-[280px]">
                          Active Task: [Oswal Exports] GSTR-3B Monthly Return Filing
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[9.5px] text-slate-400">
                        <span>Deliverables: {activeDeliverables}</span>
                        <span>•</span>
                        <span>Shortcuts (?)</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* --------------------------------------------------------- */}
                {/* PERSPECTIVE 2: WORKLOAD & RESOURCE REBALANCE              */}
                {/* --------------------------------------------------------- */}
                {activePerspective === 'workload' && (
                  <motion.div
                    key="view-workload"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col w-full h-full bg-slate-50/50 relative overflow-hidden"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#113353] text-[10px] font-bold text-white">
                          WL
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[12px] font-bold text-slate-900 leading-tight">
                              Practice Workload &amp; Capacity
                            </span>
                            <span className="rounded bg-blue-100 px-1.5 py-0.2 text-[8.5px] font-bold text-[#004AAD]">
                              REBALANCED
                            </span>
                          </div>
                          <span className="text-[9.5px] text-slate-400 block -mt-0.5">
                            Sharma &amp; Associates · Team Resource Allocation
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[9.5px] font-bold text-emerald-700">
                          Live Auto-Balancing
                        </span>
                      </div>
                    </div>

                    {/* Metric Cards */}
                    <div className="p-3 space-y-2.5 flex-1 overflow-hidden flex flex-col justify-between">
                      <div className="grid grid-cols-3 gap-2.5">
                        <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-3xs">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                            ACTIVE DELIVERABLES
                          </span>
                          <div className="flex items-baseline gap-1.5 mt-0.5">
                            <span className="font-mono text-[19px] font-bold text-slate-900">
                              {activeDeliverables}
                            </span>
                            <span className="text-[9px] font-semibold text-emerald-600">
                              -1 Completed
                            </span>
                          </div>
                        </div>

                        <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-3xs">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                            CAPACITY UTILIZATION
                          </span>
                          <div className="flex items-baseline gap-1.5 mt-0.5">
                            <span className="font-mono text-[19px] font-bold text-[#004AAD]">
                              {workloadCapacity}%
                            </span>
                            <span className="text-[9px] font-semibold text-slate-500">
                              Optimal Zone
                            </span>
                          </div>
                        </div>

                        <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-3xs">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                            AT RISK / OVERDUE
                          </span>
                          <div className="flex items-baseline gap-1.5 mt-0.5">
                            <span className="font-mono text-[19px] font-bold text-emerald-600">
                              2
                            </span>
                            <span className="text-[9px] font-semibold text-emerald-600">
                              ↓ Dropped from 3
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 2-Column Content: Left = Task Lengths Vertical Bar Chart, Right = Team Capacity */}
                      <div className="grid grid-cols-12 gap-2.5 flex-1 min-h-0">
                        {/* CHART 1: Task Lengths & Scope Distribution (Vertical Bar Chart) */}
                        <div className="col-span-7 rounded-lg border border-slate-200 bg-white p-2.5 shadow-3xs flex flex-col justify-between">
                          <div className="border-b border-slate-100 pb-1.5 flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[11px] font-bold text-slate-900 leading-tight">
                                  Task Lengths
                                </span>
                                <span className="rounded bg-slate-100 px-1 py-0.2 text-[8px] font-bold text-slate-600 uppercase">
                                  Scope Distribution
                                </span>
                              </div>
                              <span className="text-[9px] text-slate-400 block -mt-0.5">
                                Deliverable volume across compliance categories
                              </span>
                            </div>
                            <span className="text-[9px] font-mono font-bold text-[#004AAD] bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded">
                              43 Total Tasks
                            </span>
                          </div>

                          {/* Vertical Column Bar Chart */}
                          <div className="py-1 px-1">
                            <div className="h-28 flex items-end justify-between gap-1.5 relative border-b border-slate-200 pb-1">
                              {/* Grid lines */}
                              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                                <div className="border-b border-dashed border-slate-200 w-full" />
                                <div className="border-b border-dashed border-slate-200 w-full" />
                                <div className="border-b border-dashed border-slate-200 w-full" />
                              </div>

                              {[
                                { key: 'audit', label: 'Audit', count: 4, height: 35, color: '#004AAD' },
                                { key: 'tax3cd', label: '3CD', count: 8, height: 65, color: '#D97706' },
                                { key: 'tds', label: 'TDS', count: 12, height: 100, color: '#10B981' },
                                { key: 'gst', label: 'GST', count: 6, height: 50, color: '#7C3AED' },
                                { key: 'roc', label: 'ROC', count: 10, height: 83, color: '#2563EB' },
                                { key: 'advtax', label: 'AdvTax', count: 3, height: 26, color: '#F59E0B' },
                              ].map((item) => (
                                <div key={item.key} className="flex-1 flex flex-col items-center gap-0.5 relative z-10">
                                  <span className="text-[8.5px] font-mono font-bold text-slate-700">
                                    {item.count}
                                  </span>
                                  <div className="w-full max-w-[20px] bg-slate-100 rounded-t-[3px] h-20 flex items-end overflow-hidden">
                                    <motion.div
                                      initial={{ height: 0 }}
                                      animate={{ height: `${item.height}%` }}
                                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                      className="w-full rounded-t-[3px]"
                                      style={{ backgroundColor: item.color }}
                                    />
                                  </div>
                                  <span className="text-[8px] font-semibold text-slate-500 truncate mt-0.5">
                                    {item.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Legend Row */}
                          <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[8px] text-slate-500">
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Highest: TDS (12)
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" /> ROC: 10
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" /> 3CD: 8
                            </span>
                          </div>
                        </div>

                        {/* CHART 2: Team Capacity Breakdown */}
                        <div className="col-span-5 rounded-lg border border-slate-200 bg-white p-2.5 shadow-3xs flex flex-col justify-between">
                          <div className="border-b border-slate-100 pb-1.5 flex items-center justify-between">
                            <div>
                              <span className="text-[11px] font-bold text-slate-900 block leading-tight">
                                Team Capacity
                              </span>
                              <span className="text-[9px] text-slate-400 block -mt-0.5">
                                Post GST Rebalance
                              </span>
                            </div>
                            <span className="rounded bg-emerald-100 px-1.5 py-0.2 text-[8px] font-bold text-emerald-800">
                              Balanced
                            </span>
                          </div>

                          <div className="space-y-2 py-1">
                            {/* Member 1: Nikhil Jain */}
                            <div className="space-y-0.5">
                              <div className="flex items-center justify-between text-[9.5px]">
                                <span className="font-semibold text-slate-700 truncate max-w-[110px]">
                                  Nikhil Jain (Partner)
                                </span>
                                <span className="font-mono font-bold text-emerald-700 text-[9px]">
                                  {nikhilHours}
                                </span>
                              </div>
                              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                                <motion.div
                                  initial={{ width: '120%' }}
                                  animate={{ width: '100%' }}
                                  transition={{ duration: 0.5 }}
                                  className="h-full rounded-full bg-emerald-500"
                                />
                              </div>
                            </div>

                            {/* Member 2: Priya Sharma */}
                            <div className="space-y-0.5">
                              <div className="flex items-center justify-between text-[9.5px]">
                                <span className="font-semibold text-slate-700 truncate max-w-[110px]">
                                  Priya Sharma (Lead)
                                </span>
                                <span className="font-mono font-semibold text-blue-700 text-[9px]">
                                  32/35h (91%)
                                </span>
                              </div>
                              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                                <div className="h-full rounded-full bg-[#004AAD] w-[91%]" />
                              </div>
                            </div>

                            {/* Member 3: Rohan Meena */}
                            <div className="space-y-0.5">
                              <div className="flex items-center justify-between text-[9.5px]">
                                <span className="font-semibold text-slate-700 truncate max-w-[110px]">
                                  Rohan Meena (Tax)
                                </span>
                                <span className="font-mono font-semibold text-slate-600 text-[9px]">
                                  24/35h (68%)
                                </span>
                              </div>
                              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                                <div className="h-full rounded-full bg-slate-400 w-[68%]" />
                              </div>
                            </div>
                          </div>

                          <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[8px] text-slate-500">
                            <span>Standard 35h / week</span>
                            <span className="text-emerald-700 font-bold">Zero Overload</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-slate-200 bg-slate-50 px-4 py-1.5 flex items-center justify-between text-[9.5px] text-slate-400">
                      <span>Workload Engine v2.4</span>
                      <span>Sharma &amp; Associates Resource Grid</span>
                    </div>
                  </motion.div>
                )}

                {/* --------------------------------------------------------- */}
                {/* PERSPECTIVE 3: STATUTORY AUDIT & TAX DASHBOARD            */}
                {/* --------------------------------------------------------- */}
                {activePerspective === 'dashboard' && (
                  <motion.div
                    key="view-dashboard"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col w-full h-full bg-slate-50/50 relative overflow-hidden"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#004AAD] text-[10px] font-bold text-white">
                          TX
                        </div>
                        <div>
                          <span className="text-[12px] font-bold text-slate-900 block leading-tight">
                            Statutory Audit &amp; Tax Command
                          </span>
                          <span className="text-[9.5px] text-slate-400 block -mt-0.5">
                            Executive Practice Overview · FY 2026-27
                          </span>
                        </div>
                      </div>
                      <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[9.5px] font-bold text-[#004AAD]">
                        Partner Sign-Off Gate Active
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-3 space-y-2.5 flex-1 overflow-hidden flex flex-col justify-between">
                      {/* Top Metric Cards */}
                      <div className="grid grid-cols-3 gap-2.5">
                        {/* Metric 1 */}
                        <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-3xs">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                            PRACTICE COMPLIANCE
                          </span>
                          <div className="flex items-baseline gap-1.5 mt-0.5">
                            <span className="font-mono text-[19px] font-black text-emerald-600">
                              {complianceScore}%
                            </span>
                            <span className="text-[8.5px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                              +2% POST GST
                            </span>
                          </div>
                          <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                            <motion.div
                              initial={{ width: '84%' }}
                              animate={{ width: `${complianceScore}%` }}
                              transition={{ duration: 0.5 }}
                              className="h-full rounded-full bg-emerald-500"
                            />
                          </div>
                        </div>

                        {/* Metric 2 */}
                        <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-3xs">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                            STATUTORY FILINGS
                          </span>
                          <div className="flex items-baseline gap-1.5 mt-0.5">
                            <span className="font-mono text-[19px] font-black text-[#004AAD]">
                              {statutoryFilingRatio}
                            </span>
                            <span className="text-[8.5px] font-semibold text-slate-500">
                              87.5% Target
                            </span>
                          </div>
                          <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                            <div className="h-full rounded-full bg-[#004AAD] w-[87.5%]" />
                          </div>
                        </div>

                        {/* Metric 3 */}
                        <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-3xs">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                            DEADLINES STATUS
                          </span>
                          <div className="flex items-center justify-between gap-1 mt-1 text-[9px]">
                            <div className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-mono font-bold">
                              18 Filed
                            </div>
                            <div className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-mono font-bold">
                              12 Synced
                            </div>
                            <div className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-mono font-bold">
                              5 Review
                            </div>
                          </div>
                          <div className="mt-1.5 text-[8.5px] text-slate-400 font-medium">
                            August 2026 Cycle
                          </div>
                        </div>
                      </div>

                      {/* 2-Column Content: Left = Filing Velocity Monthly Bar Chart, Right = Service Line Breakdown */}
                      <div className="grid grid-cols-12 gap-2.5 flex-1 min-h-0">
                        {/* CHART 1: Filing Velocity Monthly Column Bar Chart */}
                        <div className="col-span-6 rounded-lg border border-slate-200 bg-white p-2.5 shadow-3xs flex flex-col justify-between">
                          <div className="border-b border-slate-100 pb-1.5 flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[11px] font-bold text-slate-900 leading-tight">
                                  Filing Velocity
                                </span>
                                <span className="rounded bg-blue-100 px-1 py-0.2 text-[8px] font-bold text-[#004AAD] uppercase">
                                  Monthly
                                </span>
                              </div>
                              <span className="text-[9px] text-slate-400 block -mt-0.5">
                                Statutory returns certified &amp; filed
                              </span>
                            </div>
                            <span className="text-[8.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                              ↑ 24% vs Q1
                            </span>
                          </div>

                          {/* Column Bars */}
                          <div className="py-1 px-1">
                            <div className="h-28 flex items-end justify-between gap-1.5 relative border-b border-slate-200 pb-1">
                              {/* Grid lines */}
                              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                                <div className="border-b border-dashed border-slate-200 w-full" />
                                <div className="border-b border-dashed border-slate-200 w-full" />
                                <div className="border-b border-dashed border-slate-200 w-full" />
                              </div>

                              {[
                                { month: 'Apr', count: 14, height: 40, isCurrent: false },
                                { month: 'May', count: 18, height: 51, isCurrent: false },
                                { month: 'Jun', count: 24, height: 68, isCurrent: false },
                                { month: 'Jul', count: 28, height: 80, isCurrent: false },
                                { month: 'Aug', count: 35, height: 100, isCurrent: true },
                                { month: 'Sep', count: 29, height: 82, isCurrent: false },
                              ].map((bar) => (
                                <div key={bar.month} className="flex-1 flex flex-col items-center gap-0.5 relative z-10">
                                  {bar.isCurrent && (
                                    <span className="absolute -top-3 text-[7.5px] font-extrabold text-[#004AAD] bg-blue-50 px-1 rounded shadow-3xs border border-blue-200">
                                      Peak
                                    </span>
                                  )}
                                  <span
                                    className={`text-[8.5px] font-mono font-bold ${
                                      bar.isCurrent ? 'text-[#004AAD]' : 'text-slate-700'
                                    }`}
                                  >
                                    {bar.count}
                                  </span>
                                  <div className="w-full max-w-[22px] bg-slate-100 rounded-t-[3px] h-20 flex items-end overflow-hidden">
                                    <motion.div
                                      initial={{ height: 0 }}
                                      animate={{ height: `${bar.height}%` }}
                                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                      className={`w-full rounded-t-[3px] ${
                                        bar.isCurrent
                                          ? 'bg-gradient-to-t from-[#004AAD] to-blue-500 shadow-sm'
                                          : 'bg-slate-400'
                                      }`}
                                    />
                                  </div>
                                  <span
                                    className={`text-[8px] font-semibold truncate mt-0.5 ${
                                      bar.isCurrent ? 'text-[#004AAD] font-bold' : 'text-slate-500'
                                    }`}
                                  >
                                    {bar.month}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[8px] text-slate-500">
                            <span>Q1 Avg: 18.6 / mo</span>
                            <span className="font-bold text-[#004AAD]">Q2 Surge: 35 / mo</span>
                          </div>
                        </div>

                        {/* CHART 2: Statutory Audit & Service Line Breakdown (Horizontal Progress Bars) */}
                        <div className="col-span-6 rounded-lg border border-slate-200 bg-white p-2.5 shadow-3xs flex flex-col justify-between">
                          <div className="border-b border-slate-100 pb-1.5 flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[11px] font-bold text-slate-900 leading-tight">
                                  Service Breakdown
                                </span>
                                <span className="rounded bg-slate-100 px-1 py-0.2 text-[8px] font-bold text-slate-600 uppercase">
                                  Sec 44AB &amp; GST
                                </span>
                              </div>
                              <span className="text-[9px] text-slate-400 block -mt-0.5">
                                Statutory adherence by compliance discipline
                              </span>
                            </div>
                            <span className="text-[8.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                              4 Disciplines
                            </span>
                          </div>

                          <div className="space-y-1.5 py-1">
                            {/* Line 1: GST */}
                            <div className="space-y-0.5">
                              <div className="flex items-center justify-between text-[9px]">
                                <span className="font-semibold text-slate-700">GST Returns (GSTR-3B)</span>
                                <span className="font-mono font-bold text-emerald-700">35/40 (87.5%)</span>
                              </div>
                              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 w-[87.5%]" />
                              </div>
                            </div>

                            {/* Line 2: Sec 44AB */}
                            <div className="space-y-0.5">
                              <div className="flex items-center justify-between text-[9px]">
                                <span className="font-semibold text-slate-700">Tax Audit (Form 3CD)</span>
                                <span className="font-mono font-bold text-amber-700">26/40 (65.0%)</span>
                              </div>
                              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                                <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 w-[65%]" />
                              </div>
                            </div>

                            {/* Line 3: Corporate ROC */}
                            <div className="space-y-0.5">
                              <div className="flex items-center justify-between text-[9px]">
                                <span className="font-semibold text-slate-700">Corporate ROC / MCA V3</span>
                                <span className="font-mono font-bold text-blue-700">14/33 (42.4%)</span>
                              </div>
                              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 w-[42.4%]" />
                              </div>
                            </div>

                            {/* Line 4: TDS 26Q */}
                            <div className="space-y-0.5">
                              <div className="flex items-center justify-between text-[9px]">
                                <span className="font-semibold text-slate-700">TDS Challan 281 &amp; 26Q</span>
                                <span className="font-mono font-bold text-purple-700">18/20 (90.0%)</span>
                              </div>
                              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                                <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 w-[90%]" />
                              </div>
                            </div>
                          </div>

                          <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[8px] text-slate-500">
                            <span>Unified CBDT &amp; GSTN Radar</span>
                            <span className="text-emerald-700 font-bold">All APIs Synced</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-slate-200 bg-slate-50 px-4 py-1.5 flex items-center justify-between text-[9.5px] text-slate-400">
                      <span>Pyngyn Executive Command Hub</span>
                      <span>Verified Real-Time</span>
                    </div>
                  </motion.div>
                )}

                {/* --------------------------------------------------------- */}
                {/* PERSPECTIVE 4: OSWAL EXPORTS CLIENTSPACE PORTAL           */}
                {/* --------------------------------------------------------- */}
                {activePerspective === 'client_portal' && (
                  <motion.div
                    key="view-client-portal"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col w-full h-full bg-[#F8FAFC] relative overflow-hidden"
                  >
                    {/* 1. Global Branded Header Bar */}
                    <div className="h-[44px] bg-white border-b border-[#E5EAF2] px-4 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-[14px] text-[#113353] tracking-tight">
                          Oswal Exports
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#EEF5FF] text-[#004AAD] text-[9.5px] font-extrabold uppercase tracking-wider border border-[#C2DCFF]">
                          CLIENT PORTAL
                        </span>
                      </div>

                      {/* Live CA Practice Sync Indicator */}
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-[9.5px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[#475569] font-medium">Live CA Sync:</span>
                        <span className="text-[#113353] font-bold">Sharma &amp; Associates</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-md bg-[#113353] text-white flex items-center justify-center font-bold text-[10px] shadow-3xs">
                            SO
                          </div>
                          <div className="text-left leading-tight hidden sm:block">
                            <span className="font-bold text-[#113353] block text-[10.5px]">Sunita Oswal</span>
                            <span className="text-[8.5px] text-[#627D98]">Authorized Signatory</span>
                          </div>
                          <span className="px-1.5 py-0.2 rounded bg-[#F0FAF0] text-[#00960F] border border-[#B5EDB9] text-[8.5px] font-bold">
                            ADMIN
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 2. Hero Room Banner Card with Architectural Dotted Pattern */}
                    <div className="px-3.5 pt-2.5 pb-1.5">
                      <div className="bg-white border border-[#E5EAF2] rounded-[10px] shadow-3xs overflow-hidden">
                        {/* Dot Matrix Header */}
                        <div
                          className="px-3.5 py-2.5 bg-gradient-to-r from-[#F8FAFC] via-white to-[#FFF7ED] border-b border-[#E5EAF2]/60 relative"
                          style={{
                            backgroundImage: 'radial-gradient(#CBD5E1 1.1px, transparent 1.1px)',
                            backgroundSize: '14px 14px',
                          }}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-[7px] bg-white border border-[#CBD5E1] shadow-3xs flex items-center justify-center text-[#113353]">
                                <Folder size={14} className="text-[#004AAD]" />
                              </div>
                              <div>
                                <h3 className="text-[13.5px] font-black text-[#113353] tracking-tight">
                                  GST Compliance — FY26
                                </h3>
                                <p className="text-[9.5px] text-[#627D98] font-medium">
                                  Sharma &amp; Associates Client Space · FY 2026-27
                                </p>
                              </div>
                            </div>

                            {/* Co-branded Control Stamp Badge */}
                            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-[5px] border border-[#E5EAF2] shadow-3xs text-[10px] font-bold">
                              <span className="text-[#113353]">OE</span>
                              <span className="text-[#627D98]">+</span>
                              <span className="text-[#004AAD]">SA</span>
                            </div>
                          </div>

                          <div className="mt-1.5 flex items-center gap-2">
                            <h2 className="text-[15px] font-black text-[#113353] tracking-tight">
                              Oswal - Sharma
                            </h2>
                            <span className="px-1.5 py-0.2 rounded-full bg-[#EBFDFF] text-[#129EA6] text-[8.5px] font-extrabold uppercase tracking-wider border border-[#B7F5F8]">
                              VERIFIED CLIENT PORTAL
                            </span>
                          </div>
                        </div>

                        {/* Navigation Tabs Bar */}
                        <div className="px-3.5 flex items-center justify-between border-t border-[#E5EAF2] bg-white">
                          <div className="flex items-center gap-1">
                            {[
                              { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={11} />, active: true },
                              { id: 'engagements', label: 'Engagements', icon: <Calendar size={11} /> },
                              { id: 'action-items', label: 'Action Items', icon: <CheckSquare size={11} /> },
                              { id: 'documents', label: 'Documents', icon: <Folder size={11} /> },
                              { id: 'chat', label: 'Direct Chat', icon: <MoreHorizontal size={11} /> },
                            ].map((tab) => (
                              <div
                                key={tab.id}
                                className={`h-7 px-2 flex items-center gap-1 text-[10px] font-bold border-b-2 whitespace-nowrap -mb-[1px] ${
                                  tab.active
                                    ? 'text-[#004AAD] border-[#004AAD]'
                                    : 'text-[#627D98] border-transparent'
                                }`}
                              >
                                {tab.icon}
                                <span>{tab.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3. Sub-Toolbar: Compliance Dashboard + Period Pills */}
                    <div className="px-3.5 py-1 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 font-bold text-[11px] text-[#113353]">
                          <span className="h-2 w-2 rounded bg-amber-500" />
                          <span>Compliance Radar</span>
                        </div>
                        <div className="flex items-center gap-0.5 p-0.5 bg-white border border-[#CBD5E1] rounded-[5px] text-[9.5px] font-bold shadow-3xs">
                          {['FY 2026-27', 'Q2 FY27', 'August Cycle'].map((p, idx) => (
                            <span
                              key={p}
                              className={`px-1.5 py-0.2 rounded-[3px] ${
                                idx === 0 ? 'bg-[#113353] text-white font-extrabold' : 'text-[#627D98]'
                              }`}
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[9.5px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                          ✓ All APIs Connected
                        </span>
                      </div>
                    </div>

                    {/* 4. Top Widget Cards (Authentic 4 Grid Cards) */}
                    <div className="px-3.5 py-1 grid grid-cols-4 gap-2 flex-1 min-h-0">
                      {/* Card 1: Compliance Progress Ring */}
                      <div className="bg-white border border-[#004AAD]/40 rounded-[8px] p-2.5 shadow-3xs flex flex-col justify-between">
                        <div className="flex items-center justify-between pb-1 border-b border-[#E5EAF2]/60">
                          <h4 className="font-bold text-[10.5px] text-[#113353]">Compliance</h4>
                          <span className="px-1.5 py-0.2 rounded-full bg-[#F0FAF0] text-[#00960F] text-[8px] font-bold border border-[#B5EDB9]">
                            100% On Track
                          </span>
                        </div>
                        <div className="py-1 flex items-center justify-between">
                          <div>
                            <div className="text-[19px] font-black text-[#113353] leading-none">
                              {clientGstProgress}%
                            </div>
                            <span className="text-[8px] font-bold text-emerald-600 block mt-0.5">
                              +22% POST GSTN
                            </span>
                            <span className="text-[8px] text-[#627D98] block">22 Done · 0 Overdue</span>
                          </div>
                          {/* Circular Ring SVG */}
                          <div className="relative w-10 h-10 flex items-center justify-center">
                            <svg width="40" height="40" className="transform -rotate-90">
                              <circle cx="20" cy="20" r="16" stroke="#E2E8F0" strokeWidth="3.5" fill="transparent" />
                              <motion.circle
                                cx="20"
                                cy="20"
                                r="16"
                                stroke="#10B981"
                                strokeWidth="3.5"
                                strokeDasharray="100.5"
                                initial={{ strokeDashoffset: 100.5 - 0.78 * 100.5 }}
                                animate={{ strokeDashoffset: 100.5 - (clientGstProgress / 100) * 100.5 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                strokeLinecap="round"
                                fill="transparent"
                              />
                            </svg>
                            <span className="absolute font-extrabold text-[8.5px] text-[#113353]">
                              {clientGstProgress}%
                            </span>
                          </div>
                        </div>
                        <div className="pt-1 border-t border-[#E5EAF2]/60 text-[8px] text-[#004AAD] font-bold">
                          All 22 Tasks Certified →
                        </div>
                      </div>

                      {/* Card 2: Upcoming Deadlines */}
                      <div className="bg-white border border-[#E5EAF2] rounded-[8px] p-2.5 shadow-3xs flex flex-col justify-between">
                        <div className="flex items-center justify-between pb-1 border-b border-[#E5EAF2]/60">
                          <h4 className="font-bold text-[10.5px] text-[#113353]">Deadlines</h4>
                          <span className="px-1.5 py-0.2 rounded-full bg-[#EEF5FF] text-[#004AAD] text-[8px] font-bold">
                            Live Synced
                          </span>
                        </div>
                        <div className="space-y-1 py-1 text-[9px]">
                          <div className="p-1 rounded bg-emerald-50 border border-emerald-200">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-emerald-900">GSTR-3B</span>
                              <span className="text-[7.5px] font-bold bg-emerald-200 text-emerald-800 px-1 rounded">
                                FILED ✓
                              </span>
                            </div>
                            <span className="font-mono text-[8px] text-emerald-700 block truncate">
                              ARN: AA270826019482M
                            </span>
                          </div>
                          <div className="p-1 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                            <span className="font-medium text-slate-700">Form 26Q TDS</span>
                            <span className="font-mono text-amber-700 font-bold">31 Aug</span>
                          </div>
                        </div>
                        <div className="pt-1 border-t border-[#E5EAF2]/60 text-[8px] text-[#627D98]">
                          GSTN Verification Ack Active
                        </div>
                      </div>

                      {/* Card 3: Action Required */}
                      <div className="bg-white border border-[#E5EAF2] rounded-[8px] p-2.5 shadow-3xs flex flex-col justify-between">
                        <div className="flex items-center justify-between pb-1 border-b border-[#E5EAF2]/60">
                          <h4 className="font-bold text-[10.5px] text-[#113353]">Action Required</h4>
                          <span className="px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 text-[8px] font-bold border border-emerald-200">
                            0 Pending
                          </span>
                        </div>
                        <div className="py-1 space-y-1 text-[9px]">
                          <div className="p-1 rounded bg-slate-50 border border-slate-100 flex items-center gap-1.5">
                            <CheckCircle2 size={11} className="text-emerald-600 flex-none" />
                            <span className="text-slate-700 truncate">August Bank Statement Signed</span>
                          </div>
                          <div className="p-1 rounded bg-slate-50 border border-slate-100 flex items-center gap-1.5">
                            <CheckCircle2 size={11} className="text-emerald-600 flex-none" />
                            <span className="text-slate-700 truncate">ITC ₹3.2L Match Confirmed</span>
                          </div>
                        </div>
                        <div className="pt-1 border-t border-[#E5EAF2]/60 text-[8px] text-emerald-700 font-bold">
                          All Client Approvals Done ✓
                        </div>
                      </div>

                      {/* Card 4: Documents & Vault */}
                      <div className="bg-white border border-[#E5EAF2] rounded-[8px] p-2.5 shadow-3xs flex flex-col justify-between">
                        <div className="flex items-center justify-between pb-1 border-b border-[#E5EAF2]/60">
                          <h4 className="font-bold text-[10.5px] text-[#113353]">Secure Vault</h4>
                          <span className="px-1.5 py-0.2 rounded-full bg-blue-50 text-[#004AAD] text-[8px] font-bold">
                            Encrypted
                          </span>
                        </div>
                        <div className="py-1 space-y-1 text-[9px]">
                          <div className="p-1 rounded bg-slate-50 border border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-1 truncate">
                              <Folder size={10} className="text-[#004AAD] flex-none" />
                              <span className="text-slate-700 font-medium truncate">GSTR-3B_Ack.pdf</span>
                            </div>
                            <span className="text-[7.5px] font-bold text-emerald-700">✓ Synced</span>
                          </div>
                          <div className="p-1 rounded bg-slate-50 border border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-1 truncate">
                              <Folder size={10} className="text-[#004AAD] flex-none" />
                              <span className="text-slate-700 font-medium truncate">Challan_281.pdf</span>
                            </div>
                            <span className="text-[7.5px] font-bold text-emerald-700">✓ Ready</span>
                          </div>
                        </div>
                        <div className="pt-1 border-t border-[#E5EAF2]/60 text-[8px] text-[#004AAD] font-bold flex items-center justify-between">
                          <span>256-bit AES Vault</span>
                          <span>Download →</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-slate-200 bg-white px-4 py-1.5 flex items-center justify-between text-[9.5px] text-slate-400 shrink-0">
                      <span className="flex items-center gap-1">
                        <ShieldCheck size={11} className="text-emerald-600" />
                        <span>Pyngyn ClientSpace Engine · Sharma &amp; Associates Verified Session</span>
                      </span>
                      <span className="font-semibold text-[#004AAD]">Live Client Link Active</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
