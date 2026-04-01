import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "Segoe UI", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      colors: {
        brand: {
          ink: "#1C1240",
          forest: "#4A2FAD",
          emerald: "#5840C5",
          moss: "#7B6BE0",
          sand: "#EAD9B0",
          clay: "#C9A227",
          gold: "#E8C96A",
          cream: "#FAFAF8",
        },
      },
      boxShadow: {
        halo: "0 20px 80px rgba(43, 27, 110, 0.14)",
        velvet: "0 18px 44px rgba(26, 16, 53, 0.10)",
        gold: "0 8px 32px rgba(201, 162, 39, 0.32)",
      },
      backgroundImage: {
        "linen-grid":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
