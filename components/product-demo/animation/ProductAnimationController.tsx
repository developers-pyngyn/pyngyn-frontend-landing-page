'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ExperienceTimeline, AnimationStep } from './ProductAnimationTimeline';
import { ProductCameraController } from './ProductCameraController';

export interface ProductAnimationState {
  currentStepIndex: number;
  currentStep: AnimationStep;
  scale: number;
  panX: number;
  panY: number;
  activeTarget?: string;
  statePayload?: Record<string, any>;
  isInView: boolean;
}

export interface ProductAnimationControllerProps {
  timeline: ExperienceTimeline;
  autoPlay?: boolean;
  children: (state: ProductAnimationState) => React.ReactNode;
  className?: string;
  frameClassName?: string;
}

export const ProductAnimationController: React.FC<ProductAnimationControllerProps> = ({
  timeline,
  autoPlay = true,
  children,
  className = '',
  frameClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // 1. Intersection Observer to start/pause animations based on viewport visibility
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. Timeline Step Progression Loop
  useEffect(() => {
    if (prefersReducedMotion || !autoPlay || !isInView || timeline.steps.length <= 1) {
      return;
    }

    const currentStep = timeline.steps[stepIndex] || timeline.steps[0];
    const duration = currentStep.durationMs || 3000;

    const timer = setTimeout(() => {
      setStepIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= timeline.steps.length) {
          return timeline.loop ? 0 : prevIndex;
        }
        return nextIndex;
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [stepIndex, isInView, autoPlay, timeline, prefersReducedMotion]);

  const currentStep = timeline.steps[stepIndex] || timeline.steps[0];

  const animationState: ProductAnimationState = {
    currentStepIndex: stepIndex,
    currentStep,
    scale: prefersReducedMotion ? 1 : currentStep.scale,
    panX: prefersReducedMotion ? 0 : currentStep.panX,
    panY: prefersReducedMotion ? 0 : currentStep.panY,
    activeTarget: currentStep.target,
    statePayload: currentStep.statePayload,
    isInView,
  };

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <ProductCameraController
        scale={animationState.scale}
        panX={animationState.panX}
        panY={animationState.panY}
        activeTarget={animationState.activeTarget}
        frameClassName={frameClassName}
      >
        {children(animationState)}
      </ProductCameraController>
    </div>
  );
};
