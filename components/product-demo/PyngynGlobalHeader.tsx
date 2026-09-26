'use client';

import React from 'react';
import { PyngynIcons } from './PyngynIcons';

export interface PyngynGlobalHeaderProps {
  showAlertBanner?: boolean;
  alertText?: string;
  firmName?: string;
  className?: string;
}

export const PyngynGlobalHeader: React.FC<PyngynGlobalHeaderProps> = ({
  showAlertBanner = true,
  alertText = 'GSTR-3B Overdue · 3 not ready +2',
  firmName = 'Sharma & Associates',
  className = '',
}) => {
  return (
    <header
      data-product-target="global-header"
      className={`h-[56px] min-h-[56px] px-3 sm:px-4 bg-white border-b border-[#E5EAF2] flex items-center justify-between select-none relative z-30 shrink-0 ${className}`}
    >
      {/* Left: Workspace Identifier Dropdown */}
      <div className="flex items-center gap-2 relative">
        <button
          type="button"
          data-product-target="workspace-switcher"
          className="inline-flex items-center gap-2 border border-[#E5EAF2] bg-[#F8FAFC] hover:bg-[#F0F4F8] text-[#113353] rounded-[8px] py-1.5 px-2.5 cursor-pointer transition-all shadow-2xs group"
          title="Switch Firm Workspace & Spaces"
        >
          <div className="w-[22px] h-[22px] rounded-[6px] bg-white border border-[#113353]/20 shadow-2xs flex items-center justify-center shrink-0 overflow-hidden p-0.5 group-hover:border-[#113353]/50 transition-colors">
            <img src="/pyngyn-icon.png" alt="Pyngyn" className="w-full h-full object-contain" />
          </div>
          <span className="text-[13.5px] font-bold text-[#113353] leading-none">
            Pyngyn
          </span>
          <span className="text-[12px] text-[#627D98] font-normal hidden sm:inline">
            / {firmName}
          </span>
          <PyngynIcons.chevronDown
            size={13}
            className="text-[#627D98] ml-0.5 group-hover:text-[#113353] transition-colors"
          />
        </button>
      </div>

      {/* Center: Search Command Bar & Optional Amber GSTR-3B Alert */}
      <div className="flex-1 max-w-[620px] mx-auto flex items-center justify-center gap-3 px-2">
        {showAlertBanner ? (
          <div
            data-product-target="header-alert-banner"
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#FEF3C7] border border-[#FCD34D] text-[#92400E] rounded-full text-[12px] font-bold shadow-xs cursor-pointer hover:bg-[#FDE68A] transition-colors"
            title="Statutory Overdue Alert"
          >
            <PyngynIcons.alertTriangle size={13} className="text-[#D97706] shrink-0" />
            <span className="truncate">{alertText}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] animate-pulse" />
            <span className="text-[#B45309] text-[11px] hover:text-black">✕</span>
          </div>
        ) : (
          <div
            data-product-target="header-search-bar"
            className="w-full max-w-[420px] bg-[#F8FAFC] hover:bg-white rounded-[24px] py-1.5 px-3.5 flex items-center justify-between border border-[#E5EAF2] hover:border-[#113353]/40 shadow-xs cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-2 text-[#627D98] group-hover:text-[#113353] transition-colors">
              <PyngynIcons.search size={14} className="text-[#627D98] group-hover:text-[#113353]" />
              <span className="text-[13px] font-normal">Search ⌘K</span>
            </div>
            <PyngynIcons.sparkles size={14} className="text-[#113353] shrink-0" />
          </div>
        )}
      </div>

      {/* Right Cluster: + Create, Mascot, Watch, Jobs */}
      <div className="flex items-center gap-2 shrink-0">
        {/* + Create Button */}
        <button
          type="button"
          data-product-target="global-create-btn"
          className="h-[32px] px-3 bg-[#113353] hover:bg-[#0B2238] text-white text-[12.5px] font-bold rounded-[8px] flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
        >
          <PyngynIcons.plus size={13} />
          <span>Create</span>
          <PyngynIcons.chevronDown size={11} className="opacity-80" />
        </button>

        <div className="w-[1px] h-[20px] bg-[#E5EAF2] mx-0.5" />

        {/* Mascot Avatar Icon */}
        <div
          data-product-target="mascot-ai-trigger"
          className="p-1 rounded-[7px] hover:bg-[#F8FAFC] cursor-pointer transition-colors flex items-center justify-center"
          title="Pyngyn Practice Assistant"
        >
          <img
            src="/mascot/pyngyn-avatar.png"
            alt="Pyngyn AI"
            className="w-5 h-5 rounded-full object-cover shadow-3xs hover:scale-105 transition-transform"
          />
        </div>

        {/* Compliance Watch Chip */}
        <div
          data-product-target="watch-chip"
          className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-[6px] bg-[#FEF9C3] text-[#854D0E] border border-[#FEF08A] text-[11px] font-bold cursor-pointer hover:bg-[#FEF08A] transition-colors"
          title="3 Mandates under active observation"
        >
          <span>3 WATCH</span>
        </div>

        {/* Jobs Waiting Status */}
        <div
          data-product-target="jobs-status-chip"
          className="hidden md:inline-flex items-center gap-1 px-2 py-1 rounded-[6px] bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] text-[11px] font-medium"
        >
          <span>Jobs: 1 waiting</span>
        </div>
      </div>
    </header>
  );
};
