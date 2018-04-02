const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname + '/src/draggable-table.vue'),
  output: {
    path: path.resolve(__dirname + '/lib/'),
    filename: 'vue-draggable-table.min.js',
    libraryTarget: 'umd',

    // These options are useful if the user wants to load the module with AMD
    library: 'vue-draggable-table',
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
