# pm2 

- 能够动态监控文件的上传 0 秒热启动
- 能够负载均衡CPU
- 能够监控内存占用，CPU温度，是否频繁重启
- restart 个数

```js
// pm2.json
{
    "apps":[
        {
            "name": "mobile map node server",
            "scripts": "app.js",
            "error_file": "/var/logs/node/mobilemap-error.log",
            "out_file": "/var/logs/node/mobilemap-access.log",
            "watch": true,
            "instances": "max", // 沾满CPU
            "exec_mode": "cluster", // 以主线程启动
        }
    ]
}
```

- pm2 命令

```bash
# 查看启动的进程
pm2 list  
# pm2 开启
pm2 start pm2.json
# pm2 重启
pm2 restart pm2.json
# 停止 pm2
pm2 stop all
# 查看pm2执行监控
pm2 monit
# 连接线上监控平台
pm2 link  [hash]

```

- npm 只装生产环境的包

```
npm install --production

```