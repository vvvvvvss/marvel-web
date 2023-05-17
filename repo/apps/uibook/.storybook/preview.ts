import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import { withThemeByDataAttribute } from "@storybook/addon-styling";
import "../src/index.css";
import "ui/index.css";

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "dark",
    attributeName: "data-theme",
  }),
];
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    docs: {
      theme: themes.dark,
    },
  },
};

export default preview;
