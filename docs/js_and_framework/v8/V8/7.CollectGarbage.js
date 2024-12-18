//node --allow-natives-syntax --trace-gc
function factorial( n ) {
  return n === 1 ? n : factorial( --n );
}

var i = 0;

while ( i++ < 1e8 ) {
  factorial( 10 );
  i % 1e7 === 0 && %CollectGarbage(null);
}