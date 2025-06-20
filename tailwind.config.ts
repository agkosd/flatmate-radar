import type { Config } from "tailwindcss";
import fontFamily from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.fontFamily.sans],
      },
    },
  },
};
export default config;
