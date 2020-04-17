# nodejs 前端必选

- js 前端擅长
- nodejs 满足 proxy 要求，服务器需求小 2G就能跑
- ssr （nuxtjs/nextjs/nestjs）
- 稳定方面 pm2 
- 解决出错 （容错处理）
- 性能 --> 可以做压测对比

### 异步 io 的好处

- 前端通过异步 io 可以消除 UI 阻塞
- 假设请求资源 A 的时间为M，请求资源 B 的时间为 N，那么同步请求的时间的消耗是 M + N，如果
采用异步方式，时间为 Max(M,N)
- 随着业务的复杂，会引入分布式系统，时间会线性的增加，M+N+... 和 MAX(M, N...) ,这会放大同步和异步之间的差异。
- I/O 是昂贵的，分布式 I/O 是更昂贵的
- Nodejs 适用于 I/O 密集型，不擅长 CPU 密集型


### 一些底层知识

- CPU 的时钟周期： 1/cpu主频  --->  1s/3.1GHz

```
I/O 类型                  占用CPU时钟周期
----------------------------------------
cpu 一级缓存                  3
cpu 二级缓存                  14
内存                         250
硬盘                         41000000
网络                         240000000


       Ws + Wp                  P               P --> 无穷大
 S =  ---------       S  = -------------        S = 1/f
      Ws + Wp/P             1 + f(p - 1)

# P 是并行系统中的处理器数量；
# f = Ws/W 为串行部分的比例
```
- 操作系统对计算机进行了抽象，将所有输入输出设备抽象为文件。内核在文件 i/o 操作时通过文件描述符进行管理。
应用程序如果需要进行 i/o 需要打开文件描述符，再进行文件和数据的读写。异步 i/o 不带数据直接返回，要获取
数据还需要通过文件描述符再次读取。


### node 对异步 IO 的实现

完美的异步IO应该是应用程序发起非阻塞调用，无需通过遍历或事件循环方式等方式轮询。

```
APPLICATION        nodejs                         libuv                             worker
-----------       bindings                  asynchronous I/O                        threads
   js            (node api)       event                        bloking operation    -------
-----------                       queue    -->   / ---> \        ----------->       -------
                                  ------        /  event \                          -------
   V8            os operation     ------        \  loop  /       execute callback   -------
              <--------------->   ------   <--   \ <--- /       <-------------      同步线程
```

### 几个特殊的API

- setTimeout 和 setInterval 线程池不参与
- process.nextTick() 实现类似 setTimeout; 每次调用放入队列中，在下一轮循环中取出
- setImmediate() 比 process.nextTick优先级低
- node 如何实现一个 sleep ？

```js
- node 的异步 watcher :  `idle-watcher > promise.then > i/o 观察者 > check观察者`
                         process.nextTik               setTimeout    setImmidate

setTimeout(()=>console.log(1), 0)
setImmediate(()=>console.log(2))
process.nextTick(()=>console.log(3))
new Promise(resolve =>{
    console.log(4)
    resolve(5)
}).then(r => console.log(r))
console.log(6)


// sleep 

async function test(){
    console.log('hello')
    await sleep(2000)
    console.log('world')
}
function sleep(t){
    return new Promise(resolve => setTimeout(resolve, t))
}
test();
```

### nodejs 在函数式编程中的应用

1. 高阶函数: 可以将函数作为输入或返回值，形成一种后续传递风格的结果接收方式，而非单一的返回值形式。
后续传递风格的程序将函数业务重点从返回值传递到回调函数中

2. 偏函数：指定部分参数产生一个新的定制函数的形式，就是偏函数。nodejs中异步编程非常常见，我们通过
哨兵变量会很容易造成业务的混乱。underscore, after 变量

### 常用的 nodejs 控制异步技术手段

- 

### v8的垃圾回收机制

- nodejs 使用 js 在服务器端操作大内存对象受到了一定的限制（堆区），64 位系统下约为 1.4 GB，
栈区 32 位操作系统下是 0.7 G，
`-max-old-space-size      app.js`

- 新生代 64 位是 32 M，32位是 16M （js通过新老生带管理内存）
`node--max-new-space-size   app.js`

- process.memoryUsage -> rss 、heaptTotal 、heapUsed
- V8 的垃圾回收策略主要基于分代式垃圾回收机制。在自动垃圾回收的演变中，人们发现没有一种垃圾回收算法能够胜任
所有场景。V8 中内存回收分为新生代和老生带。新生代为存活时间较短对象，老生带中为存活时间较长对象

### scavenge 算法

> 在分代基础上，新生代的对象主要通过 scavenge 算法进行垃圾回收，再具体实现主要采用 Cheney 算法。
Cheney 算法是一种采用复制的方式实现垃圾回收的算法。他将内存一分为二，每一个空间称为 semispace ,
这 2个 Semispace 一个处于使用中（from），一个处于闲置（to）。分配对象时，先分配到from，当开始进行垃圾回收时，
检查 from 存活对象，复制到 to，非存活对象释放。然后互换位置，再次进行回收，发现回收过或者发现 to 空间已经使用
了超过 25%.直接晋升（放大老生代）。
它的缺点是只能使用堆内存的一半，这是个典型的空间换时间的办法，但是新生代声明周期较短，恰恰就适合这个算法。

### mark-sweep & mark-compact

