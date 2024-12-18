# Object

> JavaScript中的所有对象都来自 Object；所有对象从Object.prototype继承方法和属性，尽管它们可能被覆盖。例如，其他构造函数的原型将覆盖 constructor 属性并提供自己的 toString() 方法。Object 原型对象的更改将传播到所有对象，除非受到这些更改的属性和方法将沿原型链进一步覆盖。

> [附加对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

下面的方法是添加到Object上的构造器：


```js

Object.getPrototypeOf
Object.getOwnPropertyDescriptor
Object.getOwnPropertyNames
Object.create    // 生成当前对象的副本
Object.defineProperty
Object.defineProperties
Object.seal
Object.freeze
Object.preventExtensions
Object.isSealed
Object.isFrozen
Object.isExtensible
Object.keys

```

这些新增的好处之一是对象的属性有了更多控制，例如哪些是允许被修改的，哪些是可以枚举的，哪些是可以删除的等。这个的实现通过程序访问对象的属性描述符(property descriptors). 例如：



```js

var cat = {};

Object.defineProperty(cat, "name", {
  value: "Maru",
  writable: false,
  enumerable: true,
  configurable: false
});

Object.defineProperty(cat, "skill", {
  value: "exploring boxes",
  writable: true,
  enumerable: true,
  configurable: true
});

```
对于我们的cat对象, 其名字name不能被改变，但是会出现在for-in循环中。在其他方面，Maru擅长探索盒子(exploring boxes), 但是可以在将来改变，因为skill属性是writable和configurable的。

### object.prototype   Object 的原型对象

object.prototype属性的属性特性：| 是否支持
--|--|--
writable | true
enumerable | false
configurable | true

> 几乎所有的 JavaScript 对象都是 Object 的实例；一个典型的对象继承了Object.prototype的属性（包括方法），尽管这些属性可能被遮蔽（亦称为覆盖）。但是有时候可能故意创建不具有典型原型链继承的对象，比如通过Object.create(null)创建的对象，或者通过Object.setPrototypeOf方法改变原型链。

改变Object原型，会通过原型链改变所有对象；除非在原型链中进一步覆盖受这些变化影响的属性和方法。这提供了一个非常强大的、但有潜在危险的机制来覆盖或扩展对象行为。

### object.prototype.__proto__  

已废弃
该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性。

警告: 通过现代浏览器的操作属性的便利性，可以改变一个对象的 [[Prototype]] 属性, 这种行为在每一个JavaScript引擎和浏览器中都是一个非常慢且影响性能的操作，使用这种方式来改变和继承属性是对性能影响非常严重的，并且性能消耗的时间也不是简单的花费在 obj.__proto__ = ... 语句上, 它还会影响到所有继承来自该 [[Prototype]] 的对象，如果你关心性能，你就不应该在一个对象中修改它的 [[Prototype]]。相反, 创建一个新的且可以继承 [[Prototype]] 的对象，推荐使用 Object.create()。

使用__proto__是有争议的，也不鼓励使用它。因为它从来没有被包括在EcmaScript语言规范中，但是现代浏览器都实现了它。__proto__属性已在ECMAScript 6语言规范中标准化，用于确保Web浏览器的兼容性，因此它未来将被支持。它已被不推荐使用, 现在更推荐使用Object.getPrototypeOf/Reflect.getPrototypeOf 和Object.setPrototypeOf/Reflect.setPrototypeOf（尽管如此，设置对象的[[Prototype]]是一个缓慢的操作，如果性能是一个问题，应该避免）。

Object.prototype 的 __proto__  属性是一个访问器属性（一个getter函数和一个setter函数）, 暴露了通过它访问的对象的内部[[Prototype]] (一个对象或 null)。

```js
let shape = function () {};
let p = {
    a: function () {
        console.log('aaa');
    }
};
shape.prototype.__proto__ = p;

let circle = new shape();
circle.a();//aaa
console.log(shape.prototype === circle.__proto__);//true

//或者
let shape = function () {};
var p = {
    a: function () {
        console.log('a');
    }
};

let circle = new shape();
circle.__proto__ = p;
circle.a(); //  a
console.log(shape.prototype === circle.__proto__);//false

//或者
function test() {}
test.prototype.myname = function () {
    console.log('myname');
}
let a = new test()
console.log(a.__proto__ === test.prototype);//true
a.myname();//myname

//或者
let fn = function () {};
fn.prototype.myname = function () {
    console.log('myname');
}

let obj = {
    __proto__: fn.prototype
};

obj.myname();//myname

```
__proto__ 的设置器(setter)允许对象的 [[Prototype]]被变更。前提是这个对象必须通过 Object.isExtensible() 判断为是可扩展的，如果不可扩展，则会抛出一个 TypeError 错误。要变更的值必须是一个object或null，提供其它值将不起任何作用。

当谈到继承时，JavaScript 只有一种结构：对象。每个实例对象（ object ）都有一个私有属性（称之为 __proto__ ）指向它的构造函数的原型对象（prototype ）。该原型对象也有一个自己的原型对象( __proto__ ) ，层层向上直到一个对象的原型对象为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节。

几乎所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例。

尽管这种原型继承通常被认为是 JavaScript 的弱点之一，但是原型继承模型本身实际上比经典模型更强大。例如，在原型模型的基础上构建经典模型相当简单。



### object.prototype.constructor  特定的函数，用于创建一个对象的原型


所有对象都会从他的原型上继承一个 `constructor` 属性

```js
var o = {};
o.constructor === Object; // true

var o = new Object;
o.constructor === Object; // true

var a = [];
a.constructor === Array; // true

var a = new Array;
a.constructor === Array // true

var n = new Number(3);
n.constructor === Number; // true


function Tree(name) {  // 这个就是构造函数
   this.name = name;
}

var theTree = new Tree("Redwood");
theTree.constructor // function Tree

```

#### 改变对象的 constructor

下面的例子展示了如何修改基本类型对象的 constructor 属性的值。只有 true, 1 和 "test" 的不受影响，因为创建他们的是只读的原生构造函数（native constructors）。这个例子也说明了依赖一个对象的 constructor 属性并不安全。

```js

function Type() { };

var	types = [
	new Array,
    [],
	new Boolean,
    true,        // remains unchanged
	new Date,
	new Error,
	new Function,
	function(){},
	Math,	
	new Number,
	1,           // remains unchanged
	new Object,
	{},
	new RegExp,
	/(?:)/,
	new String,
	"test"       // remains unchanged
];

for(var i = 0; i < types.length; i++) {
	types[i].constructor = Type;
	types[i] = [ types[i].constructor, types[i] instanceof Type, types[i].toString() ];
};

console.log( types.join("\n") );


// 继承的实现方法

function ParentWithStatic() {}

ParentWithStatic.startPosition = { x: 0, y:0 };
ParentWithStatic.getStartPosition = function getStartPosition() {
  return this.startPosition;
} 

function Child(x, y) {
  this.position = {
    x: x,
    y: y
  };
}

Child.prototype = Object.create(ParentWithStatic.prototype); 
Child.prototype.constructor = Child;

Child.prototype.getOffsetByInitialPosition = function getOffsetByInitialPosition() {
  var position = this.position;
  var startPosition = this.constructor.getStartPosition(); // error undefined is not a function, since the constructor is Child

  return {
    offsetX: startPosition.x - position.x,
    offsetY: startPosition.y - position.y
  }
};

```


## 方法

### ` object.assign() ` 

> 用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。

```js
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }

```

| 语法

` Object.assign(target, ...sources) `

| 参数

`target` 目标对象
`sources` 源对象

| 返回值 

目标对象

```js

// 复制一个对象
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }

// 针对深拷贝，需要使用其他办法，因为 Object.assign()拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。
let obj1 = { a: 0 , b: { c: 0}}; 
let obj2 = Object.assign({}, obj1); 
console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}} 

obj1.a = 1; 
console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}} 
console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}} 

obj2.a = 2; 
console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}} 
console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 0}}
 
obj2.b.c = 3; 
console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 3}} 
console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 3}} 

// Deep Clone 
obj1 = { a: 0 , b: { c: 0}}; 
let obj3 = JSON.parse(JSON.stringify(obj1)); 
obj1.a = 4; 
obj1.b.c = 4; 
console.log(JSON.stringify(obj3)); // { a: 0, b: { c: 0}}

// 继承属性和不可枚举属性是不能拷贝的
const obj = Object.create({foo: 1}, { // foo 是个继承属性。
    bar: {
        value: 2  // bar 是个不可枚举属性。
    },
    baz: {
        value: 3,
        enumerable: true  // baz 是个自身可枚举属性。
    }
});

const copy = Object.assign({}, obj);
console.log(copy); // { baz: 3 }

// 原始类型会被包装为对象

const v1 = "abc";
const v2 = true;
const v3 = 10;
const v4 = Symbol("foo")

const obj = Object.assign({}, v1, null, v2, undefined, v3, v4); 
// 原始类型会被包装，null 和 undefined 会被忽略。
// 注意，只有字符串的包装对象才可能有自身可枚举属性。
console.log(obj); // { "0": "a", "1": "b", "2": "c" }

// 异常会打断后续拷贝任务
const target = Object.defineProperty({}, "foo", {
    value: 1,
    writable: false
}); // target 的 foo 属性是个只读属性。

Object.assign(target, {bar: 2}, {foo2: 3, foo: 3, foo3: 3}, {baz: 4});
// TypeError: "foo" is read-only
// 注意这个异常是在拷贝第二个源对象的第二个属性时发生的。

console.log(target.bar);  // 2，说明第一个源对象拷贝成功了。
console.log(target.foo2); // 3，说明第二个源对象的第一个属性也拷贝成功了。
console.log(target.foo);  // 1，只读属性不能被覆盖，所以第二个源对象的第二个属性拷贝失败了。
console.log(target.foo3); // undefined，异常之后 assign 方法就退出了，第三个属性是不会被拷贝到的。
console.log(target.baz);  // undefined，第三个源对象更是不会被拷贝到的。


// 拷贝访问器

const obj = {
  foo: 1,
  get bar() {
    return 2;
  }
};

let copy = Object.assign({}, obj); 
console.log(copy); // { foo: 1, bar: 2 } copy.bar的值来自obj.bar的getter函数的返回值

// 下面这个函数会拷贝所有自有属性的属性描述符
function completeAssign(target, ...sources) {
  sources.forEach(source => {
    let descriptors = Object.keys(source).reduce((descriptors, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {});

    // Object.assign 默认也会拷贝可枚举的Symbols
    Object.getOwnPropertySymbols(source).forEach(sym => {
      let descriptor = Object.getOwnPropertyDescriptor(source, sym);
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor;
      }
    });
    Object.defineProperties(target, descriptors);
  });
  return target;
}

copy = completeAssign({}, obj);
console.log(copy);
// { foo:1, get bar() { return 2 } }


```


### Object.create


```js

// es 5 继承的实现
function P(name){
    this.name = name
}
P.prototype.getName = function(){
    return this.name
}
function Child(name, age){
    P.apply(this, arguments)
    this.age = age
}
Child.prototype = Object.create(P.prototype, {
    constructor: {
        value: Child
    }
})

var c = new Child('qiphon',123)

// Child {name: "qiphon", age: 123}
  // age: 123
  // name: "qiphon"
  // __proto__: P
    // constructor: ƒ Child(name, age)
      // arguments: null
      // caller: null
      // length: 2
      // name: "Child"
      // prototype: P {constructor: ƒ}
      // __proto__: ƒ ()
      // [[FunctionLocation]]: VM67924:8
      // [[Scopes]]: Scopes[1]
    // __proto__: Object


```