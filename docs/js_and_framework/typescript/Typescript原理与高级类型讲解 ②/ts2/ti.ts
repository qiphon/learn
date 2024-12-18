interface Action<T> {
  payload?: T;
  type: string;
}

class EffectModule {
  count = 1;
  message = "hello!";

  delay(input: Promise<number>) {
    return input.then(i => ({
      payload: `hello ${i}!`,
      type: 'delay'
    }))
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: "set-message"
    };
  }
}
type Connected = {
  delay(input: number): Action<string>
  setMessage(action: Date): Action<number>
}
const effectModule = new EffectModule()

const connected: Connected = connect(effectModule)

//答案

type methodsPick<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]

type asyncMethod<T, U> = (input: Promise<T>) => Promise<Action<U>> // 转换前
type asyncMethodConnect<T, U> = (input: T) => Action<U> // 转换后
type syncMethod<T, U> = (action: Action<T>) => Action<U> // 转换前
type syncMethodConnect<T, U> = (action: T) => Action<U> // 转换后

type EffectModuleMethodsConnect<T> = T extends asyncMethod<infer U, infer V>
  ? asyncMethodConnect<U, V>
  : T extends syncMethod<infer U, infer V>
  ? syncMethodConnect<U, V>
  : never

type EffectModuleMethods = methodsPick<EffectModule>
type Connect = (module: EffectModule) => {
  [M in EffectModuleMethods]: EffectModuleMethodsConnect<EffectModule[M]>
}
declare const connect: Connect