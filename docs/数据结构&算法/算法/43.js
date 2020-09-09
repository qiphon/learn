// 完成一个转换函数，将数字转成对应的大写字母，满足下面的对应关系
// 1 => A
// 2 => B
// 3 => C
// ...
// 26 => Z
// 27 => AA
// 28 => AB
// 29 => AC
// ...
// 52 => AZ
// 53 => BA
// 54 => BB
// // 实现下方函数
function convert(num) {
    if (num === 0) return 0;
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let tmp = num;
    let res = ''
    while (tmp > 27) {
        if (tmp % 27) res = str[tmp % 27 - 1] + res
        // else res = 'Z' + res
        tmp = ~~(tmp / 27)
    }
    if (tmp > 0) res = str[tmp - 1] + res
    return res
}

// // 测试代码：
// const output1 = convert(1);
// console.log(output1); // A

const output2 = convert(26);
console.log(output2); // Z

const output3 = convert(53);
console.log(output3); // BA
// const output4 = convert(54);
// console.log(output4); // BB
const output5 = convert(702);
console.log(output5); // zz