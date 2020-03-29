# js 中的 this

> 谁调用它，this 就指向谁

下面有几个例子

```js
this.m = 1000
var obj = {
    m : 100,
    test: function(){
        console.log(this.m)
    }
}

obj.test()  // 调用者是 obj 所以打印出来的是100

// 闭包
this.m = 1000
var obj = {
    m : 100,
    test: function(){
        // console.log(this.m)
        return function(){
            console.log(this.m)
        }
    }
}
console.log( (obj.test())() )   

// 由于返回的函数没有调用者，所以这里的 this 指向 window
// 相当于 var t = obj.test() ;  window.t()
// 结果 1000

// 构造函数中的 this
function test(){
    this.a = 1
}
test.prototype.a = 100
var p = new test()
console.log(p.a)

// 这里的结果是 1
// 如果有疑问可以打印一下实例化后的 p 
// prototype 中的属性 a 在原型链上，只有 p 对象属性中没有
// a 的时候才能访问到原型链上的 a 属性

```

更多 this 相关内容在练习题中