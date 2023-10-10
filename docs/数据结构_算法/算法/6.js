/**
 * 字符串排列
 * 输入一个字符串，按字典顺序打印出该字符串中字符的所有排列。
 * 例如输入字符串 abc， 则打印出 a,b,c所能排列出的所有字符串 
 * abc, acb, bac, bca, cab, cba.
 * 
 * 
 * 思路：
 * 使用回溯法
 * - 记录一个字符（temp），用于存储当前当前需要进入排列的字符
 * - 记录一个字符串（current），用于记录当前已经排列好的字符
 * - 记录一个队列（queue），用于存储还未被排列的字符
 * 
 * 1. 每次排列将 temp 添加到 current
 * 2. 如果queue 为空，则本次排列完成，将 current 加入到结果数组中，结束递归
 *    如果queue 不为空，用于存储还未被排列的字符
 * 3. 递归排列 queue 中剩余的字符
 * 为了不影响后续排列，每次递归完成，将当前递归的字符 temp 加回队列
 */

// 记录temp
function Permutation(str){
    const result = []
    if(str){
        queue = str.split('')
        PermutationCore(queue, result)
    }
    result.sort()
    return [...new Set(result)]
}

function PermutationCore(queue, result, temp='', current=''){
    current += temp
    if(queue.length === 0){
        return result.push(current)
    }
    for( let i =0; i< queue.length; i++){
        temp = queue.shift()
        PermutationCore(queue, result, temp, current)
        queue.push(temp)
    }
}

// 记录当前索引，不断交换数组中的元素

function Permutation(str){
    var result = []
    if(!str){
        return result;
    }
    var array = str.split('')
    permutate(array, 0, result)
    result.sort()
    return [...new Set(result)]
}
function permutate(array, index, result){
    if(array.length - 1 === index){
        result.push(array.join(''))
    }
    for(let i = index; i<array.length; i++){
        swap(array, index, i)
        permutate(array, index + 1, result)
        swap(array, i, index)
    }
}