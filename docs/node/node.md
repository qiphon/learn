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

    - 事件驱动模型
        - eventEmitters -> event -> event loop -> event Handlers
