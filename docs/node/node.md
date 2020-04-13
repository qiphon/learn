# nodejs

- 什么是nodejs

    - nodejs本质是一个 js 解析器
    - nodejs 是 js 的运行环境
    - nodejs 是 服务器程序
    - nodejs 本身使用的是 V8 引擎
    - node 不是 web 服务器

- 为什么使用nodejs
    - 为了提供高性能web服务
    - io性能强大
    - 事件处理机制完善
    - 天然能够处理dom
    - 社区活跃，生态圈日趋完善

- 优势
    - 处理大流量数据
    - 适合实时交互应用
    - 完美支持对象数据库
    - 异步处理大量并发连接

- 学习node需要的前置知识
    - js es6+
    - 服务器相关知识
    - 最好在Linux下开发

- 相关资源
    - nodejs.org
    - nodejs.cn
    - github.com

- 安装

官网下载对应版本

`node -v` 查看版本号

    - npm nodejs包管理工具  npmjs.com
        - 允许用户下载第三方包
        - 下载别人编写的命令行程序
        - 可以上传自己的代码包
        - 淘宝 cnpm   `npm i cnpm -g` 如果包下载不下来，可以使用cnpm
        - npm -v  查看版本
        - 直接输入 npm 会显示所有的npm 命令
        - npm 装包

            ```sh
            # -g 全局安装
            npm i express -g 
            # 卸载
            npm uninstall express -g
            # 查找包
            npm search express
            # 查看指定命令的详细信息
            npm help install

            ```

- 写一个helloworld

```js
// hello.js
console.log('hello world')

// 执行
node ./hello.js

```

- 写一个nodejs 服务

```js
// server.js
var http = require('http')

http.createServer(function(req, res){
    // 定义返回头
    res.writeHead(200, {
        "Content-Type": 'text/plain'
    })
    // 发送相应数据
    res.end('hello world\n')
})
.listen(3000)

// 服务运行成功提示
console.log('server is running...')

// 运行服务
node server.js

```

- repl 环境

在终端中输入 node 就进入到了nodejs 的 repl 环境。这里可以执行一些简单的任务

```sh
node

var x = 10 
var y = 5
x+ y

# 退出命令 ctrl + c
# 上下箭头 切换之前输入的命令
# .exit 退出
# .help 查看帮助
# .break 退出多行表达式
# .clear 退出多行表达式
# .save filename  保存当前的 node repl 回话到文件
# .load filename  载入文件到当前会话

```

-  什么是回调

    - 函数的调用方式： 同步调用，回调，异步调用
    - 回调是一种双向调用模式
    - 可以通过回调函数来实现回调
- 阻塞 与 非阻塞
    - 阻塞与非阻塞关注的是程序在等待调用结果（消息，返回值）时的状态
    - 阻塞就是做不完不会做其他事
    - 非阻塞就是一个任务正在做，当另一个任务到的时候，不会等待上一个任务做完在做下一个

    ```js
    // 阻塞式代码
    var fs = require('fs')

    var data = fs.readFileSync('server.js')

    console.log(data.toString())
    console.log('file read finish')

    // 非阻塞代码
    fs.readFile('server.js', (err, data)=>{
        if(!err){
            console.log(data.toString())
        }
    })
    console.log('我会在文件读取前打印')

    ```

- nodejs 事件驱动机制

    - 事件驱动模型 ![事件处理模型](../imgs/node-event.png)
        - eventEmitters -> event -> event loop -> event Handlers

        ```js
        // 事件处理代码

        // 引入event 模块创建事件对象
        var events = require('events')
        var eventEmitter = new events.EventEmitter()
        // 绑定事件函数
        var connectHandler = function () {
            console.log('connect事件被调用')
        }
        eventEmitter.on('connect', connectHandler)
        // 触发事件
        eventEmitter.emit('connect')

        console.log('程序执行完毕')

        ```
