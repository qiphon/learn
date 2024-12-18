function addAge(target: Function) {
  target.prototype.age = 18;
  target.prototype.say = () => { console.log('say') }
}

@addAge
class Person2 {
  name: string;
  age!: number;
  say!: Function
  constructor() {
    this.name = 'xiaomuzhu';
  }
}

let person = new Person2();

console.log(person.age); // 18
person.say()