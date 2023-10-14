# vue react 区别

## 相同

- 都是用 virtual DOM
- 组件化思想
- 单项数据流，响应式
- 支持 ssr
- 跨平台

## 不同

### Vue 

- 简单，上手快
- 数据可变
- template + optionAPI
- 官方生态齐全 vue-router、vuex、cli、devtools
- 监听变化 -> 找到引用组件 -> render

### React

- 有一定学习成本
- 数据不可变
- all in js （jsx）
- React 很多生态都来自社区
- react 根据变化组件数默认向下全部更新