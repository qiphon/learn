/**
 * 链表中倒数第 k 个节点
 * 
 * 输入一个链表，输出该链表中倒数第 k 个节点
 */


/**
 * 参考答案：
 * 解法1： 2次循环
 * 因为要求链表倒数第 k 个节点，也就是求正数第 length - k 个节点
 * 
 * 整体过程如下：
 * 链表又是一个单链表，并且没有保存长度信息。所以需要循环一次计算出 length
 * 第二次循环找到第length - k 个节点
 * 时间复杂度 O（N），需要 2 次循环
 */

var getKthFromEnd = (head, k) => {
    let length = 0
    let node = head
    while(node){
        ++length
        node = node.next
    }

    if(k > length) return null

    node = head;
    let offset = length -k
    for(let i = 0; i<offset; i++){
        node = node.next
    }
    return node;
}

/**
 * 解法2： 快慢（双）指针
 * 准备2个指针、left（慢） 和 right（快）。整体过程如下
 * 
 * right 先向右移动 k 位，此时 index（right） - index（left） = k
 * left 和 right 一起向右移动，直到right 抵达边界，
 * 由于index（right）- index（left） = k， 所以
 * left指针就到达了倒数第 k 个位置
 * 
 * 时间复杂度 O(N),但是仅需要遍历一次，空间复杂度是 O（1）
 */

var getKthFromEnd = (head, k) => {
    let right = head
    for(let i = 0; i<k; ++i){
        if(right === null){
            return null 
        }
        right = right.next;
    }

    let left = head
    while(right){
        left = left.next;
        right = right.next;
    }

    return left;
}
