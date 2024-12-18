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

- unknown 与 any 不同之处，虽然都可以当作任何类型,但是当 unknown 类型被确定是某个类型之前，它不能执行任何操作

  ```typescript
  let val: any;

  val = true; // ok
  val = 1; // ok
  val = "hello"; // ok
  val = Symbol("aa"); // ok
  val = {}; // ok
  val = []; // ok
  val.foo.bar; // ok
  val(); // ok
  new val(); // ok
  val[0][1]; // ok

  let val: unknown;

  val = true; // ok
  val = 1; // ok
  val = "hello"; // ok
  val = Symbol("aa"); // ok
  val = {}; // ok
  val = []; // ok
  val.foo.bar; // error
  val(); // error
  new val(); // error
  val[0][1]; // error
  ```

- never 永远不存在的值

  ```ts
  function err(msg: string): never {
    throw new Error(msg);
  }

  // 永远是空值的数组
  let empty: never[] = [];
  ```

- tuple 元祖 更严格的数组，限制每个元素的类型

- enum 枚举类型，当我们声明一个枚举类型时，虽然没有给他们赋值，但是他们的值默认是数字类型，从 0 开始，依次累加

  ```ts
  enum Dire {
    up,
    down,
    left,
    right,
  }
  console.log(Dire.up === 0);
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
    right,
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
    right,
  }
  let a: Dire;
  enum Animal {
    Dog,
    Cat,
  }

  a = Dire.up;
  // a = Animal.Cat  //  Type 'Animal.Cat' is not assignable to type 'Dire'.
  ```

- interface 接口

  typescript 的核心原则之一是对值所具有的结构进行类型检查，它有时被称作
  “鸭式辨型法”或“结构性子类型化”

  ```ts
  interface User {
    name: string;
    age?: number; // 可有可无
    readonly isMale: boolean; // 只读属性
    say: (words: string) => string;
  }

  interface Conf {
    width?: number;
  }

  function caculate(conf: Conf) {
    let square = 100;
    if (conf.width) {
      square = conf.width ** 2;
    }
    return { area: square };
  }

  let mySquare = caculate({ width: 23 });

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
    width?: number;
    detail: Detail;
  }

  interface Detail {
    [name: string]: string;
  }

  function caculate(conf: Conf) {
    let square = 100;
    if (conf.width) {
      square = conf.width ** 2;
    }
    return { area: square };
  }

  let mySquare = caculate({
    width: 23,
    detail: {
      content: "12",
    },
  });
  let mySquare2 = caculate({
    width: 23,
    detail: {
      content: "123",
      overflow: "hidden",
    },
  });
  ```

