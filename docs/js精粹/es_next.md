# es6 + 特别要点

## set & map

### weakmap 和 map 区别

WeakMap 和 Map 是 JavaScript 中的两种数据结构，它们都可以存储键值对，但它们之间存在一些重要的区别。

#### 属性

map & weakmap

- delete: ƒ delete()
- get: ƒ ()
- has: ƒ has()
- set: ƒ ()

just map

+ clear:ƒ clear()
+ constructor:ƒ Map()
+ entries:ƒ entries()
+ forEach:ƒ forEach()  仅map有迭代器
+ keys:ƒ keys()
+ size:(...)
+ values:ƒ values()

#### 键的类型：

- Map 可以接受任何类型的键（包括对象）。当使用对象作为键时，JavaScript 会使用对象的引用作为键，而不是对象本身。
- WeakMap 只能接受对象作为键。如果你尝试使用非对象类型作为键，将会抛出错误。这意味着 WeakMap 的键都是唯一的，没有重复的对象。

#### 垃圾回收：(参考 esNext/map.js esNext/weakmap.js)

如果 (map 或 weakmap) 的键（对象）被置为null，那么：

- Map 中，不会被垃圾回收
- WeakMap 中，键会被垃圾回收，但是值不会被回收。这种特性使得 WeakMap 特别适合用于实现一些特殊的内存管理需求。

### weekset 和 set 的区别 (同 map 相似)

WeakSet 和 Set 是 JavaScript 中的两种数据结构，它们都可以存储唯一的值，但它们之间存在一些重要的区别。

#### 键的类型：

- Set 可以接受任何类型的值（包括对象）。
- WeakSet 只能接受对象作为值。如果你尝试使用非对象类型作为值，将会抛出错误。

#### 垃圾回收：(参考 esNext/set.js esNext/weakset.js)

- 在 Set 中，如果一个对象不再被其他变量引用，它仍然可以保留在 Set 中，只要 Set 还持有对它的引用。
- 在 WeakSet 中，如果一个对象不再被其他变量引用，它将被自动从 WeakSet 中删除。

#### 语法：

相同

- add: ƒ add()
- constructor: ƒ WeakSet()
- delete: ƒ delete()
- has: ƒ has()
- Symbol(Symbol.toStringTag): "WeakSet"  `'[object WeakSet]'`

set 自有

- clear:ƒ clear()
- constructor:ƒ Set()
- entries:ƒ entries()
- forEach:ƒ forEach()
- keys:ƒ values()
- size:(...)
- values:ƒ values()
- Symbol(Symbol.iterator):ƒ values()
- Symbol(Symbol.toStringTag):"Set"   `'[object Set]'`
- get size:ƒ size()