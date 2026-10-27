/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#070B12",
        secondary: "#0D141C",
        surface: "#111A24",
        "surface-hover": "#162230",
        accent: {
          DEFAULT: "#6CE7F2",
          hover: "#8EF0F9",
          soft: "#9BF3FA",
          deep: "#2FA9C4",
          muted: "rgba(108, 231, 242, 0.15)",
          subtle: "rgba(108, 231, 242, 0.06)",
          border: "rgba(108, 231, 242, 0.25)",
        },
        azure: "#3E7BC7",
        muted: {
          light: "#F1F5F9",
          DEFAULT: "#94A3B8",
          dark: "#64748B",
          dim: "#334155",
        },
      },
      fontFamily: {
        sans: ["Inter", "Manrope", "system-ui", "-apple-system", "sans-serif"],
        mono: ['"JetBrains Mono"', "Menlo", "monospace"],
      },
      boxShadow: {
        "glow-sm": "0 0 15px -3px rgba(108, 231, 242, 0.15)",
        "glow-md": "0 0 25px -4px rgba(108, 231, 242, 0.2)",
        "glow-lg": "0 0 35px -5px rgba(108, 231, 242, 0.25)",
        /** Lifted card shadow — deep and directional, never a halo. */
        lifted:
          "inset 0 1px 0 rgba(255,255,255,0.05), 0 30px 70px -36px rgba(0,0,0,0.95)",
        "lifted-hover":
          "inset 0 1px 0 rgba(255,255,255,0.07), 0 40px 90px -40px rgba(0,0,0,1), 0 0 40px -18px rgba(108,231,242,0.35)",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out-soft": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        250: "250ms",
        400: "400ms",
        700: "700ms",
      },
      animation: {
        "fade-in": "fade-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-soft": "pulse-soft 4.5s cubic-bezier(0.65, 0, 0.35, 1) infinite",
        "atmo-drift": "atmo-drift 34s cubic-bezier(0.65, 0, 0.35, 1) infinite",
        "atmo-drift-alt":
          "atmo-drift-alt 42s cubic-bezier(0.65, 0, 0.35, 1) infinite",
        "signal-scan": "signal-scan 7s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "dash-travel": "dash-travel 6s linear infinite",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translate3d(0, 6px, 0)" },
          to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.35)" },
        },
        "atmo-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2.5%, -3%, 0) scale(1.06)" },
        },
        "atmo-drift-alt": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1.04)" },
          "50%": { transform: "translate3d(-3%, 2.5%, 0) scale(1)" },
        },
        "signal-scan": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "12%": { opacity: "1" },
          "88%": { opacity: "1" },
          "100%": { transform: "translateY(1000%)", opacity: "0" },
        },
        "dash-travel": {
          to: { strokeDashoffset: "-80" },
        },
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(circle at 50% 0%, rgba(108,231,242,0.08) 0%, rgba(7,11,18,0) 70%)",
      },
    },
  },
  plugins: [],
};
