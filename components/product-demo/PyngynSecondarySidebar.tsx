'use client';

import React from 'react';
import { PyngynHomeSidebar, PyngynHomeSidebarProps } from './PyngynHomeSidebar';
import { PyngynClientSidebar, PyngynClientSidebarProps } from './PyngynClientSidebar';

export interface PyngynSecondarySidebarProps {
  variant?: 'home' | 'clients';
  activeSection?: 'my-work' | 'review-queue' | 'timesheet';
  onSelectSection?: (id: string) => void;
  selectedClientId?: string;
  onSelectClient?: (id: string) => void;
  className?: string;
}

export const PyngynSecondarySidebar: React.FC<PyngynSecondarySidebarProps> = ({
  variant = 'home',
  activeSection = 'my-work',
  onSelectSection,
  selectedClientId = 'oswal',
  onSelectClient,
  className = '',
}) => {
  if (variant === 'clients') {
    return (
      <PyngynClientSidebar
        selectedClientId={selectedClientId}
        onSelectClient={onSelectClient}
        className={className}
      />
    );
  }

  return (
    <PyngynHomeSidebar
      activeSection={activeSection}
      onSelectSection={onSelectSection}
      className={className}
    />
  );
};
