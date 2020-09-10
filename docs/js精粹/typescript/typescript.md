# typescript

静态性语言，防止发生低级的错误

## 基本类型

- boolean

- number

- string

- void 空值

- null 、 undefined

- symbol

- bigint

- any 任何类型，通常在不得已的情况下使用

- unknown 与any 不同之处，虽然都可以当作任何类型,但是当 unknown 类型被确定是某个类型之前，它不能执行任何操作

    ```typescript
    let val: any;

    val = true  // ok
    val = 1     // ok
    val = 'hello'  // ok
    val = Symbol('aa')  // ok
    val = {}  // ok
    val = []  // ok
    val.foo.bar  // ok
    val()  // ok
    new val()  // ok
    val[0][1]  // ok


    let val: unknown;

    val = true  // ok
    val = 1     // ok
    val = 'hello'  // ok
    val = Symbol('aa')  // ok
    val = {}  // ok
    val = []  // ok
    val.foo.bar  // error
    val()  // error
    new val()  // error
    val[0][1]  // error

    ```

- never 永远不存在的值

    ```ts
    function err(msg: string): never {
        throw new Error(msg)
    }

    // 永远是空值的数组
    let empty: never[] = []
    ```

- tuple 元祖 更严格的数组，限制每个元素的类型 

- enum 枚举类型，当我们声明一个枚举类型时，虽然没有给他们赋值，但是他们的值默认是数字类型，从0开始，依次累加

    ```ts
    enum Dire {
        up,
        down,
        left,
        right
    }
    console.log(Dire.up === 0)
    // {
    //   '0': 'up',
    //   '1': 'down',
    //   '2': 'left',
    //   '3': 'right',
    //   up: 0,
    //   down: 1,
    //   left: 2,
    //   right: 3
    // }

    // 当把第一个赋值后，后面的也会根据第一个值进行累加
    enum Dire {
        up = 10,
        down,
        left,
        right
    }
    // {
    //     '10': 'up',
    //     '11': 'down',
    //     '12': 'left',
    //     '13': 'right',
    //     up: 10,
    //     down: 11,
    //     left: 12,
    //     right: 13
    // }
    ```

    联合类型

    ```ts
    enum Dire {
        up = 10,
        down,
        left,
        right
    }
    let a: Dire;
    enum Animal {
        Dog,
        Cat
    }

    a = Dire.up
    // a = Animal.Cat  //  Type 'Animal.Cat' is not assignable to type 'Dire'.
    ```
- interface 接口

    typescript 的核心原则之一是对值所具有的结构进行类型检查，它有时被称作
    “鸭式辨型法”或“结构性子类型化”

    ```ts
    interface User {
        name: string,
        age?: number, // 可有可无
        readonly isMale: boolean,  // 只读属性
        say: (words: string) => string
    }

    interface Conf {
        width?: number
    }

    function caculate(conf: Conf) {
        let square = 100;
        if (conf.width) {
            square = conf.width ** 2
        }
        return { area: square }
    }

    let mySquare = caculate({ width: 23 })

    // 当传入额外的属性的时候（接口中没有定义的属性）编译会报错
    // let mySquare2 = caculate({ widdth: 23 })
    //  error TS2345: Argument of type '{ widdth: number; }' is not assignable to parameter of type 'Conf'.
    // 解决方法
    // 1. 改写接口
    // interface Conf {
    //     width?: number,
    //     [propName: string]: any
    // }
    // let mySquare2 = caculate({ widdth: 23 })
    // 2 写成如下这个形式
    // let mySquare2 = caculate({ widdth: 23 } as Conf)

    interface Conf {
        width?: number,
        detail: Detail
    }

    interface Detail {
        [name: string]: string
    }

    function caculate(conf: Conf) {
        let square = 100;
        if (conf.width) {
            square = conf.width ** 2
        }
        return { area: square }
    }

    let mySquare = caculate({
        width: 23,
        detail: {
            content: '12'
        }
    })
    let mySquare2 = caculate({
        width: 23,
        detail: {
            content: '123',
            overflow: 'hidden'
        }
    })
    ```

