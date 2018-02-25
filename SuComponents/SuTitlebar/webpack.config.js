const path = require('path')
const webpack = require('webpack')

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
        'react': 'commonjs react',
        'prop-types': 'commonjs prop-types'
    },
    plugins: [
        new webpack.DefinePlugin({ // <-- key to reducing React's size
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin(), //minify everything
      new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
    ]
}