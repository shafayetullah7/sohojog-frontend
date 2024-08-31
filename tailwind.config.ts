import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        secondary: {
          50: "#F2F8F9",
          100: "#D9EAFB",
          200: "#BCF0F7",
          300: "#A0D6F4",
          400: "#76C2F0",
          500: "#2E9296",
          600: "#257884",
          700: "#1C5E72",
          800: "#134460",
          900: "#0A2A4E",
        },
        primary: {
          50: "#FFF7F2",
          100: "#FFEDD9",
          200: "#FFDFB6",
          300: "#FFD193",
          400: "#FFC370",
          500: "#EC9A1D",
          600: "#C98219",
          700: "#A66F15",
          800: "#835C11",
          900: "#60490D",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;


// colors

// #ec9a1d
// #2e9296
// #ec5a47
// #6e428b

// https://lottie.host/e459247f-cb90-4a58-901a-cd3afb3d3214/ktwK6Ir5Mb.json