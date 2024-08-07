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

# deepin mysql
apt-get install mysql-server mysql-client php7.0-mysql

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

# 查看数据库运行端口
show variables like 'port';

````

- php-fpm 

Nginx和PHP-FPM的进程间通信有两种方式,一种是TCP,一种是UNIX Domain Socket.
其中TCP是IP加端口,可以跨服务器.而UNIX Domain Socket不经过网络,只能用于Nginx跟PHP-FPM都在同一服务器的场景.用哪种取决于你的PHP-FPM配置:
方式1:
php-fpm.conf: listen = 127.0.0.1:9000
nginx.conf: fastcgi_pass 127.0.0.1:9000;
方式2:
php-fpm.conf: listen = /tmp/php-fpm.sock
nginx.conf: fastcgi_pass unix:/tmp/php-fpm.sock;
其中php-fpm.sock是一个文件,由php-fpm生成,类型是srw-rw----.

UNIX Domain Socket可用于两个没有亲缘关系的进程,是目前广泛使用的IPC机制,比如X Window服务器和GUI程序之间就是通过UNIX Domain Socket通讯的.这种通信方式是发生在系统内核里而不会在网络里传播.UNIX Domain Socket和长连接都能避免频繁创建TCP短连接而导致TIME_WAIT连接过多的问题.对于进程间通讯的两个程序,UNIX Domain Socket的流程不会走到TCP那层,直接以文件形式,以stream socket通讯.如果是TCP Socket,则需要走到IP层,对于非同一台服务器上,TCP Socket走的就更多了.

```

UNIX Domain Socket:
Nginx <=> socket <=> PHP-FPM
TCP Socket(本地回环):
Nginx <=> socket <=> TCP/IP <=> socket <=> PHP-FPM
TCP Socket(Nginx和PHP-FPM位于不同服务器):
Nginx <=> socket <=> TCP/IP <=> 物理层 <=> 路由器 <=> 物理层 <=> TCP/IP <=> socket <=> PHP-FPM

像mysql命令行客户端连接mysqld服务也类似有这两种方式:
使用Unix Socket连接(默认):
mysql -uroot -p --protocol=socket --socket=/tmp/mysql.sock
使用TCP连接:
mysql -uroot -p --protocol=tcp --host=127.0.0.1 --port=3306

```

- Either GD PHP extension with freetype support or imageMagick php extension with png support is required

```sh
apt-get install php-gd

vi /etc/php/,,,,,,,,php.ini
# add extension
extension=gd.so


```


- Access denied for user 'root'@'localhost'  mysql

解决办法

```bash
# 方法1
$ sudo mysql -u root # I had to use "sudo" since is new installation

mysql> USE mysql;
mysql> UPDATE user SET plugin='mysql_native_password' WHERE User='root';
mysql> FLUSH PRIVILEGES;
mysql> exit;

$ service mysql restart


# 方法二
$ sudo mysql -u root # I had to use "sudo" since is new installation

mysql> USE mysql;
mysql> CREATE USER 'YOUR_SYSTEM_USER'@'localhost' IDENTIFIED BY '';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'YOUR_SYSTEM_USER'@'localhost';
mysql> UPDATE user SET plugin='auth_socket' WHERE User='YOUR_SYSTEM_USER';
mysql> FLUSH PRIVILEGES;
mysql> exit;

$ service mysql restart

```

Remember that if you use option #2 you'll have to connect to mysql as your system username (mysql -u YOUR_SYSTEM_USER)

Note: On some systems (e.g., Debian stretch) 'auth_socket' plugin is called 'unix_socket', so the corresponding SQL command should be: UPDATE user SET plugin='unix_socket' WHERE User='YOUR_SYSTEM_USER';
[本方法地址](https://stackoverflow.com/questions/39281594/error-1698-28000-access-denied-for-user-rootlocalhost)
如果上面那个socket 选错了，请看这里https://stackoverflow.com/questions/37879448/mysql-fails-on-mysql-error-1524-hy000-plugin-auth-socket-is-not-loaded