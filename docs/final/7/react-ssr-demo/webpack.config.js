const merge = require('webpack-merge');
const {
    join,
    resolve
} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const _modeflag = _mode == 'production' ? true : false;
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
        path: join(__dirname, './dist'),
    },
    module: {
        rules: [{
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
        ]
    },
    externals: {
        react: 'React',
        'react-router-dom': 'ReactRouterDOM',
        "mobx-react-lite": "mobx-react-lite"
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
        // 告诉 webpack 解析模块时应该搜索的目录。
        modules: ['node_modules', resolve('src')],
        extensions: ['.js', '.ts', '.tsx', 'jsx'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: _modeflag ?
                'assets/styles/[name].[contenthash:5].css' :
                'assets/styles/[name].css',
            chunkFilename: _modeflag ?
                'assets/styles/[id].[contenthash:5].css' :
                'assets/styles/[id].css',
            allChunks: true,
            ignoreOrder: true,
        }),
    ]
}
module.exports = merge.default(webpackBaseConfig, _mergeConfig);