- class 类

  abstract 关键字是用于定义抽象类和抽象类内部定义抽象方法
  (抽象类不能直接被实例化，需要创建子类去继承它，抽象类中的抽象
  方法在子类继承时必须要被实现)

  ```ts
  abstract class Animal {
    abstract roar(): void;
    move(): void {
      console.log("move");
    }
  }

  class Cat extends Animal {
    roar() {
      console.log("miao miao...");
    }
  }

  const cat = new Cat();
  cat.move();
  ```

  类中的访问限定符：

  public 默认类中所有成员都为 public，被次限定符修饰的成员可以被外部访问的

  private 被修饰的成员只可以被类的内部访问

  protected 被修饰的成员可以被类和子类内部访问

  class 可以作为接口（interface）使用，在 react 工程中是很常用的。
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
  const add = (a: number, b?: number) => a + b ?? 0;
  // 默认参数
  const add = (a: number, b = 10) => a + b;
  // 剩余参数
  const add = (a: number, ...rest: number[]) => rest.reduce((a, b) => a + b, a);
  // 重载 overload
  interface Dir {
    top: number;
    bottom: number;
    left: number;
    right: number;
  }

  function assigned(all: number): Dir;
  function assigned(top: number, bottom: number): Dir;
  function assigned(
    top: number,
    bottom: number,
    left: number,
    right: number
  ): Dir;

  // 代码实现函数不可被调用
  function assigned(a: number, b?: number, c?: number, d?: number) {
    if (b === undefined && c === undefined && d === undefined) {
      b = c = d = a;
    } else if (c === undefined && d === undefined) {
      c = a;
      d = b;
    }
    return {
      top: a,
      bottom: b,
      left: c,
      right: d,
    };
  }
  ```

- 泛型

  泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

  ```ts
  // 泛型的标识字母是自定义的，可以使用任何字母，或多个字母
  // 下面这个函数表示 函数传入的类型和返回的类型是同一类型
  function a<U>(para: U): U {
    return para;
  }

  a(23);

  // 多个泛型时

  function b<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
  }

  function c<A, B>(a: A, b: B): string {
    return "" + a + b;
  }
  c(23, 4);
  c(23, "4");
  // 泛型变量
  function d<T>(arg: T[]) {
    return arg.length;
  }

  // 泛型接口
  interface ReturnItemFn<K> {
    (para: K): K;
  }
  const returnItem: ReturnItemFn<number> = (para) => para ** 2;
  const returnItem2: ReturnItemFn<unknown> = (para) => para;
  returnItem2(123);

  // 泛型类
  class Stack<R> {
    private arr: R[] = [];
    public push(item: R) {
      this.arr.push(item);
    }
    public pop(): R {
      return this.arr.pop();
    }
  }

  // 泛型约束
  // 下面是一个常见的需求，我们设计一个函数，这个函数接收2个参数，一个参数
  // 是对象，另一个参数为对象上的属性，我们通过这2个参数返回对象上的属性值
  function getVal<T extends object, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }

  // 泛型与 new
  function factory<T>(type: { new (): T }): T {
    return new type();
  }
  ```

- 交叉类型
  
  [相关的讨论](https://github.com/microsoft/TypeScript/issues/1256)
  [相关的讨论](https://github.com/microsoft/TypeScript/pull/3622)

  交叉类型是将多个类型合并为 1 个类型。这让我们可以把现有的多种类型叠加到一起
  成为一种类型，它包含了所需类型的所有特性

  在 js 中，混入是一种非常常见的模式，在这种模式中，你可以从 2 个对象中创建一个
  新的对象，新对象会拥有 2 个对象所有的功能

  ```ts
  function mixin<T extends object, U extends object>(f: T, s: U): T & U {
    const res = <T & U>{};
    for (let id in f) {
      (<T>res)[id] = f[id];
    }
    for (let id in s) {
      (<U>res)[id] = s[id];
    }
    return res;
  }
  const x = mixin({ a: "hello" }, { b: 123 });

  console.log(x);

  // 函数的交叉类型是重载函数
  type M = (a: number) => number;
  type N = (a: string) => string;

  function overload(a: number): number;
  function overload(a: string): string;
  function overload(a: number | string) {
      return a;
  }

  let m: M = overload; // OK
  let n: N = overload; // OK
  let mn: M & N = overload; // OK

  m(123)
  n('string')
  mn('false')
  mn(123)
  ```

- 联合类型

  [相关的讨论](https://github.com/microsoft/TypeScript/issues/805)
  [相关的讨论](https://github.com/microsoft/TypeScript/pull/824)

  在 js 中，你希望属性为多种类型之一，如字符串或数组。
  这就是联合类型能派上用场的地方（它使用`|`作为标记，如 `string|number`）

  ```ts
  function format(cmd: string[] | string) {
    let line = "";
    if (typeof cmd === "string") {
      line = cmd.trim();
    } else {
      line = cmd.join(" ").trim();
    }
  }

  // 联合类型和交叉类型的对比
  type A = 1 | 2 | 3;
  type B = 2 | 3 | 4;
  type C = A & B; // C为: 2 | 3
  type D = A & number; // D为: 1 | 2 | 3
  type E = A | number; // E为: number
  type F = number & string; // F为: never
  ```

- type 类型别名

  ```ts
  // 类型别名
  type some = boolean | string;

  // var a: some = 12;  //  error TS2322: Type '12' is not assignable to type 'some'.
  var a: some = "12";
  var a: some = !12;

  type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
  };
  ```

  type 和 interface 区别：

  interface 只能用于定义对象类型，而 type 的声明方式除了对象之外还可以定义
  交叉、联合、原始类型等，类型声明的方式适用范围显然更加广泛

  interface 方式可以实现接口的 extends 和 implement

  interface 可以实现接口合并声明

  ```ts
  type Alias = { num: number };
  interface Interface {
    num: number;
  }

  declare function aliased(arg: Alias): Alias;
  declare function interfaced(arg: Interface): Interface;
  ```

- 字面量类型

  Literal Type 主要分为真值字面量类型，数字字面量类型、枚举字面量类型、
  BigInt 字面量类型和字符串字面量类型

  ```ts
  // 字面量类型
  const a: 123 = 123;
  const b: 0b10 = 2;
  const c: 0o114 = 0b1001100;
  const d: 0x514 = 0x514;
  const e: 0x1919n = 6425n;
  const f: "qiphon" = "qiphon";
  const g: false = false;

  // const h: 'github' = 'gitee'  // error TS2322: Type '"gitee"' is not assignable to type '"github"'.

  // 当字面量类型与联合类型结合的时候，用处就显现出来了，它可以模拟一个类似枚举的效果
  type Dir = "North" | "West" | "South" | "East";

  function move(distance: number, dir: Dir) {}

  // 类型字面量

  type Action =
    | {
        id: number;
        action: "delete";
        info: Info;
      }
    | {
        action: "create";
        info: Info;
      };

  type Info = {
    name: string;
  };

  const action: Action = {
    action: "create",
    info: {
      name: "qiphon",
    },
  };
  ```

- 类型断言

  ```ts
  // 类型断言
  interface Per {
    name: string;
    age: number;
  }

  let person = {};
  // person.age = 123 //  error TS2339: Property 'age' does not exist on type '{}'.
  (person as Per).age = 34;

  // 双重断言
  // let c = 'qiphon' as Per;  // TS2352: Conversion of type 'string' to type 'Per' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  let c = ("qiphon" as any) as Per; // 这样就不报错

  // 类型守卫
  class Ani {
    name: "dog";
    color: "white";
  }

  class Per {
    name: "john";
    age: 12;
  }

  function w(arg: Per | Ani) {
    if (arg instanceof Per) {
      console.log(arg.name);
      // console.log(arg.color) // error TS2339: Property 'color' does not exist on type 'Per'.
    }
  }

  function w2(arg: Per | Ani) {
    if ("color" in arg) {
      console.log(arg.name);
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
    ) {}
  }

  interface Dog {
    name: string;
    weight: number;
  }

  let x: Dog;

  x = new Per(12, "ass", "1999");
  ```

- 函数兼容性

  ```ts
  let q = (a: string) => 0;
  let p = (b: string, s: number) => 0;

  // p = q
  // q = p;  // error TS2322: Type '(b: string, s: number) => number' is not assignable to type '(a: string) => number'.

  let foo = (x: number, y: number) => {};
  let bar = (x?: number, y?: number) => {};

  let bas = (...args: number[]) => {};

  // foo = bar = bas
  // bas = bar = foo

  let foo2 = (x: number, y: number) => {};
  let bar2 = (x?: number) => {};

  foo2 = bar2;
  // bar2 = foo2 //  error TS2322: Type '(x: number, y: number) => void' is not assignable to type '(x?: number) => void'.
  ```

- class 兼容性

  仅仅只有实例成员和方法会相比较，构造函数和静态成员不会被检查

  ```ts
  class Ani {
    feet: number;
    constructor(name: string, numFeet: number) {
      this.feet = numFeet;
    }
  }

  class Size {
    feet: number;
    constructor(meters: number) {
      this.feet = meters;
    }
  }

  let a: Ani = new Ani("a", 2);
  let b: Size = new Size(13);

  // a = b
  // b = a
  ```

- 泛型的兼容性

  泛型本身就是不确定类型，它的表现根据是否被成员使用而不同

  ```ts
  interface Per<T> {}
  let x: Per<string>;
  let y: Per<number>;

  // x = y
  y = x;

  interface Per<T> {
    name: T;
  }
  let x: Per<string>;
  let y: Per<number>;

  x = y; //  error TS2322: Type 'Per<number>' is not assignable to type 'Per<string>'.
  // Type 'number' is not assignable to type 'string'.
  // y = x  //  error TS2322: Type 'Per<string>' is not assignable to type 'Per<number>'.
  // Type 'string' is not assignable to type 'number'.
  ```

- 可调用类型注解

  ```ts
  interface ToString {
    (): string;
    new (): string;
  }

  declare const someToString: ToString;
  someToString();
  new someToString();
  ```

- 高级类型：索引类型、映射类型、条件类型

  索引类型：

  ```ts
  // 索引类型
  function pick<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map((k) => o[k]);
  }
  // const res = pick(user, ['token', 'id'])
  ```

  映射类型：如果有一个需求，让接口 User 中的所有成员都是可选的，应该怎么实现？

  ```ts
  interface User {
    name: string;
    id: number;
    token: string;
    avatar: string;
    role: string;
  }
  // type Keyof = keyof User
  type partial<T> = { [K in keyof T]?: T[K] };
  type partialUser = partial<User>;
  type readonlyUser = Readonly<User>;

  declare function f<T extends boolean>(x: T): T extends true ? string : number;

  const x3 = f(Math.random() < 0.5);
  const y3 = f(false); // return number
  const z = f(true); // return string
  ```

  条件类型

  条件类型表示非统一的类型，以一个条件表达式进行类型关系检测，从而在 2 种类型中选择一个

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

在 TypeScript 中，一个变量不会被限制为单一的类型。如果你希望一个变量的值，可以有多种类型，那么就可以使用 TypeScript 提供的联合类型。下面我们来举一个联合类型的例子：

```ts
let stringOrBoolean: string | boolean = "Semlinker";

