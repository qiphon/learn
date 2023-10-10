/**
 * 给定两个数组，编写一个函数来计算他们的交集
 * 
 * 示例1：
 * 输入  nums1 = [1,2,2,1]  nums2 =[ 2,2 ]
 * 输出[2]
 * 
 * 示例1：
 * 输入  nums1 = [4,5,9]  nums2 =[ 9,4,9,8,4 ]
 * 输出[9, 4]
 * 
 * 
 * 参考答案：
 * 
 * 方法1：
 * 1. 先比较nums1 和 nums2 的长度，短的为 ary，长的为 store
 * 2. ary[i] 如果可以在 store 中找到值，表示这是交集的数字
 * 3. 判断结果数组[result] 是否已经有交集数字，如果没有就新增结果到 result 中，
 * 时间复查度为 O(m*n)
 */

var intersection = function(nums1, nums2){
    var result = []
    var store, ary;

    if(nums1.length > nums2.length){
        store = nums1
        ary = nums2
    }else {
        store = nums2
        ary = nums1
    }

    // 只需要跑较短的array就行
    for(var i =0; i < ary.length; i++){
        var value = ary[i]
        // 如果可以在 store 中找到该元素，在结果中找不到这个值
        // 就说明这个值不存在
        if(store.includes(value) && !result.includes(value)){
            result.push(value)
        }
    }
    return value
}

/**
 * 方法2：
 * 为了在线性时间内解决这个问题，我们使用了一个集合 set，
 * 该结构可以提供平均时间复杂度为O（1）
 * 
 * 将 2 个数组转化为集合，然后迭代较小的集合，检查其中每个元素
 * 是否在较大的集合中，平均状况下，这种方法的时间复查度为 O(n+m)
 */

var intersection = function(nums1, nums2){
    let arr = []
    if(nums2.length > nums1.length){
        for( let i=0; i< nums1.length; i++){
            if(nums2.includes(nums1[i])){
                arr.push(nums1[i])
            }
        }
    }else {
        for (let i=0; i< nums2.length; i++){
            if(nums1.includes(nums2[i])){
                arr.push(nums2[i])
            }
        }
    }
    return Array.from(new Set(arr))
}