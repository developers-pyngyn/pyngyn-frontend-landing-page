'use client';

import React from 'react';
import { PyngynMyWorkDetailedView } from './PyngynMyWorkDetailedView';
import { TaskRowData } from './TaskRow';

export interface MyWorkViewProps {
  tasks?: TaskRowData[];
  activeTaskId?: string;
  onSelectTask?: (id: string) => void;
  autoPlay?: boolean;
  standalone?: boolean;
  className?: string;
}

export const MyWorkView: React.FC<MyWorkViewProps> = ({
  autoPlay = true,
  standalone = false,
  className = '',
}) => {
  return (
    <PyngynMyWorkDetailedView
      autoPlay={autoPlay}
      standalone={standalone}
      className={`w-full h-full ${className}`}
    />
  );
};
