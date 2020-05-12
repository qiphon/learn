# [nginx](http://nginx.org/en/docs/)
    > nginx 是lgor sysoev 为俄罗斯访问量第二的 rambler.ru 站点设计开发的。从 2004 年到现在凭借开源的力量，已经接近完善。

    > nginx 功能丰富，可作为http 服务器，可以做反向代理服务器，邮件服务器，支持 fastCGI、SSL、Virtual Host、URL Rewrite、Gzip等功能，并且支持很多第三方模块

    > nginx 的稳定性、功能集、示例配置文件和低系统资源消耗让他后来居上，在全球活跃的网站中有 12.18%的使用率，大约为 2220 万个网站

### nginx 常用功能

1. 反向代理， 作为web服务器最常用的功能之一
    > nginx 在做反向代理时，提供性能稳定，并且能够提供配置灵活的转发功能。nginx可以根据不同的正则匹配，采用不同的转发策略，比如图片文件结尾的，走文件服务器，动态页面走 web 服务器，只要正则写的
    没问题，又有对应的服务器解决方案，就可以随心所欲的玩。并且 nginx 对返回结果进行错误页跳转，异常判断等。如果被分发的服务器存在异常，它可以重新将请求发给另一个服务器，然后自动去除异常服务器
2. 负载均衡
    > nginx 提供负载均衡的策略有2种：内置策略和扩展策略。内置策略为轮询、加权轮询、IP hash。
    扩展策略就天马行空，只有你想不到的，没有它做不到的，可以参照所有负载均衡的算法，给他一一做出实践

    - IP hash 算法，对客户端请求的IP进行hash操作，然后根据hash结果将同一客户端的请求分配给同一台服务器处理，可以解决 session 不共享问题
3. web 缓存
    > nginx 可以对不同文件做不同的缓存处理，配置灵活，并支持fastCGI_Cache， 主要用于对FastCGI的动态程序进行缓存。配合着第三方的 ngx_cache_purge,对定制的URL缓存内容可以进行增删管理
4. 静态资源服务，通过本地文件系统提供服务；
5. API 服务，OpenResty

### 代理

- 正向代理： 一般的访问流程是客户端直接向目标服务器发送请求并获取内容，使用正向代理后，客户端改为向代理服务器发送请求，并指定目标服务器（原始服务器），然后由代理服务器和原始服务器通信，转交请求并获得的内容，再返回给客户端。正向代理隐藏了真实的客户端，为客户端收发请求，使真实客户端对服务器不可见；

举个具体的例子 🌰，你的浏览器无法直接访问谷哥，这时候可以通过一个代理服务器来帮助你访问谷哥，那么这个服务器就叫正向代理。

- 反向代理： 与一般访问流程相比，使用反向代理后，直接收到请求的服务器是代理服务器，然后将请求转发给内部网络上真正进行处理的服务器，得到的结果返回给客户端。反向代理隐藏了真实的服务器，为服务器收发请求，使真实服务器对客户端不可见。一般在处理跨域请求的时候比较常用。现在基本上所有的大型网站都设置了反向代理。

### 安装

- 下载nginx 压缩包 ，解压

- 运行解压后文件下的 ``` configure ```, 如果有如下报错需要安装 pcre

```sh
./configure: error: the HTTP rewrite module requires the PCRE library.
You can either disable the module by using --without-http_rewrite_module
option, or install the PCRE library into the system, or build the PCRE library
statically from the source with nginx by using --with-pcre=<path> option.

# dnf install pcre pcre-devel

# 之后在运行 

# ./configure


# 安装 

# make install

```

- nginx 命令

```sh
nginx -s reload  # 向主进程发送信号，重新加载配置文件，热重启
nginx -s reopen # 重启 Nginx
nginx -s stop    # 快速关闭
nginx -s quit    # 等待工作进程处理完成后关闭
nginx -T         # 查看当前 Nginx 最终的配置
nginx -t -c <配置路径>    # 检查配置是否有问题，如果已经在配置目录，则不需要-c

systemctl start nginx    # 启动 Nginx
systemctl stop nginx     # 停止 Nginx
systemctl restart nginx  # 重启 Nginx
systemctl reload nginx   # 重新加载 Nginx，用于修改配置后
systemctl enable nginx   # 设置开机启动 Nginx
systemctl disable nginx  # 关闭开机启动 Nginx
systemctl status nginx   # 查看 Nginx 运行状态

# kill命令
kill -s QUIT 1234  # (数字是进程的pid)
# 强制杀死该进程
kill -9 [pid]

```

- 其他命令 

```sh

# 重新加载配置
# /usr/local/nginx/sbin/nginx -s reload

# 重新打开日志文件
# /usr/local/nginx/sbin/nginx -s reopen

# 为了获取所有正在运行的nginx进程的列表，ps 可以使用该实用程序，例如，通过以下方式使用：
ps -aux | grep nginx

# 查看指定端口的服务
lsof  -i -sTCP:LISTEN
lsof  -i TCP:80

```

## nginx.conf 基本配置说明

- nginx 文件结构
- 全局块： 配置影响 nginx 全局的指令。一般有运行nginx服务器的用户组；nginx 进程 pid存放路径；
日志路径；配置文件引入；允许生成 worker process 数等。
    - `events {}` 配置影响nginx服务器或与用户的网络连接。每个进程的最大连接数，
    选取哪种事件驱动模型处理连接请求，是否允许同时接受多个网络连接，开启网络连接序列化等。
    - `http {}`  可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。
    如引入文件，mime-type定义；日志定义；是否使用 sendfile传输文件；连接超时时间；单链接请求数等。
        - `server {}` 配置虚拟主机的相关参数，server可以有多个
            - `location [pattern] {}` 配置请求的路由，以及各个页面的处理情况
- nginx 配置文件中的每个指令必须以分号结束，# 号表示注释

### 语法规则

