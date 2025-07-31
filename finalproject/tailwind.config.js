/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  
safelist: ['no-scrollbar'],
  theme: {
    extend: {
      colors: {
        primaryGreen: "#00796b", 
      },
    },
  },
  plugins: [],
}
