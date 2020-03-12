# Array [额外的数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

```js

Array.prototype.indexOf
Array.prototype.lastIndexOf
Array.prototype.every
Array.prototype.some
Array.prototype.forEach
Array.prototype.map
Array.prototype.filter
Array.prototype.reduce
Array.prototype.reduceRight


// forEach(js v1.6) 遍历数组中的每一项
[1,2,3,4].forEach(function(item, index, array){
    console.log('数组项', item, '索引')
})
// map(js v1.6) 处理数组中的所有值，并返回处理后的值，不影响原数组，返回的结果为新数组
var users = [
    {name: 'qiphon', email: '123@qq.com'},
    {name: 'qiphon2', email: '1234@qq.com'},
    {name: 'qiphon3', email: '1235@qq.com'},
]
users.map(function(user, index){
    return user.email
})

// filter(js v1.6) 过滤数组中的元素，把返回true的汇集成新的数组
[undefined, null, NaN, false, true, ''].filter(Boolean)  // [true]

```
```js
// Array.isArray 这个直接写在了 Array 的构造器上，而不是 prototype 对象上。
// Arrya.isArray 会按照你所期待的那样去做 —— 这是根据参数的[[Class]] 内部属性是否是
// Array 返回 true 或 false
Array.isArray('str')  // false
Array.isArray(['yes']) // true

// some(js v1.6) 找到数组中第一个符合要求的值后就不再执行了
// 用来判断数组中是否存在符合要求的值， 返回 true or false
[2,344,3].some(function(item){
    return item > 5
}) 
// true

// every(js v1.6) 匹配每一个元素，直到有一个返回false 为止
[2,344,3].every(function(item){
    return item > 5
}) 
// false

// indexOf(value[, fromIndex]) (js v1.6) 方法可返回某个指定的字符串值在字符串中首次出现的位置。
// 如果没有找到，返回 -1
var str="Hello world!"
document.write(str.indexOf("Hello") + "<br />")
document.write(str.indexOf("World") + "<br />")
document.write(str.indexOf("world"))
// 0
// -1
// 6
// str.lastIndexOf(searchValue[, fromIndex])  (js v1.6) 
var str="Hello world!"
console.log(str.lastIndexOf("Hello"))
console.log(str.lastIndexOf("World"))
console.log(str.lastIndexOf("world"))
// 0
// -1
// 6

// reduce (js v1.6) 从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。
// reduceRight (js v1.6)  从右到左为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。
// arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
var maxCallback = ( acc, cur ) => Math.max( acc.x, cur.x );
var maxCallback2 = ( max, cur ) => Math.max( max, cur );

// reduce() 没有初始值
[ { x: 22 }, { x: 42 } ].reduce( maxCallback ); // 42
[ { x: 22 }            ].reduce( maxCallback ); // { x: 22 }
[                      ].reduce( maxCallback ); // TypeError

// map/reduce; 这是更好的方案，即使传入空数组或更大数组也可正常执行
[ { x: 22 }, { x: 42 } ].map( el => el.x )
                        .reduce( maxCallback2, -Infinity );



```

在 ES3 中，唯一可靠的确定一个值是数组的方式就是使用 “the Miller Device”，即比对一个数组其内在的 `[[Class]]` 属性。

```js
Object.prototype.toString.apply(value) === '[object Array]'
```

### TypedArray

> 一个TypedArray 对象描述一个底层的二进制数据缓存区的一个类似数组(array-like)视图。事实上，没有名为 TypedArray的全局对象，也没有一个名为的 TypedArray构造函数。相反，有许多不同的全局对象，下面会列出这些针对特定元素类型的类型化数组的构造函数。

```js

// create a TypedArray with a size in bytes
const typedArray1 = new Int8Array(8);
typedArray1[0] = 32;

const typedArray2 = new Int8Array(typedArray1);
typedArray2[1] = 42;

console.log(typedArray1);
// expected output: Int8Array [32, 0, 0, 0, 0, 0, 0, 0]

console.log(typedArray2);
// expected output: Int8Array [32, 42, 0, 0, 0, 0, 0, 0]

```

#### 语法

