const moduleAlias = require('module-alias')

// Or multiple aliases
moduleAlias.addAliases({
    "@root": __dirname,
    "@controllers": __dirname + '/controllers',
    "@models": __dirname + '/models',
})

const Koa = require('koa')
const app = new Koa()
const {port, viewDir, isProd, staticDir} = require('./config')

/**
 * 代码容错处理
 */
app.use( async (ctx, next)=>{
    try{
        await next()
    }catch(err){
        // console.log(err.stack, '================')
        ctx.status = 500
        ctx.body = err.stack
    }
})

// 添加 API-fallback 防止刷新404
const { historyApiFallback } = require('koa2-connect-history-api-fallback')
app.use(historyApiFallback({
    index: '/',
    whiteList:['/books', '/booklist']
}))

// 引入路由
require('@controllers/index')(app)
const static = require('koa-static')

app.use(static(staticDir))
// 所有的静态资源都可以放在这里 根目录下的 public 文件夹内
// 使用方法 <link href="/public/index.css" />
// app.use(static(__dirname + 'public'))
const render = require('koa-swig')
const co = require('co')
// 配置模板引擎
app.context.render = co.wrap(render({
    root: viewDir,
    autoescape: true,
    cache: isProd ? 'memory' : false, // disable, set to false
    ext: 'html',
    writeBody: false,
    // varControls: ["[[", "]]"]
}));

// 404 页面
// app.use(async (ctx, next) => {
//     ctx.status = 404
//     ctx.body = '<h1>404'
// })

app.listen(port, _ => {
    console.log(`server start at ${port} ...`)
})