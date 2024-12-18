# js 函数式编程

## 范畴论 category Theory

- 函数式编程是范畴论的数学分支是一门很复杂的数学，认为世界上所有概念体系都可以抽象出一个个范畴
- 彼此之间存在某种关系概念、事物、对象等等，都构成范畴。任何事物只要找到他们之间的关系就能定义
- 箭头表示范畴成员之间的关系，正式的名称叫做“态射”。范畴论认为，同一个范畴的所有成员就是不同状态的“变形”。通过态射，一个成员可以变成另一个成员

### 函数式编成基础理论

- 函数式编程其实是相对于计算机的历史而言是一个非常古老的概念，甚至早于第一台计算机的诞生。函数式编程的基础模型来源于 lambda 演算，而 lambda 演算并非设计与在计算机上执行，它是在 20 世纪三十年代引入的一套用于研究函数定义、函数应用和递归的形式系统。
- 函数式编程不是采用函数来编程，也不是传统的面向过程编程。主旨于将复杂的函数符合成简单的函数（计算机理论，或者递归论，或者拉姆达演算）。运算过程尽量写成一系列的嵌套函数调用
- js 是披着 c 外衣的 lisp
- 真正的火热是随着 React 的高阶函数而逐步升温

函数是一等公民。所谓一等公民（first class），是指函数与其他的数据类型一样，处于平等地位，可以赋值給其他变量，也可以作为参数传入另一个函数或者作为别的函数的返回值

不可改变量。在函数式编程中，我们通常理解的变量在函数式编程中也被函数取代了；在函数式编程中变量仅仅代表某个表达式。这里所说的变量是不能被修改的。所有的变量只能被赋一次初始值

map 和 reduce 他们是最常用的函数式编程的方法

总结：

- 函数是一等公民
- 只用“表达式”，不用语句
- 没有副作用
- 不修改状态
- 引用透明（函数运行只靠参数）

### 专业术语

- 纯函数

对于相同的输入永远得到相同的输出，没有任何可观察的副作用，也不依赖外部环境的状态

优点：

纯函数不仅可以有效降低系统的复杂度，还有很多很棒的特性，比如可缓存性

```js
import _ from 'lodash'

var sin = _.memorize(x=> Math.sine(x))

// 第一次计算可能会慢一点
var a = sin(1)

// 第二次有了缓存，速度极快
var b = sin(1)

```

```js

// 不纯的
var min = 18
var a = age => age > min

// 纯的
var a = age => age > 18

// 在不纯的版本中，a 不仅取决于age 还取决于 外部变量 min
// 纯的 a 把关键数字18 编码在函数内部，扩展性比较差，柯里化优雅的函数式解决

```
    - 纯度和幂等性
    
    幂等性是指执行无数次后还是具有相同的效果，同一的参数运行一次函数应该与连续运行2次结果一致。幂等性在函数式编程中与纯度相关，但又不一致

    ``` Math.abs(Math.abs(12)) ```

    
- 偏应用函数、函数的柯里化

    - 柯里化
    
        - 柯里化（curried）通过偏应用函数实现

        - 传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数
        
        ```js
        var checkage = min => age => age > min

        var checkage18 = checkage(18)

        checkage18(20)

        // 在写一个例子
        // 柯里化之前
        function add(x, y){
            return x + y
        }
        add(1,2)  // 3

        // 柯里化之后
        function addX(y){
            return function(x){
                return x + y
            }
        }
        addX(2)(1)

        // bind 实现的例子
        function foo(p1, p2){
            this.val = p1 + p2
        }
        var bar = foo.bind(null, "p1")
        var baz = new bar("p2")
        console.log(baz.val)

        ```
    事实上，柯里化是一种“预加载”函数的方法，通过传递较少的参数，得到一个已经记住了这个这些参数的新函数，某种意义上讲，这是一种对参数的缓存，是一种非常高效的编写函数的方法

    - 偏应用函数

        - 传递给函数一部分参数来调用它，让他返回一个函数去处理剩下的参数
        - 偏函数之所以“偏”，就在于只能处理那些能与至少一个 case 语句匹配的输入，而不能处理所有可能的输入

        ```js
        // 带一个函数参数 和 该函数的部分参数
        const partial = (f, ...args)=>
          (...moreArgs)=> f(...args, ...moreArgs)
        
        const add3 = (a, b, c)=> a+ b+ c
        // 偏应用 2 和 3 到 add3 给你一个单参数的函数
        const fivePlus = partial(add3, 2, 3)
        fivePlus(4)

        // bind 实现
        const add1More = add3.bind(null, 2, 3)
        
        ```

