# 测试

- 下包困难时，可以改一下 源 yarn config set registry https://registry.npm.taobao.org
    - 官方源  https://registry.yarnpkg.com
- npm 源 `npm config set registry https://registry.npm.taobao.org`
    - 官方源  `npm config set registry https://registry.npmjs.org/`
- 查看源地址  `npm config get registry`
- 单元测试

    - 安装单元测试框架 `yarn add karma -D`
    - 修改package.json
        
        ```json
        "scripts": {
            "init": "karma init",
            "unit:start": "karma start"
        }
        ```
    - npm run init
    - 断言库 `yarn add karma-jasmine jasmine-core`
    - 浏览器驱动  `yarn add karma-phantomjs-lancher`
    - 覆盖率  `yarn add karma-coverage -D`

- UI 测试
    - 下载backstopjs  `npm install -g backstopjs`
    - 配置 script
        ```js
        scripts: {
            "ui:init": "backstop init",
            "ui:start": "backstop test"
        }
        ```
- e2e 测试 （cypress \ rize \ f2etest）
    - 

- service TEST
    - 