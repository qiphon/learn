# [字符串](https://www.runoob.com/python3/python3-string.html) (python 中没有字符类型)

```py
a = 'ss'
b = "dd"
c = """
多行字符串
多行字符串
多行字符串
"""

# 拼接字符串
a+ b + c

str = 'abcdefg'
# 字符串截取 [起始位置：结束位置]
print(str[:3] + '132' + str[3:])
# abc123abc
str[2:-1]
# 'cdef'

# 格式化字符串
'ABCDEFG%d' %(123) # ABCDEFG123
'ABCDEFG%s' %('abs') # ABCDEFGabs

'%x' %(17)   # '12' 将十进制转为 16 进制
"name: %s, age: %d" %('qiphon', 28) # 'name: qiphon, age: 28'

# %s 字符串格式化符号
# %d 有符号十进制整数格式化符号
# %f 浮点格式化符号

'''
python3 中的字符串编码都是 unicode 编码的，
python2 中是 ascii 编码的，
在python2中要注意转码问题，python3就不用担心了
'''
```

- python字符串格式化符号: 

|符 号|	描述|
|:--:|--|
%c |	 格式化字符及其ASCII码
%s |	 格式化字符串
%d |	 格式化整数
%u |	 格式化无符号整型
%o |	 格式化无符号八进制数
%x |	 格式化无符号十六进制数
%X |	 格式化无符号十六进制数（大写）
%f |	 格式化浮点数字，可指定小数点后的精度
%e |	 用科学计数法格式化浮点数
%E |	 作用同%e，用科学计数法格式化浮点数
%g |	 %f和%e的简写
%G |	 %f 和 %E 的简写
%p |	 用十六进制数格式化变量的地址

#### Python 访问字符串中的值
Python 不支持单字符类型，单字符在 Python 中也是作为一个字符串使用。

Python 访问子字符串，可以使用方括号 [] 来截取字符串，字符串的截取的语法格式如下：

`变量[头下标:尾下标]`

索引值以 0 为开始值，-1 为从末尾的开始位置。

索引方式   | index  |  index  |  index  |  index  |  index | index
|--|:--:|:--:|:--:|:--:|:--:|:--:|
从后面索引 |  -6    |  -5   |   -4   |  -3   |   -2   |  -1
从前面索引 |  0     |  1    |   2    |  3    |   4   |  5
  文字    |  R     | u     |  n     |  o    |   o    | b
从后面截取 | 1      |   2   |  3     |   4   |  5    |  6
从后面截取 | -5     |   -4  |  -3    |   -2  |  -1

```python
>>> a='runoob'
>>> print(a)
runoob
>>> print(type(a))
<class 'str'>
>>> a[:3]
'run'
>>> a[4:3]
''
>>> a[:6]
'runoob'
>>> a[:5]
'runoo'
>>> a[:-2]
'runo'
>>> a[:-5]
'r'
>>> a[:0]
''
>>> a[:-6]
''
>>> a[:-1]
'runoo'
>>> a[:6]
'runoob'
>>> a[:7]
'runoob'
>>> a[:5]
'runoo'
>>> a[:-1]
'runoo'
>>> a[:]
'runoob'
>>> a[0:]
'runoob'
>>> a[0]
'r'
>>> a[1]
'u'
>>> a[3]
'o'
>>> a[4]
'o'
>>> a[1:]
'unoob'
```

#### Python转义字符
在需要在字符中使用特殊字符时，python 用反斜杠 \ 转义字符。如下表：

```
转义字符       | 描述   |	实例
\(在行尾时)      续行符 |  
                            >>> print("line1 \
                            ... line2 \
                            ... line3")
                            line1 line2 line3
                            >>> 

\\   	     |  反斜杠符号 |	
                            >>> print("\\")
                            \
\'	            单引号	
                            >>> print('\'')
                            '

\"	            双引号	
                            >>> print("\"")
                            "

\a	            响铃	
                            >>> print("\a")执行后电脑有响声。

\b	            退格(Backspace)	
                            >>> print("Hello \b World!")
                            Hello World!

\000	        空	
                            >>> print("\000")

                            >>> 

\n      	    换行	
                            >>> print("\n")


                            >>>
\v	            纵向制表符	
                            >>> print("Hello \v World!")
                            Hello 
                                   World!
                            >>>
\t	            横向制表符	
                            >>> print("Hello \t World!")
                            Hello      World!
                            >>>

\r	            回车，将 \r 后面的内容移到字符串开头，
                并逐一替换开头部分的字符，直至将 \r 
                后面的内容完全替换完成。	
                            >>> print("Hello\rWorld!")
                            World!
                            >>> print('google runoob taobao\r123456')
                            123456 runoob taobao
\f	            换页	
                            >>> print("Hello \f World!")
                            Hello 
                                World!
                            >>> 

\yyy	        八进制数，y 代表 0~7 的字符，例如：\012 代表换行。	
                            >>> print("\110\145\154\154\157\40\127\157\162\154\144\41")
                            Hello World!

\xyy	        十六进制数，以 \x 开头，y 代表的字符，
                例如：\x0a 代表换行	
                            >>> print("\x48\x65\x6c\x6c\x6f\x20\x57\x6f\x72\x6c\x64\x21")
                            Hello World!

\other	        其它的字符以普通格式输出

```

#### Python字符串运算符
下表实例变量 a 值为字符串 "Hello"，b 变量值为 "Python"：

```
操作符	   描述	                  实例
+	      字符串连接  	          a + b 输出结果： HelloPython
*	      重复输出字符串           a*2 输出结果：HelloHello
[]	      通过索引获取字符串中字符	a[1] 输出结果 e
[ : ]	  截取字符串中的一部分，
          遵循左闭右开原则，
          str[0:2] 是不包含第 3 个字符的。	
                                a[1:4] 输出结果 ell
in	      成员运算符 - 
          如果字符串中包含给定的字符返回 True	
                                'H' in a 输出结果 True
not in	  成员运算符 - 
          如果字符串中不包含给定的字符返回 True	
                                'M' not in a 输出结果 True
r/R	      原始字符串 - 原始字符串：
          所有的字符串都是直接按照字面的意思来使用，没有转义特殊或不能打印的字符。 原始字符串除在字符串的第一个引号前加上字母 r（可以大小写）以外，与普通字符串有着几乎完全相同的语法。	
                                print( r'\n' )
                                print( R'\n' )   '\n'
```

#### 字符串内置方法

- `find(str[,start,end])` 