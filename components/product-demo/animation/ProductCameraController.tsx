'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface ProductCameraControllerProps {
  nativeWidth?: number;
  nativeHeight?: number;
  scale?: number;
  panX?: number;
  panY?: number;
  activeTarget?: string;
  children: React.ReactNode;
  className?: string;
  frameClassName?: string;
  disableResponsiveScale?: boolean;
}

export const ProductCameraController: React.FC<ProductCameraControllerProps> = ({
  nativeWidth = 1440,
  nativeHeight = 880,
  scale = 0.94,
  panX = 0,
  panY = 0,
  activeTarget,
  children,
  className = '',
  frameClassName = '',
  disableResponsiveScale = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const [viewportScale, setViewportScale] = useState(1);
  const [computedPan, setComputedPan] = useState({ x: panX, y: panY });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (disableResponsiveScale) {
      setViewportScale(1);
      return;
    }

    const updateScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      if (containerWidth > 0) {
        // Uniform downscale to fit container width without stretching or distortion
        const newScale = Math.min(1, containerWidth / nativeWidth);
        setViewportScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [nativeWidth]);

  // Predefined target offsets in standard 1440x880 canvas coordinate space
  // Completely eliminates dynamic bounding box jitter during CSS transform animations
  const KNOWN_TARGET_CENTERS: Record<string, { x: number; y: number }> = {
    'task-row-task-gstr1': { x: 740, y: 295 },
    'task-row-task-gstr3b': { x: 740, y: 350 },
    'status-dropdown': { x: 810, y: 335 },
    'status-pill-task-gstr1': { x: 810, y: 295 },
    'status-pill-task-gstr3b': { x: 810, y: 350 },
    'workflow-celebration-popup': { x: 720, y: 340 },
    'kanban-card-card-gstr1': { x: 420, y: 320 },
    'kanban-column-this-week': { x: 620, y: 360 },
    'workload-capacity': { x: 680, y: 160 },
    'workload-team': { x: 920, y: 440 },
    'workload-nikhil': { x: 920, y: 400 },
  };

  // Target centering with 0ms deterministic calculation & safe boundaries
  useEffect(() => {
    if (!activeTarget || !rigRef.current) {
      setComputedPan({ x: panX, y: panY });
      return;
    }

    // 1. Instant deterministic lookup
    if (KNOWN_TARGET_CENTERS[activeTarget]) {
      const target = KNOWN_TARGET_CENTERS[activeTarget];
      const targetPanX = Math.round(nativeWidth / 2 - target.x);
      const targetPanY = Math.round(nativeHeight / 2 - target.y);
      const clampedPanX = Math.max(-200, Math.min(200, targetPanX));
      const clampedPanY = Math.max(-130, Math.min(130, targetPanY));
      setComputedPan({ x: clampedPanX, y: clampedPanY });
      return;
    }

    // 2. Fallback: Measure invariant unscaled offsetParent chain (immune to transform scaling)
    const selector = activeTarget.startsWith('[')
      ? activeTarget
      : `[data-product-target="${activeTarget}"]`;
    const targetEl = rigRef.current.querySelector(selector) as HTMLElement | null;

    if (targetEl && rigRef.current) {
      let left = 0;
      let top = 0;
      let curr: HTMLElement | null = targetEl;
      while (curr && curr !== rigRef.current) {
        left += curr.offsetLeft;
        top += curr.offsetTop;
        curr = curr.offsetParent as HTMLElement | null;
      }
      const targetCenterX = left + targetEl.offsetWidth / 2;
      const targetCenterY = top + targetEl.offsetHeight / 2;

      const targetPanX = Math.round(nativeWidth / 2 - targetCenterX);
      const targetPanY = Math.round(nativeHeight / 2 - targetCenterY);

      const clampedPanX = Math.max(-200, Math.min(200, targetPanX));
      const clampedPanY = Math.max(-130, Math.min(130, targetPanY));

      setComputedPan({ x: clampedPanX, y: clampedPanY });
    } else {
      setComputedPan({ x: panX, y: panY });
    }
  }, [activeTarget, panX, panY, nativeWidth, nativeHeight]);

  // Motion overrides when reduced motion is preferred
  const activeScale = prefersReducedMotion ? 1 : scale;
  const effectivePanX = prefersReducedMotion ? 0 : computedPan.x;
  const effectivePanY = prefersReducedMotion ? 0 : computedPan.y;

  return (
    <div
      ref={containerRef}
      data-product-camera-controller
      className={`relative w-full overflow-hidden mx-auto ${className}`}
      style={{
        aspectRatio: `${nativeWidth} / ${nativeHeight}`,
      }}
    >
      <div
        style={{
          width: `${nativeWidth}px`,
          height: `${nativeHeight}px`,
          transform: `scale(${viewportScale})`,
          transformOrigin: 'top left',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <motion.div
          ref={rigRef}
          data-product-camera-rig
          className={`w-full h-full relative ${frameClassName}`}
          animate={{
            scale: activeScale,
            x: effectivePanX,
            y: effectivePanY,
          }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.52, ease: [0.22, 1, 0.36, 1] }
          }
          style={{
            transformOrigin: '50% 50%',
            willChange: 'transform',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
