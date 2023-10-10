/**
 * 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
 * 最高位数字存放在数组的首位，数组中每个元素只存储单个数字。
 * 可以假设除了整数 0 之外，这个数不会以 0 开头
 * 
 * 示例
 * 输入 【1,2,3】
 * 输出 【1, 2, 4】
 * 输入数字表示 123
 * 
 * 输入 【4,3,2，1】
 * 输出 【4,3,2，2】
 * 输入数字表示 4321
 * 
 * 
 * 
 * 参考答案
 * 1. 数组最后1位是个位， 所以从后面开始读，个位数加一，如果有进位，
 * 存储进位值， val = 0; 没有进位直接存储
 * 2. 处理十位数，如果个位有进位， 十位加一，再次判断是否有进位
 * 3. 重复上面的动作
 */

var plusOne = digits => {
    var carry = 0 ;

    for(var i= digits.length - 1; i >=0 ; i++){
        // 目前位数 = 目前位数 + 是否进位
        digits[i] = digits[i] + carry

        // 如果是个位，+ 1
        if(i === digits.length - 1){
            digits[i] = digits[i] + 1
        }

        if(digits[i] === 10){
            digits[i] = 0
            carry = 1
        }else{
            carry = 0
        }
    }
    if(carry === 1){
        digits.unshift(carry)
    }
    return digits
}

// 代码 2： 借助 ES10 BigInt 特性实现
var plusOne = digits => {
    let num  = BigInt(digits.join(''))
    let string = String(num + 1n)
    let ary = string.split('')
    
    return ary.map(str => Number(str))
}