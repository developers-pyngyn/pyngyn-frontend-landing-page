import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f1115",
        muted: "#6b7280",
        line: "#e9eaf0",
        // Pyngyn Navy Blue brand theme
        accent: { 
          DEFAULT: "#14223d", 
          dk: "#0a1220", 
          lt: "#f0f4fa",
          hover: "#1c2e4f"
        },
        navy: {
          900: "#0a1220",
          800: "#14223d",
          700: "#1c2e4f",
          600: "#273d66",
          100: "#e8eff8",
          50: "#f0f4fa",
        },
        positive: "#0b7a4b",
        // grey page canvas with white floating cards
        canvas: "#f1f2f5",
        surface: "#ffffff",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { content: "1180px" },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
      boxShadow: {
        // softer, layered card shadows (the floating look)
        soft: "0 2px 4px rgba(15,17,21,.04), 0 12px 32px -12px rgba(15,17,21,.12)",
        card: "0 1px 2px rgba(15,17,21,.04), 0 8px 24px -16px rgba(15,17,21,.18)",
        cta: "0 8px 20px -10px rgba(15,17,21,.45)",
        art: "0 30px 80px -40px rgba(15,17,21,.35)",
      },
    },
  },
  plugins: [],
};
export default config;
