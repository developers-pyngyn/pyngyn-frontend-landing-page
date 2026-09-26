'use client';

import React from 'react';
import { PyngynAppRail } from './PyngynAppRail';
import { PyngynGlobalHeader } from './PyngynGlobalHeader';
import { PyngynClientSidebar } from './PyngynClientSidebar';
import { PyngynHomeSidebar } from './PyngynHomeSidebar';
import { PyngynBottomTimer } from './PyngynBottomTimer';

export interface PyngynProductShellProps {
  activeRailItem?: 'home' | 'clients' | 'crm' | 'cockpit' | 'dashboard' | 'workload' | 'calendar' | 'kb' | 'more';
  sidebarVariant?: 'clients' | 'home' | 'none';
  selectedClientId?: string;
  onSelectClient?: (id: string) => void;
  showAlertBanner?: boolean;
  alertText?: string;
  showBottomTimer?: boolean;
  bottomTimerDisplay?: string;
  bottomActiveTaskTitle?: string;
  bottomClientName?: string;
  children: React.ReactNode;
  className?: string;
}

export const PyngynProductShell: React.FC<PyngynProductShellProps> = ({
  activeRailItem = 'clients',
  sidebarVariant = 'clients',
  selectedClientId = 'oswal',
  onSelectClient,
  showAlertBanner = true,
  alertText = 'GSTR-3B Overdue · 3 not ready +2',
  showBottomTimer = true,
  bottomTimerDisplay = '00:00:00',
  bottomActiveTaskTitle = 'GSTR-1 sales ledger ...',
  bottomClientName = 'Oswal Exports',
  children,
  className = '',
}) => {
  return (
    <div
      data-product-target="product-shell-root"
      className={`w-full h-full flex flex-col bg-white text-[#113353] font-sans antialiased overflow-hidden select-none border border-[#CBD5E1]/80 rounded-[12px] shadow-soft ${className}`}
    >
      {/* 1. Global 56px Top Header */}
      <PyngynGlobalHeader
        showAlertBanner={showAlertBanner}
        alertText={alertText}
        firmName="Sharma & Associates"
      />

      {/* 2. Middle Body: App Rail + Sidebar + Workspace Canvas */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        {/* Leftmost 56px Dark Navy Rail */}
        <PyngynAppRail activeItem={activeRailItem} />

        {/* Second Column Sidebar */}
        {sidebarVariant === 'clients' && (
          <PyngynClientSidebar
            selectedClientId={selectedClientId}
            onSelectClient={onSelectClient}
          />
        )}
        {sidebarVariant === 'home' && (
          <PyngynHomeSidebar activeSection="my-work" />
        )}

        {/* Main Work Surface */}
        <main className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden relative">
          {children}
        </main>
      </div>

      {/* 3. Bottom 40px Docked Execution Timer */}
      {showBottomTimer && (
        <PyngynBottomTimer
          timerDisplay={bottomTimerDisplay}
          activeTaskTitle={bottomActiveTaskTitle}
          clientName={bottomClientName}
        />
      )}
    </div>
  );
};