interface Cat {
  numberOfLives: number;
}

interface Dog {
  isAGoodBoy: boolean;
}

let animal: Cat | Dog;
```
当我们使用联合类型时，我们必须尽量把当前值的类型收窄为当前值的实际类型，而类型保护就是实现类型收窄的一种手段。

类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内。换句话说，类型保护可以保证一个字符串是一个字符串，尽管它的值也可以是一个数值。类型保护与特性检测并不是完全不同，其主要思想是尝试检测属性、方法或原型，以确定如何处理值。目前主要有四种的方式来实现类型保护：

- in 关键字

  ```ts
  interface Admin {
    name: string;
    privileges: string[];
  }

  interface Employee {
    name: string;
    startDate: Date;
  }

  type UnknownEmployee = Employee | Admin;

  function printEmployeeInformation(emp: UnknownEmployee) {
    console.log("Name: " + emp.name);
    if ("privileges"in emp) {
      console.log("Privileges: " + emp.privileges);
    }
    if ("startDate"in emp) {
      console.log("Start Date: " + emp.startDate);
    }
  }
  ```

- typeof

  ```ts
  // typeof
  // typeof 类型保护
  /** 
   * typeof 类型保护只支持两种形式：typeof v === "typename" 和 typeof v !== typename，"typename" 必须是 "number"， "string"， "boolean" 或 "symbol"。但是 TypeScript 并不会阻止你与其它字符串比较，语言不会把那些表达式识别为类型保护。
  */
  function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        returnArray(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    thrownewError(`Expected string or number, got '${padding}'.`);
  }

  function sum(a: number, b: number): string {
    return (a + b).toFixed(2);
  }

  type SUM = typeof sum;
  // type SUM = (a: number, b: number) => string

  let p = {
    name: "qiphon",
    age: 25,
  };

  type c = typeof p;

  // type c = {
  //     name: string;
  //     age: number;
  // }

  var x = 123 as const;
  type X = typeof x; // type X = 123

  var b = { a: 12 } as const;
  type B = typeof b;

  // type B = {
  //     readonly a: 12;
  // }

  var y = [1, 2] as const;
  type Y = typeof y;
  // type Y = readonly [1, 2]
  type N = typeof y[number];
  // type N = 1 | 2

  const locales = [
    {
      locale: "zh-CN",
      language: "中文",
    },
    {
      locale: "en",
      language: "English",
    },
  ] as const;

  type Locale = typeof locales[number]["locale"];
  // type Locale = "zh-CN" | "en"
  ```

- instanceof

  ```ts
  interface Padder {
    getPaddingString(): string;
  }

  class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) {}
    getPaddingString() {
      returnArray(this.numSpaces + 1).join(" ");
    }
  }

  class StringPadder implements Padder {
    constructor(private value: string) {}
    getPaddingString() {
      returnthis.value;
    }
  }

  let padder: Padder = new SpaceRepeatingPadder(6);

  if (padder instanceof SpaceRepeatingPadder) {
    // padder的类型收窄为 'SpaceRepeatingPadder'
  }


  // 类型守卫
  interface Vehicle {
    move: (distance: number) =>void;
  }

  class Car implements Vehicle {
    move = (distance: number) => {
      // Move car…
    };
    turnSteeringWheel = (direction: string) => {
      // Turn wheel…
    };
  }
  class VehicleController {
    vehicle: Vehicle;
    constructor(vehicle: Vehicle) {
      this.vehicle = vehicle;
    }
  }

  const car = new Car();
  const vehicleController = new VehicleController(car);

  const { vehicle } = vehicleController;
  // 类型“Vehicle”上不存在属性“turnSteeringWheel”。
  // vehicle.turnSteeringWheel('left');

  if(vehicle instanceof Car){
    vehicle.turnSteeringWheel('left')
  }
  ```

- is 自定义类型保护的类型谓词（type predicate）

  ```ts
  // 如果这个函数没有 写 test is string 下面的 example 函数中
  // 的 foo.length 就不能使用
  function isString(test: any): test is string {
      return typeof test === 'string'
  }

  //  error TS2339: Property 'length' does not exist on type 'string | number'.
  //   Property 'length' does not exist on type 'number'.
  // function isString(test: any) {
  //  return typeof test === "string";
  //}

  function example(foo: number | string) {
    if (isString(foo)) {
      console.log("it is string " + foo);
      console.log(foo.length);
    } else {
      console.log(foo);
    }
  }

  example("hello");

  // 定义了一个通用的类型保护函数，你可以在需要的时候使用它来缩窄类型。
  function isOfType<T>(
    varToBeChecked: any,
    propertyToCheckFor: keyof T
  ): varToBeChecked is T {
    return (varToBeChecked as T)[propertyToCheckFor] !== undefined;
  }
  ```

  类型谓词

  ```ts
  
  https://mp.weixin.qq.com/s?__biz=MzI2MjcxNTQ0Nw==&mid=2247484142&idx=1&sn=946ba90d10e2625513f09e60a462b3a7&chksm=ea47a3b6dd302aa05af716d0bd70d8d7c682c9f4527a9a0c03cd107635711c394ab155127f9e&scene=21#wechat_redirect
  https://mp.weixin.qq.com/s?__biz=MzI2MjcxNTQ0Nw==&mid=2247484114&idx=1&sn=af33c36580d21c2ffe4e8204f71c10b8&chksm=ea47a38add302a9c01c9bea63f5974554e2a9ab856f1cb3b66620a02452d12d1967fb676dc9f&scene=21#wechat_redirect
  ```

- keyof

  ```ts
  interface Person {
      name: string;
      age: number;
  }

  type K1 = keyof Person; // "name" | "age"
  type K2 = keyof Person[]; // "length" | "toString" | "pop" | "push" | "concat" | "join" .... (所有数组的方法)
  type K3 = keyof { [x: string]: Person };  // string | number

  let person = {
      name: 'qiphon',
      age: 30
  }
  // 首先通过typeof操作符获取Colors变量的类型，然后通过keyof操作符获取该类型的所有键，
  type K4 = keyof typeof person  // type K4 = "name" | "age"

  ```

- infer

  infer 是工具类型和底层库中非常常用的关键字，表示在 extends 条件语句中待推断的类型变量，
  相对而言也比较难理解，我们不妨从一个 typescript 面试题开始：

  ```ts
  type ElementOf<T> = T extends Array<infer E> ? E : never;

  type TTuple = [string, number, null];
  type ToUnion = ElementOf<TTuple>; // string | number

  interface User {
    id: number;
    name: string;
    form?: string;
  }

  type F4 = () => "qiphon";
  type Foo = () => User;
  type ReturnType4<T> = T extends () => infer P ? P : any;

  type R = ReturnType4<Foo>; // User
  type R2 = ReturnType<F4>; // 'qiphon'
  type R22 = ReturnType4<F4>; // 'qiphon'

  class Test {
    constructor(public name: string, public age: number) {}
  }

  type GetConstructorParam<
    T extends new (...args: any[]) => any
  > = T extends new (...args: infer P) => any ? P : never;

  type C = GetConstructorParam<typeof Test>; //  [name: string, age: number]

  type D = ElementOf<C>; //  string | number
  ```

- 上面实现的 ReturnType、Partial、ConstructorParameters、Pick 都是官方的内置工具类型

  其它的一些关键字`-` ,它用来映射类型中给属性添加修饰， 比如 `-？` 表示必选， `-readonly`
  表示非只读

  ```ts
  // ts 内置只读工具
  type Required<T> = { [P in keyof T]-?: T[P] };
  ```

  Omit 这个工具类型在开发过程中非常常见，以至于官方在 3.5 版本正式加入了 Omit 类型，

  ```ts
  // Exclude 关键字实现
  type Exclude2<T, U> = T extends U ? never : T;
  type P = Exclude2<1 | 2, 2 | 3>;

  // Omit = Exclude + Pick
  // Omit
  type Omit2<T, K> = Pick<T, Exclude<keyof T, K>>;
  type Foo = Omit2<{ name: string; age: number }, "name">;
  type Foo2 = Omit<{ name: string; age: number }, "name">;

  // {
  //     age: number;
  // }
  ```

  `Merge<O1, O2>` 的作用是将 2 个对象的属性合并

  `Intersection<T, U>` 作用是取 T 的属性，此属性同样也存在于 U

  `Overwrite<T, U>` 顾名思义，是用 U 的属性覆盖 T 的相同属性

  Mutable 将 T 的所有属性的 readonly 移除

  Record 允许从 Union 类型中创建新类型， Union 类型中的值用作新类型的属性

  ```ts
  // Merge
  // type Merge<T, U> = Computed<A> + Omit<M, N>

  type Computed<T extends any> = T extends Function
    ? T
    : { [K in keyof T]: T[K] };

  type R = Computed<{ x: "x" } & { y: "y" }>;

  type Merge<O1 extends object, O2 extends object> = Computed<
    O1 & Omit<O2, keyof O1>
  >;

  type O1 = {
    age: number;
    type: string;
  };

  type O2 = {
    key: number;
    age: string;
  };

  type C = Merge<O1, O2>;
  // {
  //     age: number;
  //     type: string;
  //     key: number;
  // }

  // Intersection

  type Intersection<T extends object, U extends object> = Pick<
    T,
    Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
  >;

  type Props = { name: string; age: number; visible: boolean };
  type DefaultProps = { age: number };

  // expect {age:number}
  type DuplicatedProps = Intersection<Props, DefaultProps>;

  // Overwrite<T, U> 顾名思义，是用 U 的属性覆盖 T 的相同属性
  type Computed<T extends any> = T extends Function
    ? T
    : { [K in keyof T]: T[K] };
  type Merge<O1 extends object, O2 extends object> = Computed<
    O1 & Omit<O2, keyof O1>
  >;
  type Overwrite<
    T extends object,
    U extends object,
    I extends object = Intersection<U, T>
  > = Merge<I, T>;

  type NewProps = { age: string; other: string };

  // expect { name: string; age: string; visible: boolean; }
  type ReplaceProps = Overwrite<Props, NewProps>;

  // Mutable 将 T 的所有属性的 readonly 移除
  type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  // Record 允许从 Union 类型中创建新类型， Union类型中的值用作新类型的属性
  type Car = "Audi" | "BMW" | "Benz";
  type CarList = Record<Car, { age: number }>;

  const cars: CarList = {
    Audi: { age: 1 },
    BMW: { age: 12 },
    Benz: { age: 13 },
  };
  ```
### 其他类型

- extends

    接口和类型别名都能够被扩展，但语法有所不同。此外，接口和类型别名不是互斥的。接口可以扩展类
型别名，而反过来是不行的。

    ```ts
    // Interface extends interface
    interface PartialPointX { x: number; }
    interface Point extends PartialPointX {
    y: number; 
    }
    let y: Point = {
      y: 1,
      x: 2,
    }

    // ype alias extends type alias
    type PartialPointX = { x: number; };
    type Point = PartialPointX & { y: number; };

    // Interface extends type alias
    type PartialPointX = { x: number; };
    interface Point extends PartialPointX { y: number; }

    // Type alias extends interface
    interface PartialPointX { x: number; }
    type Point = PartialPointX & { y: number; };
    ```
  
  -  Implements

      类可以以相同的方式实现接口或类型别名，但类不能实现使用类型别名定义的联合类型

      ```ts
      type Point2 = {
        x: number;
        y: number;
      };
      class SomePoint2 implements Point2 {
        x = 1;
        y = 2;
      }


      type PartialPoint = { x: number } | { y: number };
      // A class can only implement an object type or
      // intersection of object types with statically known members.
      // 类只能实现具有静态已知成员的对象类型或对象类型的交集。
      class SomePartialPoint implements PartialPoint {
        // Error
        x = 1;
        y = 2;
      }
      ```
- Declaration merging

  与类型别名不同，接口可以定义多次，会被自动合并为单个接口。

  ```ts
   
  interface Point { x: number; }
  interface Point { y: number; }
  const point: Point = { x: 1, y: 2 };
  ```

- class

  在面向对象语言中，类是一种面向对象计算机编程语言的构造，是创建对象的蓝图，描述了所创建的对
象共同的属性和方法。
  在 TypeScript 中，我们可以通过 Class 关键字来定义一个类:

  ```ts
  class Greeter {
    // 静态属性
    static cname: string = 'Greeter'; // 成员属性
    greeting: string;

    // 构造函数 - 执行初始化操作
    constructor(message: string) {
      this.greeting = message;
    }
    // 静态方法
    static getClassName() {
      return 'Class name is Greeter';
    }
    // 成员方法
    greet() {
      return 'Hello, ' + this.greeting;
    }
  }
  let greeter = new Greeter('world');


  // 编译成es5 之后
  var Greeter = /** @class */ (function () {
      // 构造函数 - 执行初始化操作
      function Greeter(message) {
          this.greeting = message;
      }
      // 静态方法
      Greeter.getClassName = function () {
          return 'Class name is Greeter';
      };
      // 成员方法
      Greeter.prototype.greet = function () {
          return 'Hello, ' + this.greeting;
      };
      // 静态属性
      Greeter.cname = 'Greeter'; // 成员属性
      return Greeter;
  }());
  var greeter = new Greeter('world');


  // 在 TypeScript 3.8 版本就开始支持ECMAScript 私有字段，使用方式如下:
  class Person {
    #name: string;

    constructor(name: string) {
      this.#name = name;
    }
    greet() {
      console.log(`Hello, my name is ${this.#name}!`);
    }
  }
  let semlinker = new Person('Semlinker');
  // semlinker.#name;
  //           ~~~~~
  // Property '#name' is not accessible outside class 'Person'
  // because it has a private identifier.
  ```
  > 与常规属性(甚至使用 private 修饰符声明的属性)不同，私有字段要牢记以下规则:

  - 私有字段以 # 字符开头，有时我们称之为私有名称;
  - 每个私有字段名称都唯一地限定于其包含的类;
  - 不能在私有字段上使用 TypeScript 可访问性修饰符(如 public 或 private); 
  - 私有字段不能在包含的类之外访问，甚至不能被检测到。

- 装饰器

  装饰器在编译的时候要 `tsc --target ES5 --experimentalDecorators base.ts` 这样

  ```ts
  function Greeter(greeting: string) {
    return function (target: Function) {
      target.prototype.greet = function (): void {
        console.log(greeting);
      };
    };
  }
  @Greeter('Hello TS!')
  class Greeting {
    constructor() {
      // 内部实现
    }
  }
  let myGreeting = new Greeting();
  (myGreeting as any).greet(); // console output: 'Hello TS!';


  // 编译后的代码
  var __decorate =
    (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  function Greeter(greeting) {
    return function(target) {
      target.prototype.greet = function() {
        console.log(greeting);
      };
    };
  }
  var Greeting = /** @class */ (function() {
    function Greeting() {
      // 内部实现
    }
    Greeting = __decorate([Greeter('Hello TS!')], Greeting);
    return Greeting;
  })();
  var myGreeting = new Greeting();
  myGreeting.greet(); // console output: 'Hello TS!';
  ```

### 书写方式

```typescript
var a: string = "123";

// array
var b: Array<number> = [12];
var b: number[] = [12];

// tuple 更严格的数组，限制每个元素的类型
var tuple: [number, string] = [12, "adddf"];

type hello = (p: string) => string;

interface Greeter {
  (p: string): string;
}

const hello: hello = (p) => {
  return p;
};

// 巧用类型约束
// 在 .ts 文件里， 泛型可能会被当作 jsx 标签

const toArray = <T>(element: T) => [element]; // error

// 添加extends 解决
const toArray = <T extends {}>(element: T) => [element];
```

## 模块系统

ts 与 ES2015 一样，任何包含顶级 import 或者 export 的文件都被当作一个模块

相反地，如果一个文件不带有顶级 inport 或者 export 声明，那么它的内容被视为全局可见

模块语法

```ts
export const a = 1;
export type Person = {
  name: string;
};

// 如果想一次性导出可以
export { a, person };
import { a, person } from "./export";

// 当然，我们也可以重命名导入的模块
import { Person as P } from "./export";

// 把所有导出挂在一个新的变量上
import * as React from "react";

// 默认的导入导出
export default a = 1;
export default () => "function";
```

## 命名空间

命名空间一个最明确的目的就是解决命名问题。 ts 中的命名空间使用 namespace 定义

```ts
namespace Q {
  export interface Iface {}
  export class c {}
}
```

## ts 编译原理

- scanner 扫描器
- Parser 解析器
- Binder 绑定器
- Emitter 触发器
- Checker 检查器

### 编译器的处理 （解析- 转换- 生成）

扫描器通过扫描源代码生成 token 流：

解析器将 token 流解析成 AST

绑定器将 AST 中声明的节点与相同实体的其它声明相连形成符号（Symbols），符号是语义系统的主要构造块

检查器通过符号和 AST 来验证源代码语义

最后通过发射器生成 js 代码

### jsx 中的使用

```jsx
import * as React from 'react'
interface Greeting {
    name: string
    firstName?:string
    lastName?: string
}

const Hello = (props: Greeting) => <h1>Hello {props.name}</h1>

// class
interface HelloState {
    count: number
}

// 第一个是props，第二个是 state
class HelloClass extends React.Component<Greeting, HelloState>{
    state: HelloState = {
        count: 0
    }
    static defaultProps = {
        firstName: '',
        lastName: ''
    }
    render() {
        return <div>{ this.state.count }</div>
    }
}

// 高阶组件
function HelloHOC<P>(WrappedComponent: React.ComponentType<P>) {
    return class extends React.Component<P & Loading>{
        render() {
            const { loading, ...props } = this.props
            return loading ?
                <div>loading</div> :
                <WrappedComponent { ...props as P } />
        }
    }
}
```

### vue 中使用

```vue
<template>
  <div class="aa"></div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@component
export default class Employee extends Vue {
  @Prop({ type: String, default: "" })
  name!: string;

  @Prop({ type: Number, default: "" })
  selected!: number;

  @Prop({
    type: Array,
    default: () => [],
  })
  department!: { department: string; id: number }[];

  // 不加props 就是data
  tempName: string = this.name;
  tempSelected: number = this.selected;

  query() {
    this.$emit("query", {
      name: this.tempName,
      departId: this.tempSelected,
    });
  }
}
</script>
```

## 特别补充

### TS 中 Object, object, {} 类型之间的区别

一、使用 object 类型进行类型声明

随着 TypeScript 2.2 的发布，标准库的类型声明已经更新，以使用新的对象类型。例如，Object.create() 和Object.setPrototypeOf() 方法，现在需要为它们的原型参数指定 object | null 类型：

```ts
// node_modules/typescript/lib/lib.es5.d.ts
interface ObjectConstructor {
  create(o: object | null): any;
  setPrototypeOf(o: any, proto: object | null): any;
  // ...
}

// 将原始类型作为原型传递给 Object.setPrototypeOf() 或 Object.create() 将导致在运行时抛出类型错误。TypeScript 现在能够捕获这些错误，并在编译时提示相应的错误：
const proto = {};

Object.create(proto);     // OK
Object.create(null);      // OK
Object.create(undefined); // Error
Object.create(1337);      // Error
Object.create(true);      // Error
Object.create("oops");    // Error

// object 类型的另一个用例是作为 ES2015 的一部分引入的 WeakMap 数据结构。它的键必须是对象，不能是原始值。这个要求现在反映在类型定义中：
interface WeakMap<K extends object, V> {
  delete(key: K): boolean;
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): this;
}

