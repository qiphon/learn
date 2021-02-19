# react-hooks

## class 组件

必不可少的内容

```jsx
import React, { Component,PureComponent } from "react";

// `Component` always returns true.
// `PureComponent` implements a shallow comparison on props and state and returns true if any props or states have changed.
// 组件使用 PureComponent，页面使用 Component
// pureComponent 作用与 函数组件用 React.memo 包裹的效果一样
// const MemoFC = (({ name }: { name: string }) => {
//     console.log('render MemoFC')
//     return <div >
//         { name }
//     </div>
// })

class MemoFC extends React.PureComponent {
    render() {
        console.log('pure class render')
        return (
            <div className="memo">no memo
            这个组建需要使用 shouldComponentUpdate
                {this.props.name || 'no props name' }
            </div>
        )
    }
}
// class MemoFC extends React.Component {
//     shouldComponentUpdate(next) {
//         console.log(next)
//         if (this.props.name !== next.name) {
//             return true
//         }
//         return false
//     }
//     render() {
//         console.log('class render')
//         return (
//             <div className="memo">no memo
//             这个组建需要使用 shouldComponentUpdate
//                 {this.props.name || 'no props name' }
//             </div>
//         )
//     }
// }

// =============== 设置默认 props 值
class Greet extends Component {
    constructor(props){
        super(props)
    }
    // 控制组件渲染
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.color !== nextProps.color) {
            return true;
        }
        return false;
    }
    static defaultProps = {
        name: "普通Component组件", // 只有值为undefined的时候才会使用这个
    }
    render(){
        return return <h4 className="text-warning">Hello, { this.props.name }</h4>
        //  return '我是一个字符串组件 🚀!';
    }
}

// =========== react 16 之后生命周期的变动
class LifeTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            age: 1,
            name: 12,
        }
    }
    static defaultProps = {
        name: 'default name'
    }
    // rect16 之后替代 componentWillReceivedProps 的写法
    // 默认会重写调state中的同名key
    static getDerivedStateFromProps(nextprops = {}, state) {
        console.log(nextprops, 'getderivedstatefromprops', state)
        state.age = name ? name + 3 : 1
        return { ...LifeTest.defaultProps, ...nextprops, test: 'true' }
    }
    // 这个方法晚于 getDerivedStateFromProps, 
    // 能够拿到数据变动前的值, 做一些相应的动作
    // 不能在这里执行setState 动作
    getSnapshotBeforeUpdate(props, state) {
        console.log(props, state, 'getSnapshotBeforeUpdate')
        return null
    }
    componentDidUpdate() {
        console.log(this.props, this.state, 'componentDidUpdate')

    }
    render() {
        return (
            <div>
                {this.props.name }
                <p className="age">age { this.props.age }</p>
                <p className="age">name in state -- { this.state.name }</p>
                <p>test in props --- { this.state.test }</p>
            </div>
        )
    }
}

```

### 高阶组件 highOrderComponets

```jsx
// 入门
function hello() {
    console.log("🚀我是高阶组件")
}
function hoc(fn) {
    return () => {
        console.log("first");
        fn();
        console.log("end");
    }
}
const hocresult = hoc(hello);
hocresult();

//=========高阶组件的实战代码=====
import {Component} from 'react'
function HOCFactoryFactory(params){
    return function HOCFactory(WrappedComponent){
        return class HOC extends Component{
            render(){
                return <WrappedComponent  { ...{ ...params, ...this.props } } />
            }
        }
    }
}
//使用方式1 下面的组建必须是class
@HOCFactoryFactory({})
class WrappedComponent extends React.Component{}
//使用方式2 这种方式可以在 class/function 下使用
HOCFactoryFactory({}) (WrappedComponent)

```

### Portals 提供了一个顶级方法，使得我们有能力把子组建渲染到父组件 DOM 以外的DOM节点上

```jsx

// =========== portals 使用
function Portals() {
    return <div className="portals">
        我是 portals ，我被挂载在 body 上
    </div>
}
// 被我包裹的元素将挂载在body上面
function DoPortals(EL) {
    return () => (
        <>
            {
                ReactDOM.createPortal(<EL />, document.body)
            }
        </>
    )
}

const POR = DoPortals(Portals)

// usage
function Home (){
    return (
        <div>
            <h1>home portals test</h1>
            <POR />
        </div>
    )
}

```

