# flutter catch error

- `print(e.toString());`
- vscode debugger 断点
- `flutter run -d ${flutter devices} ` 执行这个命令后，会给我们一个浏览器中可以打开的连接，然后可以在浏览器中查看具体的信息
- 特定条件调试

  ```dart
  debugger(when: count>4)
  ```

## 捕获异常

`try{}catch(e){}`

修改 Main 函数

```dart
void main() {
  // runApp(const MyApp());
  FlutterError.onError = (details, {bool forceReport = false}) {
    log('$details');
  };

  runZonedGuarded(() => runApp(MyApp()), (err, stack) {
    log('$err');
  });
}
```
