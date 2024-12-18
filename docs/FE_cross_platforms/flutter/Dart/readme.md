# Dart - flutter 开发语言

演练场 https://dart.dev/#try-dart

- 程序的唯一入口点是 main 函数。
- 在程序开始执行 main 函数之前，不期望执行任何外层代码。
- 这样可以帮助程序更快地加载，甚至仅惰性加载程序启动时需要的部分。

```dart
main() {
  print("Learn Dart in 15 minutes!");
  [example1, example2, example3, example4, example5, example6, example7,
    example8, example9, example10, example11, example12, example13, example14,
    example15, example16, example17, example18, example19, example20,
    example21, example22, example23, example24, example25, example26,
    example27, example28, example29, example30
    ].forEach((ef) => ef());
}
```

- 可选类型允许作为 API 的标注，并且可以辅助 IDE，
- 这样 IDE 可以更好地提供重构、自动完成和错误检测功能。
- 目前为止我们还没有声明任何类型，并且程序运行地很好。
- 事实上，类型在运行时会被忽略。
- 类型甚至可以是错的，并且程序依然可以执行，
- 好像和类型完全无关一样。
- 有一个运行时参数可以让程序进入检查模式，它会在运行时检查类型错误。
- 这在开发时很有用，但是由于增加了额外的检查会使程序变慢，
- 因此应该避免在部署时使用。

```dart
class Example21 {
  List<String> _names = [];
  Example21() {
    _names = ["a", "b"];
  }
  List<String> get names => _names;
  set names(List<String> list) {
    _names = list;
  }

  int get length => _names.length;
  void add(String name) {
    _names.add(name);
  }
}

void main() {
  Example21 o = new Example21();
  o.add("c");
  print("Example21 names '${o.names}' and length '${o.length}'");
  o.names = ["d", "e"];
  print("Example21 names '${o.names}' and length '${o.length}'");
}

```

- 要导入一个库，使用 `import "libraryPath"` 的形式，或者如果要导入的是
- 核心库使用 `import "dart:libraryName"` 。
- 还有一个称为 "pub" 的包管理工具，它使用 `import "package:packageName"` 的约定形式。
- 看下这个文件顶部的 `import "dart:collection"; `语句。
- 导入语句必需在其它代码声明之前出现。`IterableBase `来自于 `dart:collection` 。

```dart
import "dart:collection";

class Example28 extends IterableBase {
  var names;
  Example28() {
    names = ["a", "b"];
  }
  get iterator => names.iterator;
}

void main() {
  var o = new Example28();
  o.forEach((name) => print("Example28 '${name}'"));
}
```
