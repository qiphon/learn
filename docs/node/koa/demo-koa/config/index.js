const {extend} = require('lodash')
const path = require('path')
let config = {
    port: 3000,
    viewDir: path.join(__dirname, '..','views'),
    staticDir: path.join(__dirname, '..', 'public'),
    isProd: process.env.NODE_ENV !== 'development',
}

if(config.isProd){
    const devConf = {
        port: 80,
    }
    config = extend(config, devConf)
}

module.exports = config