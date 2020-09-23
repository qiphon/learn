// 裸类型参数,没有被任何其他类型包裹即T
type NakedUsage<T> = T extends boolean ? "YES" : "NO"
// 类型参数被包裹的在元组内即[T]
type WrappedUsage<T> = [T] extends [boolean] ? "YES" : "NO";

type Distributed = NakedUsage<number | boolean> //  = NakedUsage<number> | NakedUsage<boolean> =  "NO" | "YES"
type NotDistributed = WrappedUsage<number | boolean> // "NO"



type Diff<T, U> = T extends U ? never : T;

type R = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">; 
type Temp2 =  never| "b"| never| "d"
// "b" | "d"|

type Filter<T, U> = T extends U ? T : never;
type R1 = Filter<string | number | (() => void), Function>;

// 剔除 null和undefined
type NonNullable2<T> = Diff<T, null | undefined>;

type R2 = NonNullable2<string | number | undefined>;  // string | number
