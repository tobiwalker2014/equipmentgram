const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#3056D3",
        amber: colors.amber,
        emerald: colors.emerald,
        gray: colors.gray,
        black: colors.black,
        white: colors.white,
        green: colors.emerald,
        purple: colors.violet,
        yellow: colors.amber,
        pink: colors.fuchsia,
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  mode: "jit",
  plugins: [
    require("tailgrids/plugin"),
    require("@tailwindcss/forms"),
    // require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
