# class

类的声明使用这种形式 `class name { [classBody] }`.

classBody 中可以包含实例方法和变量，还可以包含类方法和变量。

dart 中没有 tss 中那种 object 类型，定义 object 类型可以直径定义类

```dart
class TabItem {
  final String title;
  final IconData icon;

  const TabItem({
    required this.title,
    required this.icon,
  });
}
```

class 不能写在函数中

```dart
class Example6Class {
  var example6InstanceVariable = "Example6 instance variable";
  sayIt() {
    print(example6InstanceVariable);
  }
}

void main() {
  example6() {
    new Example6Class().sayIt();
  }

  example6();
}

```

类方法和变量使用 static 关键词声明。

```dart

class Example7Class {
  static var example7ClassVariable = "Example7 class variable";
  static sayItFromClass() {
    print(example7ClassVariable);
  }

  sayItFromInstance() {
    print(example7ClassVariable);
  }
}

void main() {
  Example7Class.sayItFromClass();
  new Example7Class().sayItFromInstance();
}
```

类的继承

```dart

class Example22A {
  var _name = "Some Name!";
  get name => _name;
}

class Example22B extends Example22A {}

void main() {
  var o = new Example22B();
  print("Example22 class inheritance '${o.name}'");
}
```

- 类也可以使用 mixin 的形式 ：
- `class name extends SomeClass with AnotherClassName, minxinB {}`.
- 必需继承某个类才能 mixin 另一个类。
- 当前 mixin 的模板类不能有构造函数。
- Mixin 主要是用来和辅助的类共享方法的，
- 这样单一继承就不会影响代码复用。
- Mixin 声明在类定义的 "with" 关键词后面。

```dart
class Example23A {}

mixin Example23Utils {
  addTwo(n1, n2) {
    return n1 + n2;
  }
}

class Example23B extends Example23A with Example23Utils {
  addThree(n1, n2, n3) {
    return addTwo(n1, n2) + n3;
  }
}

void main() {
  var o = new Example23B(), r1 = o.addThree(1, 2, 3), r2 = o.addTwo(1, 2);
  print("Example23 addThree(1, 2, 3) results in '${r1}'");
  print("Example23 addTwo(1, 2) results in '${r2}'");
}

```

- 类的构造函数名和类名相同，形式为
- `SomeClass() : super() {}, 其中 ": super()" `的部分是可选的，
- 它用来传递参数给父类的构造函数。如果不需要传递参数就可以省略

```dart
class Example24A {
  var _value;
  Example24A({value = "someValue"}) {
    _value = value;
  }
  get value => _value;
}

class Example24B extends Example24A {
  Example24B({value = "someOtherValue"}) : super(value: value);
}

void main() {
  var o1 = new Example24B(), o2 = new Example24B(value: "evenMore");
  print("Example24 calling super during constructor '${o1.value}'");
  print("Example24 calling super during constructor '${o2.value}'");
}
```

- 对于简单的类，有一种设置构造函数参数的快捷方式。
- 只需要使用 this.parameterName 的前缀，
- 它就会把参数设置为同名的实例变量。

```dart
class Example25 {
  var value, anotherValue;
  Example25({this.value, this.anotherValue});
}

void main() {
  var o = new Example25(value: "a", anotherValue: "b");
  print("Example25 shortcut for constructor '${o.value}' and "
      "'${o.anotherValue}'");
}
```

### 工厂函数

```dart
class Weather {
  final String date;
  final String weather;

  // 主构造函数
  Weather({
    required this.date,
    required this.weather,
  });

  // 工厂构造函数，用于从 JSON 映射中创建 Weather 实例
  factory Weather.fromJson(Map<String, String> data) {
    // 确保所有必需的字段都存在
    if (!data.containsKey('date') ||
        !data.containsKey('weather') ||
       ) {
      throw ArgumentError('Missing required fields in the JSON data');
    }

    // 从映射中读取数据
    return Weather(
      date: data['date']!,
      weather: data['weather']!,
    );
  }
}
```
