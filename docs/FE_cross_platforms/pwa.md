# pwa 

progressive web apps 是 Google 提出的前沿 web 技术网页提供 app 般使用
体验的一系列方案，但是作为一个web应用，他可以断网使用、推送消息、发送通知、
从桌面启动，当然还包含web应用的优势: 免安装、快速开发、依赖浏览器跨平台。

### 特性

- 响应式：用户界面可以兼容多种设备，比如：桌面，移动端，平板

- 应用化：交互体验接近 native 应用

- 网络依赖低：无网络或者低网速可以使用

- 延续性：借助推送功能，能够持续维护用户粘性

- 可安装：可以被安装到主屏幕，这样用户随时可以从主屏启动应用

- 可被发现：被视为一个独立应用，可以被搜索

- 可更新：当用户重新联网时，可以更新内容

- 安全：使用 https 来防止内容伪造和中间人攻击

- 兼容URL：可以通过 URL 传播

### 核心技术

- service worker

- pwa 核心技术

    - App shell 

        顾名思义，就是壳的意思，也可以理解为骨架屏，就是在内容尚未加载的时候，
        优先展示页面的结构、占位图、主题和背景颜色等他们都是一些被强缓的资源

    - 存储

        利用orm操作缓存的库，offline.js 实现数据的互通

    - 离线

        依靠service worker 这个在浏览器后台运行的脚本。专注于那些不需要
        网页或用户互动就能完成的功能，它主要用于操作离线缓存

    - 环境
        
        关闭服务端的缓存策略，以便在开发时能更好的看到效果

#### workbox

    - 这个工具库和构建工具的

#### service worker

通过拦截网络请求，使网站运行的更快，或者在离线环境下依然可以执行，也作为其它后台功能的基础。比如消息推送和背景同步

- 基于 js 的 worker 不能直接操作dom，通过postmessage 通信
- 不用的时候会终止执行需要的时候又重新执行，即他是事件驱动的
- 只能在https下运行，因为可以拦截请求，所以必须保证请求是安全的
- 有一个精心定义的升级策略，内部大量使用 promise

- 生命周期
    - installing 正在安装阶段

        这个阶段处于sw被注册的时候，在这个阶段， sw 的 install 方法会执行，
        声明的资源将被加入缓存
    - installed 安装完成阶段

        当 sw 安装完成后进入这个阶段，这个阶段它是一个“有效但尚未激活的worker”，
        等待着客户端对其激活使用。可以在这个阶段告知用户 pwa 已经可以进行升级了
    - activating 正在激活阶段

        当客户端已无其它激活状态的 sw 、或者脚本中的 skip waiting() 方法被
        调用、或者用户关闭了该 sw 作用域下的所有页面，就会触发这个阶段。在这个
        阶段，sw 脚本中的 activate 事件会被执行，此时可以清除掉过期的资源，
        并将进入下一个阶段

    - activated 激活完成阶段

        此时 sw 已经激活并生效，可以控制网站的资源请求了，此时 sw 内的
        fetch和 message 事件已经可以被监听

- offline.js 能够检测用户是否能够上网

- offline-plugin worker-precache-webpack-plugin

#### [workbox](https://developers.google.com/web/tools/workbox/guides/get-started) 

- workbox 这个库和构建工具的集合使用了 serviceworker 的 fetch event 和 cache API，可以很容易
地在用户设备上本地存储网页文件

- 让网页可以离线访问

- 提高重复访问的负载性能，即使不想完全离线，也可以使用 workbox 在本地存储和提供常用文件，而不是从网络
中提供

- 迅速集成进 workbox-webpack-plugin


- 小工具，创建 icon https://realfavicongenerator.net/
- 快速生成 manifest  https://tomitm.github.io/appmanifest/

### [AMP](https://amp.dev/) 丰富HTML功能

限制

- 只允许异步脚本
- 显示制定 UI 样式
- CSS 只能有一个 inline 的
- CSS 只能 50K
- 只允许有限的 css 动画
- 控制资源加载、动画执行

原则

- 严格控制外部资源
- 严格控制整个页面的渲染
- 严格控制 css 动画

