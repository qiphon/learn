const path = require('path');
const nodeExternals = require('webpack-node-externals');
// tabline
module.exports = {
    entry: path.join(__dirname, "../src/web/shared/server-entry.tsx"),
    output: {
        filename: "server-entry.js",
        path: path.join(__dirname, "../dist/"),
        // 这里的配置一定要注意
        libraryTarget: 'commonjs2'
    },
    // 
    target: "node",
    // 
    externals: [nodeExternals()],
    module: {
        rules: [
            {
            test: /\.ts(x)?/,
            use: ['babel-loader']
        },
        {
            test:/\.css$/,
            use:['ignore-loader']
        },
        {
            test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf)$/,
            use:['ignore-loader']
        }
    ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    }
}