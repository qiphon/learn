// let a: number[] = [1, 2]

// enum Dire {
//     up,
//     down,
//     left,
//     right
// }
// console.log(Dire.up === 0)
// console.log(Dire)
// enum Dire {
//     up = 10,
//     down,
//     left,
//     right
// }
// // console.log(Dire.up === 0)
// // console.log(Dire)
// let a: Dire;

// enum Animal {
//     Dog,
//     Cat
// }

// a = Dire.up
// a = Animal.Cat  //  Type 'Animal.Cat' is not assignable to type 'Dire'.

// abstract class Animal {
//     abstract roar(): void;
//     move(): void {
//         console.log('move')
//     }
// }

// class Cat extends Animal {
//     roar() {
//         console.log('miao miao...')
//     }
// }

// const cat = new Cat()
// cat.move()

// interface Conf {
//     width?: number,
//     detail: Detail
// }

// interface Detail {
//     [name: string]: string
// }

// function caculate(conf: Conf) {
//     let square = 100;
//     if (conf.width) {
//         square = conf.width ** 2
//     }
//     return { area: square }
// }

// let mySquare = caculate({
//     width: 23,
//     detail: {
//         content: '12'
//     }
// })
// let mySquare2 = caculate({
//     width: 23,
//     detail: {
//         content: '123',
//         overflow: 'hidden'
//     }
// })

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

// 函数重载

// interface Dir {
//     top: number,
//     bottom: number,
//     left: number,
//     right: number,
// }

// function assigned(all: number): Dir
// function assigned(top: number, bottom: number): Dir
// function assigned(top: number, bottom: number, left: number, right: number): Dir

// // 代码实现函数不可被调用
// function assigned(a: number, b?: number, c?: number, d?: number) {
//     if (b === undefined && c === undefined && d === undefined) {
//         b = c = d = a
//     } else if (c === undefined && d === undefined) {
//         c = a
//         d = b
//     }
//     return {
//         top: a,
//         bottom: b,
//         left: c,
//         right: d
//     }
// }

// function a<U>(para: U): U {
//     return para
// }

// a(23)

// // 多个泛型时

// function b<T, U>(tuple: [T, U]): [U, T] {
//     return [tuple[1], tuple[0]]
// }

// function c<A, B>(a: A, b: B): string {
//     return '' + a + b
// }
// c(23, 4)
// c(23, '4')
// // 泛型变量
// function d<T>(arg: T[]) {
//     return arg.length
// }

// // 泛型接口
// interface ReturnItemFn<K> {
//     (para: K): K
// }
// const returnItem: ReturnItemFn<number> = para => para ** 2
// const returnItem2: ReturnItemFn<unknown> = para => para
// returnItem2(123)

// // 泛型类
// class Stack<R> {
//     private arr: R[] = []
//     public push(item: R) {
//         this.arr.push(item)
//     }
//     public pop(): R {
//         return this.arr.pop()
//     }
// }

// // 泛型约束
// // 下面是一个常见的需求，我们设计一个函数，这个函数接收2个参数，一个参数
// // 是对象，另一个参数为对象上的属性，我们通过这2个参数返回对象上的属性值
// function getVal<T extends object, K extends keyof T>(obj: T, key: K) {
//     return obj[key]
// }

// 泛型与 new
// function factory<T>(type: { new(): T }): T {
//     return new type()
// }
// 联合类型
// function format(cmd: string[] | string) {
//     let line = ''
//     if (typeof cmd === 'string') {
//         line = cmd.trim()
//     } else {
//         line = cmd.join(' ').trim()
//     }
// }

// 类型别名
// type some = boolean | string

// // var a: some = 12;  //  error TS2322: Type '12' is not assignable to type 'some'.
// var a: some = '12';
// var a: some = !12;

// type Tree<T> = {
//     value: T,
//     left: Tree<T>,
//     right: Tree<T>
// }

// var c: Tree = {
//     value: 123
// }

// 字面量类型
// const a: 123 = 123
// const b: 0b10 = 2
// const c: 0o114 = 0b1001100
// const d: 0x514 = 0x514
// const e: 0x1919n = 6425n
// const f: 'qiphon' = 'qiphon'
// const g: false = false