- class 类

    abstract 关键字是用于定义抽象类和抽象类内部定义抽象方法
    (抽象类不能直接被实例化，需要创建子类去继承它，抽象类中的抽象
    方法在子类继承时必须要被实现)

    ```ts
    abstract class Animal {
        abstract roar(): void;
        move(): void {
            console.log('move')
        }
    }

    class Cat extends Animal {
        roar() {
            console.log('miao miao...')
        }
    }

    const cat = new Cat()
    cat.move()
    ```

    类中的访问限定符：

    public 默认类中所有成员都为public，被次限定符修饰的成员可以被外部访问的

    private 被修饰的成员只可以被类的内部访问

    protected 被修饰的成员可以被类和子类内部访问

    class 可以作为接口（interface）使用，在react 工程中是很常用的。
    由于组件需要传入 props 的类型 Props，同时又需要设置默认的 props，即
    defaultProps。这个时候 class 作为接口的优势就体现出来了

    ```ts
    // props 的类型
    exprot default class Props {
        public children: Array<React.ReactElement<any>> | React.React.createElement<any> | never[] = []
        public speed: number = 500
        public action: () => {}
    }
    //当我们传入props 类型的时候，直接将 props 作为接口传入，当我们需要默认值的时候我们只需要
    public static defaultProps = new Props()
    // Props 的实例就是 defaultProps 的初始值，这就是 class 作为接口的
    // 实际应用，我们用一个 class 起到了接口和设置初始值这样2个功能，
    // 方便统一管理，减少了代码量
    ```
- Function 函数

    ```ts
    // 可选参数
    const add = (a: number, b?: number) => a + b ?? 0 
    // 默认参数
    const add = (a: number, b=10) => a + b  
    // 剩余参数
    const add = (a: number, ...rest:number[]) => rest.reduce((a,b)=> a+ b, a)  
    // 重载 overload
    interface Dir {
        top: number,
        bottom: number,
        left: number,
        right: number,
    }

    function assigned(all: number): Dir
    function assigned(top: number, bottom: number): Dir
    function assigned(top: number, bottom: number, left: number, right: number): Dir

    // 代码实现函数不可被调用
    function assigned(a: number, b?: number, c?: number, d?: number) {
        if (b === undefined && c === undefined && d === undefined) {
            b = c = d = a
        } else if (c === undefined && d === undefined) {
            c = a
            d = b
        }
        return {
            top: a,
            bottom: b,
            left: c,
            right: d
        }
    }
    ```

- 泛型

    泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

    ```ts
    // 泛型的标识字母是自定义的，可以使用任何字母，或多个字母
    // 下面这个函数表示 函数传入的类型和返回的类型是同一类型
    function a<U>(para: U): U {
        return para
    }

    a(23)

    // 多个泛型时

    function b<T, U>(tuple: [T, U]): [U, T] {
        return [tuple[1], tuple[0]]
    }

    function c<A, B>(a: A, b: B): string {
        return '' + a + b
    }
    c(23, 4)
    c(23, '4')
    // 泛型变量
    function d<T>(arg: T[]) {
        return arg.length
    }

    // 泛型接口
    interface ReturnItemFn<K> {
        (para: K): K
    }
    const returnItem: ReturnItemFn<number> = para => para ** 2
    const returnItem2: ReturnItemFn<unknown> = para => para
    returnItem2(123)

    // 泛型类
    class Stack<R> {
        private arr: R[] = []
        public push(item: R) {
            this.arr.push(item)
        }
        public pop(): R {
            return this.arr.pop()
        }
    }

    // 泛型约束
    // 下面是一个常见的需求，我们设计一个函数，这个函数接收2个参数，一个参数
    // 是对象，另一个参数为对象上的属性，我们通过这2个参数返回对象上的属性值
    function getVal<T extends object, K extends keyof T>(obj: T, key: K) {
        return obj[key]
    }

    // 泛型与 new
    function factory<T>(type: { new(): T }): T {
        return new type()
    }
    ```

- 交叉类型

    交叉类型是将多个类型合并为1个类型。这让我们可以把现有的多种类型叠加到一起
    成为一种类型，它包含了所需类型的所有特性

    在js 中，混入是一种非常常见的模式，在这种模式中，你可以从2个对象中创建一个
    新的对象，新对象会拥有2个对象所有的功能

    ```ts
    function mixin<T extends object, U extends object>(f: T, s: U): T & U {
        const res = <T & U>{};
        for (let id in f) {
            (<T>res)[id] = f[id]
        }
        for (let id in s) {
            (<U>res)[id] = s[id]
        }
        return res
    }
    const x = mixin({ a: 'hello' }, { b: 123 })

    console.log(x)
    ```

- 联合类型

    在js 中，你希望属性为多种类型之一，如字符串或数组。
    这就是联合类型能派上用场的地方（它使用`|`作为标记，如 `string|number`）

    ```ts
    function format(cmd: string[] | string) {
        let line = ''
        if (typeof cmd === 'string') {
            line = cmd.trim()
        } else {
            line = cmd.join(' ').trim()
        }
    }
    ```

- type 类型别名

    ```ts
    // 类型别名
    type some = boolean | string

    // var a: some = 12;  //  error TS2322: Type '12' is not assignable to type 'some'.
    var a: some = '12';
    var a: some = !12;

    type Tree<T> = {
        value: T,
        left: Tree<T>,
        right: Tree<T>
    }
    ```

    type 和 interface 区别：

    interface 只能用于定义对象类型，而type的声明方式除了对象之外还可以定义
    交叉、联合、原始类型等，类型声明的方式适用范围显然更加广泛

    interface 方式可以实现接口的 extends 和 implement
    
    interface 可以实现接口合并声明

    ```ts
    type Alias = {num: number}
    interface Interface {
        num: number
    }

    declare function aliased(arg: Alias): Alias
    declare function interfaced(arg: Interface): Interface
    ```

