# linux 基本命令

> linux 只有一个盘符（cd / ,即可以切换的系统的跟目录。 cd ~  ,会切换到用户的目录位置），

#### ls & dir  目录命令

> ls 和 dir都能显示当前目录的下含有的文件或目录，但是ls命令中文件夹显示一般是蓝色的，dir则全部都是一个颜色，另外ls还拥有额外的扩展命令

```
ls -l  // 展示目录的详细信息

ls -a  // 查看所有的文件


```

#### pwd 查看当前的目录

#### logout  注销用户

#### shutdown -h now 立刻关机

#### shutdown -r now (或者是 reboot) 立刻重启计算机

#### mkdir  创建文件夹

#### touch  新建文件

####  rmdir 删除文件夹（只能删除空的文件夹）

#### mv 移动文件

#### rm 删除文件/文件夹  （rm -rf *   删除该目录下所有文件）

####  ln 创建链接

> ln -s 目标文件 要创建的软连接地址     --》 在指定位置创建一个软链接

#### cat 打开指定的文件

#### init 命令

> 0: 关机
1:单用户
2: 多用户没有网络服务
3: 多用户有网络服务
4: 系统未使用保留给用户
5: 图形界面
6: 系统重启

执行方式：  init 6    ——》这样就是重启系统

#### who am i   // 查看当前用户

### 文件权限

```sh

// 输入 ls -l 命令就会看到这的一个列表

drwx------  6 qifeng  staff   192B  4 22 13:50 Documents
drwx------ 14 qifeng  staff   448B  8  7 15:19 Downloads
drwx------ 75 qifeng  staff   2.3K  8  2 10:34 Library
drwx------  4 qifeng  staff   128B  8  7 15:32 Movies
drwx------  4 qifeng  staff   128B  4 30 10:25 Music
drwx------  3 qifeng  staff    96B  4 19 10:54 Pictures


第一位 的d 代表是目录
        l 表示链接
        - 表示是文件

后面的9位是 文件的权限，rwx （r 可读 用4表示，w 可写 用2表示， x 可执行 用1表示） ，分为3组（分别是用户，用户组，其他人 的权限）


```