// // const h: 'github' = 'gitee'  // error TS2322: Type '"gitee"' is not assignable to type '"github"'.

// // 当字面量类型与联合类型结合的时候，用处就显现出来了，它可以模拟一个类似枚举的效果
// type Dir = 'North' | 'West' | 'South' | 'East'

// function move(distance: number, dir: Dir) {

// }

// // 类型字面量

// type Action = {
//     id: number,
//     action: 'delete',
//     info: Info
// } |
// {
//     action: 'create',
//     info: Info
// }

// type Info = {
//     name: string
// }

// const action: Action = {
//     action: 'create',
//     info: {
//         name: 'qiphon'
//     }
// }

// // 类型断言
// interface Per {
//     name: string,
//     age: number
// }

// let person = {};
// // person.age = 123 //  error TS2339: Property 'age' does not exist on type '{}'.
// (person as Per).age = 34

// // 双重断言
// // let c = 'qiphon' as Per;  // TS2352: Conversion of type 'string' to type 'Per' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
// let c = 'qiphon' as any as Per; // 这样就不报错

// 类型守卫 instanceof , in
// class Ani {
//     name: 'dog'
//     color: 'white'
// }

// class Per {
//     name: 'john'
//     age: 12
// }

// function w(arg: Per | Ani) {
//     if (arg instanceof Per) {
//         console.log(arg.name)
//         // console.log(arg.color) // error TS2339: Property 'color' does not exist on type 'Per'.
//     }
// }

// function w2(arg: Per | Ani) {
//     if ('color' in arg) {
//         console.log(arg.name)
//         // console.log(arg.age) // error
//     }
// }

// class Per {
//     constructor(
//         public weight: number,
//         public name: string,
//         public born: string
//     ) { }
// }

// interface Dog {
//     name: string,
//     weight: number
// }

// let x: Dog

// x = new Per(12, 'ass', '1999')

// type hello = (p: string) => string
// const hello: hello = (p) => {
//     return p
// }

// function mixin<T extends object, U extends object>(f: T, s: U): T & U {
//     const res = <T & U>{};
//     for (let id in f) {
//         (<T>res)[id] = f[id]
//     }
//     for (let id in s) {
//         (<U>res)[id] = s[id]
//     }
//     return res
// }
// const x = mixin({ a: 'hello' }, { b: 123 })

// console.log(x)

// let q = (a: string) => 0
// let p = (b: string, s: number) => 0

// // p = q
// // q = p;  // error TS2322: Type '(b: string, s: number) => number' is not assignable to type '(a: string) => number'.

// let foo = (
//     x: number,
//     y: number
// ) => { }
// let bar = (
//     x?: number,
//     y?: number
// ) => { }

// let bas = (...args: number[]) => { }

// // foo = bar = bas
// // bas = bar = foo

// let foo2 = (x: number, y: number) => { }
// let bar2 = (x?: number) => { }

// foo2 = bar2
// // bar2 = foo2 //  error TS2322: Type '(x: number, y: number) => void' is not assignable to type '(x?: number) => void'.


// class

// class Ani {
//     feet: number;
//     constructor(name: string, numFeet: number) {
//         this.feet = numFeet
//     }
// }

// class Size {
//     feet: number
//     constructor(meters: number) {
//         this.feet = meters
//     }
// }

// let a: Ani = new Ani('a', 2)
// let b: Size = new Size(13)

// // a = b
// // b = a

// 泛型
// interface Per<T> {

// }
// let x: Per<string>;
// let y: Per<number>

// // x = y
// y = x
// interface Per<T> {
//     name: T
// }
// let x: Per<string>;
// let y: Per<number>

// x = y  //  error TS2322: Type 'Per<number>' is not assignable to type 'Per<string>'.
// // Type 'number' is not assignable to type 'string'.
// // y = x  //  error TS2322: Type 'Per<string>' is not assignable to type 'Per<number>'.
// // Type 'string' is not assignable to type 'number'.

// is
// // 如果这个函数没有 写 test is string 下面的 example 函数中
// // 的 foo.length 就不能使用
// // function isString(test: any): test is string {
// //     return typeof test === 'string'
// // }

