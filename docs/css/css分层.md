# css 分层

- 为什么要css 分层

    - css 有语义化的命名约定和 css 层的分离，将有助于它的可扩展性，性能的提高和代码的组织管理。
    - 大量的样式，覆盖、权重和 `!important`,分好层可以让团队命名统一规范，方便维护
    - 有责任感地去命名你的选择器

  ### SMACSS （scalable and modular architecture for css 可扩展的模块化架构的 css）像 OOCSS一样以减少重复样式为基础。然而 SMACSS 使用一套5个层次来划分 css 给项目带来更结构化的方法

    - Base - 设定标签元素的预设值 ps. `html{} input[type=text]{}`
    - Layout - 整个网站的 【大架构】的外观  ps. `#header{margin: 15px;}`
    - Module - 应用在不同页面公共模块 ps. `.button{border: none;}`
    - State - 定义元素的不同状态 ps. `.nav--main{ .active {}}`
    - Theme - 画面上所有【主视觉】的定义 ps. `border-color、background-image`

    修饰符使用的是 `--`，子模块使用 `__`符号

    ```html
    <div class="container">
      <div class="container-header">
        <div class="container-header__title">
          <h1 class="container-header__title--home"></h1>
        </div>
      </div>
    </div>

    ```
  ### BEM
  > BEM 和 SMACSS 非常类似，主要用来如何给项目命名。一个简单命名，更容易让别人一起工作。比如选项卡导航是一个块（block），这个块里的元素是其中的标签之一（Element），而当前选项卡是一个修饰状态（modifier）
    - block - 代表了更高级别的抽象或组件
    - block__element - 代表 .block 的后代，用于形成一个完整的 .block 整体
    - block--modifier - 代表 .block 的不同状态或不同版本
    - 修饰符使用的是 `_`, 子模块使用 `__`(2个下划线)。（不用一个`-` 的原因是 css 单词链接）

  ### SUIT
  > suit 起源于 BEM，但是它对组件名使用驼峰式和连字号把组件从他们的修饰和子孙后代中区分出来：
  - 修饰符使用的是 `--`，子模块使用的是 `__`符号。
  ```css
  .u-utility{}
  .ComponentName{}
  .ComponentName--modifierName{}
  .ComponentName-descendantName{}
  .ComponentName.is-someState{}
  /* 实例 */
  .ProductDetails{}
  .ProductDetails-price{}
  .ProductDetails-title--sale{}
  ```

  ### ACSS
  考虑如何设计一个系统的接口。原子（atoms）是创建一个区块最基本的特质，比如说表单按钮。分子（molecules）是很多原子的组合，比如说一个表单中包含了一个标签，输入框和按钮。生物（organisms）是众多分子的组合物，比如一个网站的顶部区域，包括网站的标题、导航等。而模板（Template）又是众多生物的结合体。比如一个网站的布局。而最后的页面就是一个特殊的模板。

  ### ITCSS

  - setting -- 全局可用配置，设置开关。`$color-ui: #bada55; $spacing-unit: 10px;`
  - tool -- 通用工具函数 `@mixin font-color(){font-color: $color-ui}`
  - generic -- 未归类的 HTML 元素。 `ul{list-style: square outside;}`
  - objects -- 设计部分开始使用专用类。 `.ui-list__item{padding: $spacing-unit}`
  - components -- 设计符合你的组件 `.pruduct-list {@include font-brand(); border-top: 1px solid $color-ui;}`
  - trumps -- 重写，只影响一块的 dom。（通常带上 `!important`）
