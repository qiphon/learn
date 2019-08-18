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