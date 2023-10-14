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