- 配置文件由指令与指令块构成；
- 每条指令以 ; 分号结尾，指令与参数间以空格符号分隔；
- 指令块以 {} 大括号将多条指令组织在一起；
- include 语句允许组合多个配置文件以提升可维护性；
- 使用 # 符号添加注释，提高可读性；
- 使用 $ 符号使用变量；
- 部分指令的参数支持正则表达式；

#### location 说明

```
= 精确匹配路径，用于不含正则表达式的 uri 前，如果匹配成功，不再进行后续的查找；
^~ 用于不含正则表达式的 uri 前，表示如果该符号后面的字符是最佳匹配，采用该规则，不再进行后续的查找；
~ 表示用该符号后面的正则去匹配路径，区分大小写；
~* 表示用该符号后面的正则去匹配路径，不区分大小写。跟 ~ 优先级都比较低，如有多个location的正则能匹配的话，则使用正则表达式最长的那个；

# 全局变量

全局变量名	      功能
$host	        请求信息中的 Host，如果请求中没有 Host 行，则等于设置的服务器名，不包含端口
$request_method	客户端请求类型，如 GET、POST
$remote_addr	客户端的 IP 地址
$args	请求中的参数
$arg_PARAMETER	GET 请求中变量名 PARAMETER 参数的值，例如：$http_user_agent(Uaer-Agent 值), $http_referer...
$content_length	请求头中的 Content-length 字段
$http_user_agent	客户端agent信息
$http_cookie	客户端cookie信息
$remote_addr	客户端的IP地址
$remote_port	客户端的端口
$http_user_agent	客户端agent信息
$server_protocol	请求使用的协议，如 HTTP/1.0、HTTP/1.1
$server_addr	服务器地址
$server_name	服务器名称
$server_port	服务器的端口号
$scheme	HTTP    方法（如http，https）

```

