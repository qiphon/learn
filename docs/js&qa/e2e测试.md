# e2e 测试

## selenium-webdriver

- 安装 selenium-webdriver

- 下载浏览器驱动 https://www.npmjs.com/package/selenium-webdriver 把驱动添加到path 或者将 驱动文件扔到项目目录

- 创建 demo

```js

// 这个用例是 selenium-webdriver 提供的
// 也可以使用nightwatch
const {Builder, By, Key, until} = require('selenium-webdriver');
 
(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('http://www.baidu.com/');
    await driver.findElement(By.name('wd')).sendKeys('qiphon', Key.RETURN);
    await driver.wait(until.titleIs('qiphone_百度搜索'), 2000);
  } finally {
    await driver.quit();
  }
})();

```

- 运行命令 添加到 package.json

```bash
    "e2e": "node ./tests/e2e/baidu.spec.js",
```


## rize 

- 安装依赖

```sh
yarn add --dev puppeteer rize
```
- 创建测试文件, 如果测试通过，命令行会自动推出，否则报错提示

```js
const Rize = require('rize')
const rize = new Rize()
rize
  .goto('https://github.com/')
  .type('input.header-search-input', 'node')
  .press('Enter')
  .waitForNavigation()
  .assertSee('Node.js3')
  .end()  // 别忘了调用 `end` 方法来退出浏览器！

```