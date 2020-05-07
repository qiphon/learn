# koa

nodejs  web  开发框架    小，扩展性强
nodejs > 7.6  ---> async/await

### 安装koa

- npm init --yes
- npm install koa
- 写一个hello world
    
    ```js
    const Koa = require('koa')
    const app = new Koa()

    // 创建一个中间件
    app.use(async ctx=> {
        ctx.body = 'hello world'
    })

    app.listen('8000')

    ```

### koa 路由

- `npm install koa-router`
- 获取URL中的参数 http://127.0.0.1/123?title=yd&age=4
    - `ctx.request.query` 、 `ctx.query`   返回结果 ` {title: 'yd', age: 4}`
    - `ctx.request.querystring`、 `ctx.querystring` 返回结果 `title=yd&age=4`
    - 动态路由中的参数获取 `ctx.params` 动态路由写法 `router.get('/:id')` 得到结果 `{id: 123}`

    ```js
    const Koa = require('koa')
    const Router = require('koa-router')
    const app = new Koa()
    const router = new Router()
    // 创建一个中间件
    app.use(async ctx=> {
        ctx.body = 'hello world'
    })

    router.get('/:id', async (ctx, next)=>{
        // console.log(ctx.query)   // {title: 'yd', age: 4}
        // console.log(ctx.request.query)  
        // 
        // console.log(ctx.querystring)  // title=yd&age=4
        // console.log(ctx.request.querystring)
        ctx.body = 'home'
    })

    router.get('/about', (ctx, next)=>{
        ctx.body = 'about'
    })

    app
        .use(router.routes())
        .use(router.allowedMethods())

    app.listen('8000')

    ```
   
### koa 中间件与模板渲染

- 洋葱模型，通过 compose 来实现的
    - 操作先进后出，通过 next() 来实现
    - 有提前结束的机制

```js
const Koa = require('koa') 
const app = new Koa()

// 中间件1
const m1 = async (ctx, next)=>{
    console.log(1)
    await next()
    console.log(6)
}
// 中间件2
const m2 = async (ctx, next)=>{
    console.log(2)
    await next()
    console.log(5)
}
// 中间件3
const m3 = async (ctx, next)=>{
    console.log(3)
    await next()
    console.log(4)
}

app.use(m1)
app.use(m2)
app.use(m3)

app.listen(3000)

// 1,2,3,4,5,6

```

- 中间件类型
    - 应用级中间件(所有中间件中首先触发的)    如 vue 中全局导航守卫
    - 路由级中间件    独享路由守卫
    - 错误处理中间件  错误处理，错误兜底(通过应用级中间件实现)
    - 第三方中间件    koa-bodyparser
    
    ```js
    const Koa = require('koa')
    const Router = require('koa-router')
    const app = new Koa()
    const router = new Router()

    // 创建一个中间件
    app.use(async (ctx, next)=> {
        console.log('应用级中间件')
        await next()
        // 可以在这里进行错误拦截
        if(ctx.status >= 400){
            // 当访问一个没有的路由，就会在这里被接收
            ctx.body = "错误页面"
        }
    })

    router.get('/:id', async (ctx, next)=>{
        console.log('路由级中间件1')
        await next()
    })
    router.get('/:id', async (ctx, next)=>{
        console.log('路由级中间件')
        ctx.body = 'home'
    })

    app
        .use(router.routes())
        .use(router.allowedMethods())

    app.listen('8000')

    // 应用级中间件
    // 路由级中间件1
    // 路由级中间件
    ```
- koa-bodyparser 处理POST 请求

    ```js

    const Koa = require('koa')
    const Router = require('koa-router')
    var bodyParser = require('koa-bodyparser')
    const app = new Koa()
    const router = new Router()

    app.use(bodyParser())
    router.post('/save', (ctx, next)=>{
        let data = ctx.request.body
        ctx.body = data
    })

    router.get('/:id', async (ctx, next)=>{
        console.log('路由级中间件1')
        await next()
    })

    app
        .use(router.routes())
        .use(router.allowedMethods())

    app.listen('8000')
    ```
- koa-static 静态资源处理中间件

    ```js
    const static = require('koa-static')
    // 所有的静态资源都可以放在这里 根目录下的 static 文件夹内
    // 使用方法 <link href="/static/index.css" />
    app.use(static(__dirname + 'static'))
    ```

### 模板渲染引擎

- ejs (ejs.bootcss.com)、koa-views

    ```js
    const Koa = require('koa')
    const Router = require('koa-router')
    const Views = require('koa-views')
    const app = new Koa()
    const router = new Router()

    // 创建模板
    app.use(
        Views("page", {
            map: {html: 'ejs'}
        })
    )

    // 创建一个中间件
    app.use(async (ctx, next)=> {
        console.log('应用级中间件')
        ctx.state.commonData = '我是公共数据，所有的页面都能使用我'
        await next()
        // 可以在这里进行错误拦截
        if(ctx.status >= 400){
            // 当访问一个没有的路由，就会在这里被接收
            ctx.body = "错误页面"
        }
    })

    router.get('/:id', async (ctx, next)=>{
        console.log('路由级中间件1')
        const txt = "一灯"
        await ctx.render("index", {txt})
    })

    app
        .use(router.routes())
        .use(router.allowedMethods())

    app.listen('8000')


    ```
    page/index.html

    ```html
    <!doctype html>
    <p><%= commonData %>
    <p><%= txt %>

    ```

