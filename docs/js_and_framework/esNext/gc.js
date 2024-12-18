const GC = global.gc; // 0 每次查询内存都先执行gc()再memoryUsage()，是为了确保垃圾回收，保证获取的内存使用状态准确

function usedSize() {
    const used = process.memoryUsage().heapUsed;
    const size =  Math.round((used / 1024 / 1024) * 100) / 100 + "M";
    console.log(size)
    return size
}



module.exports = {
    GC, usedSize
}