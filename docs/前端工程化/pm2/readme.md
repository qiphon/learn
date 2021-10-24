# pm2

### upgrade pm2

```bash
# Install the latest pm2 version:

npm install pm2@latest -g
# Then update the in-memory PM2 :

pm2 update
```

### start Project

```bash 
$ pm2 start app.js
$ pm2 start "npm run start"
$ pm2 start "ls -la"
$ pm2 start app.py

# 传递参数
$ pm2 start api.js -- arg1 arg2

# restart
# 重启1个服务
$ pm2 restart app1

# 重启所有
$ pm2 restart all

# 重启多个
$ pm2 restart app1 app3 app4

# 传递env
$ NODE_ENV=production pm2 restart web-interface --update-env

```

也可以使用配置文件方式启动

```sh
$ pm2 start ecosystem.config.js
```
```js
// ecosystem.config.js
module.exports = {
  apps : [{
    name   : "limit worker",
    script : "./worker.js",
    args   : "limit"
  },{
    name   : "rotate worker",
    script : "./worker.js",
    args   : "rotate"
  }]
}
```


### CheatSheet

```bash
# Fork mode
pm2 start app.js --name my-api # Name process

# Cluster mode
pm2 start app.js -i 0        # Will start maximum processes with LB depending on available CPUs
pm2 start app.js -i max      # Same as above, but deprecated.
pm2 scale app +3             # Scales `app` up by 3 workers
pm2 scale app 2              # Scales `app` up or down to 2 workers total

# Listing
$ pm2 show api         #To display metadata about an application:
pm2 list               # Display all processes status
pm2 jlist              # Print process list in raw JSON
pm2 prettylist         # Print process list in beautified JSON

pm2 describe 0         # Display all informations about a specific process

pm2 monit              # Monitor all processes

# Logs

pm2 logs [--raw]       # Display all processes logs in streaming
pm2 flush              # Empty all log files
pm2 reloadLogs         # Reload all logs

# Actions

pm2 stop all           # Stop all processes
pm2 restart all        # Restart all processes

pm2 reload all         # Will 0s downtime reload (for NETWORKED apps)

pm2 stop 0             # Stop specific process id
pm2 restart 0          # Restart specific process id

pm2 delete 0           # Will remove process from pm2 list
pm2 delete all         # Will remove all processes from pm2 list

# Misc

pm2 reset <process>    # Reset meta data (restarted time...)
pm2 updatePM2          # Update in memory pm2
pm2 ping               # Ensure pm2 daemon has been launched
pm2 sendSignal SIGUSR2 my-app # Send system signal to script
pm2 start app.js --no-daemon
pm2 start app.js --no-vizion
pm2 start app.js --no-autorestart

```

### [pm2 config.json options](https://pm2.keymetrics.io/docs/usage/application-declaration/)

通过配置文件启动

```bash
# Start all applications
pm2 start ecosystem.config.js

# Stop all
pm2 stop ecosystem.config.js

# Restart all
pm2 restart ecosystem.config.js

# Reload all
pm2 reload ecosystem.config.js

# Delete all
pm2 delete ecosystem.config.js
```

### 配置参数说明

