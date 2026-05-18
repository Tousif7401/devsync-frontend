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
        /* Aura Design System Colors */
        brand: {
          DEFAULT: '#3D81E3',
        },
        aura: {
          dark: '#0c0c0c',
          cyan: '#00d2ff',
          cyanLight: '#A4F4FD',
          navy: '#0B2551',
          navyDark: '#091020',
        },
        /* Aurora Brand Colors */
        brandGray: 'var(--color-brand-gray)',
        /* Titan Design System Colors (for compatibility) */
        midnightInk: {
          DEFAULT: '#111111',
        },
        canvasWhite: {
          DEFAULT: '#ffffff',
        },
        offWhiteSage: {
          DEFAULT: '#f3efeb',
        },
        fadedStone: {
          DEFAULT: '#e9eaeb',
        },
        gunmetalGray: {
          DEFAULT: '#615e5b',
        },
        softConcrete: {
          DEFAULT: '#d8d3cc',
        },
        actionBlack: {
          DEFAULT: '#000000',
        },
        highlightOrange: {
          DEFAULT: '#ff9900',
        },

        /* Legacy shadcn variables for compatibility */
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
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        xl: "var(--radius-xl)",
        /* Titan border radius */
        cards: '32px',
        small: '10px',
        medium: '20px',
        buttons: '160px',
        navigation: '140px',
        '2xl': '20px',
        '3xl': '32px',
        '4xl': '140px',
        '5xl': '160px',
      },
      fontSize: {
        caption: ['10px', { lineHeight: '1.2', letterSpacing: '0' }],
        'body-sm': ['12px', { lineHeight: '1.2', letterSpacing: '0' }],
        body: ['14px', { lineHeight: '1.2', letterSpacing: '0' }],
        'body-lg': ['16px', { lineHeight: '1.2', letterSpacing: '0' }],
        'heading-sm': ['20px', { lineHeight: '1.2', letterSpacing: '0' }],
        heading: ['24px', { lineHeight: '1.2', letterSpacing: '0' }],
        'heading-lg': ['32px', { lineHeight: '1.2', letterSpacing: '0' }],
        'display-sm': ['40px', { lineHeight: '1.2', letterSpacing: '0' }],
        display: ['60px', { lineHeight: '1.2', letterSpacing: '0' }],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontFamily: {
        /* Aurora fonts */
        inter: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        /* Titan fonts */
        geist: ['var(--font-geist)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        'geist-mono': ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        /* Legacy fonts for compatibility */
        sans: ['var(--font-geist)', 'sans-serif'],
        heading: ['var(--font-geist)', 'sans-serif'],
        body: ['var(--font-geist)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        bold: '700',
      },
      maxWidth: {
        'page': '1200px',
      },
      spacing: {
        '52': '52px',
        '56': '56px',
        '60': '60px',
        '64': '64px',
        '80': '80px',
        '88': '88px',
      },
      letterSpacing: {
        'tight': '-0.03em',
        'wide': '0.02em',
        'wider': '0.03em',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
