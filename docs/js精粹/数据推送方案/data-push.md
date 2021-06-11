# 浏览器数据推送方案

1. ajax 轮询

2. websocket

3. [sse （SERVER SENT EVENT）](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource)

EventSource 是服务器推送的一个网络事件接口。一个EventSource实例会对HTTP服务开启一个持久化的连接，以text/event-stream 格式发送事件, 会一直保持开启直到被要求关闭。

一旦连接开启，来自服务端传入的消息会以事件的形式分发至你代码中。如果接收消息中有一个事件字段，触发的事件与事件字段的值相同。如果没有事件字段存在，则将触发通用事件。

与 WebSockets,不同的是，服务端推送是单向的。数据信息被单向从服务端到客户端分发. 当不需要以消息形式将数据从客户端发送到服务器时，这使它们成为绝佳的选择。例如，对于处理社交媒体状态更新，新闻提要或将数据传递到客户端存储机制（如IndexedDB或Web存储）之类的，EventSource无疑是一个有效方案。

```js
const source = new EventSource('http://localhost:3000')
source.onopen = () => {
  console.log('connected')
}
source.onerror = () => {
  console.log('error')
}
source.onmessage = (event) => {
  console.log('message', event.data)
}
```