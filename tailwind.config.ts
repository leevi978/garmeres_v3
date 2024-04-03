import type { Config } from "tailwindcss";

const defaultStyle = {
  fontSize: "fontSize",
  fontWeight: "fontWeight",
};

const config: Config = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            h1: defaultStyle,
            h2: defaultStyle,
            h3: defaultStyle,
            h4: defaultStyle,
            h5: defaultStyle,
            h6: defaultStyle,
            strong: defaultStyle,
            b: defaultStyle,
            a: defaultStyle,
            p: defaultStyle,
          },
        },
      }),
    },
  },
};
export default config;
