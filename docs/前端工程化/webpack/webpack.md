# webpack

### 模块化

> 模块化： 是一种将系统分离成独立功能 部分的方法，严格定义 模块接口 、模块间具有 透明 性

- 模块化的发展：

  - 无模块化时代

    ```js
    function a() {}
    function b() {}
    ```

  - 模块化萌芽

    ```js
    // IIFE
    ;(function (w) {
      w.jQuery = w.$ = jQuery
    })(window)
    ```

  - 模块化时代

    - Commonjs
    - RequireJS(AMD)/SeaJS(cmd)

      ```js
      // CMD
      define(function (require, exports, module) {
        var a = require('./a')
        a.doSomething()
        // 此处略去 100 行
        var b = require('./b')
        // 依赖可以就近书写
        b.doSomething()
        // ...
      })
      // AMD 默认推荐的是
      define(['./a', './b'], function (a, b) {
        // 依赖必须一开始就写好
        a.doSomething()
        // 此处略去 100 行  ...
        b.doSomething()
      })
      ```

    - ES6 Module

### 主要配置

- entry 配置资源入口
- output 配置编译之后的资源
- module 资源处理
- resolve 配置资源别名/扩展名
- plugins 插件， 比loader 更强大

### 配置babel

> webpack 默认以 `/src/index.js` 作为默认的配置文件

babel 目前提供了 `@babel/preset-env` 简化了babel 的配置过程。https://babeljs.io/docs/en/next/babel-preset-env.html

### package.json 知识点

- test/pretest

  ```json
  {
      "name": "demo",
      "version": "1.0.0",
      "main": "index.js",
      "license": "MIT",
      "devDependencies": {
          "npm-run-all": "^4.1.5"
      },
      "scripts": {
          "test": "echo 111",
          "pretest": "echo 222",
          "build":"echo 333",
          "start": "echo 444",
          "parallel": "npm run start & npm run build",
          "serial": "npm run start && npm run build",
          "runall": "npm-run-all start build",
          "runall:parallel": "npm-run-all --parallel start build",
          "getpkgname": "echo $npm_package_name"
      }
  }

  # 执行 npm run test 输出
  # 222
  # 111

  # 执行 npm run serial (命令串行) 输出
  # 444
  # 333

  # 执行 npm run parallel (命令并行) 输出
  # 444
  # 333
  # 也有可能是先输出 333 后输出 444

  # 同样的，并行和串行可以使用 npm-run-all 这个包来实现

  ```

- npm run env 可以拿到所有的package.json 中的内容

  ```json
  # 拿到包名
  "getpkgname": "echo $npm_package_name"

  ```

- scripty 包的使用

  ```json
  {
      "name": "demo",
      "version": "1.0.0",
      "main": "index.js",
      "license": "MIT",
      "devDependencies": {
          "npm-run-all": "^4.1.5",
          "scripty": "^2.0.0"
      },
      "scripts": {
          "build:dev": "scripty",
          "build:prod": "scripty",
          "build:serve": "scripty",
          "start": "echo 111"
      }
  }
  # 项目的目录结构变成下面这个样子
  |---package.json
  |
  |---scripts
  |     |
  |     |--- build
  |     |     |
  |     |     |--- dev.sh
  |     |     |
  |     |     |--- prod.sh
  |     |     |
  |     |     |--- serve.sh
  |     |
  |     |
  |
  |
  # 现在运行命令 npm run build:serve 就会执行 /scripts/build/serve.sh (里面写的内容是 yarn start)
  # 输出结果 111

  ```

### webpack 基本使用

- 下载 webpack webpack-cli @babel/preset-env
- 配置

### webpack 开发中的优化

### webpack 技术内幕

- 入口文件

- module

#### plugin

可以在 webpack 运行到某一个时刻时，做出相应的动作

#### loader

对于特定文件，告诉 webpack 如何处理

### 核心总结

- 文件指纹区别

### AST

- loader 执行顺序是从后往前的

  - markdown-loader 真正的东西只有 index.js

    ```js
    'use strict'

    const loadUtils = require('loader-utils')
    ```

## 执行编译命令传递变量

```package.json
{
    "scripts": {
        "build": webpack --env.buildEnv=aaa
    }
}
```

```webpack.config.js

module.exports = (env)=> {
    if(env && env.buildEnv === 'aaa') {
        // aaa env
        merge(commonConfig, aaaConfig)
    }else{
        // other env
        merge(commonConfig, devConfig)
    }
}

```
