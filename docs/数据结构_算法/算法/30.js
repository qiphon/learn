/**
 * 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表
 * 你不能单纯改变节点内部的值，而是需要实际的进行节点交换
 * 
 * 示例：
 * 给定 1->2->3->4
 * 返回 2->1->4->3
 * 
 * 
 * 参考答案：
 * 
 * 题目要求不能改变节点里面的值
 * 1. 首先要弄一个不动的首节点 firstNode，后面节点移来移去才不会受影响
 * 2. 以[1,2,3,4]，一开始交换为 [1,2]，因此先存储 [3,4]，稍后再处理
 * 3. 存储后将 list 要处理的部分 [1,2]，跟不处理的部分 [3,4]切开，切开的同时
 * 让2 的next 指向 1
 * 4. 将前一个节点 prev 的 next指向 2,因为 2 的 next 已经指向 1,因此这边完成了
 * [1,2] -> [2,1] 的步骤
 * 5. 接下来把之前存储的 [3,4] 接到 [1] 后面，就可以继续处理 [3,4]
 */

var swapPairs = function(head) {
    var firstNode = new ListNode(0)

    firstNode.next = head

    var cur = head
    var prev = firstNode

    var nextKeep;  // 用来存储后面未处理的节点

    while(cur !== null && cur.next !==null){
        nextKeep = cur.next.next
        cur.next.next = cur
        prev.next = cur.next

        cur.next = nextKeep;

        prev = cur
        cur = cur.next
    }
    return firstNode.next
}