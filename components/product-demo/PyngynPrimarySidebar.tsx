'use client';

import React from 'react';
import { PyngynAppRail, PyngynAppRailProps } from './PyngynAppRail';

export interface PyngynPrimarySidebarProps extends PyngynAppRailProps {}

export const PyngynPrimarySidebar: React.FC<PyngynPrimarySidebarProps> = (props) => {
  return <PyngynAppRail {...props} />;
};
