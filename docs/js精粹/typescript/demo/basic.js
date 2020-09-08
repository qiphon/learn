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
var a = 123;
var b = 2;
var c = 76;
var d = 0x514;
var e = 6425n;
var f = 'qiphon';
var g = false;
var h = 'gitee';
