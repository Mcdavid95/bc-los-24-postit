const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: debug ? 'inline-sourcemap' : true,
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'client/index.jsx')
  ],

  module: {
    loaders: [
      { test: /\.(css|scss)$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(js|jsx)$/, include: path.join(__dirname, 'client'), loader: 'babel-loader', query: { presets: ['es2015', 'react'] } },
      // { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
    ]
  },

  watch: true,

  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'client')
  },

  output: {
    path: `${__dirname}/client/dist/`,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Hammer: 'hammerjs/hammer'
    }),
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  resolve: {
    // you can now require("file") instead of require("file.coffee")
    extensions: ['.js', '.json', '.jsx']
  },

  node: {
    net: 'empty',
    dns: 'empty'
  }

};
