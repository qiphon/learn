function add(x) {
    return (x = x + 3);
}
var x = 1,
    y = 0,
    z = 0;
// function add(x) {
//     return (x = x + 1);
// }
y = add(x);
console.log(y)
z = add(x);
console.log(z)
