/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-gray': '#6b7280',
        'primary-blue': '#2563eb',
      }
    },
  },
  plugins: [],
}