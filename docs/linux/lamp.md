# lamp 环境配置

- 更新系统

```sh
yum upgrade
yum update

```

- 安装 apache

```sh

yum install httpd

# 修改配置文件 /etc/httpd/conf/httpd.conf
# 把 路径 /var/www  改成自己需要的路径，我这里是 /www

# 修改文件  /etc/httpd/conf.d/welcome.conf,注释掉所有文件
# 写入如下内容
<VirtualHost *:80>
        DocumentRoot  /www
        ServerName    qiphon.cent
        <Directory /usr/share/httpd/noindex>
                Options Indexes FollowSymLinks
                AllowOverride None
                Require all granted
        </Directory>
</VirtualHost>

# 检查apache 语法
# Syntax OK (出现这个表示没有问题)
httpd -t

```

- 安装 php 

```sh
yum install php

```

- 创建 项目目录 ，更改目录用户为apache

```sh
cd /
mkdir www
chown -R apache:apache /www 
cd www
touch index.html
touch index.php
```
- 启动 apache 

```sh
# 启动
apachectl start

# 停止 
apachectl stop

# 重启
apachectl restart

```

- 安装 mysql

```sh
yum install mysql mariadb-server 

# 启动数据库，配置开机启动
systemctl start mariadb.service

systemctl enable mariadb.service

# 配置 mysql
mysql_secure_installation

# Enter current password for root (enter for none): Enter (第一次直接enter，以后需要输入密码)
# Set root password? [Y/n]: Y
# New password: <your-password>
# Re-enter new password: <your-password>
# Remove anonymous users? [Y/n]: Y
# Disallow root login remotely? [Y/n]: Y
# Remove test database and access to it? [Y/n]: Y
# Reload privilege tables now? [Y/n]: Y

# 登陆 mysql
mysql -u root -p

````