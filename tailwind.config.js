/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        brand: {
          50:  "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d5fe",
          300: "#a4b8fd",
          400: "#7b93fa",
          500: "#5b70f6",
          600: "#4350eb",
          700: "#3640d0",
          800: "#2e37a8",
          900: "#2b3484",
          950: "#1a1f52",
        },
        // Neutral (zinc-based, premium feel)
        surface: {
          0:   "#ffffff",
          50:  "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
        // Semantic
        success: { light: "#f0fdf4", DEFAULT: "#22c55e", dark: "#15803d" },
        warning: { light: "#fffbeb", DEFAULT: "#f59e0b", dark: "#b45309" },
        danger:  { light: "#fef2f2", DEFAULT: "#ef4444", dark: "#b91c1c" },
        info:    { light: "#eff6ff", DEFAULT: "#3b82f6", dark: "#1d4ed8" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.9rem", { lineHeight: "1.4rem" }],
        sm: ["1.05rem", { lineHeight: "1.9rem" }],
        base: ["1.12rem", { lineHeight: "2rem" }],
        lg: ["1.25rem", { lineHeight: "2.05rem" }],
        xl: ["1.375rem", { lineHeight: "2.2rem" }],
        "2xl": ["1.75rem", { lineHeight: "2.4rem" }],
        "2xs": ["0.78rem", { lineHeight: "1rem" }],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        "glow-brand": "0 0 20px rgba(91, 112, 246, 0.3)",
        "glow-success": "0 0 20px rgba(34, 197, 94, 0.25)",
        "card": "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.10)",
        "modal": "0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)",
      },
      animation: {
        "fade-in":       "fadeIn 0.2s ease-out",
        "slide-up":      "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-left": "slideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "pulse-slow":    "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow":     "spin 3s linear infinite",
        "shimmer":       "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn:      { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp:     { from: { opacity: 0, transform: "translateY(12px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        slideInLeft: { from: { opacity: 0, transform: "translateX(-12px)" }, to: { opacity: 1, transform: "translateX(0)" } },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial":  "radial-gradient(var(--tw-gradient-stops))",
        "shimmer-gradient": "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};
