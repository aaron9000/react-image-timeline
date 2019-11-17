const path = require("path");

module.exports = {
  entry: "./src/lib/timeline.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "timeline.tsx",
    library: 'react-image-timeline',
    libraryTarget: 'commonjs2'
  },
  mode: "production",
  resolve: {
    extensions: [".ts", ".tsx"]
  },
  module: {
    rules: [
      { test: /\.scss$/, use: "sass-loader" },
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
      { test: /\.svg$/, use: "svg-inline-loader" },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: "ts-loader"
            }
        ]
      }      
    ]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};
