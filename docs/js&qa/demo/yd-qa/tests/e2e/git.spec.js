const Rize = require('rize')
const rize = new Rize()
rize
  .goto('https://github.com/')
  .type('input.header-search-input', 'node')
  .press('Enter')
  .waitForNavigation()
  .assertSee('Node.js')
  .end()  // 别忘了调用 `end` 方法来退出浏览器！