// node --expose-gc map.js
global.gc(); // 0 每次查询内存都先执行gc()再memoryUsage()，是为了确保垃圾回收，保证获取的内存使用状态准确

function usedSize() {
    const used = process.memoryUsage().heapUsed;
    return Math.round((used / 1024 / 1024) * 100) / 100 + "M";
}

console.log(usedSize()); // 1 初始状态，执行gc()和memoryUsage()以后，heapUsed 值为 3.26M

var map = new WeakMap();
var b = new Array(5 * 1024 * 1024 ).fill(1);

// map.set(b, 1);      // 使用这行可以和mapjs做对比，之后可以打开下一行，测试键被回收后值是不是被回收
var b2 = new Array(5 * 1024 * 1024 ).fill(1);   // 垃圾回收后还剩下值未被回收 43.32M
map.set(b, b2);

global.gc();
console.log(usedSize()); // 2 在 Map 中加入元素b，为一个 5*1024*1024 的数组后，heapUsed为43.32M左右

b = null;
global.gc();

console.log(usedSize());  // 3.32M