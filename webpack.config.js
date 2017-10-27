const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: debug ? 'inline-sourcemap' : false,
  // entry point
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
      {
        test: /\.(gif|png|jpg|svg)$/i,
        loaders: [
          'file-loader',
          'image-webpack-loader',
        ],
        // options: {
        //   gifsicle: {
        //     interlaced: false,
        //   },
        //   optipng: {
        //     optimizationLevel: 7,
        //   },
        //   pngquant: {
        //     quality: '65-90',
        //     speed: 4
        //   },
        //   mozjpeg: {
        //     progressive: true,
        //     quality: 65
        //   },
        //   // Specifying webp here will create a WEBP version of your JPG/PNG images
        //   webp: {
        //     quality: 75
        //   }
        // }
      }
    ]
  },

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
    extensions: ['.js', '.json', '.jsx']
  },

  node: {
    net: 'empty',
    dns: 'empty'
  }

};
