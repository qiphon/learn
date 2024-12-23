/**
 * 给你一个长度为 n 的整数数组，请你判断在 最多 改变 1 个元素的情况下，该数组能否变成一个非递减数列。

我们是这样定义一个非递减数列的： 对于数组中所有的 i (0 <= i <= n-2)，总满足 nums[i] <= nums[i + 1]。

示例 1:

输入: nums = [4,2,3]
输出: true
解释: 你可以通过把第一个4变成1来使得它成为一个非递减数列。
示例 2:

输入: nums = [4,2,1]
输出: false
解释: 你不能在只改变一个元素的情况下将其变为非递减数列。
 

说明：

1 <= n <= 10 ^ 4
- 10 ^ 5 <= nums[i] <= 10 ^ 5

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/non-decreasing-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 * @param {number[]} nums
 * @return {boolean}
 */
// var checkPossibility = function(nums) {
//     if(nums.length< 3) return true;
//     let times=0
//     let min = 0
//     for(let i=1; i< nums.length ; i++){
//         if(nums[i] >= nums[min]){
//             min = i 
//             continue
//         }else {
//             if( min>0 && nums[i]>= nums[min -1]){
//                 min = i
//             }
//             else if(min > 0 && nums[i - 1] >= nums[min - 1]){
//                 min = i - 1
//             }
//             else if( min === 0 && i === 1){
//                 min = nums[i] > nums[min] ? min : i
//             }
//             else{
//                 return false
//             }
//             // i++
//             times++
//         }
//         if(times > 1) return false
//     }
//     return true
// };

// console.log(checkPossibility([4,2,1]))
// console.log(checkPossibility([4,2,3]))
// console.log(checkPossibility([5,7,1,8]))
// console.log(checkPossibility([3,4,2,3]))
console.log(checkPossibility([1,4,1,2]))


/**
 * @param {number[]} nums
 * @return {boolean}
 */
function checkPossibility(nums) {
    var flag = 0;
    // 要么是i太大，要么是i+1
    for(var i = 0; i < nums.length-1; i++) {
        // 找到不符合的数字
        if (nums[i] > nums[i+1]) {
            // 如果 i-1 和 i+1 是升序排列，此时缩小 i 的值
            if (i == 0 || nums[i-1] <= nums[i+1]) {
                nums[i] = nums[i+1];
            } else if (nums[i-1] > nums[i+1]) {
                nums[i+1] = nums[i];
            }
            flag++;
            if (flag > 1) {
                return false;
            }
            
        }
    }
    return true;
};