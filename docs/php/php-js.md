# php 与 js 在面向对象中的区别

1. construct

```php
// php 中的class有construct；es5中的类是用function实现的，并没有见到construct。

function Car(){
    console.log('在实例化的时候我就被执行了');
}
var a = new Car();

// __construct 在实例化的时候会被执行，其他代码没有被执行

<?php
header("content-type: text/html; charset=utf-8;");
class Car {
    public function __construct($name)
    {
        echo '实例化的时候，我被执行';
        echo '<br>';
        $this->name = $name;
    }
    public function test()
    {
        echo '我没有被执行';
        echo '<br>';
    }
    public function __destruct()
    {   // 这个函数每当触发这个类都会被执行
        echo '__destruct 最后被执行';
        echo '<br>';
    }
}

$c = new Car('c');

// js 的function 在实例化的时候,里面所有的代码就会被执行一遍
function Car(name){
    this.name = name;
    document.querySelector('body').style.backgroundColor = 'red'
}
var c = new Car('c')

// 我们会在控制台看到如下信息

Car {name: "c"}
name: "c"
__proto__:
constructor: ƒ Car(name)
__proto__: Object   // js 的继承是原型链继承，所有方法和类的根 __proto__ 都指向object

// 还用上面的例子， js中所有的方法都挂载在原型链上
function Car(name){
    this.name = name;
}
Car.prototype.run = function(){
    console.log(this.name + ' is run')
}
var c = new Car('c')


// js中继承的实现
function Car(name){
    this.name = name;
}
Car.prototype.run = function(){
    console.log(this.name + ' is run')
}
// var c = new Car('c')
function B(name){
    Car.call(this, name);  // 这样属性就会被复制过来了
}

var __proto = Object.create(Car.prototype) // 这样就能拿到 car的所有方法，但是我们不能直接将他赋值给B，因为它的constructor 还是Car
__proto.constructor = B;  // 手动改变构造器，这样就能为我们所用了,只有构造器是自己了，方法中的this才能转过来
B.prototype = __proto;
B.prototype.action = function(){
    console.log(this.name + ' action')
}
var b = new B('b')

```