```sh

# main        # 全局配置，对全局生效
# ├── events  # 配置影响 Nginx 服务器或与用户的网络连接
# ├── http    # 配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置
# │   ├── upstream # 配置后端服务器具体地址，负载均衡配置不可或缺的部分
# │   ├── server   # 配置虚拟主机的相关参数，一个 http 块中可以有多个 server 块
# │   ├── server
# │   │   ├── location  # server 块可以包含多个 location 块，location 指令用于匹配 uri
# │   │   ├── location
# │   │   └── ...
# │   └── ...
# └── ...

#运行用户、用户组 默认为 nobody
# user nobody;

#启动进程,通常设置成和cpu的数量相等
# 允许生成的进程数，默认 1
worker_processes  1;
 
#全局错误日志及PID文件
# 制定日志路径、级别。这个设置可以放入全局块、http块、server块.
# 级别依次为：debug|info|notice|warn|error|crit|alert|emerg
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;
 
#  指定nginx 运行文件的存放地址
#pid        logs/nginx.pid;
 
#工作模式及连接数上限
events {
    # 设置网络连接序列化，防止惊群显现发生 默认on
    # 惊群现象：一个网络连接到来，多个睡眠的进程被同时唤醒，但只有一个进程能获得连接，这样会影响系统性能
    accept_mutex  on;

    # 设置一个进程是否同时接受多个网络连接 默认 off
    muti_accept  on;

    #epoll是多路复用IO(I/O Multiplexing)中的一种方式,
    #仅用于linux2.6以上内核,可以大大提高nginx的性能
    # 事件驱动模型 select|poll|kqueue|epoll|resig|/dev/pool|eventport
    use   epoll; 
    
    #单个后台worker process进程的最大并发链接数    默认 512
    worker_connections  1024;
 
    # 并发总数是 worker_processes 和 worker_connections 的乘积
    # 即 max_clients = worker_processes * worker_connections
    # 在设置了反向代理的情况下，max_clients = worker_processes * worker_connections / 4  为什么
    # 为什么上面反向代理要除以4，应该说是一个经验值
    # 根据以上条件，正常情况下的Nginx Server可以应付的最大连接数为：4 * 8000 = 32000
    # worker_connections 值的设置跟物理内存大小有关
    # 因为并发受IO约束，max_clients的值须小于系统可以打开的最大文件数
    # 而系统可以打开的最大文件数和内存大小成正比，一般1GB内存的机器上可以打开的文件数大约是10万左右
    # 我们来看看360M内存的VPS可以打开的文件句柄数是多少：
    # $ cat /proc/sys/fs/file-max
    # 输出 34336
    # 32000 < 34336，即并发连接总数小于系统可以打开的文件句柄总数，这样就在操作系统可以承受的范围之内
    # 所以，worker_connections 的值需根据 worker_processes 进程数目和系统可以打开的最大文件总数进行适当地进行设置
    # 使得并发总数小于操作系统可以打开的最大文件数目
    # 其实质也就是根据主机的物理CPU和内存进行配置
    # 当然，理论上的并发总数可能会和实际有所偏差，因为主机还有其他的工作进程需要消耗系统资源。
    # ulimit -SHn 65535
 
}
 
 
http {
    #设定mime类型,类型由mime.type文件定义
    # 文件扩展名与文件类型映射表
    include    mime.types;
    # 默认文件类型，默认为 text/plain
    default_type  application/octet-stream;
    #设定日志格式
    # $remote_addr  与 $http_x_forwarded_for 用以记录客户端的IP地址
    # $remote_user  用以记录客户端用户名
    # $time_local   用来记录访问时间与时区
    # $request      用来记录请求的URL与http协议
    # $status       用来记录请求状态，成功 200
    # $body_bytes_sent  记录发送给客户端文件主体内容大小
    # $http_referer 用来记录用户是从哪个页面访问过来的
    # $http_user_agent  记录客户端浏览器的相关信息
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    #  服务日志
    access_log  logs/access.log  main;
 
    #sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，
    # 默认off，可以在 http、server、location块下
    #对于普通应用，必须设为 on
    #如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，
    #以平衡磁盘与网络I/O处理速度，降低系统的uptime.
    sendfile     on;
    # 每个进程每次调用传输数量不能大于设定值，默认为0，即无上限
    sendfile_max_chunk  100k;
    #tcp_nopush     on;
 
    #连接超时时间，默认 75s,可以在 http、server、location块下
    keepalive_timeout  65;
    tcp_nodelay     on;
 
    # 
    upstream  myser {
        server 127.0.0.1:7878;
        server 192.168.10.121:3333 backup; # 热备；
    }

    #开启gzip压缩
    gzip  on;
    gzip_disable "MSIE [1-6].";
 
    #设定请求缓冲
    client_header_buffer_size    128k;
    large_client_header_buffers  4 128k;


    # 引入外部配置文件
    include /etc/nginx/conf.d/*.conf;

    # 定义错误提示页面
    error_page   500 502 503 504 /50x.html;

    # 当代理遇到状态码是 404 时，我们把404 页面指向百度
    # error_page   404 https://www.baidu.com;
    # 上面的需要配合这个一起用,如果被代理服务器返回状态码为 400或者大于400，设置的error_page起作用
    proxy_intercept_errors on;

    # 设置允许的请求
    # proxy_method get;

    # 设置支持的协议版本;nginx 服务器提供代理服务的 http协议版本 1.0， 1.1 默认为1.0
    proxy_http_version 1.0;
 
    #设定虚拟主机配置
    server {
        # 单链接请求上限次数
        keepalive_requests   120;
        #侦听80端口
        listen    80;
        # 监听地址 定义使用 www.nginx.cn访问
        server_name  www.nginx.cn;
 
        #定义服务器的默认网站根目录位置
        root html;

        # 请求URL 过滤 正则匹配， ～为区分大小写，～*为不区分大小写
        # location ~*^.+${}
        #默认请求
        location / {
            # root  html
            #定义首页索引文件的名称
            index index.php index.html index.htm;   

            # 请求被代理到 myser 定义服务器列表
            # proxy_pass http://myser;
            # 拒绝的IP/允许的IP
            # deny 127.0.0.1;
            # allow  18.122.12.12;
        }
 
        location = /50x.html {
        }
 
        #静态文件，nginx自己处理
        location ~ ^/(images|javascript|js|css|flash|media|static)/ {
            
            #过期30天，静态文件不怎么更新，过期可以设大一点，
            #如果频繁更新，则可以设置得小一点。
            expires 1d;
        }

        # proxy the php scripts to Apache listen on 127.0.0.1:80
        #
        # location ~ \.php$ {
        #   proxy_pass  http://127.0.0.1
        # }
 
        #PHP 脚本请求全部转发到 FastCGI处理. 使用FastCGI默认配置.
        location ~ \.php$ {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include fastcgi_params;
        }
 
        #禁止访问 .htxxx 文件
        location ~ /\.ht {
            deny all;
        }
 
    }

    # another virtual host using mix of IP-, name-, and port-based configuration
    # server {
    #   listen    8000;
    #   listen    servername:8000;
    #   server_name    servername  alias  another.alias;
    #   
    #   location / {
    #     root    youWebPath;
    #     index   index.html  index.htm;
    #   }
    # }

    # proxy to node test ok
    #server {
    #  listen    3000;
    #  server_name    vi.qiphon.cc;
    #  location / {
    #    proxy_pass  http://localhost:3001; 
    #  }
    #}

    #
    # https server
    # 
    # server {
    #   listen    433 ssl;
    #   listen    433 ssl http2;
    #   server_name    localhost;
        # ssl    on;

    #   ssl_certificate    cert.pem;
    #   ssl_certificate_key   cert.key;
    #   
    #   ssl_session_cache    shared:SSL:1m;
    #   ssl_session_timeout    5m;
    #
    #   ssl_ciphers    HIGH:!aNULL:!MD5;
    #   ssl_prefer_server_ciphers    on;
        # ssl_protocols    TLSv1 TLSv1.1 TLSv1.2;
    #
    #   location / {
    #     root   webServerPath;
    #     index   index.html index.htm;
    #
    #   }
    # }
    #
    # http 直接跳转到https
    # server {
        # add cross header 指定跨域头
        # add_header Access-Control-Allow-Origin *;
        # add_header Access-Control-Allow-Headers X-Requested-With;
        # add_header Access-Control-Allow-Methods GET,OPTIONS;

        # listen  80;
        # server_name  qifeng.site;
        # 
        # jump to https
        # rewrite ^(.*)$  https://$host$1 permanent;
    # }
    #  
    # # 反向代理 & 负载均衡
    # 
    # # upstream 可以配置多个同时
    # 
    # upstream qiphon_www {
    #    # 这里写入多个服务器地址，就可以实现负载均衡
    #    server 127.0.0.1:4000; 
    #    server 192.168.1.4:4001; 
    # }
    # upstream qiphon_study {
    #    server 127.0.0.1:5000; 
    # }
    # upstream qiphon_test {
    #    server 127.0.0.1:6000; 
    # }
    # server {
        # location / {
        #     # 请求转向 upstream 声明的 qiphon_www 服务
        #     proxy_pass    http://qiphon_www;
        #     proxy_redirect    off;

        #     # 保持原有的请求头，否则拿不到用户的请求头
        #     proxy_http_version  1.1;
        #     proxy_set_header    Upgrade  $http_upgrade;
        #     proxy_set_header    Connection  'upgrade';
        #     proxy_cache_bypass    $http_upgrade;

        #     # 让服务器拿到用户的真实 IP
        #     # 只要在浏览器中访问的域名绑定了 vip vip 下面有 RS；则就用 $host; host 就是访问URL中的域名和端口
        #     proxy_set_header    Host  $host;
        #     # 把源 IP 【$remote_addr,建立http连接header里面的信息】赋值给 X-Real-IP; 这样在代码中 $X-Real-IP 来获取源IP
        #     proxy_set_header    X-Real-IP  $remote_addr;
        #     # 在nginx 作为代理服务器时，设置的IP列表会把经过的机器IP、代理机器IP都记录下来，用 [,]逗号隔开；代码中用 echo $x-forwarded-for | awk -F, '{print $1}'来作为源IP
        #     proxy_set_header    X-Forwarded-For  $proxy_add_x_forwarded_for;
        # }
    # }
    #
    # # 热备：如果你有2台服务器，当一台服务器发生故障时，才启用第二台服务器提供服务。
    # upstream  qifeng_www {
    #     server    127.0.0.1:8000;
    #     server    168.192.0.12:8000  backup;
    # }

    # # 轮询：nginx 默认就是轮询，其权重默认都为 1，服务器的请求顺序 ABABABAB.....
    # upstream  qifeng_www {
    #     server    127.0.0.1:8000;
    #     server    168.192.0.12:8000;
    # }

    # # 加权轮询：根据配置的权重大小而分给不同服务器不同数量的请求。如果不设置，默认为 1； 下面服务器的请求顺序为：ABBABBABB......
    # upstream  qifeng_www {
    #     server    127.0.0.1:8000  weight=1;
    #     server    168.192.0.12:8000  weight=2;
    # }

    # # ip_hash: nginx 会让相同的客户端IP请求相同的服务器。
    # upstream  qifeng_www {
    #     server    127.0.0.1:8000  weight=1;
    #     server    168.192.0.12:8000  weight=2;
        # ip_hash;
    # }

    # # 关于 nginx 负载均衡配置的的几个状态参数讲解
    # # # down， 表示当前的server 暂时不参与负载均衡
    # # # backup，预留的备份机器。当其他所有的非backup机器出现故障或者忙的时候，才会请求 backup 机器，因此这台机器的压力最轻
    # # # max_fails, 允许请求失败的次数， 默认为 1。当超过最大次数时，返回 proxy_next_upstream 模块定义的错误。
    # # # fail_timeout, 在经历了 max_fails 次失败后，暂停服务的时间。
    # upstream  qifeng_www {
    #     server  127.0.0.1:3000 weight=2 max_fails=2 fail_timeout=2;
    #     server  192.168.4.1:3000 weight=1 max_fails=3 fail_timeout=1;
    # }
    # 
    # 如果nginx服务器给2台web服务器做代理，负载均衡算法采用轮询，当么当一台机器web程序 IIS 关闭（也就是说web不能访问），那么nginx服务器分发请求还是会给
    # 这台不能访问的服务器，如果这里的响应连接时间过长，就会导致客户端的页面一直在等待响应
    # 解决方案：
    # # nginx 服务器与被代理的服务器之间连接的超时时间， 默认 60s；
    # proxy_connect_timeout  1;
    # 
    # # nginx 服务器向被代理服务器组发出 read 请求后，等待响应的超时时间，默认 60s；
    # proxy_read_timeout  1;
    # 
    # # nginx 向被代理服务器发出 write请求后，等待响应的超时时间 默认 60s；
    # proxy_serd_timeout  1;

    # # 客户端断网时，nginx 服务器是否中断对被代理服务器的请求，默认为off
    # proxy_ignore_client_abort  on;
    # 
    # # 反向代理 upstream 中设置的服务器组出现故障时，被代理服务器返回的故障值。 error|timeout|invalid_header|http_500|http_502|http_503|http_504|off
    # proxy_next_upstream  timeout;

}


# 参考nginx 配置
http{
    include    mime.types;
    default_type    application/octet-stream;

    log_format   myFormat  ' $remote_addr-$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for';
    access_log   /var/log/nginx/access.log myFormat; # combined 为日志格式的默认值
    
    sendfile    on;
    sendfile_max_chunk  100k;

    keepalive_timeout  65;
    proxy_connect_timeout 1;
    proxy_read_timeout 1;
    proxy_send_timeout 1;
    proxy_http_version 1.0;
    proxy_ignore_client_abort on;
    proxy_ignore_headers "Expires" "Set-Cookie";  # nginx 不处理设置的http响应头中的头域，可以设置多个，空格隔开
    proxy_intercept_errors  on; # 如果被代理的服务器返回的状态码大于等于 400，返回错误页 error_page 
    proxy_headers_hash_max_size  1024;  # 存放http报头的 哈希表容量的大小，默认 64
    proxy_next_upstream  timeout;  
    
}

```


