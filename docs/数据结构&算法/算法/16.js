/**
 * 用2个栈实现队列
 * 
 * 用 2个栈来实现队列，完成队列的push 和 pop操作。队列中的元素为 int 类型。
 * 
 * 拓展思考： 用2个队列实现一个栈
 * 
 * 参考答案
 * 
 * 栈的特性是： 后入先出。根据题目提示， 使用 2 个栈即可。一个栈 inStack 用来
 * 存储队列中的数据，一个栈 outStack 用来从队列中取出数据
 * 
 * 算法为入队和出队过程：
 * outStack 不为空： 弹出元素
 * outStack 为空： 将inStack 元素依次弹出，放到outStack 中（在数据转移过程中，
 * 顺序已经从后入先出变成了先入先出）
 * 时间复杂度是O(n), 空间复杂度是 O(N)
 * 
 */

var CQueue = function(){
    this.inStack = []
    this.outStack = []
}

CQueue.prototype.appendTail = function(value){
    this.inStack.push(value)
}
CQueue.prototype.delHead = function(){
    const {
        inStack, outStack
    } = this
    if(outStack.length){
        return outStack.pop()
    }else {
        while(inStack.length){
            outStack.push(inStack.pop())
        }
        return outStack.pop() || -1
    }
}

/**
 * 拓展思考： 用2个队列实现一个栈
 * 类似的， 用2个队列也可以实现一个栈。但由于队列是先进先出，无论怎么倒换，
 * 都不可能逆序队列。所以处理思路不一样
 * 
 * 准备2个队列， q1 、q2.算法过程分为入栈和出栈
 * 入栈过程
 * q1 为空， 放入 q2
 * q2 为空放入 q1
 * 均为空， 默认放入 q1
 * 出栈过程
 * 
 * q1为空：
 * 依次取出 q2 中的元素（除了最后一个），并且放入 q1 中
 * 取出q2中最后一个元素，返回结果
 * q2 为空：
 * 依次取出 q1 中的元素（除了最后一个），并且放入到 q2 中
 * 取出 q1 中的最后一个元素，返回结果
 * 时间复杂度是 O(n), 空间复杂度是 O(n)
 */