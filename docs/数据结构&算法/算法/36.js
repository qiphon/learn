/**
 请实现 copyRandomList 函数，复制一个复杂链表。
 在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，
 还有一个 random 指针指向链表中的任意节点或者 null。

示例 1：

输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]

示例 2：

输入：head = [[1,1],[2,1]]
输出：[[1,1],[2,1]]

示例 3：

输入：head = [[3,null],[3,0],[3,null]]
输出：[[3,null],[3,0],[3,null]]
示例 4：

输入：head = []
输出：[]
解释：给定的链表为空（空指针），因此返回 null。

提示：

-10000 <= Node.val <= 10000
Node.random 为空（null）或指向链表中的节点。
节点数目不超过 1000 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/


/**
 * 参考答案： 
 * 用一个 hash 表表示映射关系： 键是原节点，值是复制的节点
 * 
 * 整体算法流程是：
 * 
 * 第一次遍历，复制每个节点和 next 指针，并且保存 ”原节点-复制节点“ 的映射关系
 * 第二次遍历，获得节点对应的复制节点，更新 radom 指针
 * 
 * 代码实现：
 * 使用 ES6 的Map，可以直接将对象作为键值
 * 
 */

function Node(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
};

var copyRandomList = function (head) {
    if (!head) return null
    const map = new Map()
    let node = head
    const newHead = new Node(node.val)
    let newNode = newHead;

    map.set(node, newNode)

    while(node.next){
        newNode.next = new Node(node.next.val)
        node = node.next
        newNode = newNode.next;
        map.set(node, newNode)
    }

    newNode = newHead
    node = head
    while(newNode){
        newNode.random = map.get(node.random)
        newNode = newNode.next
        node = node.next
    }
    return newHead
}