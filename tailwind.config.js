/** @type {import('tailwindcss').Config} */
export default {
  content: ["*", "./src/*.{tsx, ts}", "./src/**/*.{tsx, ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
};
