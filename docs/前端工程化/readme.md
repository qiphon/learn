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

- 构建工具（webpack, gulp, rollup）

- 版本控制（gitlab, github,svn）

- 缺陷管理（trello、ambition、jira）

- 持续集成流程（Jenkins、TravisCI、cireleCI）

- 文档管理（showDoc、Markdown、jsDoc）

- 镜像管理（Harbor、Rancher）

- 容器技术（Docker、Dockerfile）
    - web容器（nginx、HTTPS、caddy、tomcat）

- 代码质量（lint、sonar）