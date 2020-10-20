import { ActionContext } from 'vuex';
// 将 getter 函数转换成 {getterName: getterFuncsReturnType} 的对象类型
type ReturnGetters<T extends { [key: string]: (...args: any) => any }> = {
  [P in keyof T]: ReturnType<T[P]>;
};
export { ReturnGetters };
