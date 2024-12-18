interface User {
  id: number
  name: string
  form?: string
}
type Foo = () => User
type ReturnType4<T> = T extends (...args: any[]) => infer P ? P : any;
type R5 = ReturnType4<Foo> // User
