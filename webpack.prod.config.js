const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require('webpack')
const common = require('./webpack.config.js')

const prod = {
    devtool: 'none', //for chrome devtools

    watch: false, //watch project folder

    plugins: [
        new ExtractTextPlugin({
            filename: 'css/bundle.css'
        }),
        new HtmlWebpackPlugin({
            template: "app/index.html"
        }),
        new webpack.DefinePlugin({ // <-- key to reducing React's size
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin(), //minify everything
        new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
    ]
}

module.exports = merge([common, prod])