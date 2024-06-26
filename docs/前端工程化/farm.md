# [farm](https://www.farmfe.org/docs/quick-start)

## 上手

这里以 react 项目为例, 其他项目如 vue 可以根据 [farm plugin](https://www.farmfe.org/zh/docs/using-plugins) 进行配置

1. 安装 farm

```bash
pnpm i @farmfe/cli @farmfe/core @farmfe/plugin-react core-js react-refresh -D
```

2. 创建 farm.config.ts

```ts
import { defineConfig } from "@farmfe/core";

export default defineConfig({
  // Options related to the compilation
  compilation: {
    input: {
      // can be a relative path or an absolute path
      //   和 vite 一样入口是 html
      index: "./index.html",
    },
    output: {
      path: "./build",
      publicPath: "/",
    },
    // ...
  },
  // Options related to the dev server
  server: {
    port: 9000,
    // ...
  },
  // Additional plugins
  plugins: ["@farmfe/plugin-react"],
});
```

3. 补充执行命令 package.json

```json
{
  "scripts": {
    "start": "farm start",
    "build": "farm build",
    // 预览 build 后的文件
    "preview": "farm preview",
    "test": "jest"
  },
  "dependencies": {
    "jest": "29.7.0",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "styled-components": "^6.1.11"
  },
  "devDependencies": {
    "@farmfe/cli": "^1.0.2",
    "@farmfe/core": "^1.2.1",
    "@farmfe/plugin-react": "^1.1.0",
    "@testing-library/dom": "^10.2.0",
    "@testing-library/react": "^16.0.0",
    "@types/jest": "27.4.1",
    "@types/react": "^18.3.3",
    "@types/react-dom": "18.3.0",
    "core-js": "^3.37.1",
    "jest-environment-jsdom": "^29.7.0",
    "react-refresh": "^0.14.2",
    "ts-jest": "^29.1.5",
    "typescript": "5.5.2"
  }
}
```

默认情况下，Farm 将项目构建到本机支持 async/await 的现代浏览器：

```
Chrome >= 62
Firefox >= 63
Safari >= 13.1
Edge >= 79
```

通过配置 output.targetEnv ,Farm 会将语法降级为 es5 并自动注入 polyfill。 然后我们必须安装 core-js@3 来进行 polyfill 注入

```ts
import { defineConfig } from "@farmfe/core";
import postcss from "@farmfe/js-plugin-postcss";

export default defineConfig({
  // Options related to the compilation
  compilation: {
    input: {
      // can be a relative path or an absolute path
      index: "./index.html",
    },
    output: {
      targetEnv: "browser-legacy",
      path: "./build",
      publicPath: "/",
    },
    css: {
      prefixer: {
        targets: ["ie >=11"],
      },
    },
    // ...
  },
  // Options related to the dev server
  server: {
    port: 9000,
    // ...
  },
  // Additional plugins
  plugins: ["@farmfe/plugin-react", postcss()],
});
```

### CSS

Farm 默认支持 css modules，以 .module.css|less|scss|sass 结尾的模块默认将被视为 Css Modules。

#### sass

```sh
npm install @farmfe/plugin-sass -D
```

farm.config.ts

```ts
import type { UserConfig } from "@farmfe/core";

export default <UserConfig>{
  // ...
  plugins: ["@farmfe/plugin-sass"], // 配置 Rust 插件的包名即可引入和使用该插件
  // 如果你希望配置 plugin-sass 的参数，可以使用如下形式的配置
  // plugins: [
  //   ['@farmfe/plugin-sass', {
  //          sourceMap: true // bool
  //         sourceMapIncludeSources: true, // bool
  //         alertAscii: true, // bool
  //         alertColor: true, // bool
  //         charset: true, // bool
  //         quietDeps: true, // bool
  //         verbose: false, // bool
  //         style: 'expanded' | 'compressed' // output code style
  //  }]
  // ]
};
```

#### Less

```sh
npm install @farmfe/js-plugin-less -D
```

farm.config.ts

```ts
import type { UserConfig } from "@farmfe/core";
import less from "@farmfe/js-plugin-less";

export default <UserConfig>{
  // Farm less 插件是一个 Js 插件。 参数参考这个插件
  plugins: [less()], // pass argument to the less function like `less({ /* your options */ })` to specify less options
};
```

#### Postcss

```sh
npm install @farmfe/js-plugin-postcss -D
```

farm.config.ts

```ts
import type { UserConfig } from "@farmfe/core";
import postcss from "@farmfe/js-plugin-postcss";

export default <UserConfig>{
  // ...
  plugins: [postcss()], // pass argument to the less function like `less({ /* your options */ })` to specify less options
};
```

如果使用 postcss plugin 需要创建 postcss.config.js

#### Css Prefixer

Farm 支持开箱即用的 css prefixer，您可以使用 compilation.css.prefixer 对其进行配置。

farm.config.ts

```ts
import type { UserConfig } from "@farmfe/core";

function defineConfig(config: UserConfig) {
  return config;
}

export default defineConfig({
  compilation: {
    css: {
      prefix: {
        targets: ["ie >= 10"],
      },
    },
  },
});
```

## ts

Farm 支持开箱即用地编译 Js/Jsx/Ts/Tsx，并默认将 Jsx/Tsx 编译为 React。(使用 vue jsx 不知道是不是有问题)

## dev 环境 es 降级

```ts
// farm.config.ts
export default {
  compilation: {
    script: {
      target: "ES5",
    },
    presetEnv: true,
  },
};
```

## 静态资源

```tsx
// 编译后是 url
import rocketUrl from "./assets/rocket.svg"; // return the url of this image

// 编译后是 base64
import logo from "./assets/logo.png?inline"; // logo is a base 64 str

// 原始引入
import logo from "./assets/license.txt?raw"; // return the content string of the assets
```

## 环境变量和模式

Farm 通过 process.env.NODE_ENV 来区分 development 环境和 production 环境。

Farm 使用 dotenv 来加载你的额外环境变量，例如 .env 文件。默认情况下， .env 文件从 root 加载，你可以使用 envDir 来自定义。

Farm 通过 dotenv 加载 .env 文件，将其加载到 process.env 中，并最终将其注入到 define 中。

```sh
# .env
FARM_APP_SECRET=secret
Farm_APP_PASSWORD=password
APP_VERSION=1.0.0
```

> 为了确保客户端的安全，防止当前系统中的环境变量被暴露给客户端， Farm 只会识别以 FARM*、VITE* 开头的重要环境变量，以便更好地兼容 vite 及其生态系统。前缀可以通过 envPrefix 前缀配置

Farm 通过 dotenv-expand 扩展环境变量。对于仅用于开发的环境变量，使用 .env.development 文件，对于仅用于生产的环境变量，使用 .env.production 文件，对于通过 `--mode <stage>` 传递的自定义模式，从 `.env.<stage> `文件加载。
