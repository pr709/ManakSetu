/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          900: '#0a1628',
          800: '#0f1f3d',
          700: '#16294d',
          600: '#1e3a5f',
          500: '#274d7a',
          400: '#3b6196',
          300: '#5a7eb5',
          200: '#9ab4d1',
          100: '#c5d5e8',
          50: '#e8eef5',
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        status: {
          success: '#16a34a',
          warning: '#d97706',
          danger: '#dc2626',
          info: '#2563eb',
          ai: '#7c3aed',
        },
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px 0 rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
};
