# Mock 网页地址

上一章说到可以配置 testEnvironment: 'jsdom' 来创造一个 Node.js 的浏览器环境，然后在这个环境下跑测试。但，真的只配一个 jsdom 就解决所有问题了么？

当然不是！其中最难搞的场景就是修改网页路径。

问题 1. 

```ts 
// src/utils/getSearchObj.ts
const getSearchObj = () => {
  // ?a=1&b=2
  const { search } = window.location;

  // a=1&b=2
  const searchStr = search.slice(1);

  // ['a=1', 'b=2']
  const pairs = searchStr.split("&");

  // { 'a': '1' }
  const searchObj: Record<string, string> = {};

  pairs.forEach((pair) => {
    // [a, 1]
    const [key, value] = pair.split("=");
    searchObj[key] = value;
  });

  return searchObj;
};

export default getSearchObj;
```

`getSearchObj() `只是一个示例方法，如果你想把 查询字符串 转换为 对象，可以用下面更现代且更安全的方法(注意浏览器兼容性)：

```ts 
const getSearchObj = () => {
    return Object.fromEntries(
        new URLSearchParams(window.location.search).entries(),
    );
};

export default getSearchObj;
```

然后写测试用例 

```ts 
// tests/utils/getSearchObj.test.ts
import getSearchObj from "utils/getSearchObj";

describe("getSearchObj", () => {
  it("可以获取当前网址的查询参数对象", () => {
    window.location.href = "https://www.baidu.com?a=1&b=2";

    expect(window.location.search).toEqual("?a=1&b=2");
    expect(getSearchObj()).toEqual({
      a: "1",
      b: "2",
    });
  });

  it("空参数返回空", () => {
    window.location.href = "https://www.baidu.com";

    expect(window.location.search).toEqual("");
    expect(getSearchObj()).toEqual({});
  });
});
```

这时运行用例就会报错

有的同学会留意到：刚刚在 Mock localStorage 的时候，我们用到了 Object.defineProperty，那我们能否用下面的方法来试图 Hack 掉网页地址呢？

```ts 
Object.defineProperty(window.location, 'href', {
  writable: true,
  value: 'https://www.baidu.com?a=1&b=2'
});
```

答案是：不行！ 你会得到这样的报错：Error: Not implemented: navigation (except hash changes)，毕竟是 Hack 手法，并不推荐，详见这个 [Issue](https://github.com/jestjs/jest/issues/890#issuecomment-501260238)。

经 Issue 区提醒，也可以尝试以下方法：

```ts 
describe('getSearchObj', () => {
  it('可以获取当前网址的查询参数对象', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: 'https://google.com?a=1&b=2', search: '?a=1&b=2' },
    });
    expect(window.location.search).toEqual('?a=1&b=2');
    expect(getSearchObj()).toEqual({
      a: '1',
      b: '2',
    });
  });
  it('空参数返回空', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: 'https://google.com', search: '' },
    });
    expect(window.location.search).toEqual('');
    expect(getSearchObj()).toEqual({});
  });
});

```

这个方法与上面不同点在于：Mock window.location 对象，而不是 window.location.href 属性。但缺点是不仅要在 href 写查询参数，还要在 search 再写一遍查询参数。

终于，有人受不了，不就 jest 没有把 jsdom 对象丢到全局么？把 jsdom 测试环境做个扩展不就好了：

```js 
const JSDOMEnvironment = require("jest-environment-jsdom");

module.exports = class JSDOMEnvironmentGlobal extends JSDOMEnvironment {
  constructor(config, options) {
    super(config, options);

    // 放到全局
    this.global.jsdom = this.dom;
  }

  teardown() {
    this.global.jsdom = null;

    return super.teardown();
  }
};
```
上面这段代码继承了原来的 JSDOMEnvironment 的测试环境，在构造器里把 jsdom 绑定到了全局对象上。

当然，我们不用自己写这段代码，有人已经把它变成了一个 NPM 包了：`npm install --save-dev jest-environment-jsdom-global jest-environment-jsdom jsdom @types/jsdom` https://www.npmjs.com/package/jest-environment-jsdom-global 
(这个不能和有跨域的axios共同使用, jest 28 以后不再能这么用了，)

然后在 jest.config.js 里使用这个魔改后的测试环境：

```js 
// jest.config.js
module.exports = {
  testEnvironment: 'jest-environment-jsdom-global',
  setupFilesAfterEnv: ["<rootDir>/tests/addEnv.ts"],
  // ... 
};
```
需要不从变量到环境中，不然会报 [textencoder-is-not-defined](https://stackoverflow.com/questions/68468203/why-am-i-getting-textencoder-is-not-defined-in-jest)

```ts 
//  tests/addEnv.ts
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });
```

修改测试用例

```ts 
// jest 29 
// tests/utils/getSearchObj.test.ts
import { getSearchObj } from "../utils";

let windowSpy :jest.SpyInstance
beforeEach(()=> {
   windowSpy = jest.spyOn(window, 'window', 'get')

})

afterEach(()=> {
  windowSpy.mockRestore()
})

describe('分组1 ', () => {
  test('toBeCloseTo adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBeCloseTo(3);
  });

  it('get search params ', () => {
    windowSpy.mockImplementation(()=> ({
      location: {
        href: "https://example.com?a=1&b=2",
        search: '?a=1&b=2'
      }
    }))
    // console.log(window.location.href)
    expect(getSearchObj()).toEqual({a: '1', b: '2'})
  })

})
```
由于 global 类型声明中没有声明 jsdom 属性，导致报错 

我们还要添加一个全局声明文件 src/types/global.d.ts：

```ts 
// src/types/global.d.ts
declare namespace globalThis {
  var jsdom: any;  // 一定要用 var！否则不生效！
}
```

#### location mock 

上面的做法不是很优雅：我们只是想改个地址而已，又要改环境，又要写全局类型定义，而且还是个 any 类型，动静有点大。 有没有动静小一点的方法呢？ 有，我们可以用 jest-location-mock 


这个包就是专门用于修改网页地址的。缺点是我们只能用它 Mock 的 3 个 API：

- window.location.assign
- reload
- replace

