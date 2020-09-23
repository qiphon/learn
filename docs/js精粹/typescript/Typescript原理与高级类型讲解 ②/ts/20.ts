function getValue<T extends object, U extends keyof T>(obj: T, key: U): T[U] {
  return obj[key] // ok
}
let a2 = {
  a: 1,
  b: 2,
  c: 45
}
console.log(getValue(a2, 'a'))