const sharedConfig = require("tailwind-config/tailwind.config.js");

module.exports = {
  prefix: "um-",
  darkMode: ["class", '[data-theme="dark"]'],
  ...sharedConfig,
};
