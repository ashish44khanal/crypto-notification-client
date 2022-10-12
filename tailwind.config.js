/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          base: "#1EA64A",
          "light-100": "#2CF26C",
          "light-200": "#27D961",
          "light-300": "#23BF55",
          "dark-600": "#198C3F",
          "dark-700": "#157333",
          "dark-800": "#105928",
        },
        secondary: {
          base: "#FFEE88",
          light: "#FFFA63",
          dark: "#E9D985",
        },
        optional: "#E5625E",
      },
    },
  },
};