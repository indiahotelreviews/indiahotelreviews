/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mono: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        editorial: {
          bg: '#fcfbf9',
          card: '#ffffff',
          darkBg: '#0e0e10',
          darkCard: '#151518',
          border: '#e8e6e1',
          borderDark: '#26262a',
          accent: '#111111',
          cream: '#f7f5f0',
          sand: '#efece6',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest: '0.18em',
        editorial: '0.08em',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
        'elevated': '0 8px 30px rgba(0,0,0,0.06)',
        'modal': '0 20px 50px rgba(0,0,0,0.15)',
        'dark-subtle': '0 1px 3px rgba(0,0,0,0.4)',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        '450': '450ms',
        '550': '550ms',
      }
    },
  },
  plugins: [],
}
