/**
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次可以爬 1- 2个楼梯。你有多少种不同的方法可以爬到楼顶呢？
 * 
 * 给定的 n 一定是正整数
 * 
 * 示例： 
 * 输入： 2
 * 输出： 2
 * 
 * 示例： 
 * 输入： 3
 * 输出： 3
 * 
 * 
 * 参考答案：
 * 
 * 1. n = 1, result = 1
 * 2. n = 2, result = 1 + 1 (爬1阶2次 + 一次爬 2阶)
 * 3. n = 3, result = 1 + 2 (前面2个case 相加)
 * 4. n = 4, result = 3 + 2 (前面2个case 相加)
 * 其实这就是斐波那契数列
 */

var climbStairs = n => {
    if(n = 1){
        return 1
    }

    var prev = 1;
    var cur = 1;

    // 斐波那契数列 f(n) = f(n -1) + f(n-2)
    for(var i = 2; i<= n; i++){
        var temp = cur
        cur = cur + prev
        prev = temp
    }
    return cur
}