- 字面量类型

    Literal Type 主要分为真值字面量类型，数字字面量类型、枚举字面量类型、
    BigInt 字面量类型和字符串字面量类型

    ```ts
    // 字面量类型
    const a: 123 = 123
    const b: 0b10 = 2
    const c: 0o114 = 0b1001100
    const d: 0x514 = 0x514
    const e: 0x1919n = 6425n
    const f: 'qiphon' = 'qiphon'
    const g: false = false


    // const h: 'github' = 'gitee'  // error TS2322: Type '"gitee"' is not assignable to type '"github"'.

    // 当字面量类型与联合类型结合的时候，用处就显现出来了，它可以模拟一个类似枚举的效果
    type Dir = 'North' | 'West' | 'South' | 'East'

    function move(distance: number, dir: Dir) {

    }

    // 类型字面量

    type Action = {
        id: number,
        action: 'delete',
        info: Info
    } |
    {
        action: 'create',
        info: Info
    }

    type Info = {
        name: string
    }

    const action: Action = {
        action: 'create',
        info: {
            name: 'qiphon'
        }
    }
    ```

- 类型断言

    ```ts
    // 类型断言
    interface Per {
        name: string,
        age: number
    }

    let person = {};
    // person.age = 123 //  error TS2339: Property 'age' does not exist on type '{}'.
    (person as Per).age = 34

    // 双重断言
    // let c = 'qiphon' as Per;  // TS2352: Conversion of type 'string' to type 'Per' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
    let c = 'qiphon' as any as Per; // 这样就不报错

    // 类型守卫
    class Ani {
        name: 'dog'
        color: 'white'
    }

    class Per {
        name: 'john'
        age: 12
    }

    function w(arg: Per | Ani) {
        if (arg instanceof Per) {
            console.log(arg.name)
            // console.log(arg.color) // error TS2339: Property 'color' does not exist on type 'Per'.
        }
    }

    function w2(arg: Per | Ani) {
        if ('color' in arg) {
            console.log(arg.name)
            // console.log(arg.age) // error
        }
    }
    
    ```
- 结构类型

    ts 里的类型兼容性是基于「结构类型」的，结构类型是一种只使用其成员来
    描述类型的方式，其基本规则是，如果 x 要兼容 y，至少 y 具有与 x 相同
    的属性

    ```ts
    // 构建一个类 Per，然后声明一个接口 Dog， Dog 的属性 Per 都拥有，
    // 而且还多了其它的属性，这种情况下 Dog 兼容了 Per

    class Per {
        constructor(
            public weight: number,
            public name: string,
            public born: string
        ) { }
    }

    interface Dog {
        name: string,
        weight: number
    }

    let x: Dog

    x = new Per(12, 'ass', '1999')
    ```

- 函数兼容性

    ```ts

    let q = (a: string) => 0
    let p = (b: string, s: number) => 0

    // p = q
    // q = p;  // error TS2322: Type '(b: string, s: number) => number' is not assignable to type '(a: string) => number'.

    let foo = (
        x: number,
        y: number
    ) => { }
    let bar = (
        x?: number,
        y?: number
    ) => { }

    let bas = (...args: number[]) => { }

    // foo = bar = bas
    // bas = bar = foo

    let foo2 = (x: number, y: number) => { }
    let bar2 = (x?: number) => { }

    foo2 = bar2
    // bar2 = foo2 //  error TS2322: Type '(x: number, y: number) => void' is not assignable to type '(x?: number) => void'.
    ```

- class 兼容性

    仅仅只有实例成员和方法会相比较，构造函数和静态成员不会被检查

    ```ts
    class Ani {
        feet: number;
        constructor(name: string, numFeet: number) {
            this.feet = numFeet
        }
    }

    class Size {
        feet: number
        constructor(meters: number) {
            this.feet = meters
        }
    }

    let a: Ani = new Ani('a', 2)
    let b: Size = new Size(13)

    // a = b
    // b = a
    ```

- 泛型的兼容性

    泛型本身就是不确定类型，它的表现根据是否被成员使用而不同

    ```ts
    interface Per<T> {

    }
    let x: Per<string>;
    let y: Per<number>

    // x = y
    y = x


    interface Per<T> {
        name: T
    }
    let x: Per<string>;
    let y: Per<number>

    x = y  //  error TS2322: Type 'Per<number>' is not assignable to type 'Per<string>'.
    // Type 'number' is not assignable to type 'string'.
    // y = x  //  error TS2322: Type 'Per<string>' is not assignable to type 'Per<number>'.
    // Type 'string' is not assignable to type 'number'.
    ```

