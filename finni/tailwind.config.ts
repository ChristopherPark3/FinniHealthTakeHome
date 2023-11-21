import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      backgroundColor : {
        primary2: "#f1eade",
        secondary: "#4a3a54",
        primary: "#ED762F"
      }
    },
  },
  plugins: [],
} satisfies Config;
