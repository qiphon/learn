/**
 * 检查高度
 * 
 * 学校在拍年级照时，一般要求学生按照非递减的高度顺序排列。
 * 请你返回能让所有学生以非递减高度排列的最小必要移动人数
 * 注意，当一组学生被选中时，他们之间可以以任何可能的方式重新排序，
 * 而未被选中的学生应该保持不动
 * 
 * 示例
 * 输入： heights = [1,1,4,2,1,3]
 * 输出 3
 * 
 * 输入： heights = [5, 1, 2 ,3, 4]
 * 输出 5
 * 
 * 输入： heights = [1,2, 3, 4, 5]
 * 输出 0
 * 
 * 提示： 
 * 1 <= heights.length <= 100
 * 1 <= heights[i] <= 100
 * 
 * 
 * 
 * 参考答案：
 * 
 * 思路1.
 * 对原来的数组进行排序，排序完成后，与原始数组中的元素对比，
 * 遇到不同的元素 count++， 最后返回 count
 * 比较排序， 时间复杂度最低也有 O(NlogN)
 * 
 * 
 */

var heightChecker = function(heights){
    let old = [...heights]
    let newArr = heights.sort((a, b)=> a -b)

    let count = 0
    for (var i =0; i< heights.length; i ++){
        if(old[i] !== newArr[i] ){
            count ++
        }
    }
    return count
}

/**
 * 思路2. 
 * 首先，我们并不关心排序后的结果，我们想知道的只是在该位置上，与最小的值是否一致
 * 题目中已经明确了值的范围是 1<= height[i] <= 100
 * 这是一个在固定范围内的输入，比如输入： [1, 1, 4,2,1, 3]
 * 输入中有3个 1 ， 1个 2, 1个3, 1个4, 3个1 肯定在最前面依次类推
 * 所以，我们需要的仅仅只是计数而已
 * 
 * 时间复杂度 O(N), 技计数过程为 O(N), 比较过程外层循环次数固定为 100
 * 里层循环一共也只会执行 n 次， O(100+n) 即 O(n)
 */

var heightChecker = function(heights){
    // 初始化桶
    let arr = new Array(101).fill(0)
    // for(let i=0; i< arr.length; i++){
    //     arr[i] = 0
    // }
    // 遍历桶
    for(let i =0; i<heights.length; i++){
        arr[heights[i]] ++
    }

    let count = 0
    for(let i =1, j =0; i< arr.length; i++){
        while(arr[i]-- > 0){
            // 从桶中取出元素时，元素的顺序是非递减
            // 然后与heights 中的元素比较，如果不同计数器就加 1
            if(heights[j++] != i){
                count++
            }
        }
    }
    return count
}