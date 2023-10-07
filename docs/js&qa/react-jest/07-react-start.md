# 测试react 

## `pnpm i -D @testing-library/react -D`

### 快照测试

使用 jest 和 React Testing Library 都能完成基础的交互测试以及功能测试，但是组件毕竟是组件，是有 HTML 结构的。 如果不对比一下 HTML 结构，很难说服自己组件没问题。但是这就引来了一个问题了：要怎么对比 HTML 结构？

最简单的方法就是把这个组件的 HTML 打印出来，拷贝到一个 xxx.txt 文件里，然后在下次跑用例时，把当前组件的 HTML 字符串和 xxx.txt 文件里的内容对比一下就知道哪里有被修改过。 这就是快照测试的基本理念，即：先保存一份副本文件，下次测试时把当前输出和上次副本文件对比就知道此次重构是否破坏了某些东西。

只不过 jest 的快照测试提供了更高级的功能：

自动创建把输出内容写到 .snap 快照文件，下次测试时可以自动对比
输出格式化的快照文件，阅读友好，开发者更容易看懂
当在做 diff 对比时，jest 能高亮差异点，而且对比信息更容易阅读
现在我们来看上面这个例子：

用例第一次执行时，把 baseElement 的结构记录到 Title.test.tsx.snap
等下次再执行，Jest 会自动对比当前 baseElement DOM 快照以及上一次 Title.test.tsx.snap 的内容
快照测试通过说明渲染组件没有变，如果不通过则有两种可能：

- 代码有 Bug。 本来好好的，被你这么一改，改出了问题
- 实现了新功能。 新功能可能会改变原有的 DOM 结构，所以你要用 jest --updateSnapshot 来更新快照

### 注意事项

- 避免大快照

  对于那种输出很复杂，而且不方便用 expect 做断言时，快照测试才算是一个好方法。 这也是为什么组件 DOM 结构适合做快照，因为 DOM 结构有大量的大于、小于、引号这些字符。如果都用 expect 来断言，expect 的结果会写得非常痛苦。 不过，需要注意的是：不要把无关的 DOM 也记录到快照里，这无法让人看懂。

- 合理使用快照。 快照测试不是只为组件测试服务，同样组件测试也不一定要包含快照测试。快照能存放一切可序列化的内容。

很多人喜欢把快照测试直接等于组件的 UI 测试，或者说快照测试是只用来测组件的。而事实上并不是！ Jest 的快照可不仅仅能记录 DOM 结构，还能记录 一切能被序列化 的内容，比如纯文本、JSON、XML 等等。

快照测试的适用场景：

- 组件 DOM 结构的对比
- 在线上跑了很久的老项目
- 大块数据结果的对比

```ts 

const getUserById = async (id: string) => {
  return request.get('user', {
    params: { id }
  })
}

// getUserById.test.ts
describe('getUserById', () => {
  it('可以获取 userId == 1 的用户', async () => {
    const result = await getUserById('1')
    expect(result).toMatchSnapshot();
  })
});
```

## `npm i -D @testing-library/jest-dom`

这种要判断 XXX 的东西，我们称之为 Matcher。 正好 @testing-library/jest-dom 这个库提供了很多关于 DOM 的 Matcher API

- 然后在 tests/jest-setup.ts 里引入一下 (setupFilesAfterEnv)

```ts 
// tests/jest-setup.ts
import '@testing-library/jest-dom'
```
- 同时，要在 tsconfig.json 里引入这个库的类型声明：

```json
{
  "compilerOptions": {
    "types": ["node", "jest", "@testing-library/jest-dom"]
  }
}
```
如果你的项目报了 Entry point of type library '@testing-library/jest-dom' specified in compilerOptions 这个错误， 可以按照 这个 [Issue](https://github.com/haixiangyan/jest-tutorial/issues/26)来修复。

