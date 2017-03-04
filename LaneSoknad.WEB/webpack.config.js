var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var SRC_PATH = path.resolve(__dirname, 'src');
var DEST_PATH = path.resolve(__dirname, 'dist');

const sassLoaders = [
  'css-loader',
  'sass-loader?includePaths[]=' + SRC_PATH
]

module.exports = {
    devServer: {
        host:'localhost',
        port: 3000,
        contentBase: './dist',
        historyApiFallback: true
    },
    entry: [
         'bootstrap-loader', './src',
         SRC_PATH + '/index.jsx',
         SRC_PATH + '/sass/main.scss'
    ],
    output: {
        path: DEST_PATH,
        publicPath: 'dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx/,
                include: SRC_PATH,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader:"url"
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
            },
        ]
    },
    plugins: [
      new ExtractTextPlugin('bundle.css'),
      new webpack.ProvidePlugin({
          jQuery: 'jquery'
      }),
      new WebpackNotifierPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
}