```

### Object vs object vs {}

也许令人困惑的是，TypeScript 定义了几个类型，它们有相似的名字，但是代表不同的概念：

* object

object 类型，它用于表示非原始类型（undefined, null, boolean, number, bigint, string, symbol）。使用这种类型，我们不能访问值的任何属性。

* Object

    TypeScript 定义了另一个与新的 object 类型几乎同名的类型，那就是 Object 类型。该类型是所有 Object 类的实例的类型。它由以下两个接口来定义：

    - Object 接口定义了 Object.prototype 原型对象上的属性；
    - ObjectConstructor 接口定义了 Object 类的属性。

    ```ts
    // Object 接口定义
    // node_modules/typescript/lib/lib.es5.d.ts

    interface Object {
      constructor: Function;
      toString(): string;
      toLocaleString(): string;
      valueOf(): Object;
      hasOwnProperty(v: PropertyKey): boolean;
      isPrototypeOf(v: Object): boolean;
      propertyIsEnumerable(v: PropertyKey): boolean;
    }

    // ObjectConstructor 接口定义
    // node_modules/typescript/lib/lib.es5.d.ts

    interface ObjectConstructor {
      /** Invocation via `new` */
      new(value?: any): Object;
      /** Invocation via function calls */
      (value?: any): any;

      readonly prototype: Object;

      getPrototypeOf(o: any): any;

      // ···
    }

    declare var Object: ObjectConstructor;

    //  传入一个 Object 对象的实例，它总是会满足该函数的返回类型 —— 即要求返回值包含一个 toString() 方法。
    // Object: Provides functionality common to all JavaScript objects.
    function f(x: Object): { toString(): string } {
      return x; // OK
    }
    // 而 object 类型，它用于表示非原始类型（undefined, null, boolean, number, bigint, string, symbol）。使用这种类型，我们不能访问值的任何属性。
    ```

* {}

还有另一种类型与之非常相似，即空类型：{}。它描述了一个没有成员的对象。当你试图访问这样一个对象的任意属性时，TypeScript 会产生一个编译时错误：

```ts
// Type {}
const obj = {};

// Error: Property 'prop' does not exist on type '{}'.
obj.prop = "semlinker";


// 但是，你仍然可以使用在 Object 类型上定义的所有属性和方法，这些属性和方法可通过 JavaScript 的原型链隐式地使用：
// Type {}
const obj = {};

// "[object Object]"
obj.toString();



// 在 JavaScript 中创建一个表示二维坐标点的对象很简单：

const pt = {}; 
pt.x = 3; 
pt.y = 4;
// 然而以上代码在 TypeScript 中，每个赋值语句都会产生错误：

const pt = {}; // (A)
// Property 'x' does not exist on type '{}'
pt.x = 3; // Error
// Property 'y' does not exist on type '{}'
pt.y = 4; // Error

// 这是因为 pt 类型是根据它的值 {} 推断出来的，你只可以对已知的属性赋值。这个问题怎么解决呢？有些读者可能会先想到接口，比如这样子：

interface Point {
  x: number;
  y: number;
}

// Type '{}' is missing the following 
// properties from type 'Point': x, y(2739)
const pt: Point = {}; // Error
pt.x = 3;
pt.y = 4;
// 很可惜对于以上的方案，TypeScript 编译器仍会提示错误。那么这个问题该如何解决呢？其实我们可以直接通过对象字面量进行赋值：

