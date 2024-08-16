/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        color: "#00776f",
        color2: "#049AE7",
      },
      screens: {
        tablet: "1100px",
      },
    },
  },
  plugins: [],
};