### nginx编译选项说明

- make是用来编译的，它从Makefile中读取指令，然后编译。

- make install是用来安装的，它也从Makefile中读取指令，安装到指定的位置。

- configure命令是用来检测你的安装平台的目标特征的。它定义了系统的各个方面，包括nginx的被允许使用的连接处理的方法，比如它会检测你是不是有CC或GCC，并不是需要CC或GCC，它是个shell脚本，执行结束时，它会创建一个Makefile文件。nginx的configure命令支持以下参数：

命令  |  描述  |  默认(目录/名称)
--|--|--|--
``` --help ``` |   打印帮助信息  | 
``` --prefix=path ``` |   定义将保留服务器文件的目录。此相同目录还将用于设置所有相对路径 configure (库原路径除外)和 nginx.conf 配置文件中。 |    /usr/local/nginx 
``` --sbin-path=path ``` |   设置 nginx 可执行文件的名称。此名称仅在安装期间使用。  |    prefix/sbin/nginx
``` --modules-path=path ``` |    定义将在其中安装 nginx 动态模块的目录。默认使用 |    prefix/modules   
``` --config-path=path ``` |    设置配置文件名称   |    prefix/config/nginx.conf   
``` --error-log-path=path ``` |    设置主要错误、警告和诊断文件的名称。安装后可以在nginx.conf 中使用 error_log 指令在配置文件中更改文件名   |    prefix/logs/error.log  
``` --pid-path=path ``` |    设置 nginx.pid 将存储主进程的进程id的文件名。安装后，可以在nginx.conf 中重新使用 pid 指令配置   |    prefix/logs/nginx.pid 
``` --lock-path=path ``` |    为锁定的文件名称设置前缀。安装后，可以在 nginx.conf 中使用 lock_file 指令配置   |    prefix/logs/nginx.lock
``` --user=name ``` |   设置一个非 root 用户的名称，控制nginx 的使用用户。可以在 nginx.conf 中重新配置 name 指令   |    nobody
``` --group=name ``` |   设置一个控制 nginx 的使用用户组。可以在 nginx.conf 中重新配置 group 指令  |    nobody
``` --build=name ``` |   设置一个可选的 nginx 构建名称
``` --builddir=path ``` |   设置构建目录
``` --with-select_module ``` <br/> ``` --without-select_module ``` |   启用构建允许服务器使用 select()方法的模块。如果平台不支持kqueue 、epoll 或 /dev/poll 等更合适的方法，则会自动构建此模块
``` --with-poll_module ``` <br/> ``` --without-poll_module ``` |   启用构建允许服务器使用 poll()方法的模块。如果平台不支持kqueue 、epoll 或 /dev/poll 等更合适的方法，则会自动构建此模块
``` --with-threads ```   |   启用线程池
``` --with-file-aio ```   |   支持在FreeBSD 和 linux 上使用 asynchronous file I/O(AIO)
``` --with-http_ssl_module ```   |   启用构建将 HTTPS protocol support 模块。默认未构建这个模块，需要OpenSSL 库来构建和运行此模块
``` --with-http_v2_module ```   |   启用 HTTP/2 模块，这个模块默认没有启用
``` --with-http_realip_module ```   |   启用 ngx_http_realip_module 该模块将客户端地址更改为指定的 Header 字段中发送的地址。 默认未构建
``` --with-http_addition_module ```   |   启用 ngx_http_addition_module  该模块在响应之前或之后添加文本
``` --with-http_xslt_module ```<br/> ``` --with-http_xslt_module=dynamic ```   |   启用 ngx_http_xslt_module  该模块使用一个或多个 XSLT 样式表转换 XML 相应。默认未构建。这个依赖 libxml2 and libxslt 库
``` --with-http_image_filter_module ```<br/> ``` --with-http_image_filter_module=dynamic ```   |   启用 ngx_http_image_filter_module  可以转换 JPEG、GIF、PNG和 WebP 格式的图像。默认未构建。
``` --with-http_geoip_module ```<br/> ``` --with-http_geoip_module=dynamic ```   |   启用 ngx_http_geoip_module  该模块根据客户端ip地址和预编译的 MaxMind 数据库创建变量。默认未构建。
``` --with-http_sub_module ```  |   启用 ngx_http_sub_module  该 模块通过将一个指定的字符串替换为另一个指定的字符串来修改响应。默认情况下未构建此模块。
``` --with-http_dva_module ```  |   启用 ngx_http_dva_module  该 模块通过WebDAV协议提供文件管理自动化。默认情况下未构建此模块。
``` --with-http_mp4_module ```  |   启用 ngx_http_mp4_module  该 模块为MP4文件提供伪流服务器端支持。默认情况下未构建此模块。
``` --with-http_gunzip_module ```  |   支持为不支持“ gzip”编码方法的客户端构建ngx_http_gunzip_module 模块，该 模块使用“ Content-Encoding: gzip” 解压缩响应。默认情况下未构建此模块。
``` --with-http_auth_request_module ```  |   允许构建ngx_http_auth_request_module 模块，该 模块基于子请求的结果实现客户端授权。默认情况下未构建此模块。
``` --with-http_random_index_module ```  |   支持构建ngx_http_random_index_module 模块，该 模块处理以斜杠（' /'）结尾的请求，并从目录中选择一个随机文件作为索引文件。默认情况下未构建此模块。
``` --with-http_secure_link_module ```  |   启用构建 ngx_http_secure_link_module 模块。默认情况下未构建此模块。
``` --with-http_degradation_module ```  |   启用构建 ngx_http_degradation_module模块。默认情况下未构建此模块。
``` --with-http_slice_module ```  |   支持构建ngx_http_slice_module 模块，该 模块将请求拆分为子请求，每个子请求返回一定范围的响应。该模块提供了更有效的大响应缓存。默认情况下未构建此模块。
``` --with-http_stub_status_module ```  |   支持构建ngx_http_stub_status_module 模块，该 模块提供对基本状态信息的访问。默认情况下未构建此模块。
``` --without-http_charset_module   ```  |   禁用构建ngx_http_charset_module 模块，该 模块将指定的字符集添加到“ Content-Type”响应头字段中，并且可以将数据从一个字符集转换为另一个字符集。
``` --without-http_gzip_module  ```  |   禁用构建可压缩 HTTP服务器响应的模块。zlib库是构建和运行此模块所必需的。
``` --without-http_ssi_module ```  |   禁用构建 处理通过SSI（服务器端包含）命令的 ngx_http_ssi_module模块的响应。
``` --without-http_userid_module ```  |   禁用构建ngx_http_userid_module 模块，该 模块设置适用于客户端标识的cookie。
``` --without-http_auth_basic_module ```  |   禁用构建ngx_http_auth_basic_module 模块，该 模块允许通过使用“ HTTP基本身份验证”协议验证用户名和密码来限制对资源的访问。
``` --without-http_mirror_module ```  |   禁用构建ngx_http_mirror_module 模块，该 模块通过创建后台镜像子请求来实现原始请求的镜像。
``` --without-http_autoindex_module ```  |   禁用构建 ngx_http_autoindex_module 模块，以处理以斜杠（' /'）结尾的请求，并在ngx_http_index_module模块找不到索引文件的情况下生成目录列表 。
``` --without-http_map_module ```  |   禁用构建ngx_http_map_module 模块，该 模块创建的变量的值取决于其他变量的值。
``` --without-http_split_clients_module ```  |   禁用构建ngx_http_split_clients_module 模块，该 模块创建用于A / B测试的变量。
``` --without-http_referer_module ```  |   禁用构建ngx_http_referer_module 模块，该 模块可以阻止对“ Referer”标头字段中具有无效值的请求的站点访问。
``` --without-http_rewrite_module ```  |   禁用构建允许HTTP服务器 重定向请求并更改请求URI的模块。构建和运行此模块需要PCRE库。
``` --without-http_proxy_module ```  |   禁用构建HTTP服务器 代理模块。
``` --without-http_fastcgi_module ```  |   禁用构建 将请求传递到FastCGI服务器的 ngx_http_fastcgi_module模块。
``` --without-http_uwsgi_module ```  |   禁用构建 将请求传递到uwsgi服务器的 ngx_http_uwsgi_module模块。
``` --without-http_scgi_module ```  |   禁用构建 将请求传递到SCGI服务器的 ngx_http_scgi_module模块。
``` --without-http_grpc_module ```  |   禁用构建 将请求传递到gRPC服务器的 ngx_http_grpc_module模块。
``` --without-http_memcached_module  ```  |   禁用构建ngx_http_memcached_module 模块，该 模块从memcached服务器获取响应。
``` --without-http_limit_conn_module  ```  |   禁用构建ngx_http_limit_conn_module 模块，该 模块限制每个键的连接数，例如，单个IP地址的连接数。
``` --without-http_empty_gif_module  ```  |   禁用构建发出单像素透明GIF的模块 。
``` --without-http_browser_module  ```  |   禁用构建ngx_http_browser_module 模块，该 模块创建的变量的值取决于“ User-Agent”请求标头字段的值。
``` --without-http_upstream_hash_module  ```  |  禁用构建实现哈希 负载平衡方法的模块 。
``` --without-http_upstream_ip_hash_module  ```  |  禁用构建实现ip_hash 负载平衡方法的模块 。
``` --without-http_upstream_least_conn_module  ```  |  禁用构建实现了minimum_conn 负载平衡方法的模块 。
``` --without-http_upstream_keepalive_module  ```  |  禁用构建一个模块来提供 对上游服务器连接的缓存。
``` --without-http_upstream_zone_module  ```  |  禁用构建模块，该模块可以将上游组的运行时状态存储在共享内存 区域中。
``` --with-http_perl_module  ``` <br /> ```--with-http_perl_module=dynamic ```  |  支持构建 嵌入式Perl模块。默认情况下未构建此模块。
``` --with-perl_modules_path=path  ```  |  定义一个目录，该目录将保留Perl模块。
``` --with-perl=path ```  |  设置Perl二进制文件的名称。
``` --http-log-path=path ```  |  设置HTTP服务器的主请求日志文件的名称。安装后，可以始终nginx.conf使用access_log伪指令在配置文件中 更改文件名 。默认情况下，文件名为 prefix/logs/access.log。
``` --http-client-body-temp-path=path ```  |  定义用于存储包含客户端请求正文的临时文件的目录。安装后，可以始终nginx.conf使用client_body_temp_path 指令在配置文件中 更改目录 。默认情况下，目录名为 prefix/client_body_temp。
``` --http-proxy-temp-path=path ```  |  定义一个目录，用于存储包含从代理服务器接收到的数据的临时文件。安装后，可以始终nginx.conf使用proxy_temp_path 指令在配置文件中 更改目录 。默认情况下，目录名为 prefix/proxy_temp。
```  --http-fastcgi-temp-path=path  ```  |  定义一个目录，用于存储包含从FastCGI服务器接收到的数据的临时文件。安装后，可以始终nginx.conf使用fastcgi_temp_path 指令在配置文件中 更改目录 。默认情况下，目录名为 prefix/fastcgi_temp。
```  --http-uwsgi-temp-path=path  ```  |  定义一个目录，用于存储带有从uwsgi服务器接收到的数据的临时文件。安装后，可以始终nginx.conf使用uwsgi_temp_path 指令在配置文件中 更改目录 。默认情况下，目录名为 prefix/uwsgi_temp。
```  --http-scgi-temp-path=path  ```  |  定义一个目录，用于存储带有从SCGI服务器接收到的数据的临时文件。安装后，可以始终nginx.conf使用scgi_temp_path 指令在配置文件中 更改目录 。默认情况下，目录名为 prefix/scgi_temp。
```   --without-http  ```  | 禁用HTTP服务器
```   --without-http-cache  ```  |   禁用HTTP缓存。
```   --with-mail ``` <br/> ``` --with-mail=dynamic  ```  |   启用POP3 / IMAP4 / SMTP 邮件代理服务器。
```   --with-mail_ssl_module  ```  |   支持构建一个模块，该模块 向邮件代理服务器添加 SSL / TLS协议支持。默认情况下未构建此模块。需要OpenSSL库来构建和运行此模块。
```   --without-mail_pop3_module  ```  |   在邮件代理服务器中 禁用POP3协议。
```   --without-mail_imap_module  ```  |   在邮件代理服务器中 禁用IMAP协议
```   --without-mail_imap_module  ```  |   在邮件代理服务器中 禁用SMTP协议。
```   --with-stream ``` <br/>```--with-stream=dynamic ```  | 支持构建 用于通用TCP / UDP代理和负载平衡的 流模块。默认情况下未构建此模块。
```   --with-stream_ssl_module ```  |   支持构建一个模块，该模块 向流模块添加 SSL / TLS协议支持。默认情况下未构建此模块。需要OpenSSL库来构建和运行此模块。
```   --with-stream_realip_module  ```  |   启用构建ngx_stream_realip_module 模块的功能，该 模块将客户端地址更改为PROXY协议标头中发送的地址。默认情况下未构建此模块。
```   --with-stream_geoip_module ```  <br/>```--with-stream_geoip_module=dynamic  ```  |   支持构建ngx_stream_geoip_module 模块，该 模块根据客户端IP地址和预编译的MaxMind数据库创建变量 。默认情况下未构建此模块。
```   --with-stream_ssl_preread_module  ```  |   支持构建ngx_stream_ssl_preread_module 模块，该 模块允许从ClientHello 消息中提取信息， 而无需终止SSL / TLS。默认情况下未构建此模块。
```  --without-stream_limit_conn_module  ```  |   禁用构建ngx_stream_limit_conn_module 模块，该 模块限制每个键的连接数，例如，单个IP地址的连接数。
```  --without-stream_access_module  ```  |   禁用构建ngx_stream_access_module 模块，该 模块允许限制对某些客户端地址的访问。
```  --without-stream_geo_module  ```  |   禁用构建ngx_stream_geo_module 模块，该 模块创建的变量值取决于客户端IP地址。
```  --without-stream_map_module  ```  |   禁用构建ngx_stream_map_module 模块，该 模块创建的变量值取决于其他变量的值。
```  --without-stream_split_clients_module  ```  |   禁用构建ngx_stream_split_clients_module 模块，该 模块创建用于A / B测试的变量。
```  --without-stream_return_module  ```  |   禁用构建ngx_stream_return_module 模块，该 模块向客户端发送一些指定的值，然后关闭连接。
```  --without-stream_upstream_hash_module  ```  |   禁用构建实现哈希 负载平衡方法的模块 。
```  --without-stream_upstream_least_conn_module  ```  |   禁用构建实现了minimum_conn 负载平衡方法的模块 
```  --without-stream_upstream_zone_module  ```  |   禁用构建模块，该模块可以将上游组的运行时状态存储在共享内存 区域中。
```  --with-google_perftools_module  ```  |   允许构建ngx_google_perftools_module 模块，该 模块可以使用Google Performance Tools对nginx工作进程进行 性能分析。该模块适用于Nginx开发人员，默认情况下未构建。
```  --with-cpp_test_module  ```  |   启用构建 ngx_cpp_test_module模块。
```  --add-module=path  ```  |   启用外部模块。
```  --add-dynamic-module=path  ```  |   启用外部动态模块。
```  --with-compat  ```  |   启用动态模块兼容性。
```  --with-cc=path  ```  |   设置C编译器的名称。
```  --with-cpp=path  ```  |   设置C预处理器的名称。
```  --with-cc-opt=parameters  ```  |  设置将添加到CFLAGS变量的其他参数。在FreeBSD下使用系统PCRE库时， --with-cc-opt="-I /usr/local/include" 应指定。如果select()需要增加支持的文件数量，也可以在此处指定，例如： --with-cc-opt="-D FD_SETSIZE=2048"。
```  --with-ld-opt=parameters  ```  |  设置将在链接期间使用的其他参数。在FreeBSD下使用系统PCRE库时， --with-ld-opt="-L /usr/local/lib" 应指定。
```  --with-cpu-opt=cpu  ```  |  支持按指定的CPU建设： pentium，pentiumpro， pentium3，pentium4， athlon，opteron， sparc32，sparc64， ppc64。
```  --without-pcre  ```  |  禁用PCRE库的使用。
```  --with-pcre ```  |  强制使用PCRE库。
```  --with-pcre=path ```  |  设置PCRE库源的路径。需要从PCRE站点下载并分发库分发（版本4.4 — 8.43） 。其余的由nginx的./configure和完成 make。该库对于location指令中的正则表达式支持和 ngx_http_rewrite_module 模块是必需的 。
```  --with-pcre-opt=parameters ```  |  为PCRE设置其他构建选项。
```  --with-pcre-jit ```  |   使用“及时编译”支持（1.1.12，pcre_jit指令）构建PCRE库 。
```  --with-zlib=path ```  |   设置zlib库源的路径。需要从zlib站点下载库发行版（版本1.1.3-1.2.11） 并解压缩。其余的由nginx的./configure和完成 make。ngx_http_gzip_module模块需要该库 。
```  --with-zlib-opt=parameters ```  |   为zlib设置其他构建选项。
```  --with-zlib-asm=cpu ```  |   使得能够使用指定的CPU中的一个优化的zlib汇编源程序： pentium，pentiumpro。
```  --with-libatomic ```  |   强制使用libatomic_ops库。
```  --with-libatomic=path  ```  |   设置libatomic_ops库源的路径。
```  --with-openssl=path  ```  |   设置OpenSSL库源的路径。
```  --with-openssl-opt=parameters  ```  |   为OpenSSL设置其他构建选项。
```  --with-debug  ```  |   启用调试日志


