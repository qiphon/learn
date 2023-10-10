/**

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

示例 1:

输入: 121
输出: true
示例 2:

输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
示例 3:

输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。


不能使用额外的空间来操作

提示， 如果你用字符串来解是不行的，因为不能使用额外的空间
你也可以反转整数，如果你之前已经做过 leetcode 7,你会知道反转后的数可能超过 int 最大值


参考答案：

不适用额外空间的意思，应该是不能使用 O（n）的额外空间（ex, array, string 之类的）
用一个 O（1）的变量是可以的，把传入的 x 整个反转后，跟原来的 x 比较是否一致

*/

var inPalindrome = function(x){
    if(x < 0 || x> Number.MAX_SAFE_INTEGER) return false;

    if(x < 10 ) return true;

    // 记录初始值
    var num = x
    // 个位
    var recNum = x % 10
    x = parseInt(x/10)

    while(x !== 0){
        recNum *= 10
        recNum += x%10
        x = parseInt(x / 10)
    }
    return recNum === num
}