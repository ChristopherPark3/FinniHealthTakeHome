import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: "#f1eade",
        orange: "#ED762F",
        purple: "#4a3a54",
      },
    },
  },
  plugins: [],
} satisfies Config;
