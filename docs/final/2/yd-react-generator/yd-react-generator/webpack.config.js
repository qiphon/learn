const merge = require('webpack-merge');
const { join, resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const _modeflag = _mode == 'production' ? true : false;
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { library } = require('webpack');
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
/**
 * @type {import('webpack').Configuration}
 */
const webpackBaseConfig = {
  //暂时支持性好不是很良好 HardSourceWebpackPlugin也报错😿
  // cache: {
  //   type: 'filesystem',
  //   // cacheDirectory 默认路径是 node_modules/.cache/webpack
  //   cacheDirectory: resolve(__dirname, '.temp'),
  // },
  entry: {
    app: resolve('src/web/index.tsx'),
  },
  output: {
    path: join(__dirname, './dist/assets'),
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
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: 'commons',
        },
      },
    },
  },
  plugins: [
    // new HardSourceWebpackPlugin(),
    new ProgressBarPlugin(),
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
module.exports = merge(webpackBaseConfig, _mergeConfig);
