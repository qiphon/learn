# react 中常用的 ts 类型

### props 中常用的类型

```jsx
import React, { ReactChild, ReactChildren, ReactNode } from "react";

type props = {
  onClick: (event: MouseEvent) => void;
  // 通常这样的写法较少
  onChange: React.FormEventHandler<HTMLInputElement>;
  // 类型
  children1: JSX.Element | JSX.Element[];
  // 这个不是类型，是实用程序
  children2: ReactChildren;
  // 接受子数组
  children3: ReactChild[];
  // 相对来说比较好的方式
  children4: ReactNode;
  // css in js
  style?: React.CSSProperties;

  // props 明确不转发 ref
  props1: React.ComponentPropsWithoutRef<"button">;
};

```

### 函数声明时的type

```jsx
type FnProps = {
  message: string;
};
// 默认就相当于 React.FC
const App1 = ({ message }: FnProps) => <div>{message}</div>;
// React.FC 会注入 children
const App2: React.FC<FnProps> = ({ message, children }) => (
  <div>
    {message}
    <div>{children}</div>
  </div>
);
// React.VFC 不会注入 children
const App3: React.VFC<FnProps> = ({ message }) => <div>{message}</div>;

```

### hook 中的 types

#### useReducer

```jsx
import React, { useReducer } from "react";

const initState = { count: 0 };

type Actions =
  | {
      type: "increment";
      payload: number;
    }
  | {
      type: "decrement";
      payload: string;
    };

const reducer = (state: typeof initState, action: Actions) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + action.payload };
    case "decrement":
      return { ...state, count: state.count - +action.payload };
    default:
      return { ...state };
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <div className="App">
      <header className="App-header">{state.count}</header>
      <div
        className="add"
        onClick={() => dispatch({ type: "increment", payload: 3 })}
      >
        add 3
      </div>
      <div
        className="reduce"
        onClick={() => dispatch({ type: "decrement", payload: "2" })}
      >
        reduce 3
      </div>
    </div>
  );
}

export default App;

```

### ref

```jsx
// 声明不为 null 的 ref （但是你必须保证这个值是有的，避免使用，防止埋下坑）
const ref = React.useRef<HTMLElement>(null!);
```

### forwardRef & useImperativeHandle

```jsx
import React, { useReducer, ReactChildren, ReactNode } from "react";

type Props = {
  message?: string;
};
const App = React.forwardRef<{ get?: () => string }, Props>(
  ({ message }, ref) => {
    React.useImperativeHandle(ref, () => ({
      get: () => "you are get",
    }));
    return <div className="App">react - {message ?? ""}</div>;
  }
);

export default App;

```


### defaultProps & 使用其它组件的 props

```jsx
import React, { useReducer, ReactChildren, ReactNode } from "react";

const defaultProps = { message: "default msg props", age: 23 };

type Props = {
  message?: string;
  age: number;
};

const App = ({ message }: Props) => {
  return (
    <div className="App">
      react - {message}
      <div>
        <App2></App2>
        <App3></App3>
      </div>
    </div>
  );
};
App.defaultProps = defaultProps;

// ------------- 使用其它组件的 props

// 利用 partial 将所有参数变为可选
const App2 = ({ message, age }: Partial<React.ComponentProps<typeof App>>) => {
  return <div>{message}-- message</div>;
};

// 利用 infer
type ComponentType<T> = T extends
  | React.Component<infer P>
  | React.ComponentType<infer P>
  ? JSX.LibraryManagedAttributes<T, P>
  : never;
const App3 = ({ message }: ComponentType<typeof App>) => (
  <div>app3 --- {message}-- message</div>
);

export default App;


```

### form 表单中使用的类型 event

```jsx

import React, { useReducer, ReactChildren, ReactNode } from "react";

const defaultProps = { message: "default msg props", age: 23 };

type Props = {
  message?: string;
  age: number;
};

const App = ({ message }: Props) => {
  /**
   * 当不清楚一个事件的具体类型的时候，可以鼠标放在赋值前的事件上，去粗 handler 之后差不多就是对应的事件
   * ChangeEventHandler -->  React.ChangeEvent<HTMLInputElement>
   * 或者赋值一个错误的类型，便可以在报错中查看到真正的类型
   * Type 'ChangeEvent<HTMLInputElement>' is not assignable to type 'number'.
   *
   * 当测试后不正确时可以使用 React.FormEvent<HTMLInputElement> 这个包含的事件比较多
   * React.SyntheticEvent<HTMLInputElement> 这个是 react 的合成事件，这 2 个都是不推荐使用的
   */
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };
  return (
    <div className="App">
      react - {message}
      <div>
        <input type="text" onChange={inputChange} />
      </div>
    </div>
  );
};
App.defaultProps = defaultProps;

export default App;


```