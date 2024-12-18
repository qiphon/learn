# [项目文件及目录说明](https://developer.huawei.com/consumer/cn/training/course/slightMooc/C101667303102887820)

目录中的文件类型

- resource 文件 资源型文件
- *.json5 配置文件
- ets arkts 文件

### 文件目录结构

- AppScope > app.json5：应用的全局配置信息。
- entry：HarmonyOS工程模块，编译构建生成一个HAP包。
  + src > main 
    - ets：用于存放ArkTS源码。
      + entryability：应用/服务的入口。用于当前ability 应用逻辑和生命周期管理
      + pages：应用/服务包含的页面。
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

### 资源文件 （resource）

放置开发中需要使用的 数字、字体、颜色、图片等文件，同样这里也区分应用级和模块级，应用级文件所有模块都可以使用，模块级文件只能模块使用。

- AppScope
  + resources 应用级文件目录
    - base
      - element  元素资源：颜色、数字、字符串
      - media 媒体资源
      - profile  自定义配置文件目录，包含页面配置、卡片配置等
    - en_US 多语言配置
    - zh_CN 多语言配置
    - rawfile 直接被打包进应用，不经过编译，也不会被赋予资源文件id

- entry
  + `src/main/resources` 模块级文件目录



### json5 文件说明

- entry
  + src
    - oh-package.json5 模块依赖管理配置文件（类似npm 的package.json）
    - main
      - module.json5 模块的配置文件

        ```json
        {
          "module": { // 模块基础信息
            "name": "entry",
            "type": "entry",
            "description": "$string:module_desc",
            "mainElement": "EntryAbility",
            "deviceTypes": [ // 模块支持的设备
              "phone",
              "tablet",
              "2in1",
              "car"
            ],
            "deliveryWithInstall": true,
            "installationFree": false,
            "pages": "$profile:main_pages",
            "abilities": [ /// 模块应用组件信息
              {
                "name": "EntryAbility",
                "srcEntry": "./ets/entryability/EntryAbility.ets",  // 当前模块入口的 UIability 代码路径
                "description": "$string:EntryAbility_desc",
                "icon": "$media:layered_image",
                "label": "$string:EntryAbility_label",
                "startWindowIcon": "$media:startIcon",
                "startWindowBackground": "$color:start_window_background",  /// 当前module中UIability 组件的配置信息
                "exported": true,
                "skills": [
                  {
                    "entities": [
                      "entity.system.home"
                    ],
                    "actions": [
                      "action.system.home"
                    ]
                  }
                ]
              }
            ],
            "routerMap": "$profie:router_map", // 当前模块的路由表路径
            "requestPermissions": [  // 模块权限信息
              {
                "name": "ohos.permission.INTERNET"  // 网络权限
              }
            ],
            "extensionAbilities": [
              {
                "name": "EntryBackupAbility",
                "srcEntry": "./ets/entrybackupability/EntryBackupAbility.ets",
                "type": "backup",
                "exported": false,
                "metadata": [
                  {
                    "name": "ohos.extension.backup",
                    "resource": "$profile:backup_config"
                  }
                ],
              }
            ]
          }
        }
        ```

- AppScope
  - app.json5 应用级配置文件：是应用的全局配置文件，用于存放应用的公共配置信息
    - bundleName是包名。用于应用的唯一性
    - vendor是应用程序供应商。
    - versionCode是用于区分应用版本。
    - versionName是版本号。（展示给用户的内容）
    - icon对应于应用的显示图标。
    - label是应用名