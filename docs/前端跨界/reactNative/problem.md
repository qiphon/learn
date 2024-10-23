# react native 遇到的问题及解决方式

也有一部分写在 csdn 博客 https://blog.csdn.net/qiphon3650/category_8652599.html?spm=1001.2014.3001.5482

### react-native facebook::flipper::SocketCertificateProvider‘ (aka ‘int‘) is not a function or func

#### 环境

- react-native@0.72.6
- Installing Flipper (0.182.0)

#### 处理方案

- 打开文件 `ios/Pods/Flipper/xplat/Flipper/FlipperTransportTypes.h`
- 第 9 行补充 `#include <functional>`

### react-native-image-crop-picker 导致 xcode 编译时意外退出

xcode 编译时大多数时候是能看到报错的，很小几率会出现意外退出，无论是报错还是意外退出大概率都是所安装的包有问题导致的，通常升级包版本即可解决

#### 环境

- xcode 16
- "react-native": "0.75.4",
- "react-native-image-crop-picker": "^0.40.2",

#### 处理

升级 react-native-image-crop-picker

相同问题还存在于

- react-native-worklets-core
- "react-native-vision-camera": "4", ( 错误为 'ReactCommon/RCTBlockGuard.h' file not found )