参数用法示例（所有这些都需要在一行中键入）：

```sh

./configure
    --sbin-path=/usr/local/nginx/nginx
    --conf-path=/usr/local/nginx/nginx.conf
    --pid-path=/usr/local/nginx/nginx.pid
    --with-http_ssl_module
    --with-pcre=../pcre-8.43
    --with-zlib=../zlib-1.2.11

```

### 设置跨域头

```

server {
    listen       80;
    server_name  be.sherlocked93.club;
  
    add_header 'Access-Control-Allow-Origin'$http_origin;   # 全局变量获得当前请求origin，带cookie的请求不支持*
    add_header 'Access-Control-Allow-Credentials''true';    # 为 true 可带上 cookie
    add_header 'Access-Control-Allow-Methods''GET, POST, OPTIONS';  # 允许请求方法
    add_header 'Access-Control-Allow-Headers'$http_access_control_request_headers;  # 允许请求的 header，可以为 *
    add_header 'Access-Control-Expose-Headers''Content-Length,Content-Range';

    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Max-Age' 1728000;   # OPTIONS 请求的有效期，在有效期内不用发出另一条预检请求
        add_header 'Content-Type''text/plain; charset=utf-8';
        add_header 'Content-Length' 0;
            
        return 204;                  # 200 也可以
    }  

```

