import tailwindcss from "@tailwindcss/vite";
const { heroui } = require("@heroui/react");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [heroui(), tailwindcss()],
  content: [
    "./index.html",
    "./src//*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist//*.{js,ts,jsx,tsx}",
    // "./node_modules/@heroui/react/**/*.{js,ts,jsx,tsx}",
  ],
};
