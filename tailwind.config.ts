import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        spaceIndigo: {
          DEFAULT: '#2b2d42',
          100: '#08090d',
          200: '#11121a',
          300: '#191b27',
          400: '#222334',
          500: '#2b2d42',
          600: '#4a4d72',
          700: '#6d71a0',
          800: '#9da0bf',
          900: '#ced0df',
        },
        draftrPurple: {
          DEFAULT: '#5235ef',
          100: '#1a0b4d',
          200: '#34179e',
          300: '#4b24e4',
          400: '#5235ef',
          500: '#5235ef',
          600: '#6b57f2',
          700: '#8479f5',
          800: '#9d9bf8',
          900: '#b6bdfb',
        },
        darkBg: {
          DEFAULT: '#101011',
        },
        // Text colors from Draftr
        textPrimary: {
          DEFAULT: '#ffffff',
        },
        textSecondary: {
          DEFAULT: '#a7a7a7',
        },
        textMuted: {
          DEFAULT: '#606266',
        },
        textDark: {
          DEFAULT: '#2b2b2c',
        },
        lavenderGrey: {
          DEFAULT: '#8d99ae',
          100: '#1a1e25',
          200: '#343c4a',
          300: '#4f5b6f',
          400: '#697994',
          500: '#8d99ae',
          600: '#a4aebf',
          700: '#bbc2cf',
          800: '#d2d6df',
          900: '#e8ebef',
        },
        platinum: {
          DEFAULT: '#edf2f4',
          100: '#24353b',
          200: '#496a77',
          300: '#759bab',
          400: '#b1c6cf',
          500: '#edf2f4',
          600: '#f0f4f6',
          700: '#f4f7f8',
          800: '#f7fafa',
          900: '#fbfcfd',
        },
        punchRed: {
          DEFAULT: '#FF6B6B',
          100: '#331313',
          200: '#662626',
          300: '#993a3a',
          400: '#cc4d4d',
          500: '#FF6B6B',
          600: '#ff8888',
          700: '#ffa5a5',
          800: '#ffc2c2',
          900: '#ffe0e0',
        },
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
        xtract: {
          bg: '#0a0a0a',
          text: '#ffffff',
          primary: '#5235ef',
          secondary: '#1a1a1a',
          accent: '#6b57f2',
          border: 'rgba(255, 255, 255, 0.1)',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontFamily: {
        sans: ['Switzer', 'Satoshi', 'sans-serif'],
        heading: ['var(--font-manrope)', 'sans-serif'],
        body: ['Switzer', 'Satoshi', 'sans-serif'],
        logo: ['var(--font-quattrocento)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        display: ['var(--font-manrope)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        jakarta: ['var(--font-plus-jakarta)', 'sans-serif'],
        dmsans: ['var(--font-dm-sans)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        space: ['var(--font-space-grotesk)', 'sans-serif'],
        switzer: ['Switzer', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
