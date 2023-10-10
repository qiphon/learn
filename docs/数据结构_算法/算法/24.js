/**
 * 同构字符串
 * 
 * 给定2个字符串 s 和 t ，判断他们是否是同构的。
 * 如果 s 中的字符可以被替换得到 t，那么两个字符串是同构的。
 * 所有出现的字符都必须用另一个字符替换，同时保留字符的顺序。
 * 两个字符不能映射到同一个字符上，但是字符可以映射自己本身
 *
 * 示例：
 *  输入：s = 'egg', t = 'add'
 *  输出：true
 * 
 *  输入：s = 'foo', t = 'bar'
 *  输出：false
 * 
 *  输入：s = 'paper', t = 'title'
 *  输出：true
 * 
 * 说明：
 *  可以假设 s 和 t 具有相同的长度
 */



/**
 * 参考答案
 * 2个字符串同构的含义是字符串 s 可以唯一的映射到 t， 同时 t 也可以唯一的映射到 s
 * 题目有点像映射到知识，2个字符串为2个集合，然后判断当前映射是否为单射
 * 
 * 需要 2个map，一个记录 s 对 t 的对应关系，另一个记录 t 对 s，如果字符没有在 s 中出现，
 * 加到map，出现过就跟 t 对比，不一致表示 非同构字
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    let mapS = {}
    let mapT = {}

    for(var i in s){
        var valueS = s[i]
        var valueT = t[i]

        if(!mapS[valueS]){
            mapS[valueS] = valueT
        }
        else if(mapS[valueS] != valueT){
            return false
        }

        if(!mapT[valueT]){
            mapT[valueT] = valueT
        }
        else if(mapT[valueT] != valueS){
            return false
        }
    }
    return true
};