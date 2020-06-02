/**
 * 反转链表
 * 输入一个链表，反转链表后，输出新的链表的表头
 */

/**
 * 参考答案
 * 解法1： 借助栈
 * 借助栈的后入先出的顺序，可以将顺序列表逆序。不过这不是原地反转，当然题目也没有要求
 * 
 * 处理过程如下：
 * 从头到尾遍历链表， 将节点 val 依次放入栈
 * 从栈中依次取出 val， 构造新节点， 并连接节点
 * 
 * 时间复杂度 O(n), 空间复杂度 O（N）
 * */ 

var reverseList = head => {
    if(!head) return null;

    const stack = []
    let node = head;

    while(node){
        stack.push(node.val)
        node = node.next;
    }
    const newHead = {
        val: stack.pop(),
        next: null
    }

    node = newHead;
    while(stack.length){
        node.next = {
            val: stack.pop(),
            next: null
        }
        node = node.next
    }
    return newHead;
}

/**
 * 解法2： 原地反转
 * “原地反转”的思路简单，但是实现起来有一些细节需要处理。
 * 链表类的操作大部分是细节上容易出错，导致死循环或者报错
 * 
 * 准备当前节点 node 和 node 的前一个节点 preNode 
 * 整体思路如下
 * 保留当前节点的下一个节点
 * 将当前节点的 next 指向前一节点 prenode
 * 更新 prenode 为当前节点，更新当前节点为第一步保留的下一节点
 * 判断当前节点是否是最后节点，如果不是，回到第一步
 * 如果是，进入最后一步，把当前节点的 next 指向前一节点 prenode
 * 时间复杂度是 O（N）， 空间复杂度是 O（1）
 */
var reverseList = head =>{
    if(!head) return null;

    let node = head;
    let preNode = null;
    while(node.next){
        const nextNode = node.next;
        node.next = preNode
        preNode = node
        node = nextNode
    }
    node.next = preNode
    return node
}