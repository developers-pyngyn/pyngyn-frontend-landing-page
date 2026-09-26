'use client';

import React, { useState } from 'react';
import { PyngynIcons } from './PyngynIcons';
import type { DemoTask } from './types';

export interface PyngynTaskTableProps {
  clientName?: string;
  clientHealth?: 'at-risk' | 'healthy' | 'attention';
  clientTier?: number | string;
  activeViewShape?: 'list' | 'board' | 'calendar' | 'timeline';
  onViewChange?: (view: 'list' | 'board' | 'calendar' | 'timeline') => void;
  selectedTaskId?: string;
  onSelectTask?: (id: string) => void;
  className?: string;
  activeTarget?: string;
  gstr1Status?: 'to-do' | 'in-progress' | 'internal-review' | 'blocked' | 'filed';
  gstr1DropdownOpen?: boolean;
  gstr1DropdownSelected?: 'to-do' | 'in-progress' | 'internal-review' | 'blocked' | 'filed';
  gstr1Effort?: { spent: number; total: number };
  gstr3bStatus?: 'to-do' | 'in-progress' | 'internal-review' | 'blocked' | 'filed';
  gstr3bEffort?: { spent: number; total: number };
  highlightTaskId?: string;
}

export const PyngynTaskTable: React.FC<PyngynTaskTableProps> = ({
  clientName = 'Oswal Exports',
  clientHealth = 'at-risk',
  clientTier = 1,
  activeViewShape = 'list',
  onViewChange,
  selectedTaskId = 'task-dsc',
  onSelectTask,
  className = '',
  activeTarget,
  gstr1Status,
  gstr1DropdownOpen = false,
  gstr1DropdownSelected,
  gstr1Effort,
  gstr3bStatus,
  gstr3bEffort,
  highlightTaskId,
}) => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'engagements' | 'files' | 'portal'>('tasks');
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'filings' | 'review' | 'done'>('all');

  const tasks: DemoTask[] = [
    {
      id: 'task-gstr1',
      title: 'GSTR-1 sales ledger matching & E-way bill validation',
      clientId: 'oswal',
      clientName: 'Oswal Exports',
      engagementName: 'GST Compliance',
      serviceLine: 'gst',
      status: 'in-progress',
      statusLabel: 'In Progress',
      effortSpent: 2,
      effortTotal: 4,
      effortBarColor: 'green',
      assignees: [
        { id: 'nj', name: 'Nikhil Jain', initials: 'NJ', color: '#7E22CE', isOnline: true },
        { id: 'pa', name: 'Pooja Agarwal', initials: 'PA', color: '#EC4899', isOnline: true },
      ],
      priority: 'high',
      dueDate: '02 Sep',
    },
    {
      id: 'task-bank-blocked',
      title: 'Blocked on Client: Bank Statements & Purchase Registers Awaited',
      clientId: 'oswal',
      clientName: 'Oswal Exports',
      engagementName: 'Statutory Audit',
      serviceLine: 'audit',
      status: 'blocked',
      statusLabel: 'Blocked',
      effortSpent: 1,
      effortTotal: 6,
      effortBarColor: 'gray',
      assignees: [
        { id: 'nj', name: 'Nikhil Jain', initials: 'NJ', color: '#7E22CE' },
      ],
      priority: 'urgent',
      dueDate: '12 Sep',
      isBlocked: true,
      blockedReason: 'Purchase Registers Awaited from Oswal Accounts',
    },
    {
      id: 'task-time-log',
      title: 'Time Log: Bank Balance Sheet Draft (7h logged)',
      clientId: 'oswal',
      clientName: 'Oswal Exports',
      engagementName: 'Statutory Audit',
      serviceLine: 'audit',
      status: 'in-progress',
      statusLabel: 'In Progress',
      effortSpent: 7,
      effortTotal: 7,
      effortBarColor: 'orange',
      assignees: [
        { id: 'nj', name: 'Nikhil Jain', initials: 'NJ', color: '#7E22CE' },
      ],
      priority: 'urgent',
      dueDate: '15 Sep',
      isLocked: true,
    },
    {
      id: 'task-dsc',
      title: 'DSC Passcode Token Expiry & Renewal Protocol',
      clientId: 'oswal',
      clientName: 'Oswal Exports',
      engagementName: 'Corporate Filings',
      serviceLine: 'corporate',
      status: 'to-do',
      statusLabel: 'To Do',
      effortSpent: 3,
      effortTotal: 6,
      effortBarColor: 'green',
      assignees: [
        { id: 'nj', name: 'Nikhil Jain', initials: 'NJ', color: '#7E22CE' },
      ],
      priority: 'urgent',
      dueDate: '18 Sep',
      isSelected: true,
    },
    {
      id: 'task-brc',
      title: 'BRC/FIRC reconciliation for Q2 export invoices',
      clientId: 'oswal',
      clientName: 'Oswal Exports',
      engagementName: 'GST Export Refund',
      serviceLine: 'gst',
      status: 'blocked',
      statusLabel: 'Blocked',
      effortSpent: 2,
      effortTotal: 6,
      effortBarColor: 'gray',
      assignees: [
        { id: 'nj', name: 'Nikhil Jain', initials: 'NJ', color: '#7E22CE' },
        { id: 'pa', name: 'Pooja Agarwal', initials: 'PA', color: '#EC4899' },
        { id: 'nj2', name: 'Nikhil Jain', initials: 'NJ', color: '#00960F' },
      ],
      priority: 'urgent',
      dueDate: '19 Sep',
      dueDateNote: '(partner)',
      isLocked: true,
      isBlocked: true,
    },
    {
      id: 'task-gstr3b',
      title: 'GSTR-3B Monthly Return Filing (August 2026)',
      clientId: 'oswal',
      clientName: 'Oswal Exports',
      engagementName: 'GST Compliance',
      serviceLine: 'gst',
      status: 'in-progress',
      statusLabel: 'In Progress',
      effortSpent: 2.5,
      effortTotal: 4,
      effortBarColor: 'green',
      assignees: [
        { id: 'nj', name: 'Nikhil Jain', initials: 'NJ', color: '#7E22CE' },
        { id: 'pa', name: 'Pooja Agarwal', initials: 'PA', color: '#EC4899' },
      ],
      priority: 'high',
      dueDate: '20 Sep',
    },
    {
      id: 'task-bank-reco',
      title: 'Bank reconciliation - SBI Export Account & HDFC Current',
      clientId: 'oswal',
      clientName: 'Oswal Exports',
      engagementName: 'Accounting Retainer',
      serviceLine: 'accounting',
      status: 'in-progress',
      statusLabel: 'In Progress',
      effortSpent: 3,
      effortTotal: 5,
      effortBarColor: 'green',
      assignees: [
        { id: 'as', name: 'Aditya Sharma', initials: 'AS', color: '#004AAD', isOnline: true },
      ],
      priority: 'high',
      dueDate: '20 Sep',
    },
    {
      id: 'task-shipping-bill',
      title: 'Shipping bill matching with ICEGATE custom records',
      clientId: 'oswal',
      clientName: 'Oswal Exports',
      engagementName: 'Customs & EXIM',
      serviceLine: 'gst',
      status: 'in-progress',
      statusLabel: 'In Progress',
      effortSpent: 3.5,
      effortTotal: 4,
      effortBarColor: 'orange',
      assignees: [
        { id: 'as', name: 'Aditya Sharma', initials: 'AS', color: '#004AAD', isOnline: true },
      ],
      priority: 'medium',
      dueDate: '21 Sep',
      isLocked: true,
    },
    {
      id: 'task-provisional-bs',
      title: 'Provisional balance sheet for bank',
      clientId: 'oswal',
      clientName: 'Oswal Exports',
      engagementName: 'Statutory Audit',
      serviceLine: 'audit',
      status: 'internal-review',
      statusLabel: 'Internal Review',
      effortSpent: 7,
      effortTotal: 12,
      effortBarColor: 'green',
      assignees: [
        { id: 'nj', name: 'Nikhil Jain', initials: 'NJ', color: '#7E22CE' },
        { id: 'pa', name: 'Pooja Agarwal', initials: 'PA', color: '#EC4899' },
      ],
      priority: 'urgent',
      dueDate: 'Yesterday',
      isLocked: true,
    },
  ];

  // Dynamic animation and interactive workflow overrides
  const activeTasks: DemoTask[] = tasks.map((t) => {
    if (t.id === 'task-gstr1') {
      const st = gstr1Status || t.status;
      const stLabel =
        st === 'in-progress'
          ? 'In Progress'
          : st === 'internal-review'
          ? 'Internal Review'
          : st === 'filed'
          ? 'Filed / Done'
          : st === 'to-do'
          ? 'To Do'
          : 'Blocked';
      const spent = gstr1Effort
        ? gstr1Effort.spent
        : st === 'internal-review' || st === 'filed'
        ? 3
        : t.effortSpent;
      const total = gstr1Effort ? gstr1Effort.total : t.effortTotal;
      const barColor = st === 'filed' || st === 'internal-review' ? 'green' : t.effortBarColor;
      return {
        ...t,
        status: st,
        statusLabel: stLabel,
        effortSpent: spent,
        effortTotal: total,
        effortBarColor: barColor,
      };
    }
    if (t.id === 'task-gstr3b') {
      const st = gstr3bStatus || t.status;
      const stLabel =
        st === 'in-progress'
          ? 'In Progress'
          : st === 'internal-review'
          ? 'Internal Review'
          : st === 'filed'
          ? 'Filed / Done'
          : st === 'to-do'
          ? 'To Do'
          : 'Blocked';
      const spent = gstr3bEffort
        ? gstr3bEffort.spent
        : st === 'filed'
        ? 4
        : st === 'internal-review'
        ? 3.5
        : t.effortSpent;
      const total = gstr3bEffort ? gstr3bEffort.total : t.effortTotal;
      const barColor = st === 'filed' ? 'green' : t.effortBarColor;
      return {
        ...t,
        status: st,
        statusLabel: stLabel,
        effortSpent: spent,
        effortTotal: total,
        effortBarColor: barColor,
      };
    }
    return t;
  });

  return (
    <div
      data-product-target="client-workspace-view"
      className={`flex-1 flex flex-col min-w-0 bg-white overflow-hidden select-none ${className}`}
    >
      {/* 1. Client Header Banner */}
      <div
        data-product-target="client-header"
        className="px-5 py-3 border-b border-[#E5EAF2] flex items-center justify-between gap-4 bg-white shrink-0"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2">
            <PyngynIcons.user size={16} className="text-[#004AAD]" />
            <h1 className="text-[17px] font-bold text-[#113353] tracking-tight truncate">
              {clientName}
            </h1>
            <PyngynIcons.chevronDown size={14} className="text-[#627D98] cursor-pointer" />
            <PyngynIcons.star size={14} className="text-[#627D98] hover:text-[#D97706] cursor-pointer" />
          </div>

          {/* Badges */}
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
              className="px-2 py-0.5 rounded-[5px] bg-white border border-[#CBD5E1] hover:border-[#113353] text-[11px] font-bold text-[#113353] flex items-center gap-1 cursor-pointer transition-colors shadow-3xs"
            >
              <PyngynIcons.star size={11} className="text-[#D97706] fill-[#D97706]" />
              <span>Default</span>
            </button>

            <button
              type="button"
              className="px-2 py-0.5 rounded-[5px] bg-white border border-[#CBD5E1] text-[11px] font-medium text-[#627D98] flex items-center gap-1 cursor-pointer hover:text-[#113353]"
            >
              <span>More Actions</span>
              <PyngynIcons.chevronDown size={11} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Client-Level 40px Underline Tab Bar */}
      <div
        data-product-target="client-tabs-bar"
        className="h-[40px] max-h-[40px] px-5 bg-white border-b border-[#E5EAF2] flex items-center justify-between text-[12.5px] font-medium shrink-0"
      >
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
                data-product-target={`client-tab-${tab.id}`}
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

          <button
            type="button"
            className="h-full px-2 text-[#627D98] hover:text-[#113353] flex items-center gap-1 text-[12px]"
          >
            <span>More</span>
            <PyngynIcons.chevronDown size={11} />
          </button>

          <button
            type="button"
            className="h-full px-2 text-[#627D98] hover:text-[#113353] flex items-center gap-1 text-[12px] font-semibold"
          >
            <span className="text-[#004AAD] font-bold">+</span>
            <span>View</span>
          </button>
        </div>

        {/* View Switcher: List, Board, Calendar, Timeline */}
        <div
          data-product-target="view-switcher"
          className="flex items-center gap-1 bg-[#F8FAFC] p-0.5 rounded-[7px] border border-[#E5EAF2]"
        >
          {[
            { id: 'list', label: 'List', icon: <PyngynIcons.list size={12} /> },
            { id: 'board', label: 'Board', icon: <PyngynIcons.kanban size={12} /> },
            { id: 'calendar', label: 'Calendar', icon: <PyngynIcons.calendar size={12} /> },
            { id: 'timeline', label: 'Timeline', icon: <PyngynIcons.timeline size={12} /> },
          ].map((view) => {
            const isCurrent = activeViewShape === view.id;
            return (
              <button
                key={view.id}
                type="button"
                data-product-target={`view-btn-${view.id}`}
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

      {/* 3. Sub-Tabs Bar: All Tasks (14) | Active Filings (12) | Review Queue (11) | Filed & Done (2) */}
      <div
        data-product-target="sub-tabs-bar"
        className="h-[36px] px-5 bg-white border-b border-[#E5EAF2] flex items-center justify-between text-[12px] shrink-0"
      >
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
          <button type="button" className="text-[#627D98] hover:text-[#113353] flex items-center gap-1 font-medium">
            <span className="text-[#004AAD] font-bold">+</span>
            <span>View</span>
          </button>
        </div>
      </div>

      {/* 4. Controls Toolbar: Filter, Sort, Group by, + New Task, Avatars */}
      <div
        data-product-target="task-toolbar"
        className="px-5 py-2 bg-white border-b border-[#E5EAF2] flex items-center justify-between gap-3 text-[12px] shrink-0"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            className="px-2.5 py-1 rounded-[6px] border border-[#E5EAF2] bg-[#F8FAFC] hover:bg-white text-[#113353] font-medium flex items-center gap-1.5 transition-colors"
          >
            <PyngynIcons.filter size={12} className="text-[#627D98]" />
            <span>Filter</span>
          </button>

          <button
            type="button"
            className="px-2.5 py-1 rounded-[6px] border border-[#E5EAF2] bg-[#F8FAFC] hover:bg-white text-[#113353] font-medium flex items-center gap-1.5 transition-colors"
          >
            <PyngynIcons.sort size={12} className="text-[#627D98]" />
            <span>Sort</span>
            <PyngynIcons.chevronDown size={11} className="text-[#627D98]" />
          </button>

          <button
            type="button"
            className="px-2.5 py-1 rounded-[6px] border border-[#E5EAF2] bg-[#F8FAFC] hover:bg-white text-[#113353] font-medium flex items-center gap-1.5 transition-colors"
          >
            <PyngynIcons.grid size={12} className="text-[#627D98]" />
            <span>Group by: Due Date</span>
            <PyngynIcons.chevronDown size={11} className="text-[#627D98]" />
          </button>

          <button
            type="button"
            className="px-2 py-1 rounded-[6px] border border-[#E5EAF2] bg-white text-[#113353] font-medium flex items-center gap-1"
          >
            <span>All Tasks</span>
            <span className="text-[10px] bg-[#E5EAF2] px-1 rounded-full text-[#627D98]">14</span>
            <PyngynIcons.chevronDown size={10} className="text-[#627D98]" />
          </button>

          <button
            type="button"
            className="px-2 py-1 rounded-[6px] border border-[#E5EAF2] bg-white text-[#113353] font-medium flex items-center gap-1"
          >
            <span>All Engagements</span>
            <span className="text-[10px] bg-[#E5EAF2] px-1 rounded-full text-[#627D98]">14</span>
            <PyngynIcons.chevronDown size={10} className="text-[#627D98]" />
          </button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="w-7 h-7 rounded-[6px] border border-[#E5EAF2] hover:bg-[#F8FAFC] flex items-center justify-center text-[#627D98] hover:text-[#113353]"
            title="Bookmark"
          >
            <PyngynIcons.star size={13} />
          </button>

          <button
            type="button"
            className="w-7 h-7 rounded-[6px] border border-[#E5EAF2] hover:bg-[#F8FAFC] flex items-center justify-center text-[#627D98] hover:text-[#113353]"
            title="Custom Fields & Columns"
          >
            <PyngynIcons.sliders size={13} />
          </button>

          {/* + New Task Button */}
          <button
            type="button"
            data-product-target="new-task-btn"
            className="h-[28px] px-2.5 rounded-[6px] bg-[#113353] hover:bg-[#0B2238] text-white font-bold text-[11.5px] flex items-center gap-1 shadow-2xs transition-colors"
          >
            <PyngynIcons.plus size={12} />
            <span>New Task</span>
          </button>

          {/* Avatar Stack */}
          <div className="flex items-center -space-x-1.5 ml-1">
            <span className="w-6 h-6 rounded-[5px] bg-[#7E22CE] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
              PS
            </span>
            <span className="w-6 h-6 rounded-[5px] bg-[#004AAD] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
              RM
            </span>
            <span className="w-6 h-6 rounded-[5px] bg-[#00960F] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
              IG
            </span>
            <span className="w-6 h-6 rounded-[5px] bg-[#E5EAF2] text-[#627D98] text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
              +2
            </span>
          </div>

          <button
            type="button"
            className="px-2 py-1 rounded-[6px] border border-[#E5EAF2] text-[11px] font-medium text-[#113353] hover:bg-[#F8FAFC]"
          >
            Save View
          </button>

          <button
            type="button"
            className="w-7 h-7 rounded-[6px] text-[#627D98] hover:bg-[#F8FAFC] flex items-center justify-center"
          >
            <PyngynIcons.more size={13} />
          </button>
        </div>
      </div>

      {/* 5. Main Task Table Body */}
      <div className="flex-1 overflow-y-auto px-5 py-3">
        {/* Table Column Header */}
        <div className="grid grid-cols-[30px_minmax(320px,2.5fr)_130px_110px_130px_110px_120px] gap-2 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#627D98] border-b border-[#E5EAF2] items-center bg-[#F8FAFC] rounded-t-[8px]">
          <div className="flex items-center justify-center">
            <input type="checkbox" className="rounded border-[#CBD5E1]" />
          </div>
          <div>NAME</div>
          <div>STATUS</div>
          <div>EFFORT</div>
          <div>ASSIGNEE</div>
          <div>PRIORITY</div>
          <div>DUE</div>
        </div>

        {/* Group Header: OVERDUE (PAST STATUTORY TARGET) 9 */}
        <div
          data-product-target="group-overdue-header"
          className="mt-2 mb-1 flex items-center gap-2"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#DC2626] text-white text-[11.5px] font-bold shadow-xs">
            <PyngynIcons.alertTriangle size={13} />
            <span>OVERDUE (PAST STATUTORY TARGET)</span>
            <span className="ml-1 text-[11px] px-1.5 py-0.2 rounded-full bg-white/20">9</span>
          </div>
        </div>

        {/* 9 Task Rows */}
        <div className="divide-y divide-[#E5EAF2]/80 border border-[#E5EAF2] rounded-[8px] overflow-visible bg-white shadow-2xs">
          {activeTasks.map((task) => {
            const isSelected = task.id === selectedTaskId || task.isSelected;
            const isHighlighted =
              highlightTaskId === task.id ||
              activeTarget === `task-row-${task.id}` ||
              activeTarget === `status-pill-${task.id}` ||
              activeTarget === `task-title-${task.id}`;
            return (
              <div
                key={task.id}
                data-product-target={`task-row-${task.id}`}
                onClick={() => onSelectTask?.(task.id)}
                className={`grid grid-cols-[30px_minmax(320px,2.5fr)_130px_110px_130px_110px_120px] gap-2 items-center px-3 py-2 text-[12.5px] transition-colors cursor-pointer group relative ${
                  isHighlighted
                    ? 'bg-[#EEF5FF] ring-2 ring-[#004AAD]/40 shadow-xs z-10'
                    : isSelected
                    ? 'bg-[#EEF5FF] border-y border-[#004AAD]/40 shadow-xs'
                    : 'hover:bg-[#F8FAFC]'
                }`}
              >
                {/* 1. Checkbox */}
                <div className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={task.status === 'filed'}
                    onChange={() => {}}
                    className="rounded border-[#CBD5E1] text-[#004AAD] focus:ring-0"
                  />
                </div>

                {/* 2. Title + Meta Chips */}
                <div className="min-w-0 pr-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0 truncate">
                    <span
                      data-product-target={`task-title-${task.id}`}
                      className="font-medium text-[#113353] truncate group-hover:text-[#004AAD] transition-colors"
                      title={task.title}
                    >
                      {task.title}
                    </span>
                    {task.isLocked && (
                      <PyngynIcons.lock size={11} className="text-[#627D98] shrink-0" />
                    )}
                    {task.isBlocked && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#FEF2F2] text-[#DC2626] text-[10px] font-bold shrink-0">
                        <PyngynIcons.lock size={9} />
                        <span>Blocked</span>
                      </span>
                    )}
                  </div>

                  {/* Actions visible on hover or selection */}
                  {isSelected && (
                    <div className="flex items-center gap-1 shrink-0 text-[#627D98]">
                      <button type="button" className="p-0.5 hover:text-[#004AAD]" title="Add Subtask">
                        <PyngynIcons.plus size={12} />
                      </button>
                      <button type="button" className="p-0.5 hover:text-[#004AAD]" title="Edit Title">
                        <PyngynIcons.edit size={11} />
                      </button>
                    </div>
                  )}
                </div>

                {/* 3. Status Pill + Dropdown Target */}
                <div className="min-w-0 relative">
                  <span
                    data-product-target={`status-pill-${task.id}`}
                    className={`inline-flex items-center px-2 py-0.5 rounded-[5px] text-[11px] font-bold truncate transition-all duration-300 ${
                      task.status === 'in-progress'
                        ? 'bg-[#EEF5FF] text-[#004AAD] border border-[#C2DCFF]'
                        : task.status === 'blocked'
                        ? 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]'
                        : task.status === 'internal-review'
                        ? 'bg-[#FAF5FF] text-[#7E22CE] border border-[#E9D5FF] shadow-xs'
                        : task.status === 'filed'
                        ? 'bg-[#F0FAF0] text-[#00960F] border border-[#B5EDB9] shadow-xs'
                        : 'bg-[#F8FAFC] text-[#627D98] border border-[#CBD5E1]'
                    }`}
                  >
                    {task.status === 'filed' && <PyngynIcons.check size={11} className="mr-1 inline-block" />}
                    {task.statusLabel}
                  </span>

                  {/* Automated interactive dropdown for GSTR-1 */}
                  {task.id === 'task-gstr1' && gstr1DropdownOpen && (
                    <div
                      data-product-target="status-dropdown"
                      className="absolute top-[calc(100%+4px)] left-0 w-44 bg-white rounded-[8px] border border-[#CBD5E1] shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-200"
                    >
                      <div className="px-2.5 py-1 text-[9.5px] font-mono font-bold text-[#627D98] uppercase tracking-wider border-b border-[#E5EAF2]">
                        Status Options
                      </div>
                      {[
                        { id: 'to-do', label: 'To Do', color: 'text-slate-600', bg: 'hover:bg-slate-50' },
                        { id: 'in-progress', label: 'In Progress', color: 'text-[#004AAD]', bg: 'hover:bg-blue-50' },
                        { id: 'internal-review', label: 'Internal Review', color: 'text-[#7E22CE]', bg: 'hover:bg-purple-50' },
                        { id: 'blocked', label: 'Blocked', color: 'text-[#DC2626]', bg: 'hover:bg-rose-50' },
                        { id: 'filed', label: 'Filed / Completed', color: 'text-[#00960F]', bg: 'hover:bg-emerald-50' },
                      ].map((opt) => {
                        const isSelectedOption = gstr1DropdownSelected
                          ? gstr1DropdownSelected === opt.id
                          : opt.id === 'internal-review';
                        return (
                          <div
                            key={opt.id}
                            data-product-target={`status-option-${opt.id}`}
                            className={`px-3 py-1.5 flex items-center justify-between text-[11px] font-medium cursor-pointer transition-colors ${opt.color} ${opt.bg} ${
                              isSelectedOption
                                ? 'bg-[#EEF5FF] font-bold ring-1 ring-[#004AAD]/30'
                                : ''
                            }`}
                          >
                            <span>{opt.label}</span>
                            {isSelectedOption && (
                              <PyngynIcons.check size={11} className="text-[#004AAD]" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 4. Effort Bar */}
                <div className="min-w-0 flex items-center gap-1.5">
                  <span className="text-[11px] font-mono text-[#627D98] flex items-center gap-1">
                    <PyngynIcons.clock size={11} className="text-[#627D98] shrink-0" />
                    <span>{task.effortSpent}/{task.effortTotal}h</span>
                  </span>
                  <div className="w-10 h-1.5 rounded-full bg-[#E5EAF2] overflow-hidden shrink-0">
                    <div
                      className={`h-full rounded-full ${
                        task.effortBarColor === 'green'
                          ? 'bg-[#00960F]'
                          : task.effortBarColor === 'orange'
                          ? 'bg-[#D97706]'
                          : 'bg-[#94A3B8]'
                      }`}
                      style={{
                        width: `${Math.min(100, (task.effortSpent / task.effortTotal) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* 5. Assignee Avatars */}
                <div className="min-w-0 flex items-center gap-1">
                  <div className="flex items-center -space-x-1">
                    {task.assignees.map((a, i) => (
                      <div
                        key={i}
                        className="relative w-5 h-5 rounded-[5px] flex items-center justify-center text-white text-[9px] font-bold ring-1 ring-white"
                        style={{ backgroundColor: a.color }}
                        title={a.name}
                      >
                        {a.initials}
                        {a.isOnline && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#00960F] ring-1 ring-white" />
                        )}
                      </div>
                    ))}
                  </div>
                  {task.assignees.length === 1 && (
                    <span className="text-[11px] text-[#113353] truncate font-medium ml-1">
                      {task.assignees[0].name.split(' ')[0]}
                    </span>
                  )}
                </div>

                {/* 6. Priority Flag */}
                <div className="min-w-0 flex items-center gap-1.5">
                  <PyngynIcons.flag
                    size={12}
                    className={
                      task.priority === 'urgent'
                        ? 'text-[#DC2626] fill-[#DC2626]'
                        : task.priority === 'high'
                        ? 'text-[#D97706] fill-[#D97706]'
                        : 'text-[#004AAD] fill-[#004AAD]'
                    }
                  />
                  <span
                    className={`text-[11.5px] font-medium capitalize ${
                      task.priority === 'urgent'
                        ? 'text-[#DC2626] font-bold'
                        : task.priority === 'high'
                        ? 'text-[#D97706]'
                        : 'text-[#113353]'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>

                {/* 7. Due Date */}
                <div className="min-w-0 flex items-center gap-1 text-[11.5px] text-[#DC2626] font-medium">
                  <PyngynIcons.calendar size={12} className="text-[#DC2626] shrink-0" />
                  <span className="truncate">{task.dueDate}</span>
                  {task.dueDateNote && (
                    <span className="text-[10px] text-[#627D98] truncate">{task.dueDateNote}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
