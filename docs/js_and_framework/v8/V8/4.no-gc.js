//node --trace-gc 
function strToArray( str, bufferView ) {
  let i = 0,
    len = str.length;
  for ( ; i < len; ++i ) {
    bufferView[ i ] = str.charCodeAt( i );
  }
  return bufferView;
}
//改善代码
let i = 0,
  str = 'V8 is the coolest',
  buffer = new ArrayBuffer( str.length * 2 ),
  bufferView = new Uint16Array( buffer );

while ( i++ < 1e5 ) {
  strToArray( str, bufferView );
}