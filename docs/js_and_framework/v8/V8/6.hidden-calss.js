// node --allow-natives-syntax
function Class( val ) {
  this.prop = val;
}

var a = new Class('foo');
var b = new Class('bar');

console.log( %HaveSameMap( a, b ) );

 b.prop2 = 'baz';

console.log( %HaveSameMap( a, b ) );