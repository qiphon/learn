# jenkins [安装](https://pkg.jenkins.io/debian-stable/)

```bash
# 下载key
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -

# 然后将以下条目添加到/etc/apt/sources.list:
deb https://pkg.jenkins.io/debian binary/    # latest

#stable
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
deb https://pkg.jenkins.io/debian-stable binary/  #stable

# 安装Jenkins

sudo apt-get update
sudo apt-get install jenkins

```

## jenkin 插件管理

- NodeJS
- GitHub