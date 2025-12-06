/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeInUp: 'fadeInUp 0.6s ease-out',
        scanLine: 'scanLine 2s ease-in-out infinite',
        musicBar: 'musicBar 1s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        scanLine: {
          '0%': { top: '10%', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { top: '90%', opacity: '0' },
        },
        musicBar: {
          '0%, 100%': { height: '10px' },
          '50%': { height: '24px' },
        },
      },
    },
  },
  plugins: [],
}
