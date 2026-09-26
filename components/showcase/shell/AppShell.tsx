"use client";

/*
 * Shared app shell for the product mockups in components/showcase/.
 *
 * Both ClientSpaceShowcase and BusinessBrainShowcase render the same PYNGYN
 * chrome — cream canvas, sidebar, topbar, panel styling — and differ only in
 * the body they put inside it, so that chrome lives here.
 *
 * Fitting the slot: a mockup is authored at a fixed *design* width and scaled
 * down with a transform, so it reads like a real screenshot instead of a
 * squashed mini-app. Both the scale and the layout tier come from container
 * queries (buildShellCss) rather than viewport media queries, so a mockup is
 * correct for whatever width its column happens to be — with no JS
 * measurement, no hydration flash and no layout shift (the stage reserves its
 * height with `aspect-ratio`).
 *
 * Every class and custom property is namespaced with the caller's `prefix`
 * so two mockups on one page never collide.
 */

import type { ReactNode, Ref } from "react";
import { motion } from "framer-motion";
import { EASE, PANEL_CLASS, PANEL_SHADOW, T, alpha } from "./tokens";
import {
  IconBell,
  IconBolt,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconMembers,
  IconMessage,
  IconSearch,
  IconShield,
  IconSparkle,
  IconSun,
  IconTrash,
  IconWarning,
  PyngynMark,
  type ShowcaseIcon,
} from "../showcase-icons";

/* ── types ───────────────────────────────────────────────────────── */

export type ShellNavItem = { id: string; label: string; tint: string; Icon: ShowcaseIcon };
export type ShellUtility = { id: string; label: string; Icon: ShowcaseIcon };
export type ShellWorkspace = { name: string; role: string; initials: string };
export type ShellDesign = {
  wide: { w: number; h: number };
  mid: { w: number; h: number };
  /** container width where the mid layout starts (default 640) */
  midFrom?: number;
  /** container width where the wide layout starts (default 900) */
  wideFrom?: number;
  /**
   * Below `midFrom`, show a *window* onto the wide design instead of a fluid
   * reflow: the stage takes the window's aspect ratio and the shell is shifted
   * left by `offsetX` design px, cropping the sidebar out of frame.
   */
  crop?: { w: number; h: number; offsetX: number };
};

/** The four utility circles every mockup shows under UTILITIES. */
export const SHELL_UTILITIES: readonly ShellUtility[] = [
  { id: "search", label: "Search workspace", Icon: IconSearch },
  { id: "trash", label: "Trash", Icon: IconTrash },
  { id: "members", label: "Members", Icon: IconMembers },
  { id: "shield", label: "Permissions", Icon: IconShield },
];

export const SHELL_SEARCH = { placeholder: "Search anything...", shortcut: "Ctrl K" } as const;

/* ── fit + tier CSS ──────────────────────────────────────────────── */

/** CSS can't divide two lengths, so the scale factor is a stepped ladder of
 *  container-query breakpoints. Steps are fine enough that the residual gap
 *  is a couple of cream pixels, and exact at the common 1000px column. */
function scaleLadder(p: string, from: number, to: number, step: number, design: number) {
  let css = "";
  for (let cw = from; cw <= to; cw += step) {
    const s = Math.min(cw / design, 1).toFixed(5);
    css += `@container ${p} (min-width:${cw}px){.${p}-shell{--${p}-s:${s}}}`;
  }
  return css;
}

/**
 * Chrome CSS for one mockup. `extra` is appended verbatim, so a mockup can
 * add its own body-layout rules in the same stylesheet (and override these,
 * since it lands later in source order at equal specificity).
 */
