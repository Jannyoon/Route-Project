/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors : {
        'brand' : '#10B981',
        'fcs' : '#fdba74'
      },
      spacing : {
        '520':'32.5rem'
      }

    },
  },
  plugins: [],
}