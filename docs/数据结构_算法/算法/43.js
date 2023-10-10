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
// // 实现下方函数  错误
// function convert(num) {
//     if (num === 0) return 0;
//     const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     let tmp = num;
//     let res = ''
//     while (tmp > 26) {
//         if (tmp % 26) res = str[tmp % 26 - 1] + res
//         // else res = 'Z' + res
//         tmp = ~~(tmp / 26)
//     }
//     if (tmp > 0) res = str[tmp - 1] + res
//     return res
// }
// 正确
const str1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function convert(num, str = str1, startValue = '') {
    if (num === 0) return 0;
    const len = str.length
    let tmp = num;
    let res = startValue
    let count = tmp % len
    if (count) {
        res = str[count - 1] + res
        tmp = (tmp - count) / len
    } else {
        tmp = tmp / len - 1
        res = 'Z' + res
    }
    if (tmp === 0) return res;
    if (tmp <= len) return str[tmp - 1] + res
    else return convert(tmp, str, res)
}

// // 测试代码：
// const output1 = convert(1);
// console.log(output1); // A

// const output2 = convert(26);
// console.log(output2); // Z

// const output3 = convert(53);
// console.log(output3); // BA
// const output4 = convert(54);
// console.log(output4); // BB
const output5 = convert(702);
console.log(output5); // zz
const output51 = convert(703);
console.log(output51); // aaa
const output52 = convert(729);
console.log(output52); // aba
const output53 = convert(729 * 26);
console.log(output53); // aba
// const output6 = convert(52);
// console.log(output6); // az
// const output7 = convert(104);
// console.log(output7); // cz