export function buildShellCss(p: string, design: ShellDesign, extra = ""): string {
  const midFrom = design.midFrom ?? 640;
  const wideFrom = design.wideFrom ?? 900;
  const crop = design.crop;

  /* Below `midFrom` a mockup either reflows fluidly (default) or, with `crop`,
     keeps the wide design and shows a window onto its main column. */
  const base = crop
    ? `.${p}-stage{aspect-ratio:${crop.w}/${crop.h}}
.${p}-shell{position:absolute;top:0;left:0;width:${design.wide.w}px;height:${design.wide.h}px;
  transform:scale(var(--${p}-s)) translateX(-${crop.offsetX}px);gap:14px;padding:16px;overflow:hidden}
.${p}-sidebar{display:flex;width:250px}
.${p}-collapse-btn{display:grid}
.${p}-topbar-actions{display:flex}
.${p}-topbar-circle{display:grid}
.${p}-lbl{display:block}
.${p}-lblf{display:flex}`
    : `.${p}-sidebar{display:none}
.${p}-collapse-btn{display:none}
.${p}-topbar-actions,.${p}-topbar-circle{display:none}`;

  return `
.${p}-fit{container-type:inline-size;container-name:${p}}
.${p}-stage{position:relative;overflow:hidden;background:${T.canvas}}
.${p}-shell{--${p}-s:1;width:100%;transform-origin:top left;display:flex;gap:12px;padding:12px}
.${p}-sidebar{width:250px;flex:none;transition:width 280ms cubic-bezier(.2,.7,.3,1)}
.${p}-lbl,.${p}-lblf{overflow:hidden}
${base}

@container ${p} (min-width:${midFrom}px){
  .${p}-stage{aspect-ratio:${design.mid.w}/${design.mid.h}}
  .${p}-shell{position:absolute;top:0;left:0;width:${design.mid.w}px;height:${design.mid.h}px;
    transform:scale(var(--${p}-s));gap:14px;padding:16px;overflow:hidden}
  .${p}-sidebar{display:flex;width:72px}
  .${p}-collapse-btn{display:none}
  .${p}-navrow{justify-content:center}
  .${p}-utilrow{flex-wrap:wrap;justify-content:center}
  .${p}-lbl,.${p}-lblf{display:none}
  .${p}-topbar-actions{display:flex}
  .${p}-topbar-circle{display:grid}
}

@container ${p} (min-width:${wideFrom}px){
  .${p}-stage{aspect-ratio:${design.wide.w}/${design.wide.h}}
  .${p}-shell{width:${design.wide.w}px;height:${design.wide.h}px;transform:scale(var(--${p}-s))}
  .${p}-sidebar{display:flex;width:250px}
  .${p}-collapse-btn{display:grid}
  .${p}-navrow{justify-content:flex-start}
  .${p}-utilrow{flex-wrap:nowrap;justify-content:flex-start}
  .${p}-lbl{display:block}
  .${p}-lblf{display:flex}
}

/* collapsed sidebar wins over the tier rules on specificity */
.${p}-shell[data-collapsed="true"] .${p}-sidebar{width:72px}
.${p}-shell[data-collapsed="true"] .${p}-lbl,
.${p}-shell[data-collapsed="true"] .${p}-lblf{display:none}
.${p}-shell[data-collapsed="true"] .${p}-navrow{justify-content:center}
.${p}-shell[data-collapsed="true"] .${p}-utilrow{flex-wrap:wrap;justify-content:center}

/* "Arrange" affordance */
.${p}-shell[data-arrange="true"] .${p}-widget{outline:1px dashed #D8CDBE;outline-offset:3px;cursor:grab}

@keyframes ${p}-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.72)}}
.${p}-pulse{animation:${p}-pulse 2.4s ease-in-out infinite}

${crop ? scaleLadder(p, 200, midFrom - 4, 8, crop.w) : ""}
${scaleLadder(p, midFrom, wideFrom - 4, 16, design.mid.w)}
${scaleLadder(p, wideFrom, design.wide.w - 4, 12, design.wide.w)}
@container ${p} (min-width:${design.wide.w}px){.${p}-shell{--${p}-s:1}}
${extra}
`;
}

/* ── primitives ──────────────────────────────────────────────────── */