### Nginx 配置 gzip

使用 gzip 不仅需要 Nginx 配置，浏览器端也需要配合，需要在请求消息头中包含 Accept-Encoding: gzip（IE5 之后所有的浏览器都支持了，是现代浏览器的默认设置）。一般在请求 html 和 css 等静态资源的时候，支持的浏览器在 request 请求静态资源的时候，会加上 Accept-Encoding: gzip 这个 header，表示自己支持 gzip 的压缩方式，Nginx 在拿到这个请求的时候，如果有相应配置，就会返回经过 gzip 压缩过的文件给浏览器，并在 response 相应的时候加上 content-encoding: gzip 来告诉浏览器自己采用的压缩方式（因为浏览器在传给服务器的时候一般还告诉服务器自己支持好几种压缩方式），浏览器拿到压缩的文件后，根据自己的解压方式进行解析。

```
# /etc/nginx/conf.d/gzip.conf

gzip on; # 默认off，是否开启gzip
gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

# 上面两个开启基本就能跑起了，下面的愿意折腾就了解一下
gzip_static on;
gzip_proxied any;
gzip_vary on;
gzip_comp_level 6;
gzip_buffers 16 8k;
# gzip_min_length 1k;
gzip_http_version 1.1;

```

- gzip_types：要采用 gzip 压缩的 MIME 文件类型，其中 text/html 被系统强制启用；
- gzip_static：默认 off，该模块启用后，Nginx 首先检查是否存在请求静态文件的 gz 结尾的文件，如果有则直接返回该 .gz 文件内容；
- gzip_proxied：默认 off，nginx做为反向代理时启用，用于设置启用或禁用从代理服务器上收到相应内容 gzip 压缩；
- gzip_vary：用于在响应消息头中添加 Vary：Accept-Encoding，使代理服务器根据请求头中的 Accept-Encoding 识别是否启用 gzip 压缩；
- gzip_comp_level：gzip 压缩比，压缩级别是 1-9，1 压缩级别最低，9 最高，级别越高压缩率越大，压缩时间越长，建议 4-6；
- gzip_buffers：获取多少内存用于缓存压缩结果，16 8k 表示以 8k*16 为单位获得；
- gzip_min_length：允许压缩的页面最小字节数，页面字节数从header头中的 Content-Length 中进行获取。默认值是 0，不管页面多大都压缩。建议设置成大于 1k 的字节数，小于 1k 可能会越压越大；
- gzip_http_version：默认 1.1，启用 gzip 所需的 HTTP 最低版本；


