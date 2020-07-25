# 前端安全

- xss

    > 跨站请求伪造（英语：Cross-site request forgery），也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。[1] 跟跨网站脚本（XSS）相比，XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。
    
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

    > 跨站请求伪造（英语：Cross-site request forgery），也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。[1] 跟跨网站脚本（XSS）相比，XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。

- sql 注入