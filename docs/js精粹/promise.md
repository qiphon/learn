# promise/A+ 规范

- [english doc](https://promisesaplus.com/)
- [中文文档](https://www.ituring.com.cn/article/66566)

```js
                                        resolve 触发  -----------------------|
                                             |                       /--  then方法
                                             |                      /
new Promise(fn) --> constructor(fn) --->  执行 fn  -->  promise 实例
                                             |                      \
                                             |                       \-- catch 方法
                                      reject 触发  --------------------------|
                                        

```

### es6 实现promise

实现 promise 需要有的内容： 

- state 存放当前的状态
- value 存放当前状态的值
- then  返回一个Promise对象
- catch 错误捕获
- finally 无论成功失败都执行
- 静态方法 Promise.all()、Promise.resolve
- 在promise 函数中能直接执行同步的resolve
- 防止多次resolve
- then 可以链式调用
- 支持空then函数
- 支持 then 函数传递 thenable 对象
- 如果第一个then 返回的值是一个对象，并且该对象有一个then属性，那么返回值为这个then属性的resolve值
- 如果第一个then 返回的是一个Promise 对象，那么返回值为这个then属性的resolve值
- promise 的resolve 可以是个Promise 对象，返回的是这个Promise对象的resolve值
- 处理then 中的循环Promise
- 支持Promise.all
- 支持reject，catch
- 支持 onfulfilled 和 onRejected 下的 then

```js
class myPromise{
    constructor(fn){
        this.state = myPromise.pending
        this.resolvedCallback = []

        const resolve = val => {
            this.state = myPromise.fulfilled
            this.resolveCallback.map(fn => fn(val)) 
        }
        const reject = val => {
            this.state = myPromise.rejected
        }
        fn(resolve, reject)
    }
    // promise 3 种状态
    pendding = 'PENDINNG'
    fulfilled = 'FULFILLED'
    rejected = 'REJECTED'
    then(fulfill){

    }
}

```