/**
 * 把n个骰子扔在地上，所有骰子朝上一面的点数之和为s。输入n，打印出s的所有可能的值出现的概率。
你需要用一个浮点数数组返回答案，其中第 i 个元素代表这 n 个骰子所能掷出的点数集合中第 i 小的那个的概率。
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/nge-tou-zi-de-dian-shu-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

示例 1:

输入: 1
输出: [0.16667,0.16667,0.16667,0.16667,0.16667,0.16667]

*/

/**
 * 解法1. 递归穷举所有情况（TLE）
 *  借助哈希表来存放每种情况对应的数值出现的次数
 */

/**
 * @param {number} n
 * @return {number[]}
 */
var twoSum = function(n) {
    const map = new Map()
    // 出现的总次数
    const totalTimes = Math.pow(6, n)
    inner(0, 1)

    const res = []
    for(const times of map.values()){
        res.push(times/ totalTimes)
    }
    return res;

    function inner(total, step){
        if(step > n){
            return map.set(total, map.has(total) ? map.get(total) + 1 : 1)
        }
        for(let i = 1; i<=6; ++i){
            inner(total + i, step + 1)
        }
    }
};


/**
 * 这种方法由于递归会有重复计算的问题，时间复杂度高达O(6^n)，
 * 题目要求 n 的大小范围是 [1, 11], 当 n=11 时，会 TLE
 */

/**
 * 解法2： 动态规划
 * dp 数组的含义： dp[i][j] 代表 i 枚筛子朝上一面达到j的总个数
 * 状态转移到方程是：
 * dp[i][j] = dp[i -1][j - 1] + dp[i-1][j-2] + dp[i-1][j-3] + dp[i-1][j-4] +
 * dp[i-1][j-5] + dp[i-1][j-6]
 */

var twoSum = function (n){
    const dp = new Array(n+1)
    for(let i = 1; i< n; ++i){
        dp[i] = new Array(6).fill(0)
    }

    for(let j =1; j<= 6; j++){
        dp[1][j] = 1
    }

    // 筛子个数
    for (let i = 2; i<=n ; i++){
        for(let j =i; j<=6; j++){
            // 状态转移
            for(let k =1; j-k > 0 && k<=6; ++k){
                dp[i][j] += dp[i-1][j - k]
            }
        }
    }

    let totalTimes = 6 ** n
    const ans = []
    for(let j =n; j<= n*6; ++j){
        ans.push(dp[n][j] / totalTimes)
    }
    return ans
}