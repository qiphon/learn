# [项目文件及目录说明](https://developer.huawei.com/consumer/cn/training/course/slightMooc/C101667303102887820)

- AppScope > app.json5：应用的全局配置信息。
- entry：HarmonyOS工程模块，编译构建生成一个HAP包。
  + src > main > ets：用于存放ArkTS源码。
  + src > main > ets > entryability：应用/服务的入口。用于当前ability 应用逻辑和生命周期管理
  + src > main > ets > pages：应用/服务包含的页面。
  + src > main 
    - resources：用于存放应用/服务所用到的资源文件，如图形、多媒体、字符串、布局文件等。关于资源文件，详见资源分类与访问。
        - base/profile/main_pages.json 文件保存的是页面page的路径配置信息，所有需要进行路由跳转的page页面都要在这里进行配置。
    - module.json5：Stage模型模块配置文件。主要包含HAP包的配置信息、应用/服务在具体设备上的配置信息以及应用/服务的全局配置信息。具体的配置文件说明，详见module.json5配置文件。
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
            - 属性 描述
            - name 该标签标识当前ability的逻辑名，该名称在整个应用要唯一，标签值采用字符串表示（最大长度127个字节）。

            - srcEntry ability的入口代码路径。

            - description ability的描述信息。

            - icon ability的图标。该标签标识ability图标，标签值为资源文件的索引。该标签可缺省，缺省值为空。如果ability被配置为MainElement，该标签必须配置。

            - label ability的标签名。

            - startWindowIcon 启动页面的图标。

            - startWindowBackground 启动页面的背景色。

            - visible ability是否可以被其他应用程序调用，true表示可以被其它应用调用， false表示不可以被其它应用调用。

            - skills 标识能够接收的意图的action值的集合，取值通常为系统预定义的action值，也允许自定义。

            - entities 标识能够接收Want的Entity值的集合。

            - actions 标识能够接收的Want的Action值的集合，取值通常为系统预定义的action值，也允许自定义。

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