# 设计模式前的基础

### this

1. 作为对象的方法调用：this 指向该对象
2. 作为普通函数调用：this 指向全局对象（globalThis —— MDN），浏览器中一般是 Window，ECMAScript5 严格模式下 this 指向 undefined
3. 构造函数调用：通常 this 指向类的实例化对象
4. Function 原型上定义的 `call()、apply()、bind()` 函数可以改变 this 指向指定的对象，`call()` 和 `bind()` 除第一个参数均接受参数列表，`apply()` 第二个参数接受参数数组

### 原型对象（Prototype）&原型链（Prototype Chain）

#### 原型对象

原型对象：在定义函数时被创建，该函数的 prototype 属性指向的就是原型对象
同时定义了两种读写原型的属性：

隐式原型（proto）：所有引用类型（函数、数组、对象）都有 __proto__ 属性，例如 arr.__proto__，该属性
显式原型（prototype）：所有函数拥有 prototype 属性，例如：func.prototype

