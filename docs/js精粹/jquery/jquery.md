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
        if(fn.length === arguments.length){
            return fn.apply(this, arguments)
        }
        else if(typeof old === 'function'){
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


// 链式调用
var obj = {
    a:function(){
        console.log('a')
        return this;
    },
    b:function(){
        console.log('b')
        return this;
    }
}

obj.a().b()

// 位运算

var a = [1, 3, 5]

var len = a.length >>> 0 ;  // 位运算，加快运算速度


// 减少if 和 switch的使用， 尽量用下面的这样的
// hook 解决一种或多种情况的处理
var obj = {  // 这种完全能替代 switch
    index: function(){},
    p: function(){}
}

obj[s] && obj[s]()


// ready

$.ready(function(){

})

// 实现
document.addEventListener('DOMContentloaded')

// IE 6 里面

(function(){
    function IEContentLoaded(){
        (function(){
            try{
                document.documentElement.doScoll('left')
            }catch(err){
                setTimeout(arguments.callee, 50)
            }
        })
    }
})


```

### sizzie  jquery  （性能利器）
Sizzle是一个纯javascript CSS选择器引擎。jquery1.3开始使用sizzle，Sizzle一反传统采取了相反的Right To Left的查询匹配方式,效率提高.Sizzle是jQuery作者John Resig新写的DOM选择器引擎,速度号称业界第一.Sizzle完全独立于jQuery，若不想用jQuery,你可只用Sizzle实现,压缩3K多

### 连贯接口 

> 1. 链式调用  
2. 命令查询媒体  重载   
3. 参数映射 