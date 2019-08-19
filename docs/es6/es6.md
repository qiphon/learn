# es 6

> ECMAScript6 学习推荐地址 http://es6.ruanyifeng.com/
es6 的支持情况查看  http://kangax.github.io/compat-table/es6/

一下是必会的前端知识哦

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

```js
class P {
    constructor(age){
        this.age = age
    }
    say(){
        return `
            i'm ${this.age} years old; 
        `
    }
}
//const q = new P(23)
// q.age
// q.say()
class child extends P {
    constructor(age){
        super(age)
        this.zoe = 'aaa'
    }
    say(){
        console.log(super.say())
        console.log(`${this.zoe}`) 
    }
    set menu(key){
        console.log(key)
        this.zoe= key
    }
    get menu(){
        return this.zoe
    }
    static init(){
        console.log('init')
    }
}
let ch = new child(23)
// ch.say()
// ch.menu   // 'aaa'
// ch.menu='123'
// ch.menu   // 123
child.init()

```


### set

> 可以用来去重

```js
var arr = new Set("123")   // {"1", "2", "3"}

var arr = new Set("123333")  // {"1", "2", "3"}

// 添加2次
arr.add(33)  
arr.add(33)  // {"1", "2", "3", 33}

arr.delete('1')  // return true   arr-> { "2", "3", 33}

arr.has('2')  // true 

arr.entries()  // {"2" => "2", "3" => "3", 33 => 33}

arr.keys()  // {"2", "3", 33}

arr.size  // 3

arr.values()  // {"2", "3", 33}

for(let v of arr){console.log(v)}   // 2,3,33

arr.clear()  // Set(0) {}


// 数组去重
var arr = [1,1,1,23,23,14,14,23]

result = [...new Set(arr)]   // [1, 23, 14]


```


### map

```js

var food = new Map();

var fruit = {},
cook = function(){};

food.set(fruit, '🌽')
food.set(cook, '🍔')
// Map(2) // {\{\} => "🌽", ƒ => "🍔"}
// size: 2
// __proto__: Map
// [[Entries]]: Array(2)
// 0: {Object => "🌽"}
// 1: {function(){} => "🍔"}
// length: 2
food.get(fruit)  // "🌽"

food.has(fruit)  // true

food.size  // 2

food.delete(fruit)  // return true  
food.delete(fruit)  // return false

food //Map(1) {ƒ => "🍔"}


food.clear()  // 没有返回值

```

### import

```
// 导出和导入

export const aa = function aa(){}

import {aa } from './aa'

// 或者
const aa = ()=>{}
const bb = ()=>{}
export  {
    aa, bb
}


import {aa, bb } from './aa'

import * as cc from './aa'

cc // {aa, bb }

// 或者 

export default {
    aa, bb
}


import c from './aa'

c  // {aa, bb}

// 别名
export default {
    aa, bb as cc
}


import c from './aa'

c  // {aa, cc}

```

### async & await

```js
const fs = require('fs');
// 创建异步
const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};
// 异步函数内部是同步
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

```

### 修饰器

>装饰器（Decorator）是一种与类（class）相关的语法，用来注释或修改类和类方法。许多面向对象的语言都有这项功能，目前有一个提案将其引入了 ECMAScript。

装饰器是一种函数，写成@ + 函数名。它可以放在类和类方法的定义前面。

```
@testable
class MyTestableClass {
  // ...
}

function testable(target) {
  target.isTestable = true;
}

MyTestableClass.isTestable // true

```

### Symbol

> ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入Symbol的原因。

> Symbol 值通过Symbol函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。

Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

```

// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false

// Symbol 值也可以转为布尔值，但是不能转为数值。

Boolean(s1)  // true

```
symbol 常用的就是防止对象覆盖相同的键名

> 由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

```
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"




// ！！！ 注意，Symbol 值作为对象属性名时，不能用点运算符。

const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"

// Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。
Symbol.for("bar") === Symbol.for("bar")
// true

Symbol("bar") === Symbol("bar")

// Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。

let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined


```