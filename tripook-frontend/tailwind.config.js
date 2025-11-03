/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#DC2626',
          blue: '#003580',
          white: '#FFFFFF',
        },
        booking: {
          primary: '#003580',
          secondary: '#DC2626',
          accent: '#F3F4F6',
          text: '#1F2937',
          border: '#E5E7EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}