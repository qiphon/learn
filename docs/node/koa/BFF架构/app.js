const Koa = require('koa')
const config = require('./config')

const moduleAlias = require('module-alias')
moduleAlias.addAliases({
    "@root": __dirname,
    "@controllers": __dirname + '/controllers',
    "@models": __dirname + '/models',
})

const app = new Koa()
// 注册路由
require('./controllers')(app)

app.listen( config.port, ()=>{
    console.log(`${process.env.NODE_ENV} server is start at ${config.port}`)
})