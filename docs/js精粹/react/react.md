# react 源码

### 文件结构

```
|--packages
|
|
|
|
|

```

### reactDom

```jsx
ReactDom.render(
    <App />, 
    document.getElementById('#app'), 
    ()=>{
        // 处理render之后的逻辑
        // 只会触发一次
    }
)
```

### `React.createElement(type, config, children)`

- 取出 key 、ref
- 得到 children 数组
- 创建一个reactElement

```jsx

```

### React.children.map

```jsx
[1,2,3].map(item => <div></div>)

// 对错误数据做了判断 undefined 、 null
// 展开数组
// 迭代器也可以支持输出
React.children.map([1,2,3], item => {
    return <div></div>
})
```

### react fiber 

fiber 解决的问题

1. react16之前的调度算法，采用自顶向下递归，更新整个子树，这个过程不可打断，不可取消，如果子树特别大，主线程一直被占用，
会造成页面掉帧，卡顿
2. react 16 退出 fiber 调度，分为 2 阶段，一个是 reconciliation 阶段，另一个是 commit 阶段；
在 reconciliation 阶段：fiber 在执行过程中以fiber 为基本单位，每执行完一个 fiber，都会有一个询问是否有优先级更高的任务，
如果有优先级高的任务进来，就中断当前执行，先执行优先级高的任务。这个阶段会进行 dom diff，生成 workInProgressTree,
并标记好所有的 side effect

    - 数值结构编程链表结构
    - 任务 + 过期时间 / 优先级
    - reconciliation 可以被打断

### reactDom.render

```js
Root: {
    _rezct
}

RootType: {

}

FiberRoot: {

}

FiberNode: {

}
```



### 常见 react 面试题


### hooks 源码分析

1. 为什么会有 hooks ？

    - class 组件代码量大，方法需要绑定 this
    - 无状态组件 `function Child(){}` 如果后续需要 state了，非常不方便

    - hooks 可以让 函数组件 使用 state
    - 可以模拟大部分生命周期
    - 可以让代码更简洁

2. hooks 使用方法

    - memo + callback 解决组件整体渲染问题
    - useEffect  灵活使用，包含 didmount、willMount、didUpdate(容易出现死循环)、willReceiveProps 
        - 死循环的解决方式 
            ```jsx
            useEffect(()=>{
                fetch('xxx').then(res => {
                    // 不能这么写
                    // setCount(count + 1)
                    // 正确使用方法，不然获取到的值会慢一拍，会拿到最新的 count
                    setCount((count)=>{
                        return count + 1
                    })
                    // 或者使用 ref 替换
                })
            }, [])
            ```
        - 第二个参数中的依赖用到就要加，不然取不到最新的值
    - useCallback 缓存函数、useMemo 缓存值

    ```jsx
    class Child extends PureComponent {
        state ={
            count: 0
        }
        render(){
            <div
                onclick={
                    _ => this.setState({
                        count: this.state.count +1
                    })
                }
            >{this.state.count}</div>
        }
    }
    // 改造后

    const App = () => {
        const [count, setCount] = useState(0)
        const [name, setName] = useState('yideng')
        // 只有依赖变化时，才会重新创建，否则就用之前的
        // 子组件使用memo 包裹
        const changeCount = useCallback((val){
            setCount(val)
        }, [count])

        // useEffect
        // 1. 依赖数组为空 相当于 didmount
        // 2. 不为空，相当于 didupdate
        // 3. useEffect 中 return一个函数相当于 willunmount
        // 可以替代 willReceiveProps
        useEffect(()=>{
            // 如果不写依赖，每次都会执行
        })
        useEffect(()=>{
            // componentWillUnmount
            return () => {

            }
        }, [])
        useEffect(()=>{

        }, [count])
        // 替代 willreceiveProps
        useEffect(()=>{

        }, [props.name])

        return (
            <div
                onclick={ changeCount(count++) }
            >
                {count}
                <Child changeCount={changeCount} />
            </div>
        )
    }
    const Child = memo(({changeCount})=> {

    })

    // useRef 
    // const ref = useRef(0)
    ```
3. 源码实现

    - useState （1. mountState 2. 执行 dispatch 3. updateState）
        - MountState<s> 第一次执行函数体时执行

            - 默认值是 function 就执行，得到初始 state
            - state 存放在 memorize
            - 新建一个 queue
            - 把 queue 传给 dispatch
            - 返回默认值 和 dispatch

        - updateState<s> 之后使用的函数 

    - useEffect 
        - MountEffect

        - updateEffect
        

#### 所有的hooks

- useState

- useEffect

- useContext

- useReducer

- useCallback

- useMemo

- useRef

- useImperativeHandle

- useLayoutEffect

- useDebuggerValue