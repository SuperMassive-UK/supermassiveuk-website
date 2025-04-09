/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors')
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",  "./node_modules/tw-elements/js/**/*.js"],
  theme: {
    screens: {
      xs: "475px",
      "custom-height-sticky": {
        raw: "((min-width: 768px) and (max-height: 850px))",
      },
      ...defaultTheme.screens,
    },
    colors: {
      'sm-blue': "#3B56EB",
      'sm-dark-purple': "#161240",
      'sm-md-purple': '#330F99',
      'sm-turquoise': '#4CC9F1',
      'sm-fuschia': '#7208B7',
      ...colors
    },
    extend: {
      fontFamily: {
        heading: ["'Obviously', sans-serif;"],
        primary: ["'Lexend', sans-serif"],
      },

      dropShadow: {
        custom: ["0px 2px 2px rgba(0, 0, 0, 0.8)"],
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tw-elements/plugin.cjs")],
};
