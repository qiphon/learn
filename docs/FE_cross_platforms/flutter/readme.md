# flutter 上手

### install

[flutter 安装，请参照官网 ](https://flutter.dev/docs/get-started/install)

[flutter 中文网](https://flutterchina.club/get-started/install/)

[开发者工具](https://docs.flutter.cn/tools/devtools)

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

## [package](https://dart.cn/tools/pub/dependencies)

Package 和插件 (plugin) 的区别
插件 (plugin) 是 package 的一种，全称是 plugin package，我们简称为 plugin，中文叫插件。

Packages
Dart package 最低要求是包含一个 pubspec.yaml 文件。此外，一个 package 可以包含依赖关系 (在 pubspec.yaml 文件里声明)、 Dart 库、应用、资源、字体、测试、图片和例子等。 [pub.dev](https://pub-web.flutter-io.cn/) 上列出了很多 package，由 Google 工程师和 Flutter 和 Dart 社区的开发者开发和发布，你可以用在自己的应用里。

Plugins
插件 (plugin package) 是一种特别的 package，特别指那些帮助你获得原生平台特性的 package。插件可以为 Android (使用 Kotlin 或 Java 语言)、 iOS (使用 Swift 或 Objective-C 语言)、Web、macOS、Windows、Linux 平台，或其任意组合的平台编写。比如：某个插件可以为 Flutter 应用提供使用原生平台的摄像头的功能。

如果 package 内有特定平台的代码（Android 的 Java/Kotlin, iOS 的 Swift/Objective-C），代码必须内置到你的应用内。热重载和热重启只对 package 的 Dart 代码执行此操作，所以你需要完全重启应用以避免使用 package 时出现 MissingPluginException 错误。

- 安装和移除依赖

```sh
flutter pub add css_colors
flutter pub remove css_colors

```

#### 依赖版本冲突

some_package 和 another_package 声明了不兼容的 url_launcher 版本，它们实际上仍可能以兼容的方式使用 url_launcher。在这种情况下，可在 pubspec.yaml 文件中添加一个依赖覆盖声明来强制使用特定版本，从而处理冲突。

为了强制使用版本为 5.4.0 的 url_launcher，你可以对应用的 pubspec.yaml 文件做如下更改：

```dart

dependencies:
  some_package:
  another_package:
dependency_overrides:
  url_launcher: '5.4.0'

```

#### 限制版本

-**范围限制：**指定一个最小和最大的版本号。

```dart
dependencies:
  url_launcher: '>=5.4.0 <6.0.0'

```

- 使用 caret 语法 的范围约束： 指定最小版本，这包括从该版本到下一个主要版本的所有版本。

```dart
dependencies:
  collection: '^5.4.0'
```

- 依赖未发布的 package

```dart
dependencies:
  // Path 依赖
  packageA:
    path: ../packageA/
  // Git 依赖
  packageB:
    git:
      url: https://github.com/flutter/packageA.git
  // 通过 SSH 依赖 Git package
  packageC:
    git:
      url: git@github.com:flutter/packageA.git

  // **Git 依赖于文件夹中的 package **
  // 默认情况下，pub 会默认假定 package 位于 Git 仓库的根目录。如果不是这种情况，你可以使用 path 参数指定位置，例如：
  packageD:
    git:
      url: https://github.com/flutter/packageA.git
      path: packages/packageD
```
