# [recoil](https://recoiljs.org/zh-hans/docs)

## 快速上手

装包 `pnpm i recoil`

创建数据仓库 

```tsx
// src/store/index.ts 
import { atom } from "recoil";

export const todos = atom({
  default: [1, 2, 3],
  key: "todos",
});
```

使用 root 组件，要求放置在你要使用 store 数据的上级节点，可以直接放置在最顶层

```tsx 
// src/index.tsx 

import { Component, PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";
import "./app.less";

class App extends Component<PropsWithChildren> {
  render() {
    return <RecoilRoot> {this.props.children}</RecoilRoot>;
  }
}

export default App;

```

使用

```tsx 
const [todo, setTodo] = useRecoilState(todos);
```

错误捕获

```tsx 
<RecoilRoot>
  <ErrorBoundary>
    <React.Suspense fallback={<div>加载中……</div>}>
      <CurrentUserInfo />
    </React.Suspense>
  </ErrorBoundary>
</RecoilRoot>
```

learn steps

- overview  
- atoms 
- selector 
- families 
- state persistence 
- suspense 
- concurrent mode 
- state observation 
- performance 
- testing 

## API

### atom 创建相应数据

```tsx 
export const todos = atom({
  default: [1, 2, 3],
  key: "todos",
});
```

#### 查询默认 Atom 值

常见的模式是使用一个 atom 来代表本地可编辑的状态，但使用一个 selector 来查询默认值。

```tsx 
const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: selector({
    key: 'CurrentUserID/Default',
    get: () => myFetchCurrentUserID(),
  }),
});
```

### selector 

selector 数据可同步，可异步，可缓存。(selector 的计算可能被缓存、重启或多次执行)

#### 同步示例

```tsx 
const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: 1,
});

const currentUserNameState = selector({
  key: 'CurrentUserName',
  get: ({get}) => {
    return tableOfUsers[get(currentUserIDState)].name;
  },
});

function CurrentUserInfo() {
  const userName = useRecoilValue(currentUserNameState);
  return <div>{userName}</div>;
}

function MyApp() {
  return (
    <RecoilRoot>
      <CurrentUserInfo />
    </RecoilRoot>
  );
}
```

#### 异步示例 

```tsx 
const currentUserNameQuery = selector({
  key: 'CurrentUserName',
  get: async ({get}) => {
    const response = await myDBQuery({
      userID: get(currentUserIDState),
    });
    return response.name;
  },
});

function CurrentUserInfo() {
  const userName = useRecoilValue(currentUserNameQuery);
  return <div>{userName}</div>;
}
```

由于 React 的渲染函数是同步的，在 Promise 解决之前，它将渲染什么？Recoil 的设计配合 React Suspense 处理待定 (pending) 数据。如果用 Suspense 边界包裹你的组件，会捕捉到任何仍在 pending 中的后代，并渲染一个后备（fallback） UI。

```tsx 
function MyApp() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>加载中。。。</div>}>
        <CurrentUserInfo />
      </React.Suspense>
    </RecoilRoot>
  );
}
```

#### 带参数的 selector 

```tsx 
const userNameQuery = selectorFamily({
  key: 'UserName',
  get: userID => async () => {
    const response = await myDBQuery({userID});
    if (response.error) {
      throw response.error;
    }
    return response.name;
  },
});

function UserInfo({userID}) {
  const userName = useRecoilValue(userNameQuery(userID));
  return <div>{userName}</div>;
}

function MyApp() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<div>加载中……</div>}>
          <UserInfo userID={1}/>
          <UserInfo userID={2}/>
          <UserInfo userID={3}/>
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}
```

#### selector 混合使用

下面的例子将渲染当前用户的名字和他们的朋友列表。如果一个朋友的名字被点击，他们将成为当前用户，名字和列表将自动更新。

```tsx 
const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: null,
});

const userInfoQuery = selectorFamily({
  key: 'UserInfoQuery',
  get: userID => async () => {
    const response = await myDBQuery({userID});
    if (response.error) {
      throw response.error;
    }
    return response;
  },
});

const currentUserInfoQuery = selector({
  key: 'CurrentUserInfoQuery',
  get: ({get}) => get(userInfoQuery(get(currentUserIDState))),
});

const friendsInfoQuery = selector({
  key: 'FriendsInfoQuery',
  get: ({get}) => {
    const {friendList} = get(currentUserInfoQuery);
    return friendList.map(friendID => get(userInfoQuery(friendID)));
  },
});

function CurrentUserInfo() {
  const currentUser = useRecoilValue(currentUserInfoQuery);
  const friends = useRecoilValue(friendsInfoQuery);
  const setCurrentUserID = useSetRecoilState(currentUserIDState);
  return (
    <div>
      <h1>{currentUser.name}</h1>
      <ul>
        {friends.map(friend =>
          <li key={friend.id} onClick={() => setCurrentUserID(friend.id)}>
            {friend.name}
          </li>
        )}
      </ul>
    </div>
  );
}

function MyApp() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<div>加载中……</div>}>
          <CurrentUserInfo />
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}
```
并行处理

