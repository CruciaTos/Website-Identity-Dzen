import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Colors ───────────────────────────────────────────────
      colors: {
        bg: {
          primary:   "#121416",
          secondary: "#17191C",
          tertiary:  "#1E2024",
          panel:     "#1B1D20",
        },
        stone: {
          100: "#D8D3CB",
          200: "#CFC9C0",
          300: "#BFB8AE",
          400: "#9E9890",
          500: "#7A746D",
        },
        accent: {
          DEFAULT: "#8F7860",
          light:   "#A8947E",
          dim:     "rgba(143, 120, 96, 0.15)",
        },
        border: {
          DEFAULT: "rgba(216, 211, 203, 0.08)",
          strong:  "rgba(216, 211, 203, 0.16)",
        },
      },

      // ─── Typography ───────────────────────────────────────────
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans:  ["var(--font-sans)",  "system-ui", "sans-serif"],
        mono:  ["var(--font-mono)",  "monospace"],
      },
      fontSize: {
        "display-1": ["clamp(56px,7vw,108px)",   { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(40px,5vw,72px)",    { lineHeight: "1.0",  letterSpacing: "-0.02em" }],
        "display-3": ["clamp(28px,3.5vw,48px)",  { lineHeight: "1.1",  letterSpacing: "-0.015em" }],
        "headline":  ["clamp(18px,2vw,24px)",    { lineHeight: "1.4",  letterSpacing: "-0.01em" }],
        "body-lg":   ["18px",                    { lineHeight: "1.7"  }],
        "body":      ["15px",                    { lineHeight: "1.7"  }],
        "caption":   ["11px",                    { lineHeight: "1",    letterSpacing: "0.12em"  }],
        "label":     ["10px",                    { lineHeight: "1",    letterSpacing: "0.14em"  }],
      },

      // ─── Spacing ──────────────────────────────────────────────
      maxWidth: {
        content: "1280px",
        site:    "1440px",
      },

      // ─── Animations ───────────────────────────────────────────
      keyframes: {
        ticker: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%":   { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.3" },
        },
        "fade-in": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        ticker:            "ticker 30s linear infinite",
        "marquee":         "ticker 40s linear infinite",
        "marquee-reverse": "marquee-reverse 38s linear infinite",
        "pulse-dot":       "pulse-dot 2s ease-in-out infinite",
        "fade-in":         "fade-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },

      // ─── Transitions ──────────────────────────────────────────
      transitionTimingFunction: {
        "ease-out-expo":    "cubic-bezier(0.22, 1, 0.36, 1)",
        "ease-in-out-expo": "cubic-bezier(0.45, 0, 0.55, 1)",
      },
    },
  },
  plugins: [],
};

export default config;