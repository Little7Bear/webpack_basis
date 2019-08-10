const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: 'production', //模式 默认两种 production,development

  devServer: {
    port: 8090,
    progress: true,
    contentBase: './dist',
    open: true,
    compress: true
  },

  entry: './src/index.js',

  output: {
    filename: 'index.[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        include: path.resolve('src')
      },

      {
        test: /\.css$/,
        include: path.resolve('src'),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader', options: { importLoaders: 1 }
          },
          'postcss-loader',
        ]
      },

      {
        test: /\.scss$/,
        include: path.resolve('src'),
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader', options: { importLoaders: 1 }
        },
        {
          loader: 'postcss-loader',
        }, {
          loader: "sass-loader",
        }]
      },

      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
            cacheDirectory: true,
          },
        }
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        include: path.resolve('src/img'),
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8 * 1024,
            outputPath: 'img/',
          },

        }, {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            // the webp option will enable WEBP
            webp: {
              quality: 75
            }
          }
        },]
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: path.resolve('src'),
        use: {
          loader: 'file-loader',
          options: {
            limit: 8 * 1024,
            outputPath: 'font/',
          }
        }
      },

      {
        test: /\.html$/,
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
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
      },
      hash: true,
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),

    new CleanWebpackPlugin(),
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  resolve: {
    mainFiles: ['index'],
    modules: [path.resolve('node_modules')],
    extensions: ['.css', '.js', '.json']
  }
};
