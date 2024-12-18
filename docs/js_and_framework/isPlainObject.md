# isPlainObject

>  测试对象是否是纯粹的对象（通过 "{}" 或者 "new Object" 创建的）
这个方法的作用是为了跟其他的 JavaScript对象如 null，数组，宿主对象（documents），DOM 等作区分，因为这些用 typeof 都会返回object。

注意: Host对象（或浏览器宿主环境中所使用的对象，用来完成的ECMAScript执行环境）在检测跨平台时存在很多的不一致，难以提供跨平台的强劲的检测函数。在某些情况下，$.isPlainObject()的结果可能在不同的浏览器评估不一致。

```js
// jquery 示例
  console.log($.isPlainObject(document.location));

```

在IE8中，上面的代码会抛出一个无效的指针异常。考虑到这一点，重要的是要知道旧版本的浏览器中使用$.isPlainObject()的陷阱。有几个基本的例子，可用于跨浏览器的情况。

1. jquery 的实现方法

```js

function isPlainObject(obj) {
    var proto, Ctor;

    // (1) null 肯定不是 Plain Object
    // (2) 使用 Object.property.toString 排除部分宿主对象，比如 window、navigator、global
    if (!obj || ({}).toString.call(obj) !== "[object Object]") {
        return false;
    }

    proto = Object.getPrototypeOf(obj);

    // 只有从用 {} 字面量和 new Object 构造的对象，它的原型链才是 null
    if (!proto) {
        return true;
    }

    // (1) 如果 constructor 是对象的一个自有属性，则 Ctor 为 true，函数最后返回 false
    // (2) Function.prototype.toString 无法自定义，以此来判断是同一个内置函数
    Ctor = ({}).hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && Function.prototype.toString.call(Ctor) === Function.prototype.toString.call(Object);
}

```

2. lodash 的实现方法

```js

function isPlainObject(value) {
    if (!value || typeof value !== 'object' || ({}).toString.call(value) != '[object Object]' ) {
        return false;
    }
    var proto = Object.getPrototypeOf(value);
    if (proto === null) {
        return true;
    }
    var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor && Function.prototype.toString.call(Ctor) === Function.prototype.toString.call(Object);
}

```

3. redux

```js

function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  // proto = null
  return Object.getPrototypeOf(obj) === proto
}

```