```js
// 启动时传递env
// pm2 start ecosystem.config.js --env production
module.exports = {
  apps : [{
    /**
     * 基础功能 
     /
    // 应用名称
    name   : "app1",
    // pm2 执行启动的命令
    script : "./app.js",
    // cwd	(string)	“/var/www/”	the directory from which your app will be launched
    // cwd:'',
    // args	(string)	“-a 13 -b 12” script 中传递的参数	string containing all arguments passed via CLI to script
    args: '',
    // interpreter	(string)	“/usr/bin/python” 执行程序，默认是node	interpreter absolute path (default to node)
    // interpreter: '',
    // interpreter_args	(string)	”–harmony” 执行程序传递的参数	option to pass to the interpreter
    // interpreter_args: '',
    // node_args	(string)	 	alias to interpreter_args
    /** 
     * 高级功能
    */
    // instances	number	-1	number of app instance to be launched
    // instances: 1, 启动的实例数

    // exec_mode	string	“cluster”	mode to start your app, can be “cluster” or “fork”, default fork
    // exec_mode: 'cluster',

    // watch	boolean or []	true	enable watch & restart feature, if a file change in the folder or subfolder, your app will get reloaded 开启watch，文件变化服务会重启
    watch: true,
    // ignore_watch	list	[”[\/\\]\./”, “node_modules”]	list of regex to ignore some file or folder names by the watch feature
    ignore_watch: ['node_modules'],

    // max_memory_restart	string	“150M”	your app will be restarted if it exceeds the amount of memory specified. human-friendly format : it can be “10M”, “100K”, “2G” and so on… 内存超出后重启
    // max_memory_restart： '',

    // env	object	{“NODE_ENV”: “development”, “ID”: “42”}	env variables which will appear in your app
    // env_	object	{“NODE_ENV”: “production”, “ID”: “89”}	inject when doing pm2 restart app.yml --env      env 2种模式，1. env:{} 写死环境变量 2. env_envName: {} 通过启动时出入env来决定使用哪个环境变量
    env_production: {
       NODE_ENV: "production"
    },
    env_development: {
       NODE_ENV: "development"
    },

    // source_map_support	boolean	true	default to true, [enable/disable source map file] 启用sourceMap
    // source_map_support: true

    // instance_var	string	“NODE_APP_INSTANCE”	[see documentation](https://pm2.keymetrics.io/docs/usage/environment/#specific-environment-variables)

    // filter_env	array of string	[ “REACT_” ]	Excludes global variables starting with “REACT_” and will not allow their penetration into the cluster. 排除以“React_”开头的全局变量，不会允许将其渗透到群集中。

    /**
     * logs
    */
    // log_date_format	(string)	“YYYY-MM-DD HH:mm Z”	log date format (see log section)
    // error_file	(string)	 	error file path (default to $HOME/.pm2/logs/XXXerr.log)
    // out_file	(string)	 	output file path (default to $HOME/.pm2/logs/XXXout.log)
    // combine_logs	boolean	true	if set to true, avoid to suffix logs file with the process id
    // merge_logs	boolean	true	alias to combine_logs
    // pid_file	(string)	 	pid file path (default to $HOME/.pm2/pid/app-pm_id.pid)
    
    /**
     * 控制流
    */
    // min_uptime	(string)	 	min uptime of the app to be considered started 最小启动时间

    // listen_timeout	number	8000	time in ms before forcing a reload if app not listening 服务端口超时时，重启

    // kill_timeout	number	1600	time in milliseconds before sending a final SIGKILL 

    // shutdown_with_message	boolean	false	shutdown an application with process.send(‘shutdown’) instead of process.kill(pid, SIGINT) 终止时的消息

    // wait_ready	boolean	false	Instead of reload waiting for listen event, wait for process.send(‘ready’) 

    // max_restarts	number	10	number of consecutive unstable restarts (less than 1sec interval or custom time via min_uptime) before your app is considered errored and stop being restarted 程序异常终止时，重启次数

    // restart_delay	number	4000	time to wait before restarting a crashed app (in milliseconds). defaults to 0. 程序异常终止后多久重启

    // autorestart	boolean	false	true by default. if false, PM2 will not restart your app if it crashes or ends peacefully 自动重启

    // cron_restart	string	“1 0 * * *”	a cron pattern to restart your app. Application must be running for cron feature to work

    // vizion	boolean	false	true by default. if false, PM2 will start without vizion features (versioning control metadatas) 是否有启动版本

    // post_update	list	[“npm install”, “echo launching the app”]	a list of commands which will be executed after you perform a Pull/Upgrade operation from Keymetrics dashboard 代码变动后执行的动作

    // force	boolean	true	defaults to false. if true, you can start the same script several times which is usually not allowed by PM2 为true时，可以再次使用pm2启动相同的app

    /**
     * 部署
    */
    // key	SSH key path	String	$HOME/.ssh  ssh key 路径
    // key: '',

    // user	SSH user	String	 ssh user

    // host	SSH host	[String]	 ssh host

    // ssh_options	SSH options with no command-line flag, see ‘man ssh’	String or [String] ssh参数	 

    // ref	GIT remote/branch	String  git 分支

    // repo	GIT remote	String	 git 仓库地址

    // path	path in the server	String	 服务的路径

    // pre-setup	Pre-setup command or path to a script on your local machine	String	 

    // post-setup	Post-setup commands or path to a script on the host machine	String	 

    // pre-deploy-local	pre-deploy action	String	 
    
    // post-deploy	post-deploy action	String	

    // 部署示例
    // "deploy" : {
    //   "production" : {
    //     "user" : "toobug",
    //     "host" : "server.toobug.net",
    //     "ref"  : "origin/master", //需要部署的分支
    //     "repo" : "git@github.com:TooBug/xxx.git",
    //     "path" : "/var/www/xxx", //web目录
    //     "post-deploy" : "npm install && pm2 startOrRestart ecosystem.json --env production"
    //   }
    // }
  }]
}

```

需要注意：

- apps.name和apps.script应该与PM2识别应用有关，后续执行pm2 restart的时候可以对应到进程（未证实）
- deploy中可以含有多个环境，需要能够通过SSH（公钥认证）登录服务器
- web目录并不是真正的放版本库文件的目录，PM2会再建立一个source子目录，这个才是真正放代码的目录
- post-deploy是指代码部署完之后执行的命令，这里以Node.js为例子，执行依赖安装，然后重启PM2中的进程


在使用过程中还有几个值得注意的点：

- 在部署过程中，PM2会执行一次git reset --hard，意味着如果你修改了配置文件之类的，会被还原，因此最好使用环境变量或者新建文件（不在管理库中）的方式来指定服务器专用的配置项（比如数据库连接信息等）
- 执行服务器命令时需要关注环境变量，比如使用nvm来管理node版本的话，有可能导致PM2连接后找不到node（以及npm/pm2）所在路径，解决办法是在脚本最前面加上指定环境变量的脚本，例如source ~/.bashrc