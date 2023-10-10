/**
 * 整数拆分
 * 给定一个正整数 n，将其拆分为至少2个正整数的和，病逝这些整数的乘积最大化，
 * 返回你可以获得的最大乘积
 */

/***
 * 参考答案
 * 
 * 题目中 n 至少可以拆分为2个正整数的和，这个条件说明了 n 是大于 1 的整数，
 * 对于 7 来说，可以拆分成 3+4, 最大乘积是 12 
 * 对于 8 来说，可以拆成 3+3+2, 最大乘积是 18
 * 
 * 解法1：动态规划法
 * 状态数组 dp[i] 表示： 数字 i 拆分为至少2个正整数之和的最大乘积，为了方便计算，
 * dp的长度是 n+1, 初始化为 1
 * 
 * 显然 dp[2] 等于 1, 外层循环从 3 开始遍历，一直到 n 停止。内层循环 j 从 1 开始遍历
 * 一直到 i 之前停止。它代表着数字 i 可以拆分成 j + （i - j）
 * 但是 j * ( i - j) 不一定是最大乘积，因为 i-j 不一定大于 dp[i -j]
 * (数字 i-j 拆分成整数之和的最大乘积)，这里要选择最大的值作为 dp[i] 的结果
 * 
 * 空间复杂度 O(N) ，时间复杂度 O(N2)，代码如下
 */

var integerBreak = function(n){
    const dp = new Array(n + 1).fill(1)

    for(let i=3; i<=n; i++){
        for(let j =1; j<i; j++){
            dp[i] = Math.max(dp[i], j* (i -j), j * dp[i - j])
        }
    }

    return dp[n]
}


/**
 * 解法2：贪心法
 * 算法的整体思路是： 
 * 
 * n 除以 3 的结果为 a，余数 b
 * 当 b 为 0, 直接将 a个 3 相乘
 * 当 b 为 1, 将 （a - 1）个 3 相乘，再乘以 4
 * 当 b 为 2, 将 a个 3 相乘， 再乘以 2
 * 
 * 空间复杂度是 O（1），时间复杂度是 O（1），代码如下： 
 */

var integerBreak = function(n){
    if(n === 2) return 1;
    if(n === 3) return 2;
    const a = Math.floor(n/3)
    const b = n % 3

    if(b === 0) return 3**a
    if(b === 1) return 3**(a -1) * 4
    return 3**a * 2
}

var r = integerBreak(10)
console.log(r)
