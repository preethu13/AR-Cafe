/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cafe-dark': '#1e1b18', // dark coffee brown/charcoal
        'cafe-beige': '#e6d5c3', // warm beige
        'cafe-cream': '#f9f6f0', // cream
        'cafe-caramel': '#c98a4b', // caramel
        'cafe-amber': '#f59e0b', // glowing amber
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
