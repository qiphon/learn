# js [严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)

"use strict"就是个字符串，因此其会被旧版浏览器安全地忽视。

```
"use strict";

```

- 严格模式下无法再意外创建全局变量。在普通的JavaScript里面给一个错误命名的变量名赋值会使全局对象新增一个属性并继续“工作”（尽管将来可能会失败：在现代的JavaScript中有可能）。严格模式中意外创建全局变量被抛出错误替代：


```
"use strict";
                       // 假如有一个全局变量叫做mistypedVariable
mistypedVaraible = 17; // 因为变量名拼写错误
                       // 这一行代码就会抛出 ReferenceError

```

- 严格模式会使引起静默失败(silently fail,注:不报错也没有任何效果)的赋值操作抛出异常. 例如, NaN 是一个不可写的全局变量. 在正常模式下, 给 NaN 赋值不会产生任何作用; 开发者也不会受到任何错误反馈. 但在严格模式下, 给 NaN 赋值会抛出一个异常. 任何在正常模式下引起静默失败的赋值操作 (给不可写属性赋值, 给只读属性(getter-only)赋值赋值, 给不可扩展对象(non-extensible object)的新属性赋值) 都会抛出异常:


```
"use strict";

// 给不可写属性赋值
var obj1 = {};
Object.defineProperty(obj1, "x", { value: 42, writable: false });
obj1.x = 9; // 抛出TypeError错误

// 给只读属性赋值
var obj2 = { get x() { return 17; } };
obj2.x = 5; // 抛出TypeError错误

// 给不可扩展对象的新属性赋值
var fixed = {};
Object.preventExtensions(fixed);
fixed.newProp = "ohai"; // 抛出TypeError错误

```
- 在严格模式下, 试图删除不可删除的属性时会抛出异常(之前这种操作不会产生任何效果):

```
"use strict";
delete Object.prototype; // 抛出TypeError错误

"use strict";
var a = 1;
delete a ;   // 删除存在的也会报错

```

- 严格模式要求函数的参数名唯一. 在正常模式下, 最后一个重名参数名会掩盖之前的重名参数. 之前的参数仍然可以通过 arguments[i] 来访问, 还不是完全无法访问. 然而, 这种隐藏毫无意义而且可能是意料之外的 (比如它可能本来是打错了), 所以在严格模式下重名参数被认为是语法错误:

```
function sum(a, a, c) { // !!! 语法错误
  "use strict";
  return a + a + c; // 代码运行到这里会出错
}

```

- 严格模式禁止八进制数字语法. ECMAScript并不包含八进制语法, 但所有的浏览器都支持这种以零(0)开头的八进制语法: 0644 === 420 还有 "\045" === "%".在ECMAScript 6中支持为一个数字加"0o"的前缀来表示八进制数.

```
"use strict";

var a = 0o10; // ES6: 八进制

var a = 010; // 这个会报错

```

- ECMAScript 6中的严格模式禁止设置primitive值的属性.不采用严格模式,设置属性将会简单忽略(no-op),采用严格模式,将抛出TypeError错误

```
(function() {
  "use strict";

  false.true = "";              //TypeError
  (14).sailing = "home";        //TypeError
  "with".you = "far away";      //TypeError
})();

```

- 严格模式禁用 with.  with所引起的问题是块内的任何名称可以映射(map)到with传进来的对象的属性, 也可以映射到包围这个块的作用域内的变量(甚至是全局变量), 这一切都是在运行时决定的: 在代码运行之前是无法得知的. 严格模式下, 使用 with 会引起语法错误, 所以就不会存在 with 块内的变量在运行时才决定引用到哪里的情况了:

```js
"use strict";
var x = 17;
with (obj) { // !!! 语法错误
  // 如果没有开启严格模式，with中的这个x会指向with上面的那个x，还是obj.x？
  // 如果不运行代码，我们无法知道，因此，这种代码让引擎无法进行优化，速度也就会变慢。
  x;
}

```

