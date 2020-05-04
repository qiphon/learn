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

- 基础路由

```js
var express = require('express')
var app = express()

// 基础路由
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})

// 使用正则
app.get(/.*fly$/, function (req, res) {
    res.send('/.*fly$/')
})

// 字段匹配
app.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params)
})

// Route path: /users/: userId / books /: bookId
// Request URL: http://localhost:3000/users/34/books/8989
// req.params: { "userId": "34", "bookId": "8989" }

app.get('/flights/:from-:to', function (req, res) {
    res.send(req.params)
})
// Route path: /flights/:from-:to
// Request URL: http://localhost:3000/flights/LAX-SFO
// req.params: { "from": "LAX", "to": "SFO" }

app.get('/plantae/:genus.:species', function (req, res) {
    res.send(req.params)
})
// Route path: /plantae/:genus.:species
// Request URL: http://localhost:3000/plantae/Prunus.persica
// req.params: { "genus": "Prunus", "species": "persica" }


// 路由处理
app.get('/example/b', function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
}, function (req, res) {
    res.send('Hello from B!')
})
var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
}

var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
}

var cb2 = function (req, res) {
    res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])

// 也可以这样
var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
}

var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
}, function (req, res) {
    res.send('Hello from D!')
})

app.listen(3000)
```

- 请求返回的函数 Response methods

```
Method	                描述Description
res.end()         	    终结响应 End the response process.
res.json()         	    响应json 数据 Send a JSON response.
res.jsonp()         	Send a JSON response with JSONP support.
res.render()         	渲染视图模板 Render a view template.
res.redirect()         	重定向 Redirect a request.
res.send()          	发送各种类型的响应 Send a response of various types.
res.download()         	提示下载文件 Prompt a file to be downloaded.
res.sendFile()         	以8位字节流形式发送文件 Send a file as an octet stream.
res.sendStatus()       	设置响应状态码，并将其以字符串形式作为响应体的一部分
                        Set the response status code and send its string representation as the response body.
```

- 如果对一个路由有多个请求方法处理

```js
// 通常的写法 

app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})
// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})

// 简化的写法
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })

```

- express.router

```js


var express = require('express')
var router = express.Router()

router.use(function timeLog(req, res, next) {
    console.log('Time1: ', Date.now())
    next()
})
// 相当于
router.use('*', function timeLog(req, res, next) {
    console.log('Time2: ', Date.now())
    next()
})
// define the home page route
router.get('/', function (req, res) {
    res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
    res.send('About birds')
})

app.use('/bird' ,router)


```
### 错误处理

express 的错误处理函数放在最后面

```js
    // res.status(500)
    // s
    res.send('123')
    // next(11)
})

// 后置错误处理中间件
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

function logErrors(err, req, res, next) {
    console.log('记录日志', err.stack)
    next(err)
}
function clientErrorHandler(err, req, res, next) {
    console.log('----------------clientErrorHandler=================')
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' })
    } else {
        next(err)
    }
}
function errorHandler(err, req, res, next) {
    console.log('errorHandler===================')
    res.status(500)
    // next(err)
    res.send('something is wrong')
}


app.listen(8081, ()=>{
    console.log('===================server start')
})

```
### 托管静态文件

为了提供诸如图像、CSS 文件和 JavaScript 文件之类的静态文件，请使用 Express 中的 express.static 内置中间件函数。

此函数特征如下：
`express.static(root, [options])`

```js
// 这样静态文件路径就创建了
app.use(express.static('public'))
```

### 模板引擎 [swig](http://node-swig.github.io/swig-templates/docs)

swig 是node端的一个优秀简洁的模板引擎，类似Python模板引擎Jinja，目前不仅在node端较为通用，相对于jade、ejs优秀，而且在浏览器端也可以很好地运行。

- 安装引擎

```js
npm install swig --save

# 配合express 使用
var app = require('express')(),
  swig = require('swig'),
  people;

// This is where all the magic happens!
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!

app.get('/', function (req, res) {
    // 可以传递模板使用的变量
  res.render('index', { /* template locals context */ });
});

app.listen(1337);
console.log('Application Started on http://localhost:1337/');

```
## express cli 使用

- 安装 express

```sh
yarn init -y

yarn add express-generator 

# 创建项目 这样一个项目的目录就被创建出来了
npx express myapp

```

## express 项目创建步骤

- 基础结构搭建
    
    ```js
    const express = require("express")

    const app = express()

    app.get('/', (req, res, next)=>{
        res.end('home')
    })

    app.listen(3000, ()=>{
        console.log('server is start at 3000...')
    })

    ```
- 添加模板引擎 （这里用的 swig）
    
    ```js

    / 设置模板引擎
    const swig = require('swig')
    // 开发时关闭缓存，不然样式改动会看不出来
    swig.setDefaults({ cache: false });
    app.set('view engine', 'html')
    app.engine('html', swig.renderFile)

    ```
- 设置静态资源目录

    ```js

    // 设置静态文件目录
    app.use(express.static('public'))

    ```

- 添加容错处理

    ```js

    /**
    * @fileoverview 未知路由的容错
    */
    app.use('*', (req, res, next)=>{
        res.status(404)
        res.end("<h1>404")
    })

    // 代码错误的容错处理
    app.use([ErrorHandler])

    function ErrorHandler(err, req, res, next){
        res.status(500)
        res.end('server error')
    }
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
- 数据库操作
    - mysql 包
    - orm 包
- 配置文件目录
    
    ```
    |- express app
    |    |
    |    |--- bin  可执行文件目录
    |    |
    |    |--- app.js  入口文件
    |    |
    |    |--- views  模板路径
    |    |
    |    |--- model  数据处理
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