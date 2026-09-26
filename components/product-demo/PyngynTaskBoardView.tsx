'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PyngynIcons } from './PyngynIcons';
import { PyngynProductShell } from './PyngynProductShell';

export interface PyngynTaskBoardViewProps {
  className?: string;
  standalone?: boolean;
  autoPlay?: boolean;
}

interface KanbanAssignee {
  initials: string;
  color: string;
  isOnline?: boolean;
  name?: string;
}

interface BoardCardData {
  id: string;
  title: string;
  clientTag: string;
  serviceTag: string;
  priority?: 'HIGH' | 'URGENT' | 'MEDIUM' | 'LOW';
  assignees: KanbanAssignee[];
  dueDate: string;
  isDueDateOverdue?: boolean;
  docCountDone?: number;
  docCountTotal?: number;
  effortHours: string;
  isFiled?: boolean;
}

export const PyngynTaskBoardView: React.FC<PyngynTaskBoardViewProps> = ({
  className = '',
  standalone = false,
  autoPlay = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Navigation tab states
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'engagements' | 'files' | 'portal'>('tasks');
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'filings' | 'review' | 'done'>('all');
  const [activeViewShape, setActiveViewShape] = useState<'list' | 'board' | 'calendar' | 'timeline'>('board');

  // AUTOMATED WORKFLOW ANIMATION:
  // State 0: Baseline - GSTR-1 in 'Overdue & Due Today' (Counts: 9, 2, 0, 3)
  // State 1: Highlight GSTR-1 card in Overdue (preparing to move)
  // State 2: Smoothly moves to 'Due This Week (7 Days)' (Counts: 8, 3, 0, 3)
  // State 3: Settle & hold in 'Due This Week'
  // State 4: Smoothly moves to 'Later & Filed' (Counts: 8, 2, 0, 4)
  // State 5: Settle & hold in 'Later & Filed' with completed/filed styling
  // State 6: Clean reset hold
  const [workflowStage, setWorkflowStage] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6>(0);

  useEffect(() => {
    if (!autoPlay || shouldReduceMotion) return;

    const timings = [
      2800, // 0: Baseline hold in Overdue
      1800, // 1: Card highlight
      3000, // 2: Move to Due This Week
      2400, // 3: Settle in Due This Week
      3000, // 4: Move to Later & Filed
      2800, // 5: Settle in Later & Filed
      1600, // 6: Loop reset hold
    ];

    const timer = setTimeout(() => {
      setWorkflowStage((prev) => ((prev + 1) % timings.length) as any);
    }, timings[workflowStage] || 2500);

    return () => clearTimeout(timer);
  }, [workflowStage, autoPlay, shouldReduceMotion]);

  // Derived column placement of moving card:
  // Stage 0, 1: 'overdue'
  // Stage 2, 3: 'this-week'
  // Stage 4, 5, 6: 'later-filed'
  const movingCardColumn: 'overdue' | 'this-week' | 'later-filed' =
    workflowStage >= 4 ? 'later-filed' : workflowStage >= 2 ? 'this-week' : 'overdue';

  const isCardElevated = workflowStage === 1;

  // Dynamic Column Counts
  const overdueCount = movingCardColumn === 'overdue' ? 9 : 8;
  const thisWeekCount = movingCardColumn === 'this-week' ? 3 : 2;
  const laterFiledCount = movingCardColumn === 'later-filed' ? 4 : 3;

  // The Moving Card: GSTR-1
  const gstr1Card: BoardCardData = {
    id: 'card-gstr1',
    title: 'GSTR-1 sales ledger matching & E-way bill validation',
    clientTag: 'Oswal',
    serviceTag: 'GST',
    priority: movingCardColumn === 'later-filed' ? undefined : 'HIGH',
    assignees: [
      { initials: 'NJ', color: '#7E22CE', isOnline: true },
      { initials: 'PA', color: '#EC4899', isOnline: true },
    ],
    dueDate:
      movingCardColumn === 'later-filed'
        ? '09-26'
        : movingCardColumn === 'this-week'
        ? '09-24'
        : '09-02',
    isDueDateOverdue: movingCardColumn === 'overdue',
    docCountDone: movingCardColumn === 'later-filed' ? 5 : movingCardColumn === 'this-week' ? 5 : 5,
    docCountTotal: 5,
    effortHours: movingCardColumn === 'later-filed' ? '4h' : movingCardColumn === 'this-week' ? '3h' : '2h',
    isFiled: movingCardColumn === 'later-filed',
  };

  // Fixed Cards in Column 1: Overdue & Due Today
  const overdueOtherCards: BoardCardData[] = [
    {
      id: 'card-bank-blocked',
      title: 'Blocked on Client: Bank Statements & Purchase Registers Awaited',
      clientTag: 'Oswal',
      serviceTag: 'GST',
      priority: 'URGENT',
      assignees: [{ initials: 'NJ', color: '#7E22CE' }],
      dueDate: '09-12',
      isDueDateOverdue: true,
      docCountDone: 0,
      docCountTotal: 3,
      effortHours: '1h',
    },
    {
      id: 'card-time-log',
      title: 'Time Log: Bank Balance Sheet Draft (7h logged)',
      clientTag: 'Oswal',
      serviceTag: 'ACCOUNTING',
      priority: 'URGENT',
      assignees: [{ initials: 'NJ', color: '#7E22CE' }],
      dueDate: '09-15',
      isDueDateOverdue: true,
      effortHours: '7h',
    },
  ];

  // Fixed Cards in Column 2: Due This Week (7 Days)
  const thisWeekOtherCards: BoardCardData[] = [
    {
      id: 'card-rfd01',
      title: 'RFD-01 refund filing - export accumulated ITC',
      clientTag: 'Oswal',
      serviceTag: 'GST',
      priority: 'HIGH',
      assignees: [
        { initials: 'NJ', color: '#7E22CE' },
        { initials: 'PA', color: '#EC4899' },
      ],
      dueDate: '09-24',
      docCountDone: 0,
      docCountTotal: 10,
      effortHours: '6h',
    },
    {
      id: 'card-forex',
      title: 'Foreign currency exchange fluctuation ledger scrutiny',
      clientTag: 'Oswal',
      serviceTag: 'ACCOUNTING',
      assignees: [{ initials: 'PA', color: '#EC4899' }],
      dueDate: '09-25',
      docCountDone: 2,
      docCountTotal: 2,
      effortHours: '2.5h',
    },
  ];

  // Fixed Cards in Column 4: Later & Filed
  const laterFiledOtherCards: BoardCardData[] = [
    {
      id: 'card-engagement-letter',
      title: 'Engagement letter signed',
      clientTag: 'Oswal',
      serviceTag: 'ACCOUNTING',
      assignees: [{ initials: 'NJ', color: '#7E22CE' }],
      dueDate: '09-01',
      docCountDone: 1,
      docCountTotal: 1,
      effortHours: '1h',
    },
    {
      id: 'card-lut',
      title: 'LUT validity check for FY 2026-27 exports',
      clientTag: 'Oswal',
      serviceTag: 'GST',
      assignees: [{ initials: 'AS', color: '#004AAD' }],
      dueDate: '09-05',
      docCountDone: 1,
      docCountTotal: 1,
      effortHours: '1h',
    },
    {
      id: 'card-tds-26q',
      title: 'TDS return Form 26Q preparation for Q2 payments',
      clientTag: 'Oswal',
      serviceTag: 'ACCOUNTING',
      priority: 'HIGH',
      assignees: [{ initials: 'AS', color: '#004AAD' }],
      dueDate: '10-15',
      docCountDone: 0,
      docCountTotal: 3,
      effortHours: '0h',
    },
  ];

  const renderCard = (card: BoardCardData, isMoving = false) => {
    return (
      <motion.div
        key={card.id}
        layout
        layoutId={isMoving ? 'moving-board-card-gstr1' : undefined}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className={`bg-white rounded-[8px] border p-3 shadow-2xs select-none transition-all ${
          isMoving && isCardElevated
            ? 'ring-2 ring-[#0066CC] shadow-lg scale-[1.02] border-[#93C5FD]'
            : card.isFiled
            ? 'border-[#B5EDB9] bg-[#F9FEFA]'
            : 'border-[#CBD5E1] hover:border-[#94A3B8]'
        }`}
      >
        {/* Header Tags: Client Tag, Service Tag, Priority */}
        <div className="flex items-center justify-between mb-2 gap-1.5 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#F1F5F9] text-[#334155] border border-slate-200">
              {card.clientTag}
            </span>
            <span
              className={`text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                card.serviceTag === 'GST'
                  ? 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]'
                  : 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]'
              }`}
            >
              {card.serviceTag}
            </span>
          </div>

          {card.priority && (
            <span
              className={`text-[9px] font-bold px-1.5 py-0.5 rounded border flex items-center gap-1 ${
                card.priority === 'URGENT'
                  ? 'bg-[#FEE2E2] text-[#DC2626] border-[#FECACA]'
                  : 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]'
              }`}
            >
              <PyngynIcons.flag size={9} />
              <span>{card.priority}</span>
            </span>
          )}

          {card.isFiled && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC] flex items-center gap-0.5">
              <PyngynIcons.check size={9} />
              <span>FILED</span>
            </span>
          )}
        </div>

        {/* Task Title */}
        <h4 className={`text-[12px] font-bold leading-snug mb-2.5 ${card.isFiled ? 'text-[#166534]' : 'text-[#113353]'}`}>
          {card.title}
        </h4>

        {/* Card Footer: Assignees, Due Date, Doc Count, Effort */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
          <div className="flex items-center gap-2">
            {/* Assignee Avatar Bubbles */}
            <div className="flex items-center -space-x-1">
              {card.assignees.map((assignee, idx) => (
                <span
                  key={idx}
                  style={{ backgroundColor: assignee.color }}
                  className="w-5 h-5 rounded-[5px] text-white text-[8px] font-bold flex items-center justify-center ring-1 ring-white relative shrink-0"
                >
                  {assignee.initials}
                  {assignee.isOnline && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00960F] border border-white absolute -bottom-0.5 -right-0.5" />
                  )}
                </span>
              ))}
            </div>

            {/* Due Date */}
            <span
              className={`font-mono text-[10px] font-bold flex items-center gap-1 ${
                card.isDueDateOverdue ? 'text-[#DC2626]' : 'text-[#64748B]'
              }`}
            >
              <PyngynIcons.calendar size={10} />
              <span>{card.dueDate}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] text-[#64748B]">
            {card.docCountTotal !== undefined && (
              <span className="flex items-center gap-1">
                <PyngynIcons.checkSquare size={10} />
                <span>
                  {card.docCountDone}/{card.docCountTotal}
                </span>
              </span>
            )}
            <span className="flex items-center gap-1">
              <PyngynIcons.clock size={10} />
              <span>{card.effortHours}</span>
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  const content = (
    <div
      ref={containerRef}
      data-product-target="task-board-view-root"
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

        {/* View Switcher: List | Board (Selected) | Calendar | Timeline */}
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

      {/* 4. Primary Toolbar */}
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
            <span>Columns by: Due Date</span>
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

      {/* 5. Secondary Board Filter Bar */}
      <div className="px-4 sm:px-6 py-2 bg-white border-b border-[#E5EAF2] flex items-center justify-between text-[11.5px] text-[#627D98] shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] border border-[#CBD5E1] bg-white text-[#627D98]">
            <PyngynIcons.search size={12} />
            <span className="text-[11px]">Search kanban cards by job tit</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-[6px] border border-[#CBD5E1] bg-white text-[#113353] font-medium cursor-pointer">
            <span>All Priorities (14)</span>
            <PyngynIcons.chevronDown size={10} className="text-[#627D98]" />
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-medium text-[11px] text-[#627D98]">
          <PyngynIcons.kanban size={12} />
          <span>14 items across 4 columns</span>
        </div>
      </div>

      {/* 6. 4 Board Columns Grid */}
      <div className="flex-1 overflow-x-auto p-4 grid grid-cols-4 gap-3.5 min-w-[1020px] max-w-full bg-[#F8FAFC]">
        {/* Column 1: Overdue & Due Today */}
        <div className="flex flex-col bg-[#FEE2E2]/15 rounded-[10px] border border-[#FECACA] overflow-hidden">
          {/* Header */}
          <div className="px-3 py-2 bg-white border-b border-[#FECACA] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-[4px] bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] flex items-center justify-center text-[10px] font-bold">
                !
              </span>
              <span className="font-bold text-[12px] text-[#113353]">Overdue &amp; Due Today</span>
              <motion.span
                key={overdueCount}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]"
              >
                {overdueCount}
              </motion.span>
            </div>
            <PyngynIcons.alertTriangle size={13} className="text-[#DC2626]" />
          </div>

          {/* Cards */}
          <div className="flex-1 p-2 space-y-2 overflow-y-auto">
            {movingCardColumn === 'overdue' && renderCard(gstr1Card, true)}
            {overdueOtherCards.map((card) => renderCard(card, false))}
          </div>
        </div>

        {/* Column 2: Due This Week (7 Days) */}
        <div className="flex flex-col bg-[#FEF3C7]/15 rounded-[10px] border border-[#FED7AA] overflow-hidden">
          {/* Header */}
          <div className="px-3 py-2 bg-white border-b border-[#FED7AA] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-[4px] bg-[#FAF5FF] border border-[#E9D5FF] text-[#7E22CE] flex items-center justify-center text-[10px]">
                <PyngynIcons.star size={10} className="fill-[#7E22CE]" />
              </span>
              <span className="font-bold text-[12px] text-[#113353]">Due This Week (7 Days)</span>
              <motion.span
                key={thisWeekCount}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]"
              >
                {thisWeekCount}
              </motion.span>
            </div>
            <PyngynIcons.calendar size={13} className="text-[#D97706]" />
          </div>

          {/* Cards */}
          <div className="flex-1 p-2 space-y-2 overflow-y-auto">
            {movingCardColumn === 'this-week' && renderCard(gstr1Card, true)}
            {thisWeekOtherCards.map((card) => renderCard(card, false))}
          </div>
        </div>

        {/* Column 3: Due Next Week (Empty State) */}
        <div className="flex flex-col bg-[#F8FAFC] rounded-[10px] border border-[#CBD5E1] overflow-hidden">
          {/* Header */}
          <div className="px-3 py-2 bg-white border-b border-[#CBD5E1] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-[4px] bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center text-[10px] font-bold">
                -
              </span>
              <span className="font-bold text-[12px] text-[#113353]">Due Next Week</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                0
              </span>
            </div>
            <PyngynIcons.calendar size={13} className="text-[#2563EB]" />
          </div>

          {/* Empty State */}
          <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
            <div className="w-full h-full min-h-[160px] border border-dashed border-[#CBD5E1] rounded-[8px] flex flex-col items-center justify-center p-4 bg-white/50">
              <PyngynIcons.calendar size={22} className="text-blue-400 mb-1.5" />
              <span className="text-[11px] font-medium text-[#64748B]">No jobs in Due Next Week</span>
            </div>
          </div>
        </div>

        {/* Column 4: Later & Filed */}
        <div className="flex flex-col bg-[#F0FDF4]/20 rounded-[10px] border border-[#CBD5E1] overflow-hidden">
          {/* Header */}
          <div className="px-3 py-2 bg-white border-b border-[#CBD5E1] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-[4px] bg-[#DCFCE7] border border-[#86EFAC] text-[#15803D] flex items-center justify-center text-[10px] font-bold">
                <PyngynIcons.check size={10} />
              </span>
              <span className="font-bold text-[12px] text-[#113353]">Later &amp; Filed</span>
              <motion.span
                key={laterFiledCount}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
              >
                {laterFiledCount}
              </motion.span>
            </div>
            <PyngynIcons.clock size={13} className="text-[#15803D]" />
          </div>

          {/* Cards */}
          <div className="flex-1 p-2 space-y-2 overflow-y-auto">
            {movingCardColumn === 'later-filed' && renderCard(gstr1Card, true)}
            {laterFiledOtherCards.map((card) => renderCard(card, false))}
          </div>
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
