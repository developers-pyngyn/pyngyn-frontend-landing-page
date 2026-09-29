'use client';

import React from 'react';
import { PyngynIcons } from './PyngynIcons';

export interface PyngynClientSidebarProps {
  selectedClientId?: string;
  onSelectClient?: (id: string) => void;
  className?: string;
}

export const PyngynClientSidebar: React.FC<PyngynClientSidebarProps> = ({
  selectedClientId = 'oswal',
  onSelectClient,
  className = '',
}) => {
  return (
    <aside
      data-product-target="client-sidebar"
      className={`w-[210px] min-w-[210px] max-w-[210px] bg-[#F8FAFC] border-r border-[#E5EAF2] flex flex-col text-[12px] select-none shrink-0 ${className}`}
    >
      {/* 1. Header Banner */}
      <div className="p-3 border-b border-[#E5EAF2] flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FF] text-[#004AAD] border border-[#C2DCFF] flex items-center justify-center shrink-0">
          <PyngynIcons.clients size={15} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-bold text-[13px] text-[#113353] leading-tight truncate">
            Clients
          </h2>
          <p className="text-[10.5px] text-[#627D98] truncate">
            Portfolios &amp; client workspaces
          </p>
        </div>
      </div>

      {/* 2. Top Navigation Links */}
      <div className="p-2 space-y-0.5 border-b border-[#E5EAF2]">
        <div
          data-product-target="sidebar-all-clients"
          className="flex items-center justify-between px-2.5 py-1.5 rounded-[6px] hover:bg-white text-[#113353] font-medium cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2">
            <PyngynIcons.grid size={13} className="text-[#627D98]" />
            <span className="text-[12px]">All Clients &amp; Accounts</span>
          </div>
          <span className="text-[11px] font-bold text-[#627D98] bg-[#E5EAF2]/70 px-1.5 py-0.2 rounded-full">
            25
          </span>
        </div>

        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-[6px] hover:bg-white text-[#113353] font-medium cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            <PyngynIcons.clock size={13} className="text-[#627D98]" />
            <span className="text-[12px]">Recent Portfolios</span>
          </div>
          <PyngynIcons.chevronRight size={12} className="text-[#627D98]" />
        </div>

        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-[6px] hover:bg-white text-[#113353] font-medium cursor-pointer transition-colors">
          <PyngynIcons.timeline size={13} className="text-[#627D98]" />
          <span className="text-[12px]">Hierarchy</span>
        </div>
      </div>

      {/* 3. PINNED ITEMS Section Label */}
      <div className="px-3 pt-3 pb-1 text-[10px] font-bold tracking-wider text-[#D97706] flex items-center gap-1.5">
        <PyngynIcons.star size={11} className="text-[#D97706] fill-[#D97706]" />
        <span>PINNED ITEMS</span>
      </div>

      {/* 4. Client Portfolios Tree */}
      <div className="flex-1 overflow-y-auto px-2 py-1 space-y-1">
        <div className="flex items-center justify-between px-2 py-1 text-[11.5px] font-bold text-[#113353] cursor-pointer">
          <div className="flex items-center gap-1.5">
            <PyngynIcons.folder size={13} className="text-[#627D98]" />
            <span>Client Portfolios</span>
            <PyngynIcons.star size={10} className="text-[#D97706] fill-[#D97706]" />
          </div>
          <PyngynIcons.chevronDown size={11} className="text-[#627D98]" />
        </div>

        {/* Manufacturing Group */}
        <div className="pl-2 space-y-0.5">
          <div className="flex items-center gap-1.5 px-2 py-1 text-[11.5px] font-medium text-[#113353] hover:bg-white rounded-[5px] cursor-pointer">
            <PyngynIcons.folder size={12} className="text-[#D97706]" />
            <span className="truncate">Manufacturing...</span>
          </div>

          {/* Automotive Sub-group */}
          <div className="pl-3 space-y-0.5">
            <div className="flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium text-[#627D98] cursor-pointer">
              <PyngynIcons.chevronDown size={10} className="text-[#627D98]" />
              <PyngynIcons.folder size={11} className="text-[#004AAD]" />
              <span className="truncate">Automoti...</span>
            </div>

            {/* Oswal Exports (Active Selected Client) */}
            <div
              data-product-target="sidebar-client-oswal"
              onClick={() => onSelectClient?.('oswal')}
              className={`flex items-center justify-between pl-3 pr-2 py-1 rounded-[6px] font-bold cursor-pointer transition-colors ${
                selectedClientId === 'oswal'
                  ? 'bg-[#E8EFF8] text-[#113353] border border-[#C2DCFF] shadow-2xs'
                  : 'text-[#113353] hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <PyngynIcons.user size={12} className="text-[#004AAD] shrink-0" />
                <span className="truncate text-[11.5px]">Oswal E...</span>
                <PyngynIcons.star size={10} className="text-[#D97706] fill-[#D97706]" />
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#113353] text-white">
                2
              </span>
            </div>

            {/* Other clients */}
            <div className="flex items-center justify-between pl-3 pr-2 py-0.5 text-[#627D98] hover:text-[#113353] hover:bg-white rounded-[5px] cursor-pointer text-[11px]">
              <div className="flex items-center gap-1.5 truncate">
                <PyngynIcons.user size={11} className="text-[#627D98] shrink-0" />
                <span className="truncate">Precision ...</span>
              </div>
              <span className="text-[10px] text-[#627D98]">3</span>
            </div>

            <div className="flex items-center justify-between pl-3 pr-2 py-0.5 text-[#627D98] hover:text-[#113353] hover:bg-white rounded-[5px] cursor-pointer text-[11px]">
              <div className="flex items-center gap-1.5 truncate">
                <PyngynIcons.user size={11} className="text-[#627D98] shrink-0" />
                <span className="truncate">Allied ...</span>
              </div>
              <span className="text-[10px] text-[#627D98]">3</span>
            </div>

            <div className="flex items-center justify-between pl-3 pr-2 py-0.5 text-[#627D98] hover:text-[#113353] hover:bg-white rounded-[5px] cursor-pointer text-[11px]">
              <div className="flex items-center gap-1.5 truncate">
                <PyngynIcons.user size={11} className="text-[#627D98] shrink-0" />
                <span className="truncate">Apex ...</span>
              </div>
              <span className="text-[10px] text-[#627D98]">0</span>
            </div>
          </div>

          {/* Heavy M... Group */}
          <div className="pl-3 pt-1 space-y-0.5">
            <div className="flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium text-[#627D98] cursor-pointer">
              <PyngynIcons.chevronRight size={10} className="text-[#627D98]" />
              <PyngynIcons.folder size={11} className="text-[#7E22CE]" />
              <span className="truncate">Heavy M...</span>
            </div>
            <div className="flex items-center justify-between pl-3 pr-2 py-0.5 text-[#627D98] hover:bg-white rounded-[5px] cursor-pointer text-[11px]">
              <div className="flex items-center gap-1.5 truncate">
                <PyngynIcons.user size={11} className="text-[#627D98] shrink-0" />
                <span className="truncate">Infra ...</span>
              </div>
              <span className="text-[10px] text-[#627D98]">3</span>
            </div>
            <div className="flex items-center justify-between pl-3 pr-2 py-0.5 text-[#627D98] hover:bg-white rounded-[5px] cursor-pointer text-[11px]">
              <div className="flex items-center gap-1.5 truncate">
                <PyngynIcons.user size={11} className="text-[#627D98] shrink-0" />
                <span className="truncate">Logistics ...</span>
              </div>
              <span className="text-[10px] text-[#627D98]">1</span>
            </div>
            <div className="flex items-center justify-between pl-3 pr-2 py-0.5 text-[#627D98] hover:bg-white rounded-[5px] cursor-pointer text-[11px]">
              <div className="flex items-center gap-1.5 truncate">
                <PyngynIcons.user size={11} className="text-[#627D98] shrink-0" />
                <span className="truncate">Commercial ...</span>
              </div>
              <span className="text-[10px] text-[#627D98]">0</span>
            </div>
            <div className="flex items-center justify-between pl-3 pr-2 py-0.5 text-[#627D98] hover:bg-white rounded-[5px] cursor-pointer text-[11px]">
              <div className="flex items-center gap-1.5 truncate">
                <PyngynIcons.user size={11} className="text-[#627D98] shrink-0" />
                <span className="truncate">Manufacturing ...</span>
              </div>
              <span className="text-[10px] text-[#627D98]">0</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
