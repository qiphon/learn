const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const _modeflag = false;
//公共选项配置区域
let cssLoaders = [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
    },
  },
  {
    loader: 'postcss-loader',
  },
];
const webpackBaseConfig = {
  entry: {
    app: resolve('src/web/index.tsx'),
  },
  output: {
    path: join(__dirname, './dist/assets'),
    publicPath: '/assets/',
    // assetModuleFilename: 'images/[name].[hash:5][ext]',
    assetModuleFilename: 'images/[name].[ext]',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: cssLoaders,
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf)$/,
        type: 'asset',
      },
    ],
  },
  devServer: {
    // historyApiFallback: true,
    // contentBase: 'dist',
    // proxy: {
    //   '/api': 'http://localhost:3000',
    // },
    // hot: true,
    // quiet: true,
    port: 9000,
  },
  externals: {
    react: 'React',
    'react-router-dom': 'ReactRouterDOM',
    // "mobx-react-lite": "mobx-react-lite"
  },
  resolve: {
    alias: {
      '@assets': resolve('src/web/assets'),
      '@components': resolve('src/web/components'),
      '@models': resolve('src/web/models'),
      '@routes': resolve('src/web/routes'),
      '@pages': resolve('src/web/pages'),
      '@utils': resolve('src/web/utils'),
      '@tools': resolve('src/web/tools'),
    },
    modules: ['node_modules', resolve('src')],
    extensions: ['.js', '.ts', '.tsx', 'jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '京程一灯yd-react-generator',
      filename: '../index.html',
      template: resolve(__dirname, './src/web/index-dev.html'),
    }),
    new MiniCssExtractPlugin({
      filename: _modeflag
        ? 'styles/[name].[contenthash:5].css'
        : 'styles/[name].css',
      chunkFilename: _modeflag
        ? 'styles/[name].[contenthash:5].css'
        : 'styles/[name].css',
    }),
  ],
  experiments: {
    asset: true,
  },
};
module.exports = webpackBaseConfig;
