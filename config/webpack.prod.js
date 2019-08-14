const path = require("path");
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',

  module: {
    rules: [{
      test: /\.(css|scss|sass)$/,
      include: path.resolve(__dirname,'../src'),
      use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
        }, {
          loader: "sass-loader",
        }
      ]
    }, ]
  },

  plugins: [
    // new UglifyJSPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
    }),
  ],

  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
});