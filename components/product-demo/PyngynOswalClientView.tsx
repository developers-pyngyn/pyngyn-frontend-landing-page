'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PyngynIcons } from './PyngynIcons';
import { PyngynProductShell } from './PyngynProductShell';

export interface PyngynOswalClientViewProps {
  className?: string;
  standalone?: boolean;
  defaultViewShape?: 'list' | 'board' | 'calendar' | 'timeline';
  autoPlay?: boolean;
}

interface OswalAssignee {
  initials: string;
  color: string;
  isOnline?: boolean;
  name?: string;
}

interface OswalTaskItem {
  id: string;
  title: string;
  status: 'In Progress' | 'Internal Review' | 'Blocked' | 'To Do' | 'Filed / Completed';
  statusTone: 'blue' | 'purple' | 'red' | 'gray' | 'green';
  effortSpent: number;
  effortTotal: number;
  effortColor: 'green' | 'orange' | 'gray' | 'teal';
  assignees: OswalAssignee[];
  priority: 'High' | 'Urgent' | 'Normal' | 'Low';
  priorityColor: 'amber' | 'red' | 'slate' | 'gray';
  dueDate: string;
  dueDateNote?: string;
  isBlocked?: boolean;
  isLocked?: boolean;
  isCompleted?: boolean;
  category?: string;
}

