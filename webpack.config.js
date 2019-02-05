const path = require("path");

module.exports = {
  entry: "./src/lib/timeline.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "timline.js",
    library: 'react-image-timeline',
    libraryTarget: 'umd'
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
