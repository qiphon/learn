# vue 源码

### vue2 源码 思想 设计

- 源码结构

    ```
    dist  打包后文件
        common
        esm
        no
        runtime    vue运行时  （vue代码在执行器运行的过程中保存的一种状态） 运行过程中状态的描述
            - vue 通过 webpack + vue 离线编译
        runtime + compiler  
            - 在线编译

    flow  一个框架   ： ts 一门语言（需要编译器）  --> 规范变量类型

    packages  lerna 多包管理工具

    scripts  打包脚本

    src      逻辑代码
        compiler
        core   
            components   keep-alive 实现
            global-api   全局 vue属性方法
            instance     vue 实例  生命周期
            observer     数据收集和依赖
            util         常用工具类
            vdom         虚拟dom

        platforms
        server


    benchmarks  跑分（性能）

    ```
    #### 双向数据绑定
        - object.defineProperty
            - 数组重写
            - get 订阅 set 派发
        - observer  数据监听，把数据处理成响应数据 通过 object.defineProperty
                                            -->array
                                            --> object
            ```js
            new Observer(data)   --->  是否是数组
                是 --> 重写数组 
                    --> [].__proto__ = ArrayMethod{} (继承了原来的数组方法  def 拦截)
                否 --> this.walk  --> object.keys -> 遍历所有的key （Object.defineProperty）
                    --> get  把所有的依赖收集 dep.push
                    --> set  分发，遍历数组


            // 重写会导致数据变化的方法，（防止触发多次 set、get）

            ```

        - watcher   连接数据和指令

            Dep 收集的是 watcher 而不是指令

        - dep    订阅、分发
            ```js
            addsub  添加监听  数组push
            notify  分发   数组遍历
            ```

        - directive   指令 渲染、执行事件
            - v-if
            - v-html
            - v-on
        - 数据绑定模式
            ```
                                                                            数据监听
                        每个指令对应一个watcher          订阅、发布管理          |----------|
            directive   ---------------->  watcher ⇆⇆⇆⇆⇆ Dep  ⇆⇆⇆⇆⇆⇆ | Observer |
                ⇓                                                           |  getter  |       
                ⇓                                                           |  setter  |
              {{}}、v-if、v-model ...                                        |----------|

            ```
    ### 初始化过程

    - observer 处理数据
        - Dep 收集依赖 --> watcher
    - compile  编译模板
    - watcher  指令数据连接器
        - get 获取数据 触发get --> Dep.target --> addSub --> 不同的方法执行，处理视图
        - set 修改数据 --> notify --> 遍历 watcher --> watcher.update --> get
        
- lru 算法


### vue3 数据处理 模板解析 AST
