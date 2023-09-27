# jest 环境搭建

- 安装 `npm install --save-dev jest`
- 生成配置文件 `npx jest --init`

  ```sh 
  The following questions will help Jest to create a suitable configuration for your project

  ✔ Would you like to use Jest when running "test" script in "package.json"? … no
  ✔ Would you like to use Typescript for the configuration file? … yes
  ✔ Choose the test environment that will be used for testing › jsdom (browser-like)
  ✔ Do you want Jest to add coverage reports? … yes
  ✔ Which provider should be used to instrument code for coverage? › babel
  ✔ Automatically clear mock calls, instances, contexts and results before every test? … yes

  📝  Configuration file created at Desktop/jest-test/jest.config.ts
  ```
- 生成报告 `jest --coverage`


### [匹配器](https://jestjs.io/docs/expect#matchers)

- `toBe()` 相当于 `===`
- `toEqual()` 用于比较值相等，可以用来比较对象
- `toBeNull()` null 匹配器
- `toBeUndefined`
- `boBeDefined` 只有不是undefined 就是true
- `toBeTruthy`  
- `toBeFalsy`  0 false   
- `toBeGreaterThen`  大于   
- `toBeGreaterThenOrEqual`  大于 等于   
- `toBeLessThen`  小于   
- `toBeCloseTo`  用于比对 0.1 + 0.2 =0.3 这种问题
- `toMatch`  用于比对字符串
- `toContain`  用于 array, 相当于 indludes，但是它还能匹配 `Set([])`
- `toThrow`  用于匹配错误
- `not`  用于匹配相反结果 `expect(1+1).not.boBe(4)`

### Es6+ 支持 

- bable-jest  需要项目中有 babel 、babel-preset 
- [ts-jest](https://www.npmjs.com/package/ts-jest)   需要 ts-node 

### 钩子函数

- beforeAll 所有测试用例执行之前
- afterAll 所有测试用例执行之前
- beforeEach  执行每个测试用例之前
- afterEach  执行每个测试用例之前

### 测试用例分组


```ts 
// 基础写法
test('toBeCloseTo adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBeCloseTo(3);
});
// 使用 describe 分组
describe('分组1 ', () => {
  test('toBeCloseTo adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBeCloseTo(3);
  });
  test('toBeCloseTo adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBeCloseTo(4);
  });

})


```

钩子函数的作用域

- 钩子函数作用在父级，可影响子集。类似继承
- 钩子函数分组作用域隔离
- 先执行外部钩子函数，再执行内部钩子函数