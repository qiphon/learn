# shell 基础知识

# 目录结构

```sh
---
|
|---  1. shell 变量
|
|---  2. 传递参数
|
|
|

```

> shell 是 C 语言编写的程序，是用户操作 Linux 的桥梁。shell 既是一种命令语言，又是一种程序设计语言。
为了避免同一套命令反复的认为操作的耗时，我们就可以使用 shell 编写好文件，每次执行指定文件即可，非常有利于我们的开发。

## shell 类型

Linux下常见的 shell 有：

- Bourne shell （/usr/bin 或 /bin/sh）

- Bourne Again Shell （/bin/bash）

- C Shell  (/usr/bin/csh)

- K Shell  (/usr/bin/ksh)

- Shell for Root  (/sbin/sh)

......

由于易用和免费，Bash在日常生活中被广泛使用。同时，Bash 也是大多数Linux 默认的 shell。

### shell 文件在不同文件系统下的区别

windows 下以 .bat 结尾， Mac os 或 Linux 下面一般为 .sh 结尾

```sh

windows  shell.bat

linux/mac os  shell.sh

```

第一个 shell 脚本

```sh 
#!/bin/bash
# #号表示注释， #! 是一个约定标记，它告诉系统这个脚本需要什么来执行，即使用的是哪种类型的shell
# echo 用于向窗口输出 文本 内容
echo "hello world"

```

### 运行 shell 的方法

1. 作为可执行程序

将 shell 代码保存为 .sh 结尾的文件，然后给这个文件添加执行权限 ，然后 shell 中输入 ./test.sh 就能执行这个文件了

```bash

chmod +x test.sh  # 给脚本执行权限

./test.sh  # 执行脚本

```

> 注意，这里一定要写成 ./test.sh ,而不是 test.sh 。运行其他二进制的程序也一样 ，如果直接写 test.sh ,linux 系统会去 path 里面找有没有交 test.sh 的，只有 在 /bin, /sbin, /usr/bin, /usr/sbin等在 path 里，才能执行。

2. 作为解释器参数

这种方式运行的脚本，不需要在第一行指定解释器信息, 写了也没用用

```sh

/bin/sh test.sh

/bin/php test.php

```

## shell 注释

```sh
# 单行注释，在每一行前面加 # 号

:<<EOF
这个是多行注释
EOF 是一个标志符号，可以用任何东西代替
EOF

:<<qiphon
    这个表示是我写的注释
qiphon

```