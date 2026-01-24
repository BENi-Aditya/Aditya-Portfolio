import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Horn-Bill custom colors with cyan/teal accent
        crimson: {
          DEFAULT: "hsl(354, 65%, 48%)",
          dark: "hsl(354, 55%, 35%)",
          light: "hsl(354, 70%, 58%)",
          glow: "hsl(354, 65%, 48%, 0.3)",
        },
        cyan: {
          DEFAULT: "hsl(185, 70%, 45%)",
          dark: "hsl(185, 60%, 32%)",
          light: "hsl(185, 80%, 55%)",
          glow: "hsl(185, 70%, 45%, 0.3)",
        },
        emerald: {
          DEFAULT: "hsl(160, 60%, 42%)",
          dark: "hsl(160, 50%, 30%)",
          light: "hsl(160, 70%, 52%)",
          glow: "hsl(160, 60%, 42%, 0.3)",
        },
        amber: {
          DEFAULT: "hsl(38, 75%, 50%)",
          dark: "hsl(38, 65%, 38%)",
          light: "hsl(38, 85%, 60%)",
          glow: "hsl(38, 75%, 50%, 0.3)",
        },
        grid: {
          line: "hsl(185, 70%, 45%, 0.03)",
          pulse: "hsl(185, 70%, 45%, 0.1)",
        },
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "grid-pulse": {
          "0%, 100%": { opacity: "0.03" },
          "50%": { opacity: "0.06" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(185, 70%, 45%, 0.2)" },
          "50%": { boxShadow: "0 0 40px hsl(185, 70%, 45%, 0.4)" },
        },
        "prop-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        "seed-fall": {
          "0%": { transform: "translateY(0) translateX(0)" },
          "100%": { transform: "translateY(300px) translateX(80px)" },
        },
        "tree-grow": {
          "0%": { transform: "scaleY(0)", opacity: "0" },
          "50%": { transform: "scaleY(0.5)", opacity: "0.8" },
          "100%": { transform: "scaleY(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "grid-pulse": "grid-pulse 4s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "prop-spin": "prop-spin 0.1s linear infinite",
        "scan-line": "scan-line 2s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "draw-line": "draw-line 1.5s ease-out forwards",
        "seed-fall": "seed-fall 1.5s ease-in forwards",
        "tree-grow": "tree-grow 2s ease-out forwards",
      },
      backgroundImage: {
        "grid-pattern": 
          "linear-gradient(hsl(185, 70%, 45%, 0.03) 1px, transparent 1px), linear-gradient(90deg, hsl(185, 70%, 45%, 0.03) 1px, transparent 1px)",
        "radial-glow": 
          "radial-gradient(circle at center, hsl(185, 70%, 45%, 0.1) 0%, transparent 70%)",
        "radial-glow-primary": 
          "radial-gradient(circle at center, hsl(354, 65%, 48%, 0.1) 0%, transparent 70%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;