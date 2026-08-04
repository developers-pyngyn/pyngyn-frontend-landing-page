"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SIGNIN_URL, SIGNUP_URL, DEMO_URL, PRICING_URL } from "./config";
import { MegaNav } from "./MegaNav";
import { MEGA_MENUS } from "./mega-menu-data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const pathname = usePathname();

  // The home page has a dark hero, so at the very top the navbar sits on dark
  // and needs light text + the white logo. Once scrolled (white bg) it flips back.
  // Pages whose hero is dark — the navbar uses light text/logo over them.
  // Normalize the trailing slash so this works regardless of `trailingSlash`
  // in next.config.js (otherwise "/knowledge-base/" wouldn't match
  // "/knowledge-base" and the navbar would render in light mode on a dark hero).
  const normalizedPath = pathname !== "/" ? pathname.replace(/\/$/, "") : pathname;
  const darkHeroPages = ["/", "/knowledge-base"];
  const onDarkHero = darkHeroPages.includes(normalizedPath) && !scrolled && !menuOpen;

  // A nav link is active when the current path starts with its route
  // (so /blog/some-post still highlights "Blog"). Ignore hash-only links.
  const isActive = (href: string) => {
    if (!href.startsWith("/") || href.startsWith("/#")) return false;
    return normalizedPath === href || normalizedPath.startsWith(href + "/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      setMobileSection(null);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] border-b transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-line bg-white/85 backdrop-blur-md backdrop-saturate-150"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="wrap flex h-[68px] items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="pyngyn home">
          <Image
            src={onDarkHero ? "/logo-dark.webp" : "/logo.webp"}
            alt="pyngyn"
            width={150}
            height={40}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <MegaNav dark={onDarkHero} />

        <div className="flex items-center gap-3">
          <a
            href={SIGNIN_URL}
            className={`hidden text-[15px] font-semibold lg:inline ${onDarkHero ? "text-white/80 hover:text-white" : ""}`}
          >
            Sign in
          </a>
          <a
            href={SIGNUP_URL}
            className={`hidden px-4 py-2.5 lg:inline-flex ${
              onDarkHero
                ? "btn border border-white/15 bg-white/5 text-white hover:bg-white/10"
                : "btn btn-ghost"
            }`}
          >
            Start free
          </a>
          <a
            href={DEMO_URL}
            className={`hidden px-[18px] py-2.5 lg:inline-flex ${
              onDarkHero ? "btn bg-white text-ink hover:bg-white/90" : "btn btn-primary"
            }`}
          >
            Book a demo
          </a>

          <button
            type="button"
            className={`grid h-10 w-10 place-items-center rounded-lg border lg:hidden ${
              onDarkHero ? "border-white bg-white text-ink shadow-cta" : "border-line bg-white text-ink"
            }`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="absolute inset-x-0 top-[68px] z-[100] border-t border-line bg-white shadow-card lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.21, 0.6, 0.35, 1] }}
          >
            <nav className="wrap max-h-[calc(100vh-68px)] overflow-y-auto py-4">
              <div className="flex flex-col">
                {/* Clientspace is a flat link (no mega panel), placed first to match
                    the desktop nav's hierarchy, where Clientspace precedes Product. */}
                <Link
                  href="/clientspace"
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive("/clientspace") ? "page" : undefined}
                  className={`border-b border-line px-3 py-3.5 text-[16px] font-semibold ${
                    isActive("/clientspace") ? "text-accent" : "text-ink"
                  }`}
                >
                  Clientspace
                </Link>

                {MEGA_MENUS.map((menu) => {
                  const expanded = mobileSection === menu.key;
                  return (
                    <div key={menu.key} className="border-b border-line">
                      <button
                        type="button"
                        onClick={() => setMobileSection(expanded ? null : menu.key)}
                        aria-expanded={expanded}
                        className="flex w-full items-center justify-between px-3 py-3.5 text-[16px] font-semibold text-ink"
                      >
                        {menu.label}
                        <svg
                          width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"
                          className={`text-muted transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                        >
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.21, 0.6, 0.35, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pb-3">
                              {menu.columns.map((col) => (
                                <div key={col.heading} className="mb-1">
                                  <div className="px-3 pb-1 pt-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">
                                    {col.heading}
                                  </div>
                                  {col.items.map((it) => (
                                    <Link
                                      key={it.label + it.href}
                                      href={it.href}
                                      onClick={() => setMenuOpen(false)}
                                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] text-ink hover:bg-canvas"
                                    >
                                      <span
                                        className="grid h-8 w-8 flex-none place-items-center rounded-lg"
                                        style={{ backgroundColor: `${it.color}1a`, color: it.color }}
                                      >
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                          <path d={it.icon} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                      </span>
                                      {it.label}
                                    </Link>
                                  ))}
                                  {col.seeAll && (
                                    <Link
                                      href={col.seeAll.href}
                                      onClick={() => setMenuOpen(false)}
                                      className="block px-3 py-2 text-[14px] font-semibold text-accent"
                                    >
                                      {col.seeAll.label} →
                                    </Link>
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Pricing is a flat link (no mega panel) */}
                <Link
                  href={PRICING_URL}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(PRICING_URL) ? "page" : undefined}
                  className={`border-b border-line px-3 py-3.5 text-[16px] font-semibold ${
                    isActive(PRICING_URL) ? "text-accent" : "text-ink"
                  }`}
                >
                  Pricing
                </Link>
              </div>

              <div className="mt-4 flex flex-col gap-2.5 px-1">
                <a href={SIGNIN_URL} onClick={() => setMenuOpen(false)} className="px-2 text-[15px] font-semibold">
                  Sign in
                </a>
                <a href={SIGNUP_URL} onClick={() => setMenuOpen(false)} className="btn btn-ghost justify-center">
                  Start free
                </a>
                <a href={DEMO_URL} onClick={() => setMenuOpen(false)} className="btn btn-primary justify-center">
                  Book a demo
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
