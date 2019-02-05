const path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js"
  },
  mode: "production",
  module: {
    rules: [
      { test: /\.scss$/, use: "sass-loader" },
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
      { test: /\.svg$/, use: "svg-inline-loader" }
    ]
  }
};
