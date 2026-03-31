import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["Manrope", "Segoe UI", "sans-serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"],
      },
      colors: {
        brand: {
          ink: "#081c15",
          forest: "#1b4332",
          emerald: "#2d6a4f",
          moss: "#40916c",
          sand: "#d8c3a5",
          clay: "#b56549",
          gold: "#d4a373",
          cream: "#f8f3eb",
        },
      },
      boxShadow: {
        halo: "0 20px 80px rgba(27, 67, 50, 0.15)",
        velvet: "0 18px 44px rgba(8, 28, 21, 0.12)",
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
