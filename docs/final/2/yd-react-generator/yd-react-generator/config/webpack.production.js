const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  output: {
    path: join(__dirname, './dist/assets'),
    publicPath: '/assets/',
    assetModuleFilename: 'scripts/[name].[contenthash:5].bundule.[ext]',
    // filename: 'scripts/[name].[contenthash:5].bundule.js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true, // 是否缓存
        parallel: true, // 是否并行打包
        sourceMap: false,
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true,
            },
          },
        ],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      title: '京程一灯CRM系统',
      filename: '../views/index.html',
      template: path.resolve(__dirname, '../src/web/index-prod.html'),
      inject: true,
      minify: {
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
  ],
};
