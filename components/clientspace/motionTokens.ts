/**
 * Shared Motion Tokens & Animation Configuration
 * Follows Pyngyn unified motion language established in Prompts 4 and 6.
 */

// Core cubic-bezier easing curve: smooth premium deceleration
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.42, 0, 0.58, 1] as const;

// Unified Motion Timings (seconds)
export const MOTION_TIMINGS = {
  entrance: 0.8, // 800ms entrance zoom / reveal
  zoom: 0.5, // 500ms camera zoom transitions
  slide: 0.3, // 300ms screen slide / crossfade
  crossfade: 0.25, // 250ms status pill / element crossfade
  aiCardTransition: 0.3, // 300ms AI card appear / dismiss
  aiBadgeCycle: 0.2, // 200ms AI badge text/color transition
  pulse: 0.4, // 400ms highlight pulse
  kanbanShift: 0.5, // 500ms drag hint shift
  breathingLoop: 7, // 7s continuous subtle oscillation loop
  pulseLoop: 3.5, // 3.5s pulse interval
  kanbanLoop: 4.5, // 4.5s kanban drag hint interval
  portalBadgeLoop: 3, // 3s portal status crossfade interval
} as const;

// Sizing & Scaling Tokens
export const MOCKUP_DIMENSIONS = {
  baseWidth: 1024,
  chromeHeaderHeight: 38,
  defaultImageHeight: 489,
  dashboardImageHeight: 498,
} as const;
