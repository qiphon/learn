const tuple: [string, number] = ['a', 1];
tuple.push(2); // ok
console.log(tuple); // ["a", 1, 2] -> 正常打印出来
//console.log(tuple[2]); // Tuple type '[string, number]' of length '2' has no element at index '2'