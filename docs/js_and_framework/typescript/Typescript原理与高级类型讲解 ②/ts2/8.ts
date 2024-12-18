interface User3 {
  username: string
  id: number
  token: string
  avatar: string
  role: string
}
type Keyof = keyof User3
type partial<T> = { [K in keyof T]?: T[K] }
type partialUser = partial<User3>
type readonlyUser = Readonly<User3>
//Required Pick Record Exclude Extract NonNullable

declare function f<T extends boolean>(x: T): T extends true ? string : number;

const x3 = f(Math.random() < 0.5)
const y3 = f(false)
const z = f(true)