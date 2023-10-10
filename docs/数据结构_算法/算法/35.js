/**

输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。

序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。

示例 1：

输入：target = 9
输出：[[2,3,4],[4,5]]
示例 2：

输入：target = 15
输出：[[1,2,3,4,5],[4,5,6],[7,8]]
 

限制：

1 <= target <= 10^5

参考答案：

”双指针“的思路。
1. 指针是从第 0 个和第 1 个位置开始的 （下面称为 a 和 b）
2. 这里要计算指针范围内所有元素的和（题目要求是连续序列）
3. 每次移动 a、b 之前，都要计算一下当前范围内所有元素的和，
如果等于 s，打印并且 b 右移；如果小于 s， b 右移；如果大于 s，a 右移

至于为什么相等的时候 b 右移，而不是 a右移？因为 b 右移后，可能发生a右移，
如果直接a右移，那么肯定会有漏掉的情况

*/

var findContinuousSequence = function (target) {
    var a = 1;
    var b = 2;
    var sum = a + b;

    const res = []
    while(a !== b && b < target){
        if(sum === target){
            res.push(getSubSequence(a, b))
            ++b
            sum += b
        }else if (sum > target){
            sum -= a
            a++
        }else {
            ++b
            sum += b
        }
    }

    return res

}

function getSubSequence(start, end){
    const res = []
    while(start <= end){
        res.push(start++)
    }
    return res
}

var r = findContinuousSequence(9)

console.log(r)