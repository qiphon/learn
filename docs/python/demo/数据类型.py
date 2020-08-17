#!/usr/bin/env python3


a = 10
b = 2.3
c = True
d = 3 + 4j  # 复数 j 复数单位
print(a, b, c, d)

# type() 函数，返回数据类型
print(
    type(a), '\n',
    type(b), '\n',
    type(c), '\n',
    type(d), '\n',
)

"""
10 2.3 True (3+4j)
<class 'int'> 
 <class 'float'> 
 <class 'bool'> 
 <class 'complex'> 
"""

a1 = 200
a = b = c = 1  # 多变量赋值
a, b, c = 1, 2.3, 'abc'

# 删除变量
del a