### errorBoundary

react 中的异常捕获必须用类组建实现

```jsx
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  //捕捉错误和错误上报程序库一起使用
  componentDidCatch(err, info) {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong!</div>;
    }
    return this.props.children;
  }
}
class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {  };
    }
    render() {
      return <span>用户名：{this.state.user.push(1)}</span>
    }
  }

class Greeting extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Profile/>
      </ErrorBoundary>
    );
  }
}
export default Greeting;

```

### context 

```jsx
// ============== class xiefa
class Parent extends React.Component {
    state = {
        yideng: "普通字符串🍌",
        newContext: "京程一灯"
    };
    static childContextTypes = {
        value: PropTypes.string,
        yideng: PropTypes.string
    }
    getChildContext() {
        return {
            value: this.state.newContext,
            yideng: this.state.yideng
        };
    }
    changeVal(obj) {
        this.setState(obj)
    }
    render() {
        //    <React.Fragment> ==  <>
        return (
            <>
                <div>
                    <label className="text-warning">父节点=> newContext:</label>
                    <input
                        type="text"
                        value={ this.state.newContext }
                        onChange={ e => this.setState({ newContext: e.target.value }) }
                    />
                </div>
                <div>
                    <label className="text-info">父节点=>yideng:</label>
                    <input
                        type="text"
                        value={ this.state.yideng }
                        onChange={ e => this.setState({ yideng: e.target.value }) }
                    />
                </div>
                { this.props.children }
            </>
        );
    }
}

// 函数式组建接收 context
function Child(props, context) {
    console.log('render child', props, context)
    const [p, setp] = useState(1)
    return (
        <div>
            <p
                onClick={ _ => setp(p + 1) }
            >{ p }</p>
        </div>
    );
}
Child.contextTypes = {
    value: PropTypes.string,
    yideng: PropTypes.string
};

class Child2 extends React.Component {
    static contextTypes = {
        yideng: PropTypes.string
    };
    render() {
        console.log('render child2', this.props, this.context)
        return <p>字符串a: {this.context.yideng}</p>;
    }
}


// =========== 函数式写法
const { Provider, Consumer } = React.createContext("default");
class Parent extends React.Component {
    state = {
        yideng: "普通字符串🍌",
        newContext: "京程一灯"
    };
    changeVal(obj) {
        this.setState(obj)
    }
    render() {
        //    <React.Fragment> ==  <>
        return (
            <>
                <div>
                    <label className="text-warning">父节点=> newContext:</label>
                    <input
                        type="text"
                        value={ this.state.newContext }
                        onChange={ e => this.setState({ newContext: e.target.value }) }
                    />
                </div>
                <div>
                    <label className="text-info">父节点=>yideng:</label>
                    <input
                        type="text"
                        value={ this.state.yideng }
                        onChange={ e => this.setState({ yideng: e.target.value }) }
                    />
                </div>
                <Provider
                    value={ { newContext: this.state.newContext, yideng: "普通字符串🍌", changeVal: (obj) => this.changeVal(obj) } }
                >
                    { this.props.children }
                </Provider>
            </>
        );
    }
}

function Child(props, context) {
    console.log('render child', props, context)
    const [p, setp] = useState(1)
    return (
        <div>
            <p
                onClick={ _ => setp(p + 1) }
            >{ p }</p>
            <Consumer>
                { value => (
                    <>
                        { console.log(value) }
                        <p className="text-warning">子节点=> newContext: { value.newContext }</p>
                        <p
                            onClick={ () => value.changeVal({ ...value, newContext: value.newContext + '1' }) }
                        >click</p>
                    </>
                ) }
            </Consumer>
        </div>
    );
}

class Child2 extends React.Component {
    render() {
        console.log('render child2', this.props, this.context)
        return (
            <Consumer>
                {value => <p className="text-info">子节点=> yideng: { value.yideng }</p> }
            </Consumer>
        );
    }
}


// ============= 使用 useContext
const Store = createContext("default");

class Parent extends React.Component {
    state = {
        yideng: "普通字符串🍌",
        newContext: "京程一灯"
    };
    changeVal(obj) {
        this.setState(obj)
    }
    render() {
        return (
            <>
                <div>
                    <label className="text-warning">父节点=> newContext:</label>
                    <input
                        type="text"
                        value={ this.state.newContext }
                        onChange={ e => this.setState({ newContext: e.target.value }) }
                    />
                </div>
                <div>
                    <label className="text-info">父节点=>yideng:</label>
                    <input
                        type="text"
                        value={ this.state.yideng }
                        onChange={ e => this.setState({ yideng: e.target.value }) }
                    />
                </div>
                <Store.Provider
                    value={ { newContext: this.state.newContext, yideng: "普通字符串🍌", changeVal: (obj) => this.changeVal(obj) } }
                >
                    { this.props.children }
                </Store.Provider>
            </>
        );
    }
}

// useContext 会让整个函数重新渲染
function Child(props, context) {
    console.log('render child', props, context)
    const contexts = useContext(Store)
    const [p, setp] = useState(1)
    return (
        <div>
            <p
                onClick={ _ => setp(p + 1) }
            >{ p }</p>
            <p>
                context ---
                { contexts.newContext }
            </p>
        </div>
    );
}

// 类组件中无法使用usecontext！！！
class Child2 extends React.Component {
    render() {
        console.log('render child2', this.props, this.context)
        return (
            <Store.Consumer>
                {
                    value =>
                        <p className="text-info"
                            onClick={ e => value.changeVal({ ...value, newContext: value.newContext + '12' }) }
                        >子节点=> yideng: { value.yideng }</p>
                }
            </Store.Consumer>
        );
    }
}


```

