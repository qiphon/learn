# node 源代码如何阅读

1. 运行node代码

提bug 步骤，拉源码，修复问题，写测试用例，上传代码

```
git clone git@github.com:nodejs/node.git
cd node
./configure && make
make install
make test

```
- 源码分为 3类
    - 纯 JavaScript 写的核心模块
    - 带 nativeBinding 的JavaScript核心模块
    - c++ 文件 （c++ 跨平台对接）