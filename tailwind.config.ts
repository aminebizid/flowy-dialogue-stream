import type { Config } from "tailwindcss";

export default {
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
        chat: {
          bot: "#E3F2FD",
          user: "#F5F5F5",
          border: "#E0E0E0",
        },
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%": { opacity: ".2" },
          "20%": { opacity: "1" },
          "100%": { opacity: ".2" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        blink: "blink 1.4s infinite both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
