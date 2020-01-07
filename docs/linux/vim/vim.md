# vim 基本操作

特点：

- vi visual interface

- 可视化接口

- 类似与windows中的记事本

- vim 支持多级撤销

- 跨平台

- 语法高亮

- 支持图形界面

```sh

:w  # 保存

:q  # 推出

:!  # 强制保存

:ls  # 列出所有的文件

:n  # 下一个

:N  # 上一个

:15  # 跳到指定行

/xxx  #  从光标位置开始向后搜索 xxx 字符串

?xxx  # 从光标位置开始向前搜索

```

> vim 是一个功能强大的屏幕文本编辑器，是Linux/unix 上最常用的文本编辑器，他的作用是建立、编辑、显示文本文件
> vim没有菜单，只有命令
> vim 的三个模式 
> 1. 命令模式（键盘上的每个按键都是一个命令）；
> 2. 编辑模式（在命令模式下输入 ：即进入编辑模式）
> 3. 插入模式  （在命令模式下按 i ，即可进入插入模式）

1. 进入命令模式

> vi fileName

```
常用命令：
1. 插入模式
a   在光标所在字符后插入
A   在光标所在行行尾插入
i    在光标所在字符前插入
I    在光标所在行行首插入
0   在光标下插入新行
O   在光标上插入新行

2. 定位命令
:set nu   // 设置行号
:set nonu   // 取消行号
gg     // 到第一行
G      // 到第 最后一行
nG     // 到第n行
:n      // 到第n行
$       // 移至行尾
0        // 移至行首   这个是零

3. 删除命令
x    // 删除光标所在处字符
nx  // 删除光标所在处后 n个字符
dd   // 删除光标所在行    // ndd 删除  n行
dG   // 删除光标所在行到文件末尾的内容
D     // 删除光标所在处到行尾内容
:n1,n2d   // 删除指定范围的行

4. 复制和剪切命令

yy    复制当前行
nyy   复制当前行一下几行
dd     剪切当前行
ndd    剪切当前行一下n行
p        小写  粘贴所在行下
P         大写 粘贴所在行上

5. 替换和取消命令
r     替换光标所在处字符
R    从光标处开始替换字符，直到按Esc 才能退出替换模式
u     取消上一步操作

6. 搜索和替换命令
/string              // 搜索指定字符串，
                       //  搜索时忽略大小写   :set ic
n                // 搜索指定字符串的下一个出现位置
:%s/old/new/g       // 全文替换指定字符串
:n1,n2s/old/new/g          // 在一定范围内替换指定字符串
//   :9,10s/zoe/qiphon/g    // 把第9和第10行的zoe 替换成 qiphon

7. 保存退出命令
:w             // 保存修改
:w new_fileName   // 另存为指定文件
:wq            // 保存并退出
ZZ            // 快捷键，保存并退出
:q!            // 不保存修改退出
:wq!           // 保存修改并退出（文件所有者及root可使用）


```

2. 编辑模式

> 命令模式输入 ：即进入 编辑模式

```
// 比如 ，设置行号
:set nu  Enter
// 编辑模式输入完之后会进入命令模式
```


3. vim 常用技巧

```
// 导入别的文件到当前文件贯标位置
:r  fileName

// 查看命令位置
:!which 命令
// 例子   :!which ls

// 导入 命令执行的结果
:r !命令
// 例子
:r  !which ls
:r  !date

// 定义快捷键
:map 快捷键   触发命令

// 示例，添加注释的快捷键
:map ^_ 0i#<Esc>
// Ctrl + v + /   即可出现 ^_  ,这个时问号位置键    我们定义的快捷键时  CTRL + ？
// 后面时要执行的操作  0 到行首，i 前面插入 # 要插入的字符  <Esc>  相当于按 Esc
// 连续行注释
:n1,n2s/^/#/g      // 插入#  
:n1,n2s/^#//g      // 删除行首
:n1,n2s/^\/\//g     // 行首添加双 // 

// 定制快捷替换短语
:ab  mymail   qiphon@12.com
// 之后在编辑模式下 输入   mymail  按回车或空格就会补充后面的邮箱了

```
> vim 配置文件（.vimrc）位置
> /home/username/.vimrc      /root/.vimrc
