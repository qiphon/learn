# if while

- Dart 中的循环使用标准的 `for () {} `或 `while () {}` 的形式，
- 以及更加现代的 `for (.. in ..) {}` 的形式, 或者
- 以 forEach 开头并具有许多特性支持的函数回调的形式。

```dart

void main() {
  var example9A = const ["a", "b"];
  example9() {
    for (var i = 0; i < example9A.length; i++) {
      print("Example9 for loop '${example9A[i]}'");
    }
    var i = 0;
    while (i < example9A.length) {
      print("Example9 while loop '${example9A[i]}'");
      i++;
    }
    for (var e in example9A) {
      print("Example9 for-in loop '${e}'");
    }
    example9A.forEach((e) => print("Example9 forEach loop '${e}'"));
  }

  example9();
}
```

遍历字符串中的每个字符或者提取其子串。

```dart

void main() {
  var example10S = "ab";
  example10() {
    for (var i = 0; i < example10S.length; i++) {
      print("Example10 String character loop '${example10S[i]}'");
    }
    for (var i = 0; i < example10S.length; i++) {
      print("Example10 substring loop '${example10S.substring(i, i + 1)}'");
    }
  }

  example10();
}
```

- 对于控制流语句，我们有：
- - 必需带 break 的标准 switch 语句
- - `if-else` 和三元操作符 `..?..:.. `
- - 闭包和匿名函数
- - break, continue 和 return 语句

```dart
import "dart:math" as DM;

void main() {
  var v = true ? 30 : 60;
  switch (v) {
    case 30:
      print("Example29 switch statement");
      break;
  }
  if (v < 30) {
  } else if (v > 30) {
  } else {
    print("Example29 if-else statement");
  }
  callItForMe(fn()) {
    return fn();
  }

  rand() {
    v = new DM.Random().nextInt(50);
    return v;
  }

  while (true) {
    print("Example29 callItForMe(rand) '${callItForMe(rand)}'");
    if (v != 30) {
      break;
    } else {
      continue;
    }
    // 不会到这里。
  }
}
```