- is

    ```ts
    // 如果这个函数没有 写 test is string 下面的 example 函数中
    // 的 foo.length 就不能使用
    // function isString(test: any): test is string {
    //     return typeof test === 'string'
    // }

    //  error TS2339: Property 'length' does not exist on type 'string | number'.
    //   Property 'length' does not exist on type 'number'.
    function isString(test: any) {
        return typeof test === 'string'
    }

    function example(foo: number | string) {
        if (isString(foo)) {
            console.log('it is string ' + foo)
            console.log(foo.length)
        } else {
            console.log(foo)
        }
    }

    example('hello')
    ```

- 可调用类型注解

    ```ts
    interface ToString {
        (): string
        new(): string
    }

    declare const someToString: ToString
    someToString()
    new someToString()
    ```

- 高级类型：索引类型、映射类型、条件类型

    索引类型： 

    ```ts
    // 索引类型
    function pick<T, K extends keyof T>(o: T, names: K[]): T[K][] {
        return names.map(k => o[k])
    }
    // const res = pick(user, ['token', 'id'])
    ```

    映射类型：如果有一个需求，让接口 User 中的所有成员都是可选的，应该怎么实现？

    ```ts
    
    interface User {
        name: string,
        id: number,
        token: string,
        avatar: string,
        role: string
    }
    // type Keyof = keyof User
    type partial<T> = { [K in keyof T]?: T[K] }
    type partialUser = partial<User>
    type readonlyUser = Readonly<User>

    declare function f<T extends boolean>(x: T): T extends true ? string : number;

    const x3 = f(Math.random() < 0.5)
    const y3 = f(false)  // return number
    const z = f(true)  // return string
    ```

    条件类型

    条件类型表示非统一的类型，以一个条件表达式进行类型关系检测，从而在2种类型中选择一个

    ```ts
    T extends U ? X : Y
    // 若 T 能够赋值给 U，那么类型是 X，否则类型为 Y，有点类似 js 中的三元运算

    // 我们声明一个函数 f ，它的参数接收一个 boolean 类型，当 boolean 类型为true
    // 时返回 string，否则返回 number 类型
    declare function f<T extends boolean>(x: T): T extends true ? string : number;

    const x3 = f(Math.random() < 0.5)
    const y3 = f(false)  // return number
    const z = f(true)  // return string


    // 联合类型结合条件类型

    // 裸类型参数，没有其它类型包裹
    type NakedUsage<T> = T extends boolean ? 'yes' : 'no'
    // 类型参数被包裹在元祖内部
    type WrappedUsage<T> = [T] extends [boolean] ? 'yes' : 'no'

    type Distributed = NakedUsage<number | boolean>
    // = NakedUsage<number> | NakedUsage<boolean> = 'yes' | 'no'
    type NotDistributed = WrappedUsage<number | string> // 'no'

    type Diff<T, U> = T extends U ? never : T
    type R = Diff<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'> // 'b' | 'd'

    type Filter<T, U> = T extends U ? T : never
    type R2 = Filter<string | number | (() => void), Function>  // ()=> void

    // 剔除null 和 undefined
    type NotNullable<T> = Diff<T, null | undefined>

    type R3 = NotNullable<string | number | undefined> // string | number

    // 条件与映射类型
    现有一个 interface part, 现在需要编写一个工具类型，将 interface 中函数类型
    // 的名称取出来，写一个工具函数

    interface Part {
        id: number
        name: string
        subparts: Part[]
        updatePart: (newName: string) => void
    }

    /**
    * 这种问题我们应该换个思路，比如我们把 interface 看成 js 中的对象，如何才能去除值为
    * 函数的那个key
    * 
    * 1. 假设我们把Part 带入泛型 T， [keyof T] 相当于遍历整个 interface
    * 2. 这时 K相当于interface的 key [K in keyof T], T[K] 即为对应的value
    * 3. 接下来用条件判断，将值为Function 的转为 key，其它的值为 never
    * 4. 得到的interface 如下
    * type R = {
    *      id: never
    *      name: never
    *      subparts: never
    *      updatePart: 'updatePart'
    * }
    * 5. 接下来我们就可以用 keyof 取出 所有的key，never 会自动过滤掉
    * typeof T = keyof R
    */
    type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]

    type R = FunctionPropertyNames<Part>
    ```

### 书写方式

```typescript
var a: string = '123'

// array
var b: Array<number> = [12]
var b: number[] = [12]

// tuple 更严格的数组，限制每个元素的类型 
var tuple: [number, string] = [12, 'adddf']

type hello = (p: string) => string

interface Greeter {
    (p: string): string
}

const hello: hello = (p) => {
    return p
}


```