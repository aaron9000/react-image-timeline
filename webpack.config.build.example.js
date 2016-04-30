var webpack = require("webpack");
var path = require("path");

module.exports = {
    devtool: "source-map",
    entry: path.join(__dirname, "example/main.js"),
    output: {
        path: "./dist/example",
        publicPath: "/",
        filename: "bundle.js"
    },
    resolve: {extensions: ["", ".js"]},
    module: {
        loaders: [{
            test: /\.js(x)?$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'react', 'airbnb', 'stage-0']
            }
        }, {
            test: /\.css$/,
            loaders: ["style", "css", "autoprefixer-loader?browsers=last 2 version"]
        }]
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: []
            },
            compress: {
                warnings: false
            }
        })
    ]
};
