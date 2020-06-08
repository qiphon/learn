const argv = require('yargs-parser')(process.argv)

const _mode = argv.mode || 'development'
const _mergeConfig = require(`./config/webpack.${_mode}.js`)
const merge = require('webpack-merge')
// console.log(argv)

const webpackConfig = {

}

module.exports = merge(webpackConfig, _mergeConfig)