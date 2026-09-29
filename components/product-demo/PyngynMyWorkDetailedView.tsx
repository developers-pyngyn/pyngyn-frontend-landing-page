'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PyngynIcons } from './PyngynIcons';
import { PyngynProductShell } from './PyngynProductShell';
import { PyngynCelebrationOverlay } from './PyngynCelebrationOverlay';

export interface PyngynMyWorkDetailedViewProps {
  className?: string;
  standalone?: boolean;
  autoPlay?: boolean;
  alwaysShowCelebration?: boolean;
}

interface MyWorkAssignee {
  initials: string;
  color: string;
  isOnline?: boolean;
  name?: string;
}

interface MyWorkTaskItem {
  id: string;
  title: string;
  isStarred?: boolean;
  isSelected?: boolean;
  isLocked?: boolean;
  isBlocked?: boolean;
  actionIcon?: 'pencil' | 'plus';
  status: 'In Progress' | 'Internal Review' | 'Blocked' | 'To Do' | 'Filed / Completed';
  statusTone: 'blue' | 'purple' | 'red' | 'gray' | 'green';
  effortSpent: number;
  effortTotal: number;
  effortColor: 'green' | 'orange' | 'gray' | 'teal';
  assignees: MyWorkAssignee[];
  priority: 'High' | 'Urgent' | 'Low' | 'Medium';
  priorityColor: 'amber' | 'red' | 'blue' | 'gray';
  dueDate: string;
  clientShort: string;
  hasTimerButton?: boolean;
  showTooltip?: boolean;
  isCompleted?: boolean;
}

