# [linux](www.linux.org) 基础知识

> Linux 诞生 1991/10/5 . Linux 存在着不同的Linux版本([ubuntu](http://www.ubuntu.org.cn/download/desktop) , redHat, [centOs](www.centos.org), Debain, fedora, suse, openSuSE, turboLinux, bluePoint, RedFlag, Xterm, slackWare等).

[linux内核](www.kernel.org)

1. 下载虚拟机 推荐VMware(win --> workstation Pro; mac --> Fusion) 

2. 常用命令

```
|---\  basic   基础命令
|
|---\  windows  windows 命令
|
|---\  appsInstall  软件安装
|
|---\  linux-start  按下开机键，Linux 做了什么？

```

## 操作系统概述

* 讲讲操作系统

    * 古老的操作系统
    * 更合适工作和娱乐的 windows
    * 适合开发的linux  （服务器标准 POSIX）
    * 非常好的 macOS  

- linux 推荐 
    - 服务器 centOS ubuntu
    - 桌面版 fedora ubuntu

centOS 和 fedora 都是 redhat 的发行版

### 远程登陆 linux 

- window 下
    - putty
    - Xshell
    - Cmder 环境下使用 ssh 命令

- linux 和 mac

    - ssh 命令

### 常用linux 命令

- 文件编辑  vi / vim
- 服务管理命令 systemctl  ( start stop status)
- 网络管理命令 
    - ifconfig(古老的命令) 、ip（现在使用）、
    - route（网络路由信息）、
    - ss -anp(查看打开的端口)、netstat -an ( | grep  筛选 )
    - 停用服务 kill [pid] 、 systermctl(推荐使用)  一般主进程的pid 会小
    - 下载命令 curl (很强大) 、 wget [url]( 方便 )
    - 查看linux 命令的帮助  man [ls] 、ls --help
    - 终端下 ctrl + s（锁住终端）后怎么办
        - ctrl + c 结束正在运行的程序
        - ctrl + d 结束输入或推出shell
        - ctrl + s 暂停屏幕输出
        - ctrl + q 恢复屏幕输出
        - ctrl + l 清屏
        - ctrl + a / ctrl + e 光标移动到行首或行尾

### linux 进程管理相关命令

- top 命令 查看内存占用
- ps aux  查看进程  （主要看 user pid command(系统的路径和启动参数，放在[]里面的一般是系统内核级进程，不要动)，pid 等于1 的进程是所有进程的基础进程）
- kill（kill 命令后面跟着的是 进程 pid）/pkill（pkill 后面跟着的是 服务名）  结束命令
- w (查看当前登陆的用户)，last (查看所有用户的登陆历史，-n 展示条数) 、lastb (登陆失败记录)

