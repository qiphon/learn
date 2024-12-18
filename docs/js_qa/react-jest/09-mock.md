# mock 场景

## 一次性 Mock

这里的 “一次性” 是指在一个文件只 Mock 一次。Jest 的官方文档 在 [Mock Functions](https://github.yanhaixiang.com/jest-tutorial/basic/how-to-mock/#%E4%B8%80%E6%AC%A1%E6%80%A7-mock) 这一章 写了一些这种 Mock 的用法， 这里简单说一下。

### Mock 模块

类似 axios 这样的第三方 NPM 库，可以这样实现 Mock：

```ts 
import axios from 'axios';
import Users from './users';

jest.mock('axios');

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};

  jest.spyOn(axios, 'get').mockResolvedValue(resp);

  // 你也可以使用下面这样的方式：
  // jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));
});
```

### 部分依赖

上面会把整个模块的实现都给干掉，如果只想 Mock 部分内容，官方也提供了对应的写法：

```ts 
// foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

```ts 
//test.js
import defaultExport, {bar, foo} from '../foo-bar-baz';

jest.mock('../foo-bar-baz', () => {
  // 真实的 foo-bar-baz 模块内容
  const originalModule = jest.requireActual('../foo-bar-baz');

  // Mock 默认导出和 foo 的内容
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => 'mocked baz'),
    foo: 'mocked foo',
  };
});

test('should do a partial mock', () => {
  const defaultExportResult = defaultExport();
  expect(defaultExportResult).toBe('mocked baz');
  expect(defaultExport).toHaveBeenCalled();

  expect(foo).toBe('mocked foo');
  expect(bar()).toBe('bar');
});
```

要注意的是：jest.mock 和 jest.unmock 是一对非常特殊的 API，它们会被提升到所有 import 前。也就是说，上面这段代码看起是先 import 再 mock，而真实情况是，先 mock 了，再 import

>这样的提升代码形为原本是通过 babel-plugin-jest-hoist 这个插件实现的，所以你在选 Jest 的转译器时，也要留意一下这些小坑。不过目前大部分的转译工具都有这个功能了。