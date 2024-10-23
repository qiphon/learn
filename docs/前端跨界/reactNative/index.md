# [react native](https://reactnative.dev/docs/getting-started)

ios xcode 构建缓存目录 `~/Library/Developer/Xcode/DerivedData/` 有些时候出现构建问题需要删除这个文件夹

### 已有项目运行

- Android 直接添加项目中的 Android 文件夹到 Android studio
- ios 用 xcode 打开 `ios/Application.xcworkspace`

### 模拟器 操作

#### ios

- CMD + D 出现操作菜单
- CMD + R 代码更新
- iOS 模拟器：按下 Cmd ⌘ + D（或选择 设备 > 摇动）

#### android

Android 模拟器：按下 Cmd ⌘ + M（macOS）或 Ctrl + M（Windows 和 Linux）

## debug

- 安装 react-devtools ，然后运行 `npx react-devtools` ，可以查看组件树
- 接口请求数据拦截可以用 [reactotron](https://docs.infinite.red/reactotron/)
- console 可以在 xcode、终端中查看

### 相关资料

- [直播 demo](https://github.com/qiphon/react-native-tv)
- [React Native uses Metro to build your JavaScript code and assets.](https://metrobundler.dev/)
