# ES 5 在企业中的应用


会员贡献 -(TC39的会议上通过审议)--> strawman 初稿 --（带头人（会员）详细文字，实例）--> proposal 建议（正式建议文档） -（语义语法说明）---> Draft （规范的第一个版本，与最终版差别不大，后续只接受增量调整） --(完整文档，评审和编辑签字)-> Candidate 候选  --(Test 262 的验收测试，两个通过测试的实现，实践经验 ，ES规范的编辑签字)---> Finish （1. 准备就绪 2. 可以添加到标准中） 

- es5 核心知识点

1. 立即执行函数
2. 闭包 内部函数可以访问函数外面的变量，把函数返回出去，闭包可以保护内部的变量  闭包可能会造成内存泄露，避免内存泄露，可以在不使用的时候将生成的闭包函数 = null
3. 原型链
    - 3.1 构造函数里的属性优先级要比原型链的要高
    - 3.2 面向对象编程的时候js没有类的概念，可以用函数代替
    - 3.3 constructor实际就是对应的那个函数
    - 3.4 prototype 按引用传递的 Object.create 创建原型链的副本
4. 数值、字符串、bool 按值传递， 对象和数组按引用传递
5. 改变this的方法 call、apply、bind
6. 函数提升 变量提升 函数提升会优先于变量提升
7. JQ内部有很多经典的写法 模块化编程的概念、闭包

```js
// 练习题
this.a = 20
var test = {
    a: 40,
    init:()=>{
        console.log(this.a)
        function go (){
            this.a = 60
            console.log(this.a)
        }
        go.prototype.a = 50
        return go
    }
}
var p = test.init()
p()
new(test.init())()

// 20 60 60 60
```

### 模块化

> AMD CMD commonjs UMD 

模块特点：

- 静态模块（模块名不能是变量）

- 声明式语法

```js
//es 6
export {$}
import $ from 'jquery'  


// amd
export.$ = $
var $ = require('jquery')

```

import 和 amd 的区别

- 按需引入  VS  全局引入

- 多点暴露  VS  全局暴露

```
// 代码对比实例

import {a,b, ...} from 'c'

var all = require('c')  


export { a, b, .... }

module.exports = all

```

> 浏览器目前不支持ES6 ，所以我们只能依靠编译工具


### 模板字符串

- 多行字符串
- 字符串插值
- Unicode 支持（nodejs）

```
// 字符串中可以写变量

var bb = 123

`aaaa ${bb}`

// 模板字符串可以换行写

`
woshi 第一行

    第二行
`


```

### 解构

```js

var arr = [1,2,3]

var [first, sec] = arr  

// 函数中的解构

function add ([a, b]){
    return a + b
}

add([2,3])


// obj

var obj = {
    a: 1, 
    b: 2
}
let { a, b} = obj



```

### object

```js

var a = 1;
var obj = {
    a,  // 如果变量名一样可以不写后面的
    [a + 1]: 3,  // 方便声明计算后的键
    add(){}     // 快速声明一个函数
}


```

### array


```js

var arr = [1,2,4]

let arr2 = [ ...arr]  // es6 浅拷贝

// es5 的写法
var arr2 = [].concat(arr)

var arr2 = arr.slice(0)

```

### 函数

```
// 箭头函数
[1,2].map(item=>item* 2)  // [2,4]

//es5

[1,2].map(function(it){
    return it*2
})

// rest参数
function a(...arg){
    return arg.join(,)
}

function a(a,b, ...arg){
    console.log(a,b,arg)
}

//es5
function a(){
    return [].slice.call(arguments, 0).join(',')
}

// 默认值
function f(a=1){

}
// es5

function f(a){
    var a = a === 'undefined' ? 1: a;
}




```


### class

- new 构造函数

- 公有共享属性方法

- 公有静态属性方法

- 公有特权方法（访问私有成员）

- 公有成员

- 私有静态成员/方法

- 私有成员/方法


### promise

## 实战

> es5 目前兼容非常的好，但是es6的兼容很差

编译器 Babel 、 Traceur（Google）

构建工具 grunt, gulp , webpack , fis


#### 练习题

```js

;(function(){
    console.log(a)  // function a(){}
    var a = 1;
    function a(){

    }
    console.log(a)   // 1
})()


```