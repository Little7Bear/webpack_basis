const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),

  output: {
    filename: 'js/index.[hash].js',
    path: path.resolve(__dirname, '../dist'),
  },

  module: {
    rules: [{
        test: /\.m?js$/,
        include: path.resolve(__dirname, '../src'),
        use: {
          loader: 'babel-loader'
        }
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        include: path.resolve(__dirname, '../src/img'),
        use: [{
          loader: 'url-loader',
          options: {
            limit: 12 * 1024,
            outputPath: 'img/',
          },

        }, {
          loader: 'image-webpack-loader',
          options: {
            disable: true,
          }
        }, ]
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: path.resolve(__dirname, '../src/font'),
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'font/',
          }
        }
      },

      {
        test: /\.html$/,
        include: path.resolve(__dirname, '../src'),
        use: {
          loader: 'html-withimg-loader',
          options: {
            outputPath: 'img/',
          }
        }
      },

    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
      },
      hash: true,
    }),

    new CleanWebpackPlugin(),
  ],

  resolve: {
    modules: [path.resolve(__dirname, '../node_modules')],
    extensions: ['.css', '.js', '.json']
  }
};