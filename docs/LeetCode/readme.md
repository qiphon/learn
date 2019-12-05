# 我的LeetCode

1. 两数之和

```js

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * 60 ms	36.1 MB
 */
var twoSum = function(nums, target) {
    let obj ={}
    let arr = []
    nums.forEach((item, key)=>{ 
    if(key === 0) obj[target - item] = key
    else 
    if(obj[item] != undefined) return arr = [obj[item], key]
    else obj[target - item] = key
    })
    return arr
};

// 下面是人家执行 40ms 的内容，我复制之后运行时间为 60ms 不知道怎么回事

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = {}
    const len = nums.length
    for(let i=0;i<len; i++){
        const targetNum = target - nums[i];
        if(targetNum in map) return [map[targetNum], i]
        map[nums[i]] = i
    }  
};

```