'use client';

import React from 'react';
import { PyngynIcons } from './PyngynIcons';

export interface PyngynAppRailProps {
  activeItem?: 'home' | 'clients' | 'crm' | 'cockpit' | 'dashboard' | 'workload' | 'calendar' | 'kb' | 'more';
  onNavigate?: (id: string) => void;
  variant?: 'light' | 'dark';
  className?: string;
}

export const PyngynAppRail: React.FC<PyngynAppRailProps> = ({
  activeItem = 'home',
  onNavigate,
  variant = 'light',
  className = '',
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <PyngynIcons.home size={18} /> },
    { id: 'clients', label: 'Clients', icon: <PyngynIcons.clients size={18} /> },
    { id: 'crm', label: 'CRM', icon: <PyngynIcons.crm size={18} /> },
    { id: 'cockpit', label: 'Cockpit', icon: <PyngynIcons.cockpit size={18} /> },
    { id: 'dashboard', label: 'Dashboard', icon: <PyngynIcons.dashboard size={18} /> },
    { id: 'workload', label: 'Workload', icon: <PyngynIcons.workload size={18} /> },
    { id: 'calendar', label: 'Calendar', icon: <PyngynIcons.calendar size={18} /> },
    { id: 'kb', label: 'Knowledge', icon: <PyngynIcons.knowledge size={18} /> },
    { id: 'more', label: 'More', icon: <PyngynIcons.more size={18} /> },
  ];

  const isLight = variant === 'light';

  return (
    <aside
      data-product-target="app-rail"
      className={`w-[64px] min-w-[64px] max-w-[64px] ${
        isLight
          ? 'bg-white border-r border-[#E5EAF2] text-slate-700'
          : 'bg-[#101D33] border-r border-[#1E3456] text-[#8FA7BF]'
      } flex flex-col items-center py-2.5 select-none shrink-0 z-20 font-sans ${className}`}
      aria-label="Application Rail"
    >
      {/* Top: Pyngyn Mascot Icon Tile */}
      <div
        data-product-target="rail-logo"
        className={`w-[38px] h-[38px] rounded-[10px] ${
          isLight
            ? 'bg-white border border-slate-200 hover:border-slate-400 shadow-3xs'
            : 'bg-[#101D33] border border-white/20 shadow-sm'
        } p-1 cursor-pointer mb-2 flex items-center justify-center transition-all group`}
        title="Pyngyn Practice OS"
      >
        <img
          src="/pyngyn-icon.png"
          alt="Pyngyn"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
        />
      </div>

      {/* Main Navigation Stack */}
      <div className="flex-1 w-full flex flex-col items-center gap-1">
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              type="button"
              data-product-target={`rail-item-${item.id}`}
              onClick={() => onNavigate?.(item.id)}
              className={`w-[52px] py-1.5 px-0.5 rounded-[9px] flex flex-col items-center justify-center relative cursor-pointer transition-colors ${
                isLight
                  ? isActive
                    ? 'bg-slate-200/90 text-gray-950 font-bold shadow-3xs'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-100 font-medium'
                  : isActive
                  ? 'bg-[#192E4D] text-[#5DE0E6] shadow-xs font-bold'
                  : 'text-[#8FA7BF] hover:text-white hover:bg-[#192E4D]/60'
              }`}
              title={item.label}
            >
              <span className="shrink-0">{item.icon}</span>
              <span className="text-[9.5px] leading-tight truncate max-w-full font-semibold mt-0.5">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Cluster: Bell, User Avatar NJ, Trash */}
      <div
        className={`w-full flex flex-col items-center gap-2 pt-2 border-t ${
          isLight ? 'border-slate-100' : 'border-[#1E3456]/60'
        }`}
      >
        {/* Notification Bell */}
        <button
          type="button"
          data-product-target="rail-notifications"
          className={`p-1.5 rounded-[8px] relative transition-colors ${
            isLight
              ? 'text-slate-600 hover:text-orange hover:bg-orange-50'
              : 'text-[#8FA7BF] hover:text-white hover:bg-[#192E4D]'
          }`}
          title="Notifications"
        >
          <PyngynIcons.bell size={17} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#DC2626]" />
        </button>

        {/* User Avatar: NJ in purple square matching source product */}
        <div
          data-product-target="rail-avatar"
          className="relative cursor-pointer group"
          title="CA Nikhil Jain (Partner)"
        >
          <div className="w-[32px] h-[32px] rounded-[7px] bg-[#7E22CE] text-white flex items-center justify-center font-bold text-[12px] shadow-3xs border border-white/20 group-hover:ring-2 group-hover:ring-orange/60 transition-all">
            NJ
          </div>
          <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#00960F] ring-1 ring-white" />
        </div>

        {/* Trash */}
        <button
          type="button"
          data-product-target="rail-trash"
          className={`w-[48px] py-1 px-0.5 rounded-[7px] flex flex-col items-center justify-center transition-colors ${
            isLight
              ? 'text-slate-500 hover:text-navy hover:bg-slate-100'
              : 'text-[#627D98] hover:text-[#DC2626] hover:bg-[#192E4D]'
          }`}
          title="Trash"
        >
          <PyngynIcons.trash size={15} />
          <span className="text-[9px] font-medium leading-none mt-0.5">Trash</span>
        </button>
      </div>
    </aside>
  );
};
