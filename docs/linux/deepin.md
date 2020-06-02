# deepin 

### dpkg 是最底层的包管理命令，作用等同于RedHat中的rpm命令

- dpkg命令
dpkg命令一般需要root权限执行，所以一般跟着sudo命令 例如: sudo dpkg xxxx

    ```sh
    dpkg [<选项> ...] <命令>
    dpkg -s package | grep Status  ##查询软件包是否安装
    dpkg -s package    ##查看软件包是否安装，获取其他有用信息
    dpkg -S filesname ##查找文件属于哪个安装包
    dpkg -C   ##搜索损坏的软件包
    dpkg -i <package.deb>   ##安装软件包
    dpkg -r package    ##删除已安装的软件包，但保留配置文件
    dpkg -P package   ##删除已安装软件包,完全清除包（含配置文件）
    dpkg -h   ##获取更多关于dpkg用法的信息
    dpkg -S file ##这个文件属于哪个已安装软件包。
    dpkg -L package ##列出软件包中的所有文件。
    dpkg –force-all –purge packagename ##有些软件很难卸载，而且还阻止了别的软件的应用，就可以用这个，不过有点冒险。
    ```

### apt是dpkg的智能化前端，能够自动处理依赖关系问题,主要用于自动从互联网的软件仓库中搜索、安装、升级、卸载软件或操作系统；

- apt

    ```sh
    apt-get:智能的解决软件包的依赖关系，方便软件的安装和升级（最新版只用apt，去掉了-get）
    apt-cache:查询apt的二进制软件包缓存文件
    apt-file:软件包查找工具，可以查到软件包所含的文件和安装的位置
    apt-get/apt命令[编辑]
    apt-get/apt命令一般需要root权限执行，所以一般跟着sudo命令 例如: sudo apt-get xxxx 格式：
    apt-get在最新版中已更新为apt
    sudo apt-get [options1]  [options2]
    apt-get update ##在修改/etc/apt/sources.list或者/etc/apt/preferences之後运行该命令。此外您需要定期运行这一命令以确保您的软件包列表是最新的
    apt-get install package_name ##安装一个新软件包
    apt-get remove package_name  ##卸载一个已安装的软件包（保留配置文件）
    apt-get --purge remove package_name ##卸载一个已安装的软件包（删除配置文件）
    apt-get autoclean  ##删除已卸载软件的软件包
    apt-get clean ##这个命令会把安装的软件的备份也删除，不过这样不会影响软件的使用的。
    apt-get upgrade ##更新所有已安装的软件包
    apt-get dist-upgrade ##将系统升级到新版本
    apt-get autoclean ##清除那些已经卸载的软件包的.deb文件
    apt-get autoremove ##删除某个包的同时，删除依赖于它的包
    ```
- apt-cache
    ```sh
    apt-cache show package_name ##显示软件包记录，类似于dpkg –print-avail。
    apt-cache search package_name ##在软件包列表中搜索字符串
    apt-cache showpkg package_name ##显示软件包信息。
    apt-cache policy package_name  ##显示软件包的安装状态和版本信息。
    apt-cache depends package_name  ##显示指定软件包所依赖的软件包。
    apt-cache rdepends package_name  ##显示软件包的反向依赖关系，即有什么软件包需依赖你所指定的软件包。
    apt-cache dumpavail package_name  ##打印可用软件包列表。
    apt-cache pkgnames package_name  ##打印软件包列表中所有软件包的名称。
    ```
- apt-file命令
    ```sh
    apt install apt-file  ##安装apt-file命令。
    apt-file update  ##更新软件包的文件库，第一次使用或apt-get update后都需运行一次。
    apt-file search  package_name ## 查找包含特定文件的软件包（不一定是已安装的），这些文件的文件名中含有指定的字符串。  
    apt-file list package_name  ##显示该软件包的文件。
    ```
- 我们使用apt-get安装软件，会自动到软件源服务器下载需要的文件，这些文件存放与/var/cache/apt/archives 目录，如果您不需要可以将其删除，方法为终端执行：
    ```sh
    sudo apt-get clean
    #或者

    sudo apt-get autoclean

    ```
    - 区别

        apt-get clean删除/var/cache/apt/archives/ 和 /var/cache/apt/archives/partial/目录下所有包(锁定的软件包除外)

        apt-get autoclean仅删除/var/cache/apt/archives/ 和 /var/cache/apt/archives/partial/目录下旧版本的软件包和无用的软件包(锁定的软件包除外)
- 删除软件配置

    当我们需要重置一个软件的设置或者彻底卸载该软件（软件+配置）删除该软件对于的配置文件即可. 配置文件存放的位置有： 
    1. 用户设置(特定用户配置) ~/    ~/.config   (~表示用户的家目录)

    2. 全局设置(系统全局配置)

    /usr/share

- aptitude命令
    aptitude 与 apt-get 一样，是 Debian 及其衍生系统中功能极其强大的包管理工具。

    与 apt-get 不同的是，aptitude 在处理依赖问题上更佳一些。举例来说，aptitude 在删除一个包时，会同时删除本身所依赖的包。这样，系统中不会残留无用的包，整个系统更为干净。

    aptitude命令一般也需要root权限执行，所以一般跟着sudo命令 例如: sudo aptitude xxxx
    ```sh
    aptitude [-S 文件名] [-u|-i]
    aptitude [选项] <动作> ...动作 
    (如果未指定，aptitude 将进入交互模式)：
    aptitude install <pkgname>   ##安装/升级软件包
    aptitude remove <pkgname>   ##卸载软件包
    aptitude purge <pkgname>    ##卸载软件包并删除其配置文件
    aptitude forbid-version   ##禁止 aptitude 升级到某一特定版本的软件包
    aptitude update  ##下载新/可升级软件包列表
    aptitude safe-upgrade   ##执行一次安全的升级
    aptitude full-upgrade    ##执行升级，可能会安装和卸载软件包
    aptitude search  ##按名称 和/或 表达式搜索软件包
    aptitude show   ##显示一个软件包的详细信息
    aptitude clean  ##删除已下载的软件包文件
    aptitude autoclean  ##删除旧的已下载软件包文件
    aptitude download   ##下载软件包的 .deb 文件 
    aptitude reinstall    ##下载并(可能)重新安装一个现在已经安装了的软件包
    aptitude --help   ##查看更多关于aptitue的用法
    ```

### dselcet使用频率比较少(暂不介绍)
- dselect 是 dpkg的图形化(ncurses)界面；
- dselect 也会自动处理一些简单的依赖关系，但apt的智能化程度更高一些；

### synaptic 类似于dselect的图形界面

