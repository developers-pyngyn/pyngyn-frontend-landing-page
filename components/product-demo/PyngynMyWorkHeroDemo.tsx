'use client';

import React from 'react';
import { PyngynHeroMyWork } from './PyngynHeroMyWork';

export function PyngynMyWorkHeroDemo({
  className = '',
  autoPlay = true,
}: {
  className?: string;
  autoPlay?: boolean;
}) {
  return <PyngynHeroMyWork className={className} autoPlay={autoPlay} />;
}

