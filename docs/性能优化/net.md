# 性能优化 - 网络篇

### http 流程 简化版

- 输入网址并回车
- 域名解析
- 浏览器发送http请求
- 服务器处理http请求
- 服务器返回 HTML 响应
- 浏览器处理 HTML 页面
- 继续请求其他资源

### 网络处理流程 [navigation timing](https://www.w3.org/TR/navigation-timing/)

> 根据navigation timing 我们可以优化我们的服务

![navigation timing](../imgs/timing-overview.png)

- 浏览器
    - prompt for unload    navigationStart  ->  redirectStart
    - redirect & unload (并行)   redirectEnd -> fetchStart 
    - app cache            domainLookupStart   

- 网络
    - dns                  domainLookupEnd -> connectStart
    - TCP(secureConnectionStart)  connectEnd -> requestStart     (刚开始发送时速度快，之后会慢下来)
    - request               responseStart
    - response              responseEnd -> domLoading

- 浏览器
    - processing (domInteractive->domContentLoaded)    domComplete --> loadEventStart
    - onLoad                loadEventEnd   


### 域名解析

- SOA （StartOf Authority）起始授权记录：一个区域库只能有一个SOA记录并且必须放在第一条
- A   普通映射 IPv4
- AAAA IPv6 专用
- CNAME  别名 创建域名引用 -> 指向到另一个域名
- NS  用于返回下一级域名信息的服务器地址
- MX  用于设置邮箱服务器

### dns 解析

```
                           RootServer  (.com/.cn/.org)
                        ↙
client  --------->  dns <-- TLD server (qifeng.com/qifeng.cn)
                        ↖ 
                           NameServer  (www.qifeng.com/www.qifeng.cn)
                    

```

### CDN 资源分布式分发      

服务器可以分流，但是流量出入口也有带宽瓶颈

- ISP 信息提供商（Internet Service Provider）

### TCP

```
     接收数据端                       DATA       数据发送端                     功能                                TCP、IP协议族
    应用层     ↑                   AH+DATA       ↓ 应用层        ---->  文件传输、电子邮件、文件服务、虚拟终端           TFTP、HTTP、SNMP、FTP、SMTP、DNS、Telnet
    表示层     ↑  解            PH+AH+DATA    封  ↓ 表示层        ---->  数据格式化、代码转换、数据加密
    会话层     ↑  封         SH+PH+AH+DATA    装  ↓ 会话层        ---->  接触或建立与别的接点的联系
    传输层     ↑          TH+SH+PH+AH+DATA       ↓ 传输层        ---->  提供端对端的接口                              TCP、UDP
    网络层     ↑       NH+TH+SH+PH+AH+DATA       ↓ 网络层        ---->  为数据包选择路由                              IP、ICMP、RIP、OSPF、BGP、IGMP
    数据链路层 ↑    DT+NH+TH+SH+PH+AH+DATA+DT     ↓ 数据链路层    ---->  传输有地址的帧以及错误检测功能                   SLIP、CSLIP、PPP、ARP、RARP、MTU
    物理层    <------  比特流     <------         ↓ 物理层        ---->  以二进制形式在物理媒体上传输数据                 ISO2001、IEEE802、IEEE802.2

```


slip 协议，2位校验码可以查看数据是否被翻转

- TCP 协议头 20个字节
    - sourcePort （0/1） 、 destinationPort（2/3）
    - Sequence Number （4-7） 顺序号（请求号+1）
    - Acknowledgement Number （8/12） 应答号
    - Offset（13 附加信息）、Reserved（）、C E U A P R S F
    - CheckSum（校验）

### 服务器握手

- 3 次握手
- 为什么是 3 次握手
- 4 次挥手
- 为什么是 4 次挥手

```
                client                       server
      SYN_SENT     |   -------------------->    |
      (connect())  |   SYN seq=x                |   listen(listen())    listen / connect 函数：套接字函数  socket
                   |                            |
        established|  <-- --- ---- ----- ---    |  syn_rcvd
握手建立            |       SYN seq=y, ACK=X+1   |
                   |          ------------->    |
                   |  ACK=y+1                   |  established
                   |                            |
        -----------------------------------------------------
        write()    |          ------------->    |
                   |      seq=x+1 ACK=y+1       |
                   |                            |   read()
 传输               |  <-- --- ---- ----- ---    |  
                   |          ACK=x+1           |
        -----------------------------------------------------       
        FIN_WAIT_1 |          ------------->    |
        close()    |   FIN seq=x+n+1 ACK=y+n    |  CLOSE_WAIT
                   |                            |
                   |                            |
 挥手    FIN_WAIT_2 |  <-- --- ---- ----- ---    |  
                   |      ACK x+n+2             |  LAST ACK 
                   |                            |  close()
                   |  <-- --- ---- ----- ---    |  (服务器收尾工作完成后才能断开)
       TIME_WAIT   |      FIN seq=y+n+1         |
                   |                            |
                   |          ------------->    |
                        ACK=y+n+2

# 四次挥手： 客户端需要断开时，发送断开指令到服务器。服务器收到断开指令后会立即返回一条收到断开请求的指令。
#          服务端开始断开连接的收尾工作（处理未完成的业务，释放协议资源）之后发送请求到客户端——> 说可以断开了， 客户端收到之后返回断开连接响应

```

- 单工通信 数据只能单方向流动

- 半双工    数据可以双向流动，同时只能执行一个方向

- 全双工   数据双向流动，可以同时双向传输