export const PyngynOswalClientView: React.FC<PyngynOswalClientViewProps> = ({
  className = '',
  standalone = false,
  defaultViewShape = 'list',
  autoPlay = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Navigation tab and view shape (List vs Board)
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'engagements' | 'files' | 'portal'>('tasks');
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'filings' | 'review' | 'done'>('all');
  const [activeViewShape, setActiveViewShape] = useState<'list' | 'board' | 'calendar' | 'timeline'>(defaultViewShape);

  // AUTOMATED LIFECYCLE ANIMATION STATE:
  // Step 0: Baseline state (exact match to screenshot)
  // Step 1: Task row highlights (GSTR-1 soft blue focus highlight + left accent bar)
  // Step 2: Status dropdown opens (floating menu with status choices below In Progress pill)
  // Step 3: Status changes (selects 'Internal Review', dropdown closes, status pill morphs to purple)
  // Step 4: Progress updates (effort updates from 2/4h -> 3/4h with animated width bar)
  // Step 5: Priority changes (GSTR-3B changes from High -> Urgent with pulsing red flag)
  // Step 6: Due-date emphasis (Overdue date '02 Sep' pulses with statutory deadline highlight)
  // Step 7: Task completion (Checkbox checks ☑, title strikethrough, status turns green ✓ Filed / Completed, 4/4h 100%)
  // Step 8: Hold completed state before clean loop
  const [animStep, setAnimStep] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(0);

  useEffect(() => {
    if (!autoPlay || shouldReduceMotion) return;

    const timings = [
      2600, // 0: baseline hold
      2000, // 1: highlight
      2200, // 2: dropdown open
      2200, // 3: In Progress -> Internal Review
      2200, // 4: Progress effort increase
      2200, // 5: High -> Urgent priority change
      2400, // 6: Due-date emphasis
      3000, // 7: Task completed state
      1400, // 8: hold before loop
    ];

    const timer = setTimeout(() => {
      setAnimStep((prev) => ((prev + 1) % timings.length) as any);
    }, timings[animStep] || 2500);

    return () => clearTimeout(timer);
  }, [animStep, autoPlay, shouldReduceMotion]);

  // Dynamic values derived from animStep
  const gstr1Status: 'In Progress' | 'Internal Review' | 'Filed / Completed' =
    animStep >= 7 ? 'Filed / Completed' : animStep >= 3 ? 'Internal Review' : 'In Progress';
  const gstr1StatusTone =
    animStep >= 7 ? 'green' : animStep >= 3 ? 'purple' : 'blue';
  const isDropdownOpen = animStep === 2;

  const bankBlockedPriority: 'High' | 'Urgent' = animStep >= 5 ? 'Urgent' : 'High';
  const bankBlockedPriorityColor: 'amber' | 'red' = animStep >= 5 ? 'red' : 'amber';

  const gstr3bPriority: 'High' | 'Urgent' = animStep >= 5 ? 'Urgent' : 'High';
  const gstr3bPriorityColor: 'amber' | 'red' = animStep >= 5 ? 'red' : 'amber';

  const gstr1EffortSpent = animStep >= 7 ? 4 : animStep >= 4 ? 3 : 2;
  const gstr3bEffortSpent = animStep >= 4 ? 3.5 : 2.5;
  const isDueDateEmphasized = animStep === 6;

  // 10 Real Accounting Tasks for Oswal Exports
  const tasks: OswalTaskItem[] = [
    {
      id: 'task-gstr1',
      title: 'GSTR-1 sales ledger matching & E-way bill validation',
      status: gstr1Status,
      statusTone: gstr1StatusTone,
      effortSpent: gstr1EffortSpent,
      effortTotal: 4,
      effortColor: animStep >= 5 ? 'green' : 'teal',
      assignees: [
        { initials: 'NJ', color: '#7E22CE', isOnline: true },
        { initials: 'PA', color: '#EC4899', isOnline: true },
      ],
      priority: 'High',
      priorityColor: 'amber',
      dueDate: '02 Sep',
      isCompleted: animStep >= 5,
      category: 'GST',
    },
    {
      id: 'task-bank-blocked',
      title: 'Blocked on Client: Bank Statements & Purchase Registers Awaited',
      status: 'Blocked',
      statusTone: 'red',
      effortSpent: 1,
      effortTotal: 6,
      effortColor: 'gray',
      assignees: [{ initials: 'NJ', color: '#7E22CE', name: 'Nikhil' }],
      priority: bankBlockedPriority,
      priorityColor: bankBlockedPriorityColor,
      dueDate: '12 Sep',
      isBlocked: true,
      category: 'GST',
    },
    {
      id: 'task-time-log',
      title: 'Time Log: Bank Balance Sheet Draft (7h logged)',
      status: 'In Progress',
      statusTone: 'blue',
      effortSpent: 7,
      effortTotal: 7,
      effortColor: 'orange',
      assignees: [{ initials: 'NJ', color: '#7E22CE', name: 'Nikhil' }],
      priority: 'Urgent',
      priorityColor: 'red',
      dueDate: '15 Sep',
      isLocked: true,
      category: 'ACCOUNTING',
    },
    {
      id: 'task-dsc',
      title: 'DSC Passcode Token Expiry & Renewal Protocol',
      status: 'To Do',
      statusTone: 'gray',
      effortSpent: 3,
      effortTotal: 6,
      effortColor: 'green',
      assignees: [{ initials: 'NJ', color: '#7E22CE', name: 'Nikhil' }],
      priority: 'Urgent',
      priorityColor: 'red',
      dueDate: '18 Sep',
      category: 'CORPORATE',
    },
    {
      id: 'task-brc',
      title: 'BRC/FIRC reconciliation for Q2 export invoices',
      status: 'Blocked',
      statusTone: 'red',
      effortSpent: 2,
      effortTotal: 6,
      effortColor: 'gray',
      assignees: [
        { initials: 'NJ', color: '#7E22CE' },
        { initials: 'PA', color: '#EC4899' },
        { initials: 'NJ', color: '#00960F' },
      ],
      priority: 'Urgent',
      priorityColor: 'red',
      dueDate: '19 Sep',
      dueDateNote: '(partner)',
      isLocked: true,
      isBlocked: true,
      category: 'GST',
    },
    {
      id: 'task-gstr3b',
      title: 'GSTR-3B Monthly Return Filing (August 2026)',
      status: 'In Progress',
      statusTone: 'blue',
      effortSpent: gstr3bEffortSpent,
      effortTotal: 4,
      effortColor: 'teal',
      assignees: [
        { initials: 'NJ', color: '#7E22CE', isOnline: true },
        { initials: 'PA', color: '#EC4899', isOnline: true },
      ],
      priority: gstr3bPriority,
      priorityColor: gstr3bPriorityColor,
      dueDate: '20 Sep',
      category: 'GST',
    },
    {
      id: 'task-bank-reco',
      title: 'Bank reconciliation - SBI Export Account & HDFC Current',
      status: 'In Progress',
      statusTone: 'blue',
      effortSpent: 3,
      effortTotal: 5,
      effortColor: 'green',
      assignees: [{ initials: 'AS', color: '#004AAD', isOnline: true }],
      priority: 'High',
      priorityColor: 'amber',
      dueDate: '20 Sep',
      category: 'ACCOUNTING',
    },
    {
      id: 'task-shipping-bill',
      title: 'Shipping bill matching with ICEGATE custom records',
      status: 'In Progress',
      statusTone: 'blue',
      effortSpent: 3.5,
      effortTotal: 4,
      effortColor: 'orange',
      assignees: [{ initials: 'AS', color: '#004AAD', isOnline: true }],
      priority: 'Normal',
      priorityColor: 'slate',
      dueDate: '21 Sep',
      isLocked: true,
      category: 'CUSTOMS',
    },
    {
      id: 'task-rfd-01',
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
      dueDate: '24 Sep',
      category: 'GST',
    },
    {
      id: 'task-el-signed',
      title: 'Engagement letter signed',
      status: 'Filed / Completed',
      statusTone: 'green',
      effortSpent: 1,
      effortTotal: 1,
      effortColor: 'green',
      assignees: [{ initials: 'NJ', color: '#7E22CE' }],
      priority: 'Low',
      priorityColor: 'gray',
      dueDate: '01 Sep',
      isCompleted: true,
      category: 'ACCOUNTING',
    },
  ];

  const mainContent = (
    <div
      ref={containerRef}
      data-product-target="oswal-client-view-root"
      className={`w-full h-full flex flex-col bg-white text-[#113353] select-none font-sans overflow-hidden ${className}`}
    >
      {/* 1. Client Header Banner */}
      <div className="h-[48px] px-4 sm:px-6 bg-white border-b border-[#E5EAF2] flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <PyngynIcons.user size={16} className="text-[#004AAD]" />
          <h1 className="text-[17px] font-black text-[#113353] tracking-tight flex items-center gap-1.5 truncate">
            <span>Oswal Exports</span>
            <PyngynIcons.chevronDown size={13} className="text-[#627D98] cursor-pointer" />
            <PyngynIcons.star size={13} className="text-[#94A3B8] hover:text-[#D97706] cursor-pointer" />
          </h1>

          {/* Badges: AT-RISK, Tier 1, Default, More Actions */}
          <div className="flex items-center gap-1.5 shrink-0 ml-1">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] bg-[#FEF2F2] border border-[#FECACA] text-[10.5px] font-bold text-[#DC2626]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
              <span>AT-RISK</span>
            </span>

            <span className="px-2 py-0.5 rounded-[5px] bg-[#F1F5F9] border border-[#CBD5E1] text-[10.5px] font-bold text-[#113353]">
              Tier 1
            </span>

            <button
              type="button"
              className="px-2 py-0.5 rounded-[5px] bg-white border border-[#CBD5E1] text-[10.5px] font-bold text-[#113353] flex items-center gap-1 shadow-3xs hover:border-[#113353] cursor-pointer transition-colors"
            >
              <PyngynIcons.star size={11} className="text-[#D97706] fill-[#D97706]" />
              <span>Default</span>
            </button>

            <button
              type="button"
              className="px-2 py-0.5 rounded-[5px] bg-white border border-[#CBD5E1] text-[10.5px] font-medium text-[#627D98] flex items-center gap-1 cursor-pointer hover:text-[#113353]"
            >
              <PyngynIcons.sliders size={11} />
              <span>More Actions</span>
              <PyngynIcons.chevronDown size={10} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Client Primary Navigation Tabs: Overview | Tasks 14 | Engagements 2 | Files 7 | Client Portal | More | + View */}
      <div className="h-[38px] px-4 sm:px-6 bg-white border-b border-[#E5EAF2] flex items-center justify-between text-[12px] font-medium shrink-0">
        <div className="flex items-center gap-1 h-full overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: <PyngynIcons.timeline size={12} /> },
            { id: 'tasks', label: 'Tasks', count: 14, icon: <PyngynIcons.checkSquare size={12} /> },
            { id: 'engagements', label: 'Engagements', count: 2, icon: <PyngynIcons.folder size={12} /> },
            { id: 'files', label: 'Files', count: 7, icon: <PyngynIcons.clock size={12} /> },
            { id: 'portal', label: 'Client Portal', icon: <PyngynIcons.user size={12} /> },
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
            <span>More</span>
            <PyngynIcons.chevronDown size={11} />
          </button>
          <button type="button" className="h-full px-2 text-[#627D98] hover:text-[#113353] flex items-center gap-1 text-[11.5px] font-semibold">
            <span className="text-[#004AAD] font-bold">+</span>
            <span>View</span>
          </button>
        </div>

        {/* View Switcher: List vs Board vs Calendar vs Timeline */}
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
              onClick={() => setActiveViewShape(view.id as any)}
              className={`px-2 py-0.5 rounded-[5px] text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
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

      {/* 3. Sub-Tabs Bar: All Tasks (14) | Active Filings (12) | Review Queue (11) | Filed & Done (2) */}
      <div className="h-[34px] px-4 sm:px-6 bg-white border-b border-[#E5EAF2] flex items-center justify-between text-[11.5px] shrink-0">
        <div className="flex items-center gap-3">
          {[
            { id: 'all', label: 'All Tasks', count: 14 },
            { id: 'filings', label: 'Active Filings', count: 12 },
            { id: 'review', label: 'Review Queue', count: 11 },
            { id: 'done', label: 'Filed & Done', count: 2 },
          ].map((st) => {
            const isSubActive = activeSubTab === st.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => setActiveSubTab(st.id as any)}
                className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
                  isSubActive ? 'font-bold text-[#113353]' : 'text-[#627D98] hover:text-[#113353]'
                }`}
              >
                <span>{st.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSubActive ? 'bg-[#113353] text-white' : 'bg-[#E5EAF2] text-[#627D98]'
                  }`}
                >
                  {st.count}
                </span>
              </button>
            );
          })}
          <button type="button" className="text-[#627D98] hover:text-[#113353] flex items-center gap-1 font-medium">
            <span className="text-[#004AAD] font-bold">+</span>
            <span>View</span>
          </button>
        </div>
      </div>

      {/* 4. Controls Toolbar: Filter, Sort, Group by, + New Task, Avatars */}
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
            <span>{activeViewShape === 'board' ? 'Columns by: Due Date' : 'Group by: Due Date'}</span>
            <PyngynIcons.chevronDown size={10} className="text-[#627D98]" />
          </button>
          <button type="button" className="px-2.5 py-1 rounded-[6px] border border-[#CBD5E1] bg-white text-[#113353] font-semibold flex items-center gap-1.5 shadow-3xs">
            <span>All Tasks</span>
            <span className="text-[10px] bg-[#E5EAF2] px-1 rounded-full text-[#627D98] font-bold">14</span>
            <PyngynIcons.chevronDown size={10} className="text-[#627D98]" />
          </button>
          <button type="button" className="px-2.5 py-1 rounded-[6px] border border-[#CBD5E1] bg-white text-[#113353] font-semibold flex items-center gap-1.5 shadow-3xs">
            <span>All Engagements</span>
            <span className="text-[10px] bg-[#E5EAF2] px-1 rounded-full text-[#627D98] font-bold">14</span>
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

          {/* + New Task Button */}
          <button
            type="button"
            className="h-[28px] px-2.5 rounded-[6px] bg-[#113353] hover:bg-[#0B2238] text-white font-bold text-[11.5px] flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
          >
            <PyngynIcons.plus size={12} />
            <span>New Task</span>
          </button>

          {/* Assignees Stack */}
          <div className="flex items-center -space-x-1.5 ml-1">
            <span className="w-5 h-5 rounded-[5px] bg-[#7E22CE] text-white text-[8.5px] font-bold flex items-center justify-center ring-2 ring-white">PS</span>
            <span className="w-5 h-5 rounded-[5px] bg-[#004AAD] text-white text-[8.5px] font-bold flex items-center justify-center ring-2 ring-white">RM</span>
            <span className="w-5 h-5 rounded-[5px] bg-[#EC4899] text-white text-[8.5px] font-bold flex items-center justify-center ring-2 ring-white">IG</span>
            <span className="w-5 h-5 rounded-[5px] bg-[#E5EAF2] text-[#627D98] text-[8.5px] font-bold flex items-center justify-center ring-2 ring-white">+2</span>
          </div>

          <button type="button" className="px-2 py-1 rounded-[6px] border border-[#CBD5E1] text-[11px] font-semibold text-[#113353] shadow-3xs hover:bg-[#F8FAFC]">
            Save View
          </button>
          <button type="button" className="w-7 h-7 rounded-[6px] border border-[#CBD5E1] text-[#627D98] flex items-center justify-center shadow-3xs hover:bg-[#F8FAFC]">
            <span className="text-[12px] font-bold">...</span>
          </button>
        </div>
      </div>

      {/* 5. VIEW BODY: LIST VIEW (TABLE) OR BOARD VIEW (4 KANBAN COLUMNS) */}
      {activeViewShape === 'board' ? (
        /* KANBAN BOARD VIEW (Exact Replica of media_1790239896868.png) */
        <div className="flex-1 flex flex-col min-h-0 bg-[#F8FAFC] overflow-hidden">
          {/* Secondary Board Filter Bar */}
          <div className="px-4 sm:px-6 py-2 bg-white border-b border-[#E5EAF2] flex items-center justify-between text-[11.5px] text-[#627D98] shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] border border-[#CBD5E1] bg-white text-[#627D98]">
                <PyngynIcons.search size={12} />
                <span className="truncate">Search kanban cards by job tit</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-[6px] border border-[#CBD5E1] bg-white text-[#113353] font-medium">
                <span>All Priorities (14)</span>
                <PyngynIcons.chevronDown size={10} className="text-[#627D98]" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-[11px]">
              <PyngynIcons.kanban size={12} className="text-[#627D98]" />
              <span>14 items across 4 columns</span>
            </div>
          </div>

          {/* 4 Board Columns */}
          <div className="flex-1 overflow-x-auto p-4 grid grid-cols-4 gap-3.5 min-w-[1020px] max-w-full">
            {/* Column 1: Overdue & Due Today (9) */}
            <div className="flex flex-col bg-[#F1F5F9]/60 rounded-[10px] border border-[#CBD5E1] overflow-hidden">
              <div className="px-3 py-2 bg-white border-b border-[#CBD5E1] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-[4px] bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] flex items-center justify-center text-[10px]">
                    <PyngynIcons.alertTriangle size={11} className="text-[#DC2626]" />
                  </span>
                  <span className="font-bold text-[12px] text-[#113353]">Overdue &amp; Due Today</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">
                    9
                  </span>
                </div>
                <PyngynIcons.alertTriangle size={13} className="text-[#DC2626]" />
              </div>

              <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                {/* Card 1: GSTR-1 */}
                <div className="p-2.5 bg-white rounded-[8px] border border-[#CBD5E1] shadow-2xs hover:shadow-soft transition-all">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1">
                      <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">Oswal</span>
                      <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">GST</span>
                    </div>
                    <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200">HIGH</span>
                  </div>
                  <h4 className="font-bold text-[12px] text-[#113353] leading-snug">
                    GSTR-1 sales ledger matching &amp; E-way bill validation
                  </h4>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
                    <div className="flex items-center -space-x-1">
                      <span className="w-4 h-4 rounded-[4px] bg-[#7E22CE] text-white text-[8px] font-bold flex items-center justify-center ring-1 ring-white">NJ</span>
                      <span className="w-4 h-4 rounded-[4px] bg-[#EC4899] text-white text-[8px] font-bold flex items-center justify-center ring-1 ring-white">PA</span>
                    </div>
                    <span className="text-[#DC2626] font-bold flex items-center gap-0.5">
                      <PyngynIcons.calendar size={10} />
                      <span>09-02</span>
                    </span>
                    <span className="text-slate-500 font-mono flex items-center gap-1.5">
                      <span className="flex items-center gap-0.5"><PyngynIcons.checkSquare size={10} />5/5</span>
                      <span className="flex items-center gap-0.5"><PyngynIcons.clock size={10} />2h</span>
                    </span>
                  </div>
                </div>

                {/* Card 2: Blocked on Client */}
                <div className="p-2.5 bg-white rounded-[8px] border border-[#CBD5E1] shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1">
                      <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">Oswal</span>
                      <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">GST</span>
                    </div>
                    <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 border border-rose-200">URGENT</span>
                  </div>
                  <h4 className="font-bold text-[12px] text-[#113353] leading-snug">
                    Blocked on Client: Bank Statements &amp; Purchase Registers Awaited
                  </h4>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
                    <span className="w-4 h-4 rounded-[4px] bg-[#7E22CE] text-white text-[8px] font-bold flex items-center justify-center ring-1 ring-white">NJ</span>
                    <span className="text-[#DC2626] font-bold flex items-center gap-0.5">
                      <PyngynIcons.calendar size={10} />
                      <span>09-12</span>
                    </span>
                    <span className="text-slate-500 font-mono flex items-center gap-1.5">
                      <span className="flex items-center gap-0.5"><PyngynIcons.checkSquare size={10} />0/3</span>
                      <span className="flex items-center gap-0.5"><PyngynIcons.clock size={10} />1h</span>
                    </span>
                  </div>
                </div>

                {/* Card 3: Time Log */}
                <div className="p-2.5 bg-white rounded-[8px] border border-[#CBD5E1] shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1">
                      <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">Oswal</span>
                      <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">ACCOUNTING</span>
                    </div>
                    <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 border border-rose-200">URGENT</span>
                  </div>
                  <h4 className="font-bold text-[12px] text-[#113353] leading-snug">
                    Time Log: Bank Balance Sheet Draft (7h logged)
                  </h4>
                </div>
              </div>
            </div>

            {/* Column 2: Due This Week (7 Days) (2) */}
            <div className="flex flex-col bg-[#F1F5F9]/60 rounded-[10px] border border-[#CBD5E1] overflow-hidden">
              <div className="px-3 py-2 bg-white border-b border-[#CBD5E1] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-[4px] bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center text-[10px]">
                    <PyngynIcons.star size={10} className="fill-amber-700 text-amber-700" />
                  </span>
                  <span className="font-bold text-[12px] text-[#113353]">Due This Week (7 Days)</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    2
                  </span>
                </div>
                <PyngynIcons.calendar size={13} className="text-amber-700" />
              </div>

              <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                {/* Card 1: RFD-01 */}
                <div className="p-2.5 bg-white rounded-[8px] border border-[#CBD5E1] shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1">
                      <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">Oswal</span>
                      <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">GST</span>
                    </div>
                    <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200">HIGH</span>
                  </div>
                  <h4 className="font-bold text-[12px] text-[#113353] leading-snug">
                    RFD-01 refund filing - export accumulated ITC
                  </h4>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
                    <div className="flex items-center -space-x-1">
                      <span className="w-4 h-4 rounded-[4px] bg-[#7E22CE] text-white text-[8px] font-bold flex items-center justify-center ring-1 ring-white">NJ</span>
                      <span className="w-4 h-4 rounded-[4px] bg-[#EC4899] text-white text-[8px] font-bold flex items-center justify-center ring-1 ring-white">PA</span>
                    </div>
                    <span className="text-slate-600 font-bold flex items-center gap-0.5">
                      <PyngynIcons.calendar size={10} />
                      <span>09-24</span>
                    </span>
                    <span className="text-slate-500 font-mono flex items-center gap-1.5">
                      <span className="flex items-center gap-0.5"><PyngynIcons.checkSquare size={10} />0/10</span>
                      <span className="flex items-center gap-0.5"><PyngynIcons.clock size={10} />6h</span>
                    </span>
                  </div>
                </div>

                {/* Card 2: Foreign currency */}
                <div className="p-2.5 bg-white rounded-[8px] border border-[#CBD5E1] shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1">
                      <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">Oswal</span>
                      <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">ACCOUNTING</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-[12px] text-[#113353] leading-snug">
                    Foreign currency exchange fluctuation ledger scrutiny
                  </h4>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
                    <span className="w-4 h-4 rounded-[4px] bg-[#EC4899] text-white text-[8px] font-bold flex items-center justify-center ring-1 ring-white">PA</span>
                    <span className="text-slate-600 font-bold flex items-center gap-0.5">
                      <PyngynIcons.calendar size={10} />
                      <span>09-25</span>
                    </span>
                    <span className="text-slate-500 font-mono flex items-center gap-1.5">
                      <span className="flex items-center gap-0.5"><PyngynIcons.checkSquare size={10} />2/2</span>
                      <span className="flex items-center gap-0.5"><PyngynIcons.clock size={10} />2.5h</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Due Next Week (0) */}
            <div className="flex flex-col bg-[#F1F5F9]/60 rounded-[10px] border border-[#CBD5E1] overflow-hidden">
              <div className="px-3 py-2 bg-white border-b border-[#CBD5E1] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-[4px] bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center text-[10px]">
                    -
                  </span>
                  <span className="font-bold text-[12px] text-[#113353]">Due Next Week</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    0
                  </span>
                </div>
                <PyngynIcons.calendar size={13} className="text-blue-700" />
              </div>

              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center text-[#627D98]">
                <PyngynIcons.calendar size={24} className="text-blue-400 mb-2" />
                <span className="text-[11.5px] font-medium text-slate-500">No jobs in Due Next Week</span>
              </div>
            </div>

            {/* Column 4: Later & Filed (3) */}
            <div className="flex flex-col bg-[#F1F5F9]/60 rounded-[10px] border border-[#CBD5E1] overflow-hidden">
              <div className="px-3 py-2 bg-white border-b border-[#CBD5E1] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-[4px] bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center text-[10px]">
                    <PyngynIcons.check size={10} />
                  </span>
                  <span className="font-bold text-[12px] text-[#113353]">Later &amp; Filed</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    3
                  </span>
                </div>
                <PyngynIcons.clock size={13} className="text-emerald-700" />
              </div>

              <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                {/* Card 1: Engagement letter */}
                <div className="p-2.5 bg-white rounded-[8px] border border-[#CBD5E1] shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">ACCOUNTING</span>
                  </div>
                  <h4 className="font-bold text-[12px] text-[#113353] leading-snug">
                    Engagement letter signed
                  </h4>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
                    <span className="w-4 h-4 rounded-[4px] bg-[#7E22CE] text-white text-[8px] font-bold flex items-center justify-center ring-1 ring-white">NJ</span>
                    <span className="text-slate-500 flex items-center gap-0.5">
                      <PyngynIcons.calendar size={10} />
                      <span>09-01</span>
                    </span>
                    <span className="text-slate-500 font-mono flex items-center gap-1.5">
                      <span className="flex items-center gap-0.5"><PyngynIcons.checkSquare size={10} />1/1</span>
                      <span className="flex items-center gap-0.5"><PyngynIcons.clock size={10} />1h</span>
                    </span>
                  </div>
                </div>

                {/* Card 2: LUT validity */}
                <div className="p-2.5 bg-white rounded-[8px] border border-[#CBD5E1] shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">GST</span>
                  </div>
                  <h4 className="font-bold text-[12px] text-[#113353] leading-snug">
                    LUT validity check for FY 2026-27 exports
                  </h4>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
                    <span className="w-4 h-4 rounded-[4px] bg-[#0D9488] text-white text-[8px] font-bold flex items-center justify-center ring-1 ring-white">AS</span>
                    <span className="text-slate-500 flex items-center gap-0.5">
                      <PyngynIcons.calendar size={10} />
                      <span>09-05</span>
                    </span>
                    <span className="text-slate-500 font-mono flex items-center gap-1.5">
                      <span className="flex items-center gap-0.5"><PyngynIcons.checkSquare size={10} />1/1</span>
                      <span className="flex items-center gap-0.5"><PyngynIcons.clock size={10} />1h</span>
                    </span>
                  </div>
                </div>

                {/* Card 3: TDS return */}
                <div className="p-2.5 bg-white rounded-[8px] border border-[#CBD5E1] shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">ACCOUNTING</span>
                    <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200">HIGH</span>
                  </div>
                  <h4 className="font-bold text-[12px] text-[#113353] leading-snug">
                    TDS return Form 26Q preparation for Q2 payments
                  </h4>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
                    <span className="w-4 h-4 rounded-[4px] bg-[#0D9488] text-white text-[8px] font-bold flex items-center justify-center ring-1 ring-white">AS</span>
                    <span className="text-slate-500 flex items-center gap-0.5">
                      <PyngynIcons.calendar size={10} />
                      <span>10-15</span>
                    </span>
                    <span className="text-slate-500 font-mono flex items-center gap-1.5">
                      <span className="flex items-center gap-0.5"><PyngynIcons.checkSquare size={10} />0/3</span>
                      <span className="flex items-center gap-0.5"><PyngynIcons.clock size={10} />0h</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* TASK TABLE (LIST VIEW) WITH AUTOMATED LIFECYCLE ANIMATION */
        <div className="flex-1 overflow-hidden px-4 sm:px-6 py-2 flex flex-col min-h-0 bg-white">
          {/* Table Column Header */}
          <div className="grid grid-cols-[26px_minmax(280px,2fr)_130px_110px_100px_95px_105px] gap-2 px-3 py-1.5 text-[10.5px] font-extrabold uppercase tracking-wider text-[#627D98] border-b border-[#E5EAF2] items-center bg-[#F8FAFC]">
            <div className="flex items-center justify-center">
              <input type="checkbox" className="rounded border-[#CBD5E1]" readOnly />
            </div>
            <div>NAME</div>
            <div>STATUS</div>
            <div>EFFORT</div>
            <div>ASSIGNEE</div>
            <div>PRIORITY</div>
            <div>DUE</div>
          </div>

          {/* Group Header Banner: OVERDUE (PAST STATUTORY TARGET) 9 */}
          <div className="my-1.5 flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[5px] bg-[#DC2626] text-white text-[11px] font-bold shadow-xs">
              <PyngynIcons.alertTriangle size={11} />
              <span>OVERDUE (PAST STATUTORY TARGET)</span>
              <span className="ml-1 text-[10px] px-1 rounded-full bg-white/20">9</span>
            </div>
          </div>

          {/* Table Rows Container */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#E5EAF2] border border-[#CBD5E1]/80 rounded-[6px] bg-white shadow-2xs">
            {tasks.map((task) => {
              const isGstr1 = task.id === 'task-gstr1';
              const isGstr3b = task.id === 'task-gstr3b';
              const isBankBlocked = task.id === 'task-bank-blocked';
              const isTaskHighlighted = (isGstr1 && animStep >= 1 && animStep <= 7) || ((isGstr3b || isBankBlocked) && animStep === 5);

              return (
                <motion.div
                  key={task.id}
                  data-product-target={`oswal-row-${task.id}`}
                  animate={
                    isTaskHighlighted && !shouldReduceMotion
                      ? {
                          backgroundColor:
                            isGstr1 && animStep >= 7
                              ? '#F0FAF0'
                              : isGstr1 && animStep >= 3
                              ? '#FAF5FF'
                              : isBankBlocked && animStep === 5
                              ? '#FEF2F2'
                              : '#EEF5FF',
                        }
                      : { backgroundColor: '#FFFFFF' }
                  }
                  transition={{ duration: 0.3 }}
                  className={`grid grid-cols-[26px_minmax(280px,2fr)_130px_110px_100px_95px_105px] gap-2 items-center px-3 py-1.5 text-[12px] border-l-2 transition-all relative ${
                    isGstr1 && animStep >= 1
                      ? animStep >= 7
                        ? 'border-l-[#00960F]'
                        : animStep >= 3
                        ? 'border-l-[#7E22CE]'
                        : 'border-l-[#004AAD]'
                      : (isGstr3b || isBankBlocked) && animStep === 5
                      ? 'border-l-[#DC2626]'
                      : 'border-l-transparent hover:border-l-slate-300'
                  }`}
                >
                  {/* Checkbox */}
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      readOnly
                      className="w-3.5 h-3.5 rounded border-[#CBD5E1] text-[#004AAD] focus:ring-0 cursor-pointer"
                    />
                  </div>

                  {/* Title + Tags */}
                  <div className="min-w-0 pr-2 flex items-center gap-1.5">
                    <span
                      className={`font-semibold text-[#113353] truncate ${
                        task.isCompleted ? 'line-through text-slate-400' : ''
                      }`}
                      title={task.title}
                    >
                      {task.title}
                    </span>

                    {task.isLocked && (
                      <PyngynIcons.lock size={11} className="text-[#627D98] shrink-0" />
                    )}

                    {task.isBlocked && (
                      <span className="inline-flex items-center gap-1 px-1 py-0.2 rounded bg-[#FEF2F2] text-[#DC2626] text-[9.5px] font-bold shrink-0 border border-[#FECACA]">
                        <PyngynIcons.lock size={8} />
                        <span>Blocked</span>
                      </span>
                    )}
                  </div>

                  {/* Status Pill + Interactive Dropdown on Task 1 */}
                  <div className="relative">
                    <motion.span
                      key={task.status}
                      initial={isGstr1 ? { scale: 0.95, opacity: 0.8 } : false}
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
                      {task.statusTone === 'green' && <PyngynIcons.check size={10} />}
                      <span>{task.status}</span>
                    </motion.span>

                    {/* Status Dropdown Popover on Task 1 (Step 1) */}
                    {isGstr1 && isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[calc(100%+4px)] left-0 w-44 bg-white rounded-[8px] border border-[#CBD5E1] shadow-xl py-1 z-50 text-[11px]"
                      >
                        <div className="px-2.5 py-1 text-[9.5px] font-mono font-bold text-[#627D98] uppercase tracking-wider border-b border-[#E5EAF2]">
                          Status Options
                        </div>
                        {[
                          { label: 'To Do', color: 'text-slate-600', checked: false },
                          { label: 'In Progress', color: 'text-[#004AAD]', checked: true },
                          { label: 'Internal Review', color: 'text-[#7E22CE]', hovered: true },
                          { label: 'Blocked', color: 'text-[#DC2626]', checked: false },
                          { label: 'Filed / Completed', color: 'text-[#00960F]', checked: false },
                        ].map((opt, i) => (
                          <div
                            key={i}
                            className={`px-3 py-1 flex items-center justify-between font-medium ${opt.color} ${
                              opt.hovered
                                ? 'bg-[#EEF5FF] font-bold ring-1 ring-[#004AAD]/30'
                                : 'hover:bg-slate-50'
                            }`}
                          >
                            <span>{opt.label}</span>
                            {opt.checked && <PyngynIcons.check size={11} />}
                            {opt.hovered && <span className="text-[10px] text-[#004AAD] font-bold">Select</span>}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  {/* Effort Progress */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10.5px] font-mono font-medium text-[#627D98] flex items-center gap-1">
                      <PyngynIcons.clock size={10} className="shrink-0" />
                      <span>{task.effortSpent}/{task.effortTotal}h</span>
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
                        className="w-5 h-5 rounded-[5px] text-white text-[8.5px] font-bold flex items-center justify-center ring-1 ring-white relative shrink-0"
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

                  {/* Priority Flag */}
                  <div className="flex items-center gap-1">
                    <motion.span
                      key={task.priority}
                      animate={(isGstr3b || isBankBlocked) && animStep === 5 ? { scale: [1, 1.25, 1] } : {}}
                      transition={{ duration: 0.4 }}
                      className={`text-[11px] font-bold flex items-center gap-1 ${
                        task.priorityColor === 'red'
                          ? 'text-[#DC2626]'
                          : task.priorityColor === 'amber'
                          ? 'text-[#D97706]'
                          : 'text-[#627D98]'
                      }`}
                    >
                      <PyngynIcons.flag size={10} />
                      <span>{task.priority}</span>
                    </motion.span>
                  </div>

                  {/* Due Date */}
                  <div className="flex items-center gap-1 font-mono text-[10.5px]">
                    <motion.span
                      animate={
                        isGstr1 && isDueDateEmphasized
                          ? { scale: [1, 1.1, 1], backgroundColor: ['#FEF2F2', '#FEE2E2', '#FEF2F2'] }
                          : {}
                      }
                      transition={{ duration: 0.6, repeat: isDueDateEmphasized ? 2 : 0 }}
                      className="text-[#DC2626] font-bold px-1 py-0.5 rounded flex items-center gap-1"
                    >
                      <PyngynIcons.calendar size={10} />
                      <span>{task.dueDate}</span>
                    </motion.span>
                    {task.dueDateNote && (
                      <span className="text-[9.5px] text-[#627D98]">
                        {task.dueDateNote}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  // If standalone is true, wrap in the complete Pyngyn Product Shell
  if (standalone) {
    return (
      <PyngynProductShell
        activeRailItem="clients"
        sidebarVariant="clients"
        selectedClientId="oswal"
        showAlertBanner={true}
        alertText="GSTR-3B Overdue · 3 not ready +2"
        showBottomTimer={true}
        bottomActiveTaskTitle="[Oswal Exports] GSTR-1 sales ledger ..."
        bottomClientName="Oswal Exports"
        className="w-full h-full rounded-none border-0 shadow-none"
      >
        {mainContent}
      </PyngynProductShell>
    );
  }

  return mainContent;
};
