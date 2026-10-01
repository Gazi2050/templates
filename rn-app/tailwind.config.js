const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        primitive: {
          primary: {
            50: "#FEF9E9",
            100: "#FDF2D2",
            200: "#FBE7AC",
            300: "#F8DA86",
            400: "#F5CC63",
            500: "#F4D9A6",
            600: "#DCBE8A",
            700: "#B8976C",
            800: "#8F7352",
            900: "#665038",
          },
          secondary: {
            50: "#EEF0FB",
            100: "#DEE2F8",
            200: "#C7CDF2",
            300: "#AEB8EB",
            400: "#95A2E3",
            500: "#3D3D52",
            600: "#35384B",
            700: "#2A2E44",
            800: "#20243B",
            900: "#171A31",
          },
          tertiary: {
            50: "#F1F4FF",
            100: "#E3E8FF",
            200: "#D3DBFD",
            300: "#BFC8F5",
            400: "#AAB5EC",
            500: "#939FD8",
            600: "#7E8BC1",
            700: "#6977AA",
            800: "#556493",
            900: "#44517A",
          },
          neutral: {
            50: "#F7F8FC",
            100: "#EDEFF6",
            200: "#DBDFEA",
            300: "#C3C9D9",
            400: "#A8AFC6",
            500: "#8D95AF",
            600: "#737B98",
            700: "#5B637E",
            800: "#3B4260",
            900: "#2A2A3E",
          },
        },
        bg: {
          canvas: "rgb(var(--color-bg-canvas) / <alpha-value>)",
          surface: "rgb(var(--color-bg-surface) / <alpha-value>)",
          elevated: "rgb(var(--color-bg-elevated) / <alpha-value>)",
          muted: "rgb(var(--color-bg-muted) / <alpha-value>)",
          inverse: "rgb(var(--color-bg-inverse) / <alpha-value>)",
        },
        text: {
          primary: "rgb(var(--color-text-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
          muted: "rgb(var(--color-text-muted) / <alpha-value>)",
          inverse: "rgb(var(--color-text-inverse) / <alpha-value>)",
          accent: "rgb(var(--color-text-accent) / <alpha-value>)",
        },
        border: {
          subtle: "rgb(var(--color-border-subtle) / <alpha-value>)",
          DEFAULT: "rgb(var(--color-border-default) / <alpha-value>)",
          strong: "rgb(var(--color-border-strong) / <alpha-value>)",
          accent: "rgb(var(--color-border-accent) / <alpha-value>)",
        },
        action: {
          primary: {
            bg: "rgb(var(--color-action-primary-bg) / <alpha-value>)",
            text: "rgb(var(--color-action-primary-text) / <alpha-value>)",
            border: "rgb(var(--color-action-primary-border) / <alpha-value>)",
          },
          secondary: {
            bg: "rgb(var(--color-action-secondary-bg) / <alpha-value>)",
            text: "rgb(var(--color-action-secondary-text) / <alpha-value>)",
            border: "rgb(var(--color-action-secondary-border) / <alpha-value>)",
          },
          inverted: {
            bg: "rgb(var(--color-action-inverted-bg) / <alpha-value>)",
            text: "rgb(var(--color-action-inverted-text) / <alpha-value>)",
            border: "rgb(var(--color-action-inverted-border) / <alpha-value>)",
          },
        },
        feedback: {
          success: "rgb(var(--color-feedback-success) / <alpha-value>)",
          warning: "rgb(var(--color-feedback-warning) / <alpha-value>)",
          danger: "rgb(var(--color-feedback-danger) / <alpha-value>)",
          info: "rgb(var(--color-feedback-info) / <alpha-value>)",
        },
      },
      fontFamily: {
        headline: ["Manrope", "System"],
        body: ["Inter", "System"],
        label: ["Inter", "System"],
      },
      fontSize: {
        headline: ["32px", { lineHeight: "40px", letterSpacing: "-0.4px" }],
        body: ["16px", { lineHeight: "24px", letterSpacing: "0px" }],
        label: ["14px", { lineHeight: "20px", letterSpacing: "0.1px" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderWidth: {
        hairline: hairlineWidth(),
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require("tailwindcss-animate")],
};
