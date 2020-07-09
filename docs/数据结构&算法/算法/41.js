/**
 
给定一个数组，将数组中元素向右移动 k 个位置，其中 k 是非负数。

示例：

输入：[1,2,3,4,5,6,7] 和 k = 3
输出：[5,6,7,1,2,3,4]

输入：[-1,100,3,99] 和 k = 3
输出：[3,99,-1,100]


尽可能多的解决方案，至少3种不通的方法可以解决这个问题。
要求使用空间复杂度为 O（0）的原地算法

参考答案：
如果一个数组长度为 n，向右旋转 k 次，如果 k = n 就和没有旋转一样，
实际上要旋转的步数为 k % n

向右旋转 1 次，就是将数组最后面的元素搬到最前面，可以使用 js 的 array的pop()
可以取出最后一个元素，unshift 可以将这个元素插入到数组的前面，这个解法太简单了。

因此，不用这2种方法来解题。这边我们用一个暂存数组 tmp 存储向右旋转的元素，
需要旋转 k 次，tmp 里面就有几个元素。题目要求只能在一开始的 nums 数组内操作，
接下来就是把 nums 内没有被旋转的元素搬到 nums 后面接着将 nums 放到前面
 * 
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// var rotate = function (nums, k) {
//     let len = nums.length

//     k = k % len
//     if (k === 0) return nums;

//     let tmp = []
//     let times = k - 1 > len - k - 1 ? len - k - 1 : k - 1
//     for (let i = len - 1; i >= times; i--) {
//         tmp[len - 1 - i] = nums[i]
//         nums[i] = nums[i - k]
//     }
//     for (let i = 0; i < k; i++) {
//         nums[k - 1 - i] = tmp[i]
//     }

//     return nums
// };
/**
 * 方法二
 */
// var rotate = function (nums, k) {
//     if (!nums || nums.length < 2) return nums;
//     k = k % nums.length;
//     reverse(nums, 0, nums.length - 1);
//     reverse(nums, 0, k - 1);
//     reverse(nums, k, nums.length - 1);
//     return nums;
// };

// var reverse = function (arr, start, end) {
//     let mid = start + ((end - start) >> 1);
//     while (start <= mid) {
//         let temp = arr[end];
//         arr[end] = arr[start];
//         arr[start] = temp;
//         start++;
//         end--;
//     }
// }
/**
 * 声明一个指针，从数组0位置开始移动，每次移动距离为k
 * 把第一个节点移动到它下次出现的位置，并保存下个位置之前的值 prev
 * 指针再次移动 k ，将上次保存的值赋值给当前节点，保存当前节点的值到 prev
 * 再次重复上面的动作。。。
 */
// var rotate = function (nums, k) {
//     k = k % nums.length;
//     if (k === 0) return;

//     let count = 0;

//     for (let start = 0; count < nums.length; start++) {
//         let current = start;
//         let prev = nums[start];
//         do {
//             let next = (current + k) % nums.length;
//             let temp = nums[next];
//             nums[next] = prev;
//             prev = temp;
//             current = next;
//             count++;
//         } while (start != current);
//     }
//     return nums
// };


// var c = rotate([1, 2, 3, 4, 5, 6, 7], 3)
var c = rotate([-1,-100,3,99], 2)

console.log(c)