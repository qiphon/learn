# js精粹

### 数据类型

js是弱类型语言，Boolean、Number、String、null、undefined、Symbol

Object

- Array
- RegExp
- Date
- Math
- Function

> 可以使用 typeof 判断数据类型，操作符返回一个字符串，但并非返回所有的结果都符合预期

```
typeof false   // "boolean"

typeof .2     // "number"

typeof ' '    // string

typeof undefined  // undefined

typeof new Symbol()   // symbol

typeof new Date()   // object

typeof []      // object

typeof alert   // function

typeof null   // object

typeof not_defined_var   // undefined

```

### 变量

#### 声明

1. 使用关键字 var ： 函数作用域

2. 使用关键字let/const： 块作用域

3. 直接使用： 全局作用域

### 函数

- arguments 

> arguments 包含了当前函数所有参数的类数组（有length 属性，但是不具有数组的方法），另外有2个废除的属性 arguments.caller (调用当前执行函数的函数)；arguments.callee (指当前函数)

```
function a (...args){
    console.log(args)  // Array
}


```

### babel statement

```js

loop:
    for (var i=0; i< 10; i++){
        for(var j=0; j< 10; j++){
            console.log(i, j)
            if(j === 1) break loop;
        }
    }
console.log(i)
// 0 0
// 0 1  // 这2行是循环打印出来的
// 0

```

### 立即执行函数

立即执行函数有多种写法

```js

(function(){}());

(function (){})();

[function(){}()];

~ function(){}();

- function(){}();

+ function(){}();

! function(){}();

new function(){}();

new function(){};

delete function(){}();

typeof function(){}();

void function(){}();

var f = function(){}();

1, function(){}();

1^ function(){}();

1> function(){}();


```

### 柯里化

```js

function isType(type){
    return function(obj){
        return Object.prototype.toString.call(obj) === '[object ' + type + ']'
    }
}

var isNumber = isType('Number')
console.log(isNumber(1))


// 柯里化应用

function a(n){
    return n*2
}

function b(n){
    return n*3
}

function pipe(f, g){
    return function(){
        console.log(arguments)
        return f.call(null, g.apply(null, arguments))
    }
}

let fn = pipe(a, b)

fn(2)  // 12

// 反柯里化

Function.prototype.uncurry = function(){
    return this.call.bind(this)
}

var push = Array.prototype.push.uncurry();

arr = []
push(arr,1)  // [1]


```

### 作用域 

1. 作用域的大小  

- 程序级

- 文件级

- 函数级

- 块级

> js作用域链，js中函数也是对象，函数对象和其他对象一样，拥有可以通过代码访问的属性和一系列仅供js引擎访问的内部属性。其中一个内部属性是[[scope]], 由ECMA-262标准第三版定义，该内部属性包含了函数被创建的作用域中对象的集合，这个集合被称为函数的作用域链，它决定了哪些数据能被函数访问。

##### this 指向哪里 

> 在js中 ，this指向函数执行时的当前对象

- 函数中

> 严格模式 ： undefined
非严格模式： window

- 构造函数中 ： 对象的实例

- 对象方法：对象本身


### 原型对象时什么

> 在js中，每定义一个对象（函数）时，对象中都会包含一些预定义的属性。其中函数对象的一个属性就是原型对象prototype. 普通对象没有prototype属性，但又 __proto__ 属性

```
function f1(){}

typeof fi.prototype  // Object

typeof Function.prototype   // function

typeof Function.prototype.prototype   // undefined

typeof Object.prototype   // object


```

#### 构造函数 

> 使用new 关键字调用的函数，构造函数可以实例化一个对象

构造函数的返回值

- 默认返回类的实例

- 对象类型

##### 原型链时如何实现的

1. 每个函数都有一个prototype 的对象属性
2. 每个对象都有一个__proto__ 属性，该属性指向其父类的prototype对象


> 实例对象的__proto__ 指向父级的 prototype ，父级的__proto__指向 Object.prototype , Object.__proto__ 指向 null

##### constructor 

> 每个原型对象prototype 中都有一个 constructor 属性， 默认指向自身

```js

Function.prototype.constructor = Function

Object.prototype.constructor = Object

Object.constructor = Function


```


练习

```
// 1
function m(n){
    return function(){
        return n
    }
}

var arr = [m(1), m(2), m(3)]

arr[0]()   // 1
arr[1]()   // 2
arr[2]()   // 3

// 2
var name = 'global'
function A(name){
    alert(name) // 3
    this.name = name
    var name = '1'
}
A.prototype.name = '2'
var a = new A('3')
a.name   // 3
delete a.name
a.name  // 2


// 3
function fun(n, o){
    console.log(o)
    return {
        fun: function(m){
            return fun(m, n)
        }
    }
}
var a = fun(0)  // undefined

a.fun(1);   // 0
a.fun(2);   // 0 

var b = fun(0).fun(1).fun(2).fun(3)  // 0 1 2

var c = fun(0).fun(1)  // 0

c.fun(2);  // 1
c.fun(3)   // 1


// 4 
var test = 'aaa'
function do(){
    alert(test)   // undefined
    var test = 'bbb';  // 当函数作用域声明与全局同名的变量的时候，函数内就无法再访问全局作用域中同名的变量了
    alert(test)   // bbb
}
do()
alert(test)  // aaa

```

