# [webRTC api](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/enumerateDevices)

## 实例方法

- enumerateDevices MediaDevices 的方法 enumerateDevices() 请求一个可用的媒体输入和输出设备的列表，例如麦克风，摄像机，耳机设备等。返回的 Promise 完成时，会带有一个描述设备的 MediaDeviceInfo 的数组。

- getSupportedConstraints MediaDevices 接口的 getSupportedConstraints() 方法返回一个基于 MediaTrackSupportedConstraints 的对象，其成员字段都是客户端（user agent）所支持的约束属性（如帧率，窗口大小）。

- 捕获屏幕 `getDisplayMedia` 这个 MediaDevices 接口的 getDisplayMedia() 方法提示用户去选择和授权捕获展示的内容或部分内容（如一个窗口）在一个MediaStream 里。然后，这个媒体流可以通过使用 MediaStream Recording API 被记录或者作为WebRTC 会话的一部分被传输。

- 获取音视频 `getUserMedia` MediaDevices.getUserMedia() 会提示用户给予使用媒体输入的许可，媒体输入会产生一个MediaStream，里面包含了请求的媒体类型的轨道。此流可以包含一个视频轨道（来自硬件或者虚拟视频源，比如相机、视频采集设备和屏幕共享服务等等）、一个音频轨道（同样来自硬件或虚拟音频源，比如麦克风、A/D 转换器等等），也可能是其他轨道类型。
