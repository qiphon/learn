# webpack tree shaking

webpack 从 4 开始支持简单的 tree shaking，例如：

```js
// （production模式下）打包后的代码 js 代码中会移除 test2 函数
export const test1 = () => console.log("test");

export const test2 = (arg) => console.log("(test2)", (arg));

test1()

```

但是如果我们手动引入工具库，这个工具库不会被 shaking 掉。（4、5都一样），有人说改变 lodash 中函数的引用方式可以 shaking，但是我测试过后都是一样，test2 函数会被 shaking 掉，但是 lodash 还会存在打包后的代码中。** 除非引入的是 lodash-es **

```js
// 引入的是整个lodash
// import { isArray } from "lodash";
// import lodash from "lodash";
// import lodash from "lodash-es";

// 只引入 isArray 函数
import { isArray } from "lodash-es";

export const test1 = () => console.log("test");

export const test2 = (arg) => console.log("(test2)", isArray(arg));

test1()
```

- webpack4 下可以引用 ` yarn add webpack-deep-scope-plugin ` 来解决依赖错误引入的问题。

  ```js
  // webpack-deep-scope-plugin 使用时，如果 test2 没有被使用就不会将 lodash 打包到项目中。
  import lodash from "lodash-es";

  // 如果 test2 函数被调用了，lodash 还是会被打入到项目中，所以推荐使用如下方式，
  // 这样写可以只引入 isArray 函数，而不是整个 lodash，并且也不需要 webpack-deep-scope-plugin
  import { isArray } from "lodash-es";

  export const test1 = () => console.log("test");

  export const test2 = (arg) => console.log("(test2)", lodash.isArray(arg));

  test1()
  ```

### css tree shaking

由于 css 比较特殊，所以 css 的 tree shaking 不太好实现，原因如下：

- 单页应用可以动态创建dom
- css module 在项目中普遍使用