import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        border: 'hsl(214 32% 91%)',
        input: 'hsl(214 32% 91%)',
        ring: 'hsl(221 83% 53%)',
        background: 'hsl(210 40% 98%)',
        foreground: 'hsl(222 47% 11%)',
        primary: {
          DEFAULT: 'hsl(221 83% 53%)',
          50: 'hsl(214 100% 97%)',
          100: 'hsl(214 95% 93%)',
          200: 'hsl(213 97% 87%)',
          300: 'hsl(216 96% 78%)',
          400: 'hsl(218 93% 67%)',
          500: 'hsl(221 83% 53%)',
          600: 'hsl(224 76% 48%)',
          700: 'hsl(226 71% 40%)',
          800: 'hsl(228 66% 33%)',
          900: 'hsl(230 62% 26%)',
          950: 'hsl(231 62% 16%)',
        },
        secondary: {
          DEFAULT: 'hsl(215 16% 47%)',
          foreground: 'hsl(210 40% 98%)',
        },
        destructive: {
          DEFAULT: 'hsl(0 84% 60%)',
          foreground: 'hsl(210 40% 98%)',
        },
        success: {
          DEFAULT: 'hsl(142 71% 45%)',
          foreground: 'hsl(210 40% 98%)',
        },
        warning: {
          DEFAULT: 'hsl(38 92% 50%)',
          foreground: 'hsl(210 40% 98%)',
        },
        muted: {
          DEFAULT: 'hsl(210 40% 96%)',
          foreground: 'hsl(215 16% 47%)',
        },
        accent: {
          DEFAULT: 'hsl(210 40% 96%)',
          foreground: 'hsl(222 47% 11%)',
        },
        popover: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(222 47% 11%)',
        },
        card: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(222 47% 11%)',
        },
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.375rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse_soft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        float: 'float 6s ease-in-out infinite',
        pulse_soft: 'pulse_soft 3s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};

export default config;
