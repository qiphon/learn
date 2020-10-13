// 将 getter 函数转换成 {getterName: getterFuncsReturnType} 的对象类型
/* eslint-disable @typescript-eslint/no-explicit-any */
type ReturnGetters<T extends { [key: string]: (...args: any) => any }> = {
  [P in keyof T]: ReturnType<T[P]>;
};
export { ReturnGetters };
export default ReturnGetters;
