'use client';

import React, { useState } from 'react';
import { PyngynIcons } from './PyngynIcons';

export interface PyngynHomeSidebarProps {
  activeSection?: 'my-work' | 'review-queue' | 'timesheet';
  onSelectSection?: (id: string) => void;
  className?: string;
}

export const PyngynHomeSidebar: React.FC<PyngynHomeSidebarProps> = ({
  activeSection = 'my-work',
  onSelectSection,
  className = '',
}) => {
  const [scope, setScope] = useState<'client' | 'internal'>('client');

  return (
    <aside
      data-product-target="home-sidebar"
      className={`w-[210px] min-w-[210px] max-w-[210px] bg-[#F8FAFC] border-r border-[#E5EAF2] flex flex-col text-[12px] select-none shrink-0 ${className}`}
    >
      {/* 1. Header Banner */}
      <div className="p-3 border-b border-[#E5EAF2] flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FF] text-[#004AAD] border border-[#C2DCFF] flex items-center justify-center shrink-0">
          <PyngynIcons.home size={15} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-bold text-[13px] text-[#113353] leading-tight truncate">
            Home
          </h2>
          <p className="text-[10px] text-[#627D98] truncate">
            My work, priority views &amp; chats
          </p>
        </div>
      </div>

      {/* 2. Client vs Internal Segmented Switcher */}
      <div className="p-2 border-b border-[#E5EAF2]">
        <div className="grid grid-cols-2 p-0.5 bg-[#E5EAF2]/60 rounded-[7px] gap-1">
          <button
            type="button"
            data-product-target="home-scope-client"
            onClick={() => setScope('client')}
            className={`py-1 px-1.5 rounded-[5px] text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
              scope === 'client'
                ? 'bg-[#113353] text-white shadow-2xs'
                : 'text-[#627D98] hover:text-[#113353]'
            }`}
          >
            <span>Client</span>
            <span className={`text-[10px] px-1 rounded-full ${scope === 'client' ? 'bg-white/20 text-white' : 'bg-white text-[#627D98]'}`}>
              5
            </span>
          </button>

          <button
            type="button"
            data-product-target="home-scope-internal"
            onClick={() => setScope('internal')}
            className={`py-1 px-1.5 rounded-[5px] text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
              scope === 'internal'
                ? 'bg-[#113353] text-white shadow-2xs'
                : 'text-[#627D98] hover:text-[#113353]'
            }`}
          >
            <span>Internal</span>
            <span className={`text-[10px] px-1 rounded-full ${scope === 'internal' ? 'bg-white/20 text-white' : 'bg-white text-[#627D98]'}`}>
              2
            </span>
          </button>
        </div>
      </div>

      {/* 3. Sections List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {/* MY WORK */}
        <div>
          <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#627D98]">
            My Work
          </div>
          <div className="space-y-0.5">
            <div
              data-product-target="home-my-work-link"
              onClick={() => onSelectSection?.('my-work')}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-[6px] font-bold cursor-pointer transition-colors ${
                activeSection === 'my-work'
                  ? 'bg-[#E8EFF8] text-[#113353] border border-[#C2DCFF]'
                  : 'text-[#113353] hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <PyngynIcons.checkSquare size={13} className="text-[#004AAD]" />
                <span className="text-[12px]">My Work</span>
              </div>
              <span className="text-[10.5px] font-bold text-[#627D98] bg-white px-1.5 py-0.2 rounded-full border border-[#E5EAF2]">
                4
              </span>
            </div>

            <div
              onClick={() => onSelectSection?.('review-queue')}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-[6px] font-medium text-[#113353] hover:bg-white cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <PyngynIcons.clock size={13} className="text-[#627D98]" />
                <span className="text-[12px]">Review Queue</span>
              </div>
              <span className="text-[10.5px] font-bold text-[#D97706] bg-[#FEF3C7] px-1.5 py-0.2 rounded-full">
                11
              </span>
            </div>

            <div
              onClick={() => onSelectSection?.('timesheet')}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-[6px] font-medium text-[#113353] hover:bg-white cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <PyngynIcons.calendar size={13} className="text-[#627D98]" />
                <span className="text-[12px]">Timesheet</span>
              </div>
              <span className="text-[10.5px] text-[#627D98]">31.5h</span>
            </div>
          </div>
        </div>

        {/* PRIORITY VIEWS */}
        <div>
          <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#627D98]">
            Priority Views
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded-[6px] font-medium text-[#DC2626] hover:bg-[#FEF2F2] cursor-pointer transition-colors">
              <div className="flex items-center gap-2">
                <PyngynIcons.alertTriangle size={13} className="text-[#DC2626]" />
                <span className="text-[12px]">Blocked on Client</span>
              </div>
              <span className="text-[10.5px] font-bold text-[#DC2626] bg-[#FEF2F2] px-1.5 py-0.2 rounded-full border border-[#FECACA]">
                2
              </span>
            </div>

            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-[6px] font-medium text-[#113353] hover:bg-white cursor-pointer transition-colors">
              <PyngynIcons.star size={13} className="text-[#D97706]" />
              <span className="text-[12px]">Starred Items</span>
            </div>
          </div>
        </div>

        {/* CLIENT CHATS */}
        <div>
          <div className="flex items-center justify-between px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#627D98]">
            <span>Channels (5)</span>
            <span className="text-[12px] text-[#113353] cursor-pointer">+</span>
          </div>
          <div className="space-y-0.5 text-[11.5px]">
            {[
              { name: 'tax-audit-fy26', badge: 1 },
              { name: 'gst-scrutiny-portal', badge: 5 },
              { name: 'roc-mca-approvals', badge: 3 },
              { name: 'transfer-pricing-fy26', badge: 2 },
              { name: 'customs-exim-desk', badge: 1 },
            ].map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between px-2 py-1 text-[#627D98] hover:text-[#113353] hover:bg-white rounded-[5px] cursor-pointer"
              >
                <span className="truncate"># {c.name}</span>
                <span className="w-4 h-4 rounded-full bg-[#113353] text-white text-[9.5px] flex items-center justify-center font-bold">
                  {c.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* DIRECT MESSAGES */}
        <div>
          <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#627D98]">
            Direct Messages
          </div>
          <div className="flex items-center justify-between px-2 py-1 text-[#113353] font-medium hover:bg-white rounded-[5px] cursor-pointer">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-4 h-4 rounded-full bg-[#EC4899] text-white text-[9px] flex items-center justify-center font-bold">
                SO
              </span>
              <span className="truncate text-[11.5px]">Sunita Oswal</span>
            </div>
            <span className="w-4 h-4 rounded-full bg-[#004AAD] text-white text-[9.5px] flex items-center justify-center font-bold">
              3
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
