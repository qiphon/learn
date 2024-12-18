# [webRTC](https://webrtc.org/?hl=zh-cn) 

- [source](https://webrtc.googlesource.com/src/)

面向网络的实时通信

借助 WebRTC，您可以为应用添加基于开放标准运行的实时通信功能。它支持在对等设备之间发送视频、语音和通用数据，使开发者能够构建强大的语音和视频通信解决方案。这项技术适用于所有现代浏览器以及所有主要平台的原生客户端。WebRTC 采用的技术是开放网络标准，以常规 JavaScript API 的形式在所有主流浏览器中提供。对于原生客户端（例如 Android 和 iOS 应用），可以使用具备相同功能的库。WebRTC 项目属于开源项目，受 Apple、Google、Microsoft 和 Mozilla 等公司支持。

用途：

WebRTC 有许多不同的用例，从使用摄像头或麦克风的基本 Web 应用，到更高级的视频通话应用和屏幕共享

## 协议

### [ICE](https://zh.wikipedia.org/zh-cn/%E4%BA%92%E5%8B%95%E5%BC%8F%E9%80%A3%E6%8E%A5%E5%BB%BA%E7%AB%8B)

交互式连接创建（Interactive Connectivity Establishment，ICE）是一个允许你的浏览器和对端浏览器建立连接的协议框架。在实际的网络当中，有很多原因能导致简单的从 A 端到 B 端直连不能如愿完成。这需要绕过阻止建立连接的防火墙，给你的设备分配一个唯一可见的地址（通常情况下我们的大部分设备没有一个固定的公网地址），如果路由器不允许主机直连，还得通过一台服务器转发数据。ICE 通过使用以下几种技术完成上述工作。

### [STUN](https://zh.wikipedia.org/wiki/STUN)
NAT 的会话穿越功能 Session Traversal Utilities for NAT (STUN) (缩略语的 最后一个字母是 NAT 的首字母) 是一个允许位于 NAT 后的客户端找出自己的公网地址，判断出路由器阻止直连的限制方法的协议。

客户端通过给公网的 STUN 服务器发送请求获得自己的公网地址信息（ip + 端口），以及是否能够被（穿过路由器）访问。

### [NAT](https://zh.wikipedia.org/wiki/%E7%BD%91%E7%BB%9C%E5%9C%B0%E5%9D%80%E8%BD%AC%E6%8D%A2)
网络地址转换协议 Network Address Translation (NAT) 用来给你的（私网）设备映射一个公网的 IP 地址的协议。一般情况下，路由器的 WAN 口有一个公网 IP，所有连接这个路由器 LAN 口的设备会分配一个私有网段的 IP 地址（例如 192.168.1.3）。私网设备的 IP 被映射成路由器的公网 IP 和唯一的端口，通过这种方式不需要为每一个私网设备分配不同的公网 IP，但是依然能被外网设备发现。

一些路由器严格地限定了谁能连接内网的设备。这种情况下，即使 STUN 服务器识别了该内网设备的公网 IP 和端口的映射，依然无法和这个内网设备建立连接。这种情况下就需要转向 TURN 协议。

### [TURN](https://zh.wikipedia.org/zh-cn/TURN)

一些路由器使用一种“对称型 NAT”的 NAT 模型。这意味着路由器只接受和对端先前建立的连接（就是下一次请求建立新的连接映射）。

NAT 的*中继*穿越方式 Traversal Using Relays around NAT (TURN) 通过 TURN 服务器中继所有数据的方式来绕过“对称型 NAT”。你需要在 TURN 服务器上创建一个连接，然后告诉所有对端设备发包到服务器上，TURN 服务器再把包转发给你。很显然这种方式是开销很大的，所以只有在没得选择的情况下采用。

### [SDP](https://zh.wikipedia.org/wiki/%E4%BC%9A%E8%AF%9D%E6%8F%8F%E8%BF%B0%E5%8D%8F%E8%AE%AE)
会话描述协议Session Description Protocol (SDP) 是一个描述多媒体连接内容的协议，例如分辨率，格式，编码，加密算法等。所以在数据传输时两端都能够理解彼此的数据。本质上，这些描述内容的元数据并不是媒体流本身。

从技术上讲，SDP 并不是一个真正的协议，而是一种数据格式，用于描述在设备之间共享媒体的连接。

#### 结构体
SDP 由一行或多行 UTF-8 文本组成，每行以一个字符的类型开头，后跟等号（“ =”），然后是包含值或描述的结构化文本，其格式取决于类型。以给定字母开头的文本行通常称为“字母行”。例如，提供媒体描述的行的类型为“m”，因此这些行称为“m 行”。

## API

- RTCPeerConnection

RTCPeerConnection 接口代表一个由本地计算机到远端的 WebRTC 连接。该接口提供了创建，保持，监控，关闭连接的方法的实现。

```js
// 兼容写法
var PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
var SessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
var GET_USER_MEDIA = navigator.getUserMedia ? "getUserMedia" :
                     navigator.mozGetUserMedia ? "mozGetUserMedia" :
                     navigator.webkitGetUserMedia ? "webkitGetUserMedia" : "getUserMedia";
var v = document.createElement("video");
var SRC_OBJECT = 'srcObject' in v ? "srcObject" :
                 'mozSrcObject' in v ? "mozSrcObject" :
                 'webkitSrcObject' in v ? "webkitSrcObject" : "srcObject";
```

- RTCSessionDescription
- RTCIceCandidate (en-US)
- RTCPeerConnectionIceEvent (en-US)
- MessageEvent
- MediaStream
- RTCStatsReport
- RTCIdentityEvent
- RTCIdentityErrorEvent
- MediaStreamEvent
- MediaStreamTrack
- MediaDevices

### 简介
 
WebRTC 标准概括介绍了两种不同的技术：*媒体捕获设备* 和 *点对点连接*。

- 媒体捕获设备包括摄像机和麦克风，还包括屏幕捕获设备。对于摄像头和麦克风，我们使用 navigator.mediaDevices.getUserMedia() 来捕获 MediaStreams。对于屏幕录制，我们改为使用 navigator.mediaDevices.getDisplayMedia()。

- 点对点连接由 RTCPeerConnection 接口处理。这是在 WebRTC 中两个对等方之间建立和控制连接的中心点。

### 创建链接的流程

当用户对另一个用户启动 WebRTC 调用时，将创建一个称为提议(offer) 的特定描述。该描述包括有关呼叫者建议的呼叫配置的所有信息。接收者然后用应答(answer) 进行响应，这是他们对呼叫结束的描述。以这种方式，两个设备彼此共享以便交换媒体数据所需的信息。该交换是使用交互式连接建立 (ICE)(ICE处理的，这是一种协议，即使两个设备通过网络地址转换 (NAT)。

- 呼叫者通过 navigator.mediaDevices.getUserMedia() 捕捉本地媒体。
- 呼叫者创建一个RTCPeerConnection 并调用 RTCPeerConnection.addTrack() (注： addStream 已经过时。)
- 呼叫者调用 RTCPeerConnection.createOffer() 来创建一个提议 (offer).
- 呼叫者调用 RTCPeerConnection.setLocalDescription() 将提议 (Offer) 设置为本地描述 (即，连接的本地描述).
- setLocalDescription() 之后，呼叫者请求 STUN 服务创建 ice 候选 (ice candidates)
- 呼叫者通过信令服务器将提议 (offer) 传递至 本次呼叫的预期的接受者。
- 接受者收到了提议 (offer) 并调用 RTCPeerConnection.setRemoteDescription() 将其记录为远程描述 (也就是连接的另一端的描述).
- 接受者做一些可能需要的步骤结束本次呼叫：捕获本地媒体，然后通过RTCPeerConnection.addTrack()添加到连接中。
- 接受者通过 RTCPeerConnection.createAnswer() 创建一个应答。
- 接受者调用 RTCPeerConnection.setLocalDescription() 将应答 (answer) 设置为本地描述。此时，接受者已经获知连接双方的配置了。
- 接受者通过信令服务器将应答传递到呼叫者。
- 呼叫者接受到应答。
- 呼叫者调用 RTCPeerConnection.setRemoteDescription() 将应答设定为远程描述。如此，呼叫者已经获知连接双方的配置了。

一般来说，使用 TCP 的 ICE 候选者只有当 UDP 不可用或被限制使其不适用于媒体流时才会被使用。不是所有的浏览器都支持 ICE over TCP。

[通信流程图](https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API/Connectivity#the_entire_exchange_in_a_complicated_diagram)


## 相关链接

- [各个浏览器错误上报记录](https://webrtc.org/support/bug-reporting?hl=zh-cn)
- [w3c](https://w3c.github.io/webrtc-pc/)
- [demos](https://webrtc.github.io/samples/)
- [mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API)
- [wiki 可以看浏览器兼容](https://zh.wikipedia.org/wiki/WebRTC)

## 其它

### 国内厂商

- [声网](https://www.shengwang.cn/)
- [即构](https://www.zego.im/)

### 必要步骤

- 媒体协商，使用 SDP  媒体协议
- 网络协商，candidate  网络
  - 获取ip地址
  - 通过信令服务器交换网络信息