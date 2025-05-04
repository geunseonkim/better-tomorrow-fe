import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    require("@tailwindcss/line-clamp"),
    require("daisyui"),
  ],
});