- [严格模式下的 eval 不再为上层范围(surrounding scope,注:包围eval代码块的范围)引入新变量](http://whereswalden.com/2011/01/10/new-es5-strict-mode-support-new-vars-created-by-strict-mode-eval-code-are-local-to-that-code-only/). 在正常模式下,  代码 eval("var x;") 会给上层函数(surrounding function)或者全局引入一个新的变量 x . 这意味着, 一般情况下,  在一个包含 eval 调用的函数内所有没有引用到参数或者局部变量的名称都必须在运行时才能被映射到特定的定义 (因为 eval 可能引入的新变量会覆盖它的外层变量). 在严格模式下 eval 仅仅为被运行的代码创建变量, 所以 eval 不会使得名称映射到外部变量或者其他局部变量:

```js
var x = 17;
var evalX = eval("'use strict'; var x = 42; x");
console.assert(x === 17);
console.assert(evalX === 42);

```

- 相应的, 如果函数 eval 被在严格模式下的eval(...)以表达式的形式调用时, 其代码会被当做严格模式下的代码执行. 当然也可以在代码中显式开启严格模式, 但这样做并不是必须的.

```js
function strict1(str) {
  "use strict";
  return eval(str); // str中的代码在严格模式下运行
}
function strict2(f, str) {
  "use strict";
  return f(str); // 没有直接调用eval(...): 当且仅当str中的代码开启了严格模式时
                 // 才会在严格模式下运行
}
function nonstrict(str) {
  return eval(str); // 当且仅当str中的代码开启了"use strict"，str中的代码才会在严格模式下运行
}

strict1("'Strict mode code!'");
strict1("'use strict'; 'Strict mode code!'");
strict2(eval, "'Non-strict code.'");
strict2(eval, "'use strict'; 'Strict mode code!'");
nonstrict("'Non-strict code.'");
nonstrict("'use strict'; 'Strict mode code!'");

```


- 严格模式让arguments和eval少了一些奇怪的行为。两者在通常的代码中都包含了很多奇怪的行为： eval会添加删除绑定，改变绑定好的值，还会通过用它索引过的属性给形参取别名的方式修改形参. 虽然在未来的ECMAScript版本解决这个问题之前，是不会有补丁来完全修复这个问题，但严格模式下将eval和arguments作为关键字对于此问题的解决是很有帮助的。

- 名称 eval 和 arguments 不能通过程序语法被绑定(be bound)或赋值. 以下的所有尝试将引起语法错误:

```js
"use strict";
eval = 17;
arguments++;
++eval;
var obj = { set p(arguments) { } };
var eval;
try { } catch (arguments) { }
function x(eval) { }
function arguments() { }
var y = function eval() { };
var f = new Function("arguments", "'use strict'; return 17;");

```

- 严格模式下，参数的值不会随 arguments 对象的值的改变而变化。在正常模式下，对于第一个参数是 arg 的函数，对 arg 赋值时会同时赋值给 arguments[0]，反之亦然（除非没有参数，或者 arguments[0] 被删除）。严格模式下，函数的 arguments 对象会保存函数被调用时的原始参数。arguments[i] 的值不会随与之相应的参数的值的改变而变化，同名参数的值也不会随与之相应的 arguments[i] 的值的改变而变化。

```js
function f(a) {
  "use strict";
  a = 42;
  return [a, arguments[0]];
}
var pair = f(17);
console.assert(pair[0] === 42);
console.assert(pair[1] === 17);

```

- 不再支持 arguments.callee。正常模式下，arguments.callee 指向当前正在执行的函数。这个作用很小：直接给执行函数命名就可以了！此外，arguments.callee 十分不利于优化，例如内联函数，因为 arguments.callee 会依赖对非内联函数的引用。在严格模式下，arguments.callee 是一个不可删除属性，而且赋值和读取时都会抛出异常：

```js
"use strict";
var f = function() { return arguments.callee; };
f(); // 抛出类型错误

```

- 在严格模式下通过this传递给一个函数的值不会被强制转换为一个对象。对一个普通的函数来说，this总会是一个对象：不管调用时this它本来就是一个对象；还是用布尔值，字符串或者数字调用函数时函数里面被封装成对象的this；还是使用undefined或者null调用函数式this代表的全局对象（使用call, apply或者bind方法来指定一个确定的this）。这种自动转化为对象的过程不仅是一种性能上的损耗，同时在浏览器中暴露出全局对象也会成为安全隐患，因为全局对象提供了访问那些所谓安全的JavaScript环境必须限制的功能的途径。所以对于一个开启严格模式的函数，指定的this不再被封装为对象，而且如果没有指定this的话它值是undefined：

```js
"use strict";
function fun() { return this; }
console.assert(fun() === undefined);
console.assert(fun.call(2) === 2);
console.assert(fun.apply(null) === null);
console.assert(fun.call(undefined) === undefined);
console.assert(fun.bind(true)() === true);

```

- 在严格模式中再也不能通过广泛实现的ECMAScript扩展“游走于”JavaScript的栈中。在普通模式下用这些扩展的话，当一个叫fun的函数正在被调用的时候，fun.caller是最后一个调用fun的函数，而且fun.arguments包含调用fun时用的形参。这两个扩展接口对于“安全”JavaScript而言都是有问题的，因为他们允许“安全的”代码访问"专有"函数和他们的（通常是没有经过保护的）形参。如果fun在严格模式下，那么fun.caller和fun.arguments都是不可删除的属性而且在存值、取值时都会报错：

```js
function restricted() {
  "use strict";
  restricted.caller;    // 抛出类型错误
  restricted.arguments; // 抛出类型错误
}

function privilegedInvoker() {
  return restricted();
}

privilegedInvoker();

//Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them

```


- 在严格模式中一部分字符变成了保留的关键字。这些字符包括implements, interface, let, package, private, protected, public, static和yield。在严格模式下，你不能再用这些名字作为变量名或者形参名。



### 两个针对Mozilla开发的警告：

第一，如果你的JavaScript版本在1.7及以上（你的chrome代码或者你正确使用了`<script type="">`）并且开启了严格模式的话，因为let和yield是最先引入的关键字，所以它们会起作用。但是网络上用`<script src="">`或者`<script>...</script>`加载的代码，let或者yield都不会作为关键字起作用；

第二，尽管ES5无条件的保留了class, enum, export, extends, import和super关键字，在Firefox 5之前，Mozilla仅仅在严格模式中保留了它们。