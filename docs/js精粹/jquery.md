# jquery

jquery 现在依然是快速型页面中的王者

首先闭包，

```js

// 为什么传入2个参数呢，因为在老的IE浏览器中 undefined 是可以被赋值的
// 这样会干扰闭包内对undefined 的判定或使用，
// 如果我们传入一个参数但是不传入第二个，那么这个参数肯定是undefined

var jquery = (function(window, undefined){
    var jquery = function () {
        // 把构造函数交给 jquery.fn.init
        // fn 是 prototype 的简写，由下面定义
        return new jquery.fn.init();  // jQuery
    }
    // 在这里重写自己的原型链
    jquery.fn = jquery.prototype = {
        init: function (){},
        extend: function(){}
    };
    // jquery 的 init 方法 指向 jQuery 自己，保证this指向正确
    // 把构造函数指定给init
    jquery.fn.init.prototype = jquery.fn
    return jquery;
})(window);


// 另外的2个方法
// jQuery.fn.extend  // 直接对原型链进行操作
// jQuery.extend  // 直接添加静态方法

// 重载 （指根据参数不同调用不同的方法，这样这些方法肯定是同同名的，js 不支持重载）
function test(a){}
function test(a,b){}

// jQuery中函数的重写
function addMethod(obj, name, fn){
    var old = obj[name];  // 上一次的函数值
    obj[name] = function(){
        console.log(arguments)
        console.log(fn)
        if(fn.length === arguments.length){
            return fn.apply(this, arguments)
        }
        else if(typeof old === 'function'){
            console.log(old)
            return old.apply(this, arguments )
        }
    }
}
var people = ['a', 'b', 'c']

addMethod(people, 'find', function(){
    return this
})
addMethod(people, 'find', function(first){
    return 1
})
addMethod(people, 'find', function(first, sec){
    return 2
})

people.find('aaa')


```