### koa 和 express 的比较

- express 
    - 基于 connect 中间件
    - 封装了路由、视图
    - 一个大而全的框架
    - 使用callback 处理异步
    - 深层次异常无法捕获
    - express老项目、不想配置太多东西 推荐使用

- koa
   - 基于 co 中间件
   - 使用了 async/await （koa2） 、 generator (koa1)
   - 不包含中间件
   - 路由需要配合 koa-router
   - 需要什么功能都要单独引入
   - try / catch 更好的处理异常
   - 新项目、性能要求高推荐使用

## koa 项目搭建

- 基础结构搭建
    
    ```js
    const Koa = require('koa')
    const app = new Koa()
    const router = require('koa-simple-router')

    // app.use(ctx=>{
    //     ctx.body = "hello koa"
    // })

    app.use(router(_ => {
        _.get('/', (ctx, next) => {
            ctx.body = 'home'
        })
        _.get('/abc', (ctx, next) => {
            ctx.body = 'abc'
        })
        _.post('/path', (ctx, next) => {

        })
        _.all('*', (ctx, next)=>{
            ctx.body= 404
        })
    }))



    app.listen(3000, _ => {
        console.log('server start at 3000...')
    })

    ```

- 配置路径别名 module-alias

    ```js
    const moduleAlias = require('module-alias')
 
    // Or multiple aliases
    moduleAlias.addAliases({
        "@root": __dirname, 
        "@controllers": __dirname + '/controllers', 
        "@models": __dirname + '/models', 
    })

    ```
    配置别名之后 vscode 就不能使用跳转了，vscode 官网提供了一个办法 [jsconfig.json](https://code.visualstudio.com/docs/languages/jsconfig#_jsconfig-options)

- 添加模板引擎 （这里用的 swig）
    
    ```js

    const render = require('koa-swig')
    const co = require('co')
    app.context.render = co.wrap(render({
        root: viewDir,
        autoescape: true,
        cache: isProd ? 'memory' : false, // disable, set to false
        ext: 'html',
        writeBody: false,
        // varControls: ["[[", "]]"]
    }));

    // 使用
    ctx.body = await ctx.render('index')

    ```
- 设置静态资源目录

    ```js

    const static = require('koa-static')
    // 所有的静态资源都可以放在这里 根目录下的 public 文件夹内
    // 使用方法 <link href="/public/index.css" />
    app.use(static(__dirname + 'public'))

    ```

- 添加容错处理

    ```js

    /**
    * @fileoverview 未知路由的容错
    */
    // 404 页面
    app.use(async (ctx, next) => {
        ctx.status = 404
        ctx.body = '<h1>404'
    })

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

    ```

- 处理请求的数据
    - get请求数据在 `req.query`
    - post 请求
        ```js

        // 处理post数据
        var bodyParser = require('body-parser')
        app.use(bodyParser.urlencoded({extende:true}));
        app.use(bodyParser.json())

        // 这个时候数据就在 req.body 里面了
        
        ```
- SPA + MPA 路由实现

    ```js
    // 添加 API-fallback 防止刷新404
    // 这个要写在koa的路由上面
    const { historyApiFallback } = require('koa2-connect-history-api-fallback')
    app.use(historyApiFallback({
        index: '/',
        whiteList:['/books']
    }))

    ```

- 数据库操作
    - mysql 包
    - orm 包

- 生成接口文档

    ```json
    // package.json
    "api:docs": "jsdoc ./**/*.js -d ./docs/jsdoc"

    ```

- 配置文件目录
    
    ```
    |- express app
    |    |
    |    |--- bin  可执行文件目录
    |    |
    |    |--- config  配置文件目录
    |    |
    |    |--- docs  生成文档存放目录
    |    |
    |    |--- logs  日志目录
    |    |
    |    |--- tests  测试文件目录
    |    |
    |    |--- components  组件目录
    |    |
    |    |--- middlewares  中间件目录(错误处理、配置、报告、用户信息)
    |    |
    |    |--- app.js  入口文件
    |    |
    |    |--- views  模板路径
    |    |
    |    |--- model  数据处理
    |    |
    |    |--- controllers  各个路由控制器目录（处理用户请求路径）
    |    |
    |    |--- public  静态资源路径
    |    |    |
    |    |    |--- js
    |    |    |
    |    |    |--- styles
    |    |    |
    |    |    |--- images
    |    |    |
    |    |    |--- others  其他静态文件
    |    |
    |    |--- utils  工具类
    |    |
    |    |--- node_modules  包仓库
    |    |
    |    |--- package.json  配置文件
    |    |
    ```


- 上线部署 

```
nagios cpu 监控


          pm2  ↹  varnish ↹ java
       ↗
nginx                    keepalive (心跳检测)
       ↘
          pm2  ↹  stupid ↹  java ↴
        ↙                         ↓
    CDN                            ↓
    CDN                            ↓
             BACK ↹ WRITE   ↹  DB ↓
                                   ↓
             BACK ↹ READ    ↹  DB ↵

```