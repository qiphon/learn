redux 仓库创建完成后要 dispatch 一次，不然如果不传入初始的 state，
创建后的仓库的 state 是 undefined

修改内容

```js
// createStore.js 添加一次手动触发
dispatch(Symbol('init'))
```