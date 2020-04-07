# es9

- 异步迭代器 asyncchronous Iterator
- 异步执行语句 for... await ... of
- Async generator

```js

const createIterator = (items) => {
    const keys = Object.keys(items);
    const len = keys.length;
    let pointer = 0;
    return {
        next(){
            const done = pointer >= len
            const value = !done ? items[keys[pointer++]] : undefined
            return {
                value, done
            }
        }
    }
}
const a = createIterator([1,2,3])
console.log(a)

// 结果
{next: ƒ}
undefined
a.next()
{value: 1, done: false}
a.next()
{value: 2, done: false}
a.next()
{value: 3, done: false}
a.next()
{value: undefined, done: true}
a.next()
{value: undefined, done: true}


// 给对象添加 Iterator 接口
var obj = {  
    name: 'qiphon',
    age: 8
}

Object.prototype[Symbol.iterator] = function(){
    const me = this;
    const key = Object.keys(me)
    const len = key.length
    let pointer = 0;
    return {
        next(){
            const done = pointer >= len
            const value = done ? undefined : me[key[pointer++]]
            return {done, value}
        }
    }
}

for(var val of obj){
    console.log(val)
}

// 生成器 generator 生成一个迭代器对象
// 执行函数时，并不会执行函数体
function* fn(){
    console.log('开始执行')
    yield 1;
    yield 2;
    console.log('执行完了')
}

var g = fn()

// 结果
undefined
g.next()
VM111:3 开始执行
{value: 1, done: false}
g.next()
{value: 2, done: false}
g.next()
VM111:6 执行完了
{value: undefined, done: true}


```

- 异步迭代器

    - 同步迭代器： next() => {value, done}
    - 异步迭代器： next() => promise

```js
const asyncCreateIterator = (items) => {
    const keys = Object.keys(items);
    const len = keys.length;
    let pointer = 0;
    return {
        next(){
            const done = pointer >= len
            const value = !done ? items[keys[pointer++]] : undefined
            return Promise.resolve({
                value, done
            })
        }
    }
}
const a = asyncCreateIterator([1,2,3])
console.log(a)
a.next().then(res=> console.log(res))

// 结果
// {next: ƒ}
// VM255:17 {value: 1, done: false}
// Promise {<resolved>: undefined}
// a.next().then(res=> console.log(res))
// VM263:1 {value: 2, done: false}
// Promise {<resolved>: undefined}
// a.next().then(res=> console.log(res))
// VM268:1 {value: 3, done: false}
// Promise {<resolved>: undefined}
// a.next().then(res=> console.log(res))
// VM273:1 {value: undefined, done: true}
// Promise {<resolved>: undefined}

// 实现二
var obj = {  
    name: 'qiphon',
    age: 8
}
Object.prototype[Symbol.asyncIterator] = function (){
    let me = this;
    let keyArr = Object.keys(me)
    let len = keyArr.length
    let pointer = 0
    return {
        next(){
            let done = pointer >= len
            let value = done ? undefined : me[keyArr[pointer ++]]
            return new Promise((resolve)=>setTimeout(()=>resolve({done, value}), 1000))
        }
    }
}

var fn = async ()=>{
    for await(let val of obj){
        console.log(val)
    }
}
fn()

// 异步生成器
async function *fn(){
    yield await Promise.resolve(1)
    yield await Promise.resolve(2)
    yield await Promise.resolve(13)
}

let f = fn()

async function agf(){
    for await (var val of f){
        console.log(val)
    }
}
agf()

```

- Rest/spread

```js
function a (a, b, ...c){
    console.log(a, b, c)
}

var arr = [1,2,3]

b = [4,6, ...arr]


var obj = {
    name: 'qiphon', 
    val: 2,
    info: {
        c: 1
    }
}
var b = {c: 2, ...obj}

let {name, info:{c}} = b

// name
// "qiphon"
// c
// 1

// 扩展形式可以实现对象的浅拷贝

```

- 正则表达式

```js
const dateStr = '2018-09-01'
const reg = /(\d{4})-(\d{2})-(\d{2})/
let res = reg.exec(dateStr)
console.log(res)

const dateStr = '2018-09-01'
const reg = /(?<year>\d{4})-(?<month>\d{2})-(?<date>\d{2})/
let res = reg.exec(dateStr)
console.log(res.groups.year, res.groups.month, res.groups.date)

// 切换年月日顺序
var newD = dateStr.replace(reg, `$<month>-$<date>-$<year>`)

// 反向断言 (?<=pattern)
var str = '$123'
var reg = /(?<=\D)\d+/
var res = reg.exec(str)

// ["123", index: 1, input: "$123", groups: undefined]
// 0: "123"
// index: 1
// input: "$123"
// groups: undefined
// length: 1
// __proto__: Array(0)

// 先行断言 (?=pattern)
var str = '$123'
var reg = /\D(?=\d+)/
var res = reg.exec(str)

// ["$", index: 0, input: "$123", groups: undefined]
// 0: "$"
// index: 0
// input: "$123"
// groups: undefined
// length: 1
// __proto__: Array(0)


// dotAll
var str = 'qiphon\nooo'
var reg = /qiphon.ooo/
var r = reg.test(str)  
console.log(r)
// false  . 没有匹配到换行符
reg= /qiphon.ooo/s
var r = reg.test(str)  
console.log(r)  // true


// 汉字检测 之前我们需要使用 Unicode 码
var str = '起风'
var reg = /^(\p{Script=Han})+$/u    // 只允许中文
reg.test(str)

// 取消浏览器对 \ 的转义

var a = '\u{54}'
console.log(a)
var b = String.raw`\u{54}`
console.log(b)

// T
// VM1490:4 \u{54}

// 空白字符的特别表达方式
var reg = /^\p{White_Space}+$/u
reg.test('\t \n\r')  // true

```