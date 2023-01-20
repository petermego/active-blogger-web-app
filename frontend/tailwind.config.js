/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      blue: "#0284c7",
      neutral: "#fafafa",
      dark: "#232848",
      light: "#1e40af",
      blackHeader: "rgba(0,0,0,0.87)",
      black: "rgb(0,0,0)",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      height: {
        "10vh": "10vh",
        "90vh": "90vh",
      },
    },
  },
  plugins: [],
};
