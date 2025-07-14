import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
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
        copper: {
          50: "#fef9f7",
          100: "#fdf1eb",
          200: "#fbe0d1",
          300: "#f7c5a7",
          400: "#f29d75",
          500: "#ed7d54",
          600: "#de643d",
          700: "#b85332",
          800: "#934632",
          900: "#763c2d",
          950: "#401d16",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
          950: "#d4af37",
        },
        platinum: {
          50: "#f8f9fa",
          100: "#f1f3f4",
          200: "#e8eaed",
          300: "#dadce0",
          400: "#bdc1c6",
          500: "#9aa0a6",
          600: "#80868b",
          700: "#5f6368",
          800: "#3c4043",
          900: "#202124",
          950: "#e5e7eb",
        },
        // Earthy Architecture-Inspired Colors
        clay: {
          50: "#f7f3f0",
          100: "#ede6e1",
          200: "#dcc8bd",
          300: "#c5a394",
          400: "#b8896f",
          500: "#AC8968", // Primary Background - Soft Clay
          600: "#9a7459",
          700: "#81604a",
          800: "#6a4f3e",
          900: "#564135",
        },
        taupe: {
          50: "#f6f4f2",
          100: "#ece8e4",
          200: "#d9d1ca",
          300: "#c0b4aa",
          400: "#A69080", // Secondary Background - Muted Taupe
          500: "#978472",
          600: "#877464",
          700: "#716053",
          800: "#5d4f45",
          900: "#4d4239",
        },
        mocha: {
          50: "#f7f6f5",
          100: "#eeecea",
          200: "#ddd8d4",
          300: "#c6beb7",
          400: "#aa9f95",
          500: "#918478",
          600: "#7c6f63",
          700: "#685c52",
          800: "#574e46",
          900: "#4a433c",
          950: "#3E362E", // Headings - Dark Mocha
        },
        leather: {
          50: "#f6f3f0",
          100: "#ebe4de",
          200: "#d7c7bb",
          300: "#bfa491",
          400: "#a58268",
          500: "#936b4f",
          600: "#865D36", // Buttons/Accents - Leather Brown
          700: "#6f4a2c",
          800: "#5c3d27",
          900: "#4e3324",
        },
        olive: {
          50: "#f6f5f3",
          100: "#ebe8e4",
          200: "#d8d0c8",
          300: "#beb2a4",
          400: "#a1927f",
          500: "#93785B", // Hover/Links - Olive Bronze
          600: "#85694f",
          700: "#705643",
          800: "#5c4739",
          900: "#4b3c30",
        },
        stone: {
          50: "#f6f4f2",
          100: "#ece8e4",
          200: "#d9d1ca",
          300: "#c0b4aa",
          400: "#A69080", // Captions/Border Text - Muted Stone
          500: "#978472",
          600: "#877464",
          700: "#716053",
          800: "#5d4f45",
          900: "#4d4239",
        },
        luxgray: {
          50: "#f8f9fa",
          100: "#f1f3f4",
          200: "#e8eaed",
          300: "#dadce0",
          400: "#bdc1c6",
          500: "#9aa0a6",
          600: "#80868b",
          700: "#5f6368",
          800: "#3c4043",
          900: "#202124",
          950: "#171717",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        'gentle-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        hoverLift: {
          "0%": { transform: "translateY(0) scale(1)" },
          "100%": { transform: "translateY(-8px) scale(1.02)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        luxuryGlow: {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.1)",
          },
          "50%": {
            boxShadow:
              "0 0 30px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.2)",
          },
        },
        subtlePulse: {
          "0%, 100%": {
            boxShadow:
              "0 8px 25px rgba(250, 204, 21, 0.4), 0 0 20px rgba(250, 204, 21, 0.2)",
          },
          "50%": {
            boxShadow:
              "0 12px 35px rgba(250, 204, 21, 0.5), 0 0 30px rgba(250, 204, 21, 0.3)",
          },
        },
        iconBounce: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-4px) scale(1.05)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
        'gentle-bounce': 'gentle-bounce 2s ease-in-out infinite',
        "slide-up": "slideUp 0.8s ease-out",
        "slide-in-left": "slideInLeft 0.6s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
        "hover-lift": "hoverLift 0.3s ease-out",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
        "gradient-shift": "gradientShift 4s ease-in-out infinite",
        "luxury-glow": "luxuryGlow 3s ease-in-out infinite",
        "subtle-pulse": "subtlePulse 3s ease-in-out infinite",
        "icon-bounce": "gentle-bounce 2s ease-in-out infinite",
      },
      fontFamily: {
        luxury: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
