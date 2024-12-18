function logParameter(target: Object, propertyKey: string, index: number) {
  console.log(target, propertyKey, index);
}

class Person3 {
  greet(@logParameter message: string, @logParameter name: string): void {
    console.log(`${message} ${name}`)
  }
}
const p = new Person3();
p.greet('hello', 'xiaomuzhu');