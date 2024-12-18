# 初识 uni-app

uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到

- iOS、
- Android、
- Web（响应式）、
- 以及各种小程序（微信/支付宝/百度/头条/飞书/QQ/快手/钉钉/淘宝）、
- 快应用等多个平台。

架构图 https://zh.uniapp.dcloud.io/select.html

特点：

- 跨平台广
- 运行体验好
- 学习成本低
- 开发生态、组件丰富

编辑器，必须使用 hbuilderX https://www.dcloud.io/hbuilderx.html

### 目录结构

├── App.vue
├── LICENSE
├── README.md
├── changelog.md
├── index.html
├── locale
│   ├── en.json
│   ├── index.js
│   ├── ja.json
│   ├── uni-app.ja.json
│   ├── zh-Hans.json
│   └── zh-Hant.json
├── main.js                 入口文件
├── manifest.json           app 配置文件，一些不常用配置需要在源码文件中添加
├── node_modules
├── package.json
├── pages
│   ├── api
│   ├── component
│   ├── index
│   └── schema
├── pages.json              [全局配置说明](https://uniapp.dcloud.net.cn/collocation/pages.html#globalstyle)
├── static                  静态文件目录
│   └── logo.png
├── uni.scss                项目主题配置
├── uniCloud-aliyun
│   └── database
├── uni_modules
│   └── no-data
└── unpackage
    └── dist


如果是第一次使用，需要配置开发者工具路径，并且微信开发者工具需要开启服务端口 在微信工具的设置->安全中。

- [微信开发者工具命令行调用](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html)
- [uni-app 实现分享](https://juejin.cn/post/6844903744631472142)
- [github](https://github.com/dcloudio/uni-app)
- [小程序代码转换成uni-app](https://ask.dcloud.net.cn/article/35786)
- [小程序代码转换成uni-app](https://zh.uniapp.dcloud.io/translate.html)
- [社区](https://ask.dcloud.net.cn/explore/)
- [github - uni-helper 非官方](https://github.com/uni-helper)
- [uni-app 跨端注意事项](https://ask.dcloud.net.cn/article/35232)
- [插件使用](https://ext.dcloud.net.cn/search?q=&cat1=1&cat2=11)
- [视频学习资料](https://zh.uniapp.dcloud.io/resource.html)
- [bindingx](https://alibaba.github.io/bindingx/guide/cn_guide_start)

### css 变化

- *选择器不支持；元素选择器里没有body，改为了page。微信小程序即是如此。
- 单位方面，px无法动态适应不同宽度的屏幕，rem无法用于nvue/weex。如果想使用根据屏幕宽度自适应的单位，推荐使用rpx，全端支持。 尺寸单位文档
  - rpx 即响应式 px，一种根据屏幕宽度自适应的动态单位。以 750 宽的屏幕为基准，750rpx 恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大，但在 App（vue2 不含 nvue） 端和 H5（vue2） 端屏幕宽度达到 960px 时，默认将按照 375px 的屏幕宽度进行计算，具体配置参考：rpx 计算配置 。
  - 正常支持 rpx，px 是真实物理像素。暂不支持通过设 manifest.json 的 "transformPx" : true，把 px 当动态单位使用。
  - 推荐使用flex布局

- 注意css里背景图和字体文件，尽量不要大于40k，因为会影响性能。在小程序端，如果要大于40k，需放到服务器侧远程引用或base64后引入，不能放到本地作为独立文件引用。

### 工程结构和页面管理

- 每个可显示的页面，都必须在 pages.json 中注册，page节点下第一个页面就是首页

和小程序的区别

- 原来app.json被一拆为二。页面管理，被挪入了uni-app的pages.json；非页面管理，挪入了manifest.json
- 原来的app.js和app.wxss被合并到了app.vue中

### 生命周期

- onLaunch

全局数据处理

- vuex
- globalData - app.vue 

```vue
<!-- app.vue -->
<script>
  export default {
	  globalData: {
		  test1: 'test1'
	  },
    onLaunch: function() {
      console.log('App Launch')
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>
```

## 其它事项

- [关于手机webview内核、默认浏览器、各家小程序的渲染层浏览器的区别和兼容性](https://ask.dcloud.net.cn/article/1318)
- [各家小程序开发工具下载地址](https://zh.uniapp.dcloud.io/matter.html#%E5%90%84%E5%AE%B6%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7%E4%B8%8B%E8%BD%BD%E5%9C%B0%E5%9D%80)
- [微信小程序已知bug](https://developers.weixin.qq.com/community/develop/issueList?type=%E4%BF%AE%E5%A4%8D%E4%B8%AD&block=bug)
- [常见问题](https://zh.uniapp.dcloud.io/faq.html)
- 组件尽量使用 uni-ui 其它第三方ui 都做不到全支持，而且性能也不如 uni-ui 

### 竟手 

taro ， react 技术栈

flutter 只能是web、桌面端