/**
 * 把数组排成最小的数
 * 输入一个正整数数组，把数组里所有数字拼接起来排成一个数
 * 输出能拼接出的所有数字中最小的一个
 */


/**
 * 方法1： 暴力法
 * 暴力法是通过回溯得到所有可能的排列结果，然后从其中挑选出最小的数字。
 * 这种方法容易想到，虽然能得到正确的结果，但是时间复杂度过高
 */

var minNumber = nums => {
    const result = []
    permutation(nums, 0, result)

    result.sort((a, b)=>{
        if(a < b) return -1;
        else return 1
    })
    return result[0]
}

function permutation(nums, start, result){
    if(start === nums.length){
        result.push(nums.join(""))
        return;
    }
    for(let i = start; i < nums.length; ++i){
        [nums[i], nums[start]] = [nums[start], nums[i]]
        permutation(nums, start + 1, result)
        [nums[start], nums[i]] = [nums[i], nums[start]]
    }
}

// var r = minNumber([1,2,3])
// console.log(r)
// 待处理

/**
 * 方法2. 快速排序
 * 使用快速排序，可以将数字放在正确的位置上，从而满足题目的要求。例如对于数组 [3, 32] 来说，它有 2 种
 * 方法： 332、323。显然， 323 符合题目的要求。那么在排序的过程中，就应该比较 332 和 323, 然后
 * 返回正确的顺序
 * 在 js 中， 可以通过参数将自定义的 「排序依据」，作为函数传入 sort 中， 这个函数的逻辑是
 *     如果 a + b < b + a, 说明 ab 比 ba 小， a 应该在 b 前面， 反回 -1
 *     如果 a + b > b + a, 说明 ab 比 ba 大， a 应该在 b 后面， 返回 1
 *     如果相等 返回 0；
 */

var minNumber = nums => {
    nums.sort((a, b)=> {
        const s1 = a + '' + b
        const s2 = b + '' + a

        if(s1 < s2) return -1
        else return 1
    })
    return nums.join('')
}

// 时间复杂度是 O(NlogN), 空间复杂度是 O(1)

var r = minNumber([1,2,3,3])
console.log(r)