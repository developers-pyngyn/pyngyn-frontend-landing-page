'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export interface PyngynCelebrationOverlayProps {
  title?: string;
  subtitle?: string;
  statusText?: string;
  avatarSrc?: string;
  avatarInitials?: string;
  avatarBg?: string;
  mascotSrc?: string;
  showCursor?: boolean;
  cursorOffset?: { x: number; y: number };
  className?: string;
  style?: React.CSSProperties;
  dataProductTarget?: string;
  compact?: boolean;
  floating?: boolean;
}

// Multi-colored celebratory confetti particles positioned dynamically around the card
interface ConfettiParticle {
  id: number;
  type: 'circle' | 'pill' | 'sparkle';
  color: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: number;
  rotation: number;
  delay: number;
}

const CONFETTI_PARTICLES: ConfettiParticle[] = [
  // Top edge
  { id: 1, type: 'circle', color: '#FFCC00', top: '-14px', left: '18%', size: 8, rotation: 0, delay: 0.05 },
  { id: 2, type: 'pill', color: '#FF007A', top: '-18px', left: '32%', size: 10, rotation: 35, delay: 0.1 },
  { id: 3, type: 'sparkle', color: '#00D2D3', top: '-16px', left: '50%', size: 12, rotation: 15, delay: 0.15 },
  { id: 4, type: 'circle', color: '#00C875', top: '-12px', left: '68%', size: 7, rotation: 0, delay: 0.08 },
  { id: 5, type: 'pill', color: '#9333EA', top: '-16px', left: '84%', size: 9, rotation: -25, delay: 0.12 },
  { id: 6, type: 'circle', color: '#FF9500', top: '-8px', left: '96%', size: 6, rotation: 0, delay: 0.18 },

  // Right edge & Overlapping Avatar zone
  { id: 7, type: 'circle', color: '#FFCC00', top: '15%', right: '-16px', size: 9, rotation: 0, delay: 0.07 },
  { id: 8, type: 'sparkle', color: '#FF007A', top: '45%', right: '-20px', size: 14, rotation: 45, delay: 0.14 },
  { id: 9, type: 'pill', color: '#00C875', top: '75%', right: '-14px', size: 10, rotation: 65, delay: 0.1 },

  // Bottom edge
  { id: 10, type: 'pill', color: '#FFCC00', bottom: '-14px', left: '12%', size: 11, rotation: -30, delay: 0.09 },
  { id: 11, type: 'circle', color: '#9333EA', bottom: '-16px', left: '26%', size: 8, rotation: 0, delay: 0.16 },
  { id: 12, type: 'sparkle', color: '#00D2D3', bottom: '-18px', left: '44%', size: 13, rotation: -15, delay: 0.11 },
  { id: 13, type: 'circle', color: '#FF007A', bottom: '-12px', left: '62%', size: 7, rotation: 0, delay: 0.06 },
  { id: 14, type: 'pill', color: '#00C875', bottom: '-15px', left: '78%', size: 10, rotation: 40, delay: 0.13 },
  { id: 15, type: 'circle', color: '#FFCC00', bottom: '-12px', left: '92%', size: 9, rotation: 0, delay: 0.17 },

  // Left edge
  { id: 16, type: 'sparkle', color: '#9333EA', top: '25%', left: '-18px', size: 13, rotation: 20, delay: 0.12 },
  { id: 17, type: 'circle', color: '#00C875', top: '65%', left: '-14px', size: 8, rotation: 0, delay: 0.08 },
  { id: 18, type: 'pill', color: '#FF007A', top: '85%', left: '-16px', size: 10, rotation: -45, delay: 0.15 },
];

