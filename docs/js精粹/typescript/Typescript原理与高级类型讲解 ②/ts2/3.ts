class Person {
  name = 'xiaomuzhu';
  age = 20;
}

class Animal {
  name = 'petty';
  color = 'pink';
}

// function getSometing(arg: Person | Animal) {
//   if (arg instanceof Person) {
//     console.log(arg.color); // Error
//     console.log(arg.age); // ok
//   }
//   if (arg instanceof Animal) {
//     console.log(arg.color); // ok
//     console.log(arg.age); // Error
//   }
// }

// function getSometing(arg: Person | Animal) {
//   if ('age' in arg) {
//     console.log(arg.color); // Error
//     console.log(arg.age); // ok
//   }
//   if ('color' in arg) {
//     console.log(arg.age); // Error
//     console.log(arg.color); // ok
//   }
// }