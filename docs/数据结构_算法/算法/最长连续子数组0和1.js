/*
 * 数组nums仅含有 0 和 1 两种元素 , 找到含有相同数量的 0 和 1 的最长连续子数组，并返回该子数组的长度。
 * nums[i] 不是 0 就是 1
 *
 * 示例
 * 输入: nums = [0,1]   输出: 2  说明: [0, 1] 是具有相同数量 0 和 1 的最长连续子数组。
 * 输入: nums = [0,1,0] 输出: 2  说明: [0, 1] (或 [1, 0]) 是具有相同数量0和1的最长连续子数组。
 */

// function findMaxLength(nums) {
//   let valueMap = {};
//   let plus = 0;
//   let len = 0;
//   nums.forEach((item, key) => {
//     plus += item ? item : -1;
//     if (plus === 0) len = key + 1;
//     // value -> key
//     if (valueMap[plus] >= 0) {
//       let newLen = key - valueMap[plus];
//       len = newLen > len ? newLen : len;
//     } else {
//       valueMap[plus] = key;
//     }
//   });

//   return len;
// }

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function (nums) {
  let total = nums.reduce((total, num) => total + num);
  for (let i = nums.length - 1; i > 0; i--) {
    if (i % 2 === 0) {
      total -= nums[i];
      continue;
    } else {
      if (total * 2 === i + 1) return i + 1;
      let new_total = total;
      for (let j = 0; j < nums.length - 1 - i; j++) {
        new_total = new_total - nums[j] + nums[i + 1 + j];
        if (new_total * 2 === i + 1) return i + 1;
      }
      total -= nums[i];
    }
  }
  return 0;
};

console.log(findMaxLength([0, 1, 0])); // 2
console.log(findMaxLength([1, 1, 0, 1, 0])); // 4
console.log(findMaxLength([1, 1, 1, 0, 1, 0, 1, 0, 0, 1])); // 8
