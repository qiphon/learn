/** 
 * 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

示例 1:

输入: num1 = "2", num2 = "3"
输出: "6"
示例 2:

输入: num1 = "123", num2 = "456"
输出: "56088"
说明：

num1 和 num2 的长度小于110。
num1 和 num2 只包含数字 0-9。
num1 和 num2 均不以零开头，除非是数字 0 本身。
不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/multiply-strings
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    if(num2 ==='0' || num1 ==='0') return '0'
    let up = 0
    let len1 = num1.length
    let len2 = num2.length
    let res = new Array(len1 + len2)
    for(let i=0; i< len1; i++){
        if(up > 0){
            res[len2 + i - 1] = up
        }
        up = 0
        for(let j = 0; j <len2; j++){
            if(i+j -len2 - len1-2 ===0 && up>0){
                res = res[j + i + 1] = up
            }else {
                let v = num1[len1 - i - 1] * num2[len2 - j - 1] 
                let caculateV = v + (res[i + j] || 0) + up
                res[i+j] = caculateV % 10
                up = (caculateV - res[j+i]) / 10
            }
        }
    }
    return up> 0 ? up + res.reverse().join('') : res.reverse().join('')
};

console.log(multiply('123', '456'))
console.log((123n * 456n))
console.log(multiply('9', '9'))
console.log((9n * 9n))
console.log(multiply('91234567890985432123456789', '91234567890987654323456789987654334567890'))
console.log((91234567890985432123456789n * 91234567890987654323456789987654334567890n))
console.log(multiply('1865459497823', '6349526719336'))
console.log((1865459497823n * 6349526719336n))
// 1865459497823 ＊ 6349526719336