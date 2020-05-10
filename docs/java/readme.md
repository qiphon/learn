# 配置java 环境

- 下载JavaSE11 （LTS）
https://download.csdn.net/download/qiphon3650/12405867

- 配置环境变量

```sh
vi /etc/profile
# java 
JAVA_HOME=/usr/lib/jvm/jdk-11.0.7/
PATH=$PATH:/usr/lib/jvm/jdk-11.0.7/bin

export JAVA_HOME PATH
# 保存退出后
source /etc/profile
# 之后就可以使用java了
java --version
```