- 函数组合

    - 纯函数以及如何把柯里化写出的洋葱代码 h(g(f(x))),为了解决函数嵌套问题，我们需要用到函数组合

    ```js
    const compose = (f, g) => (x => f(g(x)))

    var first = arr => arr[0]

    var reverse = arr => arr.reverse()

    var last = compose(first, reverse)

    last(1,2,3,4,5)

    ```

- Point Free

    - 把一些对象自带的方法转化成纯函数，不要命名转瞬即逝的中间变量
    - 这个函数中，我们使用 str 作为我们的中间变量，但这个中间变量除了让我们代码变得长了一点以外是毫无意义的

    ```js
    const f = str => str.toUpperCase().split('')

    var toUpperCase = word => word.toUpperCase()
    var split = x => str => str.split(x)
    var f = compose(split(''), tuUpperCase)

    f("abcd efgh")

    ```
    这种风格能够帮助我们减少不必要的命名，让代码保持简洁和通用    

- 声明式与命名式代码

命令式代码的意思就是，我们通过编写一条又一条指令去让计算机执行一些动作，这其中一般都会涉及到很多繁杂的细节。而声明式就优雅很多，我们通过写表达式的方式来声明我们想干什么而不是通过一步步的指示

```js
// 命令式
let ceos = []
for(var i = 0; i < companies.length; i++ ){
    ceos.push(companies[i].ceo)
}

// 声明式
let ceos = companies.map( c => c.ceo )

```

优缺点：函数式编程的一个明显的好处就是这种声明式的代码对于无副作用的纯函数，我们完全可以不考虑函数内部是如何实现的，专注于编写业务代码。优化代码时，目光只需集中在这些稳定坚固的函数内部即可

相反，不纯的函数式的代码会产生副作用或者依赖外部系统环境，使用它门的时候总是要这些不干净的副作用。在复杂的系统中。这对于程序员的心智是极大的负担

- 惰性求值

在指令式语言中以下代码会按顺序执行，由于每个函数都有可能改动或依赖于其外部的状态，因此必须顺序执行

## 更加专业的术语

- 高阶函数

函数当参数，把传入的函数做一个封装，然后返回这个封装函数，达到更高程度的抽象

```js
// 命令式

var add = function(a,b){
    return a+b
}

function math(func, array){
    return func(array[0], array[1])
}

math(add, [1,2])

```

- 尾调用优化 PTC

函数内部的最后一个动作是函数调用。该调用的返回值直接返回给函数。函数调用自身，成为递归。如果尾调用自身，就称为尾递归。递归需要保存大量调用记录，容易发生栈溢出错误，如果使用尾递归优化，将递归变为循环，那么就保存一个调用记录，这样就不会出现溢出错误了

