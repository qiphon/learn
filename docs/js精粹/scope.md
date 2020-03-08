# scope

1. var 声明的变量是函数级作用域

```js

if(false){
    var i = 0;
}
console.log(i)  // undefined

console.log(j)  // VM39318 Uncaught ReferenceError: j is not defined

// 接下来看下函数作用域是什么

function test(){
    var i = 12
}
console.log(i)  // Uncaught ReferenceError: i is not defined

// 另一个有趣的例子
function test(){
    console.log(i)
}

test()   // undefined

var i = 11 

test()   // 11


// 相关的面试题
var j = 10

;(function test(){
    console.log(j)   // undefined
    var j = 13
}())


// 闭包相关

var j = 10

function test(){
    // console.log(j)   // undefined
    var j;
    j = 10;
    var k = 1000;
    return function(){
        return k
    }
    console.log(j)  // 有return 不执行这个
}
var t = test()()  // 1000


// 另一个有趣的例子

;(function(){
    console.log(a)   // function a(){}
    var a = 1;
    function a(){

    }
    console.log(a)   // 1
})()

// 类似的一个例子、
;(function(){
    var a = b = 1
})()
console.log(a)   // a is not defined
console.log(b)   // 1

// let 的作用域

if(false){
    let a= 1;
}
console.log(a)   // Uncaught ReferenceError: a is not defined

// let 的实现

if(true){
    try{
        throw 1
    }catch(a){
        console.log(a)   // 1
    }
}

// let 的另一个
var i;
if(true){
    i = 5  // 这里会报错
    let i;
}
console.log(i)

// 关于with  （with 已经不推荐使用了）
// with 只能修改已有的属性，没有的会加到全局

var a = { a: 1 }
with(a){
    a= 3;
    b= 4
}
console.log(a)    // {a: 3}
console.log( b )   // 4 

// 闭包
function test(){
    var a= {a: 11}
    return function(){

        // 当有下面三种之一的情况的时候，上面的a
        // 不会被回收，不管你用没有用a
        // 除非 是 window.eval("")
        eval("")
        with(){

        }
        try{}catch(e){}
    }
}
test()

// 关于 this  ===============  this  ===================

this.a = 12

var b = {
    a: 20,
    init(){
        return this.a
    }
}

b.init()  // 20

var c = b.init
c()  // 12


// 如果换成箭头函数
this.a = 12

var b = {
    a: 20,
    init:()=>{
        return this.a
    }
}

b.init()  // 12

var c = b.init
c()  // 12


// 下一个
function test(){
    this.a = 20
    this.say = function(){
        console.log(123)
    }
}
test.prototype.a = 30

var c = new test()
c.a   // 20

// 打印这个实例可以看到 ，test.prototype.a = 30
// 这个属性被挂载在 c 的 __proto__ 上，只有实例 c 上没有
// 属性 a的时候，c.a 才能等于 30
// console.dir(c)
// VM54795:1 
// test
//  a: 20
//  say: ƒ ()
//  __proto__:   
//      a: 30
//      constructor: ƒ test()
//      __proto__: Object



// 相同的问题，放到class里面】
// test.prototype.constructor = function test(){}
// 下面的就是要理解这个问题

class test {
    constructor(){
        this.bb = 1
        this.a= function(){
            console.log(1)
        }
    }
    a(){
        console.log(1)
    }
}
var c = new test()  
// c.a()   // 1
console.log(c.bb)  // 1
test.prototype.a = function(){
    console.log(2)
}
test.prototype.bb = 22

// c.a()  // 2
console.log(c.bb)  // 1

// 这里的 实例c的方法 c.a  为什么是2呢
// 打印 class 实例产生的 c ，我们可以发现，实例c并没有
// 实例方法a， c.a 其实是 class test 上的，所以这里的值会变
// console.dir(c)
// test {bb: 1}
// bb: 1
// __proto__:
//  bb: 22
//  a: ƒ ()
//  constructor: class test
//  __proto__: Object

// 我们稍加改动，在constructor中加入方法 a ，我们的结果就变了
// 这个时候的 a方法已经在实例c 上面了
class test {
    constructor(){
        this.bb = 1
        this.a= function(){
            console.log(111)
        }
    }
    a(){
        console.log(1)
    }
}
var c = new test()  
test.prototype.a = function(){
    console.log(2)
}
c.a()  // 111
console.dir(c)   // test {bb: 1, a: ƒ}


```

拓展一个小技巧

```js

var a = 'abc'

// 如何将 a 转为 [a,b,c]

// 1. 这个应该是最先考虑到的
a.split('')  

// 2. es6 真的很好
Array.from(a)

[...a]

// 另一个es5 的方法  ,去数组处借方法
Array.prototype.slice.call(a, 0)


```
