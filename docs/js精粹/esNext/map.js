// node --expose-gc map.js
const {GC , usedSize} = require('./gc.js') // './gc.js'

console.log(usedSize()); // 1 初始状态，执行gc()和memoryUsage()以后，heapUsed 值为 3.26M

var map = new Map();
var b = new Array(5 * 1024 * 1024 ).fill(1);

// var b2 = new Array(5 * 1024 * 1024 ).fill(1);   
map.set(b, 1);
// map.set(b, b2);


GC();
console.log(usedSize()); // 2 在 Map 中加入元素b，为一个 5*1024*1024 的数组后，heapUsed为43.32M左右

b = null;
GC();

console.log(usedSize());  // 43.32M
// 键和值都还在
console.log(map.values())
console.log(map.keys())  