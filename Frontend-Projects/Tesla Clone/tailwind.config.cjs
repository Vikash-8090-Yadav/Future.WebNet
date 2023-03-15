/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        model3: "url('/images/model-3.jpg')",
        modelS: "url('/images/model-s.jpg')",
        modelX: "url('/images/model-x.jpg')",
        modelY: "url('/images/model-y.jpg')",
        accessories: "url('/images/accessories.jpg')",
        solarPanels: "url('/images/solar-panel.jpg')",
        solarRoof: "url('/images/solar-roof.jpg')",
      },
      animation: {
        arrowDownAnimate: "arrowDown infinite 2s",
      },

      keyframes: {
        arrowDown: {
          "0%,20%, 50%,80%,100%": {
            transform: "translateY(0)",
          },
          "40%": {
            transform: "translateY(5px)",
          },
          "60%": {
            transform: "translateY(3px)",
          },
        },
      },
    },
  },
  plugins: [],
};
