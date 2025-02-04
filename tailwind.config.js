/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Note the addition of .tsx if you use TypeScript
  ],
  theme: {
    extend: {},
    fontFamily: {
      'great-vibes': ['Great Vibes', 'cursive'], // Or any other name you choose
      'lobster-two': ['Lobster Two', 'cursive'],
      'dancing-script': ['Dancing Script', 'cursive'],
      'open-sans': ['Open Sans', 'sans-serif'],
    },
    screens: {
      'sm': '640px',  
      'md': '770px', 
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}

