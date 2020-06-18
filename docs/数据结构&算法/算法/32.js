/**
 * 请写一个函数，使其可以删除链表中给定的某个节点（非末尾）
 * 
 * 
 * 现有一个链表 head = [4, 5, 1, 9]，它可以表示为：
 * 4 -> 5 -> 1 -> 9
 * 
 * 示例1：
 * 输入： head = [4, 5, 1, 9], node = 5
 * 链表变为 4-> 1 -> 9
 * 
 * 示例2：
 * 输入： head = [4, 5, 1, 9], node = 1
 * 链表变为 4-> 5 -> 9
 * 
 * 说明： 
 * 链表至少包含2个节点，
 * 链表中所有节点的值都是唯一的
 * 给定的节点为非末尾节点并且一定是链表中的一个有效节点
 * 不要从你的函数中返回任何结果
 * 
 * 
 * 参考答案
 * 每个节点都有2个属性，value 与 next ，
 * 删除节点其实就是让连接的val 与 next 指向下一个节点
 */

var deleteNode = function (node) {
    node.val = node.next.val
    node.next = node.next.next
};

// 下面的是自己的误解

function ListNode(val) {
    this.val = val;
    this.next = null;
}

let head = {
    val: 4,
    next: {
        val: 5,
        next: {
            val: 1,
            next: {
                val: 9
            }
        }
    }
}

var deleteNode = function (node) {
    let r = null;
    let reversH = null
    if (node === head.val) {
        head = head.next
        return
    }
    while (head) {
        if (head.next.val === node) {
            addNodeToHead(head.val)
            r = head.next.next
            head = null
        } else {
            addNodeToHead(head.val)
            head = head.next
        }
    }
    while (reversH) {
        let c = new ListNode(reversH.val)
        c.next = r
        r = c
        reversH = reversH.next
    }
    function addNodeToHead(val) {
        let a = new ListNode(val)
        if (reversH) {
            a.next = reversH
        }
        reversH = a
    }
    head = r
};

deleteNode(5)

console.log(head)