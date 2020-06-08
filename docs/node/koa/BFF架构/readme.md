# koa BFF 架构格式 (backends for frontends)

bff 主要是用于服务前端的后台应用程序，来解决多访问终端业务的耦合问题

> nodejs 学习笔记 -- 一个简单的 MVC 架构,参考 PHP 的 YII 创建

### 目录结构说明

```
|--- app.js  入口文件
|
|--  package.json  项目依赖
|
|-- components  组件目录
|
|-- configs  配置文件目录 
|
|-- controllers  控制器文件
|
|-- logs  日志文件 
|
|-- docs  文档目录
|
|-- middlewares  中间件目录
|
|-- models  数据模型目录
|
|-- libs  存放js 公共类库  
|
|-- scripts  项目命令脚本
|    |
|    |--  build 
|         |
|         |--  dev.sh  开发脚本
|         |
|         |--  prod.sh  生产环境脚本
|    
|    

```

### 组件说明

- koa
- koa-simple-router  一个功能足够的koa路由
- koa-swig  模板引擎 （缓存做的好）
    - co (koa1 使用generator模式，koa2 使用 async、await模式，需要使用 co 模块兼容)
- koa-static koa 静态资源路径配置
- lodash  js 函数式工具库
- koa-history-api-fallback  配置路由重定向
- log4js  一个好用的日志记录工具

- cross-env  一个临时使用的,给项目添加环境变量的env文件
- nodemon  node 的守护进程工具,帮助我们自动重启 node
- scripty  命令行解析工具, 会自动找到scripts 目录下的执行脚本
- jsdoc  自动生成 js 的说明文档
- module-alias  目录别名工具,方便管理目录路径

### ES6 module 的使用

现在的Chrome浏览器已经支持 ES6 module，有了它，我们就不用再依靠babel 了，但是为了兼容那些不支持 ES6 module 的浏览器，
我们还需要借助 systemjs 来处理模块问题

```js
// module.js
const moduleTest = 'this is es6 module test'

export {
    moduleTest
}

// index.js
import('/scripts/module.js').then(res=>{
    console.log(res, 'es6 module test')
})

// Module {Symbol(Symbol.toStringTag): "Module"}
// moduleTest: "this is es6 module test"
// Symbol(Symbol.toStringTag): "Module"
// get moduleTest: ƒ ()
// set moduleTest: ƒ ()

```

在不支持 module 的浏览器中需要使用 babel + syatemjs

```html
<script src="systemjs"></script>
<script>
    // 引入vue之后，再引入上面导出的模块, 这个时候依赖项vue就被传入webpackbundle了
    System.import('/scripts/module-bundle.js').then((res) => {
        console.log(res, 'systemjs')
    })
</script>
```