# reactssr

- 客户端渲染  服务器压力大
- spa  首屏慢 seo不好
- ssr同构，解决上述问题

## 同构

基于虚拟dom，可以生成真实的dom，

- 打包环境区分

    node webpack jsx

    webpack打包出来的东西会有些臃肿
    - 

    gulp jsx  -->  react代码单独提出打包，在node端引用

- 注水脱水

    变量挂window或者隐藏域

- 请求认证处理
- 样式问题处理

    style 标签将样式打入页面

    link标签
    
    模块化样式使用 isomorphic-style-loader

- 安全问题

    避免xss

- 性能问题

    页面缓存、接口缓存、next处理思想

### start


# diff

## vue

### vue3

patchChildren      runtime-core

## react

react-dom-development

reconcilesingleelement

mapRemainingChildren

## ts 编译原理