- nodejs 模块化
    - 模块化的概念和意义
        - 为了让 nodejs 的文件可以相互调用，nodejs 提供了一个简单的模块系统
        - 模块是 nodejs 应用程序的基本组成部分
        - 文件和模块是一一对应的。 一个文件就是一个模块（文件可以是js代码、json、编译过的c/c++ 扩展）
        - nodejs中存在4类模块（原生模块和3种文件模块）

        ```
        // 模块加载流程
        
                        require 请求文件
                                |
                        是否在文件模块缓存区---------|
                                |                 |
                                否                |
                                |                 |
                    --------是否是原生模块          |
                    |           |                 |
                    是          否                是
                    |           |                 |
                    |       查找文件模块            |
                是否在原生模块    |                 |
        ----------缓存区         |                 |
        |           |       根据扩展名载入模块       |
        |           否          |                 |
        |           |        缓存文件模块           |
        |        加载原生模块    |                  |
        |           |          |                  |
        是       缓存原生模块    |                  |
        |           |          |                  |
        |           |----------|                  |        
        |                      |                  |
        |---------------- 返回 exports  -----------           

        ```
    - nodejs 模块加载方式
        - 从文件模块缓存中加载
        - 从原生模块加载
        - 从文件加载
    
    - require 加载方式
        - 原生模块 直接写文件名 http、fs、path
        - 相对路径 引入模块 `require('../js/a.js')`
        - 绝对路径引入（不推荐）
        
        ```js
        // a.js
        function hello (){
            var name;
            this.setName = argname => name = argname;
            this.say = () => console.log(`hello ${name}`)
        }

        module.exports = hello;

        // b.js
        var hello = require('./a.js')

        var hello = new hello()
        hello.setName('yideng')

        hello.say()

        ```
- nodejs 路由
    - 我们要为路由提供请求的 URL 和其他需要的 GET 及 POST 参数，随后路由需要根据这些数据来执行相应的代码。

    - 因此，我们需要查看 HTTP 请求，从中提取出请求的 URL 以及 GET/POST 参数。这一功能应当属于路由还是服务器（甚至作为一个模块自身的功能）确实值得探讨，但这里暂定其为我们的HTTP服务器的功能。

    - 我们需要的所有数据都会包含在 request 对象中，该对象作为 onRequest() 回调函数的第一个参数传递。但是为了解析这些数据，我们需要额外的 Node.JS 模块，它们分别是 url 和 querystring 模块。

    ```
                    url.parse(string).query
                                            |
            url.parse(string).pathname      |
                        |                   |
                        |                   |
                        ------ -------------------
    http://localhost:8888/start?foo=bar&hello=world
                                    ---       -----
                                    |           |
                                    |           |
        querystring.parse(queryString)["foo"]   |
                                                |
                            querystring.parse(queryString)["hello"]

    ```
    现在我们来给 onRequest() 函数加上一些逻辑，用来找出浏览器请求的 URL 路径：

    ```js

    var http = require("http");
    var url = require("url");
    
    function start() {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
    }
    
    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
    }
    
    exports.start = start;
    ```

    - get/post
        - 由于GET请求直接被嵌入在路径中，URL是完整的请求路径，包括了?后面的部分，因此你可以手动解析后面的内容作为GET请求的参数。

        - node.js 中 url 模块中的 parse 函数提供了这个功能。

    ```js
    // get
    var http = require('http');
    var url = require('url');
    var util = require('util');
    
    http.createServer(function(req, res){
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(util.inspect(url.parse(req.url, true)));
    }).listen(3000);

    // 获取 URL中的参数
    var http = require('http');
    var url = require('url');
    var util = require('util');
    
    http.createServer(function(req, res){
        res.writeHead(200, {'Content-Type': 'text/plain'});
    
        // 解析 url 参数
        var params = url.parse(req.url, true).query;
        res.write("网站名：" + params.name);
        res.write("\n");
        res.write("网站 URL：" + params.url);
        res.end();
    
    }).listen(3000);


    // POST 请求的内容全部的都在请求体中，http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作。

    // 比如上传文件，而很多时候我们可能并不需要理会请求体的内容，恶意的POST请求会大大消耗服务器的资源，所以 node.js 默认是不会解析请求体的，当你需要的时候，需要手动来做。
    var http = require('http');
    var querystring = require('querystring');
    
    var postHTML = 
    '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
    '<body>' +
    '<form method="post">' +
    '网站名： <input name="name"><br>' +
    '网站 URL： <input name="url"><br>' +
    '<input type="submit">' +
    '</form>' +
    '</body></html>';
 
    http.createServer(function (req, res) {
    var body = "";
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        // 解析参数
        body = querystring.parse(body);
        // 设置响应头部信息及编码
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    
        if(body.name && body.url) { // 输出提交的数据
            res.write("网站名：" + body.name);
            res.write("<br>");
            res.write("网站 URL：" + body.url);
        } else {  // 输出表单
            res.write(postHTML);
        }
        res.end();
    });
    }).listen(3000);

    ```