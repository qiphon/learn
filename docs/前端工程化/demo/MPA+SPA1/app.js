const Koa = require('koa')
const config = require('./config')
const co = require('co')
const render = require('koa-swig');
const staticMid = require('koa-static')
const historyApiFallback = require('koa-history-api-fallback')

const moduleAlias = require('module-alias')
moduleAlias.addAliases({
    "@root": __dirname,
    "@controllers": __dirname + '/controllers',
    "@models": __dirname + '/models',
})

const app = new Koa()
app.use(staticMid(config.staticDir))
app.use(historyApiFallback({
    rewrites: [
        {
            from: /^\/(books|home)\/.*$/,
            to: function (context) {
                return context.parsedUrl.pathname;
            }
        },
        {
            from: /^.*$/,
            to: '/'
        },
    ]
}))
// 注册路由
require('@controllers')(app)

// Register swig
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: config.isProd ? 'memory' : false, // disable, set to false
    ext: 'html',
    writeBody: false,
    varControls: ["[[", "]]"],
    // locals: locals,
    // filters: filters,
    // tags: tags,
    // extensions: extensions
}));


app.listen(config.port, () => {
    console.log(`${process.env.NODE_ENV} server is start at ${config.port}`)
})