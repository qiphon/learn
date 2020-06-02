/**
 * 最长字符串
 * 请从字符串中找出一个最长的，不包含重复字符的字符串，计算该最长字符串的长度。
 */

/**
 * 在不考虑时间的情况下，直接暴力法对所有字符串进行检查。复杂度是 O(n^3)
 * 
 * 解法1. 滑动窗口
 * 准备2个指针， i、j，i指向窗口左边，j指向右边。指针每次可以向前“滑动”一个位置，他们之间的区域就是窗口。
 * 整体流程：
 * 1. 准备哈希表 map，key 是 char， value 是Boolean，代表字符char是否出现在滑动窗口内
 * 2. i 和 j 初始化为 0，结果 ans 初始化为 0
 * 3. 检查 s[j] 是否出现过：
 *      没有出现过，扩大窗口；记录 s[j], 指针 j 向右滑动1格， 更新ans
 *      出现过，缩小窗口：指针 i 向右移动一格，map[s[i]] 更新为 false
 * 4. 如果 i 和 j 没有越界， 回到 step3， 否则返回 ans
 */

var lengthOfLongestSubstring = s => {
    const length = s.length;
    const map = {}
    let i = 0,
        j = 0,
        ans = 0;
    while(i<length && j<length){
        if(!map[s[j]]) {
            ans = Math.max(j - i + 1, ans)
            map[s[j]] = true
            ++j
        }else {
            map[s[i]] = false
            ++i
        }
    }
    return ans
}

/**
 * 由于整个过程是“推着”滑动窗口从左到右，时间复杂度是 O(n)，空间复杂度是 O(n)
 * 
 * 
 * 解法2
 * 在解法1的流程中，第三步，如果 s[j]出现在滑动窗口内，采用的方法是左边逐步缩小滑动窗口。
 * 事实上，不需要逐步缩小。假设滑动窗口内和 s[j] 相同字符的下标是 j'，那么直接跳过[i, j']范围即可
 * 
 * 为了做到“自动优化”，需要改造哈希表 map 的用法： key 还是 char， value 变为 int，记录 char 对应的下标。
 */

let lengthOfLongestSubstring2 = s => {
    const length = s.length
    const map = new Map()
    let i = 0,
        j = 0,
        ans = 0;
    while(i< length && j < length){
        let pos = map.get(s[j])
        if( pos >=i ){
            i = pos + 1
        }
        ans = Math.max(ans, j -i +1)
        map.set(s[j], j)
        ++j
    }
    return ans;
}


console.log(lengthOfLongestSubstring('sadkhsins'))