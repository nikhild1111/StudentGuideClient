/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        richblack: {
          50: "#f5f6fa",       // very light bg
          100: "#F1F2FF",      // light text
          200: "#d0d4ed",      // light borders
          300: "#a6accd",      // muted text
          400: "#6f738f",      // secondary text
          500: "#44475a",      // default text
          600: "#2b2e3d",      // cards / mid-dark bg
          700: "#1E1E2F",      // for border
          800: "#12131A",      // optional dark border / inner bg
          900: "rgb(0 8 20)",  // background
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      screens: {
        'custom-lg': '1100px',
      },
    },
  },
  plugins: [],
}
