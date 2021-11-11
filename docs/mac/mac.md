# Mac 相关资料

## 软件

1.Folx GO

2.eDex-UI

3.ScreenShot PSD

4.iStat Menus

5.IINA

6.RAR Extractor

7.OmniDiskSweeper

8.Notability（配合 iPad）

9.MindNode

10.Typora

### 通过终端命令行设置 Mac 鼠标灵敏度

> Mac 调整鼠标灵敏度可以在 系统偏好设置 =》鼠标 =》光标与点按 中通过调整滑动条来调整灵敏度，可是即使调整到最高，与个人习惯还是不太相符合。 在 Mac 上设置面板中调节鼠标移速的功能不能满足您的需求，比如使用 magic mouse。 本文就是帮您突破这个限制。

```
输入命令查看：defaults read -g com.apple.mouse.scaling 就可以看到当前的鼠标速度
输入命令修改：defaults write -g com.apple.mouse.scaling 9 就可以修改鼠标速度为 9 ，
具体数值请根据自己使用习惯调整，10 以上会比较快，个人使用数值为 15。(15还不错)
退出当前用户，注销重新登录，享受高速鼠标吧 ~~~

```
感谢网友	
作者：joooker
链接：https://hacpai.com/article/1537016916951
来源：黑客派
协议：CC BY-SA 4.0 https://creativecommons.org/licenses/by-sa/4.0/


### Mac关闭顽固的开机启动程序

一、检查用户与群组设置
打开“系统偏好设置”窗口，选择“用户与群组”，进入用户与群组窗口（图1）。选择登录项选项卡，再解锁，最后删除开机启动的应用。

二、检查plist文件
分别在以下6个目录中检查是否有与anydesk相关的plist文件

~/Library/Preferences/  – （当前用户设置的进程）
~/Library/LaunchAgents/  – （当前用户的守护进程）
/Library/LaunchAgents/  – （管理员设置的用户进程）
/Library/LaunchDaemons/  – （管理员提供的系统守护进程）
/System/Library/LaunchAgents/ – （Mac操作系统提供的用户进程）
/System/Library/LaunchDaemons/   – （Mac操作系统提供的系统守护进程）

三、修改plist文件
按第二步的要求检查出以下三个与anydesk相关的plist文件，分别修改以下三个文件中的内容。


/Library/LaunchAgents/

打开这个文件下的所有文件在 ```<key>RunAtLoad</key>```后面添加 `<false/>`

### mac 显示任何来源
```
sudo spctl --master-disable
```

### mac hosts 路径
> /etc/hosts


### mac 终端工具

> item2 , brew, zsh

### 显示隐藏文件

在要显示隐藏文件的地方按下

command + shift + .


### 环境变量
```
sudo vi /etc/paths

```	

VMware Fusion 11序列号
7HYY8-Z8WWY-F1MAN-ECKNY-LUXYX
中文版下载地址https://dl.iplaysoft.com/files/1846.html


### 删除管理员
[内容来自网友Lee](https://www.cnblogs.com/saytome/p/8991487.html),感谢

开机的时候按住 command+s  会进入shell 模式

```sh

/sbin/mount -uaw
rm var/db/.applesetupdone
reboot

```
重启后就可以在用户群组里删除原来的管理员了

### brew 清华镜像
这2步都要走
[repo && repo/core](https://mirror.tuna.tsinghua.edu.cn/help/homebrew/)
[Homebrew-bottles](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew-bottles/)

#### brew update 报错
```sh
➜  homebrew git:(stable) brew update
fatal: unable to access 'https://github.com/Homebrew/brew/': The requested URL returned error: 429
Error: Fetching /opt/homebrew failed!
fatal: Could not resolve HEAD to a revision

# solve
➜  homebrew git:(stable) brew update --verbose
```

### locate
linux 下有个好用的mlocate，可以快速搜索文件，对应的updatedb可以更新本地文件数据库，mac下的updatedb命令不能直接使用。locate 命令可以正常使用

```bash
# 更新数据库
sudo /usr/libexec/locate.updatedb
```
