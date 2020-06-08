const { extend } = require('lodash')
const path = require('path')

let config = {
    isProd: process.env.NODE_ENV === 'production',
    viewDir: path.join(__dirname, '..','views'),
    staticDir: path.join(__dirname, '..','public'),
}
// 生产环境
if(config.isProd){
    let prodConf = {
        port: 80
    }
    config = extend(config, prodConf)
}
// 开发环境
else {
    let devConf = {
        port: 3001
    }
    config = extend(config, devConf)
}

module.exports = config