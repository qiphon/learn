# 常见问题解决方式

在使用 Taro 进行多端开发中，请保持 Taro CLI 的版本与你项目的依赖版本一致，否则可能会出现编译错误或者运行时错误。

如果发现不一致的情况可以使用 Taro 升级命令 taro update self [版本号] 和 taro update project [版本号]来分别将 CLI 和项目依赖升级到指定版本； 或者也可以手动安装相应版本 CLI，修改 package.json 依赖版本号，然后重装依赖来解决。

```sh 
# 使用Taro 升级命令更新CLI版本到最新版本
$ taro update self
# 使用Taro 升级命令更新CLI版本到指定版本
$ taro update self [版本号]
# 使用Taro 升级命令将项目依赖升级到与@tarojs/cli一致的版本
$ taro update project
# 使用Taro 升级命令将项目依赖升级到指定版本
$ taro update project [版本号]
```

官方社区 https://github.com/NervJS/taro/discussions

以后可能更新在 https://qiphon.blog.csdn.net

### prerender 

```ts
// config/prod.js
const config = {
  ...
  mini: {
    prerender: {
      include: ['pages/nodes/nodes'], // `pages/nodes/nodes` 也会参与 prerender
    }
  }
};

// 我们这里在编译生产模式时才开启预渲染
// 如果需要开发时也开启，那就把配置放在 `config/index` 或 `config/dev`
module.exports = config
```

### 打包体积

在 Taro 应用中，所有 Java(Type)Script 都是通过 babel.config.js 配置的，具体来说是使用 babel-prest-taro 这个 Babel 插件编译的。

默认而言 Taro 会兼容所有 @babel/preset-env 支持的语法，并兼容到 iOS 9 和 Android 5，如果你不需要那么高的兼容性，或者不需要某些 ES2015+ 语法支持，可以自行配置 babel.config.js 达到缩小打包体积效果。

例如我们可以把兼容性提升到 iOS 12：

```js
// babel.config.js
module.exports = {
  presets: [
    [
      'taro',
      {
        targets: {
          ios: '12',
        },
      },
    ],
  ],
}
```
打包体积分析

Taro 使用 Webpack 作为内部的打包系统，有时候当我们的业务代码使用了 require 语法或者 import default 语法，Webpack 并不能给我们提供 tree-shaking 的效果。在这样的情况下我们通过 webpack-bundle-analyzer 来分析我们依赖打包体积，这个插件会在浏览器打开一个可视化的图表页面告诉我们引用各个包的体积。

```js 

// mini.webpackChain 
const config = {
  ...
  mini: {
    webpackChain (chain, webpack) {
      chain.plugin('analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
    }
  }
}
```

### 分包

```js 
// src/app.config.js
export default {
  pages: [
    'pages/index/index',
    // 'pages/nodes/nodes', 把要分包的页面从 `pages` 字段中删除
    'pages/hot/hot',
    'pages/node_detail/node_detail',
    'pages/thread_detail/thread_detail'
  ],
  // 在 `subpackages` 字段添加分包，如果目标是支付宝小程序，还需要加一个字段 `subPackages` 值和 `subpackages` 一致
  // 不能在 `pages` 根目录也不能在 pages 目录外，需要在 `pages` 根目录另外新建文件夹做分包
  "subpackages": [
    {
      "root": "pages",
      "pages": [
        "nodes/nodes"
      ]
    }
  ]
  . . .
```

### [自定义编译](https://docs.taro.zone/docs/guide/#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BC%96%E8%AF%91)

### [跨平台开发](https://docs.taro.zone/docs/envs/) 

```diff
- import api from '../../utils/api'
// 我们可以根据不同的平台，引入不同的 API
+ let api
+ if (process.env.TARO_ENV === 'weapp') {
+  api = require('../../utils/api-weapp')
+ } else if (process.env.TARO_ENV === 'h5') {
+  api = require('../../utils/api-h5')
+ }
```
Taro 还提供了统一接口的多端文件，通过不同的命名方式寻找依赖，在这类情况下，我们可以保留：

语句原封不动，修改我们的文件结构，在文件名和后缀名之间加上平台的名字：

```
.
└── utils
    ├── api.h5.js
    ├── api.weapp.js
    └── index.js
```

### 使用原生小程序组件 

然后使用 towxml 组件，这里必须记住的是不管是 React 还是 Vue，原生小程序组件声明需要是小写的

一旦使用了原生小程序组件，Taro 应用就失去了跨端的能力。!!!

```js
export default {
  usingComponents: {
    towxml: '../../towxml/towxml',
  },
}
```
```diff
// usage 

- <View dangerouslySetInnerHTML={{ __html: reply.content }} className='content'></View>
+ <towxml nodes="{{reply.content}}" />
```