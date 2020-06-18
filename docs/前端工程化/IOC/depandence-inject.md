# javascript 中的依赖注入

> ”编程是对复杂性的管理“，计算机世界是一个巨大的抽象结构。我们简单的包装东西，
并重复的生产新的工具。思考一下，我们使用编程语言都包含内置的功能，这些功能可能是
基于其他低级操作的抽象方法，包括我们使用的 JavaScript。迟早，我们都会使用别的
开发者的抽象功能，也就是我们依赖其他人的代码。我们希望使用没有依赖的模块，显然
这是很难实现的。即使你创建了很好的像黑盒一样的组件，但总有个将所有部分合并起来的
地方。这就是依赖注入起到的作用。当前来看，高效管理依赖的能力是迫切需要的。

### 目标

假设我们有 2 个模块，一个是发出ajax请求的服务，一个是路由：

```js
var service = function(){
    return {
        name: 'service'
    }
}

var router = function (){
    return {
        name: "router"
    }
}

// 下面是另一个依赖上述模块的函数
var doSomething = function (other){
    var s = service()
    var r = router()
}

```
为了更有趣一点，该函数需要接受一个参数。当然，我们可以使用上面的代码，但是这样不太灵
活。如果我们想要使用 ServiceXMML、ServiceJSON，或者我们想要 mock 一些测试模块，
这样我们不能每次都是编辑函数体。为了解决这个现状，我们首先提出将依赖当做参数，传递给
函数

```js
var doSomething = function (service, router, other){
    var s = service()
    var r = router()
}
```

