'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PyngynIcons } from './PyngynIcons';
import { PyngynProductShell } from './PyngynProductShell';

export interface PyngynTaskListViewProps {
  className?: string;
  standalone?: boolean;
  autoPlay?: boolean;
}

interface TaskAssignee {
  initials: string;
  color: string;
  isOnline?: boolean;
  name?: string;
}

interface TaskRowData {
  id: string;
  title: string;
  isLocked?: boolean;
  isBlocked?: boolean;
  blockedTag?: string;
  actionIcons?: boolean;
  isSelectedRow?: boolean;
  status: 'In Progress' | 'Internal Review' | 'Blocked' | 'To Do' | 'Filed / Completed';
  statusTone: 'blue' | 'purple' | 'red' | 'gray' | 'green';
  effortSpent: number;
  effortTotal: number;
  effortColor: 'green' | 'orange' | 'gray' | 'teal';
  assignees: TaskAssignee[];
  priority: 'High' | 'Urgent' | 'Medium' | 'Low';
  priorityColor: 'amber' | 'red' | 'blue' | 'gray';
  dueDate: string;
  dueDateNote?: string;
  isCompleted?: boolean;
}

export const PyngynTaskListView: React.FC<PyngynTaskListViewProps> = ({
  className = '',
  standalone = false,
  autoPlay = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'engagements' | 'files' | 'portal'>('tasks');
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'filings' | 'review' | 'done'>('all');
  const [activeViewShape, setActiveViewShape] = useState<'list' | 'board' | 'calendar' | 'timeline'>('list');

  // AUTOMATIC REALISTIC INTERACTIONS (7 Steps):
  // 0: Baseline state (exact match to screenshot)
  // 1: Task row highlights (GSTR-1 soft blue focus highlight + left accent bar)
  // 2: Status dropdown opens (floating menu with status choices below In Progress pill)
  // 3: Status changes (selects 'Internal Review', dropdown closes, status pill morphs to purple)
  // 4: Progress updates (effort updates from 2/4h -> 3/4h with animated width bar)
  // 5: Priority changes (GSTR-3B changes from High -> Urgent with pulsing red flag)
  // 6: Due-date emphasis (Overdue date '02 Sep' pulses with statutory deadline highlight)
  // 7: Task completion (Checkbox checks ☑, title strikethrough, status turns green ✓ Filed / Completed, 4/4h 100%)
  // 8: Hold completed state before clean loop
  const [animStep, setAnimStep] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(0);

  useEffect(() => {
    if (!autoPlay || shouldReduceMotion) return;

    const timings = [
      2600, // 0: Baseline
      2000, // 1: Row highlight
      2200, // 2: Status dropdown open
      2200, // 3: Status change to Internal Review
      2200, // 4: Progress update
      2200, // 5: Priority change to Urgent
      2400, // 6: Due-date emphasis
      3000, // 7: Task completion
      1400, // 8: Loop reset hold
    ];

    const timer = setTimeout(() => {
      setAnimStep((prev) => ((prev + 1) % timings.length) as any);
    }, timings[animStep] || 2200);

    return () => clearTimeout(timer);
  }, [animStep, autoPlay, shouldReduceMotion]);

  // Derived interactive state
  const isRowHighlighted = animStep >= 1 && animStep <= 7;
  const isDropdownOpen = animStep === 2;

  // GSTR-1 Status: In Progress (0-2) -> Internal Review (3-6) -> Filed / Completed (7)
  const gstr1Status: 'In Progress' | 'Internal Review' | 'Filed / Completed' =
    animStep >= 7 ? 'Filed / Completed' : animStep >= 3 ? 'Internal Review' : 'In Progress';
  const gstr1StatusTone =
    animStep >= 7 ? 'green' : animStep >= 3 ? 'purple' : 'blue';

  // GSTR-1 Progress: 2/4h (0-3) -> 3/4h (4-6) -> 4/4h (7)
  const gstr1Effort = animStep >= 7 ? 4 : animStep >= 4 ? 3 : 2;

  // GSTR-3B Priority: High (0-4) -> Urgent (5+)
  const gstr3bPriority: 'High' | 'Urgent' = animStep >= 5 ? 'Urgent' : 'High';
  const gstr3bPriorityColor: 'amber' | 'red' = animStep >= 5 ? 'red' : 'amber';

  // Due Date Emphasis on Step 6
  const isDueDateEmphasized = animStep === 6;

  // Task Completion on Step 7
  const isTaskCompleted = animStep >= 7;

  // 9 Exact Tasks Visible in Reference Screenshot media_1790239922539.png
  const tasks: TaskRowData[] = [
    {
      id: 'task-gstr1',
      title: 'GSTR-1 sales ledger matching & E-way bill validation',
      status: gstr1Status,
      statusTone: gstr1StatusTone,
      effortSpent: gstr1Effort,
      effortTotal: 4,
      effortColor: isTaskCompleted ? 'green' : 'teal',
      assignees: [
        { initials: 'NJ', color: '#7E22CE', isOnline: true },
        { initials: 'PA', color: '#EC4899', isOnline: true },
      ],
      priority: 'High',
      priorityColor: 'amber',
      dueDate: '02 Sep',
      isCompleted: isTaskCompleted,
    },
    {
      id: 'task-bank-blocked',
      title: 'Blocked on Client: Bank Statements & Purchase Registers ...',
      status: 'Blocked',
      statusTone: 'red',
      effortSpent: 1,
      effortTotal: 6,
      effortColor: 'gray',
      assignees: [{ initials: 'NJ', color: '#7E22CE', name: 'Nikhil Jain' }],
      priority: 'Urgent',
      priorityColor: 'red',
      dueDate: '12 Sep',
      isBlocked: true,
    },
    {
      id: 'task-time-log',
      title: 'Time Log: Bank Balance Sheet Draft (7h logged)',
      isLocked: true,
      status: 'In Progress',
      statusTone: 'blue',
      effortSpent: 7,
      effortTotal: 7,
      effortColor: 'orange',
      assignees: [{ initials: 'NJ', color: '#7E22CE', name: 'Nikhil Jain' }],
      priority: 'Urgent',
      priorityColor: 'red',
      dueDate: '15 Sep',
    },
    {
      id: 'task-dsc',
      title: 'DSC Passcode Token Expiry & Renewal Protocol',
      actionIcons: true,
      isSelectedRow: true,
      status: 'To Do',
      statusTone: 'gray',
      effortSpent: 3,
      effortTotal: 6,
      effortColor: 'green',
      assignees: [{ initials: 'NJ', color: '#7E22CE', name: 'Nikhil Jain' }],
      priority: 'Urgent',
      priorityColor: 'red',
      dueDate: '18 Sep',
    },
    {
      id: 'task-brc',
      title: 'BRC/FIRC reconciliation for Q2 export invoices',
      blockedTag: 'Blocked',
      isLocked: true,
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
    },
    {
      id: 'task-gstr3b',
      title: 'GSTR-3B Monthly Return Filing (August 2026)',
      status: 'In Progress',
      statusTone: 'blue',
      effortSpent: 2.5,
      effortTotal: 4,
      effortColor: 'teal',
      assignees: [
        { initials: 'NJ', color: '#7E22CE', isOnline: true },
        { initials: 'PA', color: '#EC4899', isOnline: true },
      ],
      priority: gstr3bPriority,
      priorityColor: gstr3bPriorityColor,
      dueDate: '20 Sep',
    },
    {
      id: 'task-bank-reco',
      title: 'Bank reconciliation - SBI Export Account & HDFC Current',
      status: 'In Progress',
      statusTone: 'blue',
      effortSpent: 3,
      effortTotal: 5,
      effortColor: 'green',
      assignees: [{ initials: 'AS', color: '#004AAD', isOnline: true, name: 'Aditya Sha...' }],
      priority: 'High',
      priorityColor: 'amber',
      dueDate: '20 Sep',
    },
    {
      id: 'task-shipping-bill',
      title: 'Shipping bill matching with ICEGATE custom records',
      isLocked: true,
      status: 'In Progress',
      statusTone: 'blue',
      effortSpent: 3.5,
      effortTotal: 4,
      effortColor: 'orange',
      assignees: [{ initials: 'AS', color: '#004AAD', isOnline: true, name: 'Aditya Sha...' }],
      priority: 'Medium',
      priorityColor: 'blue',
      dueDate: '21 Sep',
    },
    {
      id: 'task-prov-bs',
      title: 'Provisional balance sheet for bank',
      isLocked: true,
      status: 'Internal Review',
      statusTone: 'purple',
      effortSpent: 7,
      effortTotal: 12,
      effortColor: 'green',
      assignees: [
        { initials: 'NJ', color: '#7E22CE' },
        { initials: 'PA', color: '#EC4899', isOnline: true },
      ],
      priority: 'Urgent',
      priorityColor: 'red',
      dueDate: 'Yesterday',
    },
  ];

  const content = (
    <div
      ref={containerRef}
      data-product-target="task-list-view-root"
      className={`w-full h-full flex flex-col bg-white text-[#113353] select-none font-sans overflow-hidden ${className}`}
    >
      {/* 1. Client Header Bar */}
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

      {/* 2. Client Primary Navigation Tabs */}
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

        {/* View Switcher: List | Board | Calendar | Timeline */}
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
              className={`px-2.5 py-1 rounded-[5px] text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
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

      {/* 3. Sub-Tabs Bar */}
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

      {/* 4. Controls Toolbar */}
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

          {/* + New Task */}
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

      {/* 5. Table Header */}
      <div className="px-4 sm:px-6 pt-2 flex flex-col flex-1 min-h-0 bg-white overflow-hidden">
        <div className="grid grid-cols-[30px_minmax(280px,2fr)_130px_110px_110px_95px_115px] gap-2 px-3 py-1.5 text-[10.5px] font-extrabold uppercase tracking-wider text-[#627D98] border-b border-[#E5EAF2] items-center bg-[#F8FAFC]">
          <div className="flex items-center justify-center">
            <span className="text-[10px] font-mono text-[#94A3B8]">T</span>
          </div>
          <div>NAME</div>
          <div className="flex items-center gap-1">
            <PyngynIcons.zap size={11} className="text-[#0066CC]" />
            <span>STATUS</span>
          </div>
          <div className="flex items-center gap-1">
            <PyngynIcons.clock size={11} />
            <span>EFFORT</span>
          </div>
          <div className="flex items-center gap-1">
            <PyngynIcons.user size={11} />
            <span>ASSIGNEE</span>
          </div>
          <div className="flex items-center gap-1">
            <PyngynIcons.flag size={11} />
            <span>PRIORITY</span>
          </div>
          <div className="flex items-center gap-1">
            <PyngynIcons.calendar size={11} />
            <span>DUE</span>
          </div>
        </div>

        {/* Group Header: ⌄ ⚠ OVERDUE (PAST STATUTORY TARGET) 9 */}
        <div className="py-2 flex items-center gap-2">
          <PyngynIcons.chevronDown size={14} className="text-[#DC2626] cursor-pointer" />
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-[#DC2626] text-white text-[11px] font-bold shadow-xs">
            <PyngynIcons.alertTriangle size={12} className="text-white shrink-0" />
            <span>OVERDUE (PAST STATUTORY TARGET)</span>
          </div>
          <span className="text-[11.5px] font-bold text-[#627D98]">9</span>
        </div>

        {/* 6. Table Rows */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#F1F5F9] border-t border-[#E5EAF2]">
          {tasks.map((task) => {
            const isGstr1 = task.id === 'task-gstr1';
            const isGstr3b = task.id === 'task-gstr3b';

            return (
              <motion.div
                key={task.id}
                data-product-target={`task-row-${task.id}`}
                animate={
                  isGstr1 && isRowHighlighted && !shouldReduceMotion
                    ? {
                        backgroundColor: isTaskCompleted
                          ? '#F0FAF0'
                          : animStep >= 3
                          ? '#FAF5FF'
                          : '#EFF6FF',
                      }
                    : task.isSelectedRow
                    ? { backgroundColor: '#F8FAFC' }
                    : { backgroundColor: '#FFFFFF' }
                }
                transition={{ duration: 0.3 }}
                className={`grid grid-cols-[30px_minmax(280px,2fr)_130px_110px_110px_95px_115px] gap-2 items-center px-3 py-1.5 text-[12px] transition-colors relative border-l-2 ${
                  isGstr1 && isRowHighlighted
                    ? isTaskCompleted
                      ? 'border-l-[#00960F]'
                      : animStep >= 3
                      ? 'border-l-[#7E22CE]'
                      : 'border-l-[#0066CC]'
                    : 'border-l-transparent'
                } ${task.isSelectedRow ? 'ring-1 ring-[#60A5FA] rounded-[4px] my-0.5' : ''}`}
              >
                {/* 1. Checkbox / Handle */}
                <div className="flex items-center justify-center gap-1">
                  {task.isSelectedRow ? (
                    <span className="text-[11px] text-[#94A3B8] font-mono leading-none">::</span>
                  ) : null}
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    readOnly
                    className="w-3.5 h-3.5 rounded border-[#CBD5E1] text-[#0066CC] focus:ring-0 cursor-pointer"
                  />
                </div>

                {/* 2. Name + Quick Actions */}
                <div className="min-w-0 pr-2 flex items-center justify-between gap-1.5">
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
                      <PyngynIcons.lock size={11} className="text-[#94A3B8] shrink-0" />
                    )}

                    {task.blockedTag && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-[#F1F5F9] text-[#475569] text-[9.5px] font-bold shrink-0 border border-[#CBD5E1]">
                        <PyngynIcons.lock size={8} />
                        <span>{task.blockedTag}</span>
                      </span>
                    )}
                  </div>

                  {task.actionIcons && (
                    <div className="flex items-center gap-1 shrink-0 text-[#94A3B8]">
                      <button type="button" className="hover:text-[#113353] cursor-pointer text-[12px] font-bold">+</button>
                      <button type="button" className="hover:text-[#113353] cursor-pointer">
                        <PyngynIcons.edit size={11} />
                      </button>
                    </div>
                  )}
                </div>

                {/* 3. Status Pill + Interactive Dropdown */}
                <div className="relative">
                  <motion.span
                    key={task.status}
                    initial={isGstr1 ? { scale: 0.95 } : false}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[5px] text-[10.5px] font-bold truncate ${
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
                    {task.statusTone === 'green' && <PyngynIcons.check size={10} />}
                    <span>{task.status}</span>
                  </motion.span>

                  {/* Status Dropdown Popover on Step 2 */}
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
                        { label: 'In Progress', color: 'text-[#0066CC]', checked: true },
                        { label: 'Internal Review', color: 'text-[#7E22CE]', hovered: true },
                        { label: 'Blocked', color: 'text-[#DC2626]', checked: false },
                        { label: 'Filed / Completed', color: 'text-[#00960F]', checked: false },
                      ].map((opt, i) => (
                        <div
                          key={i}
                          className={`px-3 py-1 flex items-center justify-between font-medium ${opt.color} ${
                            opt.hovered
                              ? 'bg-[#FAF5FF] font-bold ring-1 ring-[#7E22CE]/30'
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {opt.checked && <PyngynIcons.check size={11} />}
                          {opt.hovered && <span className="text-[10px] text-[#7E22CE] font-bold">Select</span>}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* 4. Effort Progress */}
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10.5px] font-mono font-medium flex items-center gap-1 ${
                    task.effortColor === 'orange' ? 'text-[#D97706]' : 'text-[#627D98]'
                  }`}>
                    <PyngynIcons.clock size={11} className="shrink-0" />
                    <span>{task.effortSpent}/{task.effortTotal}h</span>
                  </span>
                  <div className="w-10 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
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
                      className="w-5 h-5 rounded-[5px] text-white text-[8.5px] font-bold flex items-center justify-center ring-1 ring-white relative shrink-0"
                    >
                      {assignee.initials}
                      {assignee.isOnline && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00960F] border border-white absolute -bottom-0.5 -right-0.5" />
                      )}
                    </span>
                  ))}
                  {task.assignees.length === 1 && task.assignees[0].name && (
                    <span className="ml-1.5 text-[10.5px] text-[#475569] truncate max-w-[70px]">
                      {task.assignees[0].name}
                    </span>
                  )}
                </div>

                {/* 6. Priority Flag */}
                <div className="flex items-center gap-1">
                  <motion.span
                    key={task.priority}
                    animate={isGstr3b && animStep === 5 ? { scale: [1, 1.25, 1] } : {}}
                    transition={{ duration: 0.4 }}
                    className={`text-[11px] font-bold flex items-center gap-1 ${
                      task.priorityColor === 'red'
                        ? 'text-[#DC2626]'
                        : task.priorityColor === 'amber'
                        ? 'text-[#D97706]'
                        : task.priorityColor === 'blue'
                        ? 'text-[#0066CC]'
                        : 'text-[#627D98]'
                    }`}
                  >
                    <PyngynIcons.flag size={10} />
                    <span>{task.priority}</span>
                  </motion.span>
                </div>

                {/* 7. Due Date */}
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
                    <span className="text-[9.5px] text-[#DC2626] font-medium">
                      {task.dueDateNote}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );

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
        {content}
      </PyngynProductShell>
    );
  }

  return content;
};
