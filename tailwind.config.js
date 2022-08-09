module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}", "./index.html"],
  theme: {
    screens: {
      // MIN-WIDTH
      xs: "400px",
      "mid-sm": "520px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",

      // MAX-WIDTH
      "2xl": "1536px",
      "max-2xl": { max: "1535px" },
      "max-xl": { max: "1279px" },
      "max-lg": { max: "1023px" },
      "max-md": { max: "767px" },
      "max-sm": { max: "639px" },

      "max-mid-sm": { max: "400px" },
      "max-xs": { max: "399px" },
    },
    extend: {},
  },
  plugins: [],
}
