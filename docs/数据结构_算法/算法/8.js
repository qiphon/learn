/**
 * 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。
 * 输入：s = "We are happy."
    输出："We%20are%20happy."
 * 要求： 不准使用正则和内置函数
 */


/**
 * 以为字符串是不可变的，所以如果直接采用从头到尾遍历原字符串检查空格，
 * 并做替换，那么每次检查到空格之后，都需要重新生产字符串。整个过程时间复杂度是O(n^2)
 * 优化的关键：提前计算替换后的字符串的长度，避免每次对字符串做改动。
 * 
 * 整体思路如下：
 * 1. 遍历原字符串，统计空格字符和非空格字符个数，计算替换后的字符串的长度
 * 2. 准备2个指针，指针i指向原字符串，指针 j 指向新字符串
 * 3. i 从头开始遍历原字符串
 *     - str[i]是非空格，那么将 i 指向的字符放入新字符串的 j 位置。 i 和 j 都增加 1
 *     - str[i]是空格，那么 j 指向的位置依次填入 %20， i 增加 1， j增加3
 * 时间复杂度是 O(n)。因为需要对新字符串开辟容器，空间复杂度是O(n)
 */

var replaceSpace = s =>{
    if(!s || !s.length) return '';
    let emptyNum = 0
    let chNum = 0
    for(let i =0; i<s.length; i++){
        if(s[i] === " "){
            ++emptyNum
        }else{
            ++chNum
        }
    }
    const length = emptyNum *2 + chNum
    const chs = new Array(length)
    for(let i=0, j=0; j<s.length; ++j){
        if(s[j] === ' '){
            chs[i++] = "%"
            chs[i++] = "2"
            chs[i++] = "0"
        }else{
            chs[i++] = s[j]
        }
    }
    return chs.join('')
}
