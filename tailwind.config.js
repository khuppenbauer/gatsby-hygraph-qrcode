/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.js",
    "./src/pages/**/*.js",
    "./src/views/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
