# 前端工程化

1. [sonarqube](https://www.sonarqube.org/) 代码质量检查

- 需要 Java 环境 Java11

`rpm -qa | grep java` 查看已经装好的 Java，如果安装过旧包，要删除。（不必删除 .noarch 结尾的文件）

- [下载面向开发人员的](https://www.oracle.com/cn/java/) -> 
[LTS版本下载](https://www.oracle.com/java/technologies/)

```java
#  /etc/profile
#set java environment
JAVA_HOME=/usr/java/jdk1.7.0_79
JRE_HOME=/usr/java/jdk1.7.0_79/jre
CLASS_PATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib
PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
export JAVA_HOME JRE_HOME CLASS_PATH PATH

```


### CI/CD 持续集成（code-build-integrate-test）持续交付部署（deliver-deploy）

- CI 在持续集成环境中，开发人员将会频繁的提交代码到主干。这些新提交在最终合并到主线之前，都需要通过编译和自动化测试流程进行验证。
这样做都是基于之前持续集成过程中很重视自动化测试
    - 持续集成要求
        - 持续集成是通过平台串联各个开发环节，实现和沉淀工作自动化的方法
        - 线上代码和代码仓库不同步，影响迭代和团队协作
        - 静态资源发布依赖人工，浪费人力

- CD (continuous delivery) 持续交付
    - 

- CD（continuous deployment）持续部署
    - 如果我们想要更深入一步的话，就是持续部署了。通过这个方式，任何修改通过了



- 构建工具（webpack, gulp, rollup）

- 版本控制（gitlab, github,svn）

- 缺陷管理（trello、ambition、jira）

- 持续集成流程（Jenkins、TravisCI、cireleCI）

- 文档管理（showDoc、Markdown、jsDoc）

- 镜像管理（Harbor、Rancher）

- 容器技术（Docker、Dockerfile）
    - web容器（nginx、HTTPS、caddy、tomcat）

- 代码质量（lint、sonar）

### 从0开始

1. 统一代码仓库，通过分之管理合并到主干
    - trunk 线上分之 （基本不动）
    - branch 开发分支
    - tags 每次代码发布到主干都要打tags
2. 

### 前端工程化目标