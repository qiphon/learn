# cookie

响应首部 Set-Cookie 被用来由服务器端向客户端发送 cookie。

### usage

```
Set-Cookie: <cookie-name>=<cookie-value>
Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<non-zero-digit>
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>
Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value>
Set-Cookie: <cookie-name>=<cookie-value>; Secure
Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly

Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Strict
Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Lax

// Multiple directives are also possible, for example:
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly
```

### 指令

#### `<cookie-name>=<cookie-value>`

一个 cookie 开始于一个名称/值对：

- `<cookie-name>` 可以是除了控制字符 (CTLs)、空格 (spaces) 或制表符 (tab)之外的任何 US-ASCII 字符。同时不能包含以下分隔字符： ( ) < > @ , ; : \ " /  [ ] ? = { }.

- `<cookie-value>` 是可选的，如果存在的话，那么需要包含在双引号里面。支持除了控制字符（CTLs）、空格（whitespace）、双引号（double quotes）、逗号（comma）、分号（semicolon）以及反斜线（backslash）之外的任意 US-ASCII 字符。关于编码：许多应用会对 cookie 值按照URL编码（URL encoding）规则进行编码，但是按照 RFC 规范，这不是必须的。不过满足规范中对于 `<cookie-value>` 所允许使用的字符的要求是有用的。

- __Secure- 前缀：以 __Secure- 为前缀的 cookie（其中连接符是前缀的一部分），必须与 secure 属性一同设置，同时必须应用于安全页面（即使用 HTTPS 访问的页面）。

- __Host- 前缀： 以 __Host- 为前缀的 cookie，必须与 secure 属性一同设置，必须应用于安全页面（即使用 HTTPS 访问的页面），必须不能设置 domain 属性 （也就不会发送给子域），同时 path 属性的值必须为“/”。

#### `Expires=<date> 可选`

cookie 的最长有效时间，形式为符合 HTTP-date 规范的时间戳。参考 Date 可以获取详细信息。如果没有设置这个属性，那么表示这是一个会话期 cookie 。一个会话结束于客户端被关闭时，这意味着会话期 cookie 在彼时会被移除。然而，很多Web浏览器支持会话恢复功能，这个功能可以使浏览器保留所有的tab标签，然后在重新打开浏览器的时候将其还原。与此同时，cookie 也会恢复，就跟从来没有关闭浏览器一样。

#### `Max-Age=<non-zero-digit> 可选`

在 cookie 失效之前需要经过的秒数。秒数为 0 或 -1 将会使 cookie 直接过期。一些老的浏览器（ie6、ie7 和 ie8）不支持这个属性。对于其他浏览器来说，假如二者 （指 Expires 和Max-Age） 均存在，那么 Max-Age 优先级更高。

#### `Domain=<domain-value> 可选`

指定 cookie 可以送达的主机名。假如没有指定，那么默认值为当前文档访问地址中的主机部分（但是不包含子域名）。与之前的规范不同的是，域名之前的点号会被忽略。假如指定了域名，那么相当于各个子域名也包含在内了。

#### `Path=<path-value> 可选`

指定一个 URL 路径，这个路径必须出现在要请求的资源的路径中才可以发送 Cookie 首部。字符  %x2F ("/") 可以解释为文件目录分隔符，此目录的下级目录也满足匹配的条件（例如，如果 path=/docs，那么 "/docs", "/docs/Web/" 或者 "/docs/Web/HTTP" 都满足匹配的条件）。

#### `Secure 可选`

一个带有安全属性的 cookie 只有在请求使用SSL和HTTPS协议的时候才会被发送到服务器。然而，保密或敏感信息永远不要在 HTTP cookie 中存储或传输，因为整个机制从本质上来说都是不安全的，比如前述协议并不意味着所有的信息都是经过加密的。
注意：非安全站点（http:）已经不能再在 cookie 中设置 secure 指令了（在Chrome 52+ and Firefox 52+ 中新引入的限制）。

#### `HttpOnly 可选` 

设置了 HttpOnly 属性的 cookie 不能使用 JavaScript 经由  Document.cookie 属性、XMLHttpRequest 和  Request APIs 进行访问，以防范跨站脚本攻击（XSS (en-US)）。

#### `SameSite=Lax 可选 ` Lax 、Strict、None

允许服务器设定一则 cookie 不随着跨域请求一起发送，这样可以在一定程度上防范跨站请求伪造攻击（CSRF）。

### 会话期 cookie

会话期 cookies 将会在客户端关闭时被移除。 会话期 cookie 不设置 Expires 或 Max-Age 指令。注意浏览器通常支持会话恢复功能。

### 持久化 cookie

持久化 Cookie 不会在客户端关闭时失效，而是在特定的日期（Expires）或者经过一段特定的时间之后（Max-Age）才会失效。

`Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly`

### 非法域

属于特定域的 cookie，假如域名不能涵盖原始服务器的域名，那么应该被用户代理拒绝。下面这个 cookie 假如是被域名为 originalcompany.com 的服务器设置的，那么将会遭到用户代理的拒绝：

### Cookie 前缀

名称中包含 __Secure- 或 __Host- 前缀的 cookie，只可以应用在使用了安全连接（HTTPS）的域中，需要同时设置 secure 指令。另外，假如 cookie 以 __Host- 为前缀，那么 path 属性的值必须为 "/" （表示整个站点），且不能含有 domain 属性。对于不支持 cookie 前缀的客户端，无法保证这些附加的条件成立，所以 cookie 总是被接受的。

```
// 当响应来自于一个安全域（HTTPS）的时候，二者都可以被客户端接受
Set-Cookie: __Secure-ID=123; Secure; Domain=example.com
Set-Cookie: __Host-ID=123; Secure; Path=/

// 缺少 Secure 指令，会被拒绝
Set-Cookie: __Secure-id=1

// 缺少 Path=/ 指令，会被拒绝
Set-Cookie: __Host-id=1; Secure

// 由于设置了 domain 属性，会被拒绝
Set-Cookie: __Host-id=1; Secure; Path=/; domain=example.com
```

## using cookie

由于 http 是无状态的，所以通常使用 cookie 保存一部分信息，用于记录用户身份。当客户端访问时，会携带存储的 cookie ，让服务端知道是谁访问的。

### purposes

- Session management 会话管理

登录状态、购物状态、游戏商店或者其它服务端应该记录的信息

- Personalization 个性化

用户的偏好、主题或者其它相关设置

- Tracking 追踪

记录、分析用户行为


##### 参考链接

- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies