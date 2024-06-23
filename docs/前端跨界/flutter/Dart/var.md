# 简单数据

- 字面量非常方便，但是对于在函数/方法的外层的字面量有一个限制，
- 类的外层或外面的字面量必需是常量。
- 字符串和数字默认是常量。
- 但是 array 和 map 不是。他们需要用 "const" 声明为常量。

```dart

void main() {
    // 不用 const 也好像可以
  var example8A = ["Example8 const array"],
      example8B = const ["Example8b const array"],
      example8M = const {"someKey": "Example8 const map"};
  example8() {
    print(example8A[0]);
    print(example8B[0]);
    print(example8M["someKey"]);
  }

  example8();
}
```

## final

- 使用 final 声明的变量只能被设置一次。
- 在类里面，final 实例变量可以通过常量的构造函数参数设置。

```dart
class Example27 {
  final color1, color2;
  // 更灵活一点的方法是在冒号 : 后面设置 final 实例变量。
  Example27({this.color1, color2}) : color2 = color2;
}

void main() {
  final color = "orange", o = new Example27(color1: "lilac", color2: "white");
  print("Example27 color is '${color}'");
  print("Example27 color is '${o.color1}' and '${o.color2}'");
}

```

## 数字

支持两种数字格式 int 和 double 。

```dart

void main() {
  var i = 1 + 320, d = 3.2 + 0.01, f = 1 + 1.2;
  print("Example11 int ${i}");
  print("Example11 double ${d}");
  print("Example11 double ${f}");
}
```

解析 int，把 double 转成 int，或者使用 ~/ 操作符在除法计算时仅保留整数位。

让我们也来场猜数游戏吧。

```dart
import "dart:math" as DM;

void main() {
  var gn,
      tooHigh = false,
      n,
      n2 = (2.0).toInt(),
      top = int.parse("123") ~/ n2,
      bottom = 0;
  top = top ~/ 6;
  gn = new DM.Random().nextInt(top + 1); // +1 because nextInt top is exclusive
  print("Example30 Guess a number between 0 and ${top}");
  guessNumber(i) {
    if (n == gn) {
      print("Example30 Guessed right! The number is ${gn}");
    } else {
      tooHigh = n > gn;
      print("Example30 Number ${n} is too "
          "${tooHigh ? 'high' : 'low'}. Try again");
    }
    return n == gn;
  }

  n = (top - bottom) ~/ 2;
  while (!guessNumber(n)) {
    if (tooHigh) {
      top = n - 1;
    } else {
      bottom = n + 1;
    }
    n = bottom + ((top - bottom) ~/ 2);
  }
}
// Example30 Guess a number between 0 and 10
// Example30 Number 5 is too low. Try again
// Example30 Number 8 is too high. Try again
// Example30 Number 6 is too low. Try again
// Example30 Guessed right! The number is 7
```

## boolean

布尔表达式不支持隐式转换以及动态类型

```dart
void main() {
  var b; // b是动态类型
  b = "abc";
  try {
    if (b) {
      print("Example14 true, b is $b");
    } else {
      print("Example14 false, b is $b");
    }
  } catch (e) {
    print(e.toString());  // type 'String' is not a 'bool' in boolean expression
    print("Example14 error, b is $b"); // 这段代码可以执行但是会报错
  }
}
```

null 可以转为 boolean ，但是 boolean 不能转为 null

```dart

void main() {
  // 动态类型的null可以转换成bool型
  var b = null; // b是动态类型
  b = "abc";

  try {
    b = null;
    if (b) {
      print("Example14 true, b is $b");
    } else {
      print("Example14 false, b is $b");
    }
  } catch (e) {
    print('catch err');
    print(e.toString());
  }
}
```

## 异常捕获

- try/catch/finally 和 throw 语句用于异常处理。
- throw 语句可以使用任何对象作为参数。

```dart

void main() {
  try {
    try {
      throw "Some unexpected error.";
    } catch (e) {
      print("Example15 an exception: '${e}'");
      throw e; // Re-throw
    }
  } catch (e) {
    print("Example15 catch exception being re-thrown: '${e}'");
  } finally {
    print("Example15 Still run finally");
  }
}
```

## 字符串

- 要想有效地动态创建长字符串，
- 应该使用 StringBuffer。 或者 join 一个字符串的数组。

```dart
void main() {
  var sb = new StringBuffer(), a = ["a", "b", "c", "d"], e;
  for (e in a) {
    sb.write(e);
  }
  print("Example16 dynamic string created with "
      "StringBuffer '${sb.toString()}'");
  print("Example16 join string array '${a.join()}'");
}
```

字符串连接只需让相邻的字符串字面量挨着， 不需要额外的操作符。

```dart
void main() {
  print("Example17 "
      "concatenate "
      "strings "
      "just like that");
}
```

单双引号混合使用. 这种灵活性可以很好地避免内容中需要转义分隔符的情况。

```dart
void main() {
  print('Example18 <a href="etc">'
      "Don't can't I'm Etc"
      '</a>');
}
```

- 用三个单引号或三个双引号表示的字符串
- 可以跨越多行，并且包含行分隔符。

```dart
void main() {
  print('''Example19 <a href="etc">
Example19 Don't can't I'm Etc
Example19 </a>''');
}

// result
// Example19 <a href="etc">
// Example19 Don't can't I'm Etc
// Example19 </a>

```

- 字符串可以使用 $ 字符插入内容。
- 使用 `$ { [expression] }` 的形式，表达式的值会被插入到字符串中。
- `$` 跟着一个变量名会插入变量的值。
- 如果要在字符串中插入 `$` ，可以使用 `\$ `的转义形式代替。

```dart
void main() {
  var s1 = "'\${s}'", s2 = "'\$s'";
  print("Example20 \$ interpolation ${s1} or $s2 works.");
}

// Example20 $ interpolation '${s}' or '$s' works.
```

## 数组
