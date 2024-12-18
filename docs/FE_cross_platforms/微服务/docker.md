# docker 


- docker 是一个开源的引擎，可以轻松的为任何应用创建一个轻量级的、可移植的、自给自足的容器。
开发者在笔记本上编译测试通过的容器可以批量地在生产环境中部署，包括 VMs（虚拟机）、bare metal、
openStack 集群和其它的基础应用平台
- Docker 通常用于一下场景
    - web 应用自动化打包发布
    - 自动化测试和持续集成、发布
    - 在服务环境中部署和调整数据库或其他的后台应用
    - 从头编译或者扩展现有的 openShift 或 cloud Foundry 平台来搭建自己的 paas 环境

### Docker VS VM

- vm
    - 运行在宿主机上的完整的操作系统
    - 运行自身操作系统会占用会占用较多的资源

- Docker (go 语言实现)
    - Docker 更加轻量和高效
    - 对系统资源的利用效率很高
    - 比虚拟机更轻便、快捷
    - 隔离效果不如 VM

```
          container                             VM
  App A  |  App B  |  App C  ...|   App A  |   App B   |   App C  ...
Bins/Libs|Bins/Libs|Bins/Libs...| Bins/Libs|  Bins/Libs| Bins/Libs...  
        Docker                  | Guest OS |  Guest OS | Guest OS...         
        HOST OS                 |           Hypervisor
----------------------------------------------------------------------
                         infrastructure

```

- docker 相关概念
    - Docker 是 CS 架构，主要有2个概念
    - Docker daemon:
        - 运行在宿主机上
        - Docker 守护进程
        - 用户通过 Docker client (Docker 命令) 与 Docker daemon 交互
    - Docker client
        - Docker 命令行工具，是用户使用 Docker 的主要方式
        - Docker client 与 Docker daemon 通信并将结果返回给用户
        - Docker client 也可以通过 socket 或者 RESTful API 访问远程的 Docker daemon

### docker file

```docer
FROM centos // 系统环境
MAINTAINER qiphon <sd@qq.com>  // docker hub 账号

RUN yum install gcc automake autoconf libtool make -y   // docker file 命令
RUN yum install zlib zlib-devel libffi-devel -y
RUN yum install wget -y
RUN wget https://www.python.org/ftp/python/3.7.0/Python-3.7.0.tgz
RUN tar -zxvf Python-3.7.0.tgz 
WORKDIR Python-3.7.0   // 切换工作目录 不能使用 RUN cd

RUN ./configure
RUN ls -al
RUN make && make install

CMD Python3 -m http.server   // 启动Python 服务，不能使用 RUN 

```

### docker 命令

```bash
# 查看所有容器
docker ps -a 

# 第一次启动 docker
docker run -d -p 9000:3000

# 第二次及以后
docker start

```