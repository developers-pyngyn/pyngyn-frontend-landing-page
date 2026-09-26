/*
 * Design tokens shared by the product mockups in components/showcase/.
 *
 * The mockups render the *app's* palette (warm cream canvas, coral accent),
 * which is deliberately different from the marketing site's tokens in
 * tailwind.config.ts — so these live here instead of the Tailwind theme,
 * and nothing outside components/showcase/ reads them.
 */
export const T = {
  canvas: "#FCF6EE",
  panel: "#FFFFFF",
  /* structure: panels and cards carry a visible edge, lists a lighter one */
  border: "#E7E1D9",
  borderSidebar: "#EAE4DC",
  borderTopbar: "#DFD7CC",
  borderHover: "#D8D0C6",
  divider: "#F0EBE4",
  chartGrid: "#F2EDE6",
  /* text */
  ink: "#1A1A1A",
  sub: "#7A756E",
  mute: "#A39D95",
  /* accents */
  coral: "#F2545B",
  green: "#17A67B",
  amber: "#F5A524",
  red: "#EF4444",
  blue: "#3B82F6",
  purple: "#8B5CF6",
  pink: "#EC4899",
  teal: "#14B8A6",
  /* neutral chrome */
  field: "#F8F5F0",
  rowHover: "#FAF7F2",
  bubble: "#F7F1E8",
  bubbleBorder: "#EAE2D6",
  greyBlue: "#EEF1F5",
  greyBlueInk: "#6B7A8C",
} as const;

export const PANEL_SHADOW = "0 1px 2px rgba(0,0,0,.03), 0 8px 24px -14px rgba(0,0,0,.10)";

/** Panel / card / list-row classes, so both mockups read as one product. */
export const PANEL_CLASS = "rounded-3xl border border-[#E7E1D9] bg-white";
export const CARD_CLASS = "rounded-2xl border border-[#E7E1D9] bg-white";
export const ROW_CLASS =
  "flex w-full items-center gap-2 text-left transition-colors hover:bg-[#FAF7F2]";

export const EASE: [number, number, number, number] = [0.21, 0.6, 0.35, 1];

/** `#RRGGBB` + alpha -> `rgba()`. Used for the 12%-tint icon tiles. */
export function alpha(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}
