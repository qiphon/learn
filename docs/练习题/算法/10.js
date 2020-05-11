/**
 * 数组统计
 * 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字，
 * 你可以假设数组是非空的，并且给定的数组总是存在多个元素
 * 
 * 题目分析
 * 题目假设很重要，数组非空，且一定存在多数的元素
 * 
 * 解法1： 哈希表统计次数
 * 借助哈希表，返回出现次数超过长度一半的数字
 * 
 * 注意， 这里使用 ES6 的 Map，不要使用json对象。因为json 对象的键存在着”隐式类型转换“，所有的键会转成字符串，
 * 从而导致不易排查的bug。
 */

var majorityElement = function(nums){
    const map = new Map()
    const length = nums.length

    nums.forEach(num => {
        const times = map.get(num)
        if(times){
            map.set(num, times + 1)
        }else {
            map.set(num, 1)
        }
    })

    for (const key of map.keys()){
        if(map.get(key) > length / 2){
            return key
        }
    }

    return 0;
}
var majorityElement = function(nums){
    const map = new Map()
    const length = nums.length

    for (let i=0; i< length; i++){
        const times = map.get(num)
        if(times > length / 2){
            return key
        }
        if(times){
            map.set(num, times + 1)
        }else {
            map.set(num, 1)
        }
    }

    return 0;
}

// 遍历 2次， 时间复杂度是 O(n)。哈希表存储次数，空间复杂度是 O(n)

/**
 * 解法2（推荐）： 摩尔投票算法
 * 题目说了，只可能有一个数字出现的次数超过数组长度的一半， 也就是说这个数字的出现总数比其它数组
 * 出现的次数还要多
 * 
 * 定义变量 result 和 times。第一次遍历原数组的时候：
 * 
 * times = 0， 那么 result = 当前元素， times 变为 1
 * times != 0， 那么 result != 当前元素， times -1
 * times != 0， 那么 result = 当前元素， times +1
 * 遍历完之后，result 的值就是数组中出现次数超过一半的数字了
 */

var majorityElement = nums =>{
    let times = 0;
    let result = 0;

    nums.forEach(num =>{
        if(times === 0){
            times = 1
            result = num
        }else if(num === result){
            times += 1
        }else {
            times -= 1
        }
    })

    return result
}

/**
 * 时间复杂度是 O(n), 空间复杂度 O(1), 比解法1 更优
 * 题目已经假设了一定存在多数的元素，不需要二次遍历进行确定
 * 
 * 
 * 拓展思考
 * 如果题目假设的数组中一定存在数目大于一半的元素， 例如[1,2,3].此时还需要遍历一遍，统计一下 result 出现的次数。
 */