const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // experiments: {},
  output: {
    webassemblyModuleFilename: '[modulehash:5].wasm',
  },
  module: {
    rules: [
      // {
      //   test: /\.wasm$/,
      //   type: 'webassembly/experimental',
      // },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/assets/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
};
