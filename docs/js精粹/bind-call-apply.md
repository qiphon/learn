# bind call apply

## Function.prototype.bind(thisArg [,arg1[,arg2, ...]])

> Function.prototype.bind 返回一个新的函数对象，该函数对象的this 绑定到了 thisArg 参数上，从本质上讲，这允许你在其他对象链中执行一个函数。

```js
// 1. 最基本的用法
this.x = 9
var module = {
    x: 88,
    getX: function(){
        return this.x
    }
}
module.getX()   // 88
var y = module.getX

y()  // 9

var z = y.bind(module)
z()  // 88

// 2. 偏函数
// bind 另一个最简单的用法就是使一个函数拥有初始值
var add = function add (a, b){
    return a + b
}
var add1 = add.bind(null, 1)
add1(2)  // 3

// 3. 配合 setTimeout 使用，
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// 在 1 秒钟后声明 bloom
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用 'declare' 方法

// 4. 快捷调用
var slice = Array.prototype.slice;
slice.apply(arguments);

// 与前一段代码的 "slice" 效果相同
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.apply.bind(unboundSlice);
slice(arguments);

```

## Function.prototype.apply()

> apply() 方法调用一个具有给定 this 值的函数，以及作为一个数组（或类似数组对象）提供的参数

注意：call()方法的作用和 apply() 方法类似，区别就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。

```js
// func.apply(thisArg, [argsArray])
// 需要注意：Chrome 14 以及 Internet Explorer 9 仍然不接受类数组对象。如果传入类数组对象，它们会抛出异常。

var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]

```

## Function.prototype.call()

call 可以不指定第一个参数，这时 this 默认指向 window， 严格模式下是undefined

```js
var sData = 'Wisen';

function display() {
  console.log('sData value is %s ', this.sData);
}

display.call();  // sData value is Wisen

```