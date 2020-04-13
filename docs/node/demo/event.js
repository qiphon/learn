var events = require('events')
var eventEmitter = new events.EventEmitter()
// 绑定事件函数
var connectHandler = function () {
    console.log('connect事件被调用')
}
eventEmitter.on('connect', connectHandler)
// 触发事件
eventEmitter.emit('connect')

console.log('程序执行完毕')