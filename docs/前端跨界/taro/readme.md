# taro 初识

Taro 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发 微信 / 京东 / 百度 / 支付宝 / 字节跳动 / QQ / 飞书 小程序 / H5 / RN 等应用。

在 Taro 3 中可以使用完整的 React / Vue / Vue3 / Nerv 

## cli 

下载 `@tarojs/cli`

创建项目命令 `taro init <App Name>`

```sh 
# watch 同时开启压缩
$ set NODE_ENV=production && taro build --type weapp --watch # CMD
$ NODE_ENV=production taro build --type weapp --watch # Bash
```

文件目录结构

```
├── babel.config.js             # Babel 配置
├── .eslintrc.js                # ESLint 配置
├── config                      # 编译配置目录
│   ├── dev.js                  # 开发模式配置
│   ├── index.js                # 默认配置
│   └── prod.js                 # 生产模式配置
├── package.json                # Node.js manifest
├── dist                        # 打包目录
├── project.config.json         # 小程序项目配置
├── src # 源码目录
│   ├── app.config.js           # 全局配置
│   ├── app.css                 # 全局 CSS
│   ├── app.js                  # 入口组件
│   ├── index.html              # H5 入口 HTML
│   └── pages                   # 页面组件
│       └── index
│           ├── index.config.js # 页面配置
│           ├── index.css       # 页面 CSS
│           └── index.jsx       # 页面组件，如果是 Vue 项目，此文件为 index.vue
```

## 重要地址

[api](https://docs.taro.zone/docs/apis/about/desc/)

[组件库](https://docs.taro.zone/docs/components-desc/)

## 开发工具 & 配置

通用配置问题

+ 需要设置关闭 ES6 转 ES5 功能，开启可能报错
+ 需要设置关闭上传代码时样式自动补全，开启可能报错
+ 需要设置关闭代码压缩上传，开启可能报错

判断平台 

```js 
if (process.TARO_ENV === 'iot') {
  // do something
}
```
### H5 默认支持

### [微信](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

#### 企业微信小程序 

Taro v3.1+ 开始支持

使用 Taro 插件能支持编译企业微信小程序，插件文档请看 [Github。](https://github.com/NervJS/taro-plugin-platform-weapp-qy)

使用方式 

- 安装插件 `yarn add @tarojs/plugin-platform-weapp-qy`
- 添加配置 (taro配置插件)

  ```
  config = {
    // ...
    plugins: ['@tarojs/plugin-platform-weapp-qy'],
  }
  ```
- 使用api

  ```js 
  Taro.qy.openUserProfile()
    .then(res => console.log(res))
  ```
  开发者在 global.d.ts 中加入 `/// <reference path="node_modules/@tarojs/plugin-platform-weapp-qy/types/shims-qy.d.ts" />` 即可获得类型提示。

- 编译命令变为 qywx

### [百度](https://smartprogram.baidu.com/docs/develop/devtools/show_sur/)

### [支付宝](https://docs.alipay.com/mini/developer/getting-started/)

### [抖音](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/developer-instrument/download/developer-instrument-update-and-download)

### [QQ](https://q.qq.com/wiki/#_4-%E7%BC%96%E7%A0%81%E5%BC%80%E5%8F%91%E5%B0%8F%E7%A8%8B%E5%BA%8F)

### [京东](https://mp.jd.com)

下载并打开京东小程序开发者工具（前往https://mp.jd.com 注册，申请成功后将会获得开发者工具），然后选择项目根目录下 dist 目录（根目录 config 中的 outputRoot 设置的目录）进行预览。

设置了小程序项目配置文件 [project.swan.json](https://docs.taro.zone/docs/project-config/)

### [钉钉](https://open.dingtalk.com/document/resourcedownload/miniapp-tool)

编译type `dd`

Taro v3.1+ 开始支持

Taro v3.3.8+： 请使用 @tarojs/plugin-platform-alipay-dd 插件的 ~0.1.0 版本

Taro v3.1 & v3.2： 请使用 @tarojs/plugin-platform-alipay-dd 插件的 ~0.0.5 版本

开发者在 global.d.ts 中加入 `/// <reference types="@tarojs/plugin-platform-alipay-dd/types/shims-dd.d.ts" />` 即可获得类型提示。

### [支付宝 IOT](https://opendocs.alipay.com/iot/05edqu)

Taro v3.1+ 开始支持

编译type `iot`

插件配置

```js 
config = {
  // ...
  plugins: ['@tarojs/plugin-platform-alipay-iot'],
}
```

支付宝 api 使用

```js 
Taro.ix.getSysProp({
  key: 'ro.serialno'
})
  .then(res => console.log(res))
```

### [飞书](https://open.feishu.cn/document/uYjL24iN/uMjNzUjLzYzM14yM2MTN?from=taro)

Taro v3.1+ 开始支持

编译type `lark`

[plugin 文档有点特别，建议看github配置](https://github.com/NervJS/taro-plugin-platform-lark)

`yarn add @tarojs/plugin-platform-lark`

### [快手]()

Taro v3.1+ 开始支持

Taro v3.3+： 请使用 taro-plugin-platform-kwai 插件的 1.0 或以上版本

Taro v3.2： 请使用 taro-plugin-platform-ks 插件的 1.2.x 版本

Taro v3.1： 请使用 taro-plugin-platform-ks 插件的 1.0.x 版本

编译type `kwai`

plugin `'@tarojs/plugin-platform-kwai'`

#### [存在问题，建议关注github](https://github.com/NervJS/taro-plugin-platform-kwai)

- cover-view 只能嵌套8层,子元素只能是 文本/cover-view/cover-image
- cover-view 样式有些不支持,等待快手修复,line-height border-radius
- cover-image 不支持嵌套子元素
- 部分 api 未 promise 化
- 组件属性还未完全支持，参考 taro-plugin-inject 进行添加，或者 issue pr

### [React Native 转转团队负责](https://docs.taro.zone/docs/react-native/)

> Taro v3.2+ 开始支持

## 学习步骤

- 环境准备：当我们使用 Taro 需要安装什么东西； https://docs.taro.zone/docs/guide/#%E7%8E%AF%E5%A2%83%E5%87%86%E5%A4%87
- 基础教程：Taro 的基础概念和开发指南；https://docs.taro.zone/docs/guide/#%E5%9F%BA%E7%A1%80%E6%95%99%E7%A8%8B
- 项目进阶与优化：当项目变大变慢时，应该如何保持或提高应用的可维护性和性能；https://docs.taro.zone/docs/guide/#%E9%A1%B9%E7%9B%AE%E8%BF%9B%E9%98%B6%E4%B8%8E%E4%BC%98%E5%8C%96
- 多端开发：已经使用 Taro 开发了一端的应用，如何快速拓展到多端应用。https://docs.taro.zone/docs/guide/#%E5%A4%9A%E7%AB%AF%E5%BC%80%E5%8F%91