### unstable_batchedUpdates

unstable_batchedUpdates 可以合并多个异步中的setState，减少重复渲染次数

```jsx
import { unstable_batchedUpdates } from "react-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        // 记录 render 的执行次数
        this.renderCount = 0;
    }
    fn1 = () => {
        this.setState({ a: Math.random() });
        this.setState({ b: Math.random() });
    };
    fn2 = () => {
        // 模拟一个异步操作，真实业务里面可能是网络请求等
        setTimeout(() => {
            this.setState({ a: Math.random() });
            this.setState({ a: Math.random() });
        }, 0);
    };
    fn3 = () => {
        // 模拟一个异步操作，真实业务里面可能是网络请求等
        setTimeout(
            unstable_batchedUpdates(() => {
                this.setState({ a: Math.random() });
                this.setState({ a: Math.random() });
            }),
            0
        );
    };
    render() {
        console.log(this.renderCount, 'render')
        ++this.renderCount;
        return (
            <div>
                <h1>截止到目前 render 执行次数{ this.renderCount }</h1>
                <button onClick={ this.fn1 }>同步的 setState 两次</button>
                <br />
                <button onClick={ this.fn2 }>在一个异步的事件循环里 setState 两次</button>
                <br />
                <button onClick={ this.fn3 }>
                    在一个异步的事件循环里 setState 两次, 但是使用
                    ReactDOM.unstable_batchedUpdates 强制 batch
          </button>
            </div>
        );
    }
}
```

## [hooks](https://reactjs.org/docs/hooks-reference.html)

