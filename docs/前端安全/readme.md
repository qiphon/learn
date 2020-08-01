# 前端安全

- xss

    > 跨站脚本（英语：Cross-site scripting，通常简称为：XSS）是一种网站应用程序的安全漏洞攻击，是代码注入的一种。它允许恶意用户将代码注入到网页上，其他用户在观看网页时就会受到影响。这类攻击通常包含了HTML以及用户端脚本语言。

    XSS攻击通常指的是通过利用网页开发时留下的漏洞，通过巧妙的方法注入恶意指令代码到网页，使用户加载并执行攻击者恶意制造的网页程序。这些恶意网页程序通常是JavaScript，但实际上也可以包括Java，VBScript，ActiveX，Flash或者甚至是普通的HTML。攻击成功后，攻击者可能得到更高的权限（如执行一些操作）、私密网页内容、会话和cookie等各种内容。

    xss是web应用中最广泛，和最具破坏性的安全漏洞之一

    xss导致用户执行被攻击的代码

    xss发生常见与网站接受用户输入，并使用该输入构造页面
    
    - 检测方法
        通常有一些方式可以测试网站是否有正确处理特殊字符：

        ```html
        ><script>alert(document.cookie)</script>
        ='><script>alert(document.cookie)</script>
        "><script>alert(document.cookie)</script>
        <script>alert(document.cookie)</script>
        <script>alert (vulnerable)</script>
        %3Cscript%3Ealert('XSS')%3C/script%3E
        <script>alert('XSS')</script>
        <img src="javascript:alert('XSS')">
        <img src="http://888.888.com/999.png" onerror="alert('XSS')">
        <div style="height:expression(alert('XSS'),1)"></div>（这个仅于IE7(含)之前有效）
        ```
    - 攻击手段和目的
        攻击者使被攻击者在浏览器中执行脚本后，如果需要收集来自被攻击者的数据（如cookie或其他敏感信息），可以自行架设一个网站，让被攻击者通过JavaScript等方式把收集好的数据作为参数提交，随后以数据库等形式记录在攻击者自己的服务器上。

        常用的XSS攻击手段和目的有：

        - 盗用cookie，获取敏感信息。
        - 利用植入Flash，通过crossdomain权限设置进一步获取更高权限；或者利用Java等得到类似的操作。
        - 利用iframe、frame、XMLHttpRequest或上述Flash等方式，以（被攻击）用户的身份执行一些管理动作，或执行一些一般的如发微博、加好友、发私信等操作。
        - 利用可被攻击的域受到其他域信任的特点，以受信任来源的身份请求一些平时不允许的操作，如进行不当的投票活动。
        - 在访问量极大的一些页面上的XSS可以攻击一些小型网站，实现DoS攻击的效果。

    - 漏洞的防御和利用

        过滤特殊字符
        避免XSS的方法之一主要是将用户所提供的内容进行过滤，许多语言都有提供对HTML的过滤：

        ```
        PHP的htmlentities()或是htmlspecialchars()。
        Python的cgi.escape()。
        ASP的Server.HTMLEncode()。
        ASP.NET的Server.HtmlEncode()或功能更强的Microsoft Anti-Cross Site Scripting Library
        Java的xssprotect (Open Source Library)。
        Node.js的node-validator。
        ```

    - 使用HTTP头指定类型

        很多时候可以使用HTTP头指定内容的类型，使得输出的内容避免被作为HTML解析。如在PHP语言中使用以下代码：
        ```php
        <?php
        header('Content-Type: text/javascript; charset=utf-8');
        ?>
        ```
        即可强行指定输出内容为文本/JavaScript脚本（顺便指定了内容编码），而非可以引发攻击的HTML。


- csrf （cross site request forgery）跨站请求伪造

    > 跨站请求伪造（英语：Cross-site request forgery），也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。[1] 跟跨网站脚本（XSS）相比，XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。

    csrf 原理

    - 利用站点对浏览器的信任
    - 被攻击网站依赖用户的认证（如果只依赖cookies等认证，攻击就能成功）
    - 攻击者使用用户浏览器发送请求到目标网站

    攻击步骤

    - 确定攻击的网站
    - 找到目标站点的表单、或提交请求的URL，并构造攻击页面或URL
    - 为所有表单或URL提供正确的值
    - 攻击者诱使受害者访问攻击页面或发送URL

    防御方法

    - post方式发送请求
    - 将请求分步执行   
    - 检查 referer
    - 在表单中增加攻击者难以构造的项
    - 添加token

- 点击劫持

    > 点击劫持 (Clickjacking) 技术又称为界面伪装攻击 (UI redress attack )，是一种视觉上的欺骗手段。攻击者使用一个或多个透明的 iframe 覆盖在一个正常的网页上，然后诱使用户在该网页上进行操作，当用户在不知情的情况下点击透明的 iframe 页面时，用户的操作已经被劫持到攻击者事先设计好的恶意按钮或链接上。攻击者既可以通过点击劫持设计一个独立的恶意网站，执行钓鱼攻击等；也可以与 XSS 和 CSRF 攻击相结合，突破传统的防御措施，提升漏洞的危害程度。

    - 页面伪装
    - 需要iframe
    - 拖拽技术可以将页面中的数据拖拽到iframe中

- sql 注入

    利用SQL语法实现攻击

    防御

    - 过滤指定符号，或者转义
    - sql显示区分数据和命令

- Dos 攻击

    - SYN Flooding 攻击

        - 利用TCP三次握手
        - 攻击者发送大量的 SYN 伪造请求
        - 服务器发送应答，并分配TCB资源等待建立连接
        - 服务器资源被暂用，无法响应其它用户的请求

            ```sh
            netwox 76 -i 112.12.11.22 -p 80
            ```
    防御措施

    - SYN cache : 接收到 SYN 时，分配少量资源
    - SYN cookie: 接收到 ACK 时，开始分配资源
    - Linux 中默认开启 SYN cookie

    算法复杂度攻击

    - 构建一个大的哈希表，增加CPU运算时间，从而实现攻击目的

- 恶意URL攻击

    - TF-IDF
