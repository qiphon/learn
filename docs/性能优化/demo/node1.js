global.gc()


console.log('最初内存占用' ,process.memoryUsage())

// let map = new Map()

// let key = new Array(5*1024*1024)

// map.set(key, 1)
// global.gc()


// console.log('声明强引用', process.memoryUsage())


// let map = new Map()

// let key = new Array(5*1024*1024)

// map.set(key, 1)
// key = null
// global.gc()


// console.log('key 手动控制', process.memoryUsage())

// 优化
// let map = new Map()

// let key = new Array(5*1024*1024)

// map.set(key, 1)
// map.delete(key)
// key = null
// global.gc()


// console.log('key 手动控制', process.memoryUsage())


// 优化
// let map = new WeakMap()

// let key = new Array(5*1024*1024)

// map.set(key, 1)
// key = null
// global.gc()


// console.log('key 手动控制', process.memoryUsage())