// //  error TS2339: Property 'length' does not exist on type 'string | number'.
// //   Property 'length' does not exist on type 'number'.
// function isString(test: any) {
//     return typeof test === 'string'
// }

// function example(foo: number | string) {
//     if (isString(foo)) {
//         console.log('it is string ' + foo)
//         console.log(foo.length)
//     } else {
//         console.log(foo)
//     }
// }

// example('hello')

// 可调用类型注解
// interface ToString {
//     (): string
//     new(): string
// }

// declare const someToString: ToString
// someToString()
// new someToString()

// // 索引类型
// function pick<T, K extends keyof T>(o: T, names: K[]): T[K][] {
//     return names.map(k => o[k])
// }
// // const res = pick(user, ['token', 'id'])


// 映射类型

// type User = {
//     name: string,
//     id: number,
//     token: string,
//     avatar: string,
//     role: string
// }
// // type m = keyof User

// // // type Keyof = keyof User
// type partial<T> = { [K in keyof T]?: T[K] }
// type partialUser = partial<User>

// type require<T> = { [K in keyof T]-?: T[K] }
// type requireUser = require<partialUser>

// type readOnly<T> = { readonly [K in keyof T]: T[K]}
// type readonlyUser = readOnly<partialUser>

// type readonlyUser = Readonly<User>

// declare function f<T extends boolean>(x: T): T extends true ? string : number;

// const x3 = f(Math.random() < 0.5)
// const y3 = f(false)  // return number
// const z = f(true)  // return string

// // 联合类型结合条件类型

// // 裸类型参数，没有其它类型包裹
// type NakedUsage<T> = T extends boolean ? 'yes' : 'no'
// // 类型参数被包裹在元祖内部
// type WrappedUsage<T> = [T] extends [boolean] ? 'yes' : 'no'

// type Distributed = NakedUsage<number | boolean>
// // = NakedUsage<number> | NakedUsage<boolean> = 'yes' | 'no'
// type NotDistributed = WrappedUsage<number | string> // 'no'

// type Diff<T, U> = T extends U ? never : T
// type R = Diff<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'> // 'b' | 'd'

// type Filter<T, U> = T extends U ? T : never
// type R2 = Filter<string | number | (() => void), Function>  // ()=> void

// // 剔除null 和 undefined
// type NotNullable<T> = Diff<T, null | undefined>

// type R3 = NotNullable<string | number | undefined> // string | number


// 条件与映射类型
// // 现有一个 interface part, 现在需要编写一个工具类型，将 interface 中函数类型
// // 的名称取出来，写一个工具函数

// interface Part {
//     id: number
//     name: string
//     subparts: Part[]
//     updatePart: (newName: string) => void
// }

// /**
//  * 这种问题我们应该换个思路，比如我们把 interface 看成 js 中的对象，如何才能去除值为
//  * 函数的那个key
//  * 
//  * 1. 假设我们把Part 带入泛型 T， [keyof T] 相当于遍历整个 interface
//  * 2. 这时 K相当于interface的 key [K in keyof T], T[K] 即为对应的value
//  * 3. 接下来用条件判断，将值为Function 的转为 key，其它的值为 never
//  * 4. 得到的interface 如下
//  * type R = {
//  *      id: never
//  *      name: never
//  *      subparts: never
//  *      updatePart: 'updatePart'
//  * }
//  * 5. 接下来我们就可以用 keyof 取出 所有的key，never 会自动过滤掉
//  * typeof T = keyof R
//  */
// type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]

// type R = FunctionPropertyNames<Part>

// tuple 转 union，比如 [string | number] -> string | number

// type ElementOf<T> = T extends Array<infer E> ? E : never

// type TTuple = [string, number, null]
// type ToUnion = ElementOf<TTuple>  // string | number


// interface User {
//     id: number
//     name: string
//     form?: string
// }

// type F4 = () => 'qiphon'
// type Foo = () => User
// type ReturnType4<T> = T extends () => infer P ? P : any