[useState](https://reactjs.org/docs/hooks-reference.html#basic-hooks)

useContext 上面已经有实例

useReducer

[useRef/forwardRef 见文档](https://reactjs.org/docs/hooks-reference.html#useref)

```jsx
const TargetComponent = React.forwardRef((props, ref) => (
  <input type="text" ref={ref} />
))

export default class Comp extends React.Component {
  constructor() {
    super()
    this.ref = React.createRef()
  }

  componentDidMount() {
    this.ref.current.value = '转发ref成功🍺'
  }

  render() {
    return <TargetComponent ref={this.ref} />
  }
}
// 函数组建写法
function RefTest() {
    let childref = React.useRef()
    React.useEffect(() => {
        childref.current.value = '转发ref成功🍺 -- fc'
    })
    return (
        <div>
            <TargetComponent ref={ childref } />
        </div>
    )
}

```

useImperativeHandle

```jsx
const ContextComp = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    method() {
      console.log("ref方法执行");
    }
  }));

  return <p>子组件</p>;
});

export default function App() {
  const ref = useRef();
  useEffect(() => {
    console.log("component update");
    ref.current.method();
    return () => {
      console.log("unbind");
    };
  }, []);
  return (
    <>
      <ContextComp ref={ref} />
    </>
  );
}

```

useLayoutEffect/useEffect

useCallback  `useCallback will return a memoized version of the callback that only changes if one of the inputs has changed.`

```jsx
const Counter = memo(props => {
    console.log("counter 组件渲染", props);
    return <h1 onClick={ props.click }>click me</h1>;
});

// 也可以将 click 函数写在组建外面，这样也不会引起
// 子组件重复渲染
const click = cb => cb()

function App() {
    const [count, setCount] = useState(0);
    const click = useCallback(() => {
        console.log(count, 'count')
        return setCount(count + 1)
    }, []);
    // useCallback 的依赖项最好不要写，
    // 不然会引起子组件的重新渲染

    const click = useMemo(() => {
        console.log(count, 'count')
        return () => {
            return setCount(count + 1)
        }
    }, [count]);
    // useCallback 的功能可以用useMemo 来实现，
    // 但是这样useMemo 的第二个依赖项就必须要写
    // 并且useMemo 中打印出来的值是处理过后的值
    // 这种方式下即使子组件用memo包裹，子组件仍会重新渲染
    console.log('app 渲染')
    return (
        <>
            <span>{ count }</span>
            <input
                type="button"
                onClick={ () => setCount(count + 1) }
                value="修改count"
            />
            <Counter click={ click } />
        </>
    );
}
```

useMemo `useMemo` will only recompute the memoized value when one of the `deps` has changed.

useDebugValue 

memo 

```jsx
const MemoTest = ({ test }) => {
    console.log('memo render')
    return (
        <div>
            {
                test.map(t => <span>{ t }</span>)
            }
        </div>
    )
}
// 自定义组建重新渲染条件， 如果没有定义，react也会自动比较
let MemoCom = React.memo(MemoTest, areEqual)
// 自己定义组建重新渲染的条件
function areEqual(prevProps, nextProps) {
    if (prevProps.test === nextProps.test) {
        return true;
    } else {
        return false;
    }
}

const Home = () => {
    const [b, setb] = React.useState([1, 2])
    const [a, seta] = React.useState(1)
    return (
        <div
            className={ st.home }
        >
            <div
                className={ st.weight }
                onClick={
                    ev => seta(a + 1)
                }
            >weight-- { a }</div>

            <span className="name"
                onClick={ (e) => {
                    // 获取元素事件中的值
                    // e.persist()
                    // console.log(e)
                    setb([...b, 22])
                } }
            >name</span>
            <MemoCom test={ b } />
        </div>
    )
}

// ========= 使用 useMemo 缓存一个值，和useState 的功能类似
// 缓存的值不能单独使用还是要结合 useState
// 不同的是useMemo 的第二个参数可以是一个依赖的项，
// 也可以是一个判断条件
const Counter = memo(props => {
    console.log("组件渲染");
    return <h1>{ props.data }</h1>;
});

function App() {
    const [count, setCount] = useState(0);
    const double = useMemo(() => {
        console.log(count, 'count')
        return count * 2;
        // }, [count === 5]);
    }, [count]);
    const data = "京程一灯";
    return (
        <>
            <span>{ double }</span>
            <input
                type="button"
                onClick={ () => setCount(count + 1) }
                value="修改count"
            />
            <Counter data={ data } />
        </>
    );
}
```

useContext 

- 多层 provider 容易出现冲突，要写多个provider

fiber 


suspense + lazy

```jsx
const { lazy, Suspense } = React
//动态加载组件
const LazyComp = lazy(() => import("../notfound/notfound"));

<Suspense
    fallback={
        <div className="text-danger">
            loading<i />
        </div>
    }
>
    <LazyComp />
</Suspense>
```