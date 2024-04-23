c# harmonyOS 开发

- [下载开发工具](https://developer.harmonyos.com/cn/develop/deveco-studio)
- 配置开发者工具
  - 配置node
    - preference > build,execution,Deployment > Node (选择node 所在的文件夹)
  - 下载sdk  
    - preference > SDK > platforms  勾选一个版本，推荐最新的 （目前是3.1.0）
    - preference > SDK > emulator   勾选一个版本，推荐最新的 （目前是3.1.0）

- [搭建第一个应用，参考这个](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/start-with-ets-stage-0000001477980905-V3?catalogVersion=V3)

### 目录结构

- AppScope > app.json5：应用的全局配置信息。
- entry：HarmonyOS工程模块，编译构建生成一个HAP包。
  + src > main > ets：用于存放ArkTS源码。
  + src > main > ets > entryability：应用/服务的入口。用于当前ability 应用逻辑和生命周期管理
  + src > main > ets > pages：应用/服务包含的页面。
  + src > main > resources：用于存放应用/服务所用到的资源文件，如图形、多媒体、字符串、布局文件等。关于资源文件，详见资源分类与访问。
  + src > main > module.json5：Stage模型模块配置文件。主要包含HAP包的配置信息、应用/服务在具体设备上的配置信息以及应用/服务的全局配置信息。具体的配置文件说明，详见module.json5配置文件。
    - 属性 - 描述

    - name 该标签标识当前module的名字，module打包成hap后，表示hap的名称，标签值采用字符串表示（最大长度31个字节），该名称在整个应用要唯一。

    - type 表示模块的类型，类型有三种，分别是entry、feature和har。

    - srcEntry 当前模块的入口文件路径。

    - description 当前模块的描述信息。

    - mainElement 该标签标识hap的入口ability名称或者extension名称。只有配置为mainElement的ability或者extension才允许在服务中心露出。

    - deviceTypes 该标签标识hap可以运行在哪类设备上，标签值采用字符串数组的表示。

    - deliveryWithInstall 标识当前Module是否在用户主动安装的时候安装，表示该Module对应的HAP是否跟随应用一起安装。- true：主动安装时安装。- false：主动安装时不安装。

    - installationFree 标识当前Module是否支持免安装特性。- true：表示支持免安装特性，且符合免安装约束。- false：表示不支持免安装特性。

    - pages 对应的是main_pages.json文件，用于配置ability中用到的page信息。

    - abilities 是一个数组，存放当前模块中所有的ability元能力的配置信息，其中可以有多个ability。
    
  + src > ohosTest 单元测试目录
  + build-profile.json5：当前的模块信息、编译信息配置项，包括buildOption、targets配置等。其中targets中可配置当前运行环境，默认为HarmonyOS。
  + hvigorfile.ts：模块级编译构建任务脚本，开发者可以自定义相关任务和代码实现。
  + src 
    - oh-package.json5 是模块依赖配置信息
- oh_modules：用于存放三方库依赖信息。关于原npm工程适配ohpm操作，请参考历史工程迁移。
- build-profile.json5：应用级配置信息，包括签名、产品配置等。

- hvigorfile.ts：应用级编译构建任务脚本。
- oh-package.json5是工程级依赖配置文件，用于记录引入包的配置信息。

- AppScope
  - app.json5 是应用的全局配置文件，用于存放应用的公共配置信息
    - bundleName是包名。
    - vendor是应用程序供应商。
    - versionCode是用于区分应用版本。
    - versionName是版本号。
    - icon对应于应用的显示图标。
    - label是应用名


#### 特别文件

- src/main/resources/base/profile/main_pages.json  配置页面的所有路由
- 配置路由页面（不同模型位置不同）
  - src/main/ets/pages  放置所有的路由页面 - stage 模型
  - src/main/config.json        - FA 模型

### 特点

- 所有的元素都是函数如 Button 代码为 `Button('click me')`
- 状态使用装饰器 @state 如： `@state num: number = 12`

## harmony 中的模型

### [stage 模型](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/application-package-structure-stage-0000001478061425-V3?catalogVersion=V3)

- 一个应用包含一个或者多个Module

### [FA 模型](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/application-package-structure-fa-0000001477980909-V3?catalogVersion=V3)


## 证书

# harmonyOS 开发
- [基础能力认证](https://developer.huawei.com/consumer/cn/training/dev-cert-detail/101666948302721398?ha_source=hsd&ha_sourceId=89000479)

## 问题

- 模拟器没有热更新，只能用preview
- FA 模型组件名要小写字母开头
- FA 模型使用js 时，路由跳转无法在模拟器中实现