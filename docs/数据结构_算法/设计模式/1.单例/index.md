# 单例模式

> 单例模式，很常用也非常重要，将单例模式应用于程序开发设计，可减少重复代码，提升程序效率，同时单例的唯一性也使得数据流更加清晰，便于维护管理。

- 什么是单例模式?

  单例模式（Singleton Pattern）保证一个类只有一个实例，并提供一个访问它的全局访问点。
  JavaScript 中的全局变量 window、localStorage，它们在全局中提供了访问点，并且只有唯一实例。

## 实现一个单例

单例模式从其定义就可以看出，是一个比较简单的设计模式，其核心思想是保证唯一实例，因此如下简单实现一个蒙层功能单例类，一步步完善。

```js
/**
 * Mask 蒙层单例
 */
class Mask {
  static instance: Mask;
  private isShow: boolean;
  private maskDom: HTMLDivElement;

  static getInstance() {
    if (!Mask.instance) {
      Mask.instance = new Mask();
    }
    return Mask.instance;
  }

  constructor() {
    this.isShow = false;
    this.maskDom = this.init();
  }

  /**
   * 创建蒙层DOM
   */
  private init() {
    const dom = document.createElement("div");
    dom.setAttribute(
      "style",
      "z-index: 99999; position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: none; pointer-events: all; user-select: none; cursor: not-allowed;"
    );
    document.body.appendChild(dom);
    return dom;
  }

  /**
   * show 显示蒙层
   */
  public show() {
    if (this.isShow) return;
    this.maskDom.style["display"] = "block";
    this.isShow = true;
  }

  /**
   * hide 隐藏蒙层
   */
  public hide() {
    if (!this.isShow) return;
    this.maskDom.style["display"] = "none";
    this.isShow = false;
  }
}

// 直接导出实例
export default Mask.getInstance();

// usage
import Mask from "./utils/Mask";

Mask.show();
Mask.hide();
```

这种在已开始就创建实例的方式，被称作“饿汉式单例”，另一种在需要的时候才创建实例的方式被称作“懒汉式单例”。

因此“饿汉式单例”的缺点就是：类加载时就初始化，浪费内存。

不过在现代借助 Webpack 等打包构建工具，如果没有使用到这个组件，也不会将这个组件打包进来，另外在 React、Vue 框架按需加载组件的设计实现下，组件也是按需通过网络下载分包组件文件，然后缓存起来，所以浪费内存这一缺点可忽略。因此，在 JavaScript 中懒汉式和饿汉式的区分不大。

```js
// 这种写法每次都需要new
constructor() {
  if (Mask.instance) {
    return Mask.instance;
  }
  this.isShow = false;
  this.maskDom = this.init();
  return Mask.instance = this;
}
// ....

export default Mask;

// usage 
const a = new Mask();
a.show();
const b = new Mask();
b.hide();
console.log("是否相等：", a === b);
// output: 是否相等 true，并且蒙层被隐藏

```

### 总结

单例模式在工作中经常用到，当我们有意识地使用单例管理具有唯一属性的实例，将会使得程序更容易管理维护。

结合 ES6 的 import 和 export 关键词，单例模式的应用也变得更加简便。

在实现单例中，我们有将单例和蒙层类功能拆分开，也有合在一起的，这取决于在你的项目中想要如何设计，如果单例并非是大面积的组件套用，其实还是推荐合在一起，有助于后续在单文件中维护整个功能类。