//node --trace-gc 
function strToArray( str ) {
  let i = 0,
    len = str.length,
    arr = new Uint16Array(str.length);
  for ( ; i < len; ++i ) {
    arr[ i ] = str.charCodeAt( i );
  }
  return arr;
}

let i = 0, str = 'V8 is the collest';

while ( i++ < 1e5 ) {
  strToArray( str );
}