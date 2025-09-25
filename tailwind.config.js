const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      sora: ["Sora", "sans"],
    },
    colors: {
      // Add your custom colors here
      primary: "#219FD9",
      secondary: "#A6D9F0",
      success: "#6AB483",
      danger: "#E45353",
      warning: "#F2F496",
      gold: "#CFBB00",
      stroke: "#DE4AC4",
      darkgrey: "#4D4D4D",
      lightgray: "#E7EBEC",
      greyedtext: "#D3D3D3",
      pink: "#DE4AC4",
      bluishgrey: "#E6F2F7",
      // Extend with default Tailwind CSS colors
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      gray: {
        100: "#f7fafc",
        200: "#edf2f7",
        300: "#e2e8f0",
        400: "#cbd5e0",
        500: "#a0aec0",
        600: "#718096",
        700: "#4a5568",
        800: "#2d3748",
        900: "#1a202c",
      },
    },
    extend: {
      scale: {
        "01": "1.01",
      },
      borderRadius: {
        15: "15px",
      },
      boxShadow: {
        card: "2px 2px 6px 0px rgba(0, 0, 0, 0.1)", // Define your custom shadow
        button: "2px 2px 8px 0px rgba(0, 0, 0, 0.12)",
      },
      backgroundImage: (theme) => ({
        // 'gradient-primary': `linear-gradient(to right, ${theme('colors.primary')}, #0081BC)`,
        "gradient-new": `linear-gradient(149.39deg, #219FD9 -65.44%, #0081BC 188.35%)`,
        "gradient-primary": `linear-gradient(140.26deg, #219FD9 10.32%, #0081BC 97.42%)`,
        "pink-gradient": `linear-gradient(324.02deg, #DE4AC4 13.1%, #F379DE 86.49%); `,
        "gradient-green":`linear-gradient(324.02deg, #2AB63F 13.1%, #52CE5F 86.49%); `,
        "gradient-purple":`linear-gradient(324.02deg, #AA40EB 13.1%, #BC5EF6 86.49%); `,

      }),
      fontSize: {
        "title-xxl": ["44px", "55px"],
        "title-xl": ["36px", "45px"],
        "title-xl2": ["33px", "45px"],
        "title-lg": ["28px", "35px"],
        "title-md": ["24px", "30px"],
        "title-md2": ["26px", "30px"],
        "title-sm": ["20px", "26px"],
        "title-xsm": ["18px", "24px"],
      },
      screens: {
        sm: "800px",
        md: "1010px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
