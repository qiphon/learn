//我有一个interface Part, 现在需要编写一个工具类型将interface中函数类型的名称取出来, 在这个题目示例中, 应该取出的是:
interface Part {
  id: number;
  name: string;
  subparts: Part[];
  updatePart(newName: string): void;
}
interface Part2 {
  id2: number;
  name2: string;
  subparts3: Part[];
  updatePart111(newName: string): void;
  updatePart222(newName: string): void;
}

//这种问题我们应该换个思路,比如我们把interface看成js中的对象字面量,用js的思维你会如何取出?
//这个时候问题就简单了, 遍历整个对象, 找出value是函数的部分取出key即可.
//在TypeScript的类型编程中也是类似的道理, 我们要遍历interface, 取出类型为Function的部分找出key即可:
type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]
type R3 = FunctionPropertyNames<Part>;
type R89 = FunctionPropertyNames<Part2>;
// 1假设我们把Part代入泛型T, [K in keyof T]相当于遍历整个interface
// 2这时K相当于interface的key, T[K]相当于interface的value
// 3接下来, 用条件类型验证value的类型, 如果是Function那么将value作为新interface的key保留下来, 否则为never
// 4到这里我们得到了遍历修改后的新interface即:
// type R7 = {
//   id: never;
//   name: never;
//   subparts: never;
//   updatePart: "updatePart";
// }[keyof Part]
// type T = keyof Part
//但是我们的的要求是取出老interface Part的key, 这个时候再次用[keyof T]作为key依次取出新interface的value,
//但是由于id name和subparts的value为never就不会返回任何类型了, 所以只返回了'updatePart'.