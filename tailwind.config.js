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
        100: "#F1F2FF",   // light text
    700: "#1E1E2F",   // for border
    800: "#12131A",   // optional dark border
    900: "rgb(0 8 20)", // background
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
