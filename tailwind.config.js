/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    minHeight: {
      "1/2": "50%",
    },
    colors: {
      "light-grey": "#ebecf0",
      "light-white": "#F4F5F7",
      white: "#FFFFFF",
      blue: "#172B4D",
    },
    extend: {},
    fontFamily: {
      oxygen: ["Oxygen", "sans-serif"],
    },
  },
  plugins: [],
};
