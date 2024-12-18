class Car {
  protected run() {
    console.log('启动...')
  }
}

class GTR extends Car {
  init() {
    this.run()
  }
}

const car = new Car()
const gtr = new GTR()

// car.run() // [ts] 属性“run”受保护，只能在类“Car”及其子类中访问。
// gtr.init() // 启动...
// gtr.run() // [ts] 属性“run”受保护，只能在类“Car”及其子类中访问。