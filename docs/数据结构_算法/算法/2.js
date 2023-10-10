/**
 * 斐波那契数列
 * 现要求输入一个整数n, 请输出斐波那契数列的第n项，（从 0 开始，第 0 项为 0）
 * fn(n) = fn(n-1) + fn(n - 2)
 */





 /**
  * 解题思路：
  * 1. 基本解法是递归，注意递归的缺陷
  * 2. 可以试试动态规划解法
  */



/**
 * 基本思路
 * 递归的本质是把一个问题分解成2个或多个小问题，如果小问题存在相互重叠的情况，那就存在重复计算， 
 * fn(n) = fn(n-1) + fn(n-2),这种拆分使用递归是典型的存在重叠的情况，所以会造成非常多的重复计算;
 * 另外，每一次函数调用在内存中都需要分配空间，每个进程的栈的容量都是有限的，递归层次过多，就会溢栈，
 * 递归是从最大数开始，不断拆解成小的数计算，如果不去考虑递归，我们只需要从小数开始算起，从底层往上不断累加就可以了
 */

//  1. 递归解法
function Fibonaccci(n){
    if(n<2){
        return n
    }
    return Fibonaccci(n-1) + Fibonaccci(n -2)
}

// 2. 递归加记忆化
// 使用一个数组缓存计算的值

function Fibonaccci(n, memory = []){
    if(n < 2){
        return n;
    }
    if(!memory[n]){
        memory[n] = Fibonaccci(n-1, memory) + Fibonaccci(n-2 , memory)
    }
    return memory[n]
}

// 3. 动态规划解法

function Fibonaccci(n){
    if(n<=1){
        return n;
    }
    let i = 1,
        pre = 0,
        current = 1,
        result =0;
    while(i++ < n){
        result = pre + current;
        pre = current
        current = result
    }
    return result
}