'use strict';

// modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// environment setup
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig () {

  var config = {};

  config.entry = isTest ? {} : {
    app: './src/app/app.js'
  };

  config.output = isTest ? {} : {
    path: __dirname + '/dist',
    publicPath: isProd ? 'http://www.sagarvashishta.com/eaze-hub/' : 'http://localhost:8080/',
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  };

  config.module = {
    preLoaders: [],
    loaders: [{
      // js loader
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      // css loader
      test: /\.css$/,
      loader: isTest ? 'null' : ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader')
    }, {
      // assets
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file'
    }, {
      // html
      test: /\.html$/,
      loader: 'raw'
    }]
  };

  // post css
  config.postcss = [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ];

  // plugins
  config.plugins = [];

  // skip rendering index.html in test mode
  if (!isTest) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        inject: 'body'
      }),
      new ExtractTextPlugin('[name].[hash].css', {disable: !isProd})
    )
  }

  // add build specific plugins
  if (isProd) {
    config.plugins.push(
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        mangle: false
      }),

      // copy assets from the public folder
      new CopyWebpackPlugin([{
        from: __dirname + '/src/public'
      }])
    )
  }

  // dev server config
  config.devServer = {
    contentBase: './src/public',
    stats: 'minimal'
  };

  return config;
}();
