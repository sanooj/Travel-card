// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
    },
    fontSize: {
      lg: ['18px', { lineHeight: '22px' }],
      xl: ['18px', { lineHeight: '22px' }],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}