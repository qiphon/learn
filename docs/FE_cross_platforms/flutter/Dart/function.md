# 函数

- 函数声明和方法声明看起来一样。
- 函数声明可以嵌套。声明使用这种 name() {} 的形式，
- 或者 name() => 单行表达式; 的形式。
- 右箭头的声明形式会隐式地返回表达式的结果。

```dart

example1() {
  example1nested1() {
    example1nested2() => print("Example1 nested 1 nested 2");
    example1nested2();
  }
  example1nested1();
}
```

匿名函数

```dart

example2nested1(fn) {
    fn();
  }
example2nested1(() => print("Example2 nested 1"));
```

函数 参数的参数 可以声明，也可以不声明

```dart

example3nested1(fn(informSomething)) {
    fn("Example3 nested 1");
  }
  example3planB(fn) { // 或者不声明函数参数的参数
    fn("Example3 plan B");
  }
  example3nested1((s) => print(s));
  example3planB((s) => print(s));

```

函数有可以访问到外层变量的闭包。

```dart

var example4Something = "Example4 nested 1";
example4() {
  example4nested1(fn(informSomething)) {
    fn(example4Something);
  }
  example4nested1((s) => print(s));
}


// 下面这个包含 sayIt 方法的类声明，同样有一个可以访问外层变量的闭包，
// 就像前面的函数一样。
var example5method = "Example5 sayIt";
class Example5Class {
  sayIt() {
    print(example5method);
  }
}
example5() {
  // 创建一个 Example5Class 类的匿名实例，
  // 并调用它的 sayIt 方法。
  new Example5Class().sayIt();
}

```

同 js 中的结构一致

- 可以在大括号 `{}` 中声明命名参数。
- 大括号 `{}` 中声明的参数的顺序是随意的。
- 在中括号 `[]` 中声明的参数也是可选的。

```dart
void main() {
  var _name, _surname, _email;
  setConfig1({name, surname}) {
    _name = name;
    _surname = surname;
  }

  setConfig2(name, [surname, email]) {
    _name = name;
    _surname = surname;
    _email = email;
  }

  setConfig1(surname: "Doe", name: "John");
  print("Example26 name '${_name}', surname '${_surname}', "
      "email '${_email}'");
  setConfig2("Mary", "Jane");
  print("Example26 name '${_name}', surname '${_surname}', "
      "email '${_email}'");
}
```
