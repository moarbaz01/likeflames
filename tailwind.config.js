/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        main_light_purple: "#8B93FF",
        main_dark_bg: "#382B47",
        text_color: "#FFF6FF",
        text_black: '#black',
        main_bg_white: "white",
        dark_main_bg: "rgb(26 28 35)",
        dark_secondary_bg: "rgb(37 39 49)",
        main_dark_violet_color: "#5755FE",
      },
      fontFamily: {
        logo_font: "Exo, sans-serif"
      },
      backgroundColor: {
        black_white: 'linear-gradient("to bottom , white 40%, black 60%")'
      },
      animation: {
        scaleUp: "scaleUp 0.2s 1 ease-in-out",
        opacity: "opacity 0.4s 1 ease-in-out",
        slideDown: "slideDown 0.2s 1 ease-in-out",
      },
      keyframes: {
        scaleUp: {

          "0%": { transform: "scale(0) ", opacity: '0.5' },
          "100%": { transform: "scale(1) ", opacity: '1' }
        },
        opacity: {
          "0%": { opacity: '0' },
          "100%": { opacity: '1' }
        },
        slideDown: {
          "0%": { transform: "translateY(-4%)", opacity: '0' },
          "100%": { transform: "translateY(0)", opacity: '1' }
        },
      }
    },
  },
  plugins: [],
}

