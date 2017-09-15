const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  context: path.join(__dirname, '\\frontend'),

  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],

  output: {
    path: path.join(__dirname, '/public/assets/js'),
    publicPath: '/assets/js/',
    filename: '[name].js'
  },

  watch: NODE_ENV === 'development',

  watchOptions: {
    aggregateTimeout: 100
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devtool: NODE_ENV === 'development' ? 'eval' : false,

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['react-hot-loader', 'babel-loader'],
      include: path.join(__dirname, 'frontend')
    }]
  }
};

if (NODE_ENV === 'production') {
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true,
      unsafe: true
    }
  }));
}
