# 我的学习笔记

## github 建站

github 建站步骤

- 选框架：我用过的博客框架 vuepress、viteprss、rspress，最后选用了 [rspress](https://rspress.dev/)。
- 写 githubActions 配置

## 前端部分

- pretter config 使用 `"@qiphon/prettier-config": "^1.0.1",`

- [options 请求 触发条件](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

  - 跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。

  1. 使用下面任意一种 http 方法
     - PUT/DELETE/CONNECT/OPTIONS/TRACE/PATCH
  2. 人为设置了以下集合之外首部字段：
     - Accept/Accept-Language/Content-Language/Content-Type/DPR/Downlink/Save-Data/Viewport-Width/Width
  3. Content-Type 的值不属于下列之一:
     - application/x-www-form-urlencoded、multipart/form-data、text/plain

### 优秀书籍

1. 你不知道 JavaScript 上中下
2. 学习 V8 的好地方 https://v8.dev/blog/
3. HTML5 Canvas 核心技术:图形、动画与游戏开发
4. Webkit 技术内幕
5. 小灰算法之旅
6. 大话数据结构 啊哈算法
7. 3D 数学基础 图形与游戏开发
8. 函数式编程 https://github.com/MostlyAdequate/mostly-adequate-guide
9. 自制编译器 自制 COU 系列

[免费电子书推荐](https://blog.csdn.net/haoel/article/details/6212491?spm=1001.2014.3001.5501)

### 推荐文章

- [免费的让网站启用 HTTPS](https://coolshell.cn/articles/18094.html)
- [浏览器的渲染原理简介](https://coolshell.cn/articles/9666.html)
- [How browsers work](http://taligarsiel.com/Projects/howbrowserswork1.htm)
- [javascript garden](https://shamansir.github.io/JavaScript-Garden/zh/)
- [Mozilla 的安全编程规范](https://wiki.mozilla.org/WebAppSec/Secure_Coding_Guidelines)
- [设计模式](http://www.vincehuston.org/dp/)
- [What's In A GIF - Bit by Byte](https://matthewflickinger.com/lab/whatsinagif/bits_and_bytes.asp)
- [The Most Important Algorithms](https://www3.risc.jku.at/people/ckoutsch/stuff/e_algorithms.html)

### github 无法访问

- [github 链接问题官方说明](https://docs.github.com/en/get-started/using-github/troubleshooting-connectivity-problems)
- 更换 dns [可以参考这里](https://www.landiannews.com/archives/21724.html)
- 如果 ssh 无法连接，可以将 ssh 改用 https 端口 `ssh -vT -p 443 git@ssh.github.com`, 通常 ssh 改为 443 端口不会失败
  - ssh 443 端口仓库模式 `ssh://git@ssh.github.com:443/YOUR-USERNAME/YOUR-REPOSITORY.git`