### 移动设备判读

```
server {
    listen 80;
    server_name fe.sherlocked93.club;

    location / {
        root  /usr/share/nginx/html/pc;
            if ($http_user_agent ~* '(Android|webOS|iPhone|iPod|BlackBerry)') {
                root /usr/share/nginx/html/mobile;
            }
            index index.html;
        }
    }

```

### 配置 https
```
server {
  listen 443 ssl http2 default_server;   # SSL 访问端口号为 443
  server_name sherlocked93.club;         # 填写绑定证书的域名

  ssl_certificate /etc/nginx/https/1_sherlocked93.club_bundle.crt;   # 证书文件地址
  ssl_certificate_key /etc/nginx/https/2_sherlocked93.club.key;      # 私钥文件地址
  ssl_session_timeout 10m;

  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;      #请按照以下协议配置
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
  ssl_prefer_server_ciphers on;
  
  location / {
    root         /usr/share/nginx/html;
    index        index.html index.htm;
  }
}
```

### 防盗链

```

server {
  listen       80;
  server_name  *.sherlocked93.club;
  
  # 图片防盗链
  location ~* \.(gif|jpg|jpeg|png|bmp|swf)$ {
    valid_referers none blocked 192.168.0.2;  # 只允许本机 IP 外链引用
    if ($invalid_referer){
      return 403;
    }
  }
}

```

