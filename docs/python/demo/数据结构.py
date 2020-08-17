#!/usr/bin/env python3

# list = ['aa', 12, 3.3, True]
# list2 = ['cc']

# print(list)
# print(list[3])

# # 合并数组
# print(list + list2)

# # 修改下标值
# list[0] = 23

# # 替换区间中的内容
# list[1:3] = [11, 333, 444]

# print(list)

# '''
# list 写在方括号之间，元素用逗号隔开
# 和字符串一样，list 可以被索引和切片
# list 可以使用 + 操作符进行拼接
# list 中的元素是可以改变的
# '''


# tuple = ('abs', 123, 3.3, True, [1,2])
# tuple2 = ('gg')

# print(tuple)
# print(tuple[2])
# print(tuple[2:3])
# # print(tuple + tuple2) # 不能拼接
# print('-----------')
# print(tuple * 3) # 连续输出 3 次

# # tuple[1] = 2 # 值不能被修改
# # 元组中的 list 可以被修改
# tuple[-1].append(123)
# print(tuple)

# print(tuple.index(123))

# for a in tuple:
#     print(a)

# # 集合

# '''
# - 是一个无序不重复的序列
# - 基本功能是进行成员关系测试和删除重复元素
# - 可以使用打括号{} 或者 set() 函数创建集合
# - set() 函数只能传递一个参数，并且参数不能是 number
# - 内置方法'add', 'clear', 'copy', 'difference', 'difference_update', 'discard', 'intersection', 'intersection_update', 'isdisjoint', 'issubset', 'issuperset', 'pop', 'remove', 'symmetric_difference', 'symmetric_difference_update', 'union', 'update'
# '''

# set1 = {'tom', 'qiphon', 'zoe', 'tom'}
# set2 = set('qiphon')  # {'o', 'n', 'p', 'h', 'i', 'q'}
# set3 = {'qiphon', 'aa'}
# print(set1)
# print(set2)

# if 'tom' in set1:
#     print('tom in set1')
# else:
#     print('tom is not in set1')

# # 计算集合 差集(在set1 中去除 set3 中包含的值)
# print(set1 - set3)

# # 计算集合并集
# print(set1 | set3)

# # 计算集合 交集
# print(set3 & set1)

# # 计算集合 非集 （2个集合不包含的元素）
# print(set1 ^ set3)

# 字典
'''
- 字典是一种映射类型，字典用 {} 标识，它是一个无序的键值对集合
- 键必须是不可变类型
- 在同一个字典中，key 值必须是唯一的
- 内置方法 'clear', 'copy', 'fromkeys', 'get', 'items', 'keys', 'pop', 'popitem', 'setdefault', 'update', 'values'
'''

dict = {}
dict['key1'] = 1
dict['key2'] = 200
dict[3] = 'asb'

print(dict)
print(dict[3])