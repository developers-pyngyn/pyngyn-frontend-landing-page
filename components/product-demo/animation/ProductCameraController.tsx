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
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const [viewportScale, setViewportScale] = useState(1);
  const [computedPan, setComputedPan] = useState({ x: panX, y: panY });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
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

  // Dynamic DOM measuring for activeTarget
  useEffect(() => {
    if (!activeTarget || !rigRef.current) {
      setComputedPan({ x: panX, y: panY });
      return;
    }

    const measure = () => {
      if (!rigRef.current) return;
      const selector = activeTarget.startsWith('[')
        ? activeTarget
        : `[data-product-target="${activeTarget}"]`;
      const targetEl = rigRef.current.querySelector(selector) as HTMLElement | null;

      if (targetEl && rigRef.current) {
        const rigRect = rigRef.current.getBoundingClientRect();
        const targetRect = targetEl.getBoundingClientRect();

        // Effective current viewport scale
        const currentScaleFactor = rigRect.width / nativeWidth;

        // Target center in unscaled coordinate space
        const targetCenterX =
          (targetRect.left - rigRect.left + targetRect.width / 2) / (currentScaleFactor || 1);
        const targetCenterY =
          (targetRect.top - rigRect.top + targetRect.height / 2) / (currentScaleFactor || 1);

        // Desired canvas center is (nativeWidth / 2, nativeHeight / 2)
        const targetPanX = Math.round(nativeWidth / 2 - targetCenterX);
        const targetPanY = Math.round(nativeHeight / 2 - targetCenterY);

        // Safe clamp allowing full centering
        const clampedPanX = Math.max(-420, Math.min(420, targetPanX));
        const clampedPanY = Math.max(-280, Math.min(280, targetPanY));

        setComputedPan({ x: clampedPanX, y: clampedPanY });
      } else {
        setComputedPan({ x: panX, y: panY });
      }
    };

    measure();
    const rafId = requestAnimationFrame(measure);
    const timerId = setTimeout(measure, 50);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
    };
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
              : { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
          }
          style={{
            transformOrigin: '50% 50%',
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
