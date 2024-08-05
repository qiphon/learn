# 写一个 [loader](https://webpack.js.org/api/loaders) or [plugin](https://webpack.js.org/api/plugins/)

## loader

```js
// loader.js

module.exports = function (source, map, meta) {
  const opts = this.query
  //   return source.replace('a', 'aa')
  // or
  // this.callback()
}
```

## plugin

```js
// plugin.js

class MyPlugin {
  constructor(options) {
    console.log('插件被使用了')
  }

  apply(compiler) {
    // compiler.hooks  // https://webpack.js.org/api/compiler-hooks/
    compiler.hooks.emit.
  }
}
```
