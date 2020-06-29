# redux 

1. redux/react  自身良好的架构、先进的理念，加上一系列优秀的第三方插件的支持，是 react/redux 成功的关键所在
2. 可以将 react 看作输入为 state，输出为 view 的 ”纯“ 函数
3. 范畴论将世界抽象为对象和对象之间的联系，redux 将所有事件抽象为 action
4. container 中含有 value 和 map 两个属性，而修改 value 的方式只有 map，在操作玩value 后将新值放回container中

```js
// 如何操作或修改 value 由 f 给出
store -> container 
currentState -> __value
action -> f
currentReducer -> map
middleware -> IO functor (解决异步操作的各种问题)
```
5. store 是一个容器含有 state 和 reducer

    > reducer 是一个纯函数，它可以查看之前的状态，执行一个action并返回一个新的状态

    这从 store 的创建语句 enhancer(createStore)(reducer, preloadState) 可以很明显的得出。而修改state中的
    currentState 的唯一方式就是使用 currentReducer，并且 currentState 在修改完后将新值依然存放在 store 内

###　如何修改　currentState 是根据用户操作 action

1. applayMiddleware.js 使用自定义的 middleware 来扩展 redux
2. bindActionCreators.js 把 actioncreators 转成拥有同名 keys 的对象，使用时可以直接调用
3. combineReducers.js 一个比较大的应用，需要对 reducer 函数进行拆分，拆分后的每一块独立负责管理 state 的一部分
4. compose.js 从右到左来组合多个函数，函数编程中常用到
5. createStore.js 创建一个 redux Store 来放所有的 state
6. utils/warning.js 控制台输出一个警告 （可以不看）
7. React 可以看作纯函数固定的输入输出组件

###　redux store 的基础

store 是一个单一对象：

- 管理应用的state
- 通过 store.getState() 可以获取 state
- 通过 store.dispatch(action) 来触发 state 更新
- 通过 store.subscribe(listener) 来注册 state 变化监听器
- 通过 `createStore(reducer, [initState])` 创建

### react-redux 原理

Provider 其实就是一个外层容器，他的作用就是通过配合 connect 来达到跨层级传递数据。使用时只要将Proveder 定义为一个项目最外层的组件，并设置好 store。
那么整个项目都可以直接获取这个store。它的原理其实是通过 React 中的 Context 来
实现的。大致核心代码如下

```jsx
import React, {Component} from 'react'
import { PropTypes } from 'prop-types'

export default class Provider extends Component {
    getChildContext(){
        return { store: this.props.store }
    }
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return this.props.children
    }
}

Provider.childContextTypes = {
    store: PropTypes.object
}

```

- connect 的作用是连接 React 组件与 Redux store,它包在我们的容器组件的外一层，
它接收上面的 Provider 提供的 store 里面的 state 和 dispatch，传递给一个构造
函数，返回一个对象，以属性形式传递给我们的组件。一共有 4个参数：

    ```jsx
    // connect 主要逻辑
    import React, {Component} from 'react'
    import { PropTypes } from 'prop-types'

    const connect = (mapStateToProps, mapDispatchToProps) => (
        WrappedComponent => {
            class Connect extends Component {
                constructor(props){
                    super(props)
                    this.state ={}
                }
                componentWillMount(){
                    this.unSubscribe = this.context.store.subscribe(()=>{
                        this.setState(mapStateToProps(this.context.store.getState()))
                    })
                }
                componentWillUnmount(){
                    this.unSubscribe()
                }
                render(){
                    return <WrappedComponent 
                        {...this.state} 
                        {...mapDispatchToProps(this.context.store.dispatch)}
                    />
                }
            }
            Connect.contextTypes = {
                store: PropTypes.object
            }
            return Connect
        }
    )

    export default connect

    ```

    - mapStateToProps

        将store 里面的 state（数据源） 绑定到组件的 props中，
    - mapDispatchToProps

        将 store 中的 action （操作数据的方法）绑定到指定都 props 中
    - mergeProps（一般用不到）
    - options（一般用不到）



### flux 

- react 本身只是涉及 UI 层，如果搭建大型应用，必须搭配一个前端框架
- flux 是一种架构思想，专门解决软件的结构问题。他跟 MVC 架构是同一类东西，但是更加简单和清晰。
- view 视图层
- action（动作）：视图层发出的消息（比如 mouseClick）
- Dispatcher(派发器): 用来接受actions，执行回调函数
- Store （数据层）：用来存放应用的状态，一旦发生变动，就提醒 views 要更新页面

    ```
                        ⇓--------- ACTION <----⇑
                        ⇓                      ⇑
    ACTION  --->  DISPATCHER  ---> STORE ---> VIEW
    ```
    1. 用户访问 view 
    2. view 发出用户的action
    3. dispatcher 收到 action，要求 store 进行相应的更新
    4. Store 更新后，发出一个change 事件
    5. View 收到 ”change“事件后，更新页面 

