# mac 下 PHP环境的搭建

1. apache 启动与停止

> mac 下apache环境默认是有的， 启动命令 ``` sudo apachectl start ```, 停止命令 ``` sudo apachectl stop ```, 
重启apache ``` sudo apachectl restart ``` ; 查看apache版本 ```  httpd -v  ```

启动apache， 打开浏览器访问127.0.0.1 ，如果有页面，证明apache 服务已经正常启动了

2. 配置PHP

> 同样，在mac下PHP也是有的，手动在apache 配置中加入PHP即可

```
// 编辑http.conf 添加 PHP模块 /etc/apache2/httpd.conf

搜索 LoadModule php ，找到这个后，删除前面的 # 注释保存，在命令行输入 php -v 能打印出PHP版本

```

修改 apache2/httpd.conf 文件

```
#
# If you wish httpd to run as a different user or group, you must run
# httpd as root initially and it will switch.  
#
# User/Group: The name (or #number) of the user/group to run httpd as.
# It is usually good practice to create a dedicated user and group for
# running httpd, as with most system services.
#
User qifeng   # 用户名
Group _www



<Directory />
    # AllowOverride none
    AllowOverride all
    Options All
    allow from all
    # Require all denied
</Directory>

#
# Note that from this point forward you must specifically allow
# particular features to be enabled - so if something's not working as
# you might expect, make sure that you have specifically enabled it
# below.
#

#
# DocumentRoot: The directory out of which you will serve your
# documents. By default, all requests are taken from this directory, but
# symbolic links and aliases may be used to point to other locations.
#
# DocumentRoot "/Library/WebServer/Documents"
# <Directory "/Library/WebServer/Documents">
DocumentRoot "/Users/qifeng/Desktop/qiphon/php"
<Directory "/Users/qifeng/Desktop/qiphon/php">
    #
    # Possible values for the Options directive are "None", "All",
    # or any combination of:
    #   Indexes Includes FollowSymLinks SymLinksifOwnerMatch ExecCGI MultiViews
    #
    # Note that "MultiViews" must be named *explicitly* --- "Options All"
    # doesn't give it to you.
    #
    # The Options directive is both complicated and important.  Please see
    # http://httpd.apache.org/docs/2.4/mod/core.html#options
    # for more information.
    #
    Options FollowSymLinks Multiviews
    # Options Indexes FollowSymLinks Multiviews
    MultiviewsMatch Any

    #
    # AllowOverride controls what directives may be placed in .htaccess files.
    # It can be "All", "None", or any combination of the keywords:
    #   AllowOverride FileInfo AuthConfig Limit
    #
    # AllowOverride None
    AllowOverride All

    #
    # Controls who can get stuff from this server.
    #
    Require all granted
</Directory>
```