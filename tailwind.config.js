/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          }
        }
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
