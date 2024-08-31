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
        lavenderMist: {
          50: "#eeeaf2",
          100: "#e1dde8",
          200: "#d3cfdc",
          300: "#c3b2cc",
          400: "#b488bc",
          500: "#a167aa",
          600: "#8a4fa9",
          700: "#713794",
          800: "#582f77",
          900: "#3f2359",
          1000: "#29123d",
        },
        blushPink: {
          50: "#fee9e8",
          100: "#fddddd",
          200: "#fcc1c1",
          300: "#faa3a3",
          400: "#f88b8b",
          500: "#f76969",
          600: "#f54e47",
          700: "#f1332c",
          800: "#d62621",
          900: "#a91b1b",
          1000: "#7c1011",
        },
        iceMint: {
          50: "#e5f7f7",
          100: "#d4f0f0",
          200: "#b8e5e6",
          300: "#99dbdb",
          400: "#78d0d1",
          500: "#55c5c5",
          600: "#40d4d5",
          700: "#25c1c1",
          800: "#1b9898",
          900: "#147070",
          1000: "#0d4a4a",
        },
        honeyCream: {
          50: "#fef1dc",
          100: "#fce7c5",
          200: "#fbd6a5",
          300: "#f7c285",
          400: "#f5ab61",
          500: "#f5973e",
          600: "#f38817",
          700: "#d57012",
          800: "#a7580d",
          900: "#793f08",
          1000: "#4b2704",
        },

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
      backgroundImage: {
        "blush-lavender-50": "linear-gradient(to right, #fee9e8, #eeeaf2)",
        "blush-lavender-100": "linear-gradient(to right, #fddddd, #e1dde8)",
        "blush-lavender-200": "linear-gradient(to right, #fcc1c1, #d3cfdc)",
        "blush-lavender-300": "linear-gradient(to right, #faa3a3, #c3b2cc)",
        "blush-lavender-400": "linear-gradient(to right, #f88b8b, #b488bc)",
        "blush-lavender-500": "linear-gradient(to right, #f76969, #a167aa)",
        "blush-lavender-600": "linear-gradient(to right, #f54e47, #8a4fa9)",
        "blush-lavender-700": "linear-gradient(to right, #f1332c, #713794)",
        "blush-lavender-800": "linear-gradient(to right, #d62621, #582f77)",
        "blush-lavender-900": "linear-gradient(to right, #a91b1b, #3f2359)",
        "blush-lavender-1000": "linear-gradient(to right, #7c1011, #29123d)",
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
