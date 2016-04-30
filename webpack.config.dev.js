import webpack from "webpack";
import path from "path";

export default {
    devtool: "source-map",
    entry: {
        "main": [
            "webpack-dev-server/client?http://0.0.0.0:3000",
            "webpack/hot/only-dev-server",
            path.join(__dirname, "example/main.js")
        ]
    },
    output: {
        path: path.join(__dirname, "build"),
        publicPath: "/example",
        filename: "bundle.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
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
    devServer: {
        publicPath: "/js/",
        hot: true,
        historyApiFallback: true,
        quiet: true
    }
};
