'use strict';
var webpack = require('webpack');
var path = require('path');

var config = {
  context: __dirname + '/src', // `__dirname` is root of project and `src` is source
  entry: {
    app: './app.js',
  },
  output: {
    path: __dirname + '/dist', // `dist` is the destination
    filename: '[name].js',
    publicPath: "/assets",
  },
  resolve: {
    extensions: ['.js', '.css'],
    alias: {
      bootstrap: path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/, //Check for all js files
        loader: 'babel-loader',
        query: {
          presets: [ "babel-preset-es2015" ].map(require.resolve)
        }
      },
      {
        test: /\.(sass|scss)$/, //Check for sass or scss file names
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      { test: /\.(eot|svg|woff|woff2|ttf|gif|png)$/, loader: 'file-loader' },
      { test: /\.json$/, loader: "json-loader" }
    ]
  },

  //To run development server
  devServer: {
    contentBase: __dirname + '/src',
    compress: true,
    open: true,
    watchContentBase: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js',
      jQuery: 'jquery',
      $: 'jquery',
    }),
  ],
  devtool: "eval-source-map" // Default development sourcemap
};

// Check if build is running in production mode, then change the sourcemap type
if (process.env.NODE_ENV === "production") {
  config.devtool = "source-map";

  // Can do more here
  // JSUglify plugin
  // Offline plugin
  // Bundle styles seperatly using plugins etc,
}

module.exports = config;
