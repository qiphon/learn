# webpack 文件拆分 & lazyload & analyse & prefetch & shimming

## code split

目的：防止主要包文件过大

- 不编译指定第三方库
  - 添加入口
  - externals
  - splitChunks
  - 动态引入文件会自动代码分割
    ```js
    // 动态引入修改打包后的文件名
    // 需要配合 @babel/plugin-syntax-dynamic-import
    import(/* webpackChunkName: 'lodash' */ 'lodash').then(({ defalut: _ }) => {
      // do anything
    })
    ```
- 拆分 bundle 文件
  ```
  {
      ...,
      optimization: {
          splitChunks: {
              chunks: 'all'
          }
      }
  }
  ```

### css 代码分割

`bun install mini-css-extract-plugin optimize-css-assets-webpack-plugin -D`

## analyse

直接看 webpack 官网

## prefetch

prefetch 会等待主要代码加载完成后再加载

异步引入包，并且加上 prefetch 注释

```js
import(/* webpackPrefetch: true */ 'lodash').then(({ default: _ }) => {
  // do
})
```

## Shimming

注入全局变量

```webpack.config.js
{
    plugins: [
        new webpack.ProvidePlugin({
            $:'jQuery'
        })
    ]
}
```
