/**
 * 旋转数组的最小数字
 * 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
 * 输入一个非减排序的数组的一个旋转，输出旋转数组的最小元素。
 * 例如：数组（3,4,5,1,2）为 （1,2,3,4,5）的一个旋转该数组的最小值为1
 * ！！给出的所有元素都大于0，若数组大小为0，输出0
 */

function arr(arr){
    if(!arr || !arr.length) return 0;
    if(arr.length === 1) return arr[0]
    return getMin(arr)
}

function getMin(arr,min){
    min = arr[0]
    for(let i =1; i< arr.length; i++){
        if(arr[i] < min) min = arr[i]
    }
    return min
}

c = arr([3,4,5,6,1,2,3])
console.log(c)