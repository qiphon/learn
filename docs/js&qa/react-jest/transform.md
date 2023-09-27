# jest - 转译器

Jest 本身不做代码转译工作。 在执行测试时，它会调用已有的 转译器/编译器 来做代码转译。在前端，我们最熟悉的两个转译器就是 Babel (opens new window)以及 TSC (opens new window)了。

ts-jest 是个很棒的工具，省区了配置bable 的过程。

常见的转译器有 babel, tsc, esbuild 和 swc，后面两个速度较快，但存在一定风险。

jest 有个vscode 工具，但是这个工具用在使用pnpm装依赖时会有问题，建议使用yarn 或 pnpm 

> `npm i -D typescript ts-jest`

注意，这里 ts-jest 一定要和 jest 的大版本一致！ 比如 27 对 27，或者 26 对 26，否则会有兼容问题！

可以使用 tsc 快速生成 TS 配置文件

> `npx tsc --init`

```tsconfig.json 
{
  "compilerOptions": {
    "target": "es2015",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
     "types": ["node", "jest"],
    "lib": ["ESNext", "DOM", "DOM.Iterable"]
  }
}
```

jest.config.js 里添加一行配置 

```jest.config.js 
module.exports = {
  preset: 'ts-jest',
  // ...
};
```

现在就可以写测试用例了，测试用例建议放在 `__test__` 文件夹中，测试文件建议命名为 `<name>.test.ts` 或 `<name>.spec.ts`

### Babel 转译器 

Babel 做转译的 缺点是无法让 Jest 在运行时做类型检查，所以更推荐使用 ts-jest

### 路径简写

要实现这样的效果，我们可以在 moduleDirectories 添加 "src"：

```json 
// jest.config.js
module.exports = {
  moduleDirectories: ["node_modules", "src"],
  // ...
}
```
我们还得在 tsconfig.json 里指定 baseUrl 和 paths 路径：

```json 
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "utils/*": ["src/utils/*"],
      "@/*": ["src/*"]
    }
  }
}
```

这样，代码里就可以直接简写 `import {sum} from 'utils'`, 但是上面写的 `@` 开始的路径jest 不能解析，我们需要在其他的熟悉中处理

```js
// jest.config.js
modulex.exports = {
  "moduleNameMapper": {
    "@/(.*)": "<rootDir>/src/$1"
  }
}

```

难道每次写路径匹配规则都在 tsconfig.json 和 jest.config.js 写两份么？很遗憾，确实如此。造成这个问题的主要原因是 jest 根本不管 tsc。 不过，好消息是，你可以用 ts-jest 里的工具函数 pathsToModuleNameMapper 来把 tsconfig.json 里的 paths 配置复制到 jest.config.js 里的 moduleNameMapper：

```js 
// jest.config.js
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  // [...]
  // { prefix: '<rootDir/>' }
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
}
```

