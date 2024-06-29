import path from "path"
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    path.join(path.dirname(require.resolve('@coinbase/onchainkit')), '**/*.js'),
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
      },
      fill: {
        default: 'var(--bg-default)',
        alternate: 'var(--bg-alternate)',
        inverse: 'var(--bg-inverse)',
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        error: 'var(--bg-error)',
        warning: 'var(--bg-warning)',
        success: 'var(--bg-success)',
      },
      textColor: {
        inverse: 'var(--text-inverse)',
        foreground: 'var(--text-foreground)',
        'foreground-muted': 'var(--text-foreground-muted)',
        error: 'var(--text-error)',
        primary: 'var(--text-primary)',
        success: 'var(--text-success)',
        warning: 'var(--text-warning)',
        disabled: 'var(--text-disabled)',
      },
      backgroundColor: {
        default: 'var(--bg-default)',
        'default-hover': 'var(--bg-default-hover)',
        'default-active': 'var(--bg-default-active)',
        alternate: 'var(--bg-alternate)',
        'alternate-hover': 'var(--bg-alternate-hover)',
        'alternate-active': 'var(--bg-alternate-active)',
        inverse: 'var(--bg-inverse)',
        'inverse-hover': 'var(--bg-inverse-hover)',
        'inverse-active': 'var(--bg-inverse-active)',
        primary: 'var(--bg-primary)',
        'primary-hover': 'var(--bg-primary-hover)',
        'primary-active': 'var(--bg-primary-active)',
        secondary: 'var(--bg-secondary)',
        'secondary-hover': 'var(--bg-secondary-hover)',
        'secondary-active': 'var(--bg-secondary-active)',
        error: 'var(--bg-error)',
        warning: 'var(--bg-warning)',
        success: 'var(--bg-success)',
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config