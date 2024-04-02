const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const glob = require("glob");

module.exports = {
  mode: "production",
  entry: glob.sync(".src/app/**/*.tsx").reduce((acc, path) => {
    acc[path] = path;
    return acc;
  }, {}),
  output: {
    filename: "out.min.js",
    path: path.resolve(__dirname, "public"),
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
};
