// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)", opacity: "0" },
          "25%": { transform: "scale(1.2)", opacity: "1" },
          "50%": { transform: "scale(1)", opacity: "0" },
          "75%": { transform: "scale(1.2)", opacity: "1" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        heartbeat: "heartbeat 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
