// 在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

// 示例:

// 现有矩阵 matrix 如下：

// [
//   [1,   4,  7, 11, 15],
//   [2,   5,  8, 12, 19],
//   [3,   6,  9, 16, 22],
//   [10, 13, 14, 17, 24],
//   [18, 21, 23, 26, 30]
// ]
// 给定 target = 5，返回 true。

// 给定 target = 20，返回 false。

// 限制：
// 0 <= n <= 1000
// 0 <= m <= 1000
// 力扣 https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/


/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// var findNumberIn2DArray = function(matrix, target) {
//     if(!matrix.length) return false;
//     var 
//         x= 0,
//         y= 0,
//         ylen= matrix.length,
//         xlen= matrix[0].length
    
//     for(y = 0; y< ylen; y++ ){
//         // if(testX(matrix[y])){
//         //     return true;
//         // }
//         if( xlen <0) return false
//         if( y === 0 && testX(matrix[y]) ) return true
//         else if(y !== 0 && testX2(matrix[y]) ) return true;
//     }
//     // function testY()
//     function testX(arr){
//         for(x = 0; x< xlen; x++ ){
//             if(matrix[y][x] === target){
//                 return true;
//             }
//             if(matrix[y][x] > target){
//                 xlen = x 
//                 return ;
//             }
//         }
//     }
//     function testX2(arr){
//         for(x = xlen-1; x>=0; x-- ){
//             console.log(matrix[y][x])
//             if(matrix[y][x] === target){
//                 return true;
//             }
//             if(matrix[y][x] < target){
//                 xlen = x + 1
//                 return false;
//             }
//         }
//     }
//     return false
// };

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
    if(!matrix.length) return false;
    var 
        x= 0,
        y= 0,
        ylen= matrix.length,
        xlen= matrix[0].length
    
    for(y = 0; y< ylen; y++ ){
        for(x = xlen-1; x>=0; x-- ){
            if(matrix[y][x] === target){
                return true;
            }
            if(matrix[y][x] < target){
                xlen = x + 1
                break;
            }
        }
    }
    return false
};

// c = findNumberIn2DArray(
//     [
//         [1],
//         [3],
//         [5],
//     ], 5
// )

// c = findNumberIn2DArray(
//     [
//         [1,4,7,11,15],
//         [2,5,8,12,19],
//         [3,6,9,16,22],
//         [10,13,14,17,24],
//         [18,21,23,26,30]
//     ],5)
c = findNumberIn2DArray(
    [
        [1,4,7,11,15],
        [2,5,8,12,19],
        [3,6,9,16,22],
        [10,13,14,17,24],
        [18,21,23,26,30]]
,20)



console.log(222, c)

/**
 * 解题提示
 * 可直接利用左下角的数开始查找
 * 大于：比较上移
 * 小于：比较右移
 */

var findNumberIn2DArray = function(matrix, target) {
    if(!matrix.length) return false;
    var 
        x= 0,
        y= 0,
        ylen= matrix.length,
        xlen= matrix[0].length
    
    for(y = ylen-1; y>=0; y-- ){
        for(x = 0; x< xlen; x++ ){
            let t = matrix[y][x]
            if(t === target){
                return true;
            }
            if(t > target){
                break;
            }
        }
    }
    return false
};

// 优化
var findNumberIn2DArray = function(matrix, target) {
    if(!matrix.length) return false;
    var 
        x= 0,
        y= 0,
        startX = 0,
        ylen= matrix.length,
        xlen= matrix[0].length
    
    for(y = ylen-1; y>=0; y-- ){
        for(x = startX; x< xlen; x++ ){
            let t = matrix[y][x]
            if(t === target){
                return true;
            }
            if(t > target){
                startX = x 
                break;
            }
        }
    }
    return false
};