// type R = ReturnType4<Foo>  // User
// type R2 = ReturnType<F4>  // 'qiphon'
// type R22 = ReturnType4<F4>  // 'qiphon'


// class Test {
//     constructor(public name: string, public age: number) { }
// }

// type GetConstructorParam<T extends new (...args: any[]) => any> = T extends new (...args: infer P) => any ?
//     P : never

// type C = GetConstructorParam<typeof Test>  //  [name: string, age: number]

// type D = ElementOf<C>  //  string | number


// type Exclude2<T, U> = T extends U ? never : T
// type P = Exclude2<1 | 2, 2 | 3>

// Omit
// type Omit2<T, K> = Pick<T, Exclude<keyof T, K>>
// type Foo = Omit2<{ name: string, age: number }, 'name'>
// type Foo2 = Omit<{ name: string, age: number }, 'name'>

// // {
// //     age: number;
// // }

// // Merge
// // type Merge<T, U> = Computed<A> + Omit<M, N>

// type Computed<T extends any> = T extends Function ?
//     T :
//     { [K in keyof T]: T[K] }

// type R = Computed<{ x: 'x' } & { y: 'y' }>

// type Merge<O1 extends object, O2 extends object> = Computed<O1 & Omit<O2, keyof O1>>

// type O1 = {
//     age: number
//     type: string
// }

// type O2 = {
//     key: number
//     age: string
// }

// type C = Merge<O1, O2>
// // {
// //     age: number;
// //     type: string;
// //     key: number;
// // }


// // Intersection

// type Intersection<T extends object, U extends object> = Pick<T,
//     Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
// >

// type Props = { name: string; age: number; visible: boolean }
// type DefaultProps = { age: number }

// // expect {age:number}
// type DuplicatedProps = Intersection<Props, DefaultProps>


// // Overwrite<T, U> 顾名思义，是用 U 的属性覆盖 T 的相同属性
// type Computed<T extends any> = T extends Function ?
//     T :
//     { [K in keyof T]: T[K] }
// type Merge<O1 extends object, O2 extends object> = Computed<O1 & Omit<O2, keyof O1>>
// type Overwrite<
//     T extends object,
//     U extends object,
//     I extends object = Intersection<U, T>
//     > = Merge<I, T>

// type NewProps = { age: string, other: string }

// // expect { name: string; age: string; visible: boolean; }
// type ReplaceProps = Overwrite<Props, NewProps>


// // Mutable 将 T 的所有属性的 readonly 移除
// type Mutable<T> = {
//     -readonly [P in keyof T]: T[P]
// }

// // Record 允许从 Union 类型中创建新类型， Union类型中的值用作新类型的属性
// type Car = 'Audi' | 'BMW' | 'Benz'
// type CarList = Record<Car, { age: number }>

// const cars: CarList = {
//     Audi: { age: 1 },
//     BMW: { age: 12 },
//     Benz: { age: 13 },
// }


// typeof 

// function sum (a: number, b: number): string{
//     return (a+ b).toFixed(2)
// }

// type SUM = typeof sum
// // type SUM = (a: number, b: number) => string

// type Per = {
//     name: string,
//     age?: number
// }

// let p = {
//     name: 'qiphon',
//     age: 25
// }

// type c = typeof p

// type c = {
//     name: string;
//     age: number;
// }

// var x = 123 as const
// type X = typeof x   // type X = 123

// var b = {a: 12} as const
// type B = typeof b

// // type B = {
// //     readonly a: 12;
// // }

// var y = [1, 2] as const
// type Y = typeof y
// // type Y = readonly [1, 2]
// type N = typeof y[number]
// // type N = 1 | 2

// const locales = [
//     {
//         locale: "zh-CN",
//         language: "中文"
//     },
//     {
//         locale: "en",
//         language: "English"
//     }
// ] as const;

// type Locale = typeof locales[number]["locale"];
// // type Locale = "zh-CN" | "en"

interface Person {
    name: string;
    age: number;
}

type K1 = keyof Person; // "name" | "age"
type K2 = keyof Person[]; // "length" | "toString" | "pop" | "push" | "concat" | "join" .... (所有数组的方法)
type K3 = keyof { [x: string]: Person };  // string | number