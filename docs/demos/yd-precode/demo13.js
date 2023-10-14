// var allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;
// function cloneBuffer(buffer, isDeep) {
//     if (isDeep) {
//         return buffer.slice();
//     }
//     var length = buffer.length,
//         resut = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
//     buffer.copy(resut);
//     return resut;
// }
// var buf = Buffer.from("laoyuan");
// // var buf2 = buf;
// var buf2 = cloneBuffer(buf,true);
// buf2.write("nodejs");
// console.log("buf", buf.toString("utf-8"));
// console.log("buf2", buf2.toString("utf-8"));

// {
//     obj:Buffer.from("laoyuan")
// }

function cloneReg(target, isDeep) {
    var regFlag = /\w*$/;
    // target.constructor == Regexp
    const result = new target.constructor(target.source, regFlag.exec(target));
    if (isDeep) {
        result.lastIndex = target.lastIndex;
    }
    return result;
}
var regex = /yideng/g;
const reg2 = cloneReg(regex);
console.log(reg2);
