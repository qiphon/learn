# express 

Express 是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。
使用 Express 可以快速地搭建一个完整功能的网站。

- Express 框架核心特性：

    - 可以设置中间件来响应 HTTP 请求。

    - 定义了路由表用于执行不同的 HTTP 请求动作。

    - 可以通过向模板传递参数来动态渲染 HTML 页面。

### 开始使用 express

- 安装

```sh
npm init --yes
npm install express --save

```
- 简单使用 

为了学习时修改代码能实时自动更新，我们可以安装 supervisor (`npm i supervisor -g`)

```js
// 创建 app.js
var express = require('express')
var app = express()

// app.use 引入中间件
// app.router  路由
// app.listen  监听端口
// app.get     匹配用户路由

app.get('/', (req, res)=>{
    res.send('hello express')
})

app.listen(8080, ()=>{
    console.log('server is running on 8080')
})


```

- request 和 response 对象的具体介绍：

Request 对象 - request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性。常见属性有：

    - req.app：当callback为外部文件时，用req.app访问express的实例
    - req.baseUrl：获取路由当前安装的URL路径
    - req.body / req.cookies：获得「请求主体」/ Cookies
    - req.fresh / req.stale：判断请求是否还「新鲜」
    - req.hostname / req.ip：获取主机名和IP地址
    - req.originalUrl：获取原始请求URL
    - req.params：获取路由的parameters
    - req.path：获取请求路径
    - req.protocol：获取协议类型
    - req.query：获取URL的查询参数串
    - req.route：获取当前匹配的路由
    - req.subdomains：获取子域名
    - req.accepts()：检查可接受的请求的文档类型
    - req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码
    - req.get()：获取指定的HTTP请求头
    - req.is()：判断请求头Content-Type的MIME类型
    
Response 对象 - response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。常见属性有：

    - res.app：同req.app一样
    - res.append()：追加指定HTTP头
    - res.set()在res.append()后将重置之前设置的头
    - res.cookie(name，value [，option])：设置Cookie
    - opition: domain / expires / httpOnly / maxAge / path / secure / signed
    - res.clearCookie()：清除Cookie
    - res.download()：传送指定路径的文件
    - res.get()：返回指定的HTTP头
    - res.json()：传送JSON响应
    - res.jsonp()：传送JSONP响应
    - res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
    - res.redirect()：设置响应的Location HTTP头，并且设置状态码302
    - res.render(view,[locals],callback)：渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。
    - res.send()：传送HTTP响应
    - res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
    - res.set()：设置HTTP头，传入object可以一次设置多个头
    - res.status()：设置HTTP状态码
    - res.type()：设置Content-Type的MIME类型

- `express.static` 设置静态文件路径

Express 提供了内置的中间件 express.static 来设置静态文件如：图片， CSS, JavaScript 等。

你可以使用 express.static 中间件来设置静态文件路径。例如，如果你将图片， CSS, JavaScript 文件放在 public 目录下，你可以这么写：

```js
app.use('/public', express.static('public'));

// 之后静态文件引入 <link href="/css/1.css">

```

- body-parser 处理POST请求

```js
const express = require("express")
const bodyParser = require('body-parser')

const app = express()

let urlencodedParser = bodyParser.urlencoded({
    extended: false
})

// 处理静态路径
app.use(express.static("public"))

app.get('/index', (req, res)=>{
    res.sendFile(__dirname + '/views/' + "index.html")
    
})

app.post('/index', (req, res)=>{
    console.log(req.body)
    res.redirect("http://www.baidu.com")
})

app.listen(8080, ()=>{
    console.log('server is start')
})

```

### express 中间件（从一端到另一端需要经过的插件）

如果当前中间件没有终结请求，响应循环，那么就必须调用 next() 方法，将控制权交给下一个中间件，否则请求会被挂起

- express 中间件的类型 
    - 应用级中间件

        ```js
        // 此示例显示没有安装路径的中间件函数。应用程序每次收到请求时执行该函数。
        var app = express();

        app.use(function (req, res, next) {
        console.log('Time:', Date.now());
        next();
        });

        // 此示例显示安装在 /user/:id 路径中的中间件函数。在 /user/:id 路径中为任何类型的 HTTP 请求执行此函数。
        app.use('/user/:id', function (req, res, next) {
            console.log('Request Type:', req.method);
            next();
        });

        // 此示例显示一个路由及其处理程序函数（中间件系统）。此函数处理针对 /user/:id 路径的 GET 请求。
        app.get('/user/:id', function (req, res, next) {
            res.send('USER');
        });

        // 以下是在安装点使用安装路径装入一系列中间件函数的示例。 它演示一个中间件子堆栈，用于显示针对 /user/:id 路径的任何类型 HTTP 请求的信息。
        app.use('/user/:id', function(req, res, next) {
        console.log('Request URL:', req.originalUrl);
            next();
        }, function (req, res, next) {
            console.log('Request Type:', req.method);
            next();
        });

        ```

    - 路由级中间件

        ```js
        var app = express();
        var router = express.Router();

        // a middleware function with no mount path. This code is executed for every request to the router
        router.use(function (req, res, next) {
            console.log('Time:', Date.now());
            next();
        });

        // a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
        router.use('/user/:id', function(req, res, next) {
            console.log('Request URL:', req.originalUrl);
            next();
        }, function (req, res, next) {
            console.log('Request Type:', req.method);
            next();
        });

        // a middleware sub-stack that handles GET requests to the /user/:id path
        router.get('/user/:id', function (req, res, next) {
            // if the user ID is 0, skip to the next router
            if (req.params.id == 0) next('route');
            // otherwise pass control to the next middleware function in this stack
            else next(); //
        }, function (req, res, next) {
            // render a regular page
            res.render('regular');
        });

        // handler for the /user/:id path, which renders a special page
        router.get('/user/:id', function (req, res, next) {
            console.log(req.params.id);
            res.render('special');
        });

        // mount the router on the app
        app.use('/', router);
                            

        ```

    - 错误处理中间件

        ```js
        app.get('/', ()=>{
            // 这里的错误会被下面拦截
            conssssole.log(11)
        })
        app.use(function(err, req, res, next) {
            console.error(err.stack);
            res.status(500).send('Something broke!');
        });

        ```

    - 内置中间件

        ```js
        // 中间件的使用
        const express = require("express")

        const app = express()

        // 处理静态路径
        // 内置中间件
        app.use(express.static("public"))

        app.get('/index', (req, res, next)=>{
            // res.sendFile(__dirname + '/views/' + "index.html")
            req.data = 123
            next()
        }, (req, res, next)=>{
            console.log(req.data)
            res.send('hello middleware')
        })


        app.listen(8080, ()=>{
            console.log('server is start')
        })

        ```

    - 第三方中间件

        ```js
        var express = require('express');
        var app = express();
        var cookieParser = require('cookie-parser');

        // load the cookie-parsing middleware
        app.use(cookieParser());

        ```

### express 路由