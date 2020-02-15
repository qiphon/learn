# lnmp 环境配置

- 更新系统

```sh
yum upgrade
yum update

```

- 安装 nginx

```sh

yum install nginx

# 修改配置文件
server {
        charset utf-8;
        client_max_body_size 128M;

        listen 80; ## listen for ipv4
        #listen [::]:80 default_server ipv6only=on; ## listen for ipv6

        server_name qiphon.cc;
        root        /www/basic/web;
        index       index.php;

        location / {
                # Redirect everything that isn't a real file to index.php
                try_files $uri $uri/ /index.php$is_args$args;
        }

        # uncomment to avoid processing of calls to non-existing static files by Yii
        #location ~ \.(js|css|png|jpg|gif|swf|ico|pdf|mov|fla|zip|rar)$ {
        #    try_files $uri =404;
        #}
        #error_page 404 /404.html;

        # deny accessing php files for the /assets directory
        location ~ ^/assets/.*\.php$ {
                deny all;
        }

        location ~ \.php$ {
                include fastcgi_params;
                fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
                fastcgi_pass 127.0.0.1:9000;
                #fastcgi_pass unix:/var/run/php5-fpm.sock;
                try_files $uri =404;
        }

        location ~* /\. {
                deny all;
        }
    }


```

- 安装 php 

```sh
yum install php 

# 有的会附带 php-fpm ,如果没有就单独下载 
yum install php-fpm

# 修改 /etc/php-fpm.d/www.conf
# 添加 
listen = 9000
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
systemctl start nginx

# 停止 
systemctl stop nginx

# 重启
systemctl restart nginx

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