# 循环语句

'''
while 判断条件:
    语句

for <variable> in <sequence> :
    <statement>
'''

# n = 100
# sum = 0
# counter = 1
# while counter <= n:
#     sum += counter
#     counter += 1

# print('sum: ', sum)

# print('=====================')

# while True:
#     # 将数字转为整型
#     num = int(input('请输入一个数字'))
#     print('你输入的内容为 %d' %(num))

# while 结合 else
# counter = 0
# while counter < 3 :
#     print(counter)
#     counter+=1
# else :
#     print('else cou' , counter)


# for 

# for a in [1,2,4,5] :
#     print('a is', a)

# range() 函数
# for a in range(0, 5) :
#     print('a is', a)
# for a in range(0, 5, 3) :
    # print('a is', a)  # 0 3

# break continue
n = 0
while True:
    n += 1
    if n > 5 :
        break
    elif not (n % 2): 
        continue
    print(n)