export const PyngynCelebrationOverlay: React.FC<PyngynCelebrationOverlayProps> = ({
  title = 'Auto-Filed GSTR-3B Return',
  subtitle,
  statusText = 'Filed',
  avatarSrc = '/team/vivek-pandey.png',
  avatarInitials,
  avatarBg,
  mascotSrc = '/mascot/pyngyn-insights.png',
  showCursor = true,
  cursorOffset = { x: 38, y: 16 },
  className = '',
  style,
  dataProductTarget,
  compact = false,
  floating = true,
}) => {
  return (
    <motion.div
      data-product-target={dataProductTarget || 'celebration-status-popup'}
      initial={{ opacity: 0, scale: 0.88, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -8 }}
      transition={{ type: 'spring', damping: 22, stiffness: 320 }}
      className={`relative inline-block z-50 select-none ${className}`}
      style={style}
    >
      {/* Continuous gentle levitation / floating motion for living physics */}
      <motion.div
        animate={
          floating
            ? {
                y: [0, -5, 0, 4, 0],
                x: [0, 2, 0, -2, 0],
              }
            : undefined
        }
        transition={
          floating
            ? {
                y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' },
                x: { duration: 6.2, repeat: Infinity, ease: 'easeInOut' },
              }
            : undefined
        }
        className="relative"
      >
        {/* =================================================================== */}
        {/* MAGICAL CONFETTI PARTICLES & CELEBRATION BURST                      */}
        {/* =================================================================== */}
        {(compact ? CONFETTI_PARTICLES.slice(0, 9) : CONFETTI_PARTICLES).map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.3, 1],
              opacity: [0, 1, 0.95],
              y: [0, -4, 0, 4, 0],
              rotate: [particle.rotation, particle.rotation + 20, particle.rotation - 15, particle.rotation],
            }}
            transition={{
              scale: { duration: 0.45, delay: particle.delay, ease: 'easeOut' },
              opacity: { duration: 0.35, delay: particle.delay },
              y: { duration: 2.8 + (particle.id % 3) * 0.4, repeat: Infinity, ease: 'easeInOut', delay: particle.delay },
              rotate: { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: particle.delay },
            }}
            className="absolute pointer-events-none z-20"
            style={{
              top: particle.top,
              bottom: particle.bottom,
              left: particle.left,
              right: particle.right,
            }}
          >
            {particle.type === 'circle' && (
              <div
                className="rounded-full shadow-xs"
                style={{
                  width: `${compact ? Math.max(5, particle.size - 2) : particle.size}px`,
                  height: `${compact ? Math.max(5, particle.size - 2) : particle.size}px`,
                  backgroundColor: particle.color,
                }}
              />
            )}
            {particle.type === 'pill' && (
              <div
                className="rounded-xs shadow-xs"
                style={{
                  width: `${compact ? Math.max(6, particle.size - 2) : particle.size}px`,
                  height: `${Math.round((compact ? Math.max(6, particle.size - 2) : particle.size) * 0.45)}px`,
                  backgroundColor: particle.color,
                  transform: `rotate(${particle.rotation}deg)`,
                }}
              />
            )}
            {particle.type === 'sparkle' && (
              <svg
                width={compact ? Math.max(8, particle.size - 3) : particle.size}
                height={compact ? Math.max(8, particle.size - 3) : particle.size}
                viewBox="0 0 24 24"
                fill={particle.color}
                className="drop-shadow-xs"
              >
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
              </svg>
            )}
          </motion.div>
        ))}

        {/* =================================================================== */}
        {/* VIBRANT GRADIENT GLOW BORDER CARD (Matches reference image)         */}
        {/* =================================================================== */}
        <div
          className={`${
            compact
              ? 'p-[2px] rounded-[16px] shadow-[0_12px_30px_-5px_rgba(147,51,234,0.28)]'
              : 'p-[2.5px] rounded-[22px] shadow-[0_22px_55px_-10px_rgba(147,51,234,0.32),0_10px_30px_-5px_rgba(0,0,0,0.12)]'
          } bg-gradient-to-r from-[#9333EA] via-[#EC4899] to-[#00D2D3] relative`}
        >
          <div
            className={`bg-white ${
              compact
                ? 'rounded-[14px] pl-2.5 pr-2 py-1.5'
                : 'rounded-[20px] pl-3.5 pr-2.5 py-2.5'
            } relative backdrop-blur-md overflow-hidden`}
          >
            {/* Smooth slide-crossfade container for seamless in-motion changes */}
            <motion.div
              key={`${title}-${statusText}-${avatarInitials || avatarSrc}`}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-center ${compact ? 'gap-2.5' : 'gap-3.5 sm:gap-4'}`}
            >
              {/* 1. Left 3D Character / Mascot Avatar Container */}
              <motion.div
                animate={{
                  y: [0, -3, 0, 2, 0],
                  rotate: [0, -2, 2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={`relative ${
                  compact
                    ? 'w-8 h-8 rounded-lg p-0.5'
                    : 'w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl p-1'
                } bg-gradient-to-br from-[#E0F2FE] via-[#FCE7F3] to-[#EDE9FE] border border-white/80 flex items-center justify-center shrink-0 shadow-inner overflow-hidden`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={mascotSrc}
                    alt="Pyngyn AI Mascot"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>

              {/* 2. Center Statement Typography */}
              <div className="flex flex-col text-left pr-1.5 sm:pr-2">
                <span
                  className={`${
                    compact
                      ? 'text-[11.5px] sm:text-[12.5px]'
                      : 'text-[15px] sm:text-[17px] md:text-[18.5px]'
                  } font-extrabold text-slate-800 tracking-tight leading-tight select-none whitespace-nowrap`}
                >
                  {title}
                </span>
                {subtitle && (
                  <span
                    className={`${
                      compact ? 'text-[9px] mt-0.5' : 'text-[10.5px] sm:text-[11px] mt-1'
                    } font-medium text-slate-400 leading-none select-none whitespace-nowrap`}
                  >
                    {subtitle}
                  </span>
                )}
              </div>

              {/* 3. Right Green Status Action Button */}
              <div className="flex items-center relative pl-0.5">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className={`bg-[#00C875] text-white font-extrabold ${
                    compact
                      ? 'text-[10px] sm:text-[10.5px] px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-lg'
                      : 'text-[12px] sm:text-[13px] px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl shadow-[0_4px_12px_rgba(0,200,117,0.35)]'
                  } flex items-center justify-center cursor-pointer select-none`}
                >
                  <span>{statusText}</span>
                </motion.div>

                {/* 4. Aligned User Avatar placed neatly on outer side without overlapping the button */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: 'spring', damping: 18, stiffness: 300 }}
                  className={`relative ${
                    compact
                      ? 'ml-2 w-8 h-8 rounded-lg ring-[2px] ring-white shadow-xs'
                      : 'ml-2.5 sm:ml-3 w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ring-[2.5px] ring-white shadow-sm'
                  } overflow-hidden bg-slate-100 shrink-0 z-10 border border-slate-200 flex items-center justify-center`}
                >
                  {avatarInitials ? (
                    <div
                      style={{ backgroundColor: avatarBg || '#7E22CE' }}
                      className={`w-full h-full flex items-center justify-center font-bold text-white ${
                        compact ? 'text-[11px]' : 'text-[14px] sm:text-[16px]'
                      }`}
                    >
                      {avatarInitials}
                    </div>
                  ) : (
                    <Image
                      src={avatarSrc}
                      alt="Team Collaborator"
                      fill
                      className="object-cover"
                      priority
                    />
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* SLEEK BLUE POINTER CURSOR (Points to target table cell)             */}
        {/* =================================================================== */}
        {showCursor && (
          <motion.div
            initial={{ opacity: 0, x: -10, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -10, y: 10 }}
            transition={{ delay: 0.25, duration: 0.35, ease: 'easeOut' }}
            className="absolute pointer-events-none z-30"
            style={{
              bottom: `-${cursorOffset.y + 14}px`,
              left: `${cursorOffset.x}px`,
            }}
          >
            <div className="relative">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="drop-shadow-md -rotate-45"
              >
                <path
                  d="M3 3L10.5 21L14 13.5L21.5 10L3 3Z"
                  fill="#00D2D3"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

