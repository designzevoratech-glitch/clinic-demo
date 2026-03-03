/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#F0F9FF',
          DEFAULT: '#155E75', // Calm Teal
        },
        secondary: {
          light: 'rgba(75, 163, 141, 0.2)',
          DEFAULT: '#4BA38D', // Soft Sage Green
        },
        accent: '#E11D48', // Soft Red for urgency
        main: '#1E293B',
        muted: '#64748B',
        bgLight: '#F8FAFC',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        luxury: '0 20px 40px -10px rgba(0, 0, 0, 0.05)',
        hover: '0 30px 60px -15px rgba(21, 94, 117, 0.15)',
      }
    },
  },
  plugins: [],
}