export const PyngynMyWorkDetailedView: React.FC<PyngynMyWorkDetailedViewProps> = ({
  className = '',
  standalone = false,
  autoPlay = true,
  alwaysShowCelebration = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Navigation tab states
  const [activeTab, setActiveTab] = useState<'tasks' | 'engagements' | 'timesheet' | 'shared'>('tasks');
  const [activeSubTab, setActiveSubTab] = useState<'assigned' | 'all'>('assigned');
  const [activeViewShape, setActiveViewShape] = useState<'list' | 'board' | 'calendar' | 'timeline'>('list');

  // Client vs Internal toggle on secondary sidebar
  const [sidebarScope, setSidebarScope] = useState<'client' | 'internal'>('client');

  // AUTOMATED REALISTIC & SUBTLE WORKFLOW ANIMATION:
  // Phase 0: Baseline state (Task Match GSTR-2B Blocked, Timer idle 00:00:00)
  // Phase 1: Task selection (Match GSTR-2B highlighted, timer turns running with tick 00:01:24)
  // Phase 2: Status transition (Blocked -> Internal Review purple pill)
  // Phase 3: Effort update (4.5/8h -> 6.5/8h, animated progress bar)
  // Phase 4: Priority change (High -> Urgent red flag)
  // Phase 5: Completion (Checked ☑, strikethrough, status turns green ✓ Filed / Completed, 8/8h 100%)
  // Phase 6: Hold clean completed state before loop
  const [animStep, setAnimStep] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6>(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [showManualCelebration, setShowManualCelebration] = useState(false);

  useEffect(() => {
    if (!autoPlay || shouldReduceMotion) return;

    const timings = [
      2600, // 0: Baseline
      2400, // 1: Task selection & timer start
      2400, // 2: Status transition to Internal Review
      2400, // 3: Effort update
      2200, // 4: Priority escalation
      3000, // 5: Completion
      1600, // 6: Reset hold
    ];

    const timer = setTimeout(() => {
      setAnimStep((prev) => ((prev + 1) % timings.length) as any);
    }, timings[animStep] || 2400);

    return () => clearTimeout(timer);
  }, [animStep, autoPlay, shouldReduceMotion]);

  // Subtle timer clock ticking when active (Phase 1-5)
  useEffect(() => {
    if (!autoPlay || shouldReduceMotion) return;
    if (animStep >= 1 && animStep <= 5) {
      const interval = setInterval(() => {
        setTimerSeconds((prev) => (prev + 1) % 3600);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setTimerSeconds(0);
    }
  }, [animStep, autoPlay, shouldReduceMotion]);

  const isTimerRunning = animStep >= 1 && animStep <= 5;
  const isTaskSelected = animStep >= 1 && animStep <= 5;

  // Dynamic values for target task: 'Match GSTR-2B - resolve ₹3.2L ITC mismatch'
  const itcStatus: 'Blocked' | 'Internal Review' | 'Filed / Completed' =
    animStep >= 5 ? 'Filed / Completed' : animStep >= 2 ? 'Internal Review' : 'Blocked';
  const itcStatusTone: 'red' | 'purple' | 'green' =
    animStep >= 5 ? 'green' : animStep >= 2 ? 'purple' : 'red';
  const itcEffortSpent = animStep >= 5 ? 8 : animStep >= 3 ? 6.5 : 4.5;
  const itcPriority: 'High' | 'Urgent' = animStep >= 4 ? 'Urgent' : 'High';
  const itcPriorityColor: 'amber' | 'red' = animStep >= 4 ? 'red' : 'amber';
  const isItcCompleted = animStep >= 5;

  const formatTimer = (s: number) => {
    if (animStep === 0) return '00:00:00';
    const baseSeconds = 84 + s; // starts at 00:01:24
    const mins = String(Math.floor(baseSeconds / 60)).padStart(2, '0');
    const secs = String(baseSeconds % 60).padStart(2, '0');
    return `00:${mins}:${secs}`;
  };

  // 8 Exact Real Accounting Tasks from Screenshot media_1790240364646.png
  const tasks: MyWorkTaskItem[] = [
    {
      id: 'my-gstr1',
      title: 'GSTR-1 sales ledger matching & E-way bill validation',
      status: 'In Progress',
      statusTone: 'blue',
      effortSpent: 2,
      effortTotal: 4,
      effortColor: 'green',
      assignees: [
        { initials: 'NJ', color: '#7E22CE' },
        { initials: 'PA', color: '#EC4899', isOnline: true },
      ],
      priority: 'High',
      priorityColor: 'amber',
      dueDate: '02 Sep',
      clientShort: 'Os...',
    },
    {
      id: 'my-gstr3b',
      title: 'GSTR-3B Monthly Return Filing (August 2026)',
      status: 'In Progress',
      statusTone: 'blue',
      effortSpent: 2.5,
      effortTotal: 4,
      effortColor: 'teal',
      assignees: [
        { initials: 'NJ', color: '#7E22CE' },
        { initials: 'PA', color: '#EC4899', isOnline: true },
      ],
      priority: 'High',
      priorityColor: 'amber',
      dueDate: '20 Sep',
      clientShort: 'Os...',
    },
    {
      id: 'my-itc-mismatch',
      title: 'Match GSTR-2B - resolve ₹3.2L ITC mismatch',
      isStarred: true,
      isSelected: isTaskSelected,
      isBlocked: itcStatus === 'Blocked',
      status: itcStatus,
      statusTone: itcStatusTone,
      effortSpent: itcEffortSpent,
      effortTotal: 8,
      effortColor: isItcCompleted ? 'green' : 'teal',
      assignees: [
        { initials: 'NJ', color: '#7E22CE' },
        { initials: 'PA', color: '#EC4899' },
        { initials: 'AS', color: '#004AAD' },
      ],
      priority: itcPriority,
      priorityColor: itcPriorityColor,
      dueDate: '18 Sep',
      clientShort: 'Ba...',
      isCompleted: isItcCompleted,
    },
    {
      id: 'my-prov-bs',
      title: 'Provisional balance sheet for bank',
      status: 'Internal Review',
      statusTone: 'purple',
      effortSpent: 7,
      effortTotal: 12,
      effortColor: 'teal',
      assignees: [
        { initials: 'NJ', color: '#7E22CE' },
        { initials: 'PA', color: '#EC4899', isOnline: true },
      ],
      priority: 'Urgent',
      priorityColor: 'red',
      dueDate: 'Yesterday',
      clientShort: 'Os...',
    },
    {
      id: 'my-adv-tax',
      title: 'Advance tax computation',
      isBlocked: true,
      status: 'To Do',
      statusTone: 'gray',
      effortSpent: 2,
      effortTotal: 5,
      effortColor: 'gray',
      assignees: [{ initials: 'NJ', color: '#7E22CE', name: 'Nikhil Jain' }],
      priority: 'Urgent',
      priorityColor: 'red',
      dueDate: '15 Sep',
      clientShort: 'Ad...',
    },
  ];

  const content = (
    <div
      ref={containerRef}
      data-product-target="my-work-view-root"
      className={`w-full h-full flex flex-col bg-white text-[#113353] select-none font-sans overflow-hidden relative ${className}`}
    >
      {/* 1. Header with Breadcrumbs & Title: My Work */}
      <div className="px-5 py-2.5 bg-white border-b border-[#E5EAF2] flex items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#627D98] font-medium">
            <span>Nikhil Jain &amp; Associates CA</span>
            <span>/</span>
            <span className="text-[#113353] font-bold">My Work</span>
          </div>
          <h1 className="text-[17px] font-black text-[#113353] tracking-tight flex items-center gap-2 mt-0.5">
            <PyngynIcons.list size={14} className="text-[#627D98]" />
            <span>My Work</span>
            <PyngynIcons.chevronDown size={13} className="text-[#627D98] cursor-pointer" />
            <PyngynIcons.star size={13} className="text-[#94A3B8] hover:text-[#D97706] cursor-pointer" />
          </h1>
        </div>

        <button
          type="button"
          className="h-[28px] px-3 rounded-[6px] bg-[#113353] hover:bg-[#0B2238] text-white font-bold text-[11.5px] flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
        >
          <PyngynIcons.plus size={12} className="stroke-[2.5]" />
          <span>Add Task</span>
        </button>
      </div>

      {/* 2. Primary Tabs: My Tasks 48 | My Engagements 32 | My Timesheet | Shared with Me 39 */}
      <div className="h-[38px] px-5 bg-white border-b border-[#E5EAF2] flex items-center justify-between text-[12px] font-medium shrink-0">
        <div className="flex items-center gap-1 h-full overflow-hidden">
          {[
            { id: 'tasks', label: 'My Tasks', count: 48, icon: <PyngynIcons.checkSquare size={12} /> },
            { id: 'engagements', label: 'My Engagements', count: 32, icon: <PyngynIcons.folder size={12} /> },
            { id: 'timesheet', label: 'My Timesheet', icon: <PyngynIcons.clock size={12} /> },
            { id: 'shared', label: 'Shared with Me', count: 39, icon: <PyngynIcons.user size={12} /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`h-full px-2.5 flex items-center gap-1.5 border-b-2 font-medium cursor-pointer transition-colors whitespace-nowrap -mb-[1px] ${
                  isActive
                    ? 'font-bold text-[#113353] border-[#113353]'
                    : 'text-[#627D98] border-transparent hover:text-[#113353]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-[#113353] text-white' : 'bg-[#E5EAF2] text-[#627D98]'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
          <button type="button" className="h-full px-2 text-[#627D98] hover:text-[#113353] flex items-center gap-1 text-[11.5px] font-semibold">
            <span className="text-[#004AAD] font-bold">+</span>
            <span>View</span>
          </button>
        </div>

        {/* View Switcher: List | Board | Calendar | Timeline */}
        <div className="flex items-center gap-0.5 bg-[#F8FAFC] p-0.5 rounded-[7px] border border-[#CBD5E1]">
          {[
            { id: 'list', label: 'List', icon: <PyngynIcons.list size={12} /> },
            { id: 'board', label: 'Board', icon: <PyngynIcons.kanban size={12} /> },
            { id: 'calendar', label: 'Calendar', icon: <PyngynIcons.calendar size={12} /> },
            { id: 'timeline', label: 'Timeline', icon: <PyngynIcons.timeline size={12} /> },
          ].map((view) => (
            <button
              key={view.id}
              type="button"
              onClick={() => setActiveViewShape(view.id as any)}
              className={`px-2 py-1 rounded-[5px] text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeViewShape === view.id
                  ? 'bg-[#113353] text-white shadow-2xs'
                  : 'text-[#627D98] hover:text-[#113353]'
              }`}
            >
              {view.icon}
              <span>{view.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Toolbar Controls */}
      <div className="px-5 py-2 bg-white border-b border-[#E5EAF2] flex items-center justify-between gap-2 text-[11px] shrink-0 overflow-hidden">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button type="button" className="px-2 py-0.5 rounded-[6px] border border-[#CBD5E1] bg-white text-[#113353] font-semibold flex items-center gap-1 shadow-3xs">
            <PyngynIcons.filter size={11} className="text-[#627D98]" />
            <span>Filter</span>
            <PyngynIcons.chevronDown size={10} className="text-[#627D98]" />
          </button>
          <button type="button" className="px-2 py-0.5 rounded-[6px] border border-[#CBD5E1] bg-white text-[#113353] font-semibold flex items-center gap-1 shadow-3xs">
            <PyngynIcons.sort size={11} className="text-[#627D98]" />
            <span>Sort</span>
            <PyngynIcons.chevronDown size={10} className="text-[#627D98]" />
          </button>
          <button type="button" className="px-2 py-0.5 rounded-[6px] border border-[#CBD5E1] bg-white text-[#113353] font-semibold flex items-center gap-1 shadow-3xs">
            <PyngynIcons.grid size={11} className="text-[#627D98]" />
            <span>Group: Due Date</span>
            <PyngynIcons.chevronDown size={10} className="text-[#627D98]" />
          </button>
          <button type="button" className="px-2 py-0.5 rounded-[6px] border border-[#CBD5E1] bg-white text-[#113353] font-semibold flex items-center gap-1 shadow-3xs hidden sm:flex">
            <span>All Tasks</span>
            <span className="text-[9.5px] bg-[#E5EAF2] px-1 rounded-full text-[#627D98] font-bold">48</span>
            <PyngynIcons.chevronDown size={10} className="text-[#627D98]" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button type="button" className="w-6 h-6 rounded-[6px] border border-[#CBD5E1] hover:bg-[#F8FAFC] flex items-center justify-center text-[#627D98] shadow-3xs">
            <PyngynIcons.star size={11} className="fill-[#113353] text-[#113353]" />
          </button>
          <button type="button" className="w-6 h-6 rounded-[6px] border border-[#CBD5E1] hover:bg-[#F8FAFC] flex items-center justify-center text-[#627D98] shadow-3xs">
            <PyngynIcons.sliders size={11} />
          </button>

          {/* Assignees Stack */}
          <div className="flex items-center -space-x-1.5 ml-0.5">
            <span className="w-4.5 h-4.5 rounded-[4px] bg-[#7E22CE] text-white text-[8px] font-bold flex items-center justify-center ring-1 ring-white">PS</span>
            <span className="w-4.5 h-4.5 rounded-[4px] bg-[#004AAD] text-white text-[8px] font-bold flex items-center justify-center ring-1 ring-white">RM</span>
            <span className="w-4.5 h-4.5 rounded-[4px] bg-[#EC4899] text-white text-[8px] font-bold flex items-center justify-center ring-1 ring-white">IG</span>
            <span className="w-4.5 h-4.5 rounded-[4px] bg-[#E5EAF2] text-[#627D98] text-[8px] font-bold flex items-center justify-center ring-1 ring-white">+2</span>
          </div>

          <button type="button" className="px-2 py-0.5 rounded-[6px] border border-[#CBD5E1] text-[10.5px] font-semibold text-[#113353] shadow-3xs hover:bg-[#F8FAFC]">
            Save View
          </button>
        </div>
      </div>

      {/* 4. Inline Execution Timer Bar (Directly Above Table) */}
      <div className="px-5 py-1.5 bg-[#F8FAFC] border-b border-[#E5EAF2] flex items-center justify-between text-[11.5px] shrink-0">
        <div className="flex items-center gap-2.5">
          {/* Round Play / Pause Button with gentle pulse */}
          <motion.button
            type="button"
            animate={isTimerRunning ? { scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 1.5, repeat: isTimerRunning ? Infinity : 0 }}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-white shadow-xs transition-colors cursor-pointer ${
              isTimerRunning ? 'bg-[#00960F]' : 'bg-[#113353]'
            }`}
          >
            {isTimerRunning ? (
              <PyngynIcons.pause size={10} />
            ) : (
              <PyngynIcons.play size={9} className="ml-0.5" />
            )}
          </motion.button>

          {/* Running Timer Digits */}
          <span className="font-mono text-[12.5px] font-bold text-[#113353] tracking-wider">
            {formatTimer(timerSeconds)}
          </span>

          {/* Task Selector Dropdown */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-white rounded-[6px] border border-[#CBD5E1] shadow-3xs cursor-pointer">
            <span className="text-[9px] font-mono font-bold text-[#627D98] bg-[#F1F5F9] px-1 py-0.2 rounded">
              TASK
            </span>
            <span className="font-bold text-[11.5px] text-[#113353] max-w-[280px] truncate">
              Match GSTR-2B - resolve ₹3.2L ITC mismatch
            </span>
            <PyngynIcons.chevronDown size={11} className="text-[#627D98]" />
          </div>
        </div>

        <button type="button" className="text-[11px] font-bold text-[#004AAD] hover:underline cursor-pointer">
          Change item
        </button>
      </div>

      {/* 5. Table Header */}
      <div className="px-5 pt-1.5 flex flex-col flex-1 min-h-0 bg-white overflow-hidden">
        <div className="grid grid-cols-[24px_minmax(0,1.8fr)_108px_86px_74px_72px_80px_34px] gap-1.5 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#627D98] border-b border-[#E5EAF2] items-center bg-[#F8FAFC]">
          <div className="flex items-center justify-center">
            <span className="text-[9.5px] font-mono text-[#94A3B8]">T</span>
          </div>
          <div>NAME</div>
          <div className="flex items-center gap-1">
            <PyngynIcons.zap size={10} className="text-[#004AAD]" />
            <span>STATUS</span>
          </div>
          <div className="flex items-center gap-1">
            <PyngynIcons.clock size={10} className="text-[#627D98]" />
            <span>EFFORT</span>
          </div>
          <div className="flex items-center gap-1">
            <PyngynIcons.users size={10} className="text-[#627D98]" />
            <span>ASSIGNEES</span>
          </div>
          <div className="flex items-center gap-1">
            <PyngynIcons.flag size={10} className="text-[#627D98]" />
            <span>PRIORITY</span>
          </div>
          <div className="flex items-center gap-1">
            <PyngynIcons.calendar size={10} className="text-[#627D98]" />
            <span>DUE</span>
          </div>
          <div></div>
        </div>

        {/* Group Header: ASSIGNED TO ME 26 */}
        <div className="py-1.5 flex items-center gap-2">
          <PyngynIcons.chevronDown size={13} className="text-[#004AAD] cursor-pointer" />
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[5px] bg-[#004AAD] text-white text-[10.5px] font-bold shadow-xs">
            <PyngynIcons.zap size={10} className="text-white" />
            <span>ASSIGNED TO ME</span>
            <span className="ml-1 text-[9.5px] px-1 rounded-full bg-white/20">26</span>
          </div>
        </div>

        {/* 6. Table Rows - No Horizontal Scrollbar */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden divide-y divide-[#F1F5F9] border-t border-[#E5EAF2]">
          {tasks.map((task) => {
            const isItcTarget = task.id === 'my-itc-mismatch';

            return (
              <motion.div
                key={task.id}
                data-product-target={`mywork-row-${task.id}`}
                animate={
                  isItcTarget && isTaskSelected && !shouldReduceMotion
                    ? {
                        backgroundColor: isItcCompleted
                          ? '#F0FAF0'
                          : animStep >= 2
                          ? '#FAF5FF'
                          : '#EFF6FF',
                      }
                    : { backgroundColor: '#FFFFFF' }
                }
                transition={{ duration: 0.3 }}
                className={`grid grid-cols-[24px_minmax(0,1.8fr)_108px_86px_74px_72px_80px_34px] gap-1.5 items-center px-3 py-1.5 text-[11.5px] transition-colors relative border-l-2 ${
                  isItcTarget && isTaskSelected
                    ? isItcCompleted
                      ? 'border-l-[#00960F]'
                      : animStep >= 2
                      ? 'border-l-[#7E22CE]'
                      : 'border-l-[#004AAD]'
                    : 'border-l-transparent'
                }`}
              >
                {/* 1. Star + Checkbox */}
                <div className="flex items-center justify-center gap-1">
                  <span className={`cursor-pointer ${task.isStarred ? 'text-[#D97706]' : 'text-slate-300 hover:text-slate-400'}`}>
                    <PyngynIcons.star size={11} className={task.isStarred ? 'fill-[#D97706] text-[#D97706]' : 'text-slate-300'} />
                  </span>
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    readOnly
                    className="w-3.5 h-3.5 rounded border-[#CBD5E1] text-[#0066CC] focus:ring-0 cursor-pointer"
                  />
                </div>

                {/* 2. Title + Tags */}
                <div className="min-w-0 pr-1 flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className={`font-semibold text-[#113353] truncate ${
                        task.isCompleted ? 'line-through text-slate-400' : ''
                      }`}
                      title={task.title}
                    >
                      {task.title}
                    </span>

                    {task.isLocked && (
                      <PyngynIcons.lock size={10} className="text-[#94A3B8] shrink-0" />
                    )}

                    {task.isBlocked && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-[#FEF2F2] text-[#DC2626] text-[9px] font-bold shrink-0 border border-[#FECACA]">
                        <PyngynIcons.lock size={8} />
                        <span>Blocked</span>
                      </span>
                    )}
                  </div>

                  {task.actionIcon && (
                    <div className="flex items-center gap-1 shrink-0 text-[#94A3B8]">
                      <button type="button" className="hover:text-[#113353] cursor-pointer">
                        <PyngynIcons.edit size={10} />
                      </button>
                    </div>
                  )}
                </div>

                {/* 3. Status Pill */}
                <div>
                  <motion.span
                    key={task.status}
                    initial={isItcTarget ? { scale: 0.95 } : false}
                    animate={{ scale: 1 }}
                    whileHover={isItcTarget ? { scale: 1.05 } : {}}
                    whileTap={isItcTarget ? { scale: 0.95 } : {}}
                    onClick={() => {
                      if (isItcTarget) {
                        setShowManualCelebration((prev) => !prev);
                      }
                    }}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] text-[10px] font-bold truncate ${
                      isItcTarget ? 'cursor-pointer hover:shadow-xs' : ''
                    } ${
                      task.statusTone === 'blue'
                        ? 'bg-[#EBF5FF] text-[#0066CC] border border-[#BFDBFE]'
                        : task.statusTone === 'red'
                        ? 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]'
                        : task.statusTone === 'purple'
                        ? 'bg-[#FAF5FF] text-[#7E22CE] border border-[#E9D5FF]'
                        : task.statusTone === 'green'
                        ? 'bg-[#F0FAF0] text-[#00960F] border border-[#B5EDB9]'
                        : 'bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]'
                    }`}
                  >
                    {task.statusTone === 'green' && (
                      <PyngynIcons.check size={9} className="text-[#00960F] shrink-0" />
                    )}
                    <span>{task.status}</span>
                  </motion.span>
                </div>

                {/* 4. Effort Progress */}
                <div className="flex items-center gap-1">
                  <span className={`text-[10px] font-mono font-medium flex items-center gap-0.5 ${
                    task.effortColor === 'orange' ? 'text-[#D97706]' : 'text-[#627D98]'
                  }`}>
                    <PyngynIcons.clock size={9} className="shrink-0 text-[#627D98]" />
                    <span>{task.effortSpent}/{task.effortTotal}h</span>
                  </span>
                  <div className="w-8 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <motion.div
                      animate={{
                        width: `${Math.min(100, (task.effortSpent / task.effortTotal) * 100)}%`,
                      }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className={`h-full rounded-full ${
                        task.effortColor === 'green'
                          ? 'bg-[#00960F]'
                          : task.effortColor === 'teal'
                          ? 'bg-[#0D9488]'
                          : task.effortColor === 'orange'
                          ? 'bg-[#D97706]'
                          : 'bg-[#627D98]'
                      }`}
                    />
                  </div>
                </div>

                {/* 5. Assignees */}
                <div className="flex items-center -space-x-1">
                  {task.assignees.map((assignee, aIdx) => (
                    <span
                      key={aIdx}
                      style={{ backgroundColor: assignee.color }}
                      className="w-4.5 h-4.5 rounded-[4px] text-white text-[8px] font-bold flex items-center justify-center ring-1 ring-white relative shrink-0"
                    >
                      {assignee.initials}
                      {assignee.isOnline && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00960F] border border-white absolute -bottom-0.5 -right-0.5" />
                      )}
                    </span>
                  ))}
                  {task.assignees.length === 1 && task.assignees[0].name && (
                    <span className="ml-1 text-[10px] text-[#475569] truncate max-w-[50px]">
                      {task.assignees[0].name}
                    </span>
                  )}
                </div>

                {/* 6. Priority */}
                <div className="flex items-center gap-1">
                  <motion.span
                    key={task.priority}
                    animate={isItcTarget && animStep === 4 ? { scale: [1, 1.25, 1] } : {}}
                    transition={{ duration: 0.4 }}
                    className={`text-[10.5px] font-bold flex items-center gap-1 ${
                      task.priorityColor === 'red'
                        ? 'text-[#DC2626]'
                        : task.priorityColor === 'amber'
                        ? 'text-[#D97706]'
                        : task.priorityColor === 'blue'
                        ? 'text-[#0066CC]'
                        : 'text-[#627D98]'
                    }`}
                  >
                    <PyngynIcons.flag size={9} className="shrink-0" />
                    <span>{task.priority}</span>
                  </motion.span>
                </div>

                {/* 7. Due Date */}
                <div className="flex items-center gap-1 font-mono text-[10px]">
                  <PyngynIcons.calendar size={9} className="shrink-0 text-slate-400" />
                  <span className={`font-bold ${task.dueDate === 'Tomorrow' ? 'text-[#627D98]' : 'text-[#DC2626]'}`}>
                    {task.dueDate}
                  </span>

                  {task.hasTimerButton && (
                    <button type="button" className="text-[#004AAD] ml-0.5 hover:text-[#002D6B]">
                      <PyngynIcons.clock size={9} />
                    </button>
                  )}
                </div>

                {/* 8. Client Shortcode */}
                <div className="text-[9.5px] font-mono text-[#627D98] text-right font-medium">
                  {task.clientShort}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const celebrationElement = (
    <AnimatePresence>
      {(animStep === 5 || showManualCelebration || alwaysShowCelebration) && (
        <div className="absolute top-[75px] sm:top-[115px] right-2 sm:right-6 z-50 pointer-events-none drop-shadow-2xl origin-top-right scale-[0.72] sm:scale-100 max-w-[calc(100%-16px)]">
          <PyngynCelebrationOverlay
            title="Verified ₹3.2L ITC Match"
            subtitle="Horizon Exports · Reconciled with GSTR-2B"
            statusText="Filed"
            avatarSrc="/team/vivek-pandey.png"
            mascotSrc="/mascot/pyngyn-insights.png"
            showCursor={true}
            cursorOffset={{ x: 140, y: 14 }}
          />
        </div>
      )}
    </AnimatePresence>
  );

  if (standalone) {
    return (
      <div className={`relative w-full overflow-visible ${className}`}>
        <PyngynProductShell
          activeRailItem="home"
          sidebarVariant="home"
          selectedClientId={undefined}
          showAlertBanner={true}
          alertText="GSTR-3B Overdue · 3 not ready +2"
          showBottomTimer={true}
          bottomActiveTaskTitle="[Oswal Exports] GSTR-1 sales ledger ..."
          bottomClientName="Oswal Exports"
          className="w-full h-full rounded-[14px]"
        >
          {content}
        </PyngynProductShell>

        {/* Floating Celebration Overlay on top / outer side */}
        {celebrationElement}
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-visible ${className}`}>
      {content}
      {celebrationElement}
    </div>
  );
};
