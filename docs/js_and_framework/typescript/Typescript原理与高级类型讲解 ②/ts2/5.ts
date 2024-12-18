//仅仅只有实例成员和方法会相比较，构造函数和静态成员不会被检查:
class Animal2 {
  feet: number;
  constructor(name: string, numFeet: number) {
    this.feet = numFeet
  }
}

class Size {
  feet: number;
  constructor(meters: number) {
    this.feet = meters
  }
}

let a: Animal2 = new Animal2('a', 2);
let s: Size = new Size(1);

a = s; // OK
s = a; // OK
