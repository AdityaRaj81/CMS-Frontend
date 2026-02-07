export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#001F3F",
        gold: "#C5A021",
        charcoal: "#36454F",
      },
      fontFamily: {
        montserrat: ["'Montserrat'", "sans-serif"],
        inter: ["'Inter'", "sans-serif"],
      },
    },
  },
};
