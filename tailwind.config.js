module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "85vh": "85vh"
      },
      colors: {
        'primary': "#291648",
        'primaryLight': "#916ea6",
        "secondary": "#ca6e3b"
      }
    },
  },
  plugins: [],
}
