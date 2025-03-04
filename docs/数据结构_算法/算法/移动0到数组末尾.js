// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

/** 
 * 输入: [0,1,0,3,12]
输出: [1,3,12,0,0]

必须在原数组上操作，不能拷贝额外的数组。
尽量减少操作次数。
 * */ 

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    let l = 0
    // let r = nums.length -1
    for(let i=0; i< nums.length; i++){
        let v = nums[i]
        if(nums[l] !== 0) l++
        if(nums[l]=== 0 && v !== 0) {
            nums[l] = v
            nums[i] = 0
            l++
        }
    }
    // return nums
};

let nums = [0,1,2,0,2,0,0,0]
moveZeroes(nums)

console.log(nums)