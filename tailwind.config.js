/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        gotham: ["Gotham Black", "sans-serif"],
        permanentMarker: ["Permanent Marker", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        blowBrush: ["BlowBrush", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [
    //...

    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(31 29 29) transparent",
          borderRadius: "20px",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "white",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: " rgb(31 41 55)",
            borderRadius: "20px",
            border: "1px solid white",
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },

    // require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio'),
  ],
};
