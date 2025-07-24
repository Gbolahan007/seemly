/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bigshoulders: ["Big Shoulders", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        tektur: ["Tektur", "serif"],
      },
    },
  },
  plugins: [],
};
