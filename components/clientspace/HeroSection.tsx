"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  ShieldCheck,
  Users,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { PyngynHeroMyWork } from "../product-demo/PyngynHeroMyWork";
import { DEMO_URL, SIGNUP_URL } from "../config";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const FEATURE_PILLS = [
  { label: "Client Work", icon: Briefcase },
  { label: "Deadlines", icon: Calendar },
  { label: "Compliance", icon: ShieldCheck },
  { label: "Team Workload", icon: Users },
  { label: "Approvals", icon: CheckCircle2 },
  { label: "Client Portal", icon: ExternalLink },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-[115px] pb-[70px] lg:pt-[130px] lg:pb-[90px] bg-gradient-to-b from-slate-50/90 via-white to-slate-50/70 border-b border-slate-200/80"
    >
      {/* Background ambient lighting - restrained, subtle slate & navy */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/4 top-10 h-[480px] w-[700px] rounded-full bg-gradient-to-tr from-slate-200/40 via-blue-50/40 to-indigo-50/30 blur-3xl opacity-70" />
      </div>

      <div className="wrap">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] xl:gap-12">
          {/* ============================================================ */}
          {/* LEFT SIDE: Content, Headline, Feature Pills, CTAs            */}
          {/* ============================================================ */}
          <div className="flex flex-col text-left min-w-0">
            {/* Eyebrow Chip */}
            <div className="inline-block">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#004AAD]/25 bg-[#EEF5FF] px-3.5 py-1 text-[12px] font-semibold text-[#113353] shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-[#004AAD] animate-pulse" />
                <span>Built for CA, Accounting &amp; Tax Practices</span>
              </div>
            </div>

            {/* Large Strong Headline */}
            <h1 className="mt-5 font-display text-[clamp(32px,4.5vw,56px)] font-bold text-[#113353] leading-[1.08] tracking-tight">
              Keep every client
              <br />
              <span className="text-[#004AAD]">deadline moving.</span>
            </h1>

            {/* Short Supporting Paragraph */}
            <p className="mt-4 sm:mt-5 text-[clamp(15px,1.2vw,18px)] text-[#334E68] leading-relaxed max-w-[540px]">
              Pyngyn brings client work, statutory tasks, compliance deadlines,
              and team progress together into one connected operating hub so
              your firm always knows what needs immediate attention.
            </p>

            {/* Professional Feature Pills */}
            <div
              className="mt-6 flex flex-wrap items-center gap-2"
              aria-label="Core practice features"
            >
              {FEATURE_PILLS.map((pill) => {
                const Icon = pill.icon;
                return (
                  <span
                    key={pill.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#D2DDEC] bg-white px-3 py-1 text-[12px] font-semibold text-[#113353] shadow-3xs transition-all hover:border-[#004AAD]/50 hover:bg-[#EEF5FF] hover:text-[#004AAD]"
                  >
                    <Icon size={12} className="text-[#004AAD]" />
                    <span>{pill.label}</span>
                  </span>
                );
              })}
            </div>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href={DEMO_URL}
                className="btn bg-[#004AAD] hover:bg-[#00388A] text-white text-[15px] font-bold px-6 py-3 rounded-xl shadow-[0_8px_20px_-6px_rgba(0,74,173,0.45)] border border-[#004AAD] flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </a>
              <a
                href="#tour"
                className="btn border border-[#004AAD]/30 bg-white hover:bg-[#EEF5FF] text-[#004AAD] hover:text-[#00388A] text-[15px] font-bold px-6 py-3 rounded-xl shadow-3xs flex items-center justify-center gap-1.5 transition-all hover:-translate-y-0.5 hover:border-[#004AAD]/60"
              >
                <span>Explore ClientSpace ↓</span>
              </a>
            </div>

            {/* Subtext Reassurance */}
            <div className="mt-4 flex items-center gap-2 text-[12px] text-[#627D98] font-medium">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00960F]" />
              <span>Trusted by 500+ practices · 30-min walkthrough · No credit card required</span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT SIDE: Real Pyngyn My Work Interface                    */}
          {/* Naturally placed into hero layout without external frames    */}
          {/* ============================================================ */}
          <div className="relative w-full min-w-0 flex items-center justify-center lg:justify-end overflow-visible">
            <PyngynHeroMyWork />
          </div>
        </div>
      </div>
    </section>
  );
}
