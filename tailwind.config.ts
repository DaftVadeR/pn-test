import type { Config } from "tailwindcss";

const config: Config = {
  mode: 'jit', 
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primaryGreen: '#53b97c',
      altGray: '#f2f2f2',
    },
    extend: {
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
    },
  },
  darkMode: "class",
  
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
  safelist: [
    {
      pattern: /./ 
    },
  ],
};
export default config;
