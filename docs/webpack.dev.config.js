const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'src/www');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  // Entry point to the project
  entry: [
    'webpack/hot/only-dev-server',
    './node_modules/babel-polyfill/lib/index.js',
    path.resolve(__dirname, 'src/app/app.js')
  ],
  // Webpack config options on how to obtain modules
  resolve: {
    // When requiring, you don't need to add these extensions
    extensions: ['.js', '.jsx', '.md', '.txt'],
    alias: {
      'zenith-ui': path.resolve(__dirname, '../src'),
    },
  },
  // Configuration for dev server
  devServer: {
    contentBase: 'src/www',
    hot: true,
    inline: true,
    port: 3030,
  },
  devtool: 'eval',
  // Output file config
  output: {
    path: buildPath, // Path of output file
    filename: 'app.js', // Name of output file
  },
  plugins: [
    // Allows for sync with browser while developing (like BrowserSync)
    new webpack.HotModuleReplacementPlugin(),
    // Prevent moment from loading all the locales
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CopyWebpackPlugin([
      {from: 'src/www/index.html'},
    ]),
  ],
  module: {
    // Allow loading of non-es
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets:['react']
        },
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader',
        include: path.resolve(__dirname, 'src/app/components/raw-code'),
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
};

module.exports = config;
