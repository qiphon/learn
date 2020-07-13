/*
编译命令：
g++ exam.cpp -o exam -Os -s EXPORTED_FUNCTIONS="['_getSqr','_getSqrt']"

自己写一个页面在浏览器中调用wasm.js文件中初始化好的wasm对象
 */

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

extern "C" {

    float getSqr(float num)
    {
        return num * num;
    }

    float getSqrt( float num )
    {
        return sqrt(num);
    }
}