> V8 老生带主要采用 Mark-sweep 和 Mark-compact，。在使用 scavenge 不合适。一个是对象较多，需要复制量
太大，而且还是没能解决空间问题。

- Mark-sweep是标记清除，标记那些死亡的对象，然后清除。但是清除过后内存会出现不连续的情况，这时候需要使用
Mark-compact，他是基于 Mark-sweep 演变来的，它先将活着的对象移动到一边，移动完成后，直接清除边界外的内存。
当CPU空间不足的时候会非常的高效。v8 后续还引入了延迟处理，增量处理，并计划引入并行标记处理

- 引用计数是计算机编程语言中一种内存管理技术，是指将资源（可以是对象、内存、磁盘空间等等）的被引用次数保存起来，
当被引用次数变为0时，就将其释放的过程。使用引用计数可以实现自动资源管理的目的。同时引用计数还可以指使用引用计数
回收未使用资源的垃圾回收算法。

### 常见内存泄露问题

- 无限制长度的数组
- 无限制设置属性和值
- 任何模块内的私有变量和方法均是永驻内存的
- 大循环，无 GC 机会

### 大规模结构站点结构原理分析

- 经典MVC （model-view-controller）
- net 多重架构（App_data, BLL, DALFactory, DataCache, DBUtility, DLLibrary, IDAL, Model,
SQLServerDAL, WebControllers, WebService, website, website.sln, websiteTest）
- net 多层架构

```
    表现层 User Interface layer （web components）
       |
    业务逻辑层BLL   --------->  数据访问层工厂类 DALFactory
    (Business logic layer)    (Data access layer Factory)
                                           |
    数据访问接口层DAL  <--------  数据访问接口层 IDAL  
  （Data access layer）       （Interface Data access layer）
         |
   数据访问 sqlServer封装层  ----> 数据库集群
（SQL server Data access layer）

```

### Java web 多层架构（action， common， dao，po， service）

```
         表现层 User Interface layer （web components）
   struts.xml => DI(IoC)  |
               路由层 Action  ----->   业务处理层 service
        （Business logic layer）                 |
                                                |
            hibernate.cfg.xml <------       持久化访问层PO
                   |                    （persistant object）
                   |
            数据库接口 DAO
        （Data Access Object） ------>     数据库集群

        AOP <-------> spring
```

### 预备上线

- 前端工程化的搭载动态文件的 MAP 分析压缩打包合并至cdn
- 单测、压测、性能分析工具发现bug
- 编写 nginx-conf 实现负载均衡和反向代理
- pm2 启动应用程序小流量灰度上线，修复bug
- 上线前的不眠页

### 多线程

- Master 进程均为主进程，fork 可以创建主从进程
- 通过child_process 可以和 NET 模块组合，可以创建多个线程并监听统一端口。通过句柄传递 完成 自动重启、
发射自杀信号、限量重启、负载均衡
- nodejs默认的机制是采用操作系统的抢占式策略。闲着的进程争抢任务，但是会造成CPU闲置的 IO 暂时并未闲置。
nodejs后来引入了Round-Robin机制，也叫轮叫调度。主进程接受任务，再发给子进程做好自己的事，然后通过进程间
通信来将他们连接起来。这符合 Unix 的设计理念，每个进程只做一件事，并做好，将复杂化为简单，将简单组合强大！

```js
var cluster = require('cluster')
var http = require('http')
var numCPUs = require('os').cpus().length

if(cluster.isMaster){
    require('os').cpus().forEach(()=>{
        cluster.fork()
    })

    cluster.on('exit', (worker, code, signal)=>{
        console.log('worker '+ worker.process.pid + ' died')
    })

    cluster.on('listening', (worker, address)=>{
        console.log("A worker with #"+ worker.id + 'is now connect to '+ address.address+':'+ address.port)
    })
}else {
    http.createServer(function(req, res){
        res.writeHead(200)
        res.end('hello world\n')
        console.log('worker #'+ cluster.worker.id + 'make a reponse')
    }).listen(8000)
}



```

### pm2

> pm2 是一个带有负载均衡功能的 node 应用的进程管理器
当你要把你的独立代码利用全部的服务器上的CPU，并保证进程永远都或者， 0秒的重载。

1. 内建负载均衡（使用 node cluster 集群模块）
2. 后台运行
3. 0秒停机重载
4. 具有Ubuntu 和 centos的启动脚本
5. 停止不稳定的进程（避免无线循环）
6. 控制台检测
7. 提供 http API
8. 远程控制 和 实时的接口API（nodejs 模块，允许和pm2进程管理器交互）

测试过 nodejs v0.11 v0.10 v0.8版本，兼容 coffeescript 基于 Linux 和 macos

```
               服务器集群

    


```

### uv 过千万的项目

- 结构 （docs ， nodeui, scripts, webapp , webapp.build.sh）
- nodeui结构（app.js, bin, config, controllers, lib, middleware, models, nginx-conf, node_modules
package.json, pm2.json, public, receiver-master, test, views）

- 经典代码

```js
router.get(/^\/(\d+)_(\d+)/, cModel.A, cModel.B, cModel.c)

var shaObj = new jsSHA(string, "TEXT")
var hash = shaObj.getHash("SHA-1", "HEX")

var forPound = req.headers["x-forwarded-for-pound"]

callback(new Error('Fail to parse http response to js ,url:'+ reqOtions.url), res, body)

require('./middleware')(app)

async(await ctx.render('index.html'))

```


