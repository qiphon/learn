# jenkins [安装](https://pkg.jenkins.io/debian-stable/)

```bash
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins


# 启动Jenkins （Jenkins默认端口是8080，如果这个端口被占用请更改Jenkins端口）
systemctl start jenkins

# 密码未知
sudo less /var/lib/jenkins/secrets/initialAdminPassword

```

## jenkin 插件管理

- NodeJS
- GitHub


### 问题处理

- Jenkins 问题 No such plugin: cloudbees-folder

    解决方案：

    上面的错误显示是，安装插件 cloudbees-folder 失败，是因为下载的 Jenkins.war 里没有 cloudbees-folder 插件,需要去 https://updates.jenkins-ci.org/download/plugins/cloudbees-folder/ 下载一个插件
    访问 IP:PORT/restart，越过配置插件的页面，直接访问
    点击【系统管理】–【管理插件】–【高级】–【上传插件】，手动安装下载好的插件，重新访问 
