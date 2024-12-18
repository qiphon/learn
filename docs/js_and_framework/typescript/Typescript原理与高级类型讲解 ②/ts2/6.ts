function isString(test: any): test is string {
  return typeof test === 'string';
}

function example(foo: number | string) {
  if (isString(foo)) {
    console.log('it is a string' + foo);
    console.log(foo.length); // string function
  } else {
    console.log(foo)
  }
}
example('hello world');