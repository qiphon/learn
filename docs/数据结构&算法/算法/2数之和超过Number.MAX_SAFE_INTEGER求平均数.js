/**
 * 两整之和可能超 Number.MAX_SAFE_INTEGER, 计算两个数的平均数
 * MAX_SAFE_INTEGER 表示在 JavaScript 中最大的安全整数。所谓的安全，就是大于这个数的整数不一定可以精确表示。值其实是 2^53 - 1
 * 不能使用BigInt
 */
function average(a, b) {
  // return a / 2 + b/2
  let stringA = a + "";
  let stringB = b + "";
  let lengthA = stringA.length;
  let lengthB = stringB.length;
  let res = "";
  let r = 0;
  // 求和
  while (lengthA > 0 || lengthB > 0) {
    lengthA--;
    lengthB--;
    let plus = (+stringA[lengthA] || 0) + (+stringB[lengthB] || 0) + r;
    res = (plus % 10) + res;
    if (plus >= 10) r = 1;
    else r = 0;
  }
  r = 0;
  // return +res;
  let result = "";
  for (let i = 0; i < res.length; i++) {
    let m = +res[i];
    if (m >= 2) {
      if (m % 2 === 0) {
        result += (m + r) / 2;
        r = 0;
      } else {
        result += (r + m - 1) / 2;
        r = 10;
      }
    } else if (m === 0) {
      result += r / 2;
      r = 0;
    } else {
      result += r / 2;
      r = 10;
    }
  }
  return +result + r / 20;
}
// console.log(Number.MAX_SAFE_INTEGER + '')
// console.log(Number.MAX_SAFE_INTEGER >= Number.MAX_SAFE_INTEGER )
console.log(average(1, 5));
console.log(average(1, 53));
console.log(average(10, Number.MAX_SAFE_INTEGER - 100));
console.log(average(100, Number.MAX_SAFE_INTEGER - 100));
