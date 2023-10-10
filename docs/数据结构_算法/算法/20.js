/**
 * 2个链表的公共节点
 * 输入2个链表，找出他们的第一个公共节点
 * 注意：
 * 如果2个链表没有公共节点，返回 null，
 * 在返回结果后，2个链表仍需保持原有的结构。
 * 可假定整个链表结构中没有循环
 * 程序尽量满足 O（N）时间复杂度，且仅用 O(1)内存
 * 
 * 
 * 
 * 参考答案：
 * 题目提示了，空间复杂度可降低到O(1)。可以使用快慢指针的思路来处理，
 * 整体思路如下：
 * 
 * 遍历得到2个链表的长度，以及长度差 diff
 * 将慢指针 slow 指向较长链表，快指针 fast 指向较短链表
 * slow 向前移动 diff 个距离
 * slow 和 fast 同时向前移动，每次移动一个距离。如果存在公共节点，
 * 他们一定会遇上
 * 
 * 时间复杂度 O(N), 空间复杂度 O(1)
 * 代码如下
 */

var getIntersectionNode = (headA, headB) => {
    let node = headA
    let lengthA = 0
    while(node){
        ++lengthA;
        node = node.next;
    }
    if(!lengthA) return null

    node = headB
    var lengthB = 0
    while(node){
        ++lengthB;
        node = node.next;
    }
    if(!lengthB) return null

    let diff =  0
    let slow;
    let fast;

    if(lengthB > lengthA){
        slow =headB
        fast = headA
        diff = lengthB - lengthA
    }else {
        slow = headA
        fast = headB
        diff = lengthA - lengthB
    }
    while(diff--){
        slow = slow.next
    }
    while(slow !== fast){
        slow = slow.next
        fast = fast.next
    }
    return slow;
}