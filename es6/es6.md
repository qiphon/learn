# es 6

> ECMAScript6 学习推荐地址 http://es6.ruanyifeng.com/
es6 的支持情况查看  http://kangax.github.io/compat-table/es6/


#### es 6 转码

1. babel
2. traceur

#### shim & polyfill

> shim 它是一个库，它将一个新的API引入到一个旧的环境中去，而且仅靠旧环境中已有的手段实现

> polyfill 是一段代码或插件，提供了那些开发者们希望浏览器原生提供支持的功能。

接下来我们就开始学习新语法吧

#### let / const

```
const  // 定义一个常量，这个值不能被修改
       // const 没有返回值


let  // 块级作用域的命名
     // let 也没有返回值

```


#### 对象的解构

```
const a = [1,2,3]

const [c,d,e] = a;  // c 1; d 2; e 3;

// 对象解构

let test= {a: 12,b: 24}

let {a,b} = test;   // a: 12  ; b 24;


```

#### 字符串模板

```
const a = 'string'

const c = `foo ${a} bar`;

c.startsWidth('foo')   // true

c.endsWidth('bar')    // true

c.includes('string')   // true


// 还有个有趣的东西

function test(strs, ...values){
    console.log(strs, values)
}

const a = 'aaa'
const b = 'bbb'
test`foo ${a} --- ${b} bar`;

// (3) ["foo ", " --- ", " bar", raw: Array(3)] (2) ["aaa", "bbb"]

```

#### 数组

```
// 解构
const a = [1,2,3]

const [c,d,e] = a;  // c 1; d 2; e 3;

// 另一种方式

const b = '6789'

const test = ['a','b', ...b]   // ["a", "b", "6", "7", "8", "9"]

const res = {
    k: 1, 
    b,
    test,
    [b+1]:23,
    c(){
        console.log('res')
    }
}   //  {67891: 23, k: 1, b: "6789", test: Array(6), c: ƒ}

// Array.from  把一个类数组转成数组

const  a  = '1234'

Array.from(a)   // (4) ["1", "2", "3", "4"]


```

### 对象

```

NaN === NaN  // false

Object.is(NaN, NaN)  // true


// 一些关于原项链的东西

const eat = {
    lunch(){
        return 'rice'
    }
}
const drink = {
    lunch(){
        return 'beer'
    }
}

let sunday = Object.create(eat);  

// {}__proto__: lunch: ƒ lunch()__proto__: Object
sunday.lunch() //  "rice"

Object.getPrototypeOf(sunday)  // {lunch: ƒ}  -> eat
Object.setPrototypeOf(sunday, drink)
sunday.lunch()   // "beer"


// 另一种方式
const eat = {
    lunch(){
        return 'rice'
    }
}
const drink = {
    lunch(){
        return 'beer'
    }
}

let sun = { __proto__: eat}

sun.lunch()   // "rice"

sun.__proto__ = drink // {lunch: ƒ}
sun.lunch() // "beer"

// 
let sun2 = { 
    __proto__: eat, 
    lunch(){ 
        return super.lunch() + '  aaaa' 
    }
}
 
sun2.lunch()  // "rice  aaaa"


```

### 函数

```
const fn = function pp(arg){}

fn.name   // pp

 // map

let c = [1,2].map(it=>it*2) // [2,4]


// this

window.a = 50
const s ={
    a: 40,
    p:()=>{
        console.log(this.a)
    }
}
s.p()  // 50


// 函数默认值
function test(a=1,{options = true}={}){
    console.log(options)
}
test(3, {options: 222})  // 222

function t(...arg){
    console.log(arg)  
}

t(1,2)  // [1, 2]

```

### Iterator（遍历器）的概念

> 它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

>Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。

```

let cc = function*(){
    yield '111';
    yield* [1,2,3];
    yield '222';
}
var c = cc()

c.next()
// {value: "111", done: false}
c.next()
// {value: 1, done: false}
c.next()
// {value: 2, done: false}
c.next()
// {value: 3, done: false}
c.next()
// {value: "222", done: false}
c.next()
// {value: undefined, done: true}
c.next()
// {value: undefined, done: true}


```

### class

```
class P {
    constructor(age){
        this.age = age
    }
}
const q = new P(23)
q.age


```