const pt = { 
  x: 3,
  y: 4, 
}; // OK
// 而如果你需要一步一步地创建对象，你可以使用类型断言（as）来消除 TypeScript 的类型检查：

const pt = {} as Point; 
pt.x = 3;
pt.y = 4; // OK
// 但是更好的方法是声明变量的类型并一次性构建对象：

const pt: Point = { 
  x: 3,
  y: 4, 
};



// 另外在使用 Object.assign 方法合并多个对象的时候，你可能也会遇到以下问题：

const pt = { x: 666, y: 888 };
const id = { name: "semlinker" };
const namedPoint = {};
Object.assign(namedPoint, pt, id);

// Property 'name' does not exist on type '{}'.(2339)
namedPoint.name; // Error
// 这时候你可以使用对象展开运算符 ... 来解决上述问题：

const pt = { x: 666, y: 888 };
const id = { name: "semlinker" };
const namedPoint = {...pt, ...id}

//(property) name: string
namedPoint.name // Ok
```

- Object vs object

```ts
// 有趣的是，类型 Object 包括原始值：
function func1(x: Object) { }
func1('semlinker'); // OK

// 为什么？Object.prototype 的属性也可以通过原始值访问：
> 'semlinker'.hasOwnProperty === Object.prototype.hasOwnProperty
// true 感兴趣的读者，可以自行了解一下 “JavaScript 装箱和拆箱” 的相关内容。



