import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // fontFamily:
    //   proxima: ["ProximaNova-Regular", "sans-serif"],
    // },

    extend: {
      backgroundImage: {
        sub: "url(https://i.ibb.co/f1RTfkh/spr-bag.png)",
        main: "url(https://i.ibb.co/JQ1djD8/spr-common.png)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

// input: "url(https://i.ibb.co/zPQyzrN/spr-input.png)",

export default config;
