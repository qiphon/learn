# webpack multi-page build

```js
// webpack.config.js

{
    entry: {
        main: 'src/index.js',
        sec: 'src/sec.js',
    },
  plugins: [
    new HtmlwebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
        chunks: ['runtime', 'vendors', 'main']
    })
    new HtmlwebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
        // chunk 自己确定
        chunks: ['runtime', 'vendors', 'sec']
    })
  ]
}
```
