# android studio 问题汇总

#### 下载代理

修改 `~/.gradle/gradle.properties` 

补充如下代理配置
```sh
systemProp.http.proxyHost=127.0.0.1
systemProp.https.proxyPort=7890
systemProp.https.proxyHost=127.0.0.1
systemProp.http.proxyPort=7890
```