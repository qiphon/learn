# react 源码 

y3yrvboh5g.feishu.cn/docs/doccnUisBKibPQolObhVUsKqNVg#6QSsH8

[卡颂React](https://www.bilibili.com/video/BV1Ki4y1u7Vr)
[教你实现自己的react](https://pomb.us/build-your-own-react/)

- React 15 （架构是递归的，一个长任务会阻塞用户的后续交互，会卡顿）

    Reconciler 找出变化的组件
    Renderer   dom-diff 变化的组件，渲染更新

    存在的问题： diff 过程不可打断，影响用户操作。

- React 16 (Fiber 架构，异步调度任务会在宏任务中执行，这样可以保证不会让用户失去响应)

    React 16 对所有的更新都绑定一个优先级。当存在多个更新同时需要处理时，可以中断低优先级的更新，先执行高优先级的任务。
    新增了 Schedule 模块，用来调度任务的优先级。

    - Schedule 调度，调整优先级 -> 小顶堆
    - render   协调，找到更新的内容 reconciliation -> dfs 单项链表 lane 模型 二进制
    - commit   渲染

    ```
            App
      child  ⇵  return
            div
        -----------------------------------↑ return   
      child  ⇵  return                     ↑
           span1  ---------------------> span2
                        siblings
                                    child  ⇵  return

                                          Text

    # 当 span2 发起了一个优先级为 c 的更新，
    ```
### setState 是异步吗？

- legacy 模式下，batchupdate 属于异步，非batchupdate 同步
- concurrent 模式下都是异步

## 文件结构

```
|--packages
|
|
|
|
|

```

### 16 - 17 生命周期变化

#### 16

- componentWillReceiveProps
- componentWillMount
- componentWillUpdate

#### 17 

- [getDerivedStateFromProps(props, state)](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops)
    [use case](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state)

    getDerivedStateFromProps is invoked right before calling the render method, both on the initial mount and on subsequent updates. It should return an object to update the state, or null to update nothing.
    在组件 mount、didupdate 前执行，返回新的 state 或者 null

- [getSnapshotBeforeUpdate](https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)

    getSnapshotBeforeUpdate() is invoked right before the most recently rendered output is committed to e.g. the DOM. It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. Any value returned by this lifecycle method will be passed as a parameter to componentDidUpdate().
    当组件更新的commit 被执行前运行，可以在这时拿到 dom 的更新前状态。这个生命周期的返回值将会以参数形式传递给 didupdate
    `componentDidUpdate(prevProps, prevState, snapshot)`
    
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
ReactElement.js
// This tag allows us to uniquely identify this as a React Element
// 表示 Element 类型，Symbol，通过 Symbol 可以避免一些可能的 XSS 注入
// JSON.stringify 不支持转义 Symbol
$$typeof: REACT_ELEMENT_TYPE,
```

### React.children.map

```jsx
[1,2,3].map(item => <div></div>)

// 对错误数据做了判断 undefined 、 null
// 展开数组 [1,[2]]
// 迭代器也可以支持输出
React.children.map([1,2,3], item => {
    return <div></div>
})
```

### react fiber 

fiber 解决的问题

1. react16之前的调度算法，采用自顶向下递归，更新整个子树，这个过程不可打断，不可取消，如果子树特别大，主线程一直被占用，
会造成页面掉帧，卡顿
2. react 16 推出 fiber 调度，分为 2 阶段，一个是 reconciliation 阶段，另一个是 commit 阶段；
在 reconciliation 阶段：fiber 在执行过程中以fiber 为基本单位，每执行完一个 fiber，都会有一个询问
是否有优先级更高的任务，如果有优先级高的任务进来，就中断当前执行，先执行优先级高的任务。这个阶段会进行 
dom diff，生成 workInProgressTree,并标记好所有的 side effect
    - 数组结构编程链表结构
    - 任务 + 过期时间 / 优先级
    - reconciliation 可以被打断，不会渲染到页面上。commit阶段不能被打断，一次执行完。

3. commit 阶段，处理所有的 side effect，执行更新，这个阶段不能打断。


### [reactDom.render](https://zh-hans.reactjs.org/docs/concurrent-mode-adoption.html)

1. reactDom.render 整个流程大致做了些什么？

    1.1 react的 3 种启动方式。

        - legacy 模式： ReactDOM.render(<App />, rootNode)。这是当前 React app 使用的方式。当前没有计划删除本模式，但是这个模式可能不支持这些新功能。

        - blocking 模式： ReactDOM.createBlockingRoot(rootNode).render(<App />)。目前正在实验中。作为迁移到 concurrent 模式的第一个步骤。

        - concurrent 模式： ReactDOM.createRoot(rootNode).render(<App />)。目前在实验中，未来稳定之后，打算作为 React 的默认开发模式。这个模式开启了所有的新功能。

    1.2 创建 Root、ReactRoot、FiberRoot、FiberNode

        - 他们之间的关系

        ```js
        Root: {
            _reactRootContainer: FiberRoot
        }

        FiberRoot: {
            // 当前应用对应的 Fiber 对象
            current: uninitializedFiber | FiberNode
            // Root 节点
            containerInfo: containerInfo
            // 指向已经完成准备工作的 Fiber tree Root，在 commit 阶段处理
            finishedWork: null  // fiber 链表结构
            // 过期时间 -> 优先级相关
            expirationTime: NoWork
        }

        FiberNode: {
            // FiberNode 的类型
            this.tag = tag
            // dom 
            this.ref = null
            // 新的 props
            this.penddingProps = penddingProps
            // old props
            this.memorizedProps = null
            // 更新队列，队列内放着即将发生变更的状态
            this.updateQueue = null
            // 表示经过所有流程处理后的当前的 state
            this.memorizedState = null

            // 更新类型： update、delete、replace 
            this.effectTag = NoEffect
            // 下一个将要处理的 effect
            this.nextEffect = null
            // 第一个要处理的 effect
            this.firstEffect = null
            this.lastEffect = null
            // 过期时间 -> 优先级相关
            this.expirationTime = NoWork
            // 子Fiber中优先级最高的
            this.childExpirationTime = NoWork
            // 连接上一个状态的Fiber，储存了之前的对象
            this.alternate = null
        }
        ```

```js
/** 
 * 1. 创建 ReactRoot 在 dom 元素上挂载 FiberRoot
 * 2. 调用 unbatchUpdate 非批处理
 * 3. 调用 updateContainer
*/
render ->
function legacyRenderSubtreeIntoContainer(
  parentComponent: ?React$Component<any, any>,
  children: ReactNodeList,
  container: Container,
  forceHydrate: boolean,
  callback: ?Function,
) {
```

### 常见 react 面试题


### hooks 源码分析

1. 为什么会有 hooks ？

    - class 组件代码量大，方法需要绑定 this
    - 无状态组件 `function Child(){}` 如果后续需要 state了，非常不方便

    - hooks 可以让 函数组件 使用 state
    - 可以模拟大部分生命周期 useEffect

        - 容易出现死循环， 解决方案 ref、setCount((count)=> count + 1)
        - 依赖用到就要加，不然会出现获取不到最新的值
        - useEffect 不能不写依赖，不然每次渲染都会执行

    - 可以让代码更简洁

2. hooks 使用方法

    - memo + callback 解决组件整体渲染问题（建议非根组件都使用memo包裹）

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
        // 子组件使用memo 包裹，防止父组建更新子组建也会同步更新
        // useCallback 会增加比较大的内存占用，谨慎使用
        const changeCount = useCallback((val)=>{
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
            // 相当于 componentDidMount
            //  return 在 componentWillUnmount 时触发
            return () => {

            }
        }, [])
        useEffect(()=>{
            // componentDidUpdate
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

    // useRef 设置一个长期存在的值
    const ref = useRef(0)
    ref.current = 10
    ```

3. 源码实现

    - useState （1. mountState 2. 执行 dispatch 3. updateState）
        - `MountState<s>` 第一次执行函数体时执行

            - 默认值是 function 就执行，得到初始 state
            - state 存放在 memorize
            - 新建一个 queue
            - 把 queue 传给 dispatch
            - 返回默认值 和 dispatch

        - `updateState<s>` 之后使用的函数 

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