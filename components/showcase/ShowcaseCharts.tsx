"use client";

/*
 * Hand-built charts for the ClientSpace mockup: inline SVG + CSS only, no
 * runtime charting library. Both animate from empty to their real shape the
 * first time the mockup scrolls into view (`inView`); the global
 * prefers-reduced-motion rule in globals.css collapses those transitions.
 */
import { useState } from "react";
import { T, alpha } from "./shell/tokens";

export type WorkloadSlot = {
  /** x-axis label, e.g. "Fri" */
  label: string;
  /** items due in that slot */
  count: number;
  /** the overdue bucket, rendered in coral */
  late?: boolean;
  /** full-word day used in the hover tooltip */
  long: string;
};

export type HealthSegment = {
  id: string;
  label: string;
  value: number;
  color: string;
};

/* ── Workload bars ───────────────────────────────────────────────── */

const SLOT_W = 30;
const BAR_W = 14;
const BASE_Y = 74;
const TOP_Y = 8;

export function WorkloadChart({
  slots,
  inView,
  label,
  highlight,
}: {
  slots: readonly WorkloadSlot[];
  inView: boolean;
  label: string;
  /** drives the tooltip/dimming from outside (the idle demo loop) */
  highlight?: number | null;
}) {
  const [hover, setHover] = useState<number | null>(null);
  /* a real pointer always wins over the loop */
  const active = hover ?? highlight ?? null;
  const vbWidth = slots.length * SLOT_W;
  const span = BASE_Y - TOP_Y;
  const max = Math.max(1, ...slots.map((s) => s.count));

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${vbWidth} ${BASE_Y + 4}`}
        preserveAspectRatio="none"
        className="block h-[86px] w-full"
        role="img"
        aria-label={label}
      >
        <g aria-hidden="true">
          {/* gridlines */}
          {[0.28, 0.56, 0.84].map((p) => (
            <line
              key={p}
              x1={0}
              x2={vbWidth}
              y1={TOP_Y + span * p}
              y2={TOP_Y + span * p}
              stroke={T.chartGrid}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <line
            x1={0}
            x2={vbWidth}
            y1={BASE_Y}
            y2={BASE_Y}
            stroke={T.border}
            strokeWidth={1.4}
            vectorEffect="non-scaling-stroke"
          />

          {slots.map((slot, i) => {
            const filled = slot.count > 0;
            const h = filled ? Math.max(10, (slot.count / max) * (span - 8)) : 3;
            const fill = filled ? (slot.late ? T.coral : T.green) : T.chartGrid;
            return (
              <rect
                key={slot.label}
                x={i * SLOT_W + (SLOT_W - BAR_W) / 2}
                y={BASE_Y - h}
                width={BAR_W}
                height={h}
                rx={3}
                fill={fill}
                opacity={active === null || active === i ? 1 : 0.45}
                style={{
                  transform: inView ? "scaleY(1)" : "scaleY(0)",
                  transformOrigin: `0px ${BASE_Y}px`,
                  transition: "transform 720ms cubic-bezier(.2,.7,.3,1), opacity 160ms linear",
                  transitionDelay: `${i * 45}ms`,
                }}
              />
            );
          })}

          {/* hit areas — full column height so the tooltip is easy to reach */}
          {slots.map((slot, i) => (
            <rect
              key={`hit-${slot.label}`}
              x={i * SLOT_W}
              y={0}
              width={SLOT_W}
              height={BASE_Y + 4}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover((c) => (c === i ? null : c))}
            />
          ))}
        </g>
      </svg>

      {/* tooltip */}
      {active !== null && (
        <div
          className="pointer-events-none absolute -top-1 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg px-2 py-1 text-[10px] font-semibold text-white shadow-lg"
          style={{ left: `${((active + 0.5) / slots.length) * 100}%`, background: "#2A2622" }}
        >
          {slots[active].long} · {slots[active].count} items due
        </div>
      )}

      {/* x labels */}
      <div className="mt-2 flex">
        {slots.map((slot, i) => (
          <div
            key={`lbl-${slot.label}`}
            className="flex-1 text-center text-[10px] font-medium transition-colors"
            style={{
              color: slot.late ? T.coral : active === i ? T.ink : T.mute,
            }}
          >
            {slot.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Client health donut ─────────────────────────────────────────── */

const R = 50;
const C = 2 * Math.PI * R;

export function HealthDonut({
  segments,
  total,
  totalLabel,
  inView,
  label,
  highlight,
}: {
  segments: readonly HealthSegment[];
  total: number;
  totalLabel: string;
  inView: boolean;
  label: string;
  /** drives the arc cross-highlight from outside (the idle demo loop) */
  highlight?: string | null;
}) {
  const [hover, setHover] = useState<string | null>(null);
  /* a real pointer always wins over the loop */
  const active = hover ?? highlight ?? null;

  /* Arcs are exactly proportional to the segment values and butt up against
     each other, so they sum to a full turn with no gaps and no overshoot. */
  const drawn = segments.filter((s) => s.value > 0);
  const sum = drawn.reduce((acc, s) => acc + s.value, 0) || 1;
  let cursor = 0;

  return (
    <div className="flex items-center gap-3">
      <div className="relative shrink-0">
        <svg
          viewBox="0 0 132 132"
          className="block h-[98px] w-[98px]"
          role="img"
          aria-label={label}
        >
          <g aria-hidden="true" transform="rotate(-90 66 66)">
            <circle cx="66" cy="66" r={R} fill="none" stroke={T.chartGrid} strokeWidth={16} />
            {drawn.map((s) => {
              const arc = s.value / sum;
              const len = arc * C;
              const offset = -cursor * C;
              cursor += arc;
              return (
                <circle
                  key={s.id}
                  cx="66"
                  cy="66"
                  r={R}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={16}
                  strokeLinecap="butt"
                  strokeDashoffset={offset}
                  style={{
                    strokeDasharray: inView ? `${len} ${C - len}` : `0 ${C}`,
                    opacity: active === null || active === s.id ? 1 : 0.18,
                    transition:
                      "stroke-dasharray 900ms cubic-bezier(.2,.7,.3,1), opacity 180ms linear",
                  }}
                />
              );
            })}
          </g>
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-[20px] font-semibold leading-none tabular-nums"
            style={{ color: T.ink }}
          >
            {total}
          </span>
          <span className="mt-0.5 text-[9px] font-medium" style={{ color: T.mute }}>
            {totalLabel}
          </span>
        </div>
      </div>

      <ul className="min-w-0 flex-1 space-y-1">
        {segments.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              onMouseEnter={() => setHover(s.id)}
              onMouseLeave={() => setHover((c) => (c === s.id ? null : c))}
              onFocus={() => setHover(s.id)}
              onBlur={() => setHover((c) => (c === s.id ? null : c))}
              className="flex w-full items-center gap-1.5 rounded-lg px-1 py-1 text-left transition-colors"
              style={{ background: active === s.id ? alpha(s.color, 0.1) : "transparent" }}
            >
              <span
                className="h-[7px] w-[7px] shrink-0 rounded-full"
                style={{ background: s.color }}
                aria-hidden="true"
              />
              <span className="truncate text-[11.5px] font-medium" style={{ color: T.sub }}>
                {s.label}
              </span>
              <span
                className="ml-auto text-[11.5px] font-semibold tabular-nums"
                style={{ color: T.ink }}
              >
                {s.value}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
