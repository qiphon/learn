# k8s

- Kubernetes 因为首字母中间有 8 个字符，所以被写成 k8s
- k8s 是底层资源与容器间的一个抽象层，如果和单机架构类比，可以算作是一个分布式的时代的 linux 
- k8s 是 google 开源的容器集群管理系统。在 docker 技术的基础上，为容器化的应用提供部署运行、
资源调度、服务发现和动态伸缩等一系列完整功能，提高了大规模容器集群管理的便捷性

### 特点

- k8s 是一个管理容器的工具， 也是管理应用整个生命周期的一个工具，
从创建应用，应用的部署，应用提供服务，扩容缩容应用，应用更新，而且
可以做到故障自愈
- 可移植：支持公有云、私有云、混合云
- 可扩展：模块化、热插拔、可组合
- 自愈：自动替换、自动重启、自动复制、自动扩展

### 管理步奏

- 在 k8s 进行管理应用的时候，基本步奏是
    - 创建集群（k8s 是一个集群架构）
    - 部署应用
    - 发布应用
    - 扩展应用
    - 更新应用

### 架构结构

- 生态系统
- 接口层
- 管理层
- 应用层
- 核心层

```
            Ecosystem
        interface Layer: Client Libraries and Tools
        Governance Layer: Automation and policy Enforcement
        Application Layer: Deployment and Routing
         Nucleus: API AND Execution
-----------------------------------------------------------------
Contener |  Network  | Volume | Image   | Cloud    |  Identity
Runtime     plugin     Plugin   Registry  Provider    Provider

```

### 相关概念

- 主机（master）： 用于控制 k8s 节点的计算机。所有任务分配都来自于此
- 节点（node）： 执行请求和分配任务的计算机。由 k8s 主机负责对节点进行控制
- 容器集（Pod）：部署在单个节点上的，且包含一个或多个容器的容器组。同一容器集中的所有容器
共享同一个IP地址、ipc、主机名称及其它资源。容器集会将网络和存储从底层容器中抽象出来。
这样，您就能更加轻松地在集群中移动容器
- 复制控制器（replication controller）：用于控制应在集群某处运行的完全相同的容器集副本数据
- 服务（service）：服务可以将工作定义与容器集分离。k8s 服务代理会自动将服务请求分配到正确的容器
集 --- 无论这个容器集会移到集群中的哪个位置，即使它被替换
- kubelet：这是一个运行在节点上的服务，可以读取容器清单，确保指定的容器启动并运行
- kubectl：k8s 的命令行配置工具

### 安装 k8s

- 在 Linux 下安装单机版的集群环境
    - root 身份执行下列操作
    - 关闭防火墙
        - systemctl stop firewalld
        - systemctl disable firewalld
    - 安装 kubernetes 和依赖组件 etcd
        - `yum install -y etcd kubernetes`
    - 修改配置
        - Docker 配置文件 /etc/sysconfig/docker, 
        OPTIONS='--selinux-enabled=false --insecure-registry gcr.io'
        - kubernetes apiservice 配置文件 /etc/kubernetes/apiserver
        把--admission-control 参数中的 serviceAccount 删除
    - 按顺序执行服务
        - systemctl start etcd
        - systemctl start kube-apiserver
        - systemctl start kube-controller-manager
        - systemctl start kube-scheduler
        - systemctl start docker
        - systemctl start kubelet
        - systemctl start kube-proxy

### 相关资源
- [官网](https://kubernetes.io/)
- [chart应用仓库](https://hub.kubeapps.com/)
- [中文手册](https://www.kubernetes.org.cn/docs/)