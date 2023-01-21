/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          primary: "#00A54F",
          secondary: "#8cc63f",
          grey: "#3F3F3F",
        },
        font: {
          lightV1: "#0A0A0A",
          lightV2: "#F9F9F9",
          muted: "#979797",
        },
        border: {
          light: "#8D8D8D",
          dark: {
            primary: "#00A54F",
            secondary: "#8cc63f",
          },
        },
      },
      transformOrigin: {
        0: "0%",
      },
      zIndex: {
        "-1": "-1",
      },
    },
  },
  plugins: [],
};
