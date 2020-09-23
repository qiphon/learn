let q = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = q; // OK
q = y; // Error 不能将类型“(b: number, s: string) => number”分配给类型“(a: number) => number”。

let foo = (x: number, y: number) => { };
let bar = (x?: number, y?: number) => { };
let bas = (...args: number[]) => { };

// foo = bar = bas;
// bas = bar = foo;
//当我们把 strictNullChecks 设置为 false 时上述代码是兼容的。

let foo2 = (x: number, y: number) => { };
let bar2 = (x?: number) => { };

// foo2 = bar // ok
// bar2 = foo2 //报错