// 相反，object 类型不包括原始值：

function func2(x: object) { }

// Argument of type '"semlinker"' 
// is not assignable to parameter of type 'object'.(2345)
func2('semlinker'); // Error


// 需要注意的是，当对 Object 类型的变量进行赋值时，如果值对象属性名与 Object 接口中的属性冲突，则 TypeScript 编译器会提示相应的错误：
// Type '() => number' is not assignable to type 
// '() => string'.
// Type 'number' is not assignable to type 'string'.
const obj1: Object = { 
   toString() { return 123 } // Error
};


// 而对于 object 类型来说，TypeScript 编译器不会提示任何错误：
const obj2: object = { 
  toString() { return 123 } 
};



// 另外在处理 object 类型和字符串索引对象类型的赋值操作时，也要特别注意。比如：
let strictTypeHeaders: { [key: string]: string } = {};
let header: object = {};
header = strictTypeHeaders; // OK
// Type 'object' is not assignable to type '{ [key: string]: string; }'.
strictTypeHeaders = header; // Error
// 在上述例子中，最后一行会出现编译错误，这是因为 { [key: string]: string } 类型相比 object 类型更加精确。而 header = strictTypeHeaders; 这一行却没有提示任何错误，是因为这两种类型都是非基本类型，object 类型比 { [key: string]: string } 类型更加通用。
// object  {[string | number | symbol]: any}
```

### 对象字面量类型 vs 接口类型

```ts
// 我们除了可以通过 Object 和 object 类型来描述对象之外，也可以通过对象的属性来描述对象：

