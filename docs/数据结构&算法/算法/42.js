/**

给你一个数组 nums 和一个值 val，你需要原地移除所有值等于 val 的元素，
并返回移除后数组的新长度

不要使用额外的数组空间，你必须使用 o（1）额外空间并原地修改输入数组。
元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素

示例1：
给定 nums = [3,2,2,3] val = 3;
函数应该返回新的长度 2,并且 nums 中的前 2 个元素均为 2,
你不需要考虑数组中超出新长度后面的元素。

示例1：
给定 nums = [0,1,2,2,3,0,4.2] val = 2;
返回长度 5, 返回的nums中前 5个元素为 0,1,3,0,4, 不需要考虑他们的顺序


说明:

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

// nums 是以“引用”方式传递的。也就是说，不对实参作任何拷贝
int len = removeElement(nums, val);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-element
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

*/

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
// var removeElement = function (nums, val) {
//     if (!nums.length) return 0;

//     let prev = 0;
//     let count = 0
//     for (let i = 0; i < nums.length; i++) {
//         if (val === nums[i]) {
//             nums[i] = null
//             nums[prev] !== null && (prev = i);
//         } else {
//             if (nums[prev] !== null) {
//                 prev++
//             } else {
//                 nums[prev] = nums[i]
//                 nums[i] = null
//                 prev++
//             }
//             count++
//         }
//     }
//     return count
// };

var removeElement = (nums, val) => {
    let len = nums.length
    if (!len) return len;
    // if(!nums.includes(val)) return len;

    let count = 0
    for (var i = 0; i < len; i++) {
        if (nums[i] !== val) {
            nums[count++] = nums[i]
        }
    }
}

var removeElement = function (nums, val) {
    let left = 0
    let right = nums.length - 1
    while (left <= right) {
        if (nums[left] === val) {
            nums[left] = nums[right--]
        } else {
            left++
        }
    }
    return left
};

// let nums = [3,2,2,3]
let nums = [0, 1, 2, 2, 3, 0, 4, 2]
const r = removeElement(nums, 2)
console.log(nums, r)