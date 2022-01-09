const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: colors.lime
      }
    },
  },

  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')],
};

module.exports = config;
