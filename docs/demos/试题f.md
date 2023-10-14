# 第一讲 F 卷

1. 写出输出值

```js
console.log(a)
console.log(typeof yideng(a))

var flag = true
if(flag){
    var a = 1
}

if(flag){
    function yideng(a){
        yideng = a
        console.log('yideng1')
    }
}else {
    function yideng(a){
        yideng = a
        console.log('yideng2')
    }
}

// undefined
// yideng is not a function

// 解析
// if 中的 var 声明 和 函数名会被提升
// 块级作用域中的修改，不会影响到外面

{
    function yideng(){}
    yideng = 23
    console.log('inner', typeof yideng)
}
console.log('outer', typeof yideng)

// inner number
// VM2075:7 outer function

{
    function yideng(){
        yideng = 2
        console.log(yideng)
    }
}

```

2. 写出输出

```js
function fn (){
    console.log(this.length)
}
var yideng = {
    length: 5,
    method: function (){
        "use strict";
        fn();
        arguments[0]()
    }
}

const result = yideng.method.bind(null)
result(fn, 1)

// 0
// 2
// 考点1  "use strict" 的使用 fn 函数不受“use strict” 的控制 this -> window
// window 的 length 属性指的是 iframe 的个数

```

- 附加题

```js
function yideng(a, b, c){
    console.log(this.length)
    console.log(this.callee.length)
}

function fn (d) {
    arguments[0](10, 20, 30, 40, 50)
}

fn(yideng, 10, 20, 30)

// 4
// 1

```

3. 变量 a 是否会被 GC 回收 ， 为什么？

```js
function test(){
    var a = 'yideng'
    return function (){
        eval('')
    }
}

test()()

//  不会
// GC 不知道 eval 是否使用了变量 a

// 解析
// 如果 是 window.eval() 就会被回收，因为window把 eval带到了全局作用域去执行了
/**
  影响闭包回收的有
  1. eval()
  2. with()
  3. try{}catch
  4. new Function
*/

// 闭包，当函数中的作用域被保留时，这个函数就是一个闭包
// 正规的闭包应该是这样的
function a(){
    var b = 123
    return function(){
        return a++
    }
}

// 

```

4. 写出输出值，为什么

```js
Object.prototype.a = 'a'

Function.prototype.a = 'a1'

function Persion(){}

var yideng = new Persion()

console.log(Persion.a)  // a1
console.log(yideng.a)   // a
console.log(1..a)       //  undefined XXXXX  --> a
console.log(1.a)       // 报错
console.log(yideng.__proto__.__proto__.constructor.constructor)
// 
// Object.prototype 和 Function.prototype 打印的内容差距很大原因是为什么

```

5. 写出如下结果

```js
{
    var a = 1;
    const b = 2;
    function test(){}
    test = 3
    console.log( typeof test)  // number
}

console.log(a)   // 1
console.log( typeof test)  // function
console.log(b)  // b is not defined

```

6. 请写出 你了解的 ES6 元编程

就是扩充语言本身的能力

```js


```


7. 请按照要求作答，并写出原理？请解释下babel编译后的async原理

```js
let a = 0

let yideng = async () => {
    a = a + await 10;
    console.log(a)
}
yideng();
console.log(++a)

// 1
// 11 XX  -> 10

// 解析
// 异步函数后执行，所以先输出1
// await 之后的东西是异步执行的东西， await 之前的东西是同步的，会被存储起来

// 加强一下
async function async1(){
    console.log(1)
    await async2();
    console.log(3)
}

async function async2(){
    console.log(2)
}

async1()
console.log(4)

// 结果 1243 
async 函数也是立即执行的，async 中的异步操作才是后执行的。
这个和 promise.resolve 是一样的


```

8. 点击 button 会有什么反应？ 为什么？ 怎么解决？

```js
<button id="test"></button>

$('#test').click(function(){
    console.log(1)
})
setTimeout(function(){
    console.log(2)
}, 0)

while(true){
    console.log(Math.random())
}

// button 点击没有反应，因为下面的while占者主线程
// 需要把 while 移出主线程
// 把同步任务移到异步去

```

9. 回答输出结果，用ES 5 实现Promise A+ 规范的代码，同时解释如何使用 Promise完成事物的操作

```js
const pro = new Promise((resolve, reject)=> {
    setTimeout(()=>{
        resolve(1)
    })
    console.log(2)
    resolve(3)
})

pro.then(res=> console.log(res))
console.log('end')
// 2 end 3
// promise 的 resolve 只能执行一遍
// promise不是异步的，resolve 是异步的
// 构造函数是立即执行的

```

10. 请写出如下输出值，并解释为什么

```js
var s = []
var arr = s
for(var i =0; i< 3; i++){
    var pusher = {
        value: "item" + i
    }, tmp;
    if(i !==2){
        tmp = []
        pusher.children = tmp
    }
    arr.push(pusher)
    arr = tmp
}

console.log(s[0])

第一次循环 i= 0
s=[]
arr = s 
pusher = {
    value: item0
    children: []
}
tmp = []
puser.children -> tmp
s -> arr -> [{value: item0, children: -> tmp    }]
arr ->tmp
结果 arr -> tmp  <-- pusher.children
第二次 i=1
pusher -> {value: item1}
pusher.children (上一次的) --> arr --> tmp -> []
pusher.children (上一次的)-> arr -> [{value: item1, children: --> tmp  }]

第三次 i = 2
pusher = {
    value: item2
}
pusher.children (i=1, 因为 pusher 是每次重新赋值的，所以2个 children 不一样) ->  arr(i=1) -> 
    -> tmp (i ==1) -> [{value: item2}]

所以 s 的值也就跟着改变了

```

- 俯加题

请描述你理解的函数式编程，并书写如下结果。
那么你能使用 Zone + RX 写出 FRP 的代码吗？

```js
var Container = function(x){
    this.__value = x
}

Container.of = x => new Container(x)

Container.prototype.map = function (f){
    return Container.of(f(this.__value))
}

Container.of(3)
    .map(x=> x + 1)
    .map(x => 'Result is' + x)

```