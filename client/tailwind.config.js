/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{tsx,ts}",
  ],
  plugins: [require("daisyui")],
  theme: {
    container: {
      center: true,
      "padding": "16px"
    },
    extend: {
      colors: {
        primary: "#0066FF"
      }
    }
  },
  daisyui: {
    themes: ["light"],
  },
}