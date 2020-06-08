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

- cross-env  一个临时使用的,给项目添加环境变量的env文件
- nodemon  node 的守护进程工具,帮助我们自动重启 node
- scripty  命令行解析工具, 会自动找到scripts 目录下的执行脚本
- jsdoc  自动生成 js 的说明文档
- module-alias  目录别名工具,方便管理目录路径