const path = require("path");
module.exports = {
  "core": {
    "builder": 'webpack5'
  },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-scss"
  ],
  "framework": "@storybook/react",
  // "webpackFinal": async (config, { configType }) => {
  //   // Make whatever fine-grained changes you need
  //   config.module.rules.push({
  //     test: /\.scss$/,
  //     use: ["style-loader", "css-loader", "sass-loader"],
  //     include: path.resolve(__dirname, "../"),
  //   });

  //   // Return the altered config
  //   return config;
  // }
}