const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
        "app/(root)/**/*.{ts,tsx}",
        "components/site/**/*.{ts,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
    dark: {
      colors: {
        background: "#0D001A",
        foreground: "#ffffff",
        primary: {
          50: "#090C3A",
          100: "#0E1352",
          200: "#15216E",
          300: "#1C2F8A",
          400: "#2340A6",
          500: "#2950C3",
          600: "#3B6BD9",
          700: "#5592E4",
          800: "#6FA8EE",
          900: "#89C0F9",
          DEFAULT: "#2950C3",
          foreground: "#ffffff",
        },
        focus: "#3B6BD9",
      },
    },
  },
  })],
};