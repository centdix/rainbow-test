module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Roboto"],
    },
    minWidth: {
      25: "25%",
      90: "90%",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
