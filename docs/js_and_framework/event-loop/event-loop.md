# event loop 

## 浏览器的event loop

> 为什么js 是单线程的，因为js设计是为了浏览器的，如果是多线程，多个线程中同时操作一个dom 就会引起错误
所以，js 选择了单线程

```
        js
------------------          web apis
   heap |  stack |        
        |        | ----->    dom
        |        |           ajax
        |        |           setTimeout
        |        |              |
------------------              |
            event loop          |
                ⇧              ⇩
callback |------------------------------------
queue    | onClick, onload, setTimeout
         |------------------------------------

```
当 同步事件执行完毕后，会去异步队列中挨个查看事件是否执行完成，从第一个异步开始，一个个向后处理

### 异步队列

> 异步队列又分为：宏任务队列和微任务队列

```
      微任务队列      --------------------------------😀
                     微任务  -->  微任务
                    ----⇧-----------⇩----------------
                        ⇧yes        ⇩
            ------------⇧-----no----⇩--------------------
宏任务队列     宏任务-> 有微任务 -----> 宏任务  ----> 宏任务
            ----------------------------------------------

```

- 浏览器中的任务队列

```
        宏任务                    |        微任务
                                 |
        script                   |        promise (async)
        setTimeout               |        MutationObserver
        setInterval              |
                                 |     
    requestAnimationframe        |
                                 |

```

- 练习

```js
// 1
setTimeout(()=>console.log('timeout'))

const p = new Promise(resolve=>{
    console.log('promise start')
    resolve(1)
    console.log('promise end')
})

p.then(res=> console.log('promise result'+ res))

// promise start
// VM193:6 promise end
// VM193:9 promise result1
// VM193:1 timeout

// 2
setTimeout(()=>{
        console.log('timeout1')
    Promise.resolve().then(()=>{
        console.log('promise1')
    })
})

Promise.resolve().then(()=>{
    console.log('promise2')
    setTimeout(()=>{
        console.log('timeout2')
    })
})

// VM676:10 promise2
// VM676:3 timeout1
// VM676:5 promise1
// VM676:12 timeout2

// 3. async
async function async1(){
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}

async function async2(){
    console.log('async2')
}

async1()
console.log('script')

// VM1531:2 async1 start
// VM1531:8 async2
// VM1531:12 script
// VM1531:4 async1 end

// 5. 
async function async1(){
    console.log('async1 start')
    await new Promise(resolve=>{
        console.log('promise1')
    })
    console.log('async1 success')
    return 'async1 end'
}
console.log('script start')
async1().then(res=> console.log(res))
console.log('script end')

// script start
// VM1988:2 async1 start
// VM1988:4 promise1
// VM1988:11 script end
// !!! 因为 await 后面的Promise 没有执行 resolve，所以程序会一直等待，async 中后面的代码就不会被执行

// 6.
async function async1(){
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}

async function async2(){
    console.log('async2')
}

console.log('script start')

setTimeout(()=>{
    console.log("setTimeout")
})

async1()

new Promise((resolve)=>{
    console.log('promise1')
    resolve()
})
.then(()=>{
    console.log('promise2')
})
.then(()=>{
    console.log('promise3')
})
.then(()=>{
    console.log('promise4')
})
console.log('script end')


// await 后面的代码是异步的
// script start
// VM4454:2 async1 start
// VM4454:8 async2
// VM4454:20 promise1
// VM4454:32 script end
// VM4454:4 async1 end
// VM4454:24 promise2
// VM4454:27 promise3
// VM4454:30 promise4
// VM4454:14 setTimeout

// 7.
async function async1(){
    console.log('async1 start')
    return new Promise(resolve=>{
        resolve(async2())
    }).then(()=>{
        console.log('async1 end')
    })
}
function async2(){
    console.log('async2')
}
setTimeout(function(){
    console.log('setTimeout')
})

async1()

new Promise((resolve)=>{
    console.log('promise1')
    resolve()
})
.then(()=>console.log('promise2'))
.then(()=>console.log('promise3'))
.then(()=>console.log('promise4'))


('async1 start')
('async2')
('promise1')
('async1 end')
('promise2')
('promise3')
('promise4')
setTimeout

// 8.
async function async1(){
    console.log('async1 start')
    return new Promise(resolve=>{
        resolve(async2())
    }).then(()=>{
        console.log('async1 end')
    })
}
/*
* 只修改了这里
  async 就相当于一个Promise
  async 函数也会返回一个Promise
  所以这样写，和下面的写法一致
*/
async function async2(){
    console.log('async2')
    return 1
}
// function async2(){
//     console.log('async2')
//     return {
//         then(r){
//             r({
//                 then(r){
//                     r()
//                 }
//             })
//         }
//     }
// }

async1()

new Promise((resolve)=>{
    console.log('promise1')
    resolve()
})
.then(()=>console.log('promise2'))
.then(()=>console.log('promise3'))
.then(()=>console.log('promise4'))


// async1 start
// VM583:10 async2
// VM583:19 promise1
// VM583:22 promise2
// VM583:23 promise3
// VM583:6 async1 end
// VM583:24 promise4

```

### nodejs 中的event loop

```
                                                            LIBUV
    APPLICATION  |    NODE.JS      |   event queue                            WORKER         
-----------------|    BINDINGS     | ---------------                          THREADS
⇧ JAVASCRIPT  ⇩  |   (node api)    |                 -->   → → →     -->  ----------
-----------------|                 | ---------------     ↗  EVENT ↘        ----------
        V8       | --------------> |                     ↑   LOOP  ↓        ----------
javascript-engine|        os       | ---------------     ↖  ← ← ↙         ----------
                 |    operation    |                 <--               <--   ----------
                 |  <------------- | ---------------                         ----------


# 异步队列执行阶段

 ----------------------------------------------------------
↱    timer  (这个阶段处理定时器)
↑----------------------------------------------------------
↑    padding callbacks  （IO 回调）
↑----------------------------------------------------------
↑    idle，prepare
↑----------------------------------------------------------              | incoming
↑    poll  （监听事件进来和事件完成，相当于event loop） <----> connections    | 
↑    (poll 执行完成后会去检查是否有定时器到期，如果没有，进入下一个阶段)           | data,etc.
↑----------------------------------------------------------            
↑    check  这里处理 setImmediate
↑----------------------------------------------------------
↥    close callbacks
 ----------------------------------------------------------
  每个阶段切换到下一个阶段之前会执行 nextTick，上面这些阶段，组成了一个时钟周期，
  node工作时，就是在不停地执行这个时钟周期
  nextTick 的优先级高于 Promise


# node 中的任务队列

    宏任务                       微任务                
 -------------------------|---------------------------------|
    setTimeout            |     Promise                     |
 -------------------------|---------------------------------|
    setInterval           |     process.nextTick            |
 -------------------------|---------------------------------|
    setImmediate          |                                 |
 -------------------------|---------------------------------|
    IO                    |                                 |
 -------------------------|---------------------------------|

```

练习题

```js
// 1. setTimeout、setImmediate 对比
setTimeout(_ => console.log('timeout'))
setImmediate(_ => console.log('immediate'))

// 多次在控制台打印，会有不同的执行顺序出来，主要是因为在 poll 阶段会检查timer是否到期
// 由于电脑性能问题，setTimeout 可能还没有到期，那么timeout会到下一次事件循环中执行，
// 而 setImmediate 处理的顺序是固定不变的，所以会产生如下结果
// qiphon@qiphon:/event-loop$ node node-event.js 
// immediate
// timeout
// qiphon@qiphon:/event-loop$ node node-event.js 
// timeout
// immediate

// 2. IO 中的 setTimeout 和 setImmediate 
var fs = require('fs')
fs.readFile('./event-loop.md', function(){
    setTimeout(_=>console.log("timeout"))
    setImmediate(_=>console.log("immediate"))
})
// 这次无论执行多少次都是先执行 immediate 
// 因为 IO 是在 poll 阶段执行的，这个时候注入的 setTimeout 还没有在timer 中，
// 所以 setTimeout 只能在下一个时钟周期中执行，而 setImmediate 是在 poll 的下一刻执行
// 所以在 poll 阶段注入的 immediate 会立即执行
// immediate
// timeout

```

- 关于nextTick

> 每一个阶段执行完成之后，在当前阶段尾部触发 nextTick，（nextTick执行是在每个阶段完成后，
不是在每个时钟周期完成后）

案例，常见的 nodejs 回调函数（比如fs）第一个参数都是抛出错误

```js
function apiCall(arg, callback){
    if(typeof arg !== 'string'){
        return process.nextTick(
            callback, 
            new TypeError("argument should be string")
        )
    }
}

```

比较 nextTick 和 setImmediate

```js
setImmediate(()=>{
    console.log('immediate')
})
process.nextTick(()=>{
    console.log('nextTick')
})

// nextTick
// immediate

```

### 不同版本 node 中的 eventloop

- node 11 之前，一旦执行一个阶段，会现将这个阶段里所有的任务执行完之后，才会去执行该阶段剩下的微任务

- node 11 之后，一旦执行一个阶段里的宏任务，就立刻执行对应的微任务队列(和浏览器一致)

```js
setTimeout(()=>{
    console.log('timer1')
    Promise.resolve().then(_=> console.log('promise1'))
})
setTimeout(()=>{
    console.log('timer2')
    Promise.resolve().then(_=> console.log('promise2'))
})

// // node 8
// timer1
// timer2
// promise1
// promise2
// // node 12.16
// timer1
// promise1
// timer2
// promise2


setImmediate(()=>console.log('immediate1'))
setImmediate(()=>{
    console.log('immediate2')
    Promise.resolve().then(_=>console.log('promise'))
})
setImmediate(()=>console.log('immediate3'))
setImmediate(()=>console.log('immediate4'))

// node 8
// immediate1
// immediate2
// immediate3
// immediate4
// promise

// node 12
// immediate1
// immediate2
// promise
// immediate3
// immediate4

setImmediate(()=>console.log('immediate1'))
setImmediate(()=>{
    console.log('immediate2')
    process.nextTick(_=>console.log('nextTick'))
})
setImmediate(()=>console.log('immediate3'))
setImmediate(()=>console.log('immediate4'))

// node 8
// immediate1
// immediate2
// immediate3
// immediate4
// nextTick

// node 12
// immediate1
// immediate2
// nextTick
// immediate3
// immediate4


```