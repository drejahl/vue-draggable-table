const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname + './plugin.js'),
  output: {
    path: path.resolve(__dirname + '/dist/'),
    filename: 'vue-bmc.min.js',
    libraryTarget: 'umd',

    // These options are useful if the user wants to load the module with AMD
    library: 'vue-bmc',
    umdNamedDefine: true  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'style!less!css'
      }
    ]
  },
  externals: {

  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin( {
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
};
