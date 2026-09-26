'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface PyngynProductCameraProps {
  nativeWidth?: number;
  nativeHeight?: number;
  zoomTarget?: string | null;
  targetScale?: number;
  panX?: number;
  panY?: number;
  children: React.ReactNode;
  className?: string;
  frameClassName?: string;
}

export const PyngynProductCamera: React.FC<PyngynProductCameraProps> = ({
  nativeWidth = 1440,
  nativeHeight = 880,
  zoomTarget = null,
  targetScale = 1,
  panX = 0,
  panY = 0,
  children,
  className = '',
  frameClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportScale, setViewportScale] = useState(1);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      if (containerWidth > 0) {
        // Compute uniform scale to fit container width
        const newScale = Math.min(1, containerWidth / nativeWidth);
        setViewportScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [nativeWidth]);

  // Combined scale: responsive viewport down-scale multiplied by programmatic camera zoom
  const activeZoom = prefersReducedMotion ? 1 : targetScale;
  const effectivePanX = prefersReducedMotion ? 0 : panX;
  const effectivePanY = prefersReducedMotion ? 0 : panY;

  return (
    <div
      ref={containerRef}
      data-product-camera-container
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
          data-product-camera-rig
          className={`w-full h-full relative ${frameClassName}`}
          animate={{
            scale: activeZoom,
            x: effectivePanX,
            y: effectivePanY,
          }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }
          style={{
            transformOrigin: '50% 35%',
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
