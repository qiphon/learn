# use webpack build library

```js
// webpack.config.js
module.exports = {
  output: {
    // path: ...
    // filename: ...
    library: 'libraryName',
    libraryTarget: 'umd',
  },
  externals {
    'lodash': 'lodash', // 把不必要的库移除
  }
}
```
