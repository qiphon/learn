# html 目录说明

### 前端跨域方案

同源策略：协议相同、域名相同、端口相同

同源策略可以防止其他源获取当前网页的cookie等隐私数据，*提交表单不受同源策略限制*

同源限制的行为：

1. cookie、LocalStorage、IndexDB

2. DOM 无法获得

3. ajax 请求不能得到响应结果

> cookie 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。当网页一级域名相同，二级域名不同的时候，浏览器允许通过设置 domain 共享 cookie

例子

```html

<!-- a网页 http://v1.qiphon.com, b网页 http://v2.qiphon.com, 那么只要设置相同的document.domain 2个网页就可以共享 cookie -->
<!-- (没有实现。。。经过测试并不能实现) -->
```

另外，服务器也可以在设置 cookie 的时候指定 cookie 所属的域名为一级域名


跨域的实现：

- [postmessage (iframe, img)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage) (postmessage 可以是iframe也可以是当前窗口打开的另一个窗口)

- websocket

- jsonp

- iframe

    - 片段识别符 hash ，子窗口通过监听 hashchange 来展示不同内容
    - window.name 无论是否同源，只要在同一个窗口里，前一个网页设置了这个属性，后一个网页就能获取到它

- script(jsonp) 标签

- link (background)

- form

- img（不在同源策略中）

### html 语义化

- 使用 div、span 进行布局，不要进行一些无意义的包裹
- 不要使用纯样式标签 b、font、u等
- 强调的文本，可以使用 strong、em
- input 最好和 label 关联
- ul/ol
- h5 新的标签

尽量少些html标签，增大文件大小的同时也会加大浏览器的解析压力

### 注意事项

- 文件名不要使用大小写混用，推荐全部使用小写

- 了解 material-ui ，google 的优秀 ui 库

- localstorage 超过2.5M会出现性能问题，最大限制 5M