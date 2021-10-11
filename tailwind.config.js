const colors = require("tailwindcss/colors")

module.exports = {
  purge: [
    '*.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amber: colors.amber,
        hummer: {
          "dark": "#201f1f"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
