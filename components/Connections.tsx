"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { DEMO_URL } from "./config";

const LOGOS: Record<string, JSX.Element> = {
  Gmail: (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285f4" d="M21.4 19h-2.9V9.9l-6.5 4.9-6.5-4.9V19H2.6c-.6 0-1-.5-1-1V6c0-.7.8-1.1 1.4-.7l9 6.8 9-6.8c.6-.4 1.4 0 1.4.7v12c0 .5-.4 1-1 1z" />
      <path fill="#34a853" d="M1.6 18V6.6L5.5 9.5V19H2.6c-.6 0-1-.4-1-1z" />
      <path fill="#fbbc04" d="M22.4 18c0 .6-.4 1-1 1h-2.9V9.5l3.9-2.9z" />
      <path fill="#ea4335" d="M1.6 6c0-.7.8-1.1 1.4-.7l9 6.8 9-6.8c.6-.4 1.4 0 1.4.7l-1.4 1L12 14.8 2.6 6.7z" />
    </svg>
  ),
  Slack: (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#36c5f0" d="M6.8 14.7a2 2 0 11-2-2h2v2zm1 0a2 2 0 014 0v5a2 2 0 11-4 0v-5z" />
      <path fill="#2eb67d" d="M9.8 6.8a2 2 0 11-2-2 2 2 0 012 2zm0 1a2 2 0 010 4h-5a2 2 0 110-4h5z" />
      <path fill="#ecb22e" d="M17.2 9.8a2 2 0 112-2v2h-2zm-1 0a2 2 0 01-4 0v-5a2 2 0 114 0v5z" />
      <path fill="#e01e5a" d="M14.2 17.2a2 2 0 112 2 2 2 0 01-2-2zm0-1a2 2 0 010-4h5a2 2 0 110 4h-5z" />
    </svg>
  ),
  Drive: (
    <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#ffba00" d="M16.5 6L4 28l6 10 12.5-22z" />
      <path fill="#00ac47" d="M31.5 6h-15l12.5 22h15z" />
      <path fill="#0066da" d="M10 38h28l6-10H16z" />
    </svg>
  ),
  QuickBooks: (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#2ca01c" />
      <circle cx="12" cy="12" r="4.6" fill="none" stroke="#fff" strokeWidth="2" />
      <rect x="11" y="12" width="2" height="6" rx="1" fill="#fff" />
    </svg>
  ),
  Calendar: (
    <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden="true">
      <rect x="8" y="10" width="32" height="30" rx="3" fill="#fff" stroke="#4285f4" strokeWidth="3" />
      <rect x="8" y="10" width="32" height="8" rx="3" fill="#4285f4" />
      <text x="24" y="34" textAnchor="middle" fill="#4285f4" fontSize="14" fontWeight="700" fontFamily="Arial">31</text>
    </svg>
  ),
  n8n: (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="5" cy="12" r="2.4" fill="#ea4b71" />
      <circle cx="12" cy="7" r="2.4" fill="#ea4b71" />
      <circle cx="12" cy="17" r="2.4" fill="#ea4b71" />
      <circle cx="19" cy="12" r="2.4" fill="#ea4b71" />
      <path d="M7 12h3M14 8.5l3 2.2M14 15.5l3-2.2" stroke="#ea4b71" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

const TOOLS = ["Gmail", "Slack", "Drive", "QuickBooks", "Calendar", "n8n"];

function ConnectionDiagram() {
  const reduce = useReducedMotion();
  const targets = [60, 156, 252, 348, 444, 540];
  const hubX = 300;

  return (
    <div className="relative mx-auto aspect-[600/340] w-full max-w-[520px]">
      <svg viewBox="0 0 600 340" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {targets.map((tx, i) => {
          const highlighted = i === 2 || i === 4;
          const d = `M ${hubX} 210 C ${hubX} 260, ${tx} 240, ${tx} 300`;
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={highlighted ? "#4f46e5" : "#e9eaf0"} strokeWidth={highlighted ? 2.5 : 2} />
              {!reduce && (
                <motion.circle
                  r={highlighted ? 3.5 : 2.5}
                  fill={highlighted ? "#4f46e5" : "#c7c9d4"}
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
                  style={{ offsetPath: `path("${d}")` } as React.CSSProperties}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Central hub */}
      <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2">
        {!reduce && (
          <motion.span
            className="absolute inset-0 rounded-[20px] bg-accent"
            animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <motion.div
          className="relative grid h-[clamp(52px,13vw,68px)] w-[clamp(52px,13vw,68px)] place-items-center rounded-[20px] border-2 border-accent bg-white shadow-cta"
          animate={reduce ? {} : { y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/icon.png" alt="PYNGYN" width={44} height={44} className="h-2/3 w-2/3" />
        </motion.div>
      </div>

      {/* Tool nodes pinned to the bottom edge */}
      <div className="absolute bottom-0 left-0 flex w-full items-center justify-between">
        {TOOLS.map((name, i) => {
          const highlighted = i === 2 || i === 4;
          return (
            <motion.div
              key={name}
              className={`grid h-[clamp(40px,11vw,52px)] w-[clamp(40px,11vw,52px)] place-items-center rounded-2xl border bg-white shadow-card ${
                highlighted ? "border-accent" : "border-line"
              }`}
              title={name}
              animate={reduce ? {} : { y: [0, i % 2 === 0 ? -4 : 4, 0] }}
              transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            >
              <span className="grid h-[60%] w-[60%] place-items-center">{LOGOS[name]}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function Connections() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="grid items-center gap-[54px] lg:grid-cols-2">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              Connect your stack
            </span>
            <h2 className="title mt-3">Plugs into the tools you already use.</h2>
            <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-muted">
              PYNGYN sits at the center of your workflow. Connect your chat, email, code,
              and docs once, and plans, status, and updates flow where your team already works.
            </p>

            <ul className="mt-7 flex flex-col gap-3.5">
              {[
                "Connect once, no per-project setup or re-auth",
                "Works with chat, email, calendar, code, and docs",
                "Status and updates flow to where your team already is",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15.5px]">
                  <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-accent-lt text-accent" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <a href={DEMO_URL} className="btn btn-primary mt-8 w-fit">
              Get started for free →
            </a>
          </div>

          <ConnectionDiagram />
        </div>
      </div>
    </section>
  );
}
