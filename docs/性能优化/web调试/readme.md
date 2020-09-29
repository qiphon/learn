# 移动端调试

- Chrome 调试

  - 需要科学上网， 数据线连接手机后，手机内打开 Chrome 打开指定网页，电脑的浏览器输入 `chrome://inspect/#devices` 浏览器就会显示已经连接的手机，然后点击内容区域的 `inspect` ,就开始打开一个新的页面，在这个新的页面中会显示当前手机中的内容，和 pc 调试的方式一样

  - 断点调试

    控制台 ==》 source ==》 找到要调试的文件 ==》 在显示文件内容区域右侧行号处点击即可调试

  - 元素节点调试

    在要添加调试的元素上右击 --> break on 会显示 3 个选项

          - subtree modifications 子树修改断点
          - attribute modifications 属性修改断点
          - node removal  元素移除断点

  - 寻找元素事件监听

    选中要查看的元素 ==》 右侧 Event Listener

- [weinre 调试](http://people.apache.org/~pmuellr/weinre/)

  Weinre ( WebInspector Remote ), 是一款基于 Web Inspector （Webkit）的远程调试工具，借助于网络，可以在 pc 上直接调试运行在移动端的页面

  ```bash
    usage:   weinre [options]
    version: 2.0.0-pre-I0Z7U9OV

    options:
        --httpPort     port to run the http server on        default: 8080
        --boundHost    ip address to bind the server to      default: localhost   [hostname | Ip | -all-]
        --verbose      print more diagnostics                default: false
        --debug        print even more diagnostics           default: false
        --readTimeout  seconds to wait for a client message  default: 5
        --deathTimeout seconds to wait to kill client        default: 3*readTimeout

  ```

  1. 安装 weinre `yarn add weinre`

  2. 启动 weinre `npx weinre --httpPort 9990 --boundHost -all-`

  3. 浏览器打开 localhost:9990

     如果在这步中浏览器打开这个地址后 weinre 服务挂掉，提示 mime.lookup 错误请进入到 weinre 目录，删除掉 mime 重新下载 mime `yarn add mime@1`

  4. 在要调试的页面中添加 `<script src="http://【你的IP】:9990/target/target-script-min.js#anonymous"></script>`

     这个地址在 Target Script 下面可以获取到

  5. 点击 【Access Points】下面的 debug client user interface 后面的链接

  6. 手机访问要调试的页面

  7. 如果我们的 remote 中检测到 URL 的时候就可以点击 tab 栏的其他选项开始调试了

- spy-debugger 调试

  > 一站式页面调试、抓包工具。远程调试任何手机浏览器页面，任何手机移动端 webview（如：微信，HybridApp 等）。支持 HTTP/HTTPS，无需 USB 连接设备。

  特性

  1. 页面调试＋抓包
  2. 操作简单，无需 USB 连接设备
  3. 支持 HTTPS。
  4. spy-debugger 内部集成了 weinre、node-mitmproxy、AnyProxy。
  5. 自动忽略原生 App 发起的 https 请求，只拦截 webview 发起的 https 请求。对使用了 SSL pinning 技术的原生 App 不造成任何影响。
  6. 可以配合其它代理工具一起使用(默认使用 AnyProxy) (设置外部代理)

  下载安装

  `yarn add spy-debugger`

  ```bash

  Usage: spy-debugger [options]

  Options:
    -V, --version                    output the version number
    -p, --port [value]               start port
    -i, --showIframe [value]         spy iframe window
    -b, --autoDetectBrowser [value]  Auto detect Browser Request
    -e, --externalProxy [value]      set external Proxy
    -c, --cache [value]              set no cache
    -w, --contentEditable [value]    set content editable
    -h, --help                       output usage information

  ```

  使用

  1. 手机和 pc 在同一网络下
  2. 命令行输入`spy-debugger -w true`，按命令行提示用浏览器打开相应地址。
  3. 设置手机的 HTTP 代理，代理 IP 地址设置为 PC 的 IP 地址，端口为 spy-debugger 的启动端口(默认端口：9888)。

  ```
  Android设置代理步骤：设置 - WLAN - 长按选中网络 - 修改网络 - 高级 - 代理设置 - 手动
  iOS设置代理步骤：设置 - 无线局域网 - 选中网络 - HTTP代理手动

  ```

  4. 电脑端打开地址 `http://127.0.0.1:54813/`

     【请求抓包】 -》 【RootCA】 -》 手机浏览器扫描，安装证书

  5. 手机浏览想要调试的网页，电脑选择页面调试，就可以正常工作了

## 手机 webview 中的 vconsole 工具

### [Eruda](https://github.com/liriliri/eruda/blob/master/doc/README_CN.md)

- 按钮拖拽，面板透明度大小设置。

- Console 面板：捕获 Console 日志，支持 log、error、info、warn、dir、time/timeEnd、clear、count、assert、table；支持占位符，包括 %c 自定义样式输出；支持按日志类型及正则表达式过滤；支持 JavaScript 脚本执行。

- Elements 面板：查看标签内容及属性；查看应用在 Dom 上的样式；支持页面元素高亮；支持屏幕直接点击选取；查看 Dom 上绑定的各类事件。

- Network 面板：捕获请求，查看发送数据、返回头、返回内容等信息。

- Resources 面板：查看并清除 localStorage、sessionStorage 及 cookie；查看页面加载脚本及样式文件；查看页面加载图片。

- Sources 面板：查看页面源码；格式化 html，css，js 代码及 json 数据。

- Info 面板：输出 URL 及 User Agent；支持自定义输出内容。

- Snippets 面板：页面元素添加边框；加时间戳刷新页面；支持自定义代码片段。

使用 usage：

```js
<script src="//cdn.bootcdn.net/ajax/libs/eruda/2.3.3/eruda.js"></script>
<script>eruda.init();</script>
```

### [vConsole](https://github.com/Tencent/vConsole/blob/dev/doc/tutorial_CN.md)

vConsole 是一款由微信公众平台前端团队打造的前端调试面板，专治手机端看 log 难题。

usage:

```js
// npm install vconsole

<script src="path/to/vconsole.min.js"></script>
  <script>
    var vConsole = new VConsole();
  </script>
```