>如果你注意到了上面的例子，friendsInfoQuery 使用一个查询来获得每个朋友的信息。但是，在一个循环中这样做的结果是它们基本上被序列化了。 如果查询的速度很快，这也许是可行的。 但如果它耗时巨大，你可以使用一个并发 helper，如 waitForAll (recoil 工具函数) 来并行执行它们。这个 helper 接受数组和指定的依赖对象。

```tsx 
const friendsInfoQuery = selector({
  key: 'FriendsInfoQuery',
  get: ({get}) => {
    const {friendList} = get(currentUserInfoQuery);
    const friends = get(waitForAll(
      friendList.map(friendID => userInfoQuery(friendID))
    ));
    return friends;
  },
});
```

也可以使用带有部分数据的 waitForNone 来对用户界面进行增量更新。

```tsx 
const friendsInfoQuery = selector({
  key: 'FriendsInfoQuery',
  get: ({get}) => {
    const {friendList} = get(currentUserInfoQuery);
    const friendLoadables = get(waitForNone(
      friendList.map(friendID => userInfoQuery(friendID))
    ));
    return friendLoadables
      .filter(({state}) => state === 'hasValue')
      .map(({contents}) => contents);
  },
});
```

#### 使用set

```tsx 
const usdAtom = atom({
  key: 'usd',
  default: 0
})
const exchangeRate = 0.8
const eurSelector = selector<number>({
  key: 'eur',
  get: ({get}) => {
    let usd = get(usdAtom)
    return usd * exchangeRate
  },
  set: ({set}, newEurValue) => {
    // @ts-ignore
    const newUsdValue = newEurValue / exchangeRate
    set(usdAtom, newUsdValue)
  }
}

const [usd, setUsd] = useRecoilState(usdAtom);
const [usr, setUsr] = useRecoilState(eurSelector);
```

### atomFamily selectorFamily

两者功能类似，用于绑定一个值，以 atom 味唯一参照

### [Loadable](https://recoiljs.org/zh-hans/docs/api-reference/core/Loadable)

与 useRecoilState() 不同，当读取异步 selector 时，这个钩子不会抛出一个 Error 或Promise (为了能与 React Suspense 共存)

包含2个属性：

- state：atom 或 selector 的当前状态。可能的值有 'hasValue'、'hasError' 或者 'loading'。
- contents：此 Loadable表示的值。如果 state 的值是 hasValue，其值为实际值；如果 state 的值是 hasError，其值为被抛出 Error 对象；如果 state 的值是 loading，那么你可以使用 toPromise() 得到一个 Promise。

还有其他方法，但是哪些方法官方描述说还不稳定

```tsx 
function UserInfo({userID}) {
  const [userNameLoadable, setUserName] = useRecoilStateLoadable(userNameQuery(userID));
  switch (userNameLoadable.state) {
    case 'hasValue':
      return <div>{userNameLoadable.contents}</div>;
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      throw userNameLoadable.contents;
  }
}

// 也可以只获取值
  const userNameLoadable = useRecoilValueLoadable(userNameQuery(userID));
```

### [useRecoilState(state)、useRecoilValue(state)、useSetRecoilState(state)](https://recoiljs.org/zh-hans/docs/api-reference/core/useRecoilState)

这三个都能操作 atom 和 selector ，useRecoilState(state) 包含另外2个（另外2个是这个的解体, set 只涉及到设置，不会导致状态变化后的重新渲染）

```tsx 
  const [tempF, setTempF] = useRecoilState(tempFahrenheit);
  const names = useRecoilValue(namesState);
  const setNamesState = useSetRecoilState(namesState);

```

### [useResetRecoilState](https://recoiljs.org/zh-hans/docs/api-reference/core/useResetRecoilState)

用于将 atom 、selector 恢复默认值

```tsx 
  const resetList = useResetRecoilState(todoListState);
```

### isRecoilValue(value)

如果 value 是一个 atom 或者 selector 则返回 true，反之，返回 false。

```tsx 
import {atom, isRecoilValue} from 'recoil';

const counter = atom({
  key: 'myCounter',
  default: 0,
});

const strCounter = selector({
  key: 'myCounterStr',
  get: ({get}) => String(get(counter)),
});

isRecoilValue(counter); // true
isRecoilValue(strCounter); // true

isRecoilValue(5); // false
isRecoilValue({}); // false
```


