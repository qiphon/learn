# [react 测试方法](https://www.npmjs.com/package/@testing-library/react)

- 下载测试依赖

```sh
yarn add react

yarn add @testing-library/react react-scripts -D

```

- 写一个测试的 react 组件

```jsx
import React from 'react'

export const App = ()=> <div>
    <h1 data-testid="js-h1">react test</h1>
    <ul
        data-testid="js-ul"
    >
        <li>js</li>
        <li>html</li>
    </ul>
</div>

```

- 写一个测试用例

```js
// jest
import React from 'react'
import App from '../src/index'
import { render, cleanup, fireEvent } from '@testing-library/react'

afterEach(cleanup)

describe('react-unit-test', function(){
    it('index 测试', function(){
        const { getByTestId } = render(<App />)
        const [ ul, nav ] = [getByTestId('js-ul'), getByTestId('js-h1')]
        expect(ul.children.length).toBe(2)
        expect(nav.textContent).toContain('react')
    })
})

```