```js
// 不是尾递归，无法优化斐波纳切数列
function f(n){
    if(n === 1) return 1
    return n * function(n -1)
}
// es6 强制使用尾递归
function ff(n, total){
    if(n === 1) returrn total
    return ff(n-1, n * total)
}

/**
    传统递归
    f(5)
    (5 * f(4))
    (5 * (4 * f(3)))
    (5 * (4 *(3 * f(2))))
    (5 * (4 *(3 * (2 * f(1)))))
    (5 * (4 *(3 * (2 * 1)))
    (5 * (4 *(3 * 2 )))
    (5 * (4 * 6))
    (5 * 24)
    120

    普通递归内存需记录调用的堆栈所出的深度和位置信息。在最底层计算返回值。再根据记录的信息跳回上一层级计算，然后再跳回更上一层，依次运行，直到最外层的调用函数。cpu 计算和内存会消耗很多，而且当深度过大时会出现内存溢出
*/

/**
    尾递归
    ff(5, 1)
    ff(4, 5)
    ff(3, 20)
    ff(2, 60)
    ff(1, 120)
    120

    尾递归整个计算过程是线性的，调用一次 ff 后，会进入下一个栈，相关的数据和信息跟随进入，不再放在堆栈上保存。当计算完最后的值后，直接返回到最上层的 ff(5, 1),这能有效防止堆栈溢出

    在 es6 ，我们将迎来尾递归优化，通过尾递归优化，js 代码在解释成机器码之后，会向 while 看起，也就是说，同时拥有数学表达能力和 while 的效能
*/

// 尾调用优化
function init(){
    tt(i)
}
function tt(i){
    init(i -1)
}

```

    - 浏览器并没有实现尾递归，开启需要强制

    ```js
    // 强制开启的三种方式
    // 遗憾的是浏览器并未支持
    return continue

    !return

    #functionn()

    ```
    - 尾递归的判断标准是函数运行【最后一步】是否调用自身，而不是 【最后一行】调用自身。*最后一行*调用自身的是尾调用

    - 按道理尾递归调用 调用栈永远都是更新当前的栈帧而已，这样就完全避免了爆栈的危险。但是现如今的浏览器并未完全支持原因：1.在引擎层面消除递归是一个隐式行为，程序员意识不到；2、堆栈信息丢失了，开发者难以调试

    - 既然浏览器不支持，我们可以把这些递归写成 while

- 闭包

    - 保留了其他函数内部的词法作用域  --》 小黄书
    
    - 有权访问其他函数内部变量的函数  ==》 小红书

