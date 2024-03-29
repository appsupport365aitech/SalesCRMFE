/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "renal-blue": "#304dfd",
        norm: "#8A9099",
        "text-norm": "#3F434A",
        "bg-red": "#fe5143",
        "bg-grey": "#2E3134",
      },
    },
  },
  plugins: [],
};
