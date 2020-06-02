/**
 *  调整数组顺序使奇数位于偶数前面
 *  输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。
示例：

输入：nums = [1,2,3,4]
输出：[1,3,2,4] 
注：[3,1,2,4] 也是正确的答案之一。
 

提示：

1 <= nums.length <= 50000
1 <= nums[i] <= 10000

 */


/**
 * 解法1. 开辟新空间
 * 此过程需要循环 2 次，时间复杂度O(N)， 空间复杂度 O(N)，
 * 过程如下：
 * 1. 第一次循环依次找到 偶数和奇数，并将其分别存放在新开辟的空间中
 * 2. 将偶数和奇数空间连接在一起
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function(nums) {
    // if(!nums.length) return []
    let odd = []
    let even = []
    while(nums.length){
        let val = nums.pop()
        val % 2 ? odd.push(val) : even.push(val)
    }
    while(even.length){
        let val = even.pop()
        odd.push(val)
    }
    return odd
};

/**
 * 解法2. 双指针交换
 * 可以利用“双指针”，分别指向数组头部的指针 odd， 和指向数组尾部的指针 even
 * 过程如下
 *  1. odd 向右移动，直到遇到偶数； even 从数组尾部向头部移动，直到遇到奇数
 *  2. 检查 odd 是否小于 even， 若小于， 交换2个元素
 *  3. 继续移动指针直到指针重合
 * 时间复杂度 O(N)，空间复杂度 O(1)
 */

var exchange = function(nums) {
    if(!nums.length) return []
    let odd = 0
    let even = nums.length - 1
    while(odd < even){
        let e = nums[even]
        let o = nums[odd]
        if( o % 2 ) odd++
        if( e % 2 === 0) even--
        if( !(o % 2) && (e % 2) ){
            nums[odd] = e
            nums[even] = o
            odd++
            even--
        }
    }
    return nums
};

console.log(exchange([1,2,3,4]))

/**
 * 拓展思考 基于插入排序思路
 * 如果题目中要求， 加上保证奇数和奇数，偶数和偶数之间的相对位置不变“ 这个条件，
 * 那么改如何解答
 * 
 * 这种思路和插入排序相似，时间复杂度 O(N^2), 空间复杂度 O(1)。这里时间复杂度主要浪费在
 * ”保持偶数和奇数相对位置不变“ 这个要求上
 * 
 * 整体思路：
 * 指针 i 从 0 开始向右移动，如果遇到奇数，继续移动， 遇到偶数停下来，并进入下一步
 * 设置新指针 j = i+1, 指针j向右移动， 遇到偶数继续移动，遇到奇数停下来，进入下一步
 * 将数组 【i， j-i】的元素整体向右移动 1 位， 然后将 j 上的元素赋值给 i上的元素
 * 检查是否遍历完成，未完成回到第一步继续
 */
function reOrderArray(array){
    const length = array.length

    if(!length){
        return []
    }

    let i = 0;
    while(i < length){
        if(!array[i] % 2){
            // 如果指针 i 对应的元素是偶数
            // 那么就需要找到其后出现的第一个奇数
            // 然后和指针 i 的元素进行交换
            let j = i + 1
            for(; j<length && array[j]%2 ===0 ; j++){
                if(j === length){
                    break
                }else {
                    // 整体右移，保证元素相对位置不变
                    const tmp = array[j]
                    for(let k = j; k> i; k--){
                        array[k] = array[k -1]
                    }
                    array[i] = tmp
                }
            }
        }
        i++
    }
    return array
}
