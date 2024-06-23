# flutter 上手

### install 

[flutter 安装，请参照官网 ](https://flutter.dev/docs/get-started/install)

[flutter 中文网](https://flutterchina.club/get-started/install/)

## dart

使用flutter需要了解dart的语法，可以参考 https://qiphon.blog.csdn.net/article/details/94393341

## flutter 组件

在记住 dart 的一些基础用法之后，我们可以开始了解一下flutter 各个组件的能力

![flutter ui](../imgs/flutter-style-ui.png)

### 基础组件

#### [Container](https://api.flutter.dev/flutter/widgets/Container-class.html) 

一个拥有绘制、定位、调整大小的 widget。

#### [Row](https://api.flutter.dev/flutter/widgets/Row-class.html) 

在水平方向上排列子widget的列表

#### [Column](https://api.flutter.dev/flutter/widgets/Column-class.html) 

在垂直方向上排列子widget的列表。

#### [Image](https://api.flutter.dev/flutter/widgets/Image-class.html) 

一个显示图片的widget

#### [Text](https://api.flutter.dev/flutter/widgets/Text-class.html) 

单一格式的文本

#### [Icon](https://api.flutter.dev/flutter/widgets/Icon-class.html) 

A Material Design icon.

#### [RaisedButton](https://api.flutter.dev/flutter/material/RaisedButton-class.html) 

Material Design中的button， 一个凸起的材质矩形按钮

#### [Scaffold](https://api.flutter.dev/flutter/material/Scaffold-class.html) 

Material Design布局结构的基本实现。此类提供了用于显示drawer、snackbar和底部sheet的API。

#### [Appbar](https://api.flutter.dev/flutter/material/AppBar-class.html) 

一个Material Design应用程序栏，由工具栏和其他可能的widget（如TabBar和FlexibleSpaceBar）组成。

#### [FlutterLogo](https://api.flutter.dev/flutter/material/FlutterLogo-class.html) 

Flutter logo, 以widget形式. 这个widget遵从IconTheme。

#### [Placeholder](https://api.flutter.dev/flutter/widgets/Placeholder-class.html) 

一个绘制了一个盒子的的widget，代表日后有widget将会被添加到该盒子中(组件未展示出来时的占位容器)

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