```
new TypedArray(); // ES2017中新增
new TypedArray(length); 
new TypedArray(typedArray); 
new TypedArray(object); 
new TypedArray(buffer [, byteOffset [, length]]); 

TypedArray()指的是以下的其中之一： 

Int8Array(); 
Uint8Array(); 
Uint8ClampedArray();
Int16Array(); 
Uint16Array();
Int32Array(); 
Uint32Array(); 
Float32Array(); 
Float64Array();

```

##### 参数节

- length
当传入length参数时，一个内部数组缓冲区会被创建在内存中。该缓存区的大小是传入的length乘以数组中每个元素的字节数（BYTES_PER_ELEMENT），每个元素的值都为0。(译者注：每个元素的字节数是由具体的构造函数决定的，比如Int16Array的每个元素的字节数为2，Int32Array的每个元素的字节数为4)

- typedArray
当传入一个包含任意类型元素的任意类型化数组对象typedArray（比如Int32Array）作为参数时，typedArray被复制到一个新的类型数组。typedArray中的每个值会在复制到新的数组之前根据构造器进行转化。新的生成的类型化数组对象将会有跟传入的数组相同的长度（译者注：比如原来的typedArray.length==2，那么新生成的数组的length也是2，只是数组中的每一项进行了转化）
- object
当传入一个 object作为参数时，如同通过 TypedArray.from() 方法一样创建一个新的类型数组。

- buffer, byteOffset, length
当传入一个buffer参数，或者再另外加上可选参数byteOffset和length时，一个新的类型化数组视图将会被创建并可用于呈现传入的ArrayBuffer实例。byteOffset和length指定类型化数组视图暴露的内存范围，如果两者都未传入，那么整个buffer都会被呈现。如果仅仅忽略length，那么buffer中偏移byteOffset后剩下的buffer将会被呈现。


> ECMAScript 6定义TypeArray构造器作为所有的类型化数组构造器(Int8Array,Int16Array等)的原型.该构造器不会直接暴露:没有全局的%TypedArray%和TypeArray属性.只能通过使用类似Object.getPrototypeOf(Int8Array.prototype)的方式进行访问.所有的类型化数组构造器(Int8Array,Int16Array等)都会继承TypeArray构造器的通用属性和方法.此外,所有的类型化数组原型(Int8Array.prototype,Int16Array.prototype等)的原型都以TypeArray.prototype作为原型.

> TypedArray构造器自身不是特别有用.调用或在一个表达式中使用它都会抛出一个TypeError异常,除非在支持通过继承创建对象的JS引擎下运行.但直到现在还没有这样的JS引擎出现,因此TypeArray仅仅是对所有的类型化类构造器(Int8Array,Int16Array等)的方法和属性进行polyfill的时候比较有用.

> 当创建一个TypedArray实例（例如:Int8Array）时，一个数组缓冲区将被创建在内存中，如果ArrayBuffer对象被当作参数传给构造函数将使用传入的ArrayBuffer代替。缓冲区的地址被存储在实例的内部属性中，所有的%TypedArray%.prototype上的方法例如set value和get value等都会操作在数组缓冲区上。

###### 属性访问

你可以参考使用标准数组索引数组中的元素的方法(其实就是方括号里面写下标).然而,原型链上面定义的索引属性(译者注:即用数字作为属性,例如Int16Array.prototype[0]=12;),在实例化的对象上面是获取不到该属性的(int16Array[0]==undefined).通过查询 ArrayBuffer 是找不到索引属性的.但您仍然可以使用命名属性(译者注:就是键不是数字的),就像所有对象一样。

```js

// 设置和使用标准数组语法
var int16 = new Int16Array(2);
int16[0] = 42;
console.log(int16[0]); // 42

// Indexed properties on prototypes are not consulted (Fx 25)
Int8Array.prototype[20] = "foo";
(new Int8Array(32))[20]; // 0
// even when out of bound
Int8Array.prototype[20] = "foo";
(new Int8Array(8))[20]; // undefined
// or with negative integers
Int8Array.prototype[-1] = "foo";
(new Int8Array(8))[-1]; // undefined

// Named properties are allowed, though (Fx 30)
Int8Array.prototype.foo = "bar";
(new Int8Array(32)).foo; // "bar"

```