"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  Search,
  Sparkles,
  Plus,
  Bell,
  Eye,
  CheckCircle2,
} from "lucide-react";

interface TopBarProps {
  firmName?: string;
  onSearchClick?: () => void;
  onCreateClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  firmName = "Sharma & Associates",
  onSearchClick,
  onCreateClick,
}) => {
  const [isFirmMenuOpen, setIsFirmMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  return (
    <header className="h-[52px] min-h-[52px] px-3 sm:px-4 flex items-center justify-between select-none bg-white border-b border-slate-200 shrink-0 z-30">
      {/* Left: Firm Identifier & Dropdown */}
      <div className="flex items-center gap-2 relative">
        <button
          type="button"
          onClick={() => setIsFirmMenuOpen(!isFirmMenuOpen)}
          className="inline-flex items-center gap-2 border border-slate-200 hover:border-pink-300 rounded-[8px] py-1 px-2.5 bg-slate-50 hover:bg-pink-50/40 text-slate-800 cursor-pointer transition-all shadow-2xs group"
          title="Switch Firm Workspace & Spaces"
        >
          <div className="w-[22px] h-[22px] rounded-[6px] bg-[#14223d] text-white flex items-center justify-center font-bold text-[11px] shadow-2xs">
            P
          </div>
          <span className="text-[13px] font-bold text-[#14223d] group-hover:text-[#db2777] leading-none transition-colors">
            Pyngyn
          </span>
          <span className="text-[12px] text-slate-500 font-normal hidden sm:inline">
            / {firmName}
          </span>
          <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-transform" />
        </button>

        {isFirmMenuOpen && (
          <div className="absolute left-0 top-full mt-1.5 w-64 bg-white border border-slate-200 rounded-[10px] shadow-xl p-2 z-50 animate-in fade-in duration-100 text-[12px]">
            <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Practices &amp; Branches
            </div>
            <button
              type="button"
              onClick={() => setIsFirmMenuOpen(false)}
              className="w-full text-left px-2.5 py-1.5 rounded-[6px] bg-pink-50 font-bold text-[#db2777] flex items-center justify-between"
            >
              <span>Sharma &amp; Associates (Main)</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#db2777]" />
            </button>
            <button
              type="button"
              onClick={() => setIsFirmMenuOpen(false)}
              className="w-full text-left px-2.5 py-1.5 rounded-[6px] hover:bg-slate-100 text-slate-700 transition-colors mt-0.5"
            >
              S&amp;A Audit Advisory LLP
            </button>
          </div>
        )}
      </div>

      {/* Center: Search Command Bar */}
      <div className="flex-1 max-w-[380px] mx-2 sm:mx-4">
        <button
          type="button"
          onClick={onSearchClick}
          className="w-full bg-slate-50 hover:bg-white rounded-full py-1.5 px-3.5 flex items-center justify-between border border-slate-200 hover:border-pink-300 shadow-2xs cursor-pointer transition-all group focus:outline-none"
        >
          <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-700 transition-colors">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#db2777] transition-colors" />
            <span className="text-[12.5px] font-normal truncate">Search ⌘K</span>
          </div>
          <Sparkles className="w-3.5 h-3.5 text-[#db2777] shrink-0" />
        </button>
      </div>

      {/* Right: Quick Action Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* + Create Button */}
        <button
          type="button"
          onClick={onCreateClick}
          className="px-2.5 py-1 rounded-[7px] bg-[#14223d] hover:bg-[#1c2e4f] text-white text-[12px] font-bold flex items-center gap-1 transition-all shadow-2xs cursor-pointer"
        >
          <Plus className="w-3 h-3 text-white" />
          <span className="hidden sm:inline">Create</span>
        </button>

        <div className="w-[1px] h-[18px] bg-slate-200 mx-0.5" />

        {/* Mascot Avatar Link */}
        <div
          className="p-1 rounded-[7px] hover:bg-slate-100 cursor-pointer transition-colors relative"
          title="Pyngyn Practice Assistant"
        >
          <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-300 shadow-2xs">
            <Image
              src="/mascot/pyngyn-ai-avatar.png"
              alt="Pyng Assistant"
              width={20}
              height={20}
              className="object-cover"
            />
          </div>
        </div>

        {/* Watch Chip */}
        <div
          className="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 border border-amber-200/90 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full cursor-pointer transition-colors"
          title="3 Compliance Watch alerts active"
        >
          <Eye className="w-3 h-3 text-amber-600" />
          <span>3 WATCH</span>
        </div>

        {/* Notification Bell with Badge */}
        <button
          type="button"
          onClick={() => setUnreadCount(0)}
          className="relative p-1.5 rounded-[7px] hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 px-1 py-0.2 rounded-full bg-[#db2777] text-white text-[9px] font-extrabold leading-none min-w-[14px] text-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
