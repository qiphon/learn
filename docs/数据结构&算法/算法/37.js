/**
给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

说明:

初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
 
示例:

输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出: [1,2,2,3,5,6]

参考答案： 

1. 合并2个有序数组，就是归并排序的一步
2. 归并排序会开辟一个长度为nums1 + nums2的空间，用 2 个指针遍历2个数组，把小的放到新数组里
3. 这里 nums1 就是我们开辟的新数组，我们没有沿用归并排序的思路，用三个指针

从后开始遍历的好处
先比较大的数，把大的放到 nums1 后面
先从小的比较，需要把数组 nums1 的所有数往后挪一位，时间复杂度比较高

*/

const merge = (nums1, m, nums2, n){
    let index1 = m - 1,
        index2 = n -1,
        tail = m + n - 1;
    while(index2 >= 0 ){
        if(nums1[index1] > nums2[index2]){
            nums1[tail] = nums1[index1]
            index1 --
        }else {
            nums1[tail] = nums2[index2]
            index2--
        }
        tail--
    }
    return nums1
}