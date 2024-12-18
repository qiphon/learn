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
class myPromise {
    static resolve(val) {
        return new myPromise(resolve => resolve(val))
    }
    static all(arr) {
        let len = arr && arr.length
        let resultArr = []
        if (len) {
            return new myPromise((resolve, reject) => {
                function processRes(index, data) {
                    resultArr[index] = data
                    resultArr.length === len && resolve(resultArr)
                }
                for (let i = 0; i < len; i++) {
                    arr[i]
                        .then(data => processRes(i, data))
                    // .catch
                }
            })
        }
    }
    // promise 3 种状态
    pendding = 'PENDINNG'
    fulfilled = 'FULFILLED'
    rejected = 'REJECTED'
    constructor(fn) {
        this.state = this.pendding
        this.value = undefined;
        this.resolvedFn = []
        this.rejectFn = []

        const resolve = val => {
            setTimeout(() => {
                if (
                    this.state === this.ful1filled
                ) return;
                // console.log(this.state, this.resolvedFn, 'resolvefn', resolve, reject)
                this.state = this.fulfilled
                this.value = val;
                if (val && (typeof val.then === 'function')) {
                    this.dealThenable(this, val, resolve, reject)
                } else {
                    this.resolvedFn.map(fn => fn(val))
                }
            })
        }
        const reject = val => {
            setTimeout(() => {
                // console.log(val, this.rejectFn, this.catch)
                this.value = val;
                this.state = this.rejected
                if (this.rejectFn.length) {
                    this.rejectFn.map(fn => {
                        // console.log(fn, val)
                        fn(val)
                    })
                } else {
                    throw new Error(val)
                }
            })
        }
        fn(resolve, reject)
    }
    then(
        onFulfilled = val => val,
        onRejected,
    ) {
        // console.log(this.state, this.value, onFulfilled, 'then')
        var newP;
        if (this.state === this.pendding) {
            newP = new myPromise((resolve, reject) => {
                this.resolvedFn.push((val) => {
                    const x = onFulfilled(val)
                    this.dealThenable(newP, x, resolve, reject)
                })
                if (typeof onRejected === 'function') {
                    this.rejectFn.push(function rej(val) {
                        onRejected && onRejected(val)
                        // console.log(val)
                        resolve(val)
                    })
                }
            })
        }
        if (this.state === this.fulfilled) {
            const x = onFulfilled(this.value)
            newP = new myPromise((resolve, reject) => {
                // console.log(x, newP, this.state)
                x && this.dealThenable(newP, x, resolve, reject)
            })
        }
        // if(this.state === this.rejected){
        //     newP = new myPromise((resolve, reject) => {
        //         const x = onRejected(this.value)
        //         resolve(x)
        //     })
        // }
        return newP
    }
    // catch(onRejected) {
    //     // console.log(this.state, this.value, onFulfilled, 'then')
    //     var newP;
    //     if (this.state === this.pendding) {
    //         newP = new myPromise((resolve, reject) => {
    //             if (typeof onRejected === 'function') {
    //                 this.rejectFn.push(function (val) {
    //                     onRejected(val)
    //                     resolve(undefined)
    //                 })
    //             }
    //         })
    //     }
    //     return newP
    // }
    /**
     * @fileoverview 处理thenable 对象
    */
    dealThenable(promise2, x, resolve, reject) {
        if (promise2 === x) {
            throw new Error('不能循环引用Promise')
        }
        if (x instanceof myPromise) {
            // console.log('instanceof', x.state, x.value)
            x.state === this.pendding &&
                x.then(y => this.dealThenable(promise2, y, resolve, reject))
            x.state === this.fulfilled &&
                // resolve(x.value)
                this.dealThenable(promise2, x.value, resolve, reject)
            x.state === this.rejected &&
                reject(x.value)
        } else
            if (x && (typeof x.then === 'function')) {
                // resolve(x)
                x.then(
                    res => this.dealThenable(promise2, res, resolve, reject),
                    rej => reject(rej)
                )
            }
            else {
                resolve(x)
            }
    }
}

```