/** Staggered fade + rise as the mockup scrolls into view. */
export function Rise({
  i,
  className,
  children,
}: {
  i: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: i * 0.04, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** 40×40 (or `size`) rounded tile: accent at 12%, icon at full strength. */
export function Tile({
  Icon,
  tint,
  size = 40,
  icon = 18,
  ring,
  className,
}: {
  Icon: ShowcaseIcon;
  tint: string;
  size?: number;
  icon?: number;
  /** colour of the active ring, if any */
  ring?: string;
  className?: string;
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl transition-shadow ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        background: alpha(tint, 0.12),
        color: tint,
        boxShadow: ring ? `0 0 0 2px ${ring}` : undefined,
      }}
    >
      <Icon style={{ width: icon, height: icon }} />
    </span>
  );
}

export function CircleButton({
  label,
  children,
  className,
  style,
  size = 34,
  onClick,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid shrink-0 place-items-center rounded-full transition-transform duration-150 hover:scale-105 ${className ?? ""}`}
      style={{ width: size, height: size, ...style }}
    >
      {children}
    </button>
  );
}

/* ── sidebar ─────────────────────────────────────────────────────── */

export function ShellSidebar({
  prefix,
  workspace,
  nav,
  activeId,
  onSelect,
  collapsed,
  onToggle,
  utilities = SHELL_UTILITIES,
  navLabel,
  /** which edge the scroll mask fades — "top" reads as scrolled down */
  mask = "bottom",
  /** ring colour on the active tile; defaults to the item's own tint */
  activeRing,
  /** caps the nav viewport so the list overruns it and fades at the edge */
  navMaxHeight,
}: {
  prefix: string;
  workspace: ShellWorkspace;
  nav: readonly ShellNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  collapsed: boolean;
  onToggle: () => void;
  utilities?: readonly ShellUtility[];
  navLabel: string;
  mask?: "top" | "bottom";
  activeRing?: string;
  navMaxHeight?: number;
}) {
  const maskImage =
    mask === "top"
      ? "linear-gradient(180deg,transparent 0%,#000 15%,#000 100%)"
      : "linear-gradient(180deg,#000 0%,#000 84%,transparent 100%)";

  return (
    <div className={`${prefix}-sidebar relative`}>
      <div
        className={`flex min-h-0 w-full flex-col overflow-hidden ${PANEL_CLASS}`}
        style={{ boxShadow: PANEL_SHADOW, borderRightColor: T.borderSidebar }}
      >
        {/* workspace switcher */}
        <button
          type="button"
          className={`${prefix}-navrow flex shrink-0 items-center gap-2.5 px-3 py-3.5 text-left transition-colors hover:bg-[#FAF7F2]`}
          aria-label={`${workspace.name} workspace`}
        >
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-[11px] text-[13px] font-bold text-white"
            style={{ background: T.coral }}
          >
            {workspace.initials}
          </span>
          <span className={`${prefix}-lblf min-w-0 flex-1 flex-col`}>
            <span className="truncate text-[14px] font-bold text-[#1A1A1A]">{workspace.name}</span>
            <span className="truncate text-[11px] font-medium text-[#7A756E]">
              {workspace.role}
            </span>
          </span>
          <IconChevronDown
            className={`${prefix}-lbl shrink-0 text-[#A39D95]`}
            style={{ width: 16, height: 16 }}
          />
        </button>

        {/* nav — clipped with a mask so the list reads as scrollable */}
        <nav
          aria-label={navLabel}
          className="min-h-0 flex-1 overflow-hidden border-t border-[#F0EBE4] px-2 pb-1 pt-1.5"
          style={{ maskImage, WebkitMaskImage: maskImage, maxHeight: navMaxHeight }}
        >
          <ul className={`space-y-0.5 ${mask === "top" ? "-mt-5" : ""}`}>
            {nav.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`${prefix}-navrow flex w-full items-center gap-2.5 rounded-xl px-2 py-1.5 text-left transition-colors hover:bg-[#FAF7F2]`}
                    style={{ background: isActive ? alpha(item.tint, 0.07) : undefined }}
                  >
                    <Tile
                      Icon={item.Icon}
                      tint={item.tint}
                      size={32}
                      icon={17}
                      ring={isActive ? (activeRing ?? item.tint) : undefined}
                    />
                    <span
                      className={`${prefix}-lbl truncate text-[13px] ${
                        isActive ? "font-semibold text-[#1A1A1A]" : "font-medium text-[#57534E]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* utilities — pinned to the bottom when the nav is capped */}
        <div className="mt-auto shrink-0 border-t border-[#EAE4DC] px-3 pb-3 pt-2.5">
          <div className={`${prefix}-lblf items-center justify-between`}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A39D95]">
              Utilities
            </span>
            <IconChevronDown className="text-[#A39D95]" style={{ width: 14, height: 14 }} />
          </div>

          <div className={`${prefix}-utilrow mt-2 flex items-center gap-1.5`}>
            {utilities.map(({ id, label, Icon }) => (
              <CircleButton
                key={id}
                label={label}
                size={30}
                className="text-[#6B7A8C] hover:text-[#1A1A1A]"
                style={{ background: T.greyBlue }}
              >
                <Icon style={{ width: 15, height: 15 }} />
              </CircleButton>
            ))}
          </div>

          <button
            type="button"
            className={`${prefix}-navrow mt-2.5 flex w-full items-center gap-2.5 rounded-xl py-1.5 text-left transition-colors hover:bg-[#FAF7F2]`}
          >
            <Tile Icon={IconWarning} tint={T.amber} size={32} icon={17} />
            <span className={`${prefix}-lbl truncate text-[13px] font-medium text-[#57534E]`}>
              Report a bug
            </span>
          </button>

          <div className="mt-2.5 border-t border-[#EAE4DC] pt-2.5">
            <span className={`${prefix}-lblf items-center gap-1.5`}>
              <span className="text-[11px] font-medium text-[#A39D95]">Powered by</span>
              <PyngynMark className="h-[14px] w-[14px]" />
              <span className="text-[11px] font-bold tracking-[0.02em] text-[#57534E]">PYNGYN</span>
            </span>
          </div>
        </div>
      </div>

      {/* collapse handle, overlapping the panel edge */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!collapsed}
        className={`${prefix}-collapse-btn absolute -right-[11px] top-[74px] z-10 h-[22px] w-[22px] place-items-center rounded-full border border-[#E7E1D9] bg-white text-[#7A756E] transition-transform duration-150 hover:scale-105 hover:text-[#1A1A1A]`}
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,.10)" }}
      >
        {collapsed ? (
          <IconChevronRight style={{ width: 13, height: 13 }} />
        ) : (
          <IconChevronLeft style={{ width: 13, height: 13 }} />
        )}
      </button>
    </div>
  );
}

/* ── topbar ──────────────────────────────────────────────────────── */

const GRADIENT_BUTTONS: {
  id: string;
  label: string;
  from: string;
  to: string;
  Icon: ShowcaseIcon;
}[] = [
  { id: "chat", label: "Open chat", from: "#60A5FA", to: "#2563EB", Icon: IconMessage },
  { id: "ai", label: "Ask PYNGYN AI", from: "#A78BFA", to: "#7C3AED", Icon: IconSparkle },
  { id: "automate", label: "Run an automation", from: "#34D399", to: "#0E9F6E", Icon: IconBolt },
];

export function ShellTopbar({
  prefix,
  workspaceName,
  userInitials,
  searchRef,
  query,
  onQuery,
  /** optional slot left of the theme/bell cluster (e.g. a member stack) */
  extras,
}: {
  prefix: string;
  workspaceName: string;
  userInitials: string;
  searchRef: Ref<HTMLInputElement>;
  query: string;
  onQuery: (v: string) => void;
  extras?: ReactNode;
}) {
  return (
    <header
      className={`flex shrink-0 items-center gap-3 ${PANEL_CLASS} px-3.5 py-2.5`}
      style={{ boxShadow: PANEL_SHADOW, borderBottomColor: T.borderTopbar }}
    >
      <span className={`${prefix}-topbar-actions text-[13px] font-semibold text-[#1A1A1A]`}>
        {workspaceName}
      </span>

      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-[#E7E1D9] bg-[#F8F5F0] px-3 py-1.5 transition-shadow focus-within:border-[#17A67B] focus-within:ring-2 focus-within:ring-[#17A67B]/20">
        <IconSearch className="shrink-0 text-[#A39D95]" style={{ width: 15, height: 15 }} />
        <input
          ref={searchRef}
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder={SHELL_SEARCH.placeholder}
          aria-label={SHELL_SEARCH.placeholder}
          className="min-w-0 flex-1 bg-transparent text-[13px] text-[#1A1A1A] outline-none placeholder:text-[#A39D95]"
        />
        <kbd className="shrink-0 rounded-md border border-[#E7E1D9] bg-white px-1.5 py-0.5 font-sans text-[10px] font-semibold text-[#7A756E]">
          {SHELL_SEARCH.shortcut}
        </kbd>
      </div>

      <div className={`${prefix}-topbar-actions items-center gap-1.5`}>
        {GRADIENT_BUTTONS.map(({ id, label, from, to, Icon }) => (
          <CircleButton
            key={id}
            label={label}
            size={40}
            className="text-white"
            style={{
              background: `linear-gradient(135deg,${from},${to})`,
              boxShadow: `0 6px 14px -8px ${to}`,
            }}
          >
            <Icon style={{ width: 18, height: 18 }} />
          </CircleButton>
        ))}
      </div>

      {extras}

      <div className="ml-0.5 flex shrink-0 items-center gap-1.5">
        <CircleButton
          label="Switch theme"
          className={`${prefix}-topbar-circle border border-[#E7E1D9] text-[#7A756E] hover:text-[#1A1A1A]`}
        >
          <IconSun style={{ width: 16, height: 16 }} />
        </CircleButton>
        <CircleButton
          label="Notifications"
          className={`${prefix}-topbar-circle relative border border-[#E7E1D9] text-[#7A756E] hover:text-[#1A1A1A]`}
        >
          <IconBell style={{ width: 16, height: 16 }} />
          <span
            className="absolute right-[7px] top-[7px] h-[5px] w-[5px] rounded-full"
            style={{ background: T.coral }}
            aria-hidden="true"
          />
        </CircleButton>
        <span
          className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full text-[12px] font-bold text-white"
          style={{ background: T.green }}
          aria-hidden="true"
        >
          {userInitials}
        </span>
      </div>
    </header>
  );
}

/* ── frame ───────────────────────────────────────────────────────── */

/**
 * Outer wrapper: emits the namespaced stylesheet and the
 * container → stage → shell chain the tier CSS above expects.
 */
export function ShellFrame({
  prefix,
  css,
  label,
  rootRef,
  collapsed,
  arrange,
  /** stamped as data-variant on the container, for CSS that scopes a
   *  different fit (e.g. a scaled screenshot) to one instance */
  variant,
  onInteract,
  children,
}: {
  prefix: string;
  css: string;
  label: string;
  rootRef: Ref<HTMLDivElement>;
  collapsed: boolean;
  arrange?: boolean;
  variant?: string;
  /** fires on the first pointer/keyboard interaction inside the mockup */
  onInteract?: () => void;
  children: ReactNode;
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        ref={rootRef}
        className={`${prefix}-fit w-full`}
        role="group"
        aria-label={label}
        data-variant={variant}
        onPointerDownCapture={onInteract}
        onKeyDownCapture={onInteract}
        onFocusCapture={onInteract}
      >
        <div className={`${prefix}-stage`}>
          <div
            className={`${prefix}-shell text-[#1A1A1A]`}
            data-collapsed={collapsed}
            data-arrange={arrange}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
