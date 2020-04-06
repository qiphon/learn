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
// yideng1

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

// undefined
// window

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

```

4. 写出输出值，为什么

```js
Objectprototype.a = 'a'

Function.prototype.a = 'a1'

function Persion(){}

var yideng = new Persion()

console.log(Persion.a)  // a1
console.log(yideng.a)   // a
console.log(1..a)       //  undefined
console.log(1.a)       // 报错
console.log(yideng.__proto__.__proto__.constructor.constructor)
// Object
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
console.log( typeof test)  // object
console.log(b)  // b is not defined

```

6. 请写出 你了解的 ES6 元编程


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
//  11

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

// 1 
// 3
// 2
// 4 

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
// end
// 23

```

10. 请写出如下输出值，并解释为什么

```js
var s = []
var arr = s
for(var i =0; i< 3; i++){
    var pusher = {
        value: "item" + i
    }, tmmp;
    if(i !==2){
        tmp = []
        pusher.children = tmp
    }
    arr.push(pusher)
    arr = tmp
}

console.log(s[0])

// 结果 
{
    value: "item0",
    children = []
}

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