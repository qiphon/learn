// let value: any;

// value = true;             // OK
// value = 1;                // OK
// value = "Hello World";    // OK
// value = Symbol("type");   // OK
// value = {}                // OK
// value = []                // OK
// value.foo.bar;  // OK
// value();        // OK [[call]]
// new value();    // OK  [[structor]]
// value[0][1];    // OK

// let value: unknown;

// value = true;             // OK
// value = 1;                // OK
// value = "Hello World";    // OK
// value = Symbol("type");   // OK
// value = {}                // OK
// value = []                // OK
// value.foo.bar;  // ERROR
// value();        // ERROR
// new value();    // ERROR
// value[0][1];    // ERROR
function fn(p: unknown) {
  //p.sort()
  if (p instanceof Array) {
    p.sort()
  }
}