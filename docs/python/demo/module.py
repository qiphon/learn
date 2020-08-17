# 引入标准库
import sys
# 引用同级文件
# import m1
from m1 import hello

# m1.hello()
# hello()

# 引入下一级文件
# import modules.m2
from modules.m2 import t

# modules.m2.t()
t()
# 打印 模块中的方法
# import modules.m2
# print(dir(modules.m2))