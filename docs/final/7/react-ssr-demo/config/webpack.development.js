const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    output: {
        publicPath: '/',
        assetModuleFilename: 'assets/images/[name][ext]',
        filename: 'assets/scripts/[name].bundule.js',
    },
    devServer:{
        historyApiFallback: true,
        contentBase: join(__dirname, '../dist/assets'),
        proxy: {
          '/api': 'http://localhost:3000',
        },
        inline: true,
        hot: true,
        quiet: true,
        port: 8082,
        watchContentBase: true,
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: '京程一灯yd-react-generator',
            filename: 'assets/index.html',
            template: resolve(__dirname, '../src/web/index-dev.html'),
        }),
    ]
}