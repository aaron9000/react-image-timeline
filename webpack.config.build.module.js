var webpack = require('webpack');
var path = require('path');
var library = 'react-image-timeline';

module.exports = [
    {
        devtool: 'source-map',
        entry: './index.js',
        output: {
            path: path.resolve(__dirname, './dist-example/module'),
            filename: 'react-image-timeline.js',
            library: library,
            libraryTarget: 'umd'
        },
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel"]
            }, {
                test: /\.css$/,
                loaders: ["style", "css", "autoprefixer-loader?browsers=last 2 version"]
            }]
        },
        externals: {
            "react": "React",
            "react-dom": "ReactDOM",
            "moment": "moment",
            "ramda": "R"
        },
        plugins: [
            new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')})
        ]
    },
    {
        devtool: 'source-map',
        entry: './index.js',
        output: {
            path: path.resolve(__dirname, './dist-example/module'),
            filename: 'react-image-timeline.min.js',
            library: library,
            libraryTarget: 'umd'
        },
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
        externals: {
            "react": "React",
            "react-dom": "ReactDOM",
            "moment": "moment",
            "ramda": "R"
        },
        plugins: [
            new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
            new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
        ]
    }
];
