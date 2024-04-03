import type { Config } from "tailwindcss";

const defaultStyle = (theme: any) => {
  return {
    fontSize: "fontSize",
    fontWeight: "fontWeight",
    lineHeight: "lineHeight",
    color: "color",
  };
};

const config: Config = {
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
            h1: defaultStyle(theme),
            h2: defaultStyle(theme),
            h3: defaultStyle(theme),
            h4: defaultStyle(theme),
            h5: defaultStyle(theme),
            h6: defaultStyle(theme),
            strong: defaultStyle(theme),
            b: defaultStyle(theme),
            a: defaultStyle(theme),
            p: defaultStyle(theme),
          },
        },
      }),
    },
  },
};
export default config;
