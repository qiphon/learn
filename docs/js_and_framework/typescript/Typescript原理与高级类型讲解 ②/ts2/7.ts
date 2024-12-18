//我们已经可以用静态类型注解我们的函数、参数等等，但是假设我们有一个接口，我们如何操作才能让它被注解为可执行的:
interface ToString {
  (): string
  new(): string
}
declare const sometingToString: ToString;
sometingToString() // This expression is not callable. Type 'ToString' has no call signatures.ts(2349)
new sometingToString()