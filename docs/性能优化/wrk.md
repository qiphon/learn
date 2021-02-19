# wrk 压测工具

### MAC下编译WRK

1. 下载编译安装luajit

    ```bash
    wget https://luajit.org/download/LuaJIT-2.0.5.tar.gz
    tar zxf LuaJIT-2.0.5.tar.gz
    cd LuaJIT-2.0.5
    make MACOSX_DEPLOYMENT_TARGET=10.14 
    sudo make install
    ```
2. 编译wrk

注意，如果编译过程中遇到环境变量中存在空格，先把带空格的那一项去掉