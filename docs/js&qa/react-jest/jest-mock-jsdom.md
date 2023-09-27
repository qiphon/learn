# 测试环境

在很多时候，我们前端的代码往往只在浏览器里运行，经常要用到浏览器的 API。我之前就封装过一个 storage 文件， 通过指定 type = 'indexedDB' | 'cookie' | 'localStorage' 来切换存储的方式，而且还可以生成自定义的 key，防止全局污染。

相信大家也见过不少这种和浏览器强绑定的工具文件，那我们该如何测它们呢？

由于 Node.js 环境并没有 localStorage，所以你会得到这样的报错：  `localstorage is not defined`

### 全局 Mock

既然没有 localStorage，那我们可以给它 Mock 一个！首先添加 tests/jest-setup.ts 文件，然后放置 localStorage 的 Mock 实现：

```ts 
// tests/jest-setup.ts
Object.defineProperty(global, 'localStorage', {
  value: {
    store: {} as Record<string, string>,
    setItem(key: string, value: string) {
      this.store[key] = value;
    },
    getItem(key: string) {
      return this.store[key];
    },
    removeItem(key: string) {
      delete this.store[key];
    },
    clear() {
      this.store = {}
    }
  },
  configurable: true,
})

```
然后在 jest.config.js 里添加 setupFilesAfterEnv 配置：

```json 
module.exports = {
  setupFilesAfterEnv: ['./tests/jest-setup.ts'],
};
```
推荐：使用 setupFilesAfterEnv 而不是 setupFiles。

设置了之后，jest-setup.ts 会在每个测试文件执行前先执行一次。 相当于每执行一次测试，都会在全局添加一次 localStorage 的 Mock 实现

#### setupFilesAfterEnv vs setupFiles

插入一下：相信很多人都知道 Jest 的 setupFiles，但不太了解 setupFilesAfterEnv，这里简单讲讲它们的区别 （可从 [官网的介绍](https://jestjs.io/docs/configuration#setupfiles-array) 了解更多）

简单来说：

- setupFiles 是在 引入测试环境（比如下面的 jsdom）之后 执行的代码
- setupFilesAfterEnv 则是在 安装测试框架之后 执行的代码

具体应用场景是：在 setupFiles 可以添加 测试环境 的补充，比如 Mock 全局变量 abcd 等。而在 setupFilesAfterEnv 可以引入和配置 Jest/Jasmine（Jest 内部使用了 Jasmine） 插件。

如果你试图在 setupFiles 添加 Jest 的扩展/插件，那么你可能会得到 expect is not defined 报错。详见这个 [Issue](https://github.com/testing-library/jest-dom/issues/122#issuecomment-650520461)。

## jsdom 测试环境

回到主题，像上面 Mock LocalStorage 这样有点傻，因为我们不可能把浏览器里所有的 API 都 Mock 一遍，而且不可能做到 100% 还原所有功能。因此，jest 提供了 testEnvironment 配置：

```js 
// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
}
```

添加 jsdom 测试环境后，全局会自动拥有完整的浏览器标准 API。原理是使用了 jsdom (opens new window)。 这个库用 JS 实现了一套 Node.js 环境下的 Web 标准 API。 由于 Jest 的测试文件也是 Node.js 环境下执行的，所以 Jest 用这个库充当了浏览器环境的 Mock 实现。

