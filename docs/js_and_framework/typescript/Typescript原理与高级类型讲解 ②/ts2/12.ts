class TestClass {
  constructor(public name: string, public age: number) { }
}
type ConstructorParameters5<T extends new (...args: any[]) => any> = T extends new (...args: infer P) => any
  ? P
  : never;
type R4 = ConstructorParameters5<typeof TestClass> // [string, number]

//new (...args: any[]) => any指构造函数, 因为构造函数是可以被实例化的.
//infer P代表待推断的构造函数参数, 如果接受的类型T是一个构造函数, 那么返回构造函数的参数类型P, 否则什么也不返回, 即never类型