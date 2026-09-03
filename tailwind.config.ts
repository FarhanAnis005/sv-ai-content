import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          base: "#050A1A",        // Deepest brand navy canvas
          surface: "#0A112A",     // Elevated card/container background
          active: "#10193A",      // Hover / pressed state
        },
        brand: {
          accent: "#00E575",      // Storyvord logo gradient green (High-impact CTA / Active)
          blue: "#1E3A8A",        // Storyvord logo navy/blue gradient base
          cyan: "#06B6D4",        // Mid-gradient tone for micro-highlights
        },
        type: {
          primary: "#EDEDED",    // Stark off-white for headlines
          secondary: "#7A849F",  // Cool muted slate for body
          mono: "#94A3B8",       // Crisp technical gray for badges
        },
        border: {
          hairline: "rgba(255, 255, 255, 0.07)",
          active: "rgba(0, 229, 117, 0.4)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "pulse-fast": "pulse 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "marquee": "marquee 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
