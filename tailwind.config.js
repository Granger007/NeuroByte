/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0F',
        foreground: '#FFFFFF',
        primary: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
        },
        secondary: {
          DEFAULT: '#10B981',
          hover: '#059669',
        },
        accent: '#6366F1',
        muted: '#374151',
        card: '#1F2937',
      },
    },
  },
  plugins: [],
};