# 响应式设计

## 通用方法

### widget

选择合适的 widget

### mediaQuery

不建议强制横屏，除非必要

可以使用 MediaQuery.sizeOf or LayoutBuilder 获取屏幕宽高

- Why use `MediaQuery.sizeOf` instead of `MediaQuery.of`?

  - sizeOf 更高效， 它可以返回屏幕的逻辑像素维度 和 像素密度。

- LayoutBuilder 并不返回具体的宽高

### branch

决定什么时候显示什么内容（不同尺度下）

## safeArea & MediaQuery

### SafeArea

通常建议使用 scaffold widget 的 body 使用 SafeArea 包裹住所有的内容（它也是根据 MediaQuery padding 属性来实现的）

> 但是如果 scaffold widget 使用了 appBar 那么通常不实用 SafeArea 也是可以的

### MediaQuery

- media 不仅提供了 window size
- 也提供了 高对比度、文字缩放之类的设置，或者是无障碍相关的特性如 talkBack 或者 voiceover
- 还包含更多的展示信息如是否有铰链 或者 折叠状态等

## 大屏 & 可折叠设备

### GridView

[安卓大屏质量指导](https://developer.android.google.cn/docs/quality-guidelines/large-screen-app-quality) & ios equivalent 说 text 、box 不应该占满屏幕宽度

- 通常推荐用 [GridView](https://api.flutter-io.cn/flutter/widgets/GridView-class.html) 和 ListView 配合使用
- GridView 的 columns 不建议写死

### 其他方式

另一个方式是使用 BoxConstraints 的 maxWidth

- BoxConstraints 包裹 GridView ,并设置最大宽度
- 如果想要一些其他的功能，如设置背景色， 可以使用 Container 替代 BoxConstraints

### 折叠设备

锁定屏幕方向会导致一些问题在可折叠设备上，这就是为什么不推荐强制锁定屏幕方向

解决折叠屏下的问题有如下 2 种方式，

- 支持屏幕旋转
- 使用物理像素尺寸

获取屏幕物理尺寸方法: [displayAPI](https://main-api.flutter.dev/flutter/dart-ui/Display-class.html), 在 flutter 3.13 版本后，这个 api 可以获取到屏幕尺寸、像素密度、屏幕刷新率等

```dart
/// AppState object.
ui.FlutterView? _view;

@override
void didChangeDependencies() {
  super.didChangeDependencies();
  _view = View.maybeOf(context);
}

void didChangeMetrics() {
  final ui.Display? display = _view?.display;
}
```

### Navigation

根据屏幕尺寸的不同，要选取不同的导航方式，是底部 tabbar 还是 顶部导航栏

## 用户输入和无障碍

- 用户输入有很多的方式，但是如果是自定义组件，就需要手动把这些都实现了

### Scroll Wheel

ScrollView or ListView 提供了滚动支持，如果需要手动实现滚动行为，可以用 Listener widget

```dart
return Listener(
  onPointerSignal: (event) {
    if (event is PointerScrollEvent) print(event.scrollDelta.dy);
  },
  child: ListView(),
);
```

### tab / focus 交互

像 button、input 等，内置组件支持 tab 切换，并有高亮显示。自定义组件需要使用 FocusableActionDetector 组件来自定义控制。这个组件包含了 focus、mouse input、 快捷键操作等。

```dart
class _BasicActionDetectorState extends State<BasicActionDetector> {
  bool _hasFocus = false;
  @override
  Widget build(BuildContext context) {
    return FocusableActionDetector(
      onFocusChange: (value) => setState(() => _hasFocus = value),
      actions: <Type, Action<Intent>>{
        ActivateIntent: CallbackAction<Intent>(onInvoke: (intent) {
          print('Enter or Space was pressed!');
          return null;
        }),
      },
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          const FlutterLogo(size: 100),
          // Position focus in the negative margin for a cool effect
          if (_hasFocus)
            Positioned(
              left: -4,
              top: -4,
              bottom: -4,
              right: -4,
              child: _roundedBorder(),
            )
        ],
      ),
    );
  }
}
```

### 控制 tab 顺序

需要使用 FocusTraversalGroup 包裹组件，证明这个组件是 tab 顺序的一部分。

```dart
return Column(children: [
  FocusTraversalGroup(
    child: MyFormWithMultipleColumnsAndRows(),
  ),
  SubmitButton(),
]);
```

flutter 中的 ReadingOrderTraversalPolicy 类通常可以实现定义 tab group，但是这个有些时候会被重新定义。

### Keyboard 快捷键

TextField or a Button 可以用 KeyboardListener or a Focus widget 来监听。

```dart
 @override
  Widget build(BuildContext context) {
    return Focus(
      onKeyEvent: (node, event) {
        if (event is KeyDownEvent) {
          print(event.logicalKey);
        }
        return KeyEventResult.ignored;
      },
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 400),
        child: const TextField(
          decoration: InputDecoration(
            border: OutlineInputBorder(),
          ),
        ),
      ),
    );
  }
}
```

如果要定义一组快捷操作，可以使用 Shortcuts 组件。一旦当前的组件或者是子组件处于 focus 状态，那么就可以使用快捷键。

```dart
// Define a class for each type of shortcut action you want
class CreateNewItemIntent extends Intent {
  const CreateNewItemIntent();
}

Widget build(BuildContext context) {
  return Shortcuts(
    // Bind intents to key combinations
    shortcuts: const <ShortcutActivator, Intent>{
      SingleActivator(LogicalKeyboardKey.keyN, control: true):
          CreateNewItemIntent(),
    },
    child: Actions(
      // Bind intents to an actual method in your code
      actions: <Type, Action<Intent>>{
        CreateNewItemIntent: CallbackAction<CreateNewItemIntent>(
          onInvoke: (intent) => _createNewItem(),
        ),
      },
      // Your sub-tree must be wrapped in a focusNode, so it can take focus.
      child: Focus(
        autofocus: true,
        child: Container(),
      ),
    ),
  );
}
```

1. 如果要定义全局快捷键，需要使用 HardwareKeyboard

```dart

@override
void initState() {
  super.initState();
  HardwareKeyboard.instance.addHandler(_handleKey);
}

@override
void dispose() {
  HardwareKeyboard.instance.removeHandler(_handleKey);
  super.dispose();
}

```

2. 组合键的情况下，需要使用 `HardwareKeyboard.instance.logicalKeysPressed `

```dart
static bool isKeyDown(Set<LogicalKeyboardKey> keys) {
  return keys
      .intersection(HardwareKeyboard.instance.logicalKeysPressed)
      .isNotEmpty;
}

```

3. 这样监听才算是完成

```dart
bool _handleKey(KeyEvent event) {
  bool isShiftDown = isKeyDown({
    LogicalKeyboardKey.shiftLeft,
    LogicalKeyboardKey.shiftRight,
  });
  // 组合键
  if (isShiftDown && event.logicalKey == LogicalKeyboardKey.keyN) {
    _createNewItem();
    return true;
  }

  return false;
}
```

> 需要特别注意的是，当使用 自定义 listener 时，需要在组件失焦、消失、隐藏时，移除 listener。

### 自定义组件的 Mouse enter, exit, and hover

修改 cursor 样式，需要使用 MouseRegion 组件。

```dart
// Show hand cursor
return MouseRegion(
  cursor: SystemMouseCursors.click,
  // Request focus when clicked
  child: GestureDetector(
    onTap: () {
      Focus.of(context).requestFocus();
      _submit();
    },
    child: Logo(showBorder: hasFocus),
  ),
);
```

## 平台功能 & 政策

### 功能

- 平台存在的 api
- 平台的强制内容
- 物理设备支持

### 政策

- App store 规范
- 设计参考
- 系统资源
- Features enabled on the server side (设备功能是否启用)

判断平台方法 `Platform.isAndroid, Platform.isIOS,`
