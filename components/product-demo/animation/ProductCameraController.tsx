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
    'task-row-task-gstr1': { x: 740, y: 300 },
    'task-row-task-gstr3b': { x: 740, y: 350 },
    'status-dropdown': { x: 760, y: 390 },
    'status-pill-task-gstr1': { x: 760, y: 300 },
    'status-pill-task-gstr3b': { x: 760, y: 350 },
    'workflow-celebration-popup': { x: 720, y: 310 },
    'kanban-card-card-gstr1': { x: 420, y: 320 },
    'kanban-column-this-week': { x: 620, y: 360 },
    'workload-capacity': { x: 680, y: 160 },
    'workload-team': { x: 920, y: 440 },
    'workload-nikhil': { x: 920, y: 400 },
    'calendar-today': { x: 820, y: 420 },
    'calendar-gstr3b': { x: 720, y: 380 },
    'calendar-adv-tax': { x: 620, y: 340 },
  };

  // Motion overrides when reduced motion is preferred
  const activeScale = prefersReducedMotion ? 1 : scale;

  /**
   * Mathematically bounded camera pan calculator.
   * Ensures that scaling around 50% 50% NEVER detaches from any edge of the viewport
   * (top <= 0, bottom >= nativeHeight, left <= 0, right >= nativeWidth), completely
   * eliminating any empty space above or around the mockup canvas during camera zooms.
   */
  const computeSafePan = (
    targetX: number,
    targetY: number,
    currentScale: number
  ): { x: number; y: number } => {
    if (currentScale <= 1.001) {
      return { x: 0, y: 0 };
    }

    const cx = nativeWidth / 2;
    const cy = nativeHeight / 2;

    // Hard boundary clamps for scale > 1 around center (cx, cy):
    // top = (1 - scale) * cy + panY <= 0  ==> panY <= (scale - 1) * cy
    // bottom = (1 + scale) * cy + panY >= 2 * cy ==> panY >= -(scale - 1) * cy
    // left = (1 - scale) * cx + panX <= 0 ==> panX <= (scale - 1) * cx
    // right = (1 + scale) * cx + panX >= 2 * cx ==> panX >= -(scale - 1) * cx
    const maxPanX = Math.max(0, (currentScale - 1) * cx);
    const maxPanY = Math.max(0, (currentScale - 1) * cy);

    // Frame the target smoothly towards the viewport center
    const desiredPanX = (cx - targetX) * 0.65;
    const desiredPanY = (cy - targetY) * 0.55;

    // For desktop application mockups, we never want the top of the canvas to sag downward
    // away from the browser chrome header (which leaves an empty gap above).
    // By keeping panY <= maxPanY * 0.35, top is guaranteed <= -0.65 * maxPanY < 0.
    const safeMaxPanY = maxPanY * 0.35;
    const safeMinPanY = -maxPanY;

    const clampedX = Math.max(-maxPanX, Math.min(maxPanX, desiredPanX));
    const clampedY = Math.max(safeMinPanY, Math.min(safeMaxPanY, desiredPanY));

    return {
      x: Math.round(clampedX),
      y: Math.round(clampedY),
    };
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
      setComputedPan(computeSafePan(target.x, target.y, activeScale));
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

      setComputedPan(computeSafePan(targetCenterX, targetCenterY, activeScale));
    } else {
      setComputedPan({ x: panX, y: panY });
    }
  }, [activeTarget, activeScale, panX, panY, nativeWidth, nativeHeight]);

  // Motion overrides when reduced motion is preferred
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
              : { duration: 0.62, ease: [0.16, 1, 0.3, 1] }
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
