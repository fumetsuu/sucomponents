const path = require('path')

module.exports = {
    entry: './src/index.js', 

    output: { //location and filename for bundled js
        path: path.join(__dirname, '/build'),
        publicPath: 'build/',
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['react']
                }
            },
            {
                test: /\.sass$/,
                use: ["style-loader", "css-loader", "sass-loader"]
              },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                query: {
                    name: 'img/[name].[ext]'
                }
            }
        ]
    },
    externals: {
        'react': 'commonjs react'
    }
}