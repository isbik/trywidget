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
  },
  daisyui: {
    themes: ["light", ""],
  },
}