# flutter 上手

### install

[flutter 安装，请参照官网 ](https://flutter.dev/docs/get-started/install)

[flutter 中文网](https://flutterchina.club/get-started/install/)

## dart

使用 flutter 需要了解 dart 的语法，可以参考 https://qiphon.blog.csdn.net/article/details/94393341

## flutter 组件

在记住 dart 的一些基础用法之后，我们可以开始了解一下 flutter 各个组件的能力

![flutter ui](../../imgs/flutter-style-ui.png)

### 基础组件

#### [Container](https://api.flutter.dev/flutter/widgets/Container-class.html)

一个拥有绘制、定位、调整大小的 widget。

#### [Row](https://api.flutter.dev/flutter/widgets/Row-class.html)

在水平方向上排列子 widget 的列表

#### [Column](https://api.flutter.dev/flutter/widgets/Column-class.html)

在垂直方向上排列子 widget 的列表。

#### [Image](https://api.flutter.dev/flutter/widgets/Image-class.html)

一个显示图片的 widget

#### [Text](https://api.flutter.dev/flutter/widgets/Text-class.html)

单一格式的文本

#### [Icon](https://api.flutter.dev/flutter/widgets/Icon-class.html)

A Material Design icon.

#### [RaisedButton](https://api.flutter.dev/flutter/material/RaisedButton-class.html)

Material Design 中的 button， 一个凸起的材质矩形按钮

#### [Scaffold](https://api.flutter.dev/flutter/material/Scaffold-class.html)

Material Design 布局结构的基本实现。此类提供了用于显示 drawer、snackbar 和底部 sheet 的 API。

#### [Appbar](https://api.flutter.dev/flutter/material/AppBar-class.html)

一个 Material Design 应用程序栏，由工具栏和其他可能的 widget（如 TabBar 和 FlexibleSpaceBar）组成。

#### [FlutterLogo](https://api.flutter.dev/flutter/material/FlutterLogo-class.html)

Flutter logo, 以 widget 形式. 这个 widget 遵从 IconTheme。

#### [Placeholder](https://api.flutter.dev/flutter/widgets/Placeholder-class.html)

一个绘制了一个盒子的的 widget，代表日后有 widget 将会被添加到该盒子中(组件未展示出来时的占位容器)

### 滚动组件

#### [ListView](https://api.flutter.dev/flutter/widgets/ListView-class.html)

一个可滚动的列表

## problems

#### vs code 自动格式化功能失效

```json
// settings.json
 "[dart]": {
    "editor.defaultFormatter": "Dart-Code.flutter",
    "editor.formatOnSave": true
  },
```
