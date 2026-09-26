'use client';

import React, { createContext, useContext } from 'react';
import { ProductAnimationState } from './ProductAnimationController';

export interface ProductInteractionContextType {
  activeTarget?: string;
  statePayload?: Record<string, any>;
  isInView: boolean;
}

const ProductInteractionContext = createContext<ProductInteractionContextType>({
  activeTarget: undefined,
  statePayload: undefined,
  isInView: false,
});

export const useProductInteraction = () => useContext(ProductInteractionContext);

export interface ProductInteractionControllerProps {
  animationState: ProductAnimationState;
  children: React.ReactNode;
}

export const ProductInteractionController: React.FC<ProductInteractionControllerProps> = ({
  animationState,
  children,
}) => {
  return (
    <ProductInteractionContext.Provider
      value={{
        activeTarget: animationState.activeTarget,
        statePayload: animationState.statePayload,
        isInView: animationState.isInView,
      }}
    >
      {children}
    </ProductInteractionContext.Provider>
  );
};
