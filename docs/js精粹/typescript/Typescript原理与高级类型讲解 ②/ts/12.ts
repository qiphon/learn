interface FirstInterface {
  doSomething(): number
}

interface SecondInterface {
  doSomethingElse(): string
}
interface ChildInterface extends FirstInterface, SecondInterface {

}
// class Demo<T extends FirstInterface, SecondInterface> {
//   private genericProperty: T
//   constructor(genericProperty: T) {
//     this.genericProperty = genericProperty
//   }
//   useT() {
//     this.genericProperty.doSomething()
//     this.genericProperty.doSomethingElse() // 类型“T”上不存在属性“doSomethingElse”
//   }
// }
// class Demo<T extends ChildInterface> {
//   private genericProperty: T
//   constructor(genericProperty: T) {
//     this.genericProperty = genericProperty
//   }
//   useT() {
//     this.genericProperty.doSomething()
//     this.genericProperty.doSomethingElse()
//   }
// }
