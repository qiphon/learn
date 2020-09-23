// function greeter(person: string) {
//   return "Hello, " + person;
// }

interface Greeter {
  (p: string): string
}
//type Greeter = (p: string) => string
let greeter: Greeter = (p) => {
  return "Hello, " + person;
}
let user = "Jane User";
console.log(greeter(user))