/*
编译可执行程序：
gcc hello.c -o hello
执行可执行程序：
./hello

===========
编译wasm：
emcc hello.c -o hello.js
执行wasm的代码：
node hello.js

 */

#include <stdio.h>   //引入标准输入输出库

int main()
{
    printf("hello world!\n");    
    return 0;
}