### 请求过滤

```

# 非指定请求全返回 403
if ( $request_method !~ ^(GET|POST|HEAD)$ ) {
  return 403;
}

location / {
  # IP访问限制（只允许IP是 192.168.0.2 机器访问）
  allow 192.168.0.2;
  deny all;
  
  root   html;
  index  index.html index.htm;
}

```

### http 转到 https

```

    listen      80;
    server_name www.sherlocked93.club;

    # 单域名重定向
    if ($host = 'www.sherlocked93.club'){
        return 301 https://www.sherlocked93.club$request_uri;
    }
    # 全局非 https 协议时重定向
    if ($scheme != 'https') {
        return 301 https://$server_name$request_uri;
    }

    # 或者全部重定向
    return 301 https://$server_name$request_uri;

    # 以上配置选择自己需要的即可，不用全部加
}

```

### spa 配置

```
server {
  listen       80;
  server_name  fe.sherlocked93.club;
  
  location / {
    root       /usr/share/nginx/html/dist;  # vue 打包后的文件夹
    index      index.html index.htm;
    try_files  $uri$uri/ /index.html @rewrites;
    
    expires -1;                          # 首页一般没有强制缓存
    add_header Cache-Control no-cache;
  }
  
  # 接口转发，如果需要的话
  #location ~ ^/api {
  #  proxy_pass http://be.sherlocked93.club;
  #}
  
  location @rewrites {
    rewrite ^(.+)$ /index.html break;
  }
}
```

### 泛域名路径分离

```
test1.doc.sherlocked93.club 自动指向 /usr/share/nginx/html/doc/test1 服务器地址；
test2.doc.sherlocked93.club 自动指向 /usr/share/nginx/html/doc/test2 服务器地址；
server {
    listen       80;
    server_name  ~^([\w-]+)\.doc\.sherlocked93\.club$;

    root /usr/share/nginx/html/doc/$1;
}

```

###  泛域名转发

```
test1.serv.sherlocked93.club/api?name=a 自动转发到 127.0.0.1:8080/test1/api?name=a ；
test2.serv.sherlocked93.club/api?name=a 自动转发到 127.0.0.1:8080/test2/api?name=a ；
server {
    listen       80;
    server_name ~^([\w-]+)\.serv\.sherlocked93\.club$;

    location / {
        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header        Host $http_host;
        proxy_set_header        X-NginX-Proxy true;
        proxy_pass              http://127.0.0.1:8080/$1$request_uri;
    }
}

```