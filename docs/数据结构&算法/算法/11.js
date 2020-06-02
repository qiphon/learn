/**
 * 判断扑克牌的顺子
 * 从扑克牌中随机抽5张牌，判断是不是一个顺子，即这 5 张牌是不是连续的。
 * 2-10为数字本身，A为1， J 为 11， Q 为 12， K为 13，而大小王为 0，
 * 可以看成任意数字，A视为 14
 */

/**
 * 整体的算法流程
 * 1.首先对数组排序
 * 2. 排除数组中大小王
 * 3. 统计数组中所有相邻数之间的间隔
 * 4. 排除对子的情况，如果出现对子，那么肯定不可能是顺子（0 除外）
 * 5. 最后判读间隔值，如果小于于等于4，说明可以组成顺子
 */
const isStraight = function(nums){
    // 从小到大排序
    const minSort = nums.sort((a, b)=> a -b)
    let sum = 0;
    for(let i = 0; i<4; i++){
        if(minSort[i] == 0){
            continue
        }
        // 对子
        else if(nums[i] == nums[i + 1]){
            return false
        }else {
            sum += nums[i+1] - nums[i]
        }
    }
    return sum < 5
}