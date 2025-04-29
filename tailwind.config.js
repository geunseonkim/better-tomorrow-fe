import tailwindcss from "@tailwindcss/vite";

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [tailwindcss()],
};

export default {
  content: [
    "./index.html",
    "./src//*.{js,ts,jsx,tsx}",
    // "./node_modules/@heroui/theme/dist//*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