- 容器、Functor

    - 我们可以把“范畴”想象成一个容器，里面包含2样东西。值、值的变形关系，也就是函数
    - 范畴论使用函数，表达范畴之间的关系
    - 伴随着范畴论的发展，就发展出一整套函数的运算方法。这套方法起初只用于数学运算，后来有人将它在计算机上实现了，就变成了今天的函数式编程
    - 本质上，函数式编程只是范畴论的运算方法，跟数理逻辑、微积分、行列式是同一类东西，都是数学方法，只能碰巧能用来写程序。
    - 为什么函数式编程要求函数是纯的，不能有副作用？因为它是一种数学运算，原始目的就是求值，不做其他事情，否则就无法满足函数运算法则了

    - 函数不仅可以用于同一个范畴之中值的转换，还可以用于将一个范畴转成另一个范畴。这就涉及到了函子（functor）
    - 函子是函数式编程里面最重要的数据类型，也是基本的运算单位和功能单位。它首先是一种范畴，也就是说是一个容器，包含了值和变形关系。比较特殊的是，它的变形关系可以依次作用于每一个值，将当前容器变形成另一个容器
    - $(...)返回的对象并不是原生的dom 对象，而是对原生对象的一种封装，在某种意义上就是一个容器（但它并不是函数式）
    - functor(函子)遵守一些特定的规则的容器类型
    - Functor 是一个对于函数调用的抽象，我们赋予容器自己去调用函数的能力。把东西装进一个容器，只留出一个接口 map 给容器外的函数，map一个函数时，我们让容器自己来运行这个函数，这样容器就可以自由的选择何时何地如何操作这个函数，以至于拥有惰性求值、错误处理、一部调用等等非常利害的特性。

    ```js
    var Container = function(x){
        this.value = x
    }
    // 函数式编程约定，函子有一个 of 方法
    Container.of = x => new Container(x)
    // Container.of('aaa')
    // 一般约定，函子的标志就是容器具有 map 方法。该方法将容器里的每一个值映射到另一个容器
    Container.prototype.map = function(f){
        return Container.of(f(this.value))
    }

    Container.of(3)
      .map(x=> x + 1)         // Container(4)
      .map(x => "Result is" + x)  // Container( "Result is 4" )


    // es6 写法
    class Functor {
        constructor(val){
            this.val = val
        }
        map(f){
            return new Functor(f(this.val))
        }
    }
    (new Functor(2)).map(2=> 2+ 2) // Functor(4)

    ```
    上面代码中，Functor 是一个函子，它的 map 方法接受函数 f 作为参数，然后返回一个新的函子，里面包含的值是被 f 处理过的 （f(this.val)）
    
    一般约定，函子的标志就是容器有一个 map 方法。该方法将容器里的每一个值映射到另一个容器。

    上面的例子说明，函数式编程里面的运算，都是通过函子来完成，即运算不直接针对值，而是针对这个值的容器 --- 函子。函子本身具有对外接口（map方法），各种函数就是运算符，通过接口接入容器引发容器里的值变形。

    因此，学习函数式编程，实际上就是学习函子的各种运算。由于可以把运算方法封装在函子里面，所以又衍生出各种不同类型的函子，有多少种运算，就有多少种函子。函数式编程就变成了运用不同的函子，解决实际问题

    - of 方法：
        - 可能注意到了，上面生成新的函子的时候用了new 命令。这实在不太像函数式编程了，因为 new 命令是面向对象编程的标志。
        - 函数式编程一般约定，函子有一个 of 方法，用来生成新的容器

        ```js
        Functor.of = function(val){
            return new Functor(val)
        }

        ```
    - Maybe 函子（if）
        - 函子接受各种函数，处理容器内部的值。这里就有一个问题，容器内部的值可能是一个空值（如 null），而外部函数未必有处理空值的机制，如果传入空值，很可能就会出错。

        ```js
        Functor.of(null).map(s => s.toUpperCase())
        // TypeErroe
        class Maybe extends Functor {
            map(f){
                return this.val ? Maybe.of(f(this.val)) : Maybe.of(null)
            }
        }
        Maybe.of(null).map( s => s.toUpperCase() )
        // Maybe(null)

        // Maybe 函子
        var Maybe = function(x){
            this.val = x
        }
        Maybe.of = function(x){
            return new Maybe(x)
        }
        Maybe.prototype.map = function(f){
            return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.val))
        }
        Maybe.prototype.isNothing = function(){
            return (this.val === null || this.val === undefined)
        }
        // 容器之所以称之为 Maybe (原型来自 Haskell)

        ```


