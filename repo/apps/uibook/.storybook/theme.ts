// .storybook/YourTheme.js

import { create } from "@storybook/theming/create";

export default create({
  base: "dark",
  // Typography
  fontBase: '"IBM Plex Sans", sans-serif',
  fontCode: "monospace",

  brandTitle: "UVCE Marvel Design System",
  brandUrl: "https://hub.uvcemarvel.in",
  brandImage:
    "https://res.cloudinary.com/marvelweb/image/upload/v1678988482/Group_38_qrhqag.jpg",
  brandTarget: "_self",

  //
  colorPrimary: "#3A10E5",
  colorSecondary: "#585C6D",

  // UI
  appBg: "#000",
  appContentBg: "#111",
  appBorderColor: "#aaa",
  appBorderRadius: 0,

  // Text colors
  textColor: "#eee",
  textInverseColor: "#222",

  // Toolbar default and active colors
  barTextColor: "#bbb",
  barSelectedColor: "#fafafa",
  barBg: "#000",

  // Form colors
  inputBg: "#000",
  inputBorder: "#fff",
  inputTextColor: "#eee",
  inputBorderRadius: 0,
});
