# IOC 入门 (inversion of Control 控制反转)

> 实现控制反转，通过 DI 实现， 还有一种是 DL （目前已经不再使用）

### DI （depandence injection）依赖注入

> ”编程是对复杂性的管理“，计算机世界是一个巨大的抽象结构。

- 推荐库 awilix @github
- awilix-koa 
- @babel/plugin-proposal-decorators  解释装饰器
- eslint
    - babel-eslint
        ```

        ```

### AOP 面向切面编程

- 不会侵入到业务

### 判断浏览器是否支持 module

```html
// es6 Module 支持
Safari 10.1.
Chrome 61.
Firefox 60.
Edge 16.
    <script type="module" src="./index.js"></script>
    <script nomodule src="./index-bundle.js"></script>
<script>
    // 其他极端的情况 需要另行处理
    (function(){
        var script = document.createElement('script')
        var a = 'module' in script
        var b = 'nomodule' in script
        var c = 'onbeforeload' in script
        var d = 'type' in script
        if(!a && !b){
            // 做一些 手动创建 script 标签的工作
        }
    })();
</script>

```

