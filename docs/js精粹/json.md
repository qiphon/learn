# json

ES5提供一个全局的JSON对象，用来序列化(JSON.stringify)和反序列化(JSON.parse)对象为JSON格式。

对于老的浏览器，可以考虑使用Douglas Crockford的[json2.js](https://github.com/qiphon/JSON-js/blob/master/json2.js), 可以让旧的浏览器实现同样的功能（原始支持功能测试后）

1. JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。提供可选的reviver函数用以在返回之前对所得到的对象执行变换(操作)。

```js
var json = '{"result":true, "count":42}';
obj = JSON.parse(json);
// {result: true, count: 42}

```

#### 语法

```js
JSON.parse(text[, reviver])

text
要被解析成JavaScript值的字符串，关于JSON的语法格式,请参考: JSON。

reviver 可选
转换器, 如果传入该参数(函数)，可以用来修改解析生成的原始值，调用时机在parse函数返回之前。

返回值
Object类型, 对应给定JSON文本的对象/值。

异常
若传入的字符串不符合 JSON 规范，则会抛出 SyntaxError 异常。

```

### 使用 reviver 函数

```js
JSON.parse('{"p": 5}', function (k, v) {
    if(k === '') return v;     // 如果到了最顶层，则直接返回属性值，
    return v * 2;              // 否则将属性值变为原来的 2 倍。
});                            // { p: 10 }

JSON.parse('{"a": 1, "b": 2,"c": {"d": 4, "e": {"f": 6}}}', function (k, v) {
    console.log(k); // 输出当前的属性名，从而得知遍历顺序是从内向外的，
                    // 最后一个属性名会是个空字符串。
    return v;       // 返回原始属性值，相当于没有传递 reviver 参数。
});
// VM15071 a
// VM15071 b
// VM15071 d
// VM15071 f
// VM15071 e
// VM15071 c
// VM15071 
// {a: 1, b: 2, c: {…}}

```

JSON.parse() 不允许用逗号作为结尾

```js
// both will throw a SyntaxError
JSON.parse("[1, 2, 3, 4, ]");
JSON.parse('{"foo" : 1, }');

```


## JSON.stringify

> JSON.stringify() 方法是将一个JavaScript值(对象或者数组)转换为一个 JSON字符串，如果指定了replacer是一个函数，则可以选择性的替换值，或者如果指定了replacer是一个数组，可选择性的仅包含数组指定的属性。

#### 语法

```js

JSON.stringify(value[, replacer [, space]])

参数

value
将要序列化成 一个JSON 字符串的值。

replacer 可选
如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为null或者未提供，则对象所有的属性都会被序列化；关于该参数更详细的解释和示例，请参考使用原生的 JSON 对象一文。

space 可选
指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数为字符串(字符串的前十个字母)，该字符串将被作为空格；如果该参数没有提供（或者为null）将没有空格。
返回值 节
一个表示给定值的JSON字符串。

```

JSON.stringify()将值转换为相应的JSON格式：

- 转换值如果有toJSON()方法，该方法定义什么值将被序列化。
- 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
- 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
- undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。函数、undefined被单独转换时，会返回undefined，如JSON.stringify(function(){}) or JSON.stringify(undefined).
- 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
- 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。
- Date日期调用了toJSON()将其转换为了string字符串（同Date.toISOString()），因此会被当做字符串处理。
- NaN和Infinity格式的数值及null都会被当做null。
- 其他类型的对象，包括Map/Set/weakMap/weakSet，仅会序列化可枚举的属性。

```js

JSON.stringify({});                        // '{}'
JSON.stringify(true);                      // 'true'
JSON.stringify("foo");                     // '"foo"'
JSON.stringify([1, "false", false]);       // '[1,"false",false]'
JSON.stringify({ x: 5 });                  // '{"x":5}'

JSON.stringify({x: 5, y: 6});              
// "{"x":5,"y":6}"

JSON.stringify([new Number(1), new String("false"), new Boolean(false)]); 
// '[1,"false",false]'

JSON.stringify({x: undefined, y: Object, z: Symbol("")}); 
// '{}'

JSON.stringify([undefined, Object, Symbol("")]);          
// '[null,null,null]' 

JSON.stringify({[Symbol("foo")]: "foo"});                 
// '{}'

JSON.stringify({[Symbol.for("foo")]: "foo"}, [Symbol.for("foo")]);
// '{}'

JSON.stringify(
    {[Symbol.for("foo")]: "foo"}, 
    function (k, v) {
        if (typeof k === "symbol"){
            return "a symbol";
        }
    }
);
// undefined 

// 不可枚举的属性默认会被忽略：
JSON.stringify( 
    Object.create(
        null, 
        { 
            x: { value: 'x', enumerable: false }, 
            y: { value: 'y', enumerable: true } 
        }
    )
);

// "{"y":"y"}"

```

replacer参数

replacer参数可以是一个函数或者一个数组。作为函数，它有两个参数，键(key)值(value)都会被序列化。

- 如果返回一个 Number, 转换成相应的字符串被添加入JSON字符串。
- 如果返回一个 String, 该字符串作为属性值被添加入JSON。
- 如果返回一个 Boolean, "true" 或者 "false"被作为属性值被添加入JSON字符串。
- 如果返回任何其他对象，该对象递归地序列化成JSON字符串，对每个属性调用replacer方法。除非该对象是一个函数，这种情况将不会被序列化成JSON字符串。
- 如果返回undefined，该属性值不会在JSON字符串中输出。

> 注意: 不能用replacer方法，从数组中移除值(values)，如若返回undefined或者一个函数，将会被null取代。

```js

function replacer(key, value) {
  if (typeof value === "string") {
    return undefined;
  }
  return value;
}

var foo = {foundation: "Mozilla", model: "box", week: 45, transport: "car", month: 7};
var jsonString = JSON.stringify(foo, replacer);

// "{"week":45,"month":7}"


//如果replacer是一个数组，数组的值代表将被序列化成JSON字符串的属性名。
JSON.stringify(foo, ['week', 'month']);  
// '{"week":45,"month":7}', 只保留“week”和“month”属性值。


```

- space 参数

space 参数用来控制结果字符串里面的间距。如果是一个数字, 则在字符串化时每一级别会比上一级别缩进多这个数字值的空格（最多10个空格）；如果是一个字符串，则每一级别会比上一级别多缩进用该字符串（或该字符串的前十个字符）。

```js
JSON.stringify({ a: 2 }, null, " ");   // '{\n "a": 2\n}'

// 使用制表符（\t）来缩进：
JSON.stringify({ uno: 1, dos : 2 }, null, '\t')

// "{
// 	"uno": 1,
// 	"dos": 2
// }"

```

#### toJSON 方法

如果一个被序列化的对象拥有 toJSON 方法，那么该 toJSON 方法就会覆盖该对象默认的序列化行为：不是那个对象被序列化，而是调用 toJSON 方法后的返回值会被序列化，例如：

```js
var obj = {
  foo: 'foo',
  toJSON: function () {
    return 'bar';
  }
};
JSON.stringify(obj);      // '"bar"'
JSON.stringify({x: obj}); // '{"x":"bar"}'

```

