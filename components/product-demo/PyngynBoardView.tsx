'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PyngynIcons } from './PyngynIcons';
import type { KanbanColumn, KanbanCard } from './types';

export interface PyngynBoardViewProps {
  clientName?: string;
  clientHealth?: 'at-risk' | 'healthy' | 'attention';
  clientTier?: number | string;
  onViewChange?: (view: 'list' | 'board' | 'calendar' | 'timeline') => void;
  className?: string;
  activeTarget?: string;
  gstr1Column?: 'overdue' | 'this-week';
}

export const PyngynBoardView: React.FC<PyngynBoardViewProps> = ({
  clientName = 'Oswal Exports',
  clientHealth = 'at-risk',
  clientTier = 1,
  onViewChange,
  className = '',
  activeTarget,
  gstr1Column = 'overdue',
}) => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'engagements' | 'files' | 'portal'>('tasks');
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'filings' | 'review' | 'done'>('all');

  const gstr1Card: KanbanCard = {
    id: 'card-gstr1',
    title: 'GSTR-1 sales ledger matching & E-way bill validation',
    clientTag: 'Oswal',
    serviceTag: 'GST',
    priority: 'high',
    assignees: [
      { id: 'nj', name: 'Nikhil Jain', initials: 'NJ', color: '#7E22CE' },
      { id: 'pa', name: 'Pooja Agarwal', initials: 'PA', color: '#EC4899' },
    ],
    dueDate: gstr1Column === 'this-week' ? '09-24' : '09-02',
    checklistDone: 5,
    checklistTotal: 5,
    effortHours: gstr1Column === 'this-week' ? '3h' : '2h',
  };

  const overdueCards: KanbanCard[] = [
    ...(gstr1Column === 'overdue' ? [gstr1Card] : []),
    {
      id: 'card-bank-blocked',
      title: 'Blocked on Client: Bank Statements & Purchase Registers Awaited',
      clientTag: 'Oswal',
      serviceTag: 'GST',
      priority: 'urgent',
      assignees: [
        { id: 'nj', name: 'Nikhil Jain', initials: 'NJ', color: '#7E22CE' },
      ],
      dueDate: '09-12',
      checklistDone: 0,
      checklistTotal: 3,
      effortHours: '1h',
    },
    {
      id: 'card-time-log',
      title: 'Time Log: Bank Balance Sheet Draft (7h logged)',
      clientTag: 'Oswal',
      serviceTag: 'ACCOUNTING',
      priority: 'urgent',
      assignees: [
        { id: 'nj', name: 'Nikhil Jain', initials: 'NJ', color: '#7E22CE' },
      ],
      dueDate: '09-15',
      checklistDone: 7,
      checklistTotal: 7,
      effortHours: '7h',
    },
  ];

  const thisWeekCards: KanbanCard[] = [
    ...(gstr1Column === 'this-week' ? [gstr1Card] : []),
    {
      id: 'card-rfd01',
      title: 'RFD-01 refund filing - export accumulated ITC',
      clientTag: 'Oswal',
      serviceTag: 'GST',
      priority: 'high',
      assignees: [
        { id: 'nj', name: 'Nikhil Jain', initials: 'NJ', color: '#7E22CE' },
        { id: 'pa', name: 'Pooja Agarwal', initials: 'PA', color: '#EC4899' },
      ],
      dueDate: '09-24',
      checklistDone: 0,
      checklistTotal: 10,
      effortHours: '6h',
    },
    {
      id: 'card-forex',
      title: 'Foreign currency exchange fluctuation ledger scrutiny',
      clientTag: 'Oswal',
      serviceTag: 'ACCOUNTING',
      priority: 'medium',
      assignees: [
        { id: 'pa', name: 'Pooja Agarwal', initials: 'PA', color: '#EC4899' },
      ],
      dueDate: '09-25',
      checklistDone: 2,
      checklistTotal: 2,
      effortHours: '2.5h',
    },
  ];

  const columns: KanbanColumn[] = [
    {
      id: 'overdue',
      title: 'Overdue & Due Today',
      count: gstr1Column === 'overdue' ? 9 : 8,
      tone: 'red',
      cards: overdueCards,
    },
    {
      id: 'this-week',
      title: 'Due This Week (7 Days)',
      count: gstr1Column === 'this-week' ? 3 : 2,
      tone: 'purple',
      cards: thisWeekCards,
    },
    {
      id: 'next-week',
      title: 'Due Next Week',
      count: 0,
      tone: 'blue',
      emptyMessage: 'No jobs in Due Next Week',
      cards: [],
    },
    {
      id: 'later-filed',
      title: 'Later & Filed',
      count: 3,
      tone: 'green',
      cards: [
        {
          id: 'card-engagement-letter',
          title: 'Engagement letter signed',
          clientTag: 'Oswal',
          serviceTag: 'ACCOUNTING',
          priority: 'low',
          assignees: [
            { id: 'nj', name: 'Nikhil Jain', initials: 'NJ', color: '#7E22CE' },
          ],
          dueDate: '09-01',
          checklistDone: 1,
          checklistTotal: 1,
          effortHours: '1h',
        },
        {
          id: 'card-lut',
          title: 'LUT validity check for FY 2026-27 exports',
          clientTag: 'Oswal',
          serviceTag: 'GST',
          priority: 'medium',
          assignees: [
            { id: 'as', name: 'Aditya Sharma', initials: 'AS', color: '#004AAD' },
          ],
          dueDate: '09-05',
          checklistDone: 1,
          checklistTotal: 1,
          effortHours: '1h',
        },
        {
          id: 'card-tds-26q',
          title: 'TDS return Form 26Q preparation for Q2 payments',
          clientTag: 'Oswal',
          serviceTag: 'ACCOUNTING',
          priority: 'high',
          assignees: [
            { id: 'as', name: 'Aditya Sharma', initials: 'AS', color: '#004AAD' },
          ],
          dueDate: '10-15',
          checklistDone: 0,
          checklistTotal: 3,
          effortHours: '0h',
        },
      ],
    },
  ];

  return (
    <div
      data-product-target="client-board-view"
      className={`flex-1 flex flex-col min-w-0 bg-white overflow-hidden select-none ${className}`}
    >
      {/* 1. Client Header Banner */}
      <div className="px-5 py-3 border-b border-[#E5EAF2] flex items-center justify-between gap-4 bg-white shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2">
            <PyngynIcons.user size={16} className="text-[#004AAD]" />
            <h1 className="text-[17px] font-bold text-[#113353] tracking-tight truncate">
              {clientName}
            </h1>
            <PyngynIcons.chevronDown size={14} className="text-[#627D98] cursor-pointer" />
            <PyngynIcons.star size={14} className="text-[#627D98] hover:text-[#D97706] cursor-pointer" />
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-[5px] bg-[#FEF2F2] border border-[#FECACA] text-[11px] font-bold text-[#DC2626]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
              <span>{clientHealth.toUpperCase()}</span>
            </div>

            <span className="px-2 py-0.5 rounded-[5px] bg-[#F0F4F8] border border-[#CBD5E1] text-[11px] font-bold text-[#113353]">
              Tier {clientTier}
            </span>

            <button
              type="button"
              className="px-2 py-0.5 rounded-[5px] bg-white border border-[#CBD5E1] text-[11px] font-bold text-[#113353] flex items-center gap-1 shadow-3xs"
            >
              <PyngynIcons.star size={11} className="text-[#D97706] fill-[#D97706]" />
              <span>Default</span>
            </button>

            <button
              type="button"
              className="px-2 py-0.5 rounded-[5px] bg-white border border-[#CBD5E1] text-[11px] font-medium text-[#627D98] flex items-center gap-1"
            >
              <span>More Actions</span>
              <PyngynIcons.chevronDown size={11} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Client Tabs */}
      <div className="h-[40px] max-h-[40px] px-5 bg-white border-b border-[#E5EAF2] flex items-center justify-between text-[12.5px] font-medium shrink-0">
        <div className="flex items-center gap-1 h-full overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'tasks', label: 'Tasks', count: 14 },
            { id: 'engagements', label: 'Engagements', count: 2 },
            { id: 'files', label: 'Files', count: 7 },
            { id: 'portal', label: 'Client Portal' },
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
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10.5px] font-bold ${
                      isActive ? 'bg-[#113353] text-white' : 'bg-[#E5EAF2] text-[#627D98]'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* View Switcher: Board is Active */}
        <div className="flex items-center gap-1 bg-[#F8FAFC] p-0.5 rounded-[7px] border border-[#E5EAF2]">
          {[
            { id: 'list', label: 'List', icon: <PyngynIcons.list size={12} /> },
            { id: 'board', label: 'Board', icon: <PyngynIcons.kanban size={12} /> },
            { id: 'calendar', label: 'Calendar', icon: <PyngynIcons.calendar size={12} /> },
            { id: 'timeline', label: 'Timeline', icon: <PyngynIcons.timeline size={12} /> },
          ].map((view) => {
            const isCurrent = view.id === 'board';
            return (
              <button
                key={view.id}
                type="button"
                onClick={() => onViewChange?.(view.id as any)}
                className={`px-2 py-1 rounded-[5px] text-[11px] font-bold flex items-center gap-1 transition-all ${
                  isCurrent
                    ? 'bg-[#113353] text-white shadow-2xs'
                    : 'text-[#627D98] hover:text-[#113353]'
                }`}
              >
                {view.icon}
                <span>{view.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Sub-Tabs */}
      <div className="h-[36px] px-5 bg-white border-b border-[#E5EAF2] flex items-center justify-between text-[12px] shrink-0">
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
                  className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSubActive ? 'bg-[#113353] text-white' : 'bg-[#E5EAF2] text-[#627D98]'
                  }`}
                >
                  {st.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Controls Toolbar */}
      <div className="px-5 py-2 bg-white border-b border-[#E5EAF2] flex items-center justify-between gap-3 text-[12px] shrink-0">
        <div className="flex items-center gap-2">
          <button type="button" className="px-2.5 py-1 rounded-[6px] border border-[#E5EAF2] bg-[#F8FAFC] text-[#113353] font-medium flex items-center gap-1.5">
            <PyngynIcons.filter size={12} className="text-[#627D98]" />
            <span>Filter</span>
          </button>
          <button type="button" className="px-2.5 py-1 rounded-[6px] border border-[#E5EAF2] bg-[#F8FAFC] text-[#113353] font-medium flex items-center gap-1.5">
            <PyngynIcons.sort size={12} className="text-[#627D98]" />
            <span>Sort</span>
          </button>
          <button type="button" className="px-2.5 py-1 rounded-[6px] border border-[#E5EAF2] bg-[#F8FAFC] text-[#113353] font-medium flex items-center gap-1.5">
            <PyngynIcons.kanban size={12} className="text-[#627D98]" />
            <span>Columns by: Due Date</span>
            <PyngynIcons.chevronDown size={11} className="text-[#627D98]" />
          </button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button type="button" className="h-[28px] px-2.5 rounded-[6px] bg-[#113353] hover:bg-[#0B2238] text-white font-bold text-[11.5px] flex items-center gap-1">
            <PyngynIcons.plus size={12} />
            <span>New Task</span>
          </button>
          <button type="button" className="px-2 py-1 rounded-[6px] border border-[#E5EAF2] text-[11px] font-medium text-[#113353]">
            Save View
          </button>
        </div>
      </div>

      {/* 5. Kanban Secondary Search Bar */}
      <div
        data-product-target="kanban-secondary-bar"
        className="px-5 py-2 bg-[#F8FAFC] border-b border-[#E5EAF2] flex items-center justify-between gap-4 text-[12px] shrink-0"
      >
        <div className="flex items-center gap-3 flex-1 max-w-[480px]">
          <div className="w-full bg-white border border-[#E5EAF2] rounded-[6px] px-2.5 py-1 flex items-center gap-2 shadow-3xs">
            <PyngynIcons.search size={13} className="text-[#627D98]" />
            <span className="text-[#627D98] text-[11.5px]">Search kanban cards by job tit...</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E5EAF2] rounded-[6px] text-[#113353] font-medium whitespace-nowrap shadow-3xs cursor-pointer">
            <span>All Priorities (14)</span>
            <PyngynIcons.chevronDown size={11} className="text-[#627D98]" />
          </div>
        </div>

        <span className="text-[11.5px] text-[#627D98] font-medium">
          14 items across 4 columns
        </span>
      </div>

      {/* 6. Kanban 4 Columns Canvas */}
      <div
        data-product-target="kanban-columns-canvas"
        className="flex-1 overflow-x-auto p-5 bg-[#F8FAFC] flex gap-4 min-h-0"
      >
        {columns.map((col) => {
          return (
            <div
              key={col.id}
              data-product-target={`kanban-column-${col.id}`}
              className="w-[280px] min-w-[280px] max-w-[280px] flex flex-col bg-white border border-[#E5EAF2] rounded-[10px] shadow-2xs overflow-hidden"
            >
              {/* Column Header */}
              <div
                className={`px-3 py-2 border-b flex items-center justify-between ${
                  col.tone === 'red'
                    ? 'bg-[#FEF2F2] border-[#FECACA] text-[#DC2626]'
                    : col.tone === 'purple'
                    ? 'bg-[#FAF5FF] border-[#E9D5FF] text-[#7E22CE]'
                    : col.tone === 'blue'
                    ? 'bg-[#EEF5FF] border-[#C2DCFF] text-[#004AAD]'
                    : 'bg-[#F0FAF0] border-[#B5EDB9] text-[#00960F]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-[12px]">
                  {col.tone === 'red' && <PyngynIcons.alertTriangle size={13} />}
                  {col.tone === 'purple' && <PyngynIcons.calendar size={13} />}
                  {col.tone === 'blue' && <PyngynIcons.calendar size={13} />}
                  {col.tone === 'green' && <PyngynIcons.check size={13} />}
                  <span>{col.title}</span>
                </div>
                <span className="text-[11px] font-bold px-1.5 py-0.2 rounded-full bg-white/70 shadow-3xs">
                  {col.count}
                </span>
              </div>

              {/* Cards List or Empty State */}
              <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5">
                {col.cards.length === 0 ? (
                  <div className="h-44 flex flex-col items-center justify-center text-center text-[#627D98] p-4">
                    <PyngynIcons.calendar size={24} className="text-[#CBD5E1] mb-2" />
                    <p className="text-[12px] font-medium">{col.emptyMessage}</p>
                  </div>
                ) : (
                  col.cards.map((card) => {
                    const isCardActive = activeTarget === `kanban-card-${card.id}`;
                    return (
                      <motion.div
                        layout
                        layoutId={card.id}
                        key={card.id}
                        data-product-target={`kanban-card-${card.id}`}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className={`p-3 bg-white border rounded-[8px] cursor-pointer transition-all hover:shadow-xs group space-y-2 ${
                          isCardActive
                            ? 'border-[#004AAD] shadow-md ring-2 ring-[#004AAD]/20'
                            : 'border-[#E5EAF2] hover:border-[#004AAD]/50 shadow-2xs'
                        }`}
                      >
                      {/* Tags Bar */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-1.5 py-0.2 bg-[#F0F4F8] text-[#113353] rounded-[4px] text-[10px] font-bold uppercase">
                          {card.clientTag}
                        </span>
                        <span className="px-1.5 py-0.2 bg-[#EEF5FF] text-[#004AAD] rounded-[4px] text-[10px] font-bold uppercase">
                          {card.serviceTag}
                        </span>
                        {card.priority === 'urgent' && (
                          <span className="px-1.5 py-0.2 bg-[#FEF2F2] text-[#DC2626] rounded-[4px] text-[10px] font-bold uppercase flex items-center gap-0.5">
                            <PyngynIcons.flag size={9} />
                            <span>URGENT</span>
                          </span>
                        )}
                        {card.priority === 'high' && (
                          <span className="px-1.5 py-0.2 bg-[#FFFBEB] text-[#D97706] rounded-[4px] text-[10px] font-bold uppercase flex items-center gap-0.5">
                            <PyngynIcons.flag size={9} />
                            <span>HIGH</span>
                          </span>
                        )}
                      </div>

                      {/* Card Title */}
                      <h4 className="text-[12px] font-bold text-[#113353] leading-snug group-hover:text-[#004AAD] transition-colors">
                        {card.title}
                      </h4>

                      {/* Footer: Assignees, Due Date, Effort */}
                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#E5EAF2]/60">
                        <div className="flex items-center gap-1.5">
                          <div className="flex items-center -space-x-1">
                            {card.assignees.map((a, i) => (
                              <div
                                key={i}
                                className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[9px] font-bold ring-1 ring-white"
                                style={{ backgroundColor: a.color }}
                              >
                                {a.initials}
                              </div>
                            ))}
                          </div>
                          <span className="text-[#DC2626] font-medium text-[11px] flex items-center gap-0.5">
                            <PyngynIcons.calendar size={10} />
                            <span>{card.dueDate}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-[#627D98] text-[10.5px]">
                          {card.checklistTotal !== undefined && (
                            <span className="inline-flex items-center gap-0.5">
                              <PyngynIcons.checkSquare size={10} className="text-[#627D98]" />
                              <span>{card.checklistDone}/{card.checklistTotal}</span>
                            </span>
                          )}
                          {card.effortHours && (
                            <span className="inline-flex items-center gap-0.5">
                              <PyngynIcons.clock size={10} className="text-[#627D98]" />
                              <span>{card.effortHours}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
