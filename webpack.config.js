const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (_, argv) => {
  const isProduction = argv.mode === "production";

  // Common configurations
  const config = {
    // Config the loaders for transpiling TypeScript and SCSS files
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.module\.scss$/,
          use: [
            { loader: "style-loader" },
            {
              loader: "css-loader",
              options: { modules: true, esModule: false },
            },
            { loader: "sass-loader" },
          ],
        },
      ],
    },

    // Following extensions don't require specifying their extensions
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json", ".wasm"],
    },
  };

  // Configurations for the development server
  if (!isProduction) {
    return Object.assign(config, {
      mode: "development",
      entry: "./dev/index.tsx",
      plugins: [new HtmlWebpackPlugin({ template: "./dev/index.html" })],
      devServer: { port: 3000, open: true },
    });
  }

  // Configurations for production bundling
  return Object.assign(config, {
    mode: "production",
    entry: "./src/index.tsx",

    // Delete the existing bundle and create a new bundle in the ./dist directory
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.js",
      clean: true,
      library: {
        name: "CDGTestNPM",
        type: "umd",
      },
    },
  });
};
