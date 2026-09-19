import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    // The React Compiler memoizes components automatically
    react({ babel: { plugins: [["babel-plugin-react-compiler", {}]] } }),
    tailwindcss(),
  ],
});
