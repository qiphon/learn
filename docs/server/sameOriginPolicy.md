# same origin Policy

「同源」的資源才可相互存取，跨來源的資源則必須在某些特定情況下，才允許存取。

這樣的設計是為了防範駭客的攻擊，因為有了這個限制，在正常的情況下，駭客就不能夠任意用一個惡意的網站，去访问其它网站的服务。

### 同源定义方法

`(https:)//(www.qifeng.site):(80)/(about)`

`scheme` - `domain` - `port` - `path`

只要 scheme domain port 一致才会视为同源

### 行为限定

「同源政策」(Same Origin Policy) 的規定並不是完全地限制跨來源的存取．在某些情況下是允許的．以下就幾種常見的情況進行說明 (註2.)．

- 允许

链接（link）、重定向（redirect）和表单（form）是被允许的。

script、img、video、link、frame 

- 不允许

但是如果是 fetch 、XMLHttpRequest 是无法执行的

### 「同源政策」(Same Origin Policy) 对 cookie 的影响

> cookie 的同源政策是允许子网域修改、覆盖母网的cookie

只要連上的網站其 Domain 跟 Path 與 Cookie 一致，就會被視為同源．拜訪該網站時，Cookie 就會被送出。若是 Cookie 有加上一些特別的設定，便需要判斷 Scheme 是 HTTPS 或是 HTTP 才會送出 Cookie。

例如： Cookie 加上 secure 設定之後，限定 Cookie 只能以 HTTPS 傳輸。

### IE 中的特例

Internet Explorer 的同源策略有两个主要的差异点：

授信范围（Trust Zones）：两个相互之间高度互信的域名，如公司域名（corporate domains），则不受同源策略限制。
端口：IE 未将端口号纳入到同源策略的检查中，因此 https://company.com:81/index.html 和 https://company.com/index.html  属于同源并且不受任何限制。

### 相关链接

- https://medium.com/%E7%A8%8B%E5%BC%8F%E7%8C%BF%E5%90%83%E9%A6%99%E8%95%89/same-origin-policy-%E5%90%8C%E6%BA%90%E6%94%BF%E7%AD%96-%E4%B8%80%E5%88%87%E5%AE%89%E5%85%A8%E7%9A%84%E5%9F%BA%E7%A4%8E-36432565a226

- https://crypto.stanford.edu/cs142/lectures/10-cookie-security.pdf

- https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy