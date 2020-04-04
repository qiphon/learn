# es7

- include 

```js
const arr = [1,2,3]

// es5 
arr.indexOf(4) >= 0
//  -->
arr.include(4)
// false

```

- `**` 双×号操作

```js

Math.pow(2, 3)

// --->

2**3
```

- async/await  和 next => promise

> 异步代码： 1. 嵌套回调 2. promise 3. generator

```js
// 等到promise 执行完毕打印 1
async function t(){
    await Promise.resolve()
    console.log(1)
}

async function add (num) {
    const a= 1;
    return a+1
}
console.log(add(2))  // Promise {<resolved>: 2}
add(2).then(res=>console.log(res) )  // 3


// await
function PromiseFn(){
    return new Promise(resolve => setTimeout(()=>resolve('result'), 2000))
}

async function fn (){
    let a = await PromiseFn()
    console.log('异步执行完毕', a)
}
fn()
// 正常的函数不会有任何问题，
// 但是如果promise执行到 reject , 代码就会报错
function PromiseFn(){
    return new Promise((resolve, reject) => setTimeout(()=>reject('result'), 2000))
}

async function fn (){
    let a = await PromiseFn()
    console.log('异步执行完毕', a)
}
fn()   // VM1103:8 Uncaught (in promise) result

// 如果要捕获错误，就需要用 try,catch 包裹 await
// 或者在fn 后面添加 .catch
fn().catch(e=> console.log(e))
// 在 await 处执行捕获错误，不会影响 await后面的代码
async function fn (){
    let a = await PromiseFn().catch(e=>console.log('catch', e))
    console.log('异步执行完毕', a)   
}

fn() 
// catch result
// 异步执行完毕 undefined

// 多个 await 同时执行、

function PromiseFn(){
    return new Promise((resolve, reject) => setTimeout(()=>resolve('result'), 2000))
}
function PromiseFn1(){
    return new Promise((resolve, reject) => setTimeout(()=>reject('result'), 2000))
}

async function fn(){
    console.time('fn')
    let r1 = await PromiseFn()
    let r2 = await PromiseFn1()
    console.timeEnd('fn')
}

fn()   //  fn: 4000.39599609375ms
//  从时间上可以看出来 2个await 不是同时执行的 

async function fn2(){
    console.time()
    let c = await Promise.all([PromiseFn(), PromiseFn1()])
    console.timeEnd(c)
}
fn2().catch(err=> console.log(err, 'fin'))   // 2000.207763671875ms

// promise.all 一旦发生错误，就会丢弃所有的结果，所以我们要将catch写在
// 每个单个的异步中，防止我们的结果被丢掉
var p1 = Promise.resolve(3).catch(function(err) {
    return err;
});
var p2 = Promise.reject(2).catch(function(err) {
    return err;
});
var p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, "foo");
}).catch(function(err) {
    return err;
}); 
    
async function fn(){

    var c = await Promise.all([p1, p2, p3]).then(values => { 
        return values
    }).catch(function(err) {
        return 1 //不会走到这里
    });
    console.log(c, '执行完毕;;')
}
fn()   
//  [3, 2, "foo"] "执行完毕;;"

```

- object.values

```js
const a = {
    a: 1,
    b: 2
}
Object.values(a)  // [1,2]

Object.values('abc')
// (3) ["a", "b", "c"]

// 遍历对象的键值
for (const [key,val] of Object.entries(a)){
    console.log(key, val)
}

```

- string  padStart(targetLength [,paddingStr]) \  padEnd

```js
console.log('123'.padStart(5, '=='))  // ==123
console.log('123'.padStart(5, '========'))  // ==123

```

- 获取对象的描述符 Object.getOwnPropertyDescriptors

```js

let a = {
    name: 'qiphon',
    get fn(){
        return 'fn'
    }
}

console.log(Object.getOwnPropertyDescriptors(a))

/**
{name: {…}, fn: {…}}
    name:
        value: "qiphon"
        writable: true
        enumerable: true
        configurable: true
        __proto__: Object
    fn:
        get: ƒ fn()
        set: undefined
        enumerable: true
        configurable: true
        __proto__: Object
    __proto__: Object
*/

```

- sharedArrayBuffer 与 Atomics

get js 带来了 多线程的功能，高级特性，js 引擎核心改进

共享内存主要思想：把多线程引入 js

新的全局对象： SharedArrayBuffer（多线程可以直接在这里读取数据，之前只能用postMessage）

同时引入了进程锁 Atomics

```js
// 创建缓冲内存 , 单位字节
// new SharedArrayBuffer(length)

// main.js
const worker = new Worker('./worker.js')
worker.postMessage('hello i am main')
worker.onmessage = ev => console.log(ev, ev.data)

// worker.js
onmessage= ev => {
    console.log(ev, ev.data, this)
    postMessage('i am worker')
}

// 使用 SharedArrayBuffer
/***
 *  Atomics 此原子操作保证在写上修改的值之前不会发生其他写操作。
 *  静态方法 Atomics.load() 返回一个数组当中给定位置的值。
 *  静态的Atomics.store（）方法将给定的值存储在数组中的指定位置，并返回该值。.
 *  Atomics.compareExchange() 静态方法会在数组的值与期望值相等的时候，将给定的替换值替换掉数组上的值，然后返回旧值
 *  Atomics.exchange() 静态方法会用给定的值替换掉数组上的值，然后返回数组的旧值
 * 
 *  Atomics.add() 静态方法会将给定的值加到数组里的某个特定位置上，并返回该位置的旧值。
 *  Atomics.sub() 静态方法在数组中的给定位置减去给定值，并返回该位置的旧值
 *  
 *  Atomics.and() 静态方法会将给定的值与数组上的值进行按位与操作，并将结果赋值给数组，然后返回数组该位置上的旧值
 *  静态方法 Atomics.or() 用数组中指定位置的值进行一次按位或运算，并返回未计算时数组中指定位置处的值。
 *  Atomics.xor() 静态方法会在数组中给定位置进行一次按位异或操作，并返回该位置的旧值
 * 
 *  静态方法 Atomics.isLockFree() 用于校验是否能够使用原子操作的TypedArray的标准字节长度之一. 若该字节长度为可处理的TypedArray标准字节长度之一则返回  true
 *  
 * 
 *  静态方法 Atomics.wait() 确保了一个在 Int32Array 数组中给定位置的值没有发生变化、仍然是给定的值时进程将会睡眠，直到被唤醒或超时。该方法返回一个字符串，值为"ok", "not-equal", 或 "timed-out" 之一。
 * 静态方法 Atomics.notify() 提醒一些在等待队列中休眠的代理。
 * 
 *  
 */
// main.js
const worker = new Worker('./sharedWorker.js')
// 创建 1kb 内存
const sharedM = new SharedArrayBuffer(1024)
// 创建视图
const intArray = new Int32Array(sharedM)
for(let i=0; i< intArray.length; i++){
    intArray[i] = i
}
// console.log(intArray, 'intArray')
worker.postMessage(intArray)
worker.onmessage = ev => {
    console.log( ev.data, intArray)
    console.log(Atomics.load(intArray, 20))
}

// worker
onmessage = ev => {
    let sharedM = ev.data
    // let Int32Array = sharedM.Int32Array
    console.log(  Atomics.load(sharedM, 6) )
    console.log(  Atomics.add(sharedM,0, 6) )
    Atomics.store(sharedM, 20, 777)
    postMessage('change')
    // console.log(Int32Array, sharedM)
}


```