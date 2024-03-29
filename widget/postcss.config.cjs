module.exports = {
  corePlugins: {
    preflight: false,
  },
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})

  },
};
