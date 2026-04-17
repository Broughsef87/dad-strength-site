/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0D1117',
        dark: '#161B22',
        primary: '#1A4B8F',
        accent: '#D97706',
        text: '#F3F4F6',
        subtext: '#9CA3AF'
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        drama: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
