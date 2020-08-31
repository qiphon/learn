# react

## class 组件

必不可少的内容

```jsx
import React, { Component,PureComponent } from "react";

// `Component` always returns true.
// `PureComponent` implements a shallow comparison on props and state and returns true if any props or states have changed.
// 组件使用 PureComponent，页面使用 Component

// 设置默认 props 值

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
        name: "普通Component组件"
    }
    render(){
        return return <h4 className="text-warning">Hello, { this.props.name }</h4>
        //  return '我是一个字符串组件 🚀!';
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

## [hooks](https://reactjs.org/docs/hooks-reference.html)

useState

useContext

useReducer

useRef

useLayoutEffect/useEffect

useImperativeHandle

useCallback  `useCallback will return a memoized version of the callback that only changes if one of the inputs has changed.`

useMemo `useMemo` will only recompute the memoized value when one of the `deps` has changed.

useDebugValue 

memo 无法监控数组 （初级优化）

useContext 

- 多层 provider 容易出现冲突，要写多个provider

fiber 


suspense + lazy
