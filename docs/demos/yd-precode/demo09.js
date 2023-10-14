// "abc".split("");
const slice = Array.prototype.slice;
slice.call(null,"abc")
var slice = Array.prototype.slice,
　　args = slice.apply("abc");
console.log(args)