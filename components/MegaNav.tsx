"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MEGA_MENUS, type MegaMenu } from "./mega-menu-data";

function Icon({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Full-width ClickUp-style panel: flat columns with category headers.
function FullPanel({ menu, onNavigate }: { menu: MegaMenu; onNavigate: () => void }) {
  return (
    <div className="wrap py-9">
      <div className="flex flex-wrap gap-x-10 gap-y-8">
        {menu.columns.map((col) => (
          <div key={col.heading} className="min-w-[170px]">
            <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              {col.heading}
            </div>
            <ul className="flex flex-col gap-1">
              {col.items.map((it) => (
                <li key={it.label + it.href}>
                  <Link
                    href={it.href}
                    prefetch={false}
                    onClick={onNavigate}
                    className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-canvas"
                  >
                    <span
                      className="grid h-8 w-8 flex-none place-items-center rounded-lg"
                      style={{ backgroundColor: `${it.color}1a`, color: it.color }}
                    >
                      <Icon d={it.icon} />
                    </span>
                    <span className="text-[15px] font-medium text-ink">{it.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {col.seeAll && (
              <Link href={col.seeAll.href} prefetch={false} onClick={onNavigate} className="mt-3 inline-block text-[13px] font-semibold text-accent hover:underline">
                {col.seeAll.label} →
              </Link>
            )}
          </div>
        ))}

        {/* Featured cards on the right */}
        {menu.featured && menu.featured.length > 0 && (
          <div className="ml-auto flex max-w-[360px] flex-col gap-3">
            <div className="mb-0 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Featured</div>
            {menu.featured.map((f) => (
              <Link
                key={f.title}
                href={f.href}
                prefetch={false}
                onClick={onNavigate}
                className="flex items-start gap-3 rounded-xl border border-line p-3 transition-colors hover:border-accent"
              >
                <span className="grid h-9 w-9 flex-none place-items-center rounded-lg" style={{ backgroundColor: `${f.color}1a`, color: f.color }}>
                  <Icon d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
                </span>
                <span>
                  <span className="block text-[14.5px] font-semibold text-ink">{f.title}</span>
                  <span className="block text-[13px] leading-snug text-muted">{f.body}</span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function MegaNav({ dark }: { dark: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => closeTimer.current && clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(null), 220);
  };

  const activeMenu = MEGA_MENUS.find((m) => m.key === open) ?? null;

  return (
    <div
      className="hidden h-full lg:flex lg:items-center"
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
    >
      <nav className={`flex items-center gap-7 text-[15px] ${dark ? "text-white/75" : "text-[#3a3a42]"}`}>
        <Link
          href="/clientspace"
          prefetch={false}
          className={`py-2 transition-colors ${dark ? "hover:text-white" : "hover:text-accent"}`}
        >
          Clientspace
        </Link>
        {MEGA_MENUS.map((menu) => {
          const isOpen = open === menu.key;
          return (
            <button
              key={menu.key}
              type="button"
              aria-expanded={isOpen}
              onMouseEnter={() => { cancelClose(); setOpen(menu.key); }}
              onClick={() => setOpen(isOpen ? null : menu.key)}
              className={`flex items-center gap-1.5 py-2 transition-colors ${dark ? "hover:text-white" : "hover:text-accent"} ${
                isOpen ? (dark ? "text-white" : "text-accent") : ""
              }`}
            >
              {menu.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          );
        })}
      </nav>

      {/* Full-width dropdown panel, fixed below the 68px header */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: [0.21, 0.6, 0.35, 1] }}
            className="fixed inset-x-0 top-[68px] z-[100] border-t border-line bg-white text-ink shadow-soft"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <FullPanel menu={activeMenu} onNavigate={() => setOpen(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
