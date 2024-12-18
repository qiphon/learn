//强制触发GC
function strToArray(str) {
    var i = 0,
        len = str.length,
        arr = new Uint16Array(str.length);
    for (; i < len; ++i) {
        arr[i] = str.charCodeAt(i);
    }
    return arr;
}

var i = 0,
    str = 'V8 is the coolest',
    arr = [];

while (i++ < 1e6) {
    strToArray(str);
    if (i % 100000 === 0) {
        // 数组里面存放大对象 huge object
        arr.push(new Uint16Array(100000000));
        // 5% 概率释放数组
        Math.random() > 0.95 && (arr.length = 0);
    }
}