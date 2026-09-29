"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Users,
  CheckSquare,
  Briefcase,
  Layout,
  ShieldCheck,
  Zap,
  Plug,
  Scale,
  BarChart3,
  FileSpreadsheet,
  Search,
  Shield,
  Compass,
  BookOpen,
  HelpCircle,
  PenTool,
  FileCheck,
  Phone,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { SIGNIN_URL, SIGNUP_URL, DEMO_URL, PRICING_URL } from "./config";

interface DropdownItem {
  name: string;
  desc?: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const PRODUCT_MENU: DropdownItem[] = [
  {
    name: "ClientSpace",
    desc: "The unified client workspace for modern accounting & CA firms",
    href: "/#clientspace",
    icon: Building2,
    badge: "Core",
  },
  {
    name: "Client Management",
    desc: "Entity hierarchy, tax profiles, and compliance health status",
    href: "/#client-management",
    icon: Users,
  },
  {
    name: "Task Management",
    desc: "Statutory deadlines, effort meters, and 4-eye review gates",
    href: "/#task-management",
    icon: CheckSquare,
  },
  {
    name: "Engagements",
    desc: "Fixed-fee retainers, corporate audit milestones & deliverables",
    href: "/#engagements",
    icon: Briefcase,
  },
  {
    name: "Client Portal",
    desc: "White-labeled, password-less client collaboration portal",
    href: "/#client-portal",
    icon: Layout,
  },
  {
    name: "Documents",
    desc: "Bank-encrypted file collection, versioning & e-signatures",
    href: "/#documents",
    icon: ShieldCheck,
  },
  {
    name: "Automations",
    desc: "Automated document chase, WhatsApp reminders & alerts",
    href: "/#automations",
    icon: Zap,
  },
  {
    name: "Integrations",
    desc: "Tally, Computax, Zoho Books, QuickBooks, Slack & Calendars",
    href: "/integrations",
    icon: Plug,
  },
];

const SOLUTIONS_MENU: DropdownItem[] = [
  {
    name: "For CA Firms",
    desc: "Built for audit, tax filing, and statutory compliance practices",
    href: "/solutions/accountants",
    icon: Scale,
    badge: "Specialized",
  },
  {
    name: "For Accounting Firms",
    desc: "Streamline monthly retainers, bookkeeping, and year-end closes",
    href: "/solutions/accountants",
    icon: BarChart3,
  },
  {
    name: "For Tax Teams",
    desc: "Corporate tax returns, advance tax estimates, and notice tracking",
    href: "/solutions/tax-teams",
    icon: FileSpreadsheet,
  },
  {
    name: "For Audit Teams",
    desc: "Structured working papers, 4-eye review queues, and sign-offs",
    href: "/solutions/audit-teams",
    icon: Search,
  },
  {
    name: "For Compliance Teams",
    desc: "Never miss a statutory deadline across GST, ROC, and TDS",
    href: "/solutions/compliance-teams",
    icon: Shield,
  },
];

const RESOURCES_MENU: DropdownItem[] = [
  {
    name: "CA Client Portal",
    desc: "Dedicated client portal for tax filings, PBC document chase & sign-offs",
    href: "/client-portal-for-accounting-firms",
    icon: Layout,
    badge: "Essential",
  },
  {
    name: "CA Practice Workflows",
    desc: "Operating playbooks for audit assurance, tax filing & retainer billing",
    href: "/solutions/accountants",
    icon: Scale,
  },
  {
    name: "Practice Help Center",
    desc: "Step-by-step setup guides, partner review gates & staff permissions",
    href: "/knowledge-base",
    icon: HelpCircle,
  },
  {
    name: "CA Practice Blog",
    desc: "Insights on scaling CA partnerships, compliance automation & practice tech",
    href: "/blog",
    icon: PenTool,
  },
  {
    name: "Accounting Integrations",
    desc: "Connect Tally Prime, Computax, Zoho Books, QuickBooks & WhatsApp",
    href: "/integrations",
    icon: Plug,
  },
  {
    name: "Security & DPDP Compliance",
    desc: "Bank-grade AES-256 encryption, client data isolation & audit trails",
    href: "/secure-client-portal",
    icon: ShieldCheck,
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Escape key handler
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-200 ${
        scrolled || mobileMenuOpen || activeDropdown
          ? "border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs"
          : "border-b border-transparent bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="wrap flex h-[70px] items-center justify-between">
        {/* Brand Logo: Pyngyn is the brand name */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center" aria-label="Pyngyn Home">
            <Image
              src="/logo.webp"
              alt="Pyngyn"
              width={140}
              height={36}
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation Links with Dropdowns */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-[14px]">
            {/* Product Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("product")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === "product" ? null : "product")
                }
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  activeDropdown === "product"
                    ? "text-[#14223d] bg-slate-100 font-semibold"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                }`}
                aria-expanded={activeDropdown === "product"}
              >
                <span>Product</span>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </button>

              <AnimatePresence>
                {activeDropdown === "product" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 top-full mt-1.5 w-[520px] rounded-2xl border border-slate-200 bg-white p-3 shadow-art grid grid-cols-2 gap-1"
                  >
                    {PRODUCT_MENU.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-slate-100 text-[#14223d] group-hover:bg-[#14223d] group-hover:text-white transition-colors">
                            <IconComp className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 font-semibold text-[13px] text-slate-900 group-hover:text-[#14223d]">
                              <span>{item.name}</span>
                              {item.badge && (
                                <span className="rounded bg-slate-100 text-[#14223d] px-1.5 py-0.2 text-[9.5px] font-bold border border-slate-200">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11.5px] text-slate-500 leading-snug line-clamp-2 mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("solutions")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === "solutions" ? null : "solutions")
                }
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  activeDropdown === "solutions"
                    ? "text-[#14223d] bg-slate-100 font-semibold"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                }`}
                aria-expanded={activeDropdown === "solutions"}
              >
                <span>Solutions</span>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </button>

              <AnimatePresence>
                {activeDropdown === "solutions" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 top-full mt-1.5 w-[380px] rounded-2xl border border-slate-200 bg-white p-3 shadow-art flex flex-col gap-1"
                  >
                    {SOLUTIONS_MENU.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-slate-100 text-[#14223d] group-hover:bg-[#14223d] group-hover:text-white transition-colors">
                            <IconComp className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 font-semibold text-[13px] text-slate-900 group-hover:text-[#14223d]">
                              <span>{item.name}</span>
                              {item.badge && (
                                <span className="rounded bg-emerald-100 text-emerald-800 px-1.5 py-0.2 text-[9.5px] font-bold">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11.5px] text-slate-500 leading-snug line-clamp-1 mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Features Link */}
            <Link
              href="/#features"
              className="px-3 py-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Features
            </Link>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("resources")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === "resources" ? null : "resources")
                }
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  activeDropdown === "resources"
                    ? "text-[#14223d] bg-slate-100 font-semibold"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                }`}
                aria-expanded={activeDropdown === "resources"}
              >
                <span>Resources</span>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </button>

              <AnimatePresence>
                {activeDropdown === "resources" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 top-full mt-1.5 w-[380px] rounded-2xl border border-slate-200 bg-white p-3 shadow-art flex flex-col gap-1"
                  >
                    {RESOURCES_MENU.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-slate-100 text-[#14223d] group-hover:bg-[#14223d] group-hover:text-white transition-colors">
                            <IconComp className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-[13px] text-slate-900 group-hover:text-[#14223d]">
                              {item.name}
                            </div>
                            <p className="text-[11.5px] text-slate-500 leading-snug line-clamp-1 mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pricing */}
            <Link
              href="/pricing"
              className="px-3 py-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Pricing
            </Link>
          </nav>
        </div>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={SIGNIN_URL}
            className="text-[14px] font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100/70 transition-colors"
          >
            Login
          </a>
          <a
            href={DEMO_URL}
            className="btn btn-ghost text-[13.5px] px-3.5 py-2 border-slate-300"
          >
            Book a Demo
          </a>
          <a
            href={SIGNUP_URL}
            className="btn btn-accent text-[13.5px] px-4 py-2"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex lg:hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-slate-200 bg-white px-4 py-5 shadow-lg max-h-[85vh] overflow-y-auto"
          >
            <div className="space-y-4">
              {/* Product Section */}
              <div>
                <button
                  onClick={() =>
                    setMobileExpandedSection(
                      mobileExpandedSection === "product" ? null : "product"
                    )
                  }
                  className="flex w-full items-center justify-between py-2 text-[15px] font-bold text-slate-900"
                >
                  <span>Product</span>
                  {mobileExpandedSection === "product" ? (
                    <ChevronUp className="h-4 w-4 opacity-60" />
                  ) : (
                    <ChevronDown className="h-4 w-4 opacity-60" />
                  )}
                </button>
                {mobileExpandedSection === "product" && (
                  <div className="pl-3 pt-1 space-y-2 border-l-2 border-slate-200 mt-1">
                    {PRODUCT_MENU.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 text-[13.5px] font-medium text-slate-600 hover:text-[#14223d] py-1"
                        >
                          <IconComp className="h-4 w-4 text-[#14223d] flex-none" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Solutions Section */}
              <div>
                <button
                  onClick={() =>
                    setMobileExpandedSection(
                      mobileExpandedSection === "solutions" ? null : "solutions"
                    )
                  }
                  className="flex w-full items-center justify-between py-2 text-[15px] font-bold text-slate-900"
                >
                  <span>Solutions</span>
                  {mobileExpandedSection === "solutions" ? (
                    <ChevronUp className="h-4 w-4 opacity-60" />
                  ) : (
                    <ChevronDown className="h-4 w-4 opacity-60" />
                  )}
                </button>
                {mobileExpandedSection === "solutions" && (
                  <div className="pl-3 pt-1 space-y-2 border-l-2 border-slate-300 mt-1">
                    {SOLUTIONS_MENU.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 text-[13.5px] font-medium text-slate-600 hover:text-[#14223d] py-1"
                        >
                          <IconComp className="h-4 w-4 text-[#14223d] flex-none" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Features Link */}
              <Link
                href="/#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[15px] font-bold text-slate-900"
              >
                Features
              </Link>

              {/* Resources Section */}
              <div>
                <button
                  onClick={() =>
                    setMobileExpandedSection(
                      mobileExpandedSection === "resources" ? null : "resources"
                    )
                  }
                  className="flex w-full items-center justify-between py-2 text-[15px] font-bold text-slate-900"
                >
                  <span>Resources</span>
                  {mobileExpandedSection === "resources" ? (
                    <ChevronUp className="h-4 w-4 opacity-60" />
                  ) : (
                    <ChevronDown className="h-4 w-4 opacity-60" />
                  )}
                </button>
                {mobileExpandedSection === "resources" && (
                  <div className="pl-3 pt-1 space-y-2 border-l-2 border-slate-300 mt-1">
                    {RESOURCES_MENU.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 text-[13.5px] font-medium text-slate-600 hover:text-[#14223d] py-1"
                        >
                          <IconComp className="h-4 w-4 text-[#14223d] flex-none" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Pricing */}
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[15px] font-bold text-slate-900"
              >
                Pricing
              </Link>

              {/* Mobile CTAs */}
              <div className="pt-4 border-t border-slate-200 space-y-2.5">
                <a
                  href={SIGNIN_URL}
                  className="btn btn-ghost w-full text-center py-2.5"
                >
                  Login
                </a>
                <a
                  href={DEMO_URL}
                  className="btn btn-primary w-full text-center py-2.5"
                >
                  Book a Demo
                </a>
                <a
                  href={SIGNUP_URL}
                  className="btn btn-accent w-full text-center py-2.5"
                >
                  Get Started Free
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