// Object literal type
let obj3: { prop: boolean };

// Interface
interface ObjectType {
  prop: boolean;
}

let obj4: ObjectType;
// 在 TypeScript 中有两种定义对象类型的方法，它们非常相似：

// Object literal type
type ObjType1 = {
  a: boolean,
  b: number;
  c: string,
};

// Interface
interface ObjType2 {
  a: boolean,
  b: number;
  c: string,
}
// 在以上代码中，我们使用分号或逗号作为分隔符。尾随分隔符是允许的，也是可选的。好的，那么现在问题来了，对象字面量类型和接口类型之间有什么区别呢？下面我从以下几个方面来分析一下它们之间的区别：

```

- 对象字面量类型可以内联，而接口不能：

```ts
// Inlined object literal type:
function f1(x: { prop: number }) {}

function f2(x: ObjectInterface) {} // referenced interface
interface ObjectInterface {
  prop: number;
}
```

- 含有重复名称的类型别名是非法的：

```ts
// @ts-ignore: Duplicate identifier 'PersonAlias'. (2300)
type PersonAlias = {first: string};

// @ts-ignore: Duplicate identifier 'PersonAlias'. (2300)
type PersonAlias = {last: string};

```
    TypeScript 2.6 支持在 .ts 文件中通过在报错一行上方使用 // @ts-ignore 来忽略错误。

    // @ts-ignore 注释会忽略下一行中产生的所有错误。建议实践中在 @ts-ignore之后添加相关提示，解释忽略了什么错误。

    请注意，这个注释仅会隐藏报错，并且我们建议你少使用这一注释。

- 含有重复名称的接口将会被合并：

```ts
interface PersonInterface {
  first: string;
}

interface PersonInterface {
  last: string;
}

const sem: PersonInterface = {
  first: 'Jiabao',
  last: 'Huang',
};
```

- 对于映射类型（A行），我们需要使用对象字面量类型：

```ts
interface Point {
  x: number;
  y: number;
}

type PointCopy1 = {
  [Key in keyof Point]: Point[Key]; // (A)
};

// Syntax error:
// interface PointCopy2 {
//   [Key in keyof Point]: Point[Key];
// };
```

- 多态 this 类型仅适用于接口：

```ts
interface AddsStrings {
  add(str: string): this;
};

class StringBuilder implements AddsStrings {
  result = '';
  add(str: string) {
    this.result += str;
    return this;
  }
}
```

## ts 中最好不要使用的类型

1. `{}`、`Object`、`Function`