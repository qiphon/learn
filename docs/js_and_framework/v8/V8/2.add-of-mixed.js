//node --trace-opt-verbose
function test( obj ) {
  return obj.prop + obj.prop;
}

let a = { prop: 'a' }, b = { prop: [] }, i = 0;

while ( i++ < 10000) {
  test( i !== 8000 ? a : b );
}