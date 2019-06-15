const path = require("path");

module.exports = {
  entry: "./src/lib/timeline.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "timeline.js",
    library: 'react-image-timeline',
    libraryTarget: 'commonjs2'
  },
  mode: "production",
  module: {
    rules: [
      { test: /\.scss$/, use: "sass-loader" },
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
      { test: /\.svg$/, use: "svg-inline-loader" }
    ]
  },
  externals: {
    'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  }
};
