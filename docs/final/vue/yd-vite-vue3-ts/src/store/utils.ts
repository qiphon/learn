//拿到全部的state
// {
//     "wetchat/isLogin":string
// }
import modules from './modules';

//获取全部modules下单个getters
type GetGetter<M> = M extends { getters: infer G } ? G : unknown;
//获取全部modules下全部getters
type GetGetters<M> = {
  [K in keyof M]: GetGetter<M[K]>;
};
//最后取出来的全部的带keyd的Getters
type ModuleGetters = GetGetters<typeof modules>;

//智能批处理
type AddPrefix<Prefix,K> = `${Prefix & string}/${K & string}`;
type GetSpliceKey<M,K> = AddPrefix<K,keyof M>;
//他到底给谁调用
type GetSpliceKeys<Moudules> = {
    // user具体的值  + user
    [K in keyof Moudules]:GetSpliceKey<Moudules[K],K>
}[keyof Moudules]

// type Test = GetSpliceKeys<ModuleGetters>
type GetFunc<T,A,B> = T[A & keyof T][B & keyof T[A & keyof T]];
type GetSpliceObj<T> = {
    [K in GetSpliceKeys<T>]:K extends  `${infer A}/${infer B}`?GetFunc<T,A,B> : unknown;
}
type ModulesGetters = GetSpliceObj<ModuleGetters>;
type Getters ={
    [K in keyof ModulesGetters] : ReturnType<ModulesGetters[K]>
}
// type ModuleGetters = "";

export {
    Getters
}