- 错误处理、Either、AP

    - 我们的容器能处理的事情太少了， try/catch/throw 并不是 “纯”的，因为它从外部接管了我们的函数，并且这个函数出错时抛弃了它的返回值。

    - Promise 可以调用 catch 来集中处理错误的

    - 事实上 Either 并不只是用来做错误处理的，它表示了逻辑或，范畴学里的 coproduc

    - Either ： 条件运算符 if ... else 是最常见的运算符之一，函数式编程里面，使用 Either 函子表达。Either 函子内部有2个值：左值（left）和 右值（right）。右值是正常情况下使用的值，左值是右值不存在时使用的默认值。

    ```js
    class Either extends Functor {
        constructor(left , right){
            this.left = left
            this.right = right
        }
        map(f){
            return this.right ? 
                Either.of(this.left, f(this.right)) : 
                Either.of(f(this.left), this.right)
        }
    }
    Either.of = function (left , right){
        return new Either(left, right)
    }

    var addOne = function(x){
        return x + 1
    }
    Either.of(5,6).map(addOne)  // Either(5, 7)
    Either.of(5,null).map(addOne)  // Either(6, null)


    // es 5
    var left = function(x){
        this.val = x
    }
    var right = function(x){
        this.val = x
    }
    left.of = function(x){
        return new left(x)
    }
    right.of = function(x){
        return new right(x)
    }

    left.prototype.map = function (f){
        return this
    }
    right.prototype.map = function(f){
        return right.of(f(this.val))
    }
    // left 和 right 的唯一区别就在于 map 方法的实现， right.map 的行为和我们之前提到的 map 函数一样，但是let.map 就很不同了，它不会对容器做任何事情，只是很简单地把这个容器拿进来又扔出去。这个特性意味着，left 可以用来传递一个错误消息

    // 错误处理、Either
    var getAge = user => user.age ? Right.of(user.age) : Left.of("Error")
    getAge({name:"stark", age: 23}).map(age => "age is" + age)  // Right('Age is 23')
    getAge({name:"stark"}).map(age => "age is" + age)  // Left('Error')
    // left 可以让调用链中任意一环的错误立刻返回到调用链的尾部，这给我们错误处理带来了很大方便，再也不用一层有一层地 try/catch

    ```
    - AP 函子 ：函子里面包含的值，完全可能是函数。我们可以想象这样一种情况，一个函子的值是数值，另一个函子的值是函数
    
    ```js
    class Ap extends Functor {
        ap(F){
            return Ap.of(this.val(f.val))
        }
    }

    Ap.of(addTwo).ap(Functor.of(2))

    ```

- IO

    - 真正的程序总要去接触肮脏的世界

    ```js
    function readLocalStorage(){
        return window.localStorage
    }

    ```
    - IO 根前面那几个函子不同在于它的 value 是一个函数。它把不纯的操作（比如 IO、网络请求、DOM）包裹到一个函数内，从而延迟这个操作的执行。所以我们认为，IO 包含的是被包裹的操作的返回值
    - IO 其实也是惰性求值
    - IO 负责了调用链积累了很多很多不纯的操作，带来的复杂性和不可维护性

    ```js
    import _ from 'lodash'
    var compose = _.flowRight

    var IO = function(f){
        this.val = f
    }
    IO.of = x => new IO(_ =>x)
    IO.prototype.map = function(f){
        return new IO(compose(f, this.val))
    }

    // es6
    import _ from 'lodash'
    var compose = _.flowRight
    class IO extends Monad {
        map(f){
            return IO.of(compose(f, this.val))
        }
    }

    // 例子
    var fs = require('fs')
    var readFile = function(filename){
        return new IO(function(){
            return fs.readFileSync(filename, 'utf-8')
        })
    }
    readFile('./user.txt')
    .flatMap(tail)
    .flatMap(print)
    // 等同于
    readFile('./user.txt')
    .chain(tail)
    .chain(print)

    ```


- Monad

    - Monad 就是一种设计模式，表示将一个运算过程，通过函数拆解成相互连接的多个步骤。你只要提供下一步运算所需的函数，整个运算就会自动进行下去。
    - Promise 就是一种Monad 
    - Monad 让我们避开了嵌套地狱，可以轻松地进行深度嵌套的函数式编程，比如 IO 和 其他异步任务
    - 记得让上面的IO 集成 Monad

    ```js
    Maybe.of(Maybe.of(Maybe.of(
        {name: 'aaa', number: 123}
    )))
    class Monad extends Functor {
        join(){
            return this.val
        }
        flatMap(f){
            return this.map(f).join()
        }
    }
    // Monad 函子的作用是总是返回一个单层的函子。它有一个 flatMap 方法，与 map 方法作用相同，唯一的区别就是如果生成了一个嵌套函子，它就会读取后者内部的值，保证返回的永远是一个单层的容器，不会出现嵌套的情况。
    // 如果函数 f 返回的是一个函子，那么 this.map(f) 就会生成一个嵌套的函子，所以，join方法保证了 flatMap 方法总是返回一个单层的函子。这意味着嵌套的函子会被铺平

    ```