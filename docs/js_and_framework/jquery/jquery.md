# jquery

jquery 现在依然是快速型页面中的王者

首先闭包，

```js

// 为什么传入2个参数呢，因为在老的IE浏览器中 undefined 是可以被赋值的
// 这样会干扰闭包内对undefined 的判定或使用，
// 如果我们传入一个参数但是不传入第二个，那么这个参数肯定是undefined
// window，减少window在作用域中的查找时间

var jquery = (function(window, undefined){
    var jquery = function (selector, context) {
        // 把构造函数交给 jquery.fn.init
        // fn 是 prototype 的简写，由下面定义
        // jquery.fn == jquery.prototype == jquery.fn.init.prototype
        // jquery.fn.init == jquery
        // 这样就可以在使用jQuery的时候不使用 new 方法就能拿到 jQuery原型链上的所有方法
        return new jquery.fn.init(selector, context, rootjQuery);  // jQuery
    }
    // 在这里重写自己的原型链
    jquery.fn = jquery.prototype = {
        constructor: jquery,
        init: function (selector, context, rootjQuery){}
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

// on / live 实现方法
function live(targetObj, type, fn){
    document.onclick = function(event){
        var e = event || window.event
        // 解决浏览器兼容问题 IE e.sreElement   FF/chrome  e.target
        var target = e.srcElement || e.target
        if(e.type == type && target.tagName.toLocaleLowerCase() == targetObj){
            // 如果元素类型和事件类型同事匹配则执行函数
            fn()
        }
    }
}
$('.test').append('<div class="tt">tttt</div>')
live("div", 'click', function(){
    console.log(1111, 'hello tt')
})

// 短路表达式(快，方便)
var c = a && b
var c = a || b 

// 字符串的妙用
core_version='1.9.11'
core_trim = core_version.trim
jquery = {
    trim: function(data){
        // return String.prototype.trim.call(data)
        return core_trim.call(data)
    }
}


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


// ready 的实现方式

$.ready(function(){

})

// 实现
var $.ready = window.ready = function(fn){
    if(document.addEventListener){ // 兼容 IE
        document.addEventListener("DOMContentLoaded", function(){
            // 销毁事件避免重复触发
            document.removeEventListener("DOMContentLoaded", arguments.callee, fase)
            fn()
        }, false)
    }
    else if(document.attachEvent) {
        IEContentLoaded(window, fn)
    }
    // IE 6 里面
    function IEContentLoaded(w, fn){
        var d = w.document,
            done = false,
            init = function(){
                if(!done){
                    done = true
                    fn()
                }
            }
        // polling for no errors
        (function(){
            try{
                // 如果没有加载完成会报错
                d.documentElement.doScoll('left')
            }catch(err){
                setTimeout(arguments.callee, 50);
                return;
            }
            init()
        })();
        d.onreadstatechange = function(){
            if(d.readyState == 'complete'){
                d.onreadystatechange = null
                init()
            }
        }
    }
}




```

### sizzie  jquery  （性能利器）
Sizzle是一个纯javascript CSS选择器引擎。jquery1.3开始使用sizzle，Sizzle一反传统采取了相反的Right To Left的查询匹配方式,效率提高.Sizzle是jQuery作者John Resig新写的DOM选择器引擎,速度号称业界第一.Sizzle完全独立于jQuery，若不想用jQuery,你可只用Sizzle实现,压缩3K多

### 连贯接口 

> 1. 链式调用  
2. 命令查询媒体  重载   
3. 参数映射 