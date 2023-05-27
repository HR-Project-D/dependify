const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette").default;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontSize: {
        "2xs": "0.625rem",
      },
      maxWidth: {
        '8xl': '90rem',
      }
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",

      black: {
        DEFAULT: "#000000",
        92: "hsla(0, 0%, 0%, 0.92)",
        80: "hsla(0, 0%, 0%, 0.80)",
        72: "hsla(0, 0%, 0%, 0.72)",
        64: "hsla(0, 0%, 0%, 0.64)",
        56: "hsla(0, 0%, 0%, 0.56)",
        48: "hsla(0, 0%, 0%, 0.48)",
        32: "hsla(0, 0%, 0%, 0.32)",
        24: "hsla(0, 0%, 0%, 0.24)",
        16: "hsla(0, 0%, 0%, 0.16)",
        10: "hsla(0, 0%, 0%, 0.10)",
        8: "hsla(0, 0%, 0%, 0.08)",
        5: "hsla(0, 0%, 0%, 0.05)",
        2: "hsla(0, 0%, 0%, 0.02)",
      },

      white: {
        DEFAULT: "#ffffff",
        92: "hsla(0, 0%, 100%, 0.92)",
        80: "hsla(0, 0%, 100%, 0.80)",
        72: "hsla(0, 0%, 100%, 0.72)",
        64: "hsla(0, 0%, 100%, 0.64)",
        56: "hsla(0, 0%, 100%, 0.56)",
        48: "hsla(0, 0%, 100%, 0.48)",
        32: "hsla(0, 0%, 100%, 0.32)",
        24: "hsla(0, 0%, 100%, 0.24)",
        16: "hsla(0, 0%, 100%, 0.16)",
        10: "hsla(0, 0%, 100%, 0.10)",
        8: "hsla(0, 0%, 100%, 0.08)",
        5: "hsla(0, 0%, 100%, 0.05)",
        2: "hsla(0, 0%, 100%, 0.02)",
      },

      gray: {
        DARK: "#0C0C0D",
        0: "#0F0F10",
        1: "#161618",
        2: "#1C1C1F",
        3: "#232326",
        4: "#28282C",
        5: "#2E2E32",
        6: "#34343A",
        7: "#3E3E44",
        8: "#504F57",
        9: "#706F78",
        10: "#7E7D86",
        11: "#A09FA6",
        12: "#EDEDEF",
      },

      accent: {
        1: "#17151F",
        2: "#1C172B",
        3: "#251E40",
        4: "#2C2250",
        5: "#32275F",
        6: "#392C72",
        7: "#443592",
        8: "#5842C3",
        9: "#6E56CF",
        10: "#7C66DC",
        11: "#9E8CFC",
        12: "#F1EEFE",
      },

      red: {
        1: "#1F1315",
        2: "#291415",
        3: "#3C181A",
        4: "#481A1D",
        5: "#541B1F",
        6: "#671E22",
        7: "#822025",
        8: "#AA2429",
        9: "#E5484D",
        10: "#F2555A",
        11: "#FF6369",
        12: "#FEECEE",
      },
    },
  },
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ":root": newVars,
  });
}
