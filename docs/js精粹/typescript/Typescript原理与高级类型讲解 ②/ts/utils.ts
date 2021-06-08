/**
 * ts utils
 */

const get = <T extends object, K extends keyof T>(obj: T, key: K) => obj[key];

let data = {
  hello: "qiphon",
  1: "age",
};

const c = get(data, 1);

// 接口实现

interface A {
  <T>(age: T): number;
}

type B = <T>(age: T) => number;

let aFn: A = <T>(age: T) => (isNaN(+age) ? 0 : Number(age));

let bFn: B = <T>(age: T) => (isNaN(+age) ? 0 : Number(age));

// 强制转换类型
let cFn: A = <T>(age: T) => <number>(age as unknown);
let dFn: A = <T>(age: T) => age as unknown as number;

interface C {
  s<T>(age: T): number;
}

class CClass implements C {
  s<T>(age: T): number {
    return isNaN(+age) ? 0 : Number(age);
  }
}

let cClassTest: CClass = new CClass();

cClassTest.s("s");

// symbol

// esnext
// let s1 = Symbol('aa').description

// es2015 只有 toString 和 valueOf
let s1: symbol = Symbol("aa");

// dom 处理
// 一般的处理方式
let textEl = document.querySelector("input");
if (textEl) {
  console.log(textEl.value);
}

// 如果是已知类型，可以用一下方法处理
let textEl2 = document.querySelector("input") as HTMLInputElement;
console.log(textEl2.value);

let textEl3 = <HTMLInputElement>document.querySelector("input");
console.log(textEl3.value);
