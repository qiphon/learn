/**
 * 查找缺失的数字
 * 一个长度为 n-1 的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围 0 - n-1 之内。
 * 在这个范围中的只有一个数字不在该数组中，请找出该数字
 */

/**
 * 利用二分法查找
 * left指向0， right指向最后一个元素
 * 计算出中间值 mid
 * 如果 mid = nums[mid], 说明[0, mid]范围内不缺数字，left 更新为mid + 1
 * 如果 mid < num[mid], 说明[mid, right] 范围内不缺数字， right 更新为 mid -1
 * 检查 left 是否小于等于 mid，若成立，就返回第 2 步；否则，向下执行
 * 返回 left 即可
 * 注意， 根据题意， 可知道 mid>nums[mid]这种情况不存在
 */

var missingNumber = nums =>{
    let left = 0,
        right = nums.length - 1;
    while(left <= right){
        let mid = Math.floor((left + right)/2)
        if(mid === nums[mid]){
            left = mid +1
        }else if(mid < nums[mid]){
            return right = mid -1
        }
    }
    return left
}