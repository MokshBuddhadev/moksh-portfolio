import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        "deep-water": "var(--deep-water)",
        accent: "var(--accent)",
        "accent-bright": "var(--accent-bright)",
        cyan: "var(--cyan)",
        gold: "var(--gold)",
        fog: "var(--fog)",
        salt: "var(--salt)",
        terrain: "var(--terrain)",
        ridge: "var(--ridge)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "gradient-shift": "gradient-shift 3s ease infinite",
        "waveform-drift": "waveform-drift 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
