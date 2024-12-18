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