# 我的LeetCode

1. 两数之和

```js

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * 60 ms	36.1 MB
 */
var twoSum = function(nums, target) {
    let obj ={}
    let arr = []
    nums.forEach((item, key)=>{ 
    if(key === 0) obj[target - item] = key
    else 
    if(obj[item] != undefined) return arr = [obj[item], key]
    else obj[target - item] = key
    })
    return arr
};

// 下面是人家执行 40ms 的内容，我复制之后运行时间为 60ms 不知道怎么回事,这个占用内存更少

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = {}
    const len = nums.length
    for(let i=0;i<len; i++){
        const targetNum = target - nums[i];
        if(targetNum in map) return [map[targetNum], i]
        map[nums[i]] = i
    }  
};

// 基础版
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let arr =[];
    let len = nums.length
    function setKey(...args) {
    arr= [...arr, ...args]
    }
    nums.forEach((item, key) => { 
    if(arr.length) return;
    // if(target === item ) setKey(key);
    else if (key < len - 1) {
        let last = target - item
        let index = nums.slice(key + 1).indexOf(last)
        index > -1 && setKey(key, index + key + 1)
    }
    })
    return arr
};

```

2. 两数相加


```js


// 基础实现版，152 ms	38.6 MB

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let upVal = 0
    function caculate(a, b) {
        let newVal = (a.val || 0) + (b.val || 0)+ upVal
        a.val = newVal % 10
        upVal = Math.floor(newVal / 10);
        if( a.next && b.next ) caculate(a.next, b.next)
        else if( a.next && !b.next ) caculate(a.next, {})
        else if( !a.next && b.next ) {
            a.next = {val: 0}
            caculate(a.next, b.next)
        }
        !a.next && upVal > 0 && ( a.next ={ val: upVal } )
        return a
    }
    return caculate(l1, l2)
};

// 下面是别人的代码，
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    var List = new ListNode(0);
    var head = List;
    var sum = 0;
    var carry = 0;

    while(l1!==null||l2!==null||sum>0){

        if(l1!==null){
            sum = sum + l1.val;
            l1 = l1.next;
        }
        if(l2!==null){
            sum = sum + l2.val;
            l2 = l2.next;
        }
        if(sum>=10){
            carry = 1;
            sum = sum - 10;
        }

        head.next = new ListNode(sum);
        head = head.next;

        sum = carry;
        carry = 0;

    }

    return List.next;
};

```