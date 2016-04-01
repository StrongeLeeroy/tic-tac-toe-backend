var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './client/index.jsx',
    output: {
        path: path.join(__dirname + '/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        moduleDirectories: ['node_modules', 'client/src'],
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin('bundle.css')
    ],
    module: {
        loaders: [
            {
                loader: ["babel"],
                exclude: /node_modules/,
                test: /\.jsx?$/,
                query: {
                    presets: ['react', 'es2015']
                }
            }, {
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader"),
                test: /\.scss$/
            }, {
                loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
                test: /\.css$/
            },
            { test: /\.gif$/, loader: "url-loader?limit=10000&mimetype=image/gif" },
            { test: /\.jpg$/, loader: "url-loader?limit=10000&mimetype=image/jpg" },
            { test: /\.png$/, loader: "url-loader?limit=10000&mimetype=image/png" },
            { test: /\.svg/, loader: "url-loader?limit=26000&mimetype=image/svg+xml" },
            { test: /\.(woff|woff2|ttf|eot)/, loader: "url-loader?limit=1" },
            { test: /\.json$/, loader: "json-loader"}
        ]
    },
    sassLoader: {
        outputStyle: "compressed"
    }
};