'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PyngynIcons } from './PyngynIcons';
import { PyngynProductShell } from './PyngynProductShell';

export interface PyngynMyWorkViewProps {
  onViewChange?: (view: 'list' | 'board' | 'calendar' | 'timeline') => void;
  className?: string;
  standalone?: boolean;
  autoPlay?: boolean;
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
  status: 'In Progress' | 'Internal Review' | 'Blocked' | 'To Do' | 'Filed / Completed';
  statusTone: 'blue' | 'purple' | 'red' | 'gray' | 'green';
  effortSpent: number;
  effortTotal: number;
  effortColor: 'green' | 'orange' | 'gray' | 'teal';
  assignees: MyWorkAssignee[];
  priority: 'High' | 'Urgent' | 'Normal' | 'Low';
  priorityColor: 'amber' | 'red' | 'slate' | 'gray';
  dueDate: string;
  dueTone: 'red' | 'gray';
  clientShort: string;
  clientFullName: string;
  isStarred: boolean;
  isBlocked?: boolean;
  isCompleted?: boolean;
  showTimerIcon?: boolean;
}

export const PyngynMyWorkView: React.FC<PyngynMyWorkViewProps> = ({
  onViewChange,
  className = '',
  standalone = false,
  autoPlay = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Active navigation tab & view shape
  const [activeTab, setActiveTab] = useState<'tasks' | 'engagements' | 'timesheet' | 'shared'>('tasks');
  const [activeShape, setActiveShape] = useState<'list' | 'board' | 'calendar' | 'timeline'>('list');
  const [activeFilterScope, setActiveFilterScope] = useState<'all' | 'assigned'>('all');

  // AUTOMATED LIFECYCLE ANIMATION STATE:
  // Step 0: GSTR-1 In Progress (highlighted), GSTR-3B In Progress (2.5/4h)
  // Step 1: GSTR-3B highlights -> In Progress -> Internal Review, effort 2.5h -> 3.5h
  // Step 2: GSTR-3B Internal Review -> Filed / Completed, effort 4/4h (100% full green)
  const [animStep, setAnimStep] = useState<0 | 1 | 2>(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Automated workflow loop
  useEffect(() => {
    if (!autoPlay || shouldReduceMotion) return;

    let timeout: NodeJS.Timeout;

    if (animStep === 0) {
      // Step 0: Initial state hold 2.8s
      timeout = setTimeout(() => {
        setAnimStep(1);
      }, 2800);
    } else if (animStep === 1) {
      // Step 1: Transition to Internal Review, hold 3.0s
      timeout = setTimeout(() => {
        setAnimStep(2);
      }, 3000);
    } else if (animStep === 2) {
      // Step 2: Transition to Filed / Completed, hold 3.5s then loop back
      timeout = setTimeout(() => {
        setAnimStep(0);
      }, 3500);
    }

    return () => clearTimeout(timeout);
  }, [animStep, autoPlay, shouldReduceMotion]);

  // Subtle running timer simulation
  useEffect(() => {
    if (!autoPlay || shouldReduceMotion) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev + 1) % 3600);
    }, 1000);
    return () => clearInterval(interval);
  }, [autoPlay, shouldReduceMotion]);

  const formatTimer = (s: number) => {
    const mins = String(Math.floor(s / 60)).padStart(2, '0');
    const secs = String(s % 60).padStart(2, '0');
    return `00:${mins}:${secs}`;
  };

  // 8 Exact Real Accounting Tasks from the Screenshot
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
      dueTone: 'red',
      clientShort: 'Os...',
      clientFullName: 'Oswal Exports',
      isStarred: false,
    },
    {
      id: 'my-gstr3b',
      title: 'GSTR-3B Monthly Return Filing (August 2026)',
      // Animated status: In Progress -> Internal Review -> Filed / Completed
      status:
        animStep === 0
          ? 'In Progress'
          : animStep === 1
          ? 'Internal Review'
          : 'Filed / Completed',
      statusTone:
        animStep === 0
          ? 'blue'
          : animStep === 1
          ? 'purple'
          : 'green',
      // Animated effort: 2.5h -> 3.5h -> 4h
      effortSpent:
        animStep === 0
          ? 2.5
          : animStep === 1
          ? 3.5
          : 4,
      effortTotal: 4,
      effortColor: animStep === 2 ? 'green' : 'teal',
      assignees: [
        { initials: 'NJ', color: '#7E22CE' },
        { initials: 'PA', color: '#EC4899', isOnline: true },
      ],
      priority: 'High',
      priorityColor: 'amber',
      dueDate: '20 Sep',
      dueTone: 'red',
      clientShort: 'Os...',
      clientFullName: 'Oswal Exports',
      isStarred: false,
      isCompleted: animStep === 2,
    },
    {
      id: 'my-itc-mismatch',
      title: 'Match GSTR-2B - resolve ₹3.2L ITC mismatch',
      status: 'Blocked',
      statusTone: 'red',
      effortSpent: 4.5,
      effortTotal: 8,
      effortColor: 'teal',
      assignees: [
        { initials: 'NJ', color: '#7E22CE' },
        { initials: 'PA', color: '#EC4899' },
        { initials: 'AS', color: '#0D9488' },
      ],
      priority: 'High',
      priorityColor: 'amber',
      dueDate: '18 Sep',
      dueTone: 'red',
      clientShort: 'Ba...',
      clientFullName: 'Bansal Hardware',
      isStarred: true,
      isBlocked: true,
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
      dueTone: 'red',
      clientShort: 'Os...',
      clientFullName: 'Oswal Exports',
      isStarred: false,
    },
    {
      id: 'my-mis-late',
      title: 'Investor MIS - 9 days late',
      status: 'To Do',
      statusTone: 'gray',
      effortSpent: 5.5,
      effortTotal: 6,
      effortColor: 'orange',
      assignees: [
        { initials: 'NJ', color: '#7E22CE' },
        { initials: 'PA', color: '#EC4899' },
      ],
      priority: 'Urgent',
      priorityColor: 'red',
      dueDate: '07 Sep',
      dueTone: 'red',
      clientShort: 'Ze...',
      clientFullName: 'Zenith Logistics',
      isStarred: true,
      showTimerIcon: true,
    },
    {
      id: 'my-adv-tax',
      title: 'Advance tax computation',
      status: 'To Do',
      statusTone: 'gray',
      effortSpent: 2,
      effortTotal: 5,
      effortColor: 'gray',
      assignees: [
        { initials: 'NJ', color: '#7E22CE', name: 'Nikhil Jain' },
      ],
      priority: 'Urgent',
      priorityColor: 'red',
      dueDate: '15 Sep',
      dueTone: 'red',
      clientShort: 'Ad...',
      clientFullName: 'Aditya Retail',
      isStarred: false,
      isBlocked: true,
    },
    {
      id: 'my-el-signed',
      title: 'Engagement letter signed',
      status: 'Filed / Completed',
      statusTone: 'green',
      effortSpent: 1,
      effortTotal: 1,
      effortColor: 'orange',
      assignees: [
        { initials: 'NJ', color: '#7E22CE', name: 'Nikhil Jain' },
      ],
      priority: 'Low',
      priorityColor: 'gray',
      dueDate: '01 Sep',
      dueTone: 'red',
      clientShort: 'Os...',
      clientFullName: 'Oswal Exports',
      isStarred: true,
      isCompleted: true,
    },
    {
      id: 'my-rfd-01',
      title: 'RFD-01 refund filing - export accumulated ITC',
      status: 'Internal Review',
      statusTone: 'purple',
      effortSpent: 6,
      effortTotal: 10,
      effortColor: 'teal',
      assignees: [
        { initials: 'NJ', color: '#7E22CE' },
        { initials: 'PA', color: '#EC4899' },
      ],
      priority: 'High',
      priorityColor: 'amber',
      dueDate: 'Tomorrow',
      dueTone: 'gray',
      clientShort: 'Os...',
      clientFullName: 'Oswal Exports',
      isStarred: false,
    },
  ];

  const mainContent = (
    <div
      ref={containerRef}
      data-product-target="my-work-view-root"
      className={`w-full h-full flex flex-col bg-white text-[#113353] select-none font-sans overflow-hidden ${className}`}
    >
      {/* 1. View Header with Breadcrumbs & Title */}
      <div className="h-[48px] px-4 sm:px-6 bg-white border-b border-[#E5EAF2] flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#627D98]">
            <span>Nikhil Jain &amp; Associates CA</span>
            <span>/</span>
            <span className="text-[#113353] font-semibold">My Work</span>
          </div>
          <div className="flex items-center gap-2">
            <PyngynIcons.list size={15} className="text-[#113353]" />
            <h1 className="text-[17px] font-black text-[#113353] tracking-tight flex items-center gap-1.5">
              <span>My Work</span>
              <PyngynIcons.chevronDown size={13} className="text-[#627D98] cursor-pointer" />
              <PyngynIcons.star size={13} className="text-[#94A3B8] hover:text-[#D97706] cursor-pointer" />
            </h1>
          </div>
        </div>

        <button
          type="button"
          data-product-target="add-task-btn"
          className="h-[30px] px-3 bg-[#113353] hover:bg-[#0B2238] text-white text-[12px] font-bold rounded-[7px] flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors shrink-0"
        >
          <PyngynIcons.plus size={13} />
          <span>Add Task</span>
        </button>
      </div>

      {/* 2. Primary Tabs: My Tasks (48) | My Engagements (32) | My Timesheet | Shared with Me (39) */}
      <div className="h-[38px] px-4 sm:px-6 bg-white border-b border-[#E5EAF2] flex items-center justify-between text-[12px] font-medium shrink-0">
        <div className="flex items-center gap-1 h-full overflow-x-auto no-scrollbar">
          {[
            { id: 'tasks', label: 'My Tasks', count: 48, icon: <PyngynIcons.checkSquare size={13} /> },
            { id: 'engagements', label: 'My Engagements', count: 32, icon: <PyngynIcons.folder size={13} /> },
            { id: 'timesheet', label: 'My Timesheet', icon: <PyngynIcons.clock size={13} /> },
            { id: 'shared', label: 'Shared with Me', count: 39, icon: <PyngynIcons.user size={13} /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`h-full px-3 flex items-center gap-1.5 border-b-2 font-medium cursor-pointer transition-colors whitespace-nowrap -mb-[1px] ${
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

        {/* View Switcher: List, Board, Calendar, Timeline */}
        <div className="flex items-center gap-1 bg-[#F8FAFC] p-0.5 rounded-[7px] border border-[#CBD5E1]">
          {[
            { id: 'list', label: 'List', icon: <PyngynIcons.list size={12} /> },
            { id: 'board', label: 'Board', icon: <PyngynIcons.kanban size={12} /> },
            { id: 'calendar', label: 'Calendar', icon: <PyngynIcons.calendar size={12} /> },
            { id: 'timeline', label: 'Timeline', icon: <PyngynIcons.timeline size={12} /> },
          ].map((view) => (
            <button
              key={view.id}
              type="button"
              onClick={() => {
                setActiveShape(view.id as any);
                onViewChange?.(view.id as any);
              }}
              className={`px-2 py-0.5 rounded-[5px] text-[11px] font-bold flex items-center gap-1 transition-all ${
                activeShape === view.id
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

      {/* 3. Toolbar Row with Exact Screenshot Filters */}
      <div className="px-4 sm:px-6 py-2 bg-white border-b border-[#E5EAF2] flex items-center justify-between gap-2 text-[11.5px] shrink-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button type="button" className="px-2.5 py-1 rounded-[6px] border border-[#CBD5E1] bg-white text-[#113353] font-semibold flex items-center gap-1.5 shadow-3xs">
            <PyngynIcons.filter size={12} className="text-[#627D98]" />
            <span>Filter</span>
            <PyngynIcons.chevronDown size={10} className="text-[#627D98]" />
          </button>
          <button type="button" className="px-2.5 py-1 rounded-[6px] border border-[#CBD5E1] bg-white text-[#113353] font-semibold flex items-center gap-1.5 shadow-3xs">
            <PyngynIcons.sort size={12} className="text-[#627D98]" />
            <span>Sort</span>
            <PyngynIcons.chevronDown size={10} className="text-[#627D98]" />
          </button>
          <button type="button" className="px-2.5 py-1 rounded-[6px] border border-[#CBD5E1] bg-white text-[#113353] font-semibold flex items-center gap-1.5 shadow-3xs">
            <PyngynIcons.grid size={12} className="text-[#627D98]" />
            <span>Group by: Due Date</span>
            <PyngynIcons.chevronDown size={10} className="text-[#627D98]" />
          </button>
          <button type="button" className="px-2.5 py-1 rounded-[6px] border border-[#CBD5E1] bg-white text-[#113353] font-semibold flex items-center gap-1.5 shadow-3xs">
            <span>All Tasks</span>
            <span className="text-[10px] bg-[#E5EAF2] px-1 rounded-full text-[#627D98] font-bold">48</span>
            <PyngynIcons.chevronDown size={10} className="text-[#627D98]" />
          </button>
          <button type="button" className="px-2.5 py-1 rounded-[6px] border border-[#CBD5E1] bg-white text-[#113353] font-semibold flex items-center gap-1.5 shadow-3xs">
            <span>All Engagements</span>
            <span className="text-[10px] bg-[#E5EAF2] px-1 rounded-full text-[#627D98] font-bold">38</span>
            <PyngynIcons.chevronDown size={10} className="text-[#627D98]" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button type="button" className="w-7 h-7 rounded-[6px] border border-[#CBD5E1] hover:bg-[#F8FAFC] flex items-center justify-center text-[#627D98] shadow-3xs">
            <PyngynIcons.star size={13} className="fill-[#113353] text-[#113353]" />
          </button>
          <button type="button" className="w-7 h-7 rounded-[6px] border border-[#CBD5E1] hover:bg-[#F8FAFC] flex items-center justify-center text-[#627D98] shadow-3xs">
            <PyngynIcons.sliders size={13} />
          </button>

          {/* Dual Assignee Avatars */}
          <div className="flex items-center -space-x-1.5 ml-1">
            <span className="w-5 h-5 rounded-full bg-[#7E22CE] text-white text-[8.5px] font-bold flex items-center justify-center ring-2 ring-white">PS</span>
            <span className="w-5 h-5 rounded-full bg-[#004AAD] text-white text-[8.5px] font-bold flex items-center justify-center ring-2 ring-white">RM</span>
            <span className="w-5 h-5 rounded-full bg-[#EC4899] text-white text-[8.5px] font-bold flex items-center justify-center ring-2 ring-white">IG</span>
            <span className="w-5 h-5 rounded-full bg-[#E5EAF2] text-[#627D98] text-[8.5px] font-bold flex items-center justify-center ring-2 ring-white">+2</span>
          </div>

          <button type="button" className="px-2 py-1 rounded-[6px] border border-[#CBD5E1] text-[11px] font-semibold text-[#113353] shadow-3xs hover:bg-[#F8FAFC]">
            Save View
          </button>

          <div className="w-[110px] bg-white border border-[#CBD5E1] rounded-[6px] px-2 py-1 flex items-center gap-1 text-[11px] text-[#627D98] shadow-3xs">
            <PyngynIcons.search size={11} />
            <span>Search...</span>
          </div>

          <button type="button" className="w-7 h-7 rounded-[6px] border border-[#CBD5E1] text-[#627D98] flex items-center justify-center shadow-3xs hover:bg-[#F8FAFC]">
            <span className="text-[12px] font-bold">★ ...</span>
          </button>
        </div>
      </div>

      {/* 4. Active Execution Timer Bar (Above table) */}
      <div
        data-product-target="inline-active-timer-bar"
        className="px-4 sm:px-6 py-2 bg-[#F8FAFC] border-b border-[#E5EAF2] flex items-center justify-between gap-3 text-[12px] shrink-0"
      >
        <div className="flex items-center gap-3">
          {/* Circular Play Button */}
          <button
            type="button"
            className="w-7 h-7 rounded-full bg-[#113353] text-white flex items-center justify-center shadow-xs cursor-pointer hover:bg-[#0B2238] transition-colors"
          >
            <PyngynIcons.play size={11} className="ml-0.5" />
          </button>

          {/* Monospace Timer */}
          <span className="font-mono font-bold text-[13px] text-[#113353] bg-white px-2.5 py-0.5 rounded-[5px] border border-[#CBD5E1] shadow-3xs">
            {formatTimer(timerSeconds)}
          </span>

          {/* Selected Task Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#CBD5E1] rounded-[6px] cursor-pointer shadow-3xs">
            <span className="text-[10px] font-bold text-[#627D98] uppercase">TASK</span>
            <span className="font-semibold text-[#113353] text-[12px]">
              Match GSTR-2B - resolve ₹3.2L ITC mismatch
            </span>
            <PyngynIcons.chevronDown size={11} className="text-[#627D98]" />
          </div>
        </div>

        <button
          type="button"
          className="text-[#004AAD] hover:underline font-semibold text-[11.5px] cursor-pointer"
        >
          Change item
        </button>
      </div>

      {/* 5. Main Task Table Body */}
      <div className="flex-1 overflow-hidden px-4 sm:px-6 py-2 flex flex-col min-h-0">
        {/* Table Column Header */}
        <div className="grid grid-cols-[24px_minmax(260px,2fr)_125px_110px_100px_95px_105px_60px] gap-2 px-3 py-1.5 text-[10.5px] font-extrabold uppercase tracking-wider text-[#627D98] border-b border-[#E5EAF2] items-center bg-[#F8FAFC]">
          <div className="flex items-center justify-center">
            <span className="text-[10px]">T</span>
          </div>
          <div>NAME</div>
          <div>STATUS</div>
          <div>EFFORT</div>
          <div>ASSIGNEES</div>
          <div>PRIORITY</div>
          <div>DUE</div>
          <div className="text-right">FILES</div>
        </div>

        {/* Group Header Banner: ASSIGNED TO ME 26 */}
        <div className="my-1.5 flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[5px] bg-[#004AAD] text-white text-[11px] font-bold shadow-xs">
            <PyngynIcons.user size={11} />
            <span>ASSIGNED TO ME</span>
            <span className="ml-1 text-[10px] px-1 rounded-full bg-white/20">26</span>
          </div>
        </div>

        {/* Table Rows Container */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#E5EAF2] border border-[#CBD5E1]/80 rounded-[6px] bg-white shadow-2xs">
          {tasks.map((task) => {
            const isGstr1 = task.id === 'my-gstr1';
            const isGstr3b = task.id === 'my-gstr3b';
            const isRowHighlighted = (isGstr1 && animStep === 0) || (isGstr3b && animStep >= 1);

            return (
              <motion.div
                key={task.id}
                data-product-target={`my-task-row-${task.id}`}
                animate={
                  isRowHighlighted && !shouldReduceMotion
                    ? {
                        backgroundColor: isGstr3b && animStep === 2 ? '#F0FAF0' : '#F8FAFC',
                      }
                    : { backgroundColor: '#FFFFFF' }
                }
                transition={{ duration: 0.3 }}
                className={`grid grid-cols-[24px_minmax(260px,2fr)_125px_110px_100px_95px_105px_60px] gap-2 items-center px-3 py-1.5 text-[12px] border-l-2 transition-all ${
                  isGstr3b && animStep >= 1
                    ? animStep === 2
                      ? 'border-l-[#00960F]'
                      : 'border-l-[#7E22CE]'
                    : isGstr1 && animStep === 0
                    ? 'border-l-[#004AAD]'
                    : 'border-l-transparent hover:border-l-slate-300'
                }`}
              >
                {/* Checkbox & Star */}
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    readOnly
                    className="w-3.5 h-3.5 rounded border-[#CBD5E1] text-[#004AAD] focus:ring-0 cursor-pointer"
                  />
                </div>

                {/* Title + Star + Blocked Tag */}
                <div className="min-w-0 pr-2 flex items-center gap-1.5">
                  <PyngynIcons.star
                    size={12}
                    className={`shrink-0 ${
                      task.isStarred
                        ? 'text-[#D97706] fill-[#D97706]'
                        : 'text-slate-300'
                    }`}
                  />
                  <span
                    className={`font-semibold text-[#113353] truncate ${
                      task.isCompleted ? 'line-through text-slate-400' : ''
                    }`}
                    title={task.title}
                  >
                    {task.title}
                  </span>

                  {task.isBlocked && (
                    <span className="inline-flex items-center gap-1 px-1 py-0.2 rounded bg-[#FEF2F2] text-[#DC2626] text-[9.5px] font-bold shrink-0 border border-[#FECACA]">
                      <PyngynIcons.lock size={8} />
                      <span>Blocked</span>
                    </span>
                  )}
                </div>

                {/* Status Pill */}
                <div>
                  <motion.span
                    key={task.status}
                    initial={isGstr3b ? { scale: 0.95, opacity: 0.8 } : false}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] text-[10.5px] font-bold truncate ${
                      task.statusTone === 'blue'
                        ? 'bg-[#EEF5FF] text-[#004AAD] border border-[#C2DCFF]'
                        : task.statusTone === 'red'
                        ? 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]'
                        : task.statusTone === 'purple'
                        ? 'bg-[#FAF5FF] text-[#7E22CE] border border-[#E9D5FF]'
                        : task.statusTone === 'green'
                        ? 'bg-[#F0FAF0] text-[#00960F] border border-[#B5EDB9]'
                        : 'bg-[#F8FAFC] text-[#627D98] border border-[#CBD5E1]'
                    }`}
                  >
                    {task.statusTone === 'green' && <span className="text-[10px]">✓</span>}
                    <span>{task.status}</span>
                  </motion.span>
                </div>

                {/* Effort Meter */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10.5px] font-mono font-medium text-[#627D98]">
                    ⏱ {task.effortSpent}/{task.effortTotal}h
                  </span>
                  <div className="w-9 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
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

                {/* Assignees */}
                <div className="flex items-center -space-x-1">
                  {task.assignees.map((assignee, aIdx) => (
                    <span
                      key={aIdx}
                      style={{ backgroundColor: assignee.color }}
                      className="w-5 h-5 rounded-[4px] text-white text-[8.5px] font-bold flex items-center justify-center ring-1 ring-white relative shrink-0"
                    >
                      {assignee.initials}
                      {assignee.isOnline && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00960F] border border-white absolute -bottom-0.5 -right-0.5" />
                      )}
                    </span>
                  ))}
                  {task.assignees.length === 1 && task.assignees[0].name && (
                    <span className="ml-1.5 text-[10.5px] text-[#627D98] truncate max-w-[60px]">
                      {task.assignees[0].name}
                    </span>
                  )}
                </div>

                {/* Priority */}
                <div className="flex items-center gap-1">
                  <span
                    className={`text-[11px] font-bold flex items-center gap-1 ${
                      task.priorityColor === 'red'
                        ? 'text-[#DC2626]'
                        : task.priorityColor === 'amber'
                        ? 'text-[#D97706]'
                        : 'text-[#627D98]'
                    }`}
                  >
                    <PyngynIcons.flag size={11} className="shrink-0" />
                    <span>{task.priority}</span>
                  </span>
                </div>

                {/* Due Date */}
                <div className="flex items-center gap-1.5 font-mono text-[10.5px]">
                  <span
                    className={`flex items-center gap-1 ${
                      task.dueTone === 'red'
                        ? 'text-[#DC2626] font-bold'
                        : 'text-[#627D98]'
                    }`}
                  >
                    <PyngynIcons.calendar size={11} className="shrink-0 opacity-75 inline" />
                    <span>{task.dueDate}</span>
                  </span>
                  {task.showTimerIcon && (
                    <span
                      className="text-[#627D98] hover:text-[#004AAD] cursor-pointer inline-flex items-center"
                      title="Start Timer for this task"
                    >
                      <PyngynIcons.clock size={11} />
                    </span>
                  )}
                </div>

                {/* Client Shortcode */}
                <div className="text-right text-[11px] font-semibold text-[#627D98] truncate">
                  {task.clientShort}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // If standalone is true, wrap in the complete Pyngyn Product Shell matching the full screenshot
  if (standalone) {
    return (
      <PyngynProductShell
        activeRailItem="home"
        sidebarVariant="home"
        showAlertBanner={true}
        alertText="GSTR-3B Overdue · 3 not ready +2"
        showBottomTimer={true}
        bottomActiveTaskTitle="GSTR-1 sales ledger matching & E-way bill validation"
        bottomClientName="Oswal Exports"
        className="w-full h-full rounded-none border-0 shadow-none"
      >
        {mainContent}
      </PyngynProductShell>
    );
  }

  return mainContent;
};
