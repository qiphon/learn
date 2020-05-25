const { extend } = require('lodash')

let config = {
    isProd: process.env.NODE_ENV === 'production',
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