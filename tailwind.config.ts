import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: "#18AEEA",
        navy: "#073B5C",
        "light-blue": "#e8f6fd",
        "app-bg": "#f0f8ff",
        border: "#e0edf5",
        muted: "#6b8fa6",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        ethiopic: ["Noto Sans Ethiopic", "sans-serif"],
      },
      fontSize: {
        "2xs": "0.65rem",
        xs: "0.78rem",
        sm: "0.9rem",
        base: "1rem",
        lg: "1.1rem",
        xl: "1.2rem",
        "2xl": "1.4rem",
        "3xl": "1.65rem",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
