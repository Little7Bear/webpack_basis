const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: 'development',

  devtool: 'source-map',

  module: {
		rules: [
			{
        test: /\.(css|scss|sass)$/,
        include: path.resolve(__dirname,'../src/css'),
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
		]
	},

  devServer: {
    port: 8090,
    progress: true,
    contentBase: path.resolve(__dirname, '../dist'),
    open: false,
    compress: true,
    overlay: {
      warnings: true,
      errors: true
    },
  },


});