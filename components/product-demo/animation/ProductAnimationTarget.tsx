'use client';

import React from 'react';
import { useProductInteraction } from './ProductInteractionController';

export interface ProductAnimationTargetProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

export const ProductAnimationTarget: React.FC<ProductAnimationTargetProps> = ({
  id,
  children,
  className = '',
  activeClassName = 'ring-2 ring-[#004AAD]/30 rounded-[8px]',
}) => {
  const { activeTarget } = useProductInteraction();
  const isActive = activeTarget === id;

  return (
    <div
      data-product-target={id}
      className={`transition-all duration-300 ${className} ${isActive ? activeClassName : ''}`}
    >
      {children}
    </div>
  );
};
