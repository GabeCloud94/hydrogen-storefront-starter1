/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-main": "#44403c",
        "section-main": "#a7f3d0",
        "section-secondary": "#ef4444",
        "dramatic-color": "#fde047",
        "text-color-main": "#e2e8f0",
        "text-color-secondary": "#44403c",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
