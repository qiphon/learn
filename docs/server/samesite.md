# samesite 

Chrome 51 开始，浏览器的 Cookie 新增加了一个SameSite属性，用来防止 CSRF 攻击和用户追踪。

### CSRF 是什么

> Cookie 往往用来存储用户的身份信息，恶意网站可以设法伪造带有正确 Cookie 的 HTTP 请求，这就是 CSRF 攻击。

## SameSite 属性

SameSite 是HTTP响应头 Set-Cookie 的属性之一。它允许您声明该Cookie是否仅限于第一方或者同一站点上下文。

Cookie 的SameSite属性用来限制第三方 Cookie，从而减少安全风险。

samesite 不仅会影响 cookie 的发送，也会影响 cookie 的写入

- Strict

Strict最为严格，完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。换言之，只有当前网页的 URL 与请求目标一致，才会带上 Cookie。

根据 Cookie 的同源政策(Cookie Same Origin Policy)，只要 Domain 跟 Path 与 Cookie 一致，就会被视为同源．访问该网站时，Cookie 就会被送出，而 Scheme 的部分，则是要看 Cookie 是否有加入 secure 属性，若是有加上 secure，便会判断是否是 Https 才会送出

- Lax

Lax规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。

导航到目标网址的 GET 请求，只包括三种情况：链接，预加载请求，GET 表单。详见下表。

```
请求类型	示例	                             正常情况	   Lax
链接	    <a href="..."></a>	                发送 Cookie	 发送 Cookie
预加载	    <link rel="prerender" href="..."/>	发送 Cookie	 发送 Cookie
GET 表单	<form method="GET" action="...">	发送 Cookie	 发送 Cookie
POST 表单	<form method="POST" action="...">	发送 Cookie	 不发送
iframe	    <iframe src="..."></iframe>	        发送 Cookie	 不发送
AJAX	    $.get("...")	                    发送 Cookie	 不发送
Image	    <img src="...">	                    发送 Cookie	 不发送
```

- None

Chrome 计划将Lax变为默认设置。这时，网站可以选择显式关闭SameSite属性，将其设为None。不过，前提是必须同时设置Secure属性（Cookie 只能通过 HTTPS 协议发送），否则无效。

`Set-Cookie: widget_session=abc123; SameSite=None; Secure`

### 注意点

- iOS Safari
許多手機版應用程式會在 iphone 或是 ipad 上面執行，由於 Apple 對於隱私權的重視，Safari 對於 Cookie 的送出更為嚴格，並不依照 RFC 對於 SameSite 的規格實作，甚至有出現 SameSite Cookie 設定為 None 卻依然無法在第三方情境下使用的情況，這點也是開發時需要注意的部分。

    - 相关讨论链接
        - https://stackoverflow.com/questions/58525719/safari-not-sending-cookie-even-after-setting-samesite-none-secure
        - https://bugs.webkit.org/show_bug.cgi?id=198181
