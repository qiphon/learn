# c 语言的基本知识

- 要学习写什么？

> c 用指针管理内存，内存管理和数据解构算法都离不开指针

1. 内存管理

2. 算法/数据结构



#### 语言发展

机器语言 -》 汇编语言 -》 FORTRAN 语言、Pascal语言（Delphi）、Basic语言（Visual Basic）、 C语言（C++ 、Java）

> c 最早始是编写Unix内核的，现在主要用于做底层开发和嵌入式等

#### c 与 JavaScript 的异同

c  | js
--|--|--|
c语言是编译型语言 | js 是解释性语言
c语言要借助编译器转换成可执行程序| js需要借助解释引擎运行


#### 配置环境

Windows |  Linux/unix  | Mac
--|--|--|--|--|--
visual C++/MingWin | gcc/g++  |  Xcode/gcc


### 编译软件

[nginx 为例](https://nginx.org/en/download.html),复制下载链接(pgp格式)

```sh

mkdir temp

cd temp  

wget -c https://nginx.org/download/nginx-1.16.1.tar.gz

tar -zvxf nginx-1.16.1.tar.gz

cd nginx-1.16.1   // 源代码都在这里的 src

// 当前目录下有configure

./configure    // 执行这个检查系统配置是否完善

// 如果执行之后当前目录出现 Makefile 这个文件，就可以执行编译了
make       // 开始编译

// 如果编译出错，需要重新编译 执行 ` make clean `, 删除之前的编译文件

// 编译后会在当前目录生成一个objs 文件夹，最终的可执行文件就在这个文件夹下的 nginx
make install    // 执行安装，之后文件就会被安装到指定位置了


```

### 敲一个hello world

```sh

// 安装 gcc， 如果没有  ， centOs下

yum install gcc

// 编译c++ 需要
yum install gcc-c++

// ubuntu 下安装
apt-get install gcc

// 编译c++ 安装
apt-get install g++


```

写一个c文件 hello.c

```c


/* 
    引入头文件，头文件里定义了一些必要的库  
    stdio   输入（标准输入--键盘）输出（标准输出--终端）库  
*/
#include <stdio.h> 

/**
    main 入口函数,程序在这开始执行，必须是main

    也可以写成 
    void main(){}

    int main(int argc, char const *argv[] ){
    int argc  // 参数的个数
    char const *argv[]  字符串数组

    \n  换行
    \r  回车

*/

int main(int argc, char const *argv[] ){
    printf("hello world! \n");
    return 0;
}

```


执行编译

```sh

gcc hello.c -o hello   // -o 后面接输出文件的名字

// 执行,即可打印
./hello    

```