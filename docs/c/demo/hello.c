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