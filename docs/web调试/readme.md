# 移动端调试

- Chrome 调试

    - 需要科学上网， 数据线连接手机后，手机内打开Chrome 打开指定网页，电脑的浏览器输入 ``` chrome://inspect/#devices ``` 浏览器就会显示已经连接的手机，然后点击内容区域的 ```inspect ``` ,就开始打开一个新的页面，在这个新的页面中会显示当前手机中的内容，和pc调试的方式一样

- [weinre 调试](http://people.apache.org/~pmuellr/weinre/)

Weinre ( WebInspector Remote ), 是一款基于 Web Inspector （Webkit）的远程调试工具，借助于网络，可以在pc上直接调试运行在移动端的页面

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

1. 安装 weinre ``` yarn add weinre ```

2. 启动 weinre  ``` npx weinre --httpPort 9990 --boundHost -all- ```

3. 浏览器打开 localhost:9990

如果在这步中浏览器打开这个地址后 weinre 服务挂掉，提示 mime.lookup 错误请进入到 weinre 目录，删除掉 mime 重新下载 mime ``` yarn add mime@1 ```

4. 在要调试的页面中添加 ``` <script src="http://【你的IP】:9990/target/target-script-min.js#anonymous"></script> ```

这个地址在 Target Script 下面可以获取到

5. 点击 【Access Points】下面的 debug client user interface 后面的链接

6. 手机访问要调试的页面

7. 如果我们的remote 中检测到URL的时候就可以点击 tab 栏的其他选项开始调试了

- spy-debugger 调试

>一站式页面调试、抓包工具。远程调试任何手机浏览器页面，任何手机移动端webview（如：微信，HybridApp等）。支持HTTP/HTTPS，无需USB连接设备。

特性
1、页面调试＋抓包
2、操作简单，无需USB连接设备
3、支持HTTPS。
4、spy-debugger内部集成了weinre、node-mitmproxy、AnyProxy。
5、自动忽略原生App发起的https请求，只拦截webview发起的https请求。对使用了SSL pinning技术的原生App不造成任何影响。
6、可以配合其它代理工具一起使用(默认使用AnyProxy) (设置外部代理)

下载安装

``` yarn add spy-debugger ```

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

1. 手机和pc 在同一网络下
2. 命令行输入```spy-debugger -w true```，按命令行提示用浏览器打开相应地址。
3. 设置手机的HTTP代理，代理IP地址设置为PC的IP地址，端口为spy-debugger的启动端口(默认端口：9888)。

```
Android设置代理步骤：设置 - WLAN - 长按选中网络 - 修改网络 - 高级 - 代理设置 - 手动
iOS设置代理步骤：设置 - 无线局域网 - 选中网络 - HTTP代理手动

```
4. 电脑端打开地址  ``` http://127.0.0.1:54813/ ```

【请求抓包】 -》 【RootCA】 -》 手机浏览器扫描，安装证书

5. 手机浏览想要调试的网页